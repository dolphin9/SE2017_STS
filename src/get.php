<?php

// 指定允许其他域名访问
header('Access-Control-Allow-Origin:*');

// 响应类型
header('Access-Control-Allow-Methods:GET,POST,PUT');
header('Access-Control-Allow-Headers:x-requested-with,content-type');

$abc = $def = $a = $b = $c = "";

$a =$_GET['abc'];
$b =$_GET['def'];

echo var_dump($_GET);
echo "<br>";

echo "a=$a"."<br>";
echo "b=$b"."<br>";

$c = $a + $b;

echo "$c";

die($c);
 ?>
