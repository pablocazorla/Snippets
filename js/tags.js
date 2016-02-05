if (typeof SnippetApp == 'undefined') SnippetApp = {};
(function() {
	"use strict";



	var colorsAvaliables = ['#CD6CFF', '#FF6CBC', '#C17DA2', '#FF5454', '#C18F7D', '#FF8B52', '#FFA200', '#0AD200', '#CDB972', '#A0B300', '#B0A75D', '#97B379', '#79B3AB', '#2CC2C7', '#39A4FF', '#AEB2C5', '#7D9BC1', '#9587ED'],
		colorRandom = function() {
			var i = Math.floor(Math.random() * colorsAvaliables.length);
			return colorsAvaliables[i];
		};

	var tagVM = function(data) {

		var titleCache = '';

		var vm = {
			id: parseInt(data.id),
			title: ko.observable(data.title),
			color: ko.observable(data.color),
			current: ko.observable(false),
			editMode: ko.observable(false),
			deleteMode: ko.observable(false)
		};

		vm.num = ko.computed(function() {
			if (SnippetApp.tbs.readyNum() > 0) {
				return SnippetApp.tbs.getSnippets(vm.id).length;
			} else {
				return 0;
			}
		});
		vm.editAndNoDeleteMode = ko.computed(function() {
			return vm.editMode() && !vm.deleteMode();
		});

		vm.colorList = (function() {
			var newlist = [],
				colorVM = function(col) {
					var vmColor = {
						col: col,
						setColor: function() {
							vm.color(col);
						}
					};
					vmColor.current = ko.computed(function() {
						return vmColor.col === vm.color();
					});
					return vmColor;
				}
			for (var i = 0; i < colorsAvaliables.length; i++) {
				newlist.push(colorVM(colorsAvaliables[i]));
			}
			return newlist;
		})();



		vm.editTitle = function() {
			titleCache = vm.title();
			vm.editMode(true);
		};
		vm.saveTitle = function() {

			var newTitle = jQuery.trim(vm.title());
			if (newTitle !== '' && newTitle !== titleCache) {
				// update Title
				jQuery.post('classes/tag/post.php', {
					'updateTitle': true,
					'id': vm.id,
					'title': newTitle
				});
			} else {
				vm.title(titleCache);
			}
			vm.editMode(false);
		};
		vm.deleteTag = function() {
			vm.deleteMode(true);
		};

		vm.deleteTagYes = function() {
			// delete Tag
			jQuery.post('classes/tag/post.php', {
				'deleteTag': true,
				'id': vm.id
			}, function() {
				SnippetApp.tagListVM.quitFromList(vm.id);
			});
			vm.editMode(false);
			vm.deleteMode(false);
		};
		/**
		 * Set current tag
		 * @function
		 */
		vm.setCurrent = function() {
			if (!vm.current()) {
				SnippetApp.allSnippetsListVM.current(false);
				// Set current by id tag
				SnippetApp.tagListVM.current(vm.id);
				SnippetApp.snippetListVM.update();
			}
		};


		vm.color.subscribe(function(v) {
			// update Color
			jQuery.post('classes/tag/post.php', {
				'updateColor': true,
				'id': vm.id,
				'color': v
			});
		});
		vm.editMode.subscribe(function(v) {
			if (!v) {
				vm.deleteMode(false);
			}
		});

		return vm;
	};
	SnippetApp.allSnippetsListVM = (function() {
		var vm = {
			num: ko.observable(0),
			current: ko.observable(false)
		};
		vm.update = function() {
			jQuery.get('classes/snippet/get.php', {
				'numTotal': true
			}, function(data) {
				vm.num(data[0]['num']);
			});
		};
		vm.setCurrent = function() {
			if (!vm.current()) {
				// Set NOT current tag
				vm.current(true);
				SnippetApp.tagListVM.current(-1);
				SnippetApp.snippetListVM.update();
			}
		};
		/**
		 * Init and bind tag list VM
		 * @function
		 */
		vm.init = function() {
			ko.applyBindings(vm, document.getElementById('main-tag-list'));
			vm.update();
			vm.setCurrent();
		};
		return vm;
	})();

	SnippetApp.tagListVM = (function() {
		var vm = {
			list: ko.observableArray(),
			current: ko.observable(-1)
		};

		vm.update = function() {
			jQuery.getJSON('classes/tag/get.php', {
				'all': true
			}, function(data) {
				var length = data.length,
					newList = [];

				for (var i = 0; i < length; i++) {
					// Create a new collection VM and push to list
					var newTagVM = tagVM(data[i]);
					newList.push(newTagVM);
				}
				vm.list(newList);
			});
		};
		/**
		 * Add new collection
		 * @function
		 */
		vm.add = function() {
			// save New Tag
			var newColor = colorRandom();
			jQuery.post('classes/tag/post.php', {
				'addNewTag': true,
				'title': 'New tag',
				'color': newColor
			}, function(numId) {
				var newTagVM = tagVM({
					id: parseInt(numId),
					'title': '',
					'color': newColor
				});
				vm.list.push(newTagVM);
				newTagVM.editTitle();
				SnippetApp.tbs.update();
			});

		};
		/**
		 * Iterate in the tag list
		 * @function
		 * @param {function} Method to execute, receiving a tag VM as parameter
		 */
		vm.each = function(callback) {
			var list = vm.list(),
				length = list.length;
			for (var i = 0; i < length; i++) {
				callback.apply(null, [list[i], i]);
			}
		};

		/**
		 * Get a tag VM by id
		 * @function
		 * @param {number} The id of the tag VM
		 * @return {object} The tag VM
		 */
		vm.getById = function(id) {
			var tagToReturn = false;
			vm.each(function(tVM) {
				if (tVM.id == id) {
					tagToReturn = tVM;
				}
			});
			return tagToReturn;
		};
		vm.quitFromList = function(id) {
			var indextoQuit = -1;
			vm.each(function(tVM, index) {
				if (tVM.id == id) {
					indextoQuit = index;
				}
			});
			if (indextoQuit >= 0) {
				vm.list.splice(indextoQuit, 1);
				SnippetApp.tbs.update();
			}
		}


		/* SUBSCRIPTIONS ***************************************************/
		/**
		 * When is current changes, set current the right collection VM
		 * @subscription
		 */
		vm.current.subscribe(function(v) {
			vm.each(function(tVM) {
				if (tVM.id == v) {
					tVM.current(true);
				} else {
					tVM.current(false);
				}
			});
		});
		/**
		 * Init and bind tag list VM
		 * @function
		 */
		vm.init = function() {
			ko.applyBindings(vm, document.getElementById('tag-list'));
			vm.update();
		};

		return vm;
	})();

	SnippetApp.tbs = (function() {

		var snippet = {},
			tag = {},
			readyCount = 0;


		var vm = {
			readyNum: ko.observable(0)
		};
		vm.update = function() {
			jQuery.getJSON('classes/tag/get.php', {
				'tbs': true
			}, function(data) {
				var length = data.length;
				snippet = {};
				tag = {};

				for (var i = 0; i < length; i++) {
					var snippetId = data[i]['snippet_id'],
						tagId = data[i]['tag_id'];
					//
					if (typeof snippet['id' + snippetId] == 'undefined') {
						snippet['id' + snippetId] = [];
					}
					snippet['id' + snippetId].push(parseInt(tagId));
					//
					if (typeof tag['id' + tagId] == 'undefined') {
						tag['id' + tagId] = [];
					}
					tag['id' + tagId].push(parseInt(snippetId));
				};
				readyCount++;
				vm.readyNum(readyCount);
				//SnippetApp.snippetListVM.update();
			});
		};

		vm.getTags = function(snippetId) {
			var listToReturn;
			if (typeof snippet['id' + snippetId] == 'undefined') {
				listToReturn = [];
			} else {
				listToReturn = snippet['id' + snippetId];
			}
			return listToReturn;
		};
		vm.getSnippets = function(tagId) {
			var listToReturn;
			if (tagId >= 0) {
				if (typeof tag['id' + tagId] == 'undefined') {
					listToReturn = [];
				} else {
					listToReturn = tag['id' + tagId];
				}
			} else {
				listToReturn = 'all';
			}

			return listToReturn;
		};

		vm.addTag = function(snippetId, tagId) {
			var tagId = parseInt(tagId)
			if (typeof snippet['id' + snippetId] == 'undefined') {
				snippet['id' + snippetId] = [];
			}
			if (snippet['id' + snippetId].indexOf(tagId) < 0) {
				// fake update
				snippet['id' + snippetId].push(tagId);
				readyCount++;
				vm.readyNum(readyCount);
				// to server then
				jQuery.post('classes/tag/post.php', {
					'addTagToSnippet':true,
					'snippet_id':snippetId,
					'tag_id':tagId
				},function(){
					vm.update();
				});
			}
		};

		/**
		 * Init and bind tag list VM
		 * @function
		 */
		vm.init = function() {
			// without bindings
			vm.update();
		};

		return vm;
	})();
})();