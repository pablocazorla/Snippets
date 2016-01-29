(function() {
  "use strict";
  if (!window.SnippetApp) {
    window.SnippetApp = {};
  }

  // Individual snippet VM
  var snippetVM = function(data) {
    var vm = {
      id: data.id,
      title: ko.observable('Untitled'),
      detail: ko.observable(''),
      content: ko.observable(''),
      collection_id: ko.observable(0),
      language_id: ko.observable(0),
      collection_title: ko.observable(''),
      language_title: ko.observable(''),
      language_lang: ko.observable(''),
      current: ko.observable(false),
      editCodeMode: ko.observable(false)
    };

    vm.update = function(d) {
      var datanames = ['title', 'detail', 'content', 'collection_id', 'language_id'];
      for (var i = 0; i < datanames.length; i++) {
        if (typeof d[datanames[i]] !== 'undefined') {
          vm[datanames[i]](d[datanames[i]]);
        }
      }
    };
    vm.setCurrent = function() {
      if (!vm.current()) {
        SnippetApp.snippetListVM.current(vm.id);
      }
    };

    // Subscriptions
    vm.collection_id.subscribe(function(v) {
      var list = SnippetApp.collectionListVM.list();
      length = list.length;
      for (var i = 0; i < length; i++) {
        var colVM = list[i];
        if (colVM.id == v) {
          vm.collection_title(colVM.title());
        }
      }
    });
    vm.language_id.subscribe(function(v) {
      var list = SnippetApp.languageListVM.list();
      length = list.length;
      for (var i = 0; i < length; i++) {
        var lanVM = list[i];
        if (lanVM.id == v) {
          vm.language_title(lanVM.title);
          vm.language_lang(lanVM.lang);
        }
      }
    });
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

    vm.update(data);
    return vm;
  };

  // List snippet VM
  SnippetApp.snippetListVM = (function() {

    var vm = {
      list: ko.observableArray([]),
      current: ko.observable(0),
      DOMbindingId: 'snippet-list-section'
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