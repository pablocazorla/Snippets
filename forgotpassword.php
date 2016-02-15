<?php 
  
?>
<!doctype HTML>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <title>I forgot my Password - Snippets</title>
  <meta name="description" content="">
  <meta name="keywords" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
  <!-- CSS -->
  <link href='https://fonts.googleapis.com/css?family=Lato:400,700' rel='stylesheet' type='text/css'>
  <link rel="stylesheet/less" type="text/css" href="css/style.less" />
  <style type="text/css">
  

  </style>
</head>
<body>
  <div class="log-box">
    <form class="form-big" data-bind="validationOptions: { decorateInputElement: true, errorElementClass: 'error' }">
      <h2>Recuperar Password</h2>
      <p class="input-help">* Fields required.</p>
      
      <fieldset>
        <label class="required">Email:</label>
        <input type="text" placeholder="Your Email" data-bind="value:email">
      </fieldset>
      <fieldset class="align-center">
        <a  class="btn btn-primary btn-big" href="" data-bind="click:subm">Send me an email</a>
      </fieldset>
      <fieldset data-bind="visible:resultMessageVisible">
        <p data-bind="text:resultMessage"></p>
      </fieldset>
    </form>
  </div>
  
 


  <script src="css/less.min.js"></script>
  <script src="js/jquery-1.11.2.min.js"></script> 
  <script src="js/ko.js"></script>
  <script src="js/ko.validation.js"></script>
  <script src="js/forgotpassword.js"></script>
</body>
</html>