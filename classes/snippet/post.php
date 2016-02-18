<?php
  session_start();
  if(isset($_SESSION["us"])){
    include_once('definition.php');

    $Snippet = new Snippet();  

    if( isset($_POST['saveTitle']) ) {   
        // Update color
        $Snippet->updateTitle($_POST['id'],$_POST['title']);
        echo 'ok';    
    }
    if( isset($_POST['saveDescription']) ) {   
        // Update color
        $Snippet->updateDescription($_POST['id'],$_POST['description']);
        echo 'ok';    
    }
    if( isset($_POST['addSnippet']) ) {   
        // Update color
        $id = $Snippet->add($_POST['title'],$_POST['description']);
        echo $id;    
    }
    if( isset($_POST['deleteSnippet']) ) {   
        // deleteSnippet
        $Snippet->deleteSnippet($_POST['id']);
        echo 'ok';    
    }
    exit();
  }else{
    echo 'logout';
  }
?>