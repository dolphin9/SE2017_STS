<?php

//error_reporting(0);


$usrname = $pwd = $idnum = "";
$name = $email = $phone = "";
$sex = $accountname = $fmaddr = "";

$usrname = $_POST['usrname'];
$pwd = $_POST['pwd'];
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$idnum = $_POST['idnum'];
$sex = $_POST['sex'];
$accountname = $_POST['accountname'];
$fmaddr = $_POST['fmaddr'];

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


usrregister($usrname,$pwd,$name,$email,$phone,$sex,$idnum,$accountname,$fmaddr);

?>
