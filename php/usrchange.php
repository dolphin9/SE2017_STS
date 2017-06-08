<?php
require_once("connect.php");
//error_reporting(0);
$usrname = $pwd = $idnum = "";
$name = $email = $phone = "";
$sex = $accountname ="";
$state = "";

$name = htmlspecialchars($_POST['name']);
$phone = MD5($_POST['phone']);
$idnum =  htmlspecialchars($_POST['idnum']);
$accountname = htmlspecialchars($_POST['accountname']);

$usrname = "Anne";
//    $name = htmlspecialchars($_POST['name']);
//  $email = htmlspecialchars($_POST['email']);
//    $phone = htmlspecialchars($_POST['phone']);
//    $sex = htmlspecialchars($_POST['sex']);
//    $accountname = htmlspecialchars($_POST['accountname']);



//Part2 insert 连接数据库并向数据库中插入值， 这里为注册操作
//      此处使用的user为writer，database为stock，table为nomalusr
//      默认输入的信息都是合法的。
function usrchange($usrname,$pwd,$email){
  $con = connectMySQL('writer');
  mysql_select_db("stock" , $con);
  $sql = "UPDATE normalusr SET phone = '$phone', name ='$name', idnum = '$idnum', accountname = '$accountname'
   WHERE usrname = '$usrname'
  ";
  if(!mysql_query($sql,$con))
  {
    $state = 2;
  }
  echo "register ok!";
  mysql_close($con);
  header("Location:/usrindex1.html");
}

usrchange($usrname,$pwd,$email);

?>
