(function() {
  "use strict";
  if (!window.SnippetApp) {
    window.SnippetApp = {};
  }

  // Individual collection VM
  var collectionVM = function(data) {
    var titleCache = '',
      isNewCollection = true;

    var vm = {
      id: data.id,
      title: ko.observable('Untitled'),
      num_snippets: ko.observable(0),
      editing: ko.observable(false),
      deleting: ko.observable(false),
      visible: ko.observable(true),
      current: ko.observable(false),
    };

    vm.update = function(d) {
      var datanames = ['title', 'num_snippets', 'editing'];
      for (var i = 0; i < datanames.length; i++) {
        if (typeof d[datanames[i]] !== 'undefined') {
          vm[datanames[i]](d[datanames[i]]);
        }
      }
    };
    vm.edit = function() {
      titleCache = vm.title();
      isNewCollection = false;
      vm.editing(true);
    };
    vm.save = function() {
      if (vm.title().length <= 0) {
        vm.title(titleCache);
      }
      vm.editing(false);

      if (vm.title() != titleCache) {
        // Save data in server
        var parameters = {
          'saveCollection': true,
          'id': vm.id,
          'title': vm.title()
        };
        if (isNewCollection) {
          parameters.newCollection = true;
        }
        jQuery.post('classes/collection/post.php', parameters);
      }
      if (isNewCollection && vm.title() == '') {
        // Update collection from server
        SnippetApp.collectionListVM.get();
      }
    };
    vm.deleteConfirm = function() {
      vm.editing(false);
      vm.deleting(true);
    };
    vm.deleteNo = function() {
      vm.deleting(false);
    };
    vm.deleteYes = function() {
      vm.deleting(false);
      vm.visible(false);

      // Delete data in server
      var parameters = {
        'deleteCollection': true,
        'id': vm.id
      };
      jQuery.post('classes/collection/post.php', parameters, function() {
        // Update collection from server
        SnippetApp.collectionListVM.get();
      });
    };
    vm.setCurrent = function() {
      if (!vm.current()) {
        SnippetApp.languageListVM.current(0);
        SnippetApp.collectionListVM.current(vm.id);
      }
    };

    // Subscription
    vm.current.subscribe(function(v) {
      if (v) {
        SnippetApp.snippetListVM.get();
      }
    });

    vm.update(data);
    return vm;
  };

  // List collection VM
  SnippetApp.collectionListVM = (function() {
    // private
    var sort = function(list) {
      var criteria = function(a, b) {
        if (a.num_snippets() < b.num_snippets()) return 1;
        if (a.num_snippets() > b.num_snippets()) return -1;
        return 0;
      };
      return list.sort(criteria);
    };
    //
    var vm = {
      list: ko.observableArray([]),
      current: ko.observable(0),
      DOMbindingId:'collection-section'
    };

    vm.update = function(d) {
      var length = d.length,
        newList = [];

      for (var i = 1; i < length; i++) {
        var collectionData = d[i];
        newList.push(collectionVM(collectionData));
      }
      newList = sort(newList);
      vm.list(newList);
      vm.current(newList[0].id);
    };
    vm.get = function() {
      jQuery.getJSON('classes/collection/get.php', {
        'all': true
      }, function(data) {
        vm.update(data);
      });
    };
    vm.add = function() {
      var newCollection = collectionVM({
        id: 0,
        title: '',
        num_snippets: 0,
        editing: true
      });
      vm.list.push(newCollection);
    };
    vm.emptyList = ko.computed(function() {
      return vm.list().length <= 0;
    });

    // Subscriptions
    vm.current.subscribe(function(v) {
      var list = vm.list(),
        length = list.length;
      for (var i = 0; i < length; i++) {
        var colVM = list[i];
        if (colVM.id == v) {
          colVM.current(true);
        } else {
          colVM.current(false);
        }
      }
    });

    vm.init = function(){
      vm.get();
    };

    
    return vm;
  })();
})();