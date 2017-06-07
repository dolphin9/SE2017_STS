<?php
require "checkaccountdata.php";
require "verifypassword.php";
$usrname = $_POST["usrname"];
$pwd = $_POST["pwd"];
$return = true;
if ($usrname == null || !checkUsrName($usrname))
{
    $return = false;
    $error = "用户名不符合规范";
}
else if ($pwd == null || !checkPassword($pwd))
{
    $return = false;
    $error = "密码不符合规范";
}
if ($return)
{
    $check = verifyPassword($usrname, $pwd);
    if (!$check[0])
    {
        $return = false;
        $error = $check[1];
    }
}
if($return)
{
    $mysqli = getSQLConnect();
    $stmt = $mysqli->prepare("update account set state = 0 where usrname = ?");
    $stmt->bind_param("s", $usrname);
    $return = $stmt->execute();
    if (!$return)
        $error = "挂失失败";
    $stmt->close();
    freeSQLConnect($mysqli);
}
$done = array();
$done['result'] = $return;
$done['info'] = $error;
echo json_encode($done);
?>
