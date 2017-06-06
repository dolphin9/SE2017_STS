<?php
require "checkaccountdata.php";
require "../sqlconnect.php";
$attr = $_GET["attr"];
$key = $_GET["key"];
$key1 = $_GET["key1"];
$key2 = $_GET["key2"];
$page = $_GET["page"];
$sortby = $_GET["sortby"];
$return = true;
if ($page <= 0)
    $return = false;
if (abs($sortby) == 1)
    $sort = " order by usrname";
else if (abs($sortby) == 2)
    $sort = " order by name";
else if (abs($sortby) == 3)
    $sort = " order by phone";
else if (abs($sortby) == 4)
    $sort = " order by regdate";
else
    $sort = " order by usrname";
if ($sortby >= 0)
    $sort = $sort . " asc";
else
    $sort = $sort . " desc";
if($attr == "all")
{
    $func = 0;
}
else if($attr == "usrname" && checkUsrName($key))
{
    $func = 1;
}
else if($attr == "name" && checkName($key))
{
    $func = 2;
}
else if($attr == "idnum" && checkIDNum($key))
{
    $func = 3;
}
else if($attr == "regdate" && $key1 != null && checkDT($key1) && $key2 != null && checkDT($key2))
{
    $func = 4;
}
else
    $return = false;
if ($return)
{
    $mysqli = getSQLConnect();

    if($func == 0)
    {
        $stmt = $mysqli->prepare("select * from account" . $sort);
    }
    else if($func == 1 || $func == 2 || $func == 3)
    {
        $stmt = $mysqli->prepare("select * from account where " . $attr . " = ?" . $sort);
        $stmt->bind_param("s", $key);
    }
    else if($func == 4)
    {
        if ($key1 != null)
            $key1 = $key1 . " 00:00:00";
        if ($key2 != null)
            $key2 = $key2 . " 23:59:59";
        if ($key1 != null && $key2 != null)
            $stmt = $mysqli->prepare("select * from account where " . $attr . " between '" . $key1 . "' and '" . $key2 . "'" . $sort);
        else if ($key1 != null)
            $stmt = $mysqli->prepare("select * from account where " . $attr . " >= '" . $key1 . "'" . $sort);
        else
            $stmt = $mysqli->prepare("select * from account where " . $attr . " <= '" . $key2 . "'" . $sort);
    }
    $return = $stmt->execute();
    if ($return)
    {
        $res = $stmt->get_result();
        $data = $res->fetch_all(MYSQLI_ASSOC);
        $cnt = count($data);
        $maxpage = ceil($cnt / 10);
    }
    $stmt->close();
    freeSQLConnect($mysqli);
}
if ($return)
{
    $info = array();
    $info[0] = $maxpage;
    if ($maxpage != 0)
    {
        $offset = ($page - 1) * 10;
        for ($i = 0; $i < 10 && $offset + $i < $cnt; $i++)
            $info[1][$i] = $data[$offset + $i];
    }
    else
        $info[1] = array();
    echo json_encode($info);
}
else
{
    $null = array();
    $null[0] = 0;
    $null[1] = array();
    echo json_encode($null);
}
?>
