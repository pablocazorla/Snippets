if (typeof SnippetApp == 'undefined') SnippetApp = {};
(function() {
	"use strict";



	SnippetApp.snippetVM = (function() {

		var currentFromList = false,
			titleCache = '',
			descriptionCache = '';

		var vm = {
			id: -1,
			title: ko.observable(),
			description: ko.observable(),
			tags: ko.observableArray(),
			tagsLeft: ko.observableArray(),
			addingTag:ko.observable(false),
			editingTitle: ko.observable(false),
			editingDescription: ko.observable(false)
		};
		vm.update = function(snippetVMFromList) {
			currentFromList = snippetVMFromList;
			vm.id = currentFromList.id;
			vm.title(currentFromList.title());
			vm.description(currentFromList.description());
			vm.updateTags();
		};
		vm.editTitle = function() {
			titleCache = vm.title();
			vm.editingTitle(true);
		};
		vm.saveTitle = function() {
			vm.editingTitle(false);
			var newTitle = vm.title();
			if (newTitle === '') {
				newTitle = titleCache;
				vm.title(titleCache);
			}
			if (newTitle !== titleCache) {
				jQuery.post('classes/snippet/post.php', {
					'saveTitle': true,
					'id': vm.id,
					'title': newTitle
				});
			}
		};
		vm.editDescription = function() {
			descriptionCache = vm.description();
			vm.editingDescription(true);
		};
		vm.saveDescription = function() {
			vm.editingDescription(false);
			var newDescription = vm.description();
			if (newDescription === '') {
				newDescription = descriptionCache;
				vm.title(descriptionCache);
			}
			if (newDescription !== descriptionCache) {
				jQuery.post('classes/snippet/post.php', {
					'saveDescription': true,
					'id': vm.id,
					'description': newDescription
				});
			}
		};


		//SnippetApp.tagListVM.list()
		//SnippetApp.tbs.getTags();

		vm.updateTags = function() {
			var tagsList = [],
				tagsLeftList = [],
				listTagIDs = SnippetApp.tbs.getTags(vm.id);
				SnippetApp.tagListVM.each(function(tVM){
					if(listTagIDs.indexOf(tVM.id) >= 0){
						tagsList.push(tVM);
					}else{
						tagsLeftList.push(tVM);
					}
				});
				vm.tags(tagsList);
				vm.tagsLeft(tagsLeftList);
		};
		vm.addToSnippet = function(){
			vm.hideAddingTag();
			var tagID = this.id;
			SnippetApp.tbs.addTag(vm.id,tagID);
		};
		vm.showAddingTag = function(){
			vm.addingTag(true);
		};
		vm.hideAddingTag = function(){
			vm.addingTag(false);
		};

		// Subscriptions
		vm.title.subscribe(function(v) {
			if (currentFromList) {
				currentFromList.title(v);
			}
		});
		vm.description.subscribe(function(v) {
			if (currentFromList) {
				currentFromList.description(v);
			}
		});

		SnippetApp.tbs.readyNum.subscribe(function() {
			vm.updateTags();
		});



		vm.init = function() {
			ko.applyBindings(vm, document.getElementById('snippet-content'));
		};



		return vm;
	})();
})();