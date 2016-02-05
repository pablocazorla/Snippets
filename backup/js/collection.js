(function() {
  "use strict";
  if (!window.SnippetApp) {
    window.SnippetApp = {};
  }

  /**
   * Individual collection Viewmodel
   * @constructor
   * @return {object} collectionVM
   */
  var collectionVM = function(data,isNew) {

    /**
     * Individual collection Viewmodel
     * @object
     */
    var vm = {
      id: data.id,
      title: ko.observable(data.title),
      num_snippets: ko.observable(data.num_snippets),
      editing: ko.observable(false),
      deleting: ko.observable(false),
      visible: ko.observable(true),
      current: ko.observable(false)
    };

    /* PRIVATE VARIABLES ***********************************************/
    var titleCache = '', // Cache for title when edit
      isNewCollection = isNew || false; 

    /* METHODS *********************************************************/
    /**
     * Edit the title of the collection
     * @function
     */
    vm.edit = function() {
      titleCache = vm.title();
      vm.editing(true);
    };

    /**
     * Save the new title of the collection
     * @function
     */
    vm.save = function() {
      // Validate if title is empty, return to previous title
      if (vm.title().length <= 0) {
        vm.title(titleCache);
      }
      if (vm.title() != titleCache) {
        // Save new title in server
        var parameters = {
          'saveCollection': true,
          'id': vm.id,
          'title': vm.title()
        };
        // Save all new collection in server
        if (isNewCollection) {
          parameters.newCollection = true;
          isNewCollection = false;
        }
        jQuery.post('classes/collection/post.php', parameters);
      }
      /*if (isNewCollection && vm.title() == '') {
        // Update collection from server
        SnippetApp.collectionListVM.get();
      }*/
      vm.editing(false);
    };

    /**
     * Pop up confirmation
     * @function
     */
    vm.deleteConfirm = function() {
      vm.editing(false);
      vm.deleting(true);
    };

    /**
     * Cancel deleting
     * @function
     */
    vm.deleteNo = function() {
      vm.deleting(false);
    };

    /**
     * Delete collection
     * @function
     */
    vm.deleteYes = function() {
      vm.deleting(false);
      vm.visible(false);

      // Delete collection in server
      var parameters = {
        'deleteCollection': true,
        'id': vm.id
      };
      jQuery.post('classes/collection/post.php', parameters, function() {
        // Update collection from server
        SnippetApp.collectionListVM.get();
      });
    };

    /**
     * Set current collection
     * @function
     */
    vm.setCurrent = function() {
      if (!vm.current()) {
        // Erase possible current language
        SnippetApp.languageListVM.current(0);
        // Set current by id collection
        SnippetApp.collectionListVM.current(vm.id);
      }
    };

    /* SUBSCRIPTIONS ***************************************************/
    /**
     * When current, update snippet list with the collection's snippets
     * @subscription
     */
    vm.current.subscribe(function(v) {
      if (v) {
        SnippetApp.snippetListVM.get();
      }
    });

    return vm;
  };

  /**
   * List collection Viewmodel
   * @constructor
   * @return {object} collectionListVM
   */
  SnippetApp.collectionListVM = (function() {

    /**
     * List collection Viewmodel
     * @object
     */
    var vm = {
      list: ko.observableArray([]),
      current: ko.observable(0)
    };
    vm.emptyList = ko.computed(function() {
      return vm.list().length <= 0;
    });

    /* PRIVATE METHODS *************************************************/
    /**
     * Sort list collection by number of snippets, from max to min
     * @function
     * @param {array} list of collections in JSON format
     * @return {array} list sorted
     */
    var sort = function(list) {
      var criteria = function(a, b) {
        if (a.num_snippets() < b.num_snippets()) return 1;
        if (a.num_snippets() > b.num_snippets()) return -1;
        return 0;
      };
      return list.sort(criteria);
    };

    /* METHODS *********************************************************/
    /**
     * Get collection from server
     * @function
     */
    vm.get = function() {
      jQuery.getJSON('classes/collection/get.php', {
        'all': true
      }, function(data) {
        var length = data.length,
          newList = [];

        for (var i = 1; i < length; i++) {
          // Create a new collection VM and push to list
          var newCollectionVM = collectionVM(data[i]);
          newList.push(newCollectionVM);
        }

        // Order list
        newList = sort(newList);
        vm.list(newList);

        // Set the first collection to current. It update also the snippet list
        vm.current(newList[0].id);
      });
    };

    /**
     * Add new collection
     * @function
     */
    vm.add = function() {
      var newCollection = collectionVM({
        id: 0,
        title: 'new collection',
        num_snippets: 0,
        editing: true
      }, true);
      vm.list.push(newCollection);
      newCollection.edit();
    };

    /**
     * Iterate in the collection list
     * @function
     * @param {function} Method to execute, receiving a collection VM as parameter
     */
    vm.each = function(callback) {
      var list = vm.list(),
        length = list.length;
      for (var i = 0; i < length; i++) {
        callback.apply(null, [list[i]]);
      }
    };

    /**
     * Get a collection VM by id
     * @function
     * @param {number} The id of the collection VM
     * @return {object} The collection VM
     */
    vm.getById = function(id) {
      var collectionToReturn = false;
      vm.each(function(colVM) {
        if (colVM.id == id) {
          collectionToReturn = colVM;
        }
      });
      return collectionToReturn;
    };

    /**
     * Init and bind collection list VM
     * @function
     */
    vm.init = function() {
      // Bindings
      ko.applyBindings(vm, document.getElementById('collection-section'));
      // Get from server
      vm.get();
    };


    /* SUBSCRIPTIONS ***************************************************/
    /**
     * When is current changes, set current the right collection VM
     * @subscription
     */
    vm.current.subscribe(function(v) {
      vm.each(function(colVM) {
        if (colVM.id == v) {
          colVM.current(true);
        } else {
          colVM.current(false);
        }
      });
    });

    return vm;
  })();
})();