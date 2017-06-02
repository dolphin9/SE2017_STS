<<?php

//注销登录
if($_POST['action'] == "logout"){
    unset($_SESSION['usrname']);
    unset($_SESSION['name']);
    unset($_SESSION['usrid']);
    unset($_SESSION['email']);
    unset($_SESSION['accountname']);
    unset($_SESSION['islogin']);
    echo '注销登录成功！点击此处 <a href="login.html">登录</a>';
    exit;
}
else{
  echo '注销失败！';
}
 ?>
