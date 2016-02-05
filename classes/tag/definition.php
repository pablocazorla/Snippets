<?php 
  include_once(dirname(__FILE__).'/../conexion.php');

  class Tag{

    private $conexion;

    public function __construct(){
      $this->conexion = new Conexion();
    }

    public function install(){
      $sql = 'create table tags (id int not null auto_increment primary key,title varchar(200),color varchar(40))';
      $this->conexion->consult($sql);
      echo '<p>Created tags</p>';
    }

    public function add($title,$color){
      $sql = 'insert into tags values (null,"'.$title.'","'.$color.'")';
      $this->conexion->consult($sql);
      $db = $this->conexion->getDB();
      return mysqli_insert_id($db);
    }
    public function getAll(){
      $sql = 'select * from tags';
      $res = $this->conexion->consult($sql);
      return $this->conexion->toArray($res);
    }
    // Post
    public function updateColor($id,$color){
      $sql = 'update tags set color="'.$color.'" where id = '.$id;
      $this->conexion->consult($sql);
    }
    public function updateTitle($id,$title){
      $sql = 'update tags set title="'.$title.'" where id = '.$id;
      $this->conexion->consult($sql);
    }
    public function deleteTag($id){
      
      $sql = 'delete from tags where id='.$id;
      $this->conexion->consult($sql);

      $sql = 'delete from tagbysnippet where tag_id='.$id;
      $this->conexion->consult($sql);
    }

  }
  class TagBySnippet{

    private $conexion;

    public function __construct(){
      $this->conexion = new Conexion();
    }

    public function install(){
      $sql = 'create table tagbysnippet (id int not null auto_increment primary key,snippet_id int,tag_id int)';
      $this->conexion->consult($sql);
      echo '<p>Created tagbysnippet</p>';
    }

    public function getAll(){
      $sql = 'select * from tagbysnippet';
      $res = $this->conexion->consult($sql);
      return $this->conexion->toArray($res);
    }

    public function add($snippet_id,$tag_id){
      $sql = 'insert into tagbysnippet values (null,'.$snippet_id.','.$tag_id.')';
      $this->conexion->consult($sql);
    }



    public function getByTag($tag_id){
      $sql = 'select snippet_id from tagbysnippet where tag_id = '.$tag_id;
      $res = $this->conexion->consult($sql);
      return $this->conexion->toArray($res);
    }

  }
?>