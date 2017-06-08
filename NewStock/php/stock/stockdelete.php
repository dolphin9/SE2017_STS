<?php
require "checkstockinfodata.php";
require "../account/verifypassword.php";
$stockid = $_POST["stockid"];
$apid = $_POST['apid'];
$pwd = $_POST['pwd'];
$return = true;
if ($stockid == null || !checkStockID($stockid))
{
    $return = false;
    $error = "股票代码不符合要求";
}
else if ($apid == null || !checkApid($apid))
{
    $return = false;
    $error = "法人账户不符合要求";
}
else if ($pwd == null || !checkPassword($pwd))
{
    $return = false;
    $error = "密码不符合要求";
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
    $stmt = $mysqli->prepare("delete from stockinfo where stockid = ?");
    $stmt->bind_param("s", $stockid);
    $return = $stmt->execute();
    if (!$return)
        $error = "删除失败";
    $stmt->close();
    freeSQLConnect($mysqli);
}
$done = array();
$done['result'] = $return;
$done['info'] = $error;
echo json_encode($done);
?>
