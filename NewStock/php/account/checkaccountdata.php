<?php
function checkUsrName($usrname)
{
    if (strlen($usrname) < 6 || strlen($usrname) > 20 || !preg_match("/^[0-9_a-zA-Z]+$/",$usrname))
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
function checkName($name)
{
    if (strlen($name) > 20)
        return false;
    else
        return true;
}
function checkIDNum($idnum)
{
    $IDcheck = 0;
    if (preg_match("/^[0-9]{17}[0-9x]$/",$idnum) == 0)
    {
        $IDcheck = $IDcheck + 1;
    }
    if (preg_match("/^[HMhm]{1}([0-9]{10}|[0-9]{8})$/",$idnum) == 0)
    {
        $IDcheck = $IDcheck + 1;
    }
    if (preg_match("/^[0-9]{8}$/",$idnum) == 0 && preg_match("/^[0-9]{10}$/",$idnum) == 0)
    {
        $IDcheck = $IDcheck + 1;
    }
    if (preg_match("/^[EG][0-9]{8}$/",$idnum) == 0)
    {
        $IDcheck = $IDcheck + 1;
    }
    if($IDcheck == 4)
    {
        return false;
    }
    return true;
}
function checkFamilyAddr($fmaddr)
{
    if (strlen($fmaddr) > 30)
    {
        return false;
    }
    return true;
}
function checkCareer($career)
{
    if (strlen($career) > 20)
    {
        return false;
    }
    return true;
}
function checkEdu($edu)
{
    if (strlen($edu) > 20)
    {
        return false;
    }
    return true;
}
function checkWorkAddr($workaddr)
{
    if (strlen($workaddr) > 30)
    {
        return false;
    }
    return true;
}
function checkEmail($email)
{
    if (preg_match("/^([0-9A-Za-z\\-_\\.]+)@([0-9a-z]+\\.[a-z]{2,3}(\\.[a-z]{2})?)$/",$email) == 0)
    {
        return false;
    }
    return true;
}
function checkPhone($phone)
{
    if (preg_match("/^((13|14|15|16|17|18|19)[0-9]{9})|((86)[-]?(13|14|15|16|17|18|19)[0-9]{9})|((852)(6|9)[0-9]{7})|((853)(6)[0-9]{7})|((886)(09)[0-9]{8})$/",$phone) == 0
        && preg_match("/^0[0-9]{2,3}[-]?[2-9][0-9]{6,7}$/",$phone) == 0)
    {
        return false;
    }
    return true;
}
function checkType($type)
{
    if (strlen($type) > 4)
    {
        return false;
    }
    return true;
}
?>
