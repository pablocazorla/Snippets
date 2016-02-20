<!doctype HTML>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <title>Snippets Installation</title>
  <meta name="description" content="">
  <meta name="keywords" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
  
  <?php
  // delete 
  include_once('classes/conexion.php');
  //
  include_once('classes/snippet/definition.php');
  include_once('classes/tag/definition.php');
  include_once('classes/code/definition.php');
  include_once('classes/user/definition.php');    
  ?>
</head>
<body>
  <div class="wrap">
    
    <h1>Delete All</h1>
    <?php
    $t = 'DROP TABLE snippets,tags,codes,tagbysnippet,users,usersresetpassword';
    $con = new Conexion();
    $con->set($t);
    echo 'Deleted all tables';
    ?>

    <h1>Installation</h1>
    <?php 

    // Create table snippets
    $Snippets = new Snippet();
    $Snippets->install();

    // Create table tags
    $Tags = new Tag();
    $Tags->install();

    // Create table TagBySnippet
    $TagBySnippets = new TagBySnippet();
    $TagBySnippets->install();

    // Create table codes
    $Codes = new Code();
    $Codes->install();

    // Create table users
    $Users = new User();
    $Users->install();


    ///////////////
    // Add some tags
    $Tags->add("Javascript","#39A4FF");// 1
    $Tags->add("CSS","#CD6CFF");// 2
    $Tags->add("HTML","#C18F7D");// 3
    $Tags->add("Phaser JS","#A0B300");// 4
    echo 'Add some tags<br>';

    // Add some snippets
    for($i = 1;$i<=20;$i++){
      $Snippets->add("Snippet ". $i,"Bla, bla, bla...");
    }
    echo 'Add some snippets<br>';
    // some tags
    for($i = 1;$i<=8;$i++){
      $TagBySnippets->add($i,1);
    }
    for($i = 4;$i<=14;$i++){
      $TagBySnippets->add($i,2);
    }
    for($i = 10;$i<=20;$i++){
      $TagBySnippets->add($i,3);
    }
    echo 'Add tags to snippets<br>';
    // Add some codes
    for($i = 1;$i<=20;$i++){
      $Codes->add($i,'var src = Ejemplo'.$i.';','javascript');
      $Codes->add($i,'.ejemplo'.$i.'{display:none;}','css');
      $Codes->add($i,'h1 Este es el ejemplo '.$i.' h1','html');
    }
    echo 'Add some codes<br>';
    // Add basic user
    $Users->add('pablo','123456','pablo.david.cazorla@gmail.com','light','molokai');
    echo 'Add basic user<br>';

    ?>
  </div>
  
</body>
</html>