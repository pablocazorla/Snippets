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
  <link href='https://fonts.googleapis.com/css?family=Noto+Sans:400,700' rel='stylesheet' type='text/css'>
  <link rel="stylesheet/less" type="text/css" href="css/style.less" />
</head>
<body>
  <div id="spp-top-bar"></div>
  <div id="spp-side-bar">
    <div id="spp-side-bar-container">
      <div class="collapser show" id="collection-section">
        <div class="collapser-header">
          <div class="collapser-trigger">COLLECTIONS</div>
          <a data-bind="visible:!emptyList(),click: add" href="" title="Add new collection" class="btn btn-small float-right"><i class="fa fa-plus"></i> Add</a>
        </div>        
        <div class="collapser-content">
          <div class="empty-list-message-cont" data-bind="visible:emptyList">
            <div class="empty-list-message">Not collections yet</div>
            
            <a data-bind="click: add" href="" class="btn btn-primary btn-small"><i class="fa fa-plus"></i> Add new collection</a>
          </div>
          <ul id="collection-list" data-bind="visible:!emptyList(),foreach: list">
            <li data-bind="visible:visible,css: { editing:editing,deleting:deleting,current:current}">
              <div class="collection-editor">
                <input type="text" placeholder="Untitled" data-bind="value:title,hasFocus:editing,event:{blur:save}"/>
                <span class="action delete" data-bind="event:{mousedown:deleteConfirm}" title="Delete collection"><i class="fa fa-close"></i></span>                
              </div>
              <div class="collection-delete-confirm">
                Delete? <span class="action no-delete" data-bind="click:deleteNo" title="Keep collection"><i class="fa fa-check"></i> no</span> <span class="action delete yes-delete" data-bind="click:deleteYes" title="Delete collection"><i class="fa fa-close"></i> yes</span>
              </div>
              <span class="title" data-bind="text:title,click:setCurrent"></span>
              <span class="action edit" data-bind="click:edit"><i class="fa fa-pencil"></i> edit</span>
              <span class="num" data-bind="text:num_snippets,click:setCurrent"></span>
            </li>
          </ul>          
        </div>
      </div>
      <div class="collapser show" id="language-section">
        <div class="collapser-header">
          <div class="collapser-trigger">LANGUAGES</div>
        </div>
          <div class="collapser-content">
            <ul id="language-list" data-bind="foreach: list">
            <li data-bind="css: {current:current},click:setCurrent">
              <span class="title" data-bind="text:title"></span>
              <span class="num" data-bind="text:num_snippets"></span>
            </li>
          </ul>   
          </div>
      </div>
    </div>
  </div>
  <div id="spp-side-bar-selector">
    <div id="snippet-list-section">
      <ul id="snippet-list" data-bind="foreach: list">    
        <li data-bind="css: {current:current},click:setCurrent">
          <div class="title" data-bind="text: title"></div>
          <div class="row">
            <div class="col-6">
              <div class="spp-group">COLLECTION</div>
              <div class="spp-group-title" data-bind="text: collection_title"></div>
            </div>
            <div class="col-6">
              <div class="spp-group">LANGUAGE</div>
              <div class="spp-group-title" data-bind="text: language_title"></div>
            </div>
          </div>
          <span class="edit" data-bind=""><i class="fa fa-pencil"></i> edit</span>
        </li>
      </ul>
      <div id="snippet-list-toolbar">
        <a href="" class="btn btn-primary add-new-snippet"><i class="fa fa-plus"></i> Add new Snippet</a>
      </div>
    </div>
  </div>
  
  <div id="spp-content" data-bind="css: {editMode:editMode}">
    <div class="spp-top-bar-content">
        <div class="snippet-title" data-bind="text:title"></div>
        <span class="btn-edit-content edit" title="Edit the code" data-bind="click:edit"><i class="fa fa-pencil"></i> Edit</span>
        <span class="btn-edit-content save" title="Save the current code" data-bind="click:save"><i class="fa fa-pencil"></i> Save</span>
    </div>
    <div class="spp-content-editor">
      <pre id="editor"></pre>
    </div>
  </div>

  <script src="css/less.min.js"></script>

  <script src="js/jquery-1.11.2.min.js"></script>
  <script src="js/ko.js"></script>
  <script src="js/theme.js"></script>
  <script src="ace/ace.js" type="text/javascript" charset="utf-8"></script>
  <script src="js/collection.js"></script>
  <script src="js/language.js"></script>
  <script src="js/snippet.js"></script>
  <script src="js/editor.js"></script>

  
  <script src="js/app.js"></script>
</body>
</html>