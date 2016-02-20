<?php
  session_start();
  if(isset($_SESSION["us"])){
    include_once('definition.php');

    $User = new User();

    $jsondata = array();

  	if( isset($_GET['userData']) ) {
      $jsondata = $User->getUserData($_SESSION["us"]);
    }

    header('Content-type: application/json; charset=utf-8');
    echo json_encode($jsondata);
    exit();
  }else{
    echo 'logout';
  }
?>