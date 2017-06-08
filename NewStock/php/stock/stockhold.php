<?php
require "checkstockinfodata.php";
require "../sqlconnect.php";
$attr = $_GET["attr"];
$key = $_GET["key"];
$key1 = $_GET["key1"];
$key2 = $_GET["key2"];
$usrname = $_GET["usrname"];
$return = true;
if ($attr == "all")
    $querytype = "all";
else if ($attr == "stockname")
    $querytype = "one";
else if ($attr == "holdnum" || $attr == "price" || $attr == "forsale")
    $querytype = "two";
else
    $return = false;
if ($return && $attr != "all")
{
    if ($attr == "stockname")
    {
        if (!checkName($key))
            $return = false;
    }
    else if ($attr == "holdnum" || $attr == "forsale")
    {
        if (!checkCirculation($key1) || !checkCirculation($key2))
            $return = false;
    }
    else if ($attr == "price")
    {
        if (!checkPri($key1) || !checkPri($key2))
            $return = false;
    }
}
if ($return)
{
    $mysqli = getSQLConnect();
    if ($querytype == "all")
    {
        $stmt = $mysqli->prepare("select i.name, h.stockid, h.holdnum, h.price, h.forsale from stockinfo i join stockhold h where i.stockid = h.stockid and h.usrname = ? order by stockid, price");
        $stmt->bind_param("s", $usrname);
    }
    else if ($querytype == "one")
    {
        $stmt = $mysqli->prepare("select i.name, h.stockid, h.holdnum, h.price, h.forsale from stockinfo i join stockhold h where i.stockid = h.stockid and h.usrname = ? and i.name = ?  order by stockid, price");
        $stmt->bind_param("ss", $usrname, $key);
    }
    else if ($querytype == "two")
    {
        $stmt = $mysqli->prepare("select i.name, h.stockid, h.holdnum, h.price, h.forsale from stockinfo i join stockhold h where i.stockid = h.stockid and h.usrname = ? and " . $attr . " between ? and ?  order by stockid, price");
        $stmt->bind_param("sdd", $usrname, $key1, $key2);
    }
    $return = $stmt->execute();
    if ($return)
    {
        $res = $stmt->get_result();
        $data = $res->fetch_all(MYSQLI_ASSOC);
        $cnt = count($data);
        $hold = array();
        $index = 0;
        for ($i = 0; $i < $cnt; $i = $j)
        {
            $newdata = $data[$i];
            for ($j = $i + 1; $j < $cnt; $j++)
            {
                if ($data[$j]['price'] == $newdata['price'] && $data[$j]['stockid'] == $newdata['stockid'])
                {
                    $newdata['holdnum'] += $data[$j]['holdnum'];
                    $newdata['forsale'] += $data[$j]['forsale'];
                }
                else
                    break;
            }
            $hold[$index] = $newdata;
            $index++;
        }
    }
    $stmt->close();
    freeSQLConnect($mysqli);
}
if ($return)
{
    echo json_encode($hold);
}
else
{
    $null = array();
    echo json_encode($null);
}
?>
