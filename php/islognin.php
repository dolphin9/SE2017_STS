<?php
session_start();
 if(isset($_SESSION)){
   echo json_encode(array("result" => 1, "username" => $_SESSION['username']));
 }
 else {
   echo json_encode(array("result" => 0));
 }

?>
