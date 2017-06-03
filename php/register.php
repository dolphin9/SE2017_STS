<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <?php
    require_once("connect.php");
    //error_reporting(0);
    $usrname = $pwd = $idnum = "";
    $name = $email = $phone = "";
    $sex = $accountname ="";
    $state = "";

    $usrname = htmlspecialchars($_POST['usrname']);
    $pwd = MD5($_POST['pwd']);
    $email =  htmlspecialchars($_POST['email']);
//    $name = htmlspecialchars($_POST['name']);
  //  $email = htmlspecialchars($_POST['email']);
//    $phone = htmlspecialchars($_POST['phone']);
//    $sex = htmlspecialchars($_POST['sex']);
//    $accountname = htmlspecialchars($_POST['accountname']);



    //Part2 insert 连接数据库并向数据库中插入值， 这里为注册操作
    //      此处使用的user为writer，database为stock，table为nomalusr
    //      默认输入的信息都是合法的。
    function usrregister($usrname,$pwd,$email){
      $con = connectMySQL('writer');
      mysql_select_db("stock" , $con);
      $sql = "INSERT INTO normalusr (usrname,pwd,email)
      VALUES
      ( '$usrname' , '$pwd' ,  '$email' )
      ";
      if(!mysql_query($sql,$con))
      {
        die('Error: ' . mysql_error());
      }
      echo "register ok!";
      mysql_close($con);
      header("Location:/profile.html");
    }

    usrregister($usrname,$pwd,$email);

    ?>

  </body>
</html>
