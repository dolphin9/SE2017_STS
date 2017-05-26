<?php
require_once("connect.php");
$usrname = $pwd = "";

$usrname = $_POST['usrname'];
$pwd = $_POST['pwd'];

usrlogin($usrname,$pwd);

?>
