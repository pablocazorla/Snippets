<?php 
  include_once('collection.php');

  $Collection = new Collection();

  $jsondata = array();

  if( isset($_GET['all']) ) {
  	$jsondata = $Collection->getAll();
  	for ($x=0; $x <count($jsondata); $x++) {
  		$id = $jsondata[$x][0];

  		$num = $Collection->getCountSnippetsById($id);
  	
  		//array_push($jsondata[$x],$num[0][0]);
  		$jsondata[$x]['num_snippets'] = $num[0][0];

  	}

  	//$jsondata = $Collection->getCountSnippetsById(1);
  }

  header('Content-type: application/json; charset=utf-8');
  echo json_encode($jsondata);
	//echo $jsondata[1][2];
  exit();
  
?>