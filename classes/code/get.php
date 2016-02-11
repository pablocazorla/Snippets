<?php 
  include_once('definition.php');  

  $Code = new Code();  

  $jsondata = array();


  if( isset($_GET['list']) ) {
    $jsondata = $Code->getCodes($_GET['snippet_id']);  
  }

  header('Content-type: application/json; charset=utf-8');
  echo json_encode($jsondata);
  exit();

?>