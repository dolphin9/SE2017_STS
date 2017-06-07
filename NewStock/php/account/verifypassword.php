<?php
require "../sqlconnect.php";
function verifyPassword($usrname, $pwd)
{
    $mysqli = getSQLConnect();
    $stmt = $mysqli->prepare("select pwd, pwderrcnt, pwddate from account where usrname = ?");
    $stmt->bind_param("s", $usrname);
    $stmt->execute();
    $res = $stmt->get_result();
    $data = $res->fetch_all(MYSQLI_ASSOC);
    $return = array();
    $return[0] = false;
    if (count($data) == 0)
    {
        $return[1] = "连接数据库失败";
        $stmt->close();
        freeSQLConnect($mysqli);
        return $return;
    }
    $row = $data[0];
    if(strtotime($row['pwddate']) >= strtotime(date('YmdHis')))
    {
        $return[1] = "密码处于冻结状态，请于" . $row['pwddate'] . "之后再试";
        $stmt->close();
        freeSQLConnect($mysqli);
        return $return;
    }
    if($row['pwd'] != md5($pwd))
    {
        $pwderrcnt = $row['pwderrcnt'] + 1;
        $return[1] = "密码已经连续输错" . $pwderrcnt . "次";
        if($pwderrcnt < 5)
        {
            $stmt = $mysqli->prepare("update account set pwderrcnt = ? where usrname = ?");
            $stmt->bind_param("is", $pwderrcnt, $usrname);
            $stmt->execute();
        }
        else
        {
            $nexttime = "+" . ($pwderrcnt - 4) . " hours";
            $pwddate = date('Y-m-d H:i:s', strtotime($nexttime));
            $return[1] = $return[1] . "\n错误次数过多，现已被冻结！\n请于" . $pwddate . "之后再试";
            $stmt = $mysqli->prepare("update account set pwderrcnt = ?, pwddate = ? where usrname = ?");
            $stmt->bind_param("iss", $pwderrcnt, $pwddate, $usrname);
            $stmt->execute();
        }
        $stmt->close();
        freeSQLConnect($mysqli);
        return $return;
    }
    if ($row['pwderrcnt'] > 0)
    {
        $pwderrcnt = 0;
        $pwddate = date('Y-m-d H:i:s');
        $stmt = $mysqli->prepare("update account set pwderrcnt = ?, pwddate = ? where usrname = ?");
        $stmt->bind_param("iss", $pwderrcnt, $pwddate, $usrname);
        $stmt->execute();
    }
    $stmt->close();
    freeSQLConnect($mysqli);
    $return[0] = true;
    return $return;
}
?>
