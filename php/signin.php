<?php
// 指定允许其他域名访问
header('Access-Control-Allow-Origin:*');

// 响应类型
header('Access-Control-Allow-Methods:GET,POST,PUT');
header('Access-Control-Allow-Headers:x-requested-with,content-type');

require_once("connect.php");

$submit = "";
$usrname = $pwd = $action = $islogin = "";

//Part3 用户登录部分


//登录
if(!isset($_POST['submit'])){
    exit('非法访问!');
}
$usrname =htmlspecialchars( $_POST['usrname']);
$pwd = MD5($_POST['pwd']);

$con = connectMySQL('reader');
mysql_select_db("stock" , $con);

//echo "username = $usrname"."<br>";
//echo "pwd = $pwd"."<br>";

//检测用户名及密码是否正确
//limit 1 限制只有一个结果
$sql = "SELECT usrname from normalusr where usrname='$usrname' and pwd='$pwd' limit 1";
$check_query = mysql_query($sql);

//echo "$check_query"."<br>";
if($check_query && $result = mysql_fetch_array($check_query)){
    //登录成功
    session_start();
    $_SESSION['username'] = $usrname;
    $_SESSION['userid'] = $result['userid'];
    $_SESSION['name'] = $result['name'];
    $_SESSION['email']= $result['email'];
    $_SESSION['accountname'] = $result['accountname'];
    $_SESSION['islogin'] = "true";

   echo json_encode(array('result' => 1, 'username' => $usrname));
    exit;
} else {
    //header('Content-Type: application/json');
    echo json_encode(array('result' => 0));
    exit;
}

?>
