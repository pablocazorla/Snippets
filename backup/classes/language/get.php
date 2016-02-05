<?php 
  include_once('language.php');

  $Language = new Language();

  $jsondata = array();

  if( isset($_GET['num_snippets']) ) {

  	for ($x=0; $x < $_GET['length']; $x++) {
      $num = $Language->getCountSnippetsById($x);
      $jsondata[$x] = $num[0][0];
    }
  	
  }
  header('Content-type: application/json; charset=utf-8');
  echo json_encode($jsondata);
  exit();
  
?>