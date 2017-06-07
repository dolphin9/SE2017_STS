<?php
require "checkaccountdata.php";
require "../sqlconnect.php";
$usrname = $_POST["usrname"];
$pwd = $_POST["pwd"];
$name = $_POST["name"];
$idnum = $_POST["idnum"];
$fmaddr = $_POST["fmaddr"];
$career = $_POST["career"];
$edu = $_POST["edu"];
$workaddr = $_POST["workaddr"];
$subidnum = $_POST["subidnum"];
$email = $_POST["email"];
$phone = $_POST["phone"];
$type = $_POST["type"];
$return = true;
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
else if ($name == null || !checkName($name))
{
    $return = false;
    $error = "姓名不符合规范";
}
else if ($idnum == null || !checkIDNum($idnum))
{
    $return = false;
    $error = "身份证号不符合规范";
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
else if ($subidnum != null && !checkIDNum($subidnum))
{
    $return = false;
    $error = "代办人身份证号不符合规范";
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
else if ($type == null || !checkType($type))
{
    $return = false;
    $error = "账户类型错误";
}
if ($return)
{
    $mysqli = getSQLConnect();
    $stmt = $mysqli->prepare("insert into account (usrname, pwd, name, idnum, fmaddr, career, edu, workaddr, subidnum, email, phone, state, type, pwderrcnt) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
    $md5pwd = md5($pwd);
    $state = 1;
    $pwderrcnt = 0;
    $stmt->bind_param("sssssssssssisi", $usrname, $md5pwd, $name, $idnum, $fmaddr, $career, $edu, $workaddr, $subidnum, $email, $phone, $state, $type, $pwderrcnt);
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
