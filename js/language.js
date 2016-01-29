(function() {
  "use strict";
  if (!window.SnippetApp) {
    window.SnippetApp = {};
  }

  // Individual language VM
  var languageVM = function(data) {
    var vm = {
      id: data.id,
      title: data.title,
      lang: data.lang,
      num_snippets: ko.observable(data.num_snippets),
      current: ko.observable(false)
    };
    vm.setCurrent = function() {
      if (!vm.current()) {
        SnippetApp.collectionListVM.current(0);
        SnippetApp.languageListVM.current(vm.id);
      }
    };

    // Subscription
    vm.current.subscribe(function(v) {
      if (v) {
        SnippetApp.snippetListVM.get();
      }
    });
    return vm;
  };

  // List language VM
  SnippetApp.languageListVM = (function() {
    var sort = function(list) {
      var criteria = function(a, b) {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      }
      return list.sort(criteria);
    };
    //
    var vm = {
      list: ko.observableArray([]),
      current: ko.observable(0),
      DOMbindingId:'language-section'
    };

    vm.update = function(d) {
      var length = d.length,
        newList = [];

      for (var i = 1; i < length; i++) {
        var languageData = d[i];
        if (languageData.num_snippets > 0) {
          newList.push(languageVM(languageData));
        }
      }
      newList = sort(newList);
      vm.list(newList);
    };
    vm.get = function() {
      jQuery.getJSON('classes/language/get.php', {
        'all': true
      }, function(data) {
        vm.update(data);
      });
    };

    // Subscriptions
    vm.current.subscribe(function(v) {
      var list = vm.list(),
        length = list.length;
      for (var i = 0; i < length; i++) {
        var lanVM = list[i];
        if (lanVM.id == v) {
          lanVM.current(true);
        } else {
          lanVM.current(false);
        }
      }
    });

    vm.init = function(){
      vm.get();
    };
    return vm;
  })();
})();