<?php
require_once("connect.php");
//error_reporting(0);
$usrname = $pwd = $idnum = "";
$name = $email = $phone = "";
$sex = $accountname = $fmaddr = "";

$usrname = htmlspecialchars($_POST['usrname']);
$pwd = MD5($_POST['pwd']);
$name = htmlspecialchars($_POST['name']);
$email = htmlspecialchars($_POST['email']);
$phone = htmlspecialchars($_POST['phone']);
$idnum = htmlspecialchars($_POST['idnum']);
$sex = htmlspecialchars($_POST['sex']);
$accountname = htmlspecialchars($_POST['accountname']);
$fmaddr = htmlspecialchars($_POST['fmaddr']);

//$usrname = "Anne";
//$pwd = "123456";
//$name = "Anne Willians";
//$email = "Anne@Willians.com";
echo "hew";
echo "<br>"."$usrname";
echo "<br>"."$";
echo "<br>"."$sex";
echo "<br>"."$fmaddr";
echo "<br>"."$name";
echo "<br>";


//Part2 insert 连接数据库并向数据库中插入值， 这里为注册操作
//      此处使用的user为writer，database为stock，table为nomalusr
//      默认输入的信息都是合法的。
function usrregister($usrname,$pwd,$name,$email,$phone,$sex,$idnum,$accountname){
  $con = connectMySQL('writer');
  mysql_select_db("stock" , $con);
  $sql = "INSERT INTO normalusr (usrname,pwd,email,phone,name,sex,idnum,  accountname)
  VALUES
  ( '$usrname' , '$pwd' ,  '$email' , '$phone' ,'$name' , '$sex', '$idnum',    '$accountname'  )
  ";
  if(!mysql_query($sql,$con))
  {
    die('Error: ' . mysql_error());
  }
  echo "register ok!";
  mysql_close($con);
}

usrregister($usrname,$pwd,$name,$email,$phone,$sex,$idnum,$accountname);

?>
