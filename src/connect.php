<?php
//"139.196.72.97" = "139.196.72.197";
//"ruangongB" = "ruangongB";
//"stock" = "stock";
//normalusr = "normalusr";

//Part 1 connect. 这部分用来连接某个固定的数据库
//       由于大组数据库有两个user，分别是reader和 writer，方便权限管理
//       本地调试时无论usr值是什么，都会改成root登录
function connectMySQL($usr){
  //$DBaddr = "139.196.72.97";
  //$DBpwd = "ruangongB"
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

//Part2 insert 连接数据库并向数据库中插入值， 这里为注册操作
//      此处使用的user为writer，database为stock，table为nomalusr
//      默认输入的信息都是合法的。
function usrregister($usrname,$pwd,$name,$email,$phone,$sex,$idnum,$accountname,$fmaddr){
  $con = connectMySQL('writer');
  mysql_select_db("stock" , $con);
  $sql = "INSERT INTO normalusr (usrname,pwd,email,phone,name,sex,idnum,  accountname,fmaddr)
  VALUES
  ( '$usrname' , '$pwd' ,  '$email' , '$phone' ,'$name' , '$sex', '$idnum',    '$accountname','$fmaddr'  )
  ";
  if(!mysql_query($sql,$con))
  {
    die('Error: ' . mysql_error());
  }
  echo "register ok!";
  mysql_close($con);
}

//Part3 用户登录部分

function usrlogin($usrname,$pwd){
  $con = connectMySQL('reader');
  mysql_select_db("stock", $con);
  $sql = "SELECT * FROM normalusr WHERE (usrname='$usrname') AND (pwd ='$pwd')";
  if(!mysql_query($sql,$con))
  {
    die('Error: ' . mysql_error());
  }
  
  echo "register ok!";
  mysql_close($con);
}

?>
