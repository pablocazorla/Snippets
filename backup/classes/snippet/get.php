<?php 
  include_once('snippet.php');

  $Snippet = new Snippet();

  $jsondata = array();

  if( isset($_GET['all']) ) {

  	$jsondata = $Snippet->getList($_GET['collection_id'],$_GET['language_id']);
  	/*for ($x=0; $x <count($jsondata); $x++) {
  		$id = $jsondata[$x][0];
  		$num = $Language->getCountSnippetsById($id);  	
  		$jsondata[$x]['num_snippets'] = $num[0][0];
  	}*/
  }

  header('Content-type: application/json; charset=utf-8');
  echo json_encode($jsondata);
  exit();

?>