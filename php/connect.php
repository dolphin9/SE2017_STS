<?php

//Part 1 connect. 这部分用来连接某个固定的数据库
//       由于大组数据库有两个user，分别是reader和 writer，方便权限管理
//       本地调试时无论usr值是什么，都会改成root登录
function connectMySQL($usr){
//$DBaddr = "139.196.72.197";
//$DBusr = "writer"/"reader"
//$DBpwd = "ruangongB";
//$DB = "stock";
//$DBtable = "normalusr";
  $DBaddr = "localhost";
  $usr = "root";
  $DBpwd = "";
  $con = mysql_connect($DBaddr, $usr , $DBpwd);
  if (!$con)
    {
      die('Could not connect: ' . mysql_error());
    }
  return $con;
}

?>
