<?php
  session_start();
  if(isset($_SESSION["us"])){
    include_once('definition.php');

    $Code = new Code();  

    if( isset($_POST['changeLanguage']) ) {   
      // Update language
      $Code->updateLanguage($_POST['id'],$_POST['language']);    
    }

    if( isset($_POST['changeContent']) ) {   
      // Update language
      $Code->updateContent($_POST['id'],$_POST['content']);    
    }

    echo 'ok';
    exit();
  }else{
    echo 'logout';
  }
?>