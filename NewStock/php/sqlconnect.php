<?php
function getSQLConnect()
{
    $host = 'localhost';
    $user = 'root';
    $password = 'xhz636';
    $database = 'stock';
    $mysqli = new mysqli($host, $user, $password, $database);
    if (mysqli_connect_error()) {
        echo mysqli_connect_error();
        exit;
    }
    $mysqli->set_charset("utf8");
    return $mysqli;
}
function freeSQLConnect($mysqli)
{
    $mysqli->close();
}
?>
