SnippetApp = (function() {
	"use strict";

	// Customize Knockout JS
	if (typeof ko !== 'undefined') {
		ko.bindingHandlers.keyEnterPressed = {
			init: function(element, valueAccessor, allBindings, viewModel) {
				var callback = valueAccessor();
				$(element).keypress(function(event) {
					var keyCode = (event.which ? event.which : event.keyCode);
					if (keyCode === 13) {
						callback.call(viewModel);
						return false;
					}
					return true;
				});
			}
		};
	}

	var app = {};

	app.ajax = function(url, parameters, callback) {
		var t = (url.indexOf('post.php') >= 0) ? 'POST' : 'GET';
		var cbk = callback || function() {};
		$.ajax({
			type: t,
			url: url,
			data: parameters,
			success: function(data) {
				if(data == 'logout'){
					window.location.href = 'login.php';
				}
				cbk(data);
			}
		});
	};

	return app;
})();