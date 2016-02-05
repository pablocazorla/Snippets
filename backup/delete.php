<!doctype HTML>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <title>Snippets Delete</title>
  <meta name="description" content="">
  <meta name="keywords" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
  <!-- CSS -->
  <link href='https://fonts.googleapis.com/css?family=Noto+Sans:400,700' rel='stylesheet' type='text/css'>
  <link type="text/css" rel="stylesheet" href="css/reset.css">
  <link type="text/css" rel="stylesheet" href="css/theme.css">
  <link type="text/css" rel="stylesheet" href="css/style.css">

  <?php
    include_once('classes/conexion.php');
  ?>
</head>
<body>
  <div class="wrap">
    <h1>Delete All</h1>
    <?php 

    $t = 'DROP TABLE collections, languages, snippets';

    $con = new Conexion();
    $con->set($t);

    ?>
  </div>
  
</body>
</html>