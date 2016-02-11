<?php 
  include_once('definition.php');

  $Tag = new Tag();
  $tbs = new TagBySnippet();  

  if( isset($_POST['updateColor']) ) {   
      // Update color
      $Tag->updateColor($_POST['id'],$_POST['color']);    
  }
  if( isset($_POST['updateTitle']) ) {   
      // Update color
      $Tag->updateTitle($_POST['id'],$_POST['title']);    
  }
  if( isset($_POST['deleteTag']) ) {   
      // Update color
      $Tag->deleteTag($_POST['id']);    
  }
  if( isset($_POST['addNewTag']) ) {   
      // add New Tag
      $num = $Tag->add($_POST['title'],$_POST['color']);
     echo $num;
  }
  if( isset($_POST['addTagToSnippet']) ) {   
      // add New Tag to Snippet
      $tbs->add($_POST['snippet_id'],$_POST['tag_id']);
  }
  if( isset($_POST['removeTagFromSnippet']) ) {   
      // add New Tag to Snippet
      $tbs->deleteTag($_POST['snippet_id'],$_POST['tag_id']);
  } 

  echo 'ok';
  exit();
  
?>