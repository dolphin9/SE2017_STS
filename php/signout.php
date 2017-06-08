<<?php
$res=""
//注销登录
if($_POST['action'] == "logout"){
    unset($_SESSION['usrname']);
    unset($_SESSION['name']);
    unset($_SESSION['usrid']);
    unset($_SESSION['email']);
    unset($_SESSION['accountname']);
    unset($_SESSION['islogin']);
    res=0;
    echo $res;
    exit;
}
else{
  res=1;
  echo $res;
}
 ?>
