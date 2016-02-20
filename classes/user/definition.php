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
        email varchar(100),
        ui_color varchar(10),
        code_theme varchar(20)
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

    public function add($username,$password,$email,$ui_color,$code_theme){
      $sql = 'insert into users values (null,"'.$username.'","'.sha1($password).'","'.$email.'","'.$ui_color.'","'.$code_theme.'")';
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
      $sql = 'select id from users where username="'.$username.'" and password="'.sha1($password).'"';
      $res = $this->conexion->consult($sql);
      if(mysqli_num_rows($res) == 0){
        // Not Logged
        return 0;
      }else{
        // Yes Logged
        $arr = $this->conexion->toArray($res);
        $id = $arr[0][0];
        return $id;
      }
    }

    public function getUserData($id){
      $sql = 'select * from users where id="'.$id.'"';
      $res = $this->conexion->consult($sql);
      return $this->conexion->toArray($res);
    }

    public function updateUser($id,$userData){
      $oldPass = $userData[1];
      $enabledPassChange = false;
      if($oldPass != null){
        $sql = 'select * from users where password="'.sha1($oldPass).'"';
        $res = $this->conexion->consult($sql);
        if(mysqli_num_rows($res) > 0){
          $enabledPassChange = true;
        }
      }

      $sql = 'update users set ';  

      if($userData[0] != null){
        $sql .= 'username="'.$userData[0].'",';
      }
      if($userData[2] != null && $enabledPassChange){
        $sql .= 'password="'.sha1($userData[2]).'",';
      }
      if($userData[3] != null){
        $sql .= 'email="'.$userData[3].'",';
      }
      if($userData[4] != null){
        $sql .= 'ui_color="'.$userData[4].'",';
      }
       if($userData[5] != null){
        $sql .= 'code_theme="'.$userData[5].'",';
      }

      $sql = substr_replace($sql, "", -1);

      $sql .= ' where id="'.$id.'"';

      $this->conexion->consult($sql);
    }

    
  } 
?>