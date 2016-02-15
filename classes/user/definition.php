<?php 
  include_once(dirname(__FILE__).'/../conexion.php');

  class User{

    private $conexion;

    public function __construct(){
      $this->conexion = new Conexion();
    }

    public function install(){
      // table users
      $sql = 'create table if not exists users (
        id int not null auto_increment primary key,
        username varchar(100),
        password varchar(64),
        email varchar(100)
        )';

      $this->conexion->consult($sql);
      echo '<p>Created users</p>';

      // table usersresetpassword
      $sql = 'create table if not exists usersresetpassword (
        id int not null auto_increment primary key,
        id_user varchar(64),
        token varchar(64)
        )';

      $this->conexion->consult($sql);
      echo '<p>Created usersresetpassword</p>';
    }

    public function add($username,$password,$email){
      $sql = 'insert into users values (null,"'.$username.'","'.sha1($password).'","'.$email.'")';
      $this->conexion->consult($sql);
    }

    public function addToReset($user_id,$token){
      $sql = 'insert into usersresetpassword values (null,"'.$user_id.'","'.$token.'")';
      return $this->conexion->consult($sql);
    }


    public function getByEmail($email){
      $sql = 'select * from users where email="'.$email.'"';
      $res = $this->conexion->consult($sql);
      return $this->conexion->toArray($res);
    }
    public function getByToken($token){
      $sql = 'select * from usersresetpassword where token="'.$token.'"';
      $res = $this->conexion->consult($sql);
      return $this->conexion->toArray($res);
    }

    public function isLogged($username,$password){
      $sql = 'select * from users where username="'.$username.'" and password="'.sha1($password).'"';
      $res = $this->conexion->consult($sql);
      if(mysqli_num_rows($res) == 0){
        // Not Logged
        return false;
      }else{
        // Yes Logged
        return true;
      }
    }
  } 
?>