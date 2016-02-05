(function() {
  "use strict";
  if (!window.SnippetApp) {
    window.SnippetApp = {};
  }

  /**
   * Individual language Viewmodel
   * @constructor
   * @return {object} languageVM
   */
  var languageVM = function(data) {

    /**
     * Individual language Viewmodel
     * @object
     */
    var vm = {
      id: data.id,
      title: data.title,
      lang: data.lang,
      num_snippets: ko.observable(0),
      current: ko.observable(false)
    };

    /* COMPUTED ********************************************************/
    vm.hasSnippets = ko.computed(function() {
      return vm.num_snippets() > 0;
    });

    /* METHODS *********************************************************/
    /**
     * Set current language
     * @function
     */
    vm.setCurrent = function() {
      if (!vm.current()) {
        SnippetApp.collectionListVM.current(0);
        SnippetApp.languageListVM.current(vm.id);
      }
    };

    /* SUBSCRIPTIONS ***************************************************/
    /**
     * When current, update snippet list with the language's snippets
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
   * List language Viewmodel
   * @constructor
   * @return {object} languageListVM
   */
  SnippetApp.languageListVM = (function() {

    /**
     * List language Viewmodel
     * @object
     */
    var vm = {
      list: ko.observableArray([]),
      current: ko.observable(0)
    };

    /* PRIVATE VARIABLES *************************************************/
    /**
     * List of available languages, sorts alphabetically
     * @array
     */
    var languageData = (function() {
      var list = [],
        idCounter = 0,
        append = function(title, lang) {
          list.push({
            id: idCounter,
            title: title,
            lang: lang.toLowerCase()
          });
          idCounter++;
        },
        orderCriteria = function(a, b) {
          if (a.title < b.title) return -1;
          if (a.title > b.title) return 1;
          return 0;
        };
      append('Plain text', 'text'); // 0
      append('C++', 'C++'); // 1
      append('C#', 'C#'); // 2
      append('Coffeescript', 'Coffeescript'); // 3
      append('CSS', 'CSS'); // 4
      append('Go', 'Go'); // 5
      append('HTML', 'HTML'); // 6
      append('Java', 'Java'); // 7
      append('JavaScript', 'JavaScript'); // 8
      append('Node.js', 'Node.js'); // 9
      append('PHP', 'PHP'); // 10
      append('Python', 'Python'); // 11
      append('Ruby', 'Ruby'); // 12
      append('Shell script', 'Shell script'); // 13
      append('Salesforce Apex', 'Salesforce Apex'); // 14
      append('Salesforce Lightning', 'Salesforce Lightning'); // 15
      return list.sort(orderCriteria);
    })();

    /**
     * Create the list language, based in languageData
     * @function
     */
    vm.create = function() {
      var length = languageData.length,
        newList = [];
      for (var i = 0; i < length; i++) {
        var data = languageData[i];
        newList.push(languageVM(data));
      }
      vm.list(newList);
      vm.update();
    };

    /**
     * Update from server the number of snippets fo each language
     * @function
     */
    vm.update = function() {
      jQuery.getJSON('classes/language/get.php', {
        'num_snippets': true,
        'length': languageData.length
      }, function(data) {
        vm.each(function(lvm) {
          lvm.num_snippets(parseInt(data[lvm.id]));
        });
      });
    };

    /**
     * Iterate in the language list
     * @function
     * @param {function} Method to execute, receiving a language VM as parameter
     */
    vm.each = function(callback) {
      var list = vm.list(),
        length = list.length;
      for (var i = 0; i < length; i++) {
        callback.apply(null, [list[i]]);
      }
    };

    /**
     * Get a language VM by id
     * @function
     * @param {number} The id of the language VM
     * @return {object} The language VM
     */
    vm.getById = function(id) {
      var languageToReturn = false;
      vm.each(function(langVM) {
        if (langVM.id == id) {
          languageToReturn = langVM;
        }
      });
      return languageToReturn;
    };

    /**
     * Init and bind language list VM
     * @function
     */
    vm.init = function() {
      // Bindings
      ko.applyBindings(vm, document.getElementById('language-section'));
      // Create the list
      vm.create();
    };

    /* SUBSCRIPTIONS ***************************************************/
    /**
     * When is current changes, set current the right collection VM
     * @subscription
     */
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
    
    return vm;
  })();
})();