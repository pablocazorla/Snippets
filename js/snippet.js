(function() {
	"use strict";
	/* PRIVATE VARIABLES ***********************************************/

	/**
	 * List of availables languages for codes
	 * @array
	 */
	var languagesAvailables = [{
			title: 'Plain Text',
			val: 'plain_text'
		}, {
			title: 'Abap',
			val: 'abap'
		}, {
			title: 'Abc',
			val: 'abc'
		}, {
			title: 'Actionscript',
			val: 'actionscript'
		}, {
			title: 'Ada',
			val: 'ada'
		}


		, {
			title: 'Apache conf',
			val: 'apache_conf'
		}, {
			title: 'Applescript',
			val: 'applescript'
		}, {
			title: 'Ascii',
			val: 'asciidoc'
		}, {
			title: 'Assembly x86',
			val: 'assembly_x86'
		}, {
			title: 'Autohotkey',
			val: 'autohotkey'
		}, {
			title: 'Batch file',
			val: 'batchfile'
		}, {
			title: 'Cirru',
			val: 'cirru'
		}, {
			title: 'Clojure',
			val: 'clojure'
		}, {
			title: 'COBOL',
			val: 'cobol'
		}, {
			title: 'Coffeescript',
			val: 'coffee'
		}, {
			title: 'Coldfusion',
			val: 'coldfusion'
		}, {
			title: 'C#',
			val: 'csharp'
		}, {
			title: 'CSS',
			val: 'css'
		}, {
			title: 'Curly',
			val: 'curly'
		}, {
			title: 'C cpp',
			val: 'c_cpp'
		}, {
			title: 'D',
			val: 'd'
		}, {
			title: 'Dart',
			val: 'dart'
		}, {
			title: 'Diff',
			val: 'diff'
		}, {
			title: 'Django',
			val: 'django'
		}, {
			title: 'Docker file',
			val: 'dockerfile'
		}, {
			title: 'Dot',
			val: 'dot'
		}, {
			title: 'Eiffel',
			val: 'eiffel'
		}, {
			title: 'EJS',
			val: 'ejs'
		}, {
			title: 'Elixir',
			val: 'elixir'
		}, {
			title: 'ELM',
			val: 'elm'
		}, {
			title: 'Erlang',
			val: 'erlang'
		}, {
			title: 'Forth',
			val: 'forth'
		}, {
			title: 'FTL',
			val: 'ftl'
		}, {
			title: 'G code',
			val: 'gcode'
		}, {
			title: 'Gherkin',
			val: 'gherkin'
		}, {
			title: 'Git Ignore',
			val: 'gitignore'
		}, {
			title: 'GLSL',
			val: 'glsl'
		}, {
			title: 'Gobstones',
			val: 'gobstones'
		}, {
			title: 'Golang',
			val: 'golang'
		}, {
			title: 'Groovy',
			val: 'groovy'
		}, {
			title: 'HAML',
			val: 'haml'
		}, {
			title: 'Handlebars',
			val: 'handlebars'
		}, {
			title: 'Haskell',
			val: 'haskell'
		}, {
			title: 'Haxe',
			val: 'haxe'
		}, {
			title: 'HTML',
			val: 'html'
		}, {
			title: 'Java',
			val: 'java'
		}, {
			title: 'Javascript',
			val: 'javascript'
		}, {
			title: 'JSON',
			val: 'json'
		}, {
			title: 'JSP',
			val: 'jsp'
		}, {
			title: 'Lean',
			val: 'lean'
		}, {
			title: 'Less CSS',
			val: 'less'
		}, {
			title: 'Liquid',
			val: 'liquid'
		}, {
			title: 'Lisp',
			val: 'lisp'
		}, {
			title: 'Livescript',
			val: 'livescript'
		}, {
			title: 'Lua',
			val: 'lua'
		}, {
			title: 'Makefile',
			val: 'makefile'
		}, {
			title: 'Markdown',
			val: 'markdown'
		}, {
			title: 'Matlab',
			val: 'matlab'
		}, {
			title: 'MySQL',
			val: 'mysql'
		}, {
			title: 'Objective C',
			val: 'objectivec'
		}, {
			title: 'Ocaml',
			val: 'ocaml'
		}, {
			title: 'Pascal',
			val: 'pascal'
		}, {
			title: 'Perl',
			val: 'perl'
		}, {
			title: 'PHP',
			val: 'php'
		}, {
			title: 'Powershell',
			val: 'powershell'
		}, {
			title: 'Prolog',
			val: 'prolog'
		}, {
			title: 'Python',
			val: 'python'
		}, {
			title: 'Razor',
			val: 'razor'
		}, {
			title: 'Ruby',
			val: 'ruby'
		}, {
			title: 'SASS CSS',
			val: 'sass'
		}, {
			title: 'Scheme',
			val: 'scheme'
		}, {
			title: 'SCSS',
			val: 'scss'
		}, {
			title: 'SH',
			val: 'sh'
		}, {
			title: 'SJS',
			val: 'sjs'
		}, {
			title: 'SQL',
			val: 'sql'
		}, {
			title: 'SQL Server',
			val: 'sqlserver'
		}, {
			title: 'SVG',
			val: 'svg'
		}, {
			title: 'Typescript',
			val: 'typescript'
		}, {
			title: 'Vala',
			val: 'vala'
		}, {
			title: 'VB script',
			val: 'vbscript'
		}, {
			title: 'XML',
			val: 'xml'
		}
	];


	/* PRIVATE VIEWMODELS ***********************************************/

	/**
	 * Code Viewmodel
	 * @constructor
	 * @return {object} snippetVM
	 */
	var codeVM = function(data) {
		var vm = {
			id: data.id,
			content: ko.observable(data.content.replace(/&quot;/g, '"')),
			language: ko.observable(data.language),
			languagesAvailables: languagesAvailables,
			editing: ko.observable(false)
		};

		var editor = null;

		vm.setACEeditor = function() {
			editor = ace.edit('editor-' + vm.id);
			editor.session.setUseWrapMode(true);
			editor.$blockScrolling = Infinity;
			editor.setShowPrintMargin(false);
			editor.setReadOnly(true);
			editor.setOptions({
				maxLines: Infinity
			});

			editor.session.setMode('ace/mode/' + vm.language());
			editor.setValue(vm.content(), -1);
		};
		vm.edit = function(){
			vm.editing(true);
		};
		vm.saveEdit = function(){
			vm.editing(false);
			//Save
			var v = editor.getValue();
			vm.content(v);

			var vFormatted = v.replace(/"/g, '&quot;');
			// to server
			SnippetApp.ajax('classes/code/post.php',{
				'changeContent':true,
				'id':vm.id,
				'content':vFormatted
			});
		};
		vm.cancelEdit = function(){
			vm.editing(false);
			editor.setValue(vm.content(), -1);
		};

		vm.language.subscribe(function(v) {
			editor.session.setMode('ace/mode/' + v);
			// to server
			SnippetApp.ajax('classes/code/post.php',{
				'changeLanguage':true,
				'id':vm.id,
				'language':v
			});
		});

		vm.editing.subscribe(function(v) {
			editor.setReadOnly(!v);
		});


		return vm;
	};

	/* PUBLIC VIEWMODELS ***********************************************/

	/**
	 * Snippet Viewmodel
	 * @constructor
	 * @return {object} snippetVM
	 */
	SnippetApp.snippetVM = (function() {

		/* VM TO RETURN ***********************************************/
		var vm = {
			id: -1,
			title: ko.observable(),
			description: ko.observable(),
			tags: ko.observableArray(),
			tagsLeft: ko.observableArray(),
			addingTag: ko.observable(false),
			editingTitle: ko.observable(false),
			editingDescription: ko.observable(false),
			codes: ko.observableArray()
		};

		/* PRIVATE VARIABLES ***********************************************/

		// The current snippetVM from snippetListVM
		var currentFromList = false,
			// Cache for title when edit
			titleCache = '',
			// Cache for description when edit
			descriptionCache = '';

		/* METHODS ***********************************************/

		/**
		 * Update snippet from snippetListVM and tbsVM
		 * @function
		 */
		vm.update = function(snippetVMFromList) {
			currentFromList = snippetVMFromList;
			vm.id = currentFromList.id;
			vm.title(currentFromList.title());
			vm.description(currentFromList.description());
			vm.updateTags();

			// update code list
			SnippetApp.ajax('classes/code/get.php', {
				'list': true,
				'snippet_id': vm.id
			}, function(data) {
				var length = data.length;
				vm.codes([]);

				for (var i = 0; i < length; i++) {
					// Create a new snippet VM and push to list
					var newCodeVM = codeVM(data[i]);
					vm.codes.push(newCodeVM);
					newCodeVM.setACEeditor();
				}
			});
		};

		/**
		 * Edit the title of the snippet
		 * @function
		 */
		vm.editTitle = function() {
			titleCache = vm.title();
			vm.editingTitle(true);
		};

		/**
		 * Save the new title of the snippet in server
		 * @function
		 */
		vm.saveTitle = function() {
			vm.editingTitle(false);
			var newTitle = vm.title();
			if (newTitle === '') {
				newTitle = titleCache;
				vm.title(titleCache);
			}
			if (newTitle !== titleCache) {
				SnippetApp.ajax('classes/snippet/post.php', {
					'saveTitle': true,
					'id': vm.id,
					'title': newTitle
				});
			}
		};

		/**
		 * Edit the description of the snippet
		 * @function
		 */
		vm.editDescription = function() {
			descriptionCache = vm.description();
			vm.editingDescription(true);
		};

		/**
		 * Save the new description of the snippet in server
		 * @function
		 */
		vm.saveDescription = function() {
			vm.editingDescription(false);
			var newDescription = vm.description();
			if (newDescription === '') {
				newDescription = descriptionCache;
				vm.title(descriptionCache);
			}
			if (newDescription !== descriptionCache) {
				SnippetApp.ajax('classes/snippet/post.php', {
					'saveDescription': true,
					'id': vm.id,
					'description': newDescription
				});
			}
		};

		/**
		 * Update the tag list of the snippet with the SnippetApp.tbs data
		 * @function
		 */
		vm.updateTags = function() {
			var tagsList = [],
				tagsLeftList = [],
				listTagIDs = SnippetApp.tbs.getTags(vm.id);
			SnippetApp.tagListVM.each(function(tVM) {
				if (listTagIDs.indexOf(tVM.id) >= 0) {
					tagsList.push(tVM);
				} else {
					tagsLeftList.push(tVM);
				}
			});
			vm.tags(tagsList);
			vm.tagsLeft(tagsLeftList);
		};

		/**
		 * Show add tag option
		 * @function
		 */
		vm.showAddingTag = function() {
			vm.addingTag(true);
		};

		/**
		 * Hide add tag option
		 * @function
		 */
		vm.hideAddingTag = function() {
			vm.addingTag(false);
		};

		/**
		 * Add tag to snippet
		 * @function
		 */
		vm.addTagToSnippet = function() {
			vm.hideAddingTag();
			var tagID = this.id;
			SnippetApp.tbs.addTag(vm.id, tagID);
		};

		/**
		 * Remove tag from snippet
		 * @function
		 */
		vm.removeFromSnippet = function() {
			var tagID = this.id;
			SnippetApp.tbs.removeTag(vm.id, tagID);
		};

		/**
		 * Init and bind VM
		 * @function
		 */
		vm.init = function() {
			ko.applyBindings(vm, document.getElementById('snippet-content'));
		};

		/* SUBSCRIPTIONS ***************************************************/

		/**
		 * When update title, update also snippet list title
		 * @subscription
		 */
		vm.title.subscribe(function(v) {
			if (currentFromList) {
				currentFromList.title(v);
			}
		});

		/**
		 * When update description, update also snippet list description
		 * @subscription
		 */
		vm.description.subscribe(function(v) {
			if (currentFromList) {
				currentFromList.description(v);
			}
		});

		/**
		 * When SnippetApp.tbs updates, update tag list of the snippet
		 * @subscription
		 */
		SnippetApp.tbs.onReady.subscribe(function() {
			vm.updateTags();
		});
		/**
		 * When SnippetApp.tagListVM updates, update tag list of the snippet
		 * @subscription
		 */
		SnippetApp.tagListVM.onReady.subscribe(function() {
			vm.updateTags();
		});

		/* RETURN VM ***************************************************/

		return vm;
	})();
})();