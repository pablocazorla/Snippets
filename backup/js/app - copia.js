(function($) {
  "use strict";

  var enabled = false,
    Modal;


  /* Utils *********************************/
  var Utils = (function() {
    var ajx = function(getOrPost, list, parameters, callback) {
      $.ajax({
        url: 'classes/' + list + '/'+getOrPost.toLowerCase()+'.php',
        dataType: 'json',
        data: parameters,
        type: getOrPost,
        success: callback
      });
    };
    return {
      get: function(list, parameters, callback) {
        ajx('GET', list, parameters, callback);
      },
      post: function(list, parameters, callback) {
        ajx('POST', list, parameters, callback);
      },
      sortList: function(by, arr) {
        var criteria = {
          num_snippets: function(a, b) {
            if (a.num_snippets < b.num_snippets) return 1;
            if (a.num_snippets > b.num_snippets) return -1;
            return 0;
          },
          title: function(a, b) {
            if (a.title < b.title) return -1;
            if (a.title > b.title) return 1;
            return 0;
          }
        }
        return arr.sort(criteria[by]);
      }
    }

  })();

  /* Group ************************************************/
  var groups = {};
  var Group = function(name) {
    var nameList = name,
      g = {};
    g.cache;
    g.$list;
    g.render = function() {};
    g.updateList = function(force, callback) {
      var cbk = callback || function() {};
      if (force) {
        Utils.get(nameList, {
          'all': true
        }, function(data) {
          g.cache = data;
          g.render();
          cbk();
        });
      } else {
        g.render();
        cbk();
      }
    };
    g.getById = function(id) {
      var l = g.cache.length;
      for (var i = 0; i < l; i++) {
        var c = g.cache[i];
        if (c.id === id) {
          return c;
        }
      }
    };
    g.unselect = function() {
      g.$list.find('li').removeClass('current');
    };
    g.selectItem = function(idSelect, force) {
      if (enabled) {
        for (var a in groups) {
          groups[a].unselect();
        }
        g.$list.find('li').each(function() {
          var $this = $(this);
          if ($this.attr('data-id') == idSelect) {
            $this.addClass('current');
          }
        });
        var parameters = {};
        parameters[nameList + '_id'] = idSelect;
        Snippet.updateList(parameters, force);
      }
    };
    g.init = function(callback) {
      g.$list = $('#' + nameList + '-list');
      g.updateList(true, callback);
    };
    groups[nameList] = g;
    return g;
  };

  /* Collection *********************************/
  var Collection = Group('collection');
  Collection.render = function() {
    var list = Utils.sortList('num_snippets', this.cache),
      l = list.length,
      self = this,
      renderLi = function(c) {
        var $li = $('<li data-id="' + c.id + '"/>').appendTo(self.$list),
          $title = $('<span class="title">' + c.title + '</span>').appendTo($li),
          $edit = $('<span class="edit" data-id="' + c.id + '"><i class="fa fa-pencil"></i> edit</span>').appendTo($li),
          $num = $('<span class="num">' + c.num_snippets + '</span>').appendTo($li);

        $li.click(function() {
          self.selectItem(c.id);
        });
      };

    for (var i = 0; i < l; i++) {
      renderLi(list[i]);
    }
  };

  /* Language *********************************/
  var Language = Group('language');
  Language.render = function() {
    var list = Utils.sortList('title', this.cache),
      l = list.length,
      self = this,
      renderLi = function(c) {
        if (parseInt(c.num_snippets) > 0) {
          var $li = $('<li data-id="' + c.id + '"/>').appendTo(self.$list),
            $title = $('<span class="title">' + c.title + '</span>').appendTo($li),
            $num = $('<span class="num">' + c.num_snippets + '</span>').appendTo($li);
          $li.click(function() {
            self.selectItem(c.id);
          });
        }
      };

    for (var i = 0; i < l; i++) {
      renderLi(list[i]);
    }
  };
  /* Snippet */
  var Snippet = (function() {
    var s = {
      $list: null,
      currentCollection: 0,
      currentLanguage: 0,
      init: function() {
        s.$list = $('#snippet-list');
      },
      cache: {},
      render: function() {
        this.$list.html('');
        var arr = this.cache[this.currentCollection + '_' + this.currentLanguage],
          l = arr.length,
          self = this,
          renderLi = function(c) {
            var lan = Language.getById(c.language_id);
            var txt = '<li data-id="' + c.id + '">';
            txt += '<div class="title">' + c.title + '</div>';
            txt += '<div class="row"><div class="col-6">';
            txt += '<div class="spp-group">COLLECTION</div>';
            txt += '<div class="spp-group-title">' + Collection.getById(c.collection_id).title + '</div>';
            txt += '</div><div class="col-6">';
            txt += '<div class="spp-group">LANGUAGE</div>';
            txt += '<div class="spp-group-title">' + lan.title + '</div>';
            txt += '</div></div></li>';
            var $li = $(txt).appendTo(self.$list);

            var $edit = $('<span class="edit" title="Edit snippet info" data-id="' + c.id + '"><i class="fa fa-pencil"></i> edit</span>').appendTo($li);


            $li.click(function() {
              self.selectItem(c.id, c.content, lan.lang);
            });
            $edit.click(function() {
              self.edit(c);
            });
          };
        if (l === 0) {
          $('<li>No snippets</li>').appendTo(this.$list);
          self.unselect();
        } else {
          for (var i = 0; i < l; i++) {
            renderLi(arr[i]);
          }
          this.selectItem(arr[0].id, arr[0].content);
        }
      },
      updateList: function(par, force) {
        var parameters = $.extend({
            'list': true,
            'collection_id': 0,
            'language_id': 0
          }, par),
          forcedUpdate = function() {
            Utils.get('snippet', parameters, function(data) {
              s.cache[parameters.collection_id + '_' + parameters.language_id] = data;
              s.currentCollection = parameters.collection_id;
              s.currentLanguage = parameters.language_id;
              s.render();
            });
          }

        if (force) {
          forcedUpdate();
        } else {
          if (this.cache[parameters.collection_id + '_' + parameters.language_id] !== undefined) {
            this.currentCollection = parameters.collection_id;
            this.currentLanguage = parameters.language_id;
            this.render();
          } else {
            forcedUpdate();
          }
        }
      },
      getById: function(id) {
        var arr = this.cache[this.currentCollection + '_' + this.currentLanguage],
          l = arr.length;
        for (var i = 0; i < l; i++) {
          if (arr[i].id === id) {
            return arr[i];
          }
        }
      },
      unselect: function() {
        Editor.text();
      },
      selectItem: function(id, cont, lang) {
        this.$list.find('li').removeClass('current').each(function() {
          var $this = $(this);
          if ($this.attr('data-id') == id) {
            $this.addClass('current');
          }
        });

        var content = cont || this.getById(id).content;
        var language = lang || Language.getById(this.getById(id).language_id).lang;

        console.log(language);
        Editor.text(content, language.toLowerCase());
      },
      edit: function(c, isNewSnippet) {
        var m = $.extend({
          title: '',
          detail: '',
          collection_id: 0,
          language_id: 0
        }, c);

        var $modalContent = $('<div class="modal-edit-snippet"/>');
        Modal.content($modalContent);

        var $modaltitle = $('<h3>Edit snippet</h3>').appendTo($modalContent),
          $f1 = $('<fieldset/>').appendTo($modalContent),
          $l1 = $('<label class="required">Title:</label>').appendTo($f1),
          $inputTitle = $('<input type="text" value="' + m.title + '" placeholder="Add a title for this snippet">').appendTo($f1),
          $f2 = $('<fieldset/>').appendTo($modalContent),
          $l2 = $('<label>Description:</label>').appendTo($f2),
          $inputDetail = $('<textarea placeholder="Add some description (optional)">' + m.detail + '</textarea>').appendTo($f2),
          $f3 = $('<fieldset/>').appendTo($modalContent),
          $row1 = $('<div class="row"/>').appendTo($f3),
          $col1 = $('<div class="col-6"/>').appendTo($row1),
          $col2 = $('<div class="col-6"/>').appendTo($row1),

          $l3 = $('<label>Collection:</label>').appendTo($col1),
          $selectCollection = $('<select/>').appendTo($col1),
          $l4 = $('<label>Language:</label>').appendTo($col2),
          $selectLanguage = $('<select/>').appendTo($col2);

        var renderSelect = function($select, group, idselected) {
          var arr = group.cache,
            l = arr.length,
            txt = '';
          for (var i = 0; i < l; i++) {
            var c = arr[i];
            txt += '<option value="' + c.id + '">' + c.title + '</option>';
          }
          $select.html(txt);
          $select.val(idselected);
        }

        renderSelect($selectCollection, Collection, m.collection_id);
        renderSelect($selectLanguage, Language, m.language_id);

        var modify = function() {
          var param = {            
            id: m.id,
            title: $inputTitle.val(),
            detail: $inputDetail.val(),
            collection_id: $selectCollection.val(),
            language_id: $selectLanguage.val()
          };

          if(!isNewSnippet){
            param.edit = true;
          }

          Utils.post('snippet', param, function(){
            
          });

        };

        Modal.actions([{
          text: 'Ok',
          className: 'btn btn-primary btn-big',
          click: function(m) {
            modify();
            m.hide();
          }
        }, {
          text: '<span class="sep">or</span>'
        }, {
          text: 'Cancel',
          className: 'btn btn-big btn-cancel',
          click: function(m) {
            m.hide();
          }
        }]).show();
      }

    };
    return s;
  })();
  var Editor = (function() {
    var editor;

    var ed = {
      init: function() {
        editor = ace.edit("editor");
        editor.setTheme("ace/theme/twilight");
        editor.session.setUseWrapMode(true);
      },
      theme: function(name) {
        var n = name || 'twilight';
        editor.setTheme('ace/theme/' + n);
      },
      text: function(cont, lang) {
        var content = cont || '';
        var language = lang || 'javascript';

        editor.session.setMode('ace/mode/' + language);
        editor.setValue(content);
      }
    }
    return ed;
  })();



  // Start application
  $('document').ready(function() {

    Modal = Pandora.modal();

    Collection.init(function() {
      Language.init(function() {
        Snippet.init();
        Editor.init();
        enabled = true;
        Collection.$list.find('li').eq(0).click();
      });
    });


  });
})(jQuery);