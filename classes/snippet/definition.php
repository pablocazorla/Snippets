<?php 
  include_once(dirname(__FILE__).'/../conexion.php');

  class Snippet{

    private $conexion;

    public function __construct(){
      $this->conexion = new Conexion();
    }

    public function install(){
      $sql = 'create table snippets (id int not null auto_increment primary key,title varchar(200), description text)';
      $this->conexion->consult($sql);
      echo '<p>Created snippets</p>';
    }

    public function add($title,$description){
      $sql = 'insert into snippets values (null,"'.$title.'","'.$description.'")';
      $this->conexion->consult($sql);
    }

    public function getAll(){
      $sql = 'select * from snippets';

      $res = $this->conexion->consult($sql);
      return $this->conexion->toArray($res);
    }
    
    public function getList($listIDs){

      $sql = 'select * from snippets where id in (';
      for($i = 0;$i < count($listIDs);$i++){
        $sql .= $listIDs[$i] . ', ';
      }
      $sql .= '0)';

      $res = $this->conexion->consult($sql);
      return $this->conexion->toArray($res);
    }
    public function getNumTotal(){
      $sql = 'select count(*) as num from snippets';
      $res = $this->conexion->consult($sql);
      return $this->conexion->toArray($res);
    }
    
    public function updateTitle($id,$title){
      $sql = 'update snippets set title="'.$title.'" where id = '.$id;
      $this->conexion->consult($sql);
    }
    public function updateDescription($id,$description){
      $sql = 'update snippets set description="'.$description.'" where id = '.$id;
      $this->conexion->consult($sql);
    }

  }
?>