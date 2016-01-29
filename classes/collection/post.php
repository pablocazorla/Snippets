<?php 
  include_once('collection.php');

  $Collection = new Collection();  

  if( isset($_POST['saveCollection']) ) {

    if( isset($_POST['newCollection']) ) {
      // Add new collection
      $Collection->add($_POST['title']);
    }else{
      // Edit collection
      $Collection->edit($_POST['id'],$_POST['title']);
    }
  }

  if( isset($_POST['deleteCollection']) ) {
    include_once('../snippet/snippet.php');
    $Snippet = new Snippet();
    // quit all snippets from this collection
    $Snippet->quitFromCollection($_POST['id']);
    // delete collection
    $Collection->deleteCollection($_POST['id']);
  }

  exit();
  
?>