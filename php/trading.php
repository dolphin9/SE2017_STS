<?php
$Type = $accid = $stockid = $index = $type = $num = $sell =  $price ;

$accid =  "abc";//$_SESSION['usrname']);
$index = md5(uniqid(rand(), true));
$Type =  htmlspecialchars($_POST['Type']);
$stockid =  htmlspecialchars($_POST['stockid']);
$type =  htmlspecialchars($_POST['type']);
$num =  htmlspecialchars($_POST['num']);
$sell =  htmlspecialchars($_POST['sell']);
$price =  htmlspecialchars($_POST['price']);

error_reporting(E_ALL);
set_time_limit(0);
echo "<h2>TCP/IP Connection</h2>\n";

$port = 2231;
$ip = "127.0.0.1";

/*
 +-------------------------------
 *    @socket连接整个过程
 +-------------------------------
 *    @socket_create
 *    @socket_connect
 *    @socket_write
 *    @socket_read
 *    @socket_close
 +--------------------------------
 */

$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
if ($socket < 0) {
    echo "socket_create() failed: reason: " . socket_strerror($socket) . "\n";
}else {
    echo "OK.\n";
}

echo "试图连接 '$ip' 端口 '$port'...\n";
$result = socket_connect($socket, $ip, $port);
if ($result < 0) {
    echo "socket_connect() failed.\nReason: ($result) " . socket_strerror($result) . "\n";
}else {
    echo "连接OK\n";
}

$in = "$Type\t$accid\t$stockid\t$index\t$type\t$num\t$type\t$num\t$sell\t$prtice";
$out = '';

if(!socket_write($socket, $in, strlen($in))) {
    echo "socket_write() failed: reason: " . socket_strerror($socket) . "\n";
}else {
    echo "发送到服务器信息成功！\n";
    echo "发送的内容为:<font color='red'>$in</font> <br>";
}

while($out = socket_read($socket, 8192)) {
    if($out == 'accept-0'){
       echo "成功发布";
    }
    else if($out == 'accept-1'){
      echo "该股票今日休市";
    }
    else if($out == 'accept-2'){
      echo "价格越界";
    }
    else if($out == 'accept-4'){
      echo "该时间点不允许发布此类交易指令";
    }
    else if($out == 'cancel-0'){
      echo "错误的时间，只有在集合竞价期间才能取消指令";
    }
    else if($out == 'cancel=1'){
      echo "取消成功";
    }
    else {
      echo "未知错误";
    }
}

echo "关闭SOCKET...\n";
socket_close($socket);
echo "关闭OK\n";
?>
