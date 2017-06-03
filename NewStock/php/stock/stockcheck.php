<?php
require "checkstockinfodata.php";
require "../sqlconnect.php";
$attr = $_POST["attr"];
$key = $_POST["key"];
$return = true;
$needonly = !(ord($attr) >= 'A' && ord($attr) <= 'Z');
$needexist = ($attr == "STOCKID");
$attr = strtolower($attr);
if ($attr == "stockid")
{
    $return = checkStockID($key);
    $error = "股票代码不符合要求";
}
else if ($attr == "name")
{
    $return = checkName($key);
    $error = "股票名称不符合要求";
}
else if ($attr == "apid")
{
    $return = checkApid($key);
    $error = "法人账户不符合要求";
}
else
{
    $return = false;
    $error = "未知错误";
}
if ($return && ($needonly || $needexist))
{
    $mysqli = getSQLConnect();
    if ($attr == "apid")
    {
        $attr = "usrname";
        $table = "account";
    }
    else
        $table = "stockinfo";
    if ($attr != "usrname")
        $stmt = $mysqli->prepare("select 1 from " . $table . " where " . $attr . " = ? limit 1");
    else
        $stmt = $mysqli->prepare("select 1 from " . $table . " where " . $attr . " = ? and type = 'apid' limit 1");
    $stmt->bind_param("s", $key);
    $stmt->execute();
    $res = $stmt->get_result();
    $data = $res->fetch_all(MYSQLI_ASSOC);
    if ($attr == "stockid" || $attr == "name")
    {
        if ($needexist)
        {
            if (count($data) > 0)
            {
                $return = true;
            }
            else
            {
                $return = false;
                if ($attr == "stockid")
                    $error = "股票代码不存在";
            }
        }
        else
        {
            if (count($data) == 0)
            {
                $return = true;
            }
            else
            {
                $return = false;
                if ($attr == "stockid")
                    $error = "股票代码已存在";
                else if ($attr == "name")
                    $error = "股票名称已存在";
            }
        }
    }
    else if ($attr == "usrname")
    {
        if (count($data) == 0)
        {
            $return = false;
            $error = "法人不存在";
        }
        else
        {
            $return = true;
        }
    }
    $stmt->close();
    freeSQLConnect($mysqli);
}
$done = array();
$done['result'] = $return;
$done['info'] = $error;
echo json_encode($done);
?>
