<?php 
  include_once('definition.php');

  $Tag = new Tag();
  $TagBySnippet = new TagBySnippet();

  $jsondata = array();

	if( isset($_GET['all']) ) {
    $jsondata = $Tag->getAll();
  }

  if( isset($_GET['tbs']) ) {
    $jsondata = $TagBySnippet->getAll();
  }



  header('Content-type: application/json; charset=utf-8');
  echo json_encode($jsondata);
	//echo $jsondata[1][2];
  exit();
  
?>