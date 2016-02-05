if (typeof SnippetApp == 'undefined') SnippetApp = {};
(function() {
	"use strict";

	var snippetVM = function(data) {

		var vm = {
			id: data.id,
			title: ko.observable(data.title),
			description: ko.observable(data.description),
			current: ko.observable(false)
		};
		vm.descriptionFormatted = ko.computed(function() {
			var length = vm.description().length,
				max = 80;
			if (length > max) {
				return vm.description().substring(0, (max - 3)) + '...';
			} else {
				if (length === 0) {
					return vm.title();
				} else {
					return vm.description();
				}
			}
		});

		/**
		 * Set current Snippet
		 * @function
		 */
		vm.setCurrent = function() {
			if (!vm.current()) {
				SnippetApp.snippetListVM.current(vm.id);
				SnippetApp.snippetVM.update(vm);
				// Load info
			}
		};

		return vm;
	};

	SnippetApp.snippetListVM = (function() {
		var vm = {
			list: ko.observableArray(),
			current: ko.observable(0)
		};

		vm.update = function() {
			var tagID = SnippetApp.tagListVM.current();
			var listIDs = SnippetApp.tbs.getSnippets(tagID);
			if (listIDs.length > 0) {
				if (listIDs === 'all') {
					var parameters = {
						'all': true
					};
				} else {
					var parameters = {
						'list': true,
						'listIds': listIDs
					};
				}

				jQuery.getJSON('classes/snippet/get.php', parameters, function(data) {
					var length = data.length,
						newList = [];

					for (var i = 0; i < length; i++) {
						// Create a new snippet VM and push to list
						var newSnippetVM = snippetVM(data[i]);
						newList.push(newSnippetVM);
					}
					if (length > 0) {
						newList[0].setCurrent(true);
						newList[0].current(true);
					}
					vm.list(newList);
				});
			} else {
				vm.list([]);
			}

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

		vm.init = function() {
			ko.applyBindings(vm, document.getElementById('snippet-list'));
		};
		/* SUBSCRIPTIONS ***************************************************/
		/**
		 * When is current changes, set current the right collection VM
		 * @subscription
		 */
		vm.current.subscribe(function(v) {
			vm.each(function(sVM) {
				if (sVM.id == v) {
					sVM.current(true);
				} else {
					sVM.current(false);
				}
			});
		});



		return vm;
	})();
})();