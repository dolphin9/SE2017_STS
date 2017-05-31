<?php
// 指定允许其他域名访问
header('Access-Control-Allow-Origin:*');

// 响应类型
header('Access-Control-Allow-Methods:GET,POST,PUT');
header('Access-Control-Allow-Headers:x-requested-with,content-type');

require_once("connect.php");

$submit = "";
$usrname = $pwd = $action = "";

//Part3 用户登录部分


//登录
if(!isset($_POST['submit'])){
    exit('非法访问!');
}
$usrname =htmlspecialchars( $_POST['usrname']);
$pwd = MD5($_POST['pwd']);

$con = connectMySQL('reader');
mysql_select_db("stock" , $con);

echo "username = $usrname"."<br>";
echo "pwd = $pwd"."<br>";


//检测用户名及密码是否正确
//limit 1 限制只有一个结果
$sql = "SELECT usrname from normalusr where usrname='$usrname' and pwd='$pwd' limit 1";
$check_query = mysql_query($sql);

echo "$check_query"."<br>";
if($result = mysql_fetch_array($check_query)){
    //登录成功
    session_start();
    $_SESSION['username'] = $usrname;
    $_SESSION['userid'] = $result['userid'];
    $_SESSION['name'] = $result['name'];
    $_SESSION['accountname'] = $result['accountname'];
    echo $usrname,' 欢迎你！进入 <a href="my.php">用户中心</a><br />';
    echo '点击此处 <a href="logout.php?action=logout">注销</a> 登录！<br />';
    exit;
} else {
    exit('登录失败！点击此处 <a href="javascript:history.back(-1);">返回</a> 重试');
}


?>
