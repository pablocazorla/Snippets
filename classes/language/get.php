<?php 
  include_once('language.php');

  $Language = new Language();

  $jsondata = array();

  if( isset($_GET['all']) ) {
  	$jsondata = $Language->getAll();
  	for ($x=0; $x <count($jsondata); $x++) {
  		$id = $jsondata[$x][0];
  		$num = $Language->getCountSnippetsById($id);  	
  		$jsondata[$x]['num_snippets'] = $num[0][0];
  	}
  }

  header('Content-type: application/json; charset=utf-8');
  echo json_encode($jsondata);
  exit();
  
?>