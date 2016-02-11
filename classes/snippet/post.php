<?php 
  include_once('definition.php');

  $Snippet = new Snippet();  

  if( isset($_POST['saveTitle']) ) {   
      // Update color
      $Snippet->updateTitle($_POST['id'],$_POST['title']);    
  }
  if( isset($_POST['saveDescription']) ) {   
      // Update color
      $Snippet->updateDescription($_POST['id'],$_POST['description']);    
  }
  echo 'ok';
  exit();
  
?>