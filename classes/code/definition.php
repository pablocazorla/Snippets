<?php 
  include_once(dirname(__FILE__).'/../conexion.php');

  class Code{

    private $conexion;

    public function __construct(){
      $this->conexion = new Conexion();
    }

    public function install(){
      $sql = 'create table codes (id int not null auto_increment primary key,snippet_id int,content text,language varchar(50))';
      $this->conexion->consult($sql);
      echo '<p>Created codes</p>';
    }

       
    

  }
?>