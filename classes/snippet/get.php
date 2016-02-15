<?php
  session_start();
  if(isset($_SESSION["us"])){
    include_once('definition.php');  

    $Snippet = new Snippet();  

    $jsondata = array();

    if( isset($_GET['all']) ) {
      $jsondata = $Snippet->getAll();  
    }
    if( isset($_GET['list']) ) {
      $jsondata = $Snippet->getList($_GET['listIds']);  
    }
    if( isset($_GET['numTotal']) ) {
    	$jsondata = $Snippet->getNumTotal();  
    }

    header('Content-type: application/json; charset=utf-8');
    echo json_encode($jsondata);
    exit();
  }else{
    echo 'logout';
  }
?>