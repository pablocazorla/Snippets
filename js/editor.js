(function() {
  "use strict";
  if (!window.SnippetApp) {
    window.SnippetApp = {};
  }

  SnippetApp.editorVM = (function() {

    var ACE_editor,
      currentSnippet = false;

    var vm = {
      title: ko.observable('dsfsdfsd'),
      content: ko.observable(''),
      editMode: ko.observable(),
      theme: ko.observable(),
      language: ko.observable(),
      DOMbindingId: 'spp-content'
    }

    vm.update = function(snippet) {
      currentSnippet = snippet;
      vm.title(snippet.title());
      vm.language(snippet.language_lang());
      vm.content(snippet.content());
      vm.editMode(snippet.editCodeMode());
    };
    vm.edit = function() {
      if (!vm.editMode() && currentSnippet) {
        vm.editMode(true);
        currentSnippet.editCodeMode(true);
      }
    }
    vm.save = function() {
      if (vm.editMode() && currentSnippet) {
        vm.editMode(false);
        currentSnippet.editCodeMode(false);
        var content = ACE_editor.getValue();
        currentSnippet.saveContent(content);
        vm.content(content);
      }
    }


    // Subscriptions
    vm.theme.subscribe(function(v) {
      ACE_editor.setTheme('ace/theme/twilight');
    });
    vm.language.subscribe(function(v) {
      ACE_editor.session.setMode('ace/mode/' + v.toLowerCase());
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
    }

    return vm;
  })();

})();