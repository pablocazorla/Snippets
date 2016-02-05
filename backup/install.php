<!doctype HTML>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <title>Snippets Installation</title>
  <meta name="description" content="">
  <meta name="keywords" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
  <!-- CSS -->
  <link href='https://fonts.googleapis.com/css?family=Noto+Sans:400,700' rel='stylesheet' type='text/css'>
  <link type="text/css" rel="stylesheet" href="css/reset.css">
  <link type="text/css" rel="stylesheet" href="css/theme.css">
  <link type="text/css" rel="stylesheet" href="css/style.css">

  <?php
    include_once('classes/collection/collection.php');
    include_once('classes/language/language.php');
    include_once('classes/snippet/snippet.php');
  ?>
</head>
<body>
  <div class="wrap">
    <h1>Installation</h1>
    <?php 

    // Create table collections
    $Collections = new Collection();
    $Collections->install();
    // Add default collection
    $Collections->add('');
    $Collections->add('jQuery examples');
    $Collections->add('PhaserJS');
    $Collections->add('Google Plus');

    // Create table snippets
    $Snippets = new Snippet();
    $Snippets->install();
    // Add default snippet
    $Snippets->add('jquery Sandbox', 'es una prueba', '.item{display:none;}',2,4);
    $Snippets->add('jquery Sandbssasox', 'es una prueba', 'var item = function(irt){var r = 45;}',2,8);
    $Snippets->add('jquery Sandasdasbox', 'es una prueba', 'yiouyi',4,6);
    $Snippets->add('jquery Sandsdsbox', 'es una prueba', 'php echo $item;',3,10);

    

    ?>
  </div>
  
</body>
</html>