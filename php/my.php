<?php

session_start();

//检测是否登录，若没登录则转向登录界面
if(!isset($_SESSION['usrname'])){
    header("Location:login.html");
    exit();
}
//包含数据库连接文件
$con = connectMySQL('reader');
mysql_select_db("stock" , $con);
$userid = $_SESSION['usrname'];
$usrname = $_SESSION['name'];
$user_query = mysql_query("select * from user_list where userid = '$userid' limit 1");
$row = mysql_fetch_array($user_query);
echo '用户信息：<br />';
echo '用户ID：',$userid,'<br />';
echo '用户名：',$username,'<br />';
echo '<a href="login.php?action=logout">注销</a> 登录<br />';
?>
