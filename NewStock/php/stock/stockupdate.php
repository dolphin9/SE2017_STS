<?php
require "checkstockinfodata.php";
require "../account/verifypassword.php";
$stockid = $_POST["stockid"];
$name = $_POST["name"];
$circulation = $_POST["circulation"];
$apid = $_POST["apid"];
$pwd = $_POST['pwd'];
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
else if ($pwd == null || !checkPassword($pwd))
{
    $return = false;
    $error = "密码不符合规范";
}
if ($return)
{
    $mysqli = getSQLConnect();
    $stmt = $mysqli->prepare("select apid from stockinfo where stockid = ?");
    $stmt->bind_param("s", $stockid);
    $return = $stmt->execute();
    $res = $stmt->get_result();
    $data = $res->fetch_all(MYSQLI_ASSOC);
    $oldapid = $data[0]['apid'];
    $check = verifyPassword($oldapid, $pwd);
    if (!$check[0])
    {
        $return = false;
        $error = $check[1];
    }
    $stmt->close();
    freeSQLConnect($mysqli);
}
if ($return)
{
    $mysqli = getSQLConnect();
    $stmt = $mysqli->prepare("update stockinfo set name = ?, circulation = ?, apid = ? where stockid = ?");
    $stmt->bind_param("siss", $name, $circulation, $apid, $stockid);
    $return = $stmt->execute();
    if (!$return)
        $error = "更新失败";
    $stmt->close();
    freeSQLConnect($mysqli);
}
$done = array();
$done['result'] = $return;
$done['info'] = $error;
echo json_encode($done);
?>
