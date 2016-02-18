<?php
  session_start();
  if(isset($_SESSION["us"])){
    include_once('definition.php');

    $Code = new Code();  

    if( isset($_POST['changeLanguage']) ) {   
      // Update language
      $Code->updateLanguage($_POST['id'],$_POST['language']);
      echo 'ok';   
    }

    if( isset($_POST['changeContent']) ) {   
      // Update language
      $Code->updateContent($_POST['id'],$_POST['content']);
      echo 'ok';   
    }

    if( isset($_POST['addCode']) ) {   
      // add code
      $id = $Code->add($_POST['snippet_id'],$_POST['content'],$_POST['language']);
      echo $id; 
    }
    if( isset($_POST['deleteCode']) ) {   
      // Update language
      $Code->deleteCode($_POST['id']);
      echo 'ok';
    }


  }else{
    echo 'logout';
  }
?>