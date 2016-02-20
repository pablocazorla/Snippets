<?php
  session_start();
  if(isset($_SESSION["us"])){
  include_once('definition.php');

    $User = new User();
  

    if( isset($_POST['userUpdate']) ) {
        // username,oldpassword,newpassword,email,ui_color,code_theme
        $userData = array(null,null,null,null,null,null);
        if( isset($_POST['username']) ) {
            $userData[0] = $_POST['username'];
        }
        if( isset($_POST['oldpassword']) ) {
            $userData[1] = $_POST['oldpassword'];
            $userData[2] = $_POST['newpassword'];
        }
        if( isset($_POST['email']) ) {
            $userData[3] = $_POST['email'];
        }
        if( isset($_POST['ui_color']) ) {
            $userData[4] = $_POST['ui_color'];
        }
        if( isset($_POST['code_theme']) ) {
            $userData[5] = $_POST['code_theme'];
        }
       // echo implode(",",$userData);
        // Update color
        $va = $User->updateUser($_SESSION["us"],$userData);
        echo $va;    
    }

    //echo 'ok';
    exit();
  }else{
    echo 'logout';
  } 
?>