

<nav class="light-blue lighten-1" role="navigation">
    <div class="nav-wrapper container">
      <a id="logo-container" href="./" class="brand-logo">
        <b>B组的股票交易系统<b>
      </a>
      <ul class="right hide-on-med-and-down">
        <!--<li><a href="#">Navbar Link</a></li>
        <li><a  href="\phpmyadmin\">mysql</a></li>-->
        <li id="hello" class="center-aligen">您好<?php  session_start(); echo (isset($_SESSION['username'])? $_SESSION['username']:'游客')  ?> </li>
       

	<?php
	    if (isset($_SESSION['username']))
	    {?>
			<li id="logout"><a href="javascript:"  onclick="logout()">退出</a></li>
	    <?php			
	    } else
	    {
	    ?>
			<li id="nbprofileurl"><a  herf="/signin.html">登录</a></li>
	   <?php } ?>

	
	
      </ul>
    </div>
    <div>

  </div>
</nav>


<script type="text/javascript"> 

function logout()
{ 	 
	<?php session_unset() ?>;  
	 window.location.href="http://www.baidu.com";
} 
</script> 