<?php
require "checkaccountdata.php";
require "verifypassword.php";
$usrname = $_POST["usrname"];
$pwd = $_POST["pwd"];
$newpwd = $_POST["newpwd"];
$fmaddr = $_POST["fmaddr"];
$career = $_POST["career"];
$edu = $_POST["edu"];
$workaddr = $_POST["workaddr"];
$email = $_POST["email"];
$phone = $_POST["phone"];
$return = true;
if ($newpwd == null)
    $newpwdflag = false;
else
    $newpwdflag = true;
if ($usrname == null || !checkUsrName($usrname))
{
    $return = false;
    $error = "用户名不符合规范";
}
else if ($pwd == null || !checkPassword($pwd))
{
    $return = false;
    $error = "密码不符合规范";
}
else if ($newpwdflag && !checkPassword($newpwd))
{
    $return = false;
    $error = "新密码不符合规范";
}
else if (!checkFamilyAddr($fmaddr))
{
    $return = false;
    $error = "家庭住址不符合规范";
}
else if (!checkCareer($career))
{
    $return = false;
    $error = "职业不符合规范";
}
else if (!checkEdu($edu))
{
    $return = false;
    $error = "学历不符合规范";
}
else if (!checkWorkAddr($workaddr))
{
    $return = false;
    $error = "工作地址不符合规范";
}
else if ($email == null || !checkEmail($email))
{
    $return = false;
    $error = "Email不符合规范";
}
else if ($phone == null || !checkPhone($phone))
{
    $return = false;
    $error = "联系方式不符合规范";
}
if ($return)
{
    $check = verifyPassword($usrname, $pwd);
    if (!$check[0])
    {
        $return = false;
        $error = $check[1];
    }
}
if ($return)
{
    $mysqli = getSQLConnect();
    if($newpwdflag)
    {
        $md5pwd = md5($newpwd);
        $stmt = $mysqli->prepare("update account set pwd = ?, email = ?, phone = ?, fmaddr = ?, career = ?, edu = ?, workaddr = ? where usrname = ?");
        $stmt->bind_param("ssssssss", $md5pwd, $email, $phone, $fmaddr, $career, $edu, $workaddr, $usrname);
    }
    else
    {
        $stmt = $mysqli->prepare("update account set email = ?, phone = ?, fmaddr = ?, career = ?, edu = ?, workaddr = ? where usrname = ?");
        $stmt->bind_param("sssssss", $email, $phone, $fmaddr, $career, $edu, $workaddr, $usrname);
    }
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
