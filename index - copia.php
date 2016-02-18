<?php 
  session_start();
  if(isset($_SESSION["us"])){
?>
<!doctype HTML>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <title>Snippets</title>
  <meta name="description" content="">
  <meta name="keywords" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
  <!-- CSS -->
  <link href='https://fonts.googleapis.com/css?family=Lato:400,700' rel='stylesheet' type='text/css'>
  <link rel="stylesheet/less" type="text/css" href="css/style.less" />
</head>
<body>
  
  <section class="side-section">
    <div class="container">
      <div class="brand">
        <h1>Snippets</h1>
        <a href="classes/user/logout.php">Salir</a>
      </div>
      <ul class="tag-list main-tag-list" id="main-tag-list">
        <li class="tag-li-element" data-bind="css:{current:current},click:setCurrent">
          <div class="tag-section">
            <div class="tag-color-btn">
              <i class="fa fa-circle circle-sample"></i>
            </div>          
            <div class="tag-title">
              All snippets
            </div>
            <div class="tag-num" data-bind="text:num"></div>
          </div>
        </li>        
      </ul>
      
      <div  id="tag-list">
        <div class="tit">Tags <i class="fa fa-plus float-right add-tag-top" title="Add Tag" data-bind="click:add"></i></div>
        <ul class="tag-list" data-bind="foreach: list">
          <li class="tag-li-element" data-bind="css:{current:current},style:{backgroundColor: current() ? color : 'transparent'}">
            <div class="tag-section" data-bind="visible:!editMode()">
              <div class="tag-color-btn" title="Set color tag">
                <i class="fa fa-circle circle-sample" data-bind="style:{color: current() ? '#FFF' : color}"></i>
                <div class="tag-color-selector">
                  <span class="triang"></span>
                  <label>Color:</label>
                  <ul class="tag-color-selector-cuad" data-bind="foreach: colorList">
                    <li data-bind="css:{current:current},style:{backgroundColor:col},click:setColor"></li>
                  </ul>
                </div>
              </div>          
              <div class="tag-title" data-bind="text:title,click:setCurrent"></div>
              <div class="tag-num" data-bind="text:num"></div>
              <div class="tag-edit-btn" data-bind="click:editTitle" title="Edit tag title">
                <i class="fa fa-pencil"></i>
              </div>
            </div>          
            <div class="tag-section" data-bind="visible:editAndNoDeleteMode" style="display:none">
              <div class="input-title-edit">
                <input type="text" data-bind="value:title,hasFocus:editMode,event:{blur:saveTitle},keyEnterPressed:saveTitle" placeholder="Some tag title..."/>
              </div>
              <div class="tag-delete-btn" data-bind="event:{mousedown:deleteTag}" title="Delete tag">
                <i class="fa fa-trash-o"></i>
              </div>
            </div>
            <div class="tag-section" data-bind="visible:deleteMode" style="display:none">
              <div class="delete-warning">
                Delete Tag?
              </div>
              <div class="tag-del-btn no" title="Cancel">
                No
              </div>
              <div class="tag-del-btn yes" data-bind="event:{mousedown:deleteTagYes}" title="Delete tag">
                Yes
              </div>            
            </div>
          </li>     
        </ul>
        <div  class="loader" data-bind="css:{show:loading}"><div  class="loader-bg"></div><i class="fa fa-spinner fa-pulse"></i></div>  
      </div>
    </div>
  </section>
  <section class="list-section" id="snippet-list">
    <ul class="snippet-list" data-bind="foreach: list">
      <li class="snippet-li" data-bind="css:{current:current},click:setCurrent">
        <div class="snippet-li-body">
          <div class="title" data-bind="text: title"></div>
          <div class="description" data-bind="text: descriptionFormatted"></div>
      </div>        
      </li>
    </ul>
    <div  class="loader" data-bind="css:{show:loading}"><div  class="loader-bg"></div><i class="fa fa-spinner fa-pulse"></i></div>
  </section>
  <section class="content-section">
    <div class="content-body" id="snippet-content">
      <div class="wrap">
        <header>
          <div class="title">
            <div class="title-content" data-bind="visible:!editingTitle()">
              <span class="title-to-show" data-bind="text:title"></span> <a href="" data-bind="click:editTitle" class="edit title-edit"><i class="fa fa-pencil"></i> edit</a>
            </div>
            <div class="title-edit"  data-bind="visible:editingTitle" style="display:none">
              <input type="text" value="" data-bind="value:title,hasFocus:editingTitle,event:{blur:saveTitle},keyEnterPressed:saveTitle"/>
            </div>
          </div>
          <div class="description">
            <div class="description-content" data-bind="visible:!editingDescription()">
              <span class="description-to-show" data-bind="text:description"></span> <a href="" class="edit title-edit" data-bind="click:editDescription"><i class="fa fa-pencil"></i> edit</a>
            </div>
            <div class="description-edit" data-bind="visible:editingDescription" style="display:none">
              <textarea data-bind="value:description,hasFocus:editingDescription,event:{blur:saveDescription},keyEnterPressed:saveDescription"></textarea>
            </div>
          </div>
        </header>
        <div class="snippet-tags">
          <div class="snippet-tags-list" data-bind="foreach:tags">
            <div class="stag" data-bind="style:{backgroundColor:color}"><span data-bind="text:title"></span><i class="fa fa-times" title="Remove tag" data-bind="click:$parent.removeFromSnippet"></i></div>
          </div>

          <a class="stag-add" href="" data-bind="event:{blur:hideAddingTag},visible: tagsLeft().length > 0">
            <span data-bind="click:showAddingTag"><i class="fa fa-plus"></i> Add tag</span>
            <div class="tag-add-selector" data-bind="visible:addingTag" style="display:none">
              <span class="triang"></span>
              <div class="tag-add-selector-cuad" data-bind="foreach: tagsLeft">
                <div class="stag" title="Add tag" data-bind="style:{backgroundColor:color},click:$parent.addTagToSnippet"><span data-bind="text:title"></span></div>
              </div>
            </div>
          </a>
        </div>
        <div class="snippet-codes" data-bind="foreach:codes">
          <div class="code-container" data-bind="css:{editing:editing}">
            <div class="code-header">
              <div class="code-language">
                <select title="Select language" data-bind="options:languagesAvailables,optionsText:'title',optionsValue:'val',value:language"></select>
              </div>
              <a  class="edit action-code" data-bind="click:edit"><i class="fa fa-pencil"></i> Edit code</a>
              <a  class="save action-code" data-bind="click:saveEdit"><i class="fa fa-pencil"></i> Save code</a>
              <span class="or action-code">or</span>
              <a  class="cancel action-code" data-bind="click:cancelEdit">Cancel</a>
            </div>
            <div class="code-container-pre">
              <pre data-bind="attr: { id: 'editor-'+ id}"></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>




  <!--section class="top-section"></section-->



  <script src="css/less.min.js"></script>
  <script src="js/jquery-1.11.2.min.js"></script>  
  <script src="js/theme.js"></script>

  <script src="ace/ace.js" type="text/javascript" charset="utf-8"></script>

  <script src="js/ko.js"></script>
  <script src="js/boot.js"></script>
  <script src="js/tbs.js"></script>
  <script src="js/tags.js"></script>

  <script src="js/snippetList.js"></script>
  <script src="js/snippet.js"></script>
  

  
  <script src="js/app.js"></script>
</body>
</html>
<?php 
  }else{
    header("Location: login.php");
  }
?>