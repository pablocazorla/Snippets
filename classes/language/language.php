<?php 
  include_once(dirname(__FILE__).'/../conexion.php');

  class Language{

    private $conexion;

    public function __construct(){
      $this->conexion = new Conexion();
    }

    public function install(){
      $sql = 'create table languages (id int not null auto_increment primary key,title varchar(120), lang varchar(80))';
      $this->conexion->consult($sql);     
    }

    public function add($title,$lang){
      $sql = 'insert into languages values (null,"'.$title.'","'.$lang.'")';
      $this->conexion->consult($sql);
    }

    public function getAll(){
      $sql = 'select * from languages';
      $res = $this->conexion->consult($sql);

      return $this->toArray($res);
    }
    public function getCountSnippetsById($language_id){
      $sql = 'select count(language_id) as num_snippets from snippets where language_id = '. $language_id;
      $res = $this->conexion->consult($sql);

      return $this->toArray($res);
    }

    private function toArray($res){
      $arr = array();
      while($row = mysqli_fetch_array($res)){
        $arr[]=$row;
      }
      return $arr;
    }
    
  }
?>