<?php 
  include_once(dirname(__FILE__).'/../conexion.php');

  class Code{

    private $conexion;

    public function __construct(){
      $this->conexion = new Conexion();
    }

    public function install(){
      $sql = 'create table if not exists codes (id int not null auto_increment primary key,snippet_id int,content text,language varchar(50))';
      $this->conexion->consult($sql);
      echo '<p>Created codes</p>';
    }
    public function add($snippet_id,$content,$language){
      $sql = 'insert into codes values (null,'.$snippet_id.',"'.$content.'","'.$language.'")';
      $this->conexion->consult($sql);
      $db = $this->conexion->getDB();
      return mysqli_insert_id($db);
    }
    public function getCodes($snippet_id){
      $sql = 'select * from codes where snippet_id='.$snippet_id;
      $res = $this->conexion->consult($sql);
      return $this->conexion->toArray($res);
    }
    public function updateLanguage($id,$language){
      $sql = 'update codes set language="'.$language.'" where id = '.$id;
      $this->conexion->consult($sql);
    }
    public function updateContent($id,$content){
      $sql = 'update codes set content="'.$content.'" where id = '.$id;
      $this->conexion->consult($sql);
    }
    public function deleteCode($id){      
      $sql = 'delete from codes where id='.$id;
      $this->conexion->consult($sql);
    }

  }
?>