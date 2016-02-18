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
  <link href='https://fonts.googleapis.com/css?family=Ubuntu:400,400italic,300,500,700' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" type="text/css" href="css/reset.css">
  <link rel="stylesheet" type="text/css" href="css/font-awesome.min.css">
  <link rel="stylesheet/less" type="text/css" href="css/style.less" />
</head>
<body>
  <section class="main-sidebar">
    <div class="brand">
      <img src="img/brand.png">
    </div>

    <ul class="list-all" id="allSnippetsListVM">
      <li data-bind="css:{current:current},click:setCurrent">
        <div class="tag-background">
          <span class="icon"><i class="fa fa-circle"></i></span>
        </div>
        <span class="title">All Snippets</span>
        <span class="count" data-bind="text:num"></span>
      </li>
    </ul>
    <div id="tagListVM">
      <div class="list-title-container">
        <div class="list-title">Tags</div>
        <a class="list-menu" href="javascript:void(0);" data-bind="event:{blur:hideMenu}">
          <i class="fa fa-bars" data-bind="click:showMenu"></i>
          <div class="float right" data-bind="slideVisible:shownMenu" style="display:none">
            <div class="float-menu">
              <span class="link color-add" data-bind="click:add"><i class="fa fa-plus"></i> Add new Tag</span>
              <hr>
              <span class="link unlink"><i class="fa fa-sort"></i> Order by</span>
              <span class="link sub" data-bind="click:orderBy('count')">Snippet count</span>
              <span class="link sub" data-bind="click:orderBy('atoz')">A to Z</span>
              <span class="link sub" data-bind="click:orderBy('ztoa')">Z to A</span>
            </div>
          </div>
        </a>
      </div>
      <div class="list-empty" data-bind="visible:empty">
        <div class="text">Not Tags yet...</div>
        <a href="" class="color-add" data-bind="click:add"><i class="fa fa-plus"></i> Add new Tag</a>
      </div>
      <div class="scroller" data-bind="visible:!empty()" style="display:none">
        <ul class="list-tags" data-bind="foreach: list">
          <li data-bind="css:{current:current,editing:showEditor}">
            <div class="tag-background">
              <span class="icon" data-bind="style:{color: color}"><i class="fa fa-circle"></i></span>
            </div>            
            <span class="title" data-bind="text:title,click:setCurrent"></span>            
            <span class="count" data-bind="text:num"></span>
            <div class="edit tip-trigger" data-bind="click:editTag">
              <i class="fa fa-pencil"></i>
              <div class="tip right inline">Edit Tag</div>
            </div>
            <div class="float center" data-bind="slideVisible:showEditor" style="display:none">
              <div class="tag-editor" data-bind="slideVisible:editMode">
                <div class="tag-delete-btn tip-trigger" data-bind="click:deleteTag">
                  <i class="fa fa-trash color-delete"></i>
                  <div class="tip right">Delete Tag</div>
                </div>
                <label>Title:</label>
                <input type="text" class="enter-text" value="" placeholder="Tag title" data-bind="textInput:title,hasFocus:inputFocus"/>
                <label>Color:</label>
                <div class="color-selector" data-bind="foreach: colorList">
                  <span data-bind="css:{current:current},style:{backgroundColor:col},click:setColor"></span>
                </div>
                <div class="actions">
                  <a href="" class="btn btn-small color-primary" data-bind="click:saveEdit">Save</a> <span class="btn btn-or btn-small">or</span> <a href="" class="btn btn-cancel btn-small" data-bind="click:cancelEditTag">Cancel</a>
                </div>
              </div>
              <div class="tag-editor tag-delete" data-bind="slideVisible:!editMode()" style="display:none">
                <div class="align-center">Delete Tag?</div>
                <div class="actions">
                  <a href="" class="btn btn-small color-delete" data-bind="click:deleteTagYes">Yes</a> <span class="btn btn-or btn-small">or</span> <a href="" class="btn btn-cancel btn-small" data-bind="click:cancelDeleteTag">Cancel</a>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <ul class="list-account">
      <hr/>
      <li>
        <div class="tag-background"></div>
        <span class="icon-tool"><i class="fa fa-cog"></i></span>
        <span class="title">Preferences</span>
      </li>
      <li id="logout-link">
        <div class="tag-background"></div>
        <span class="icon-tool"><i class="fa fa-sign-out"></i></span>
        <span class="title">Log Out</span>
      </li>
    </ul>
  </section>
  <section class="main-list" id="snippetListVM">
    <div class="list-tools">
      <a class="list-menu" data-bind="event:{blur:hideMenu}" href="javascript:void(0);">
        <i class="fa fa-bars" data-bind="click:showMenu"></i>
        <div class="float" data-bind="slideVisible:shownMenu" style="display:none">
          <div class="float-menu">
            <span class="link color-add" data-bind="click:addSnippet"><i class="fa fa-plus"></i> Add new Snippet</span>
            <hr>
            <span class="link unlink"><i class="fa fa-sort"></i> Order by</span>
            <span class="link sub" data-bind="click:orderBy('last')">Last Added</span>
            <span class="link sub" data-bind="click:orderBy('atoz')">A to Z</span>
            <span class="link sub" data-bind="click:orderBy('ztoa')">Z to A</span>
          </div>
        </div>
      </a>
      <div class="list-search" data-bind="css:{focus:searchFocus}">
        <i class="fa fa-search"></i>
        <input type="search" value="" data-bind="textInput:searchString,hasFocus:searchFocus" placeholder="Search..." />
      </div>
      <div class="list-tools-cover" data-bind="fadeVisible:empty"></div>
    </div>
    <div class="list-empty" data-bind="fadeVisible:empty">
      <div class="text">Not Snippets yet...</div>
      <a href="" class="color-add" data-bind="click:addSnippet"><i class="fa fa-plus"></i> Add new Snippet</a>
    </div>
    <div class="scroller" data-bind="visible:!empty()" style="display:none">
      <ul data-bind="foreach: list">
        <li data-bind="css:{current:current},click:setCurrent,visible:shown">
          <div class="title" data-bind="text: titleFormatted"></div>
          <div class="description" data-bind="text: descriptionFormatted"></div>
        </li>
      </ul>
    </div>
  </section>
  <section class="main-container" id="snippetVM">
    <header>
      <div class="wrap">
        <a href="" class="btn color-add" data-bind="click:addSnippet"><i class="fa fa-plus"></i> Add new Snippet</a>
        <a href="javascript:void(0);" style="display:none" class="btn color-delete circular to-right snippet-delete-btn" data-bind="event:{blur:hideDeleting},visible:!empty()">
          <div class="tip-trigger" data-bind="click:showDeleting">
            <i class="fa fa-trash"></i>
            <div class="tip w2 bottom">Delete this Snippet</div>
          </div>
          <div class="float right float-delete" data-bind="slideVisible:deleting" style="display:none">
            <div class="snippet-delete align-center">
              <div class="text-delete">Delete this Snippet?</div>
              <div class="actions">
                <span class="btn btn-small color-delete" data-bind="click:deleteSnippet">Yes</span> <span class="btn btn-or btn-small">or</span> <span class="btn btn-cancel btn-small" data-bind="click:hideDeleting">Cancel</span>
              </div>
            </div>
          </div>
        </a>
      </div>
    </header>
    <div class="scroller" data-bind="slideVisible:!empty()" style="display:none">
      <div class="wrap">
        <div class="summary">
          <div class="title-container">
            <div class="title-show" data-bind="visible:!editingTitle()">
              <span class="title" data-bind="text:titleFormatted"></span> <a href="" class="btn-edit" data-bind="click:editTitle"><i class="fa fa-pencil"></i> Edit</a>
            </div>
            <div class="title-edit" data-bind="visible:editingTitle" style="display:none">
              <input type="text" class="enter-text" value="" placeholder="Add title"  data-bind="value:title,hasFocus:editingTitle,event:{blur:saveTitle},keyEnterPressed:saveTitle"/>
            </div>
          </div>
          <div class="description-container">
            <div class="description-show" data-bind="visible:!editingDescription()">
              <span class="description" data-bind="text:descriptionFormatted"></span> <a href="" class="btn-edit" data-bind="click:editDescription"><i class="fa fa-pencil"></i> Edit</a>
            </div>
            <div class="description-edit" data-bind="visible:editingDescription" style="display:none">
              <textarea class="enter-text" placeholder="Add some description" data-bind="value:description,hasFocus:editingDescription,event:{blur:saveDescription},keyEnterPressed:saveDescription"></textarea>
            </div>
          </div>
          <div class="tags-container">
            <div class="tag-list" data-bind="foreach:tags">
              <div class="tag" data-bind="style:{backgroundColor:color}">
                <span data-bind="text:title"></span><i class="fa fa-times" data-bind="click:$parent.removeFromSnippet"></i>
              </div>
            </div>
            <a href="javascript:void(0);" class="btn-edit color-add add-tag-btn no-padding" data-bind="event:{blur:hideAddingTag},visible: tagsLeft().length > 0">
              <span data-bind="click:showAddingTag"><i class="fa fa-plus"></i> Add tag</span>
              <div class="float center" data-bind="slideVisible:addingTag" style="display:none">
                <div class="tag-adding" data-bind="foreach: tagsLeft">
                  <div class="tag" data-bind="style:{backgroundColor:color},click:$parent.addTagToSnippet">
                    <span data-bind="text:title"></span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div class="codes">
          <div class="title-container">
            <div class="title">Codes</div>
            <a href="" data-bind="click:addCode" class="color-add"><i class="fa fa-plus"></i> Add new Code</a>
          </div>
          <ul class="code-list" data-bind="foreach:codes">
            <li data-bind="css:{editing:editing},slideVisible:show">
              <div class="code-header">
                <div class="language-selector">
                  <select title="Select language" data-bind="options:languagesAvailables,optionsText:'title',optionsValue:'val',value:language"></select>
                  <i class="fa fa-caret-down"></i>
                </div>
                <a href="" data-bind="click:edit" class="btn-edit color-primary edit-code-btn bold"><i class="fa fa-pencil"></i> Edit Code</a>
                <span class="editing-actions"><a href="" data-bind="click:saveEdit" class="btn-edit color-save bold"><i class="fa fa-pencil"></i> Save Code</a> <span class="or">or</span> <a href=""  data-bind="click:cancelEdit" class="btn-edit color-cancel bold">Cancel</a></span>

                <a href="javascript:void(0);"data-bind="event:{blur:hideDelete}" class="btn-edit color-delete to-right color-delete-btn">
                   
                  <span data-bind="click:showDelete"><i class="fa fa-trash"></i> Delete Code</span>
                  <div class="float right" data-bind="slideVisible:deleting" style="display:none">
                    <div class="code-delete align-center">
                      <div class="text-delete">Delete Code?</div>
                      <div class="actions">
                        <span class="btn btn-small color-delete" data-bind="click:deleteCode">Yes</span> <span class="btn btn-or btn-small">or</span> <span class="btn btn-cancel btn-small" data-bind="click:hideDelete">Cancel</span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div class="code-container">
                <pre data-bind="attr: { id: 'editor-'+ id}"></pre>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <div id="loading-dimmer"></div>
  <div id="loading-start">
   <i class="fa fa-pencil fa-spin"></i>    
    <div class="text">Loading your Snippets...</div>
  </div> 

  <div class="modal" id="preferencesVM" style="display:none">
    <div class="dimmer"></div>
    <div class="box">
      <i class="fa fa-times modal-close" title="Close"></i>
      <div class="preferences-container">
        <div class="title">Preferences</div>
        <div class="row clearfix">
          <div class="col s6">
            <fieldset>
              <label>Username: *</label>
              <input type="text" value="Pablo Cazorla"/>
            </fieldset>
            <fieldset>
              <label>Email: *</label>
              <input type="text" value="pablo.david.cazorla@gmail.com"/>
            </fieldset>
            <div class="row clearfix">
              <div class="col s6">
                <fieldset>
                  <label>UI color:</label>
                  <select><option>Light</option><option>Dark</option></select>
                  <i class="fa fa-caret-down"></i>
                </fieldset>
              </div>
              <div class="col s6">
                <fieldset>
                  <label>Code theme:</label>
                  <select><option>Light</option><option>Dark</option></select>
                  <i class="fa fa-caret-down"></i>
                </fieldset>
              </div>
            </div>
          </div>
          <div class="col s6">
            <div>
              <fieldset>
                <label>Password: *</label>
                <div class="pass-edit">
                  <i class="fa fa-circle"></i>
                  <i class="fa fa-circle"></i>
                  <i class="fa fa-circle"></i>
                  <i class="fa fa-circle"></i>
                  <i class="fa fa-circle"></i>
                  <i class="fa fa-circle"></i>
                  <i class="fa fa-circle"></i>
                  <i class="fa fa-circle"></i>
                  <a href="" class="edit">
                    <i class="fa fa-pencil"></i>
                    Edit
                  </a>
                </div>
              </fieldset>
            </div>
            <div style="display:none">
              <fieldset>
                <label>Enter old Password: *</label>
                <input type="password" value="sdfsdfsdfdsf"/>
              </fieldset>
              <fieldset>
                <label>Enter new Password: *</label>
                <input type="password" value="sdfsdfsdfdsf"/>
              </fieldset>
              <fieldset>
                <label>Enter new Password again: *</label>
                <input type="password" value="sdfsdfsdfdsf"/>
              </fieldset>
            </div>            
          </div>  
        </div>
        <div class="actions">
          <a data-bind="" class="btn color-primary btn-big" href="">Save</a> <span class="btn btn-or btn-big">or</span> <a data-bind="" class="btn btn-cancel btn-big" href="">Cancel</a>
        </div>
      </div>
    </div>
  </div>


  <script src="css/less.min.js"></script>
  <script src="js/jquery-1.11.2.min.js"></script>
  <script src="js/jquery.nicescroll.min.js"></script>
  
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