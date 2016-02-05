<?php 
  include_once(dirname(__FILE__).'/../conexion.php'); 

  class Collection{

    private $conexion;

    public function __construct(){
      $this->conexion = new Conexion();
    }

    // Utils
    private function toArray($res){
      $arr = array();
      while($row = mysqli_fetch_array($res)){
        $arr[]=$row;
      }
      return $arr;
    }

    // POST
    public function install(){
      $sql = 'create table collections (id int not null auto_increment primary key,title varchar(200))';
      $this->conexion->consult($sql);     
    }

    public function add($title){
      $sql = 'insert into collections values (null,"'.$title.'")';
      $this->conexion->consult($sql);
    }
    public function edit($id,$title){
      $sql = 'update collections set title="'.$title.'" where id = '.$id;
      $this->conexion->consult($sql);
    }
    public function deleteCollection($id){
      $sql = 'delete from collections where id='.$id;
      $this->conexion->consult($sql);
    }    

    // GET
    public function getAll(){
      $sql = 'select * from collections';
      $res = $this->conexion->consult($sql);

      return $this->toArray($res);
    }
    public function getCountSnippetsById($collection_id){
      $sql = 'select count(collection_id) as num_snippets from snippets where collection_id = '. $collection_id;
      $res = $this->conexion->consult($sql);

      return $this->toArray($res);
    }    
    
  }
?>