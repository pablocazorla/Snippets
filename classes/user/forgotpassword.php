<?php
  session_start();
  include_once('definition.php');

  $User = new User();  



  $us = $User->getByEmail($_POST['email']);

  if(count($us) > 0){
    $user_id = $us[0][0];
    $username = $us[0][1];

    $chain = $user_id . $username . rand(1,9999999) . date('Y-m-d');

    $sha_user_id = sha1($user_id);
    $token = sha1($chain);

    $res = $User->addToReset($sha_user_id,$token);

    if($res){
      $link = $_SERVER["SERVER_NAME"].'/recoverpassword.php?id='.$sha_user_id.'&tk='.$token;
      //echo 'true';
      echo $link;
    }
  }else{
    echo 'false';
  }

?>