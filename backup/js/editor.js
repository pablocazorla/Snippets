(function() {
  "use strict";
  if (!window.SnippetApp) {
    window.SnippetApp = {};
  }

  SnippetApp.editorVM = (function() {

    var ACE_editor;

    var vm = {
      snippet : ko.observable(false),      
      content: ko.observable(''),
      editMode: ko.observable(),
      theme: ko.observable()
    }
    vm.title = ko.computed(function(){
      if(vm.snippet()){
        return vm.snippet().title();
      }
      return '';
    });
    vm.language = ko.computed(function(){
      if(vm.snippet()){
        return vm.snippet().language_lang();
      }
      return '';
    });

    vm.update = function(snippet) {
      vm.snippet(snippet);
      vm.content(snippet.content());
      vm.editMode(snippet.editCodeMode());
    };
    vm.edit = function() {
      if (!vm.editMode()) {
        vm.editMode(true);
        vm.snippet().editCodeMode(true);
      }
    }
    vm.save = function() {
      if (vm.editMode()) {
        vm.editMode(false);
        vm.snippet().editCodeMode(false);
        var content = ACE_editor.getValue();
        vm.snippet().saveContent(content);
        vm.content(content);
      }
    }

    // Subscriptions
    vm.theme.subscribe(function(v) {
      ACE_editor.setTheme('ace/theme/twilight');
    });
    vm.language.subscribe(function(v) {
      if(v){
        ACE_editor.session.setMode('ace/mode/' + v.toLowerCase());
      }      
    });
    vm.content.subscribe(function(v) {
      ACE_editor.setValue(v);
    });
    vm.editMode.subscribe(function(v) {
      ACE_editor.setReadOnly(!v);
    });


    vm.init = function() {
      ACE_editor = ace.edit('editor');
      ACE_editor.session.setUseWrapMode(true);
      ACE_editor.$blockScrolling = Infinity;
      vm.theme('twilight');
      vm.editMode(false);

      // Bindings
      ko.applyBindings(vm, document.getElementById('spp-content'));
    }

    return vm;
  })();

})();