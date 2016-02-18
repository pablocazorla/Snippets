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
		ko.bindingHandlers.slideVisible = {
			init: function(element, valueAccessor) {
				// Start visible/invisible according to initial value
				//var shouldDisplay = valueAccessor();
				jQuery(element).hide();
			},
			update: function(element, valueAccessor) {
				// On update, fade in/out
				var shouldDisplay = ko.unwrap(valueAccessor());
				shouldDisplay ? jQuery(element).slideDown(250) : jQuery(element).slideUp(200);
			}
		};
		ko.bindingHandlers.fadeVisible = {
			init: function(element, valueAccessor) {
				// Start visible/invisible according to initial value
				//var shouldDisplay = valueAccessor();
				jQuery(element).hide();
			},
			update: function(element, valueAccessor) {
				// On update, fade in/out
				var shouldDisplay = ko.unwrap(valueAccessor());
				shouldDisplay ? jQuery(element).fadeIn() : jQuery(element).fadeOut(150);
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
				if (data == 'logout') {
					window.location.href = 'login.php';
				}
				cbk(data);
			}
		});
	};

	app.updateScroll = function() {
		// Nicescroll
		$('.scroller').niceScroll({
			cursorcolor: "#BBB", // change cursor color in hex
			cursoropacitymin: 0,
			cursoropacitymax: .8,
			cursorborder: "",
			//autohidemode:'leave',
			cursorfixedheight: 80,
			background: "rgba(255,255,255,.5)",
			horizrailenabled: false
		});
	};

	app.logout = function(){
		window.location.href = 'classes/user/logout.php';
	};

	return app;
})();