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
    include_once('classes/snippet/definition.php');
    include_once('classes/tag/definition.php');
    include_once('classes/code/definition.php');    
  ?>
</head>
<body>
  <div class="wrap">
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


    ///////////////
    // Add some tags
    $Tags->add("Javascript","#39A4FF");// 1
    $Tags->add("CSS","#CD6CFF");// 2
    $Tags->add("HTML","#C18F7D");// 3
    $Tags->add("Phaser JS","#A0B300");// 4

    // Add some snippets
    for($i = 1;$i<=20;$i++){
      $Snippets->add("Snippet ". $i,"Bla, bla, bla...");
    }
    
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
    
    

    ?>
  </div>
  
</body>
</html>