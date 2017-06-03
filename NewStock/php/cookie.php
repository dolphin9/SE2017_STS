<?php
session_start();
$func = $_POST['func'];
$return = 1;
if ($func == "login")
{
    $user = $_POST['user'];
    $passwd = $_POST['passwd'];
    if ($user == "admin" && $passwd == "GroupB1")
    {
        srand(time());
        $sequence = md5(rand(0, 100000));
        setcookie($user, $sequence);
        $_SESSION[$user] = $sequence;
        $return = 0;
    }
    else if ($user != "admin")
        $return = 1;
    else
        $return = 2;
}
else if ($func == "logout")
{
    $user = $_POST['user'];
    unset($_SESSION[$user]);
    setcookie($user, "");
    $return = 0;
}
else if ($func == "check")
{
    $user = $_POST['user'];
    if ($user != null && isset($_COOKIE[$user]) && $_COOKIE[$user] == $_SESSION[$user])
        $return = 0;
}
echo $return;
?>
