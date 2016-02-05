<?php 
  include_once(dirname(__FILE__).'/../conexion.php');

  class Snippet{

    private $conexion;

    public function __construct(){
      $this->conexion = new Conexion();
    }

    public function install(){
      $sql = 'create table snippets (id int not null auto_increment primary key,title varchar(200), detail text, content text, collection_id int, language_id int)';
      $this->conexion->consult($sql);     
    }

    public function add($title,$detail,$content,$collection_id,$language_id){
      $sql = 'insert into snippets values (null,"'.$title.'","'.$detail.'","'.$content.'",'.$collection_id.','.$language_id.')';
      $this->conexion->consult($sql);
    }

    public function editInfo($id,$title,$detail,$collection_id,$language_id){
      $sql = 'update snippets set ';
      $sql .= 'title="'.$title.'",';
      $sql .= 'detail="'.$detail.'",';
      $sql .= 'collection_id='.$collection_id.',';
      $sql .= 'language_id='.$language_id;
      $sql .= ' where id='.$id;   

      $this->conexion->consult($sql);
    }

    public function saveContent($id,$content){
      $sql = 'update snippets set content="'.$content.'" where id='.$id;
      $this->conexion->consult($sql);
    }

    public function getList($collection_id,$language_id){
      $filter = '';
      $nexus = '';
      if($collection_id > 0){
        $filter .= 'collection_id = '.$collection_id;
      }
      if($language_id > 0){
        if($collection_id > 0){
          $nexus = ' and ';
        }
        $filter .= $nexus.'language_id = '.$language_id;
      }
      $sql = 'select * from snippets where '.$filter;
      $res = $this->conexion->consult($sql);

      return $this->toArray($res);
    }
    public function quitFromCollection($collection_id){
      $sql = 'update snippets set collection_id=1 where collection_id=' . $collection_id;
      $this->conexion->consult($sql);
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