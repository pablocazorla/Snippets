<?php 
  include_once(dirname(__FILE__).'/../config.php');
  class Conexion{

    private $db;

    public function __construct(){

      $cfg = new Config();

      $this->db = new mysqli('localhost',$cfg->database_username,$cfg->database_password,$cfg->database_name);
      if($this->db->connect_errno > 0){
        die('<h1>Imposible conectarse con la base de datos!</h1>');
      }
    }
   
    public function consult($sql){
      if(!$res = $this->db->query($sql)){
          die('<h1>Ocurri&oacute; un error: [' . $this->db->error . ']</h1>');
      }
      return $res;
    }
    public function getDB(){      
      return $this->db;
    }

    public function createTable($name,$fields){
      $sql = 'create table '. $name .' (id int not null auto_increment primary key,'.$fields.')';
      $this->consult($sql);     
    }

    
    public function toArray($res){
      $table = array();
      while($row = mysqli_fetch_array($res)){
        $table[]=$row;
      }
      return $table;
    }
    /*

    

    public function getTable($nameTable){
      $res = $this->consult('select * from '. $nameTable);
      return $this->toTable($res);
    }
    
    public function get($sql){
      $res = $this->consult($sql);
      return $this->toTable($res);
    }

    */

    public function set($sql){
      $this->consult($sql);     
    }
    
  }
?>