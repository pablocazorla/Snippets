<?php
  session_start();
  include_once('definition.php');

  $User = new User();  

  $isLogged = $User->isLogged($_POST['username'],$_POST['password']);

  $messageToReturn = '';
  
  if($isLogged){
    // SESSION
    $_SESSION["us"] = $_POST['username'];    
    $messageToReturn = 'true';
  }else{
    $messageToReturn = 'false';
  }
  echo $messageToReturn;
?>