<?php
function checkStockID($stockid)
{
    if (strlen($stockid) != 6 || !ctype_alnum($stockid))
        return false;
    else
        return true;
}
function checkName($name)
{
    if (strlen($name) > 45)
        return false;
    else
        return true;
}
function checkCirculation($circulation)
{
    if (!ctype_digit($circulation))
    {
        return false;
    }
    else
    {
        $circulation = intval($circulation);
        if ($circulation <= 0)
        {
            return false;
        }
    }
    return true;
}
function checkApid($apid)
{
    if (strlen($apid) < 6 || strlen($apid) > 20 || !preg_match("/^[0-9_a-zA-Z]+$/",$apid))
        return false;
    else
        return true;
}
function checkDT($datestr){
    $date = explode("-", $datestr);
    if (count($date) != 3)
        return false;
    if (ctype_digit($date[0]))
        $year = intval($date[0]);
    else
        return false;
    if (ctype_digit($date[1]))
        $month = intval($date[1]);
    else
        return false;
    if (ctype_digit($date[2]))
        $day = intval($date[2]);
    else
        return false;
    if (checkdate($month, $day, $year))
        return true;
    else
        return false;
}
function checkPri($pri)
{
    if (!is_numeric($pri))
    {
        return false;
    }
    else
    {
        $pri = floatval($pri);
        if ($pri <= 0)
        {
            return false;
        }
    }
    return true;
}
function checkTitle($title)
{
    if (strlen($title) > 60)
    {
        return false;
    }
    return true;
}
function checkPassword($pwd)
{
    if (strlen($pwd) > 16 || strlen($pwd) < 6)
    {
        return false;
    }
    if (preg_match("/^[0-9]*$/",$pwd) || preg_match("/^[a-z]*$/i",$pwd) || preg_match("/^[A-Z]*$/i",$pwd))
    {
        return false;
    }
    if (preg_match("/^[\x21-~]*$/",$pwd) == 0)
    {
        return false;
    }
    return true;
}
?>
