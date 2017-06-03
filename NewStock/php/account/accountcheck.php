<?php
require "checkaccountdata.php";
require "../sqlconnect.php";
$attr = $_POST["attr"];
$key = $_POST["key"];
$return = true;
$needonly = !(ord($attr) >= 'A' && ord($attr) <= 'Z');
$attr = strtolower($attr);
if ($attr == "usrname")
{
    $return = checkUsrName($key);
    $error = "用户名不符合规范";
}
else if ($attr == "idnum")
{
    $return = checkIDNum($key);
    $error = "证件号码不符合规范";
}
else if ($attr == "email")
{
    $return = checkEmail($key);
    $error = "Email不符合规范";
}
else if ($attr == "phone")
{
    $return = checkPhone($key);
    $error = "联系方式不符合规范";
}
else
{
    $return = false;
    $error = "未知错误";
}
if ($return & $needonly)
{
    $mysqli = getSQLConnect();
    $stmt = $mysqli->prepare("select 1 from account where " . $attr . " = ? limit 1");
    $stmt->bind_param("s", $key);
    $stmt->execute();
    $res = $stmt->get_result();
    $data = $res->fetch_all(MYSQLI_ASSOC);
    $stmt->close();
    if (count($data) == 0)
    {
        $return = true;
    }
    else
    {
        $return = false;
        if ($attr == "usrname")
            $error = "用户名已存在";
        else if ($attr == "idnum")
            $error = "证件号码已存在";
        else if ($attr == "email")
            $error = "Email已存在";
        else if ($attr == "phone")
            $error = "联系方式已存在";
    }
    freeSQLConnect($mysqli);
}
$done = array();
$done['result'] = $return;
$done['info'] = $error;
echo json_encode($done);
?>
