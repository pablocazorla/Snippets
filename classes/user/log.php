<?php
  session_start();
  include_once('definition.php');

  $User = new User();  

  $idLogged = $User->isLogged($_POST['username'],$_POST['password']);

  $messageToReturn = '';
  
  if($idLogged > 0){
    // SESSION
    $_SESSION["us"] = $idLogged;    
    $messageToReturn = 'true';
  }else{
    $messageToReturn = 'false';
  }
  echo $messageToReturn;
?>