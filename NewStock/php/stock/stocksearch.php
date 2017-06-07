<?php
require "checkstockinfodata.php";
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
if ($return) {
    if ($attr == "all")
        $querytype = "all";
    else if ($attr == "stockid" || $attr == "name" || $attr == "apid")
        $querytype = "one";
    else if ($attr == "circulation" || $attr == "date" || $attr == "inipri" || $attr == "strpri" || $attr == "buypri" || $attr == "sellpri" || $attr == "curmaxpri" || $attr == "curminpri" || $attr == "openingpri" || $attr == "closingpri" || $attr == "totalstock" || $attr == "curstock")
        $querytype = "two";
    else
        $return = false;
}
if ($return)
{
    if (abs($sortby) == 1)
        $sort = " order by stockid";
    else if (abs($sortby) == 2)
        $sort = " order by name";
    else if (abs($sortby) == 3)
        $sort = " order by circulation";
    else if (abs($sortby) == 4)
        $sort = " order by apid";
    else if (abs($sortby) == 5)
        $sort = " order by date";
    else if (abs($sortby) == 6)
        $sort = " order by inipri";
    else
        $sort = " order by stockid";
    if ($sortby >= 0)
        $sort = $sort . " asc";
    else
        $sort = $sort . " desc";
}
if ($return && $attr != "all")
{
    if ($attr == "stockid")
    {
        if (!checkStockID($key))
            $return = false;
    }
    else if ($attr == "name")
    {
        if (!checkName($key))
            $return = false;
    }
    else if ($attr == "apid")
    {
        if (!checkApid($key))
            $return = false;
    }
    else if ($attr == "date")
    {
        if ($key1 == null && $key2 == null)
            $return = false;
        else if (($key1 != null && !checkDT($key1)) || ($key2 != null && !checkDT($key2)))
            $return = false;
    }
    else
    {
        if ($key1 == null && $key2 == null)
            $return = false;
        else if (($key1 != null && !checkPri($key1)) || ($key2 != null && !checkPri($key2)))
            $return = false;
    }
}
if ($return)
{
    $mysqli = getSQLConnect();
    if ($querytype == "all")
    {
        $stmt = $mysqli->prepare("select * from stockinfo" . $sort);
    }
    else if ($querytype == "one")
    {
        $stmt = $mysqli->prepare("select * from stockinfo where " . $attr . " = ?" . $sort);
        $stmt->bind_param("s", $key);
    }
    else if ($querytype == "two")
    {
        if ($attr != "date")
        {
            if ($key1 != null && $key2 != null)
            {
                $stmt = $mysqli->prepare("select * from stockinfo where " . $attr . " between ? and ?" . $sort);
                $stmt->bind_param("dd", $key1, $key2);
            }
            else if ($key1 != null)
            {
                $stmt = $mysqli->prepare("select * from stockinfo where " . $attr . " >= ?" . $sort);
                $stmt->bind_param("d", $key1);
            }
            else
            {
                $stmt = $mysqli->prepare("select * from stockinfo where " . $attr . " <= ?" . $sort);
                $stmt->bind_param("d", $key2);
            }
        }
        else
        {
            if ($key1 != null)
                $key1 = $key1 . " 00:00:00";
            if ($key2 != null)
                $key2 = $key2 . " 23:59:59";
            if ($key1 != null && $key2 != null)
                $stmt = $mysqli->prepare("select * from stockinfo where " . $attr . " between '" . $key1 . "' and '" . $key2 . "'" . $sort);
            else if ($key1 != null)
                $stmt = $mysqli->prepare("select * from stockinfo where " . $attr . " >= '" . $key1 . "'" . $sort);
            else
                $stmt = $mysqli->prepare("select * from stockinfo where " . $attr . " <= '" . $key2 . "'" . $sort);
        }
    }
    $return = $stmt->execute();
    if ($return)
    {
        $res = $stmt->get_result();
        $data = $res->fetch_all(MYSQLI_ASSOC);
        $cnt = count($data);
        $maxpage = ceil($cnt / 10);
        if ($cnt != 0)
        {
            $stmt = $mysqli->prepare("select count(*) from usrcmd where stockid = ?");
            $stmt->bind_param("s", $data[0]['stockid']);
            $stmt->execute();
            $res = $stmt->get_result();
            $temp = $res->fetch_all(MYSQLI_ASSOC);
            $data[0]['inscnt'] = $temp[0]['count(*)'];
        }
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
