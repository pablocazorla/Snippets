(function() {
  "use strict";
  if (!window.SnippetApp) {
    window.SnippetApp = {};
  }

  // Individual snippet VM
  var snippetVM = function(data) {

    var vm = {
      id: data.id,
      title: ko.observable(data.title),
      detail: ko.observable(data.detail),
      content: ko.observable(data.content),
      collection_id: ko.observable(data.collection_id),
      language_id: ko.observable(data.language_id),
      current: ko.observable(false),
      editCodeMode: ko.observable(false)
    };
    vm.collection_title = ko.computed(function() {
      return SnippetApp.collectionListVM.getById(vm.collection_id()).title() || '...';
    });
    vm.language_title = ko.computed(function() {
      return SnippetApp.languageListVM.getById(vm.language_id()).title || '...';
    });
    vm.language_lang = ko.computed(function() {
      return SnippetApp.languageListVM.getById(vm.language_id()).lang || null;
    });
    vm.collection_options = ko.computed(function() {
      return SnippetApp.collectionListVM.list();
    });


    vm.setCurrent = function() {
      if (!vm.current()) {
        SnippetApp.snippetListVM.current(vm.id);
      }
    };

  
    vm.current.subscribe(function(v) {
      if (v) {
        SnippetApp.editorVM.update(vm);
      }
    });
    vm.saveContent = function(content) {
      var parameters = {
        'saveContent': true,
        'id': vm.id,
        'content': content
      };
      jQuery.post('classes/snippet/post.php', parameters, function() {
        // Update snippet content
        vm.content(content);
      });
    };
    vm.edit = function(){
      ko.applyBindings(vm, document.getElementById('snippet-data-editor'));
      SnippetApp.modal.show();
    };

    return vm;
  };

  // List snippet VM
  SnippetApp.snippetListVM = (function() {

    var vm = {
      list: ko.observableArray([]),
      current: ko.observable(0)
    };

    vm.update = function(d) {
      var length = d.length,
        newList = [];

      for (var i = 0; i < length; i++) {
        var snippetData = d[i];
        newList.push(snippetVM(snippetData));
      }
      vm.list(newList);
      vm.current(newList[0].id);
    };
    vm.get = function() {
      jQuery.getJSON('classes/snippet/get.php', {
        'all': true,
        'collection_id': SnippetApp.collectionListVM.current(),
        'language_id': SnippetApp.languageListVM.current()
      }, function(data) {
        vm.update(data);
      });
    };
    /**
     * Init and bind collection list VM
     * @function
     */
    vm.init = function() {
      // Bindings
      ko.applyBindings(vm, document.getElementById('snippet-list-section'));
    };

    // Subscriptions
    vm.current.subscribe(function(v) {
      var list = vm.list(),
        length = list.length;
      for (var i = 0; i < length; i++) {
        var snpVM = list[i];
        if (snpVM.id == v) {
          snpVM.current(true);
        } else {
          snpVM.current(false);
        }
      }
    });

    return vm;
  })();

})();