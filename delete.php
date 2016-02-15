<!doctype HTML>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <title>Snippets Delete</title>
  <meta name="description" content="">
  <meta name="keywords" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">

  <?php
    include_once('classes/conexion.php');
  ?>
</head>
<body>
  <div class="wrap">
    <h1>Delete All</h1>
    <?php 

    $t = 'DROP TABLE snippets,tags,codes,tagbysnippet,users';

    $con = new Conexion();
    $con->set($t);
    echo 'Deleted all tables';
    ?>
  </div>
  
</body>
</html>