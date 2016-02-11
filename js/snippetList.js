(function() {
	"use strict";

	/* PRIVATE VIEWMODELS ***********************************************/

	/**
	 * Individual snippet Viewmodel
	 * @constructor
	 * @return {object} snippetVM
	 */
	var snippetVM = function(data) {

		/* VM TO RETURN ***********************************************/
		var vm = {
			id: data.id,
			title: ko.observable(data.title),
			description: ko.observable(data.description),
			current: ko.observable(false)
		};

		/* COMPUTED VARIABLES ***********************************************/

		/**
		 * TShort text for description
		 * @function
		 * @return string
		 */
		vm.descriptionFormatted = ko.computed(function() {
			var length = vm.description().length,
				max = 44;
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

		/* METHODS ***********************************************/

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

		/* RETURN VM ***************************************************/

		return vm;
	};

	/* PUBLIC VIEWMODELS ***********************************************/

	/**
	 * Snippet list Viewmodel
	 * @constructor
	 * @return {object} snippetListVM
	 */
	SnippetApp.snippetListVM = (function() {

		/* VM TO RETURN ***********************************************/
		var vm = {
			list: ko.observableArray(),
			current: ko.observable(0),
			loading: ko.observable(false)
		};

		/* METHODS *************************************************/

		/**
		 * Update snippet list from server
		 * @function
		 */
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
				vm.loading(true);
				SnippetApp.ajax('classes/snippet/get.php', parameters, function(data) {
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
					vm.loading(false);
				});
			} else {
				vm.list([]);
			}
		};

		/**
		 * Iterate in the snippet list
		 * @function
		 * @param {function} Method to execute, receiving a snippet VM as parameter
		 */
		vm.each = function(callback) {
			var list = vm.list(),
				length = list.length;
			for (var i = 0; i < length; i++) {
				callback.apply(null, [list[i], i]);
			}
		};

		/**
		 * Init and bind VM
		 * @function
		 */
		vm.init = function() {
			ko.applyBindings(vm, document.getElementById('snippet-list'));
		};

		/* SUBSCRIPTIONS ***************************************************/

		/**
		 * When is current changes, set current the snippet collection VM
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

		/* RETURN VM ***************************************************/

		return vm;
	})();
})();