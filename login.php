<?php 
  session_start();
  if(!isset($_SESSION["us"])){
?>
<!doctype HTML>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <title>Login Snippets</title>
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
      <h2>Entrar</h2>
      <p class="input-help">* Fields required.</p>
      <fieldset>
        <label class="required">User Name:</label>
        <input type="text" placeholder="Your User Name" data-bind="value:username,event:{focus:hideErrorLogin}">
      </fieldset>
      <fieldset>
        <label class="required">Password:</label>
        <input type="password" placeholder="Your Password" data-bind="value:password,event:{focus:hideErrorLogin}">
      </fieldset>
      <fieldset id="login-error" data-bind="visible:errorLogin" style="display:none">
        <div class="validationMessage align-center">The User Name or Password doesn't match.<br>Please, try again.</div>
      </fieldset>
      <fieldset class="align-center">
        <a  class="btn btn-primary btn-big" href="" data-bind="click:subm">Log In</a>
      </fieldset>
      <fieldset class="align-center">
        <a href="forgotpassword.php">I forgot my password.</a>
      </fieldset>
  
    </form>
  </div>
  
 


  <script src="css/less.min.js"></script>
  <script src="js/jquery-1.11.2.min.js"></script> 
  <script src="js/ko.js"></script>
  <script src="js/ko.validation.js"></script>
  <script src="js/log.js"></script>
</body>
</html>
<?php 
  }else{
    header("Location: index.php");
  }
?>