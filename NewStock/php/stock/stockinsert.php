<?php
require "checkstockinfodata.php";
require "../account/verifypassword.php";
$stockid = $_POST["stockid"];
$name = $_POST["name"];
$circulation = $_POST["circulation"];
$apid = $_POST["apid"];
$inipri = $_POST["inipri"];
$pwd = $_POST["pwd"];
$return = true;
if ($stockid == null || !checkStockID($stockid))
{
    $return = false;
    $error = "股票代码不符合规范";
}
else if ($name == null || !checkName($name))
{
    $return = false;
    $error = "股票名称不符合规范";
}
else if ($circulation == null || !checkCirculation($circulation))
{
    $return = false;
    $error = "发行量不符合规范";
}
else if ($apid == null || !checkApid($apid))
{
    $return = false;
    $error = "法人账户不符合规范";
}
else if ($inipri == null || !checkPri($inipri))
{
    $return = false;
    $error = "初始价不符合规范";
}
else if ($pwd == null || !checkPassword($pwd))
{
    $return = false;
    $error = "密码不符合规范";
}
if ($return)
{
    $check = verifyPassword($apid, $pwd);
    if (!$check[0])
    {
        $return = false;
        $error = $check[1];
    }
}
if ($return)
{
    $mysqli = getSQLConnect();
    $stmt = $mysqli->prepare("insert into stockinfo (stockid, name, circulation, apid, inipri, state, flag) values (?,?,?,?,?,0,0)");
    $stmt->bind_param("ssisd", $stockid, $name, $circulation, $apid, $inipri);
    $return = $stmt->execute();
    if (!$return)
        $error = "新增失败";
    $stmt->close();
    freeSQLConnect($mysqli);
}
$done = array();
$done['result'] = $return;
$done['info'] = $error;
echo json_encode($done);
?>
