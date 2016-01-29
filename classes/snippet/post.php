<?php 
  include_once('snippet.php');

  $Snippet = new Snippet();

  if( isset($_POST['edit']) ) {
    $Snippet->editInfo($_POST['id'],$_POST['title'],$_POST['detail'],$_POST['collection_id'],$_POST['language_id']);
  }
  if( isset($_POST['saveContent']) ) {
  	$Snippet->saveContent($_POST['id'],$_POST['content']);
  }
?>