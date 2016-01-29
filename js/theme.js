// Basic
S = {};
Pandora = {
	init: function(context, callback) {
		var ctx = (typeof context === 'string') ? context + ' ' : '';
		// Store
		S.$window = Pandora.$window = $(window);
		S.$body = $('body');

		// Utils
		var getPrefix = (function() {
			var dummyStyles = document.createElement('div').style,
				cache = {};
			return function(str) {
				if (cache[str] !== undefined) {
					return cache[str];
				} else {
					var STR = str.substring(0, 1).toUpperCase() + str.substring(1),
						prefixes = 'Webkit Moz O Ms webkit moz o ms'.split(' '),
						l = prefixes.length,
						t;

					for (var i = 0; i < l; i++) {
						if (dummyStyles[prefixes[i] + STR] !== undefined) {
							t = prefixes[i] + STR;
						}
					}
					if (dummyStyles[str] !== undefined) {
						t = str;
					}
					cache[str] = t;
					return t;
				}
			}
		})();
		var css3 = function(prop, $elements, p) {
			var t = getPrefix(prop),
				prop = p || '';
			$elements.each(function() {
				this.style[t] = prop;
			});
		};

		Pandora.cssTransition = function($elements, p) {
			css3('transition', $elements, p);
			return Pandora;
		};
		Pandora.cssTransform = function($elements, p) {
			css3('transform', $elements, p);
			return Pandora;
		};

		// Init
		for (var a in Pandora) {
			if (typeof Pandora[a].init === 'function') {
				Pandora[a].init(ctx);
			}
		}
		if (typeof callback === 'function') {
			callback();
		}
	}
};
Pandora.prettify = {
	init: function(ctx) {
		$.getScript('https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js');
	}
};
// Validations
Pandora.dropdown = {
	init: function(ctx) {
		// for selects
		$(ctx + 'select.dropdown').each(function() {
			var $select = $(this).removeClass('dropdown').hide(),
				$options = $select.find('option'),
				triangleHtml = ' <span class="triangle"></span>',
				$dropdown = $('<span class="dropdown extended"></span>'),
				$toggle = $('<a class="btn btn-primary dropdown-toggle" href="javascript:void(0);"></a>').html($options.filter(':selected').text() + triangleHtml).appendTo($dropdown),

				$menu = $('<span class="dropdown-menu"></span>').appendTo($dropdown),
				arrayLinks = [];

			for (var i = 0; i < $options.length; i++) {
				$('<span><a href="">' + $options.eq(i).text() + '</a></span>').appendTo($menu);
			};
			$select.after($dropdown);

			$menu.find('a').each(function(index) {
				var $a = $(this),
					$o = $options.eq(index);
				$a.click(function(e) {
					e.preventDefault();
					$o.prop('selected', true);
					$toggle.html($a.text() + triangleHtml).blur();
				});
			});
		});
		//dropdowns
		$(ctx + '.dropdown').not('.disabled').each(function() {
			var $this = $(this),
				$toggle = $this.find('> .dropdown-toggle'),
				$menu = $this.find('> .dropdown-menu'),
				active = false,
				clickInside = false,
				fading = false,
				duration = 100;
			$toggle.click(function() {
					if (!active && !fading) {
						$menu.fadeIn(duration, function() {
							active = true;
							fading = false;
							clickInside = false;
						});
					}
					clickInside = true;
				})
				.click(function(e) {
					e.preventDefault();
				});
			$this.find('.disabled').click(function(e) {
				e.preventDefault();
			}).mousedown(function() {
				clickInside = true;
			});
			S.$window.mousedown(function() {
				if (active && !clickInside && !fading) {
					fading = true;
					$menu.fadeOut(duration, function() {
						active = false;
						fading = false;
					});
				}
				clickInside = false;
			});
		});
	}
};
Pandora.tabs = {
	init: function(ctx) {
		$(ctx + '.tabs').each(function() {
			var $list = $(this).find('.tab-list > li'),
				$content = $(this).find('.tab-content > li');

			$list.eq(0).addClass('active');
			$content.eq(0).addClass('active');

			$list.each(function(index) {
				var $this = $(this);
				$this.click(function() {
					if (!$this.hasClass('active')) {
						$list.removeClass('active');
						$this.addClass('active');
						$content.removeClass('active').eq(index).addClass('active');
					}
				});
			});
		});
	}
};
Pandora.modalConstructor = {
	initializated: false,
	init: function() {
		"use strict";
		if (!this.initializated) {
			this.initializated = true;
			var $dimmer,
				idCounter = 0,
				current = null,
				shown = false,
				changing = false,
				paddingVertical = 0,

				scrollbarWidth = (function() {
					var outer = document.createElement("div");
					outer.style.visibility = "hidden";
					outer.style.width = "100px";
					outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps
					document.body.appendChild(outer);
					var widthNoScroll = outer.offsetWidth;
					// force scrollbars
					outer.style.overflow = "scroll";
					// add innerdiv
					var inner = document.createElement("div");
					inner.style.width = "100%";
					outer.appendChild(inner);
					var widthWithScroll = inner.offsetWidth;

					// remove divs
					outer.parentNode.removeChild(outer);
					return widthNoScroll - widthWithScroll;
				})();

			var m = function(options) {
				return this.create(options);
			};
			m.prototype = {
				create: function(options) {
					this.id = idCounter++;

					this.config = $.extend({
						maxWidth: 'auto',
						duration: 300,
						onShow: function() {},
						afterShow: function() {},
						onHide: function() {},
						afterHide: function() {},
						content: '',
						hideClickDimmer: true,
						showCloseButton: true,
						actions: []
					}, options);

					var self = this;
					// Render
					if (typeof $dimmer === 'undefined') {
						$dimmer = $('<div class="dimmer"></div>').appendTo(S.$body).click(function() {
							if (current !== null && current.config.hideClickDimmer) {
								current.hide();
							}
						});
					}
					this.$modal = $('<div class="modal"></div>').appendTo(S.$body);
					this.$modalBody = $('<div class="modal-body"></div>').appendTo(this.$modal);

					if (this.config.showCloseButton) {
						var $modalClose = $('<span class="modal-close" aria-hidden="true">×</span>').appendTo(this.$modalBody).click(function() {
							self.hide();
						});
					}
					this.$modalScroll = $('<div class="modal-scroll"></div>').appendTo(this.$modalBody);
					this.$modalContent = $('<div class="clearfix modal-content"></div>').appendTo(this.$modalScroll);
					this.$modalActions = $('<div class="modal-actions"></div>').appendTo(this.$modalScroll);

					paddingVertical = Math.round(parseInt(this.$modalBody.css('padding-top')) + parseInt(this.$modalBody.css('padding-bottom')));

					this.timerToResize = null;

					S.$window.resize(function() {
						self.resize(700);
					});

					return this.content(this.config.content).renderActions().resize();
				},
				content: function(c) {
					this.config.content = c;
					if (typeof c === 'string') {
						this.$modalContent.html(c);
					} else {
						this.$modalContent.html('').append($(c));
					}
					return this.resize(100);
				},
				actions: function(arr) {
					this.config.actions = arr;
					return this.renderActions();
				},
				renderActions: function() {
					var self = this;
					this.$modalActions.html('');

					var renderAcc = function(acc) {

						if (typeof acc.click !== 'function' && acc.tag === 'a') {
							acc.tag = 'span';
						}
						var href = (acc.tag === 'a') ? ' href=""' : '';
						var cl = (acc.className !== '') ? ' class="' + acc.className + '"' : '';

						var $acc = $('<' + acc.tag + href + cl + '>' + acc.text + '</' + acc.tag + '>').appendTo(self.$modalActions);
						$('<span>&nbsp;</span>').appendTo(self.$modalActions);

						if (typeof acc.click === 'function') {
							$acc.click(function(e) {
								e.preventDefault();
								acc.click.apply(null, [self]);
							});
						}
					};

					for (var i = 0; i < this.config.actions.length; i++) {
						var acc = $.extend({
							tag: 'a',
							className: '',
							text: 'Button',
							click: null
						}, this.config.actions[i]);
						renderAcc(acc);
					}
					return this;
				},
				show: function(callback) {
					var cbk = callback || function() {};
					if (!shown && !changing) {
						var self = this;
						this.config.onShow.apply(null, [self]);
						if (S.$body.height() > S.$window.height()) {
							S.$body.css({
								'overflow': 'hidden',
								'padding-right': scrollbarWidth + 'px'
							});
						}
						current = this;
						changing = true;
						$dimmer.fadeIn(this.config.duration);
						this.$modal.fadeIn(this.config.duration, function() {
							shown = true;
							changing = false;
							cbk.apply(null, [self]);
							self.config.afterShow.apply(null, [self]);
						});
					}
					return this.resize(10);
				},
				hide: function(callback) {
					var cbk = callback || function() {};
					if (shown && !changing) {
						var self = this;
						this.config.onHide.apply(null, [self]);
						current = null;
						changing = true;
						$dimmer.fadeOut(this.config.duration);
						this.$modal.fadeOut(this.config.duration, function() {
							shown = false;
							changing = false;
							S.$body.css({
								'overflow': 'auto',
								'padding-right': '0'
							});
							cbk.apply(null, [self]);
							self.config.afterHide.apply(null, [self]);
						});
					}
					return this;
				},
				onShow: function(f) {
					this.config.onShow = f;
					return this;
				},
				afterShow: function(f) {
					this.config.afterShow = f;
					return this;
				},
				onHide: function(f) {
					this.config.onHide = f;
					return this;
				},
				afterHide: function(f) {
					this.config.afterHide = f;
					return this;
				},
				resize: function(delay) {
					var self = this;
					if (this.timerToResize !== null) {
						clearTimeout(this.timerToResize);
						this.timerToResize = null;
					}
					this.timerToResize = setTimeout(function() {
						self.$modalScroll.css({
							height: 'auto'
						});
						var modH = Math.round(self.$modal.height()),
							winH = Math.round(S.$window.height()),
							newModH = (modH <= winH) ? 'auto' : (winH - 20 - paddingVertical) + 'px',
							top = Math.round(.5 * (winH - modH)) - 10;

						top = (top < 0) ? 0 : top;

						self.$modal.css({
							top: top + 'px'
						});
						self.$modalScroll.css({
							height: newModH
						});
						clearTimeout(this.timerToResize);
						this.timerToResize = null;
					}, delay);

					return this;
				}
			};

			Pandora.modal = function(options) {
				return new m(options);
			}
		}
	}
};
Pandora.tooltip = {
	init: function(ctx) {
		$(ctx + '.tooltip').each(function() {
			var $this = $(this),
				title = (function() {
					var t = $this.attr('title');
					$this.attr('title', '');
					return t;
				})(),
				$title = $('<span class="tooltip-title">' + title + '<span class="tooltip-triang"></span></span>').appendTo($this),
				setPosition = function() {

				};
			setPosition();
			$this.hover(setPosition);
		});
	}
};
Pandora.alert = {
	init: function(ctx) {
		$(ctx + '.alert').each(function() {
			var $this = $(this);
			if ($this.hasClass('with-closer')) {
				var $closer = $('<span aria-hidden="true" class="alert-closer">×</span>');

				$this.prepend($closer);
				$closer.click(function() {
					$this.fadeOut(400);
				});
			}
		});
	}
};
Pandora.collapser = {
	init: function(ctx) {
		$(ctx + '.collapser').each(function() {
			var $this = $(this);

			$this.find('.collapser-trigger').click(function(e) {
				e.preventDefault();
				$this.toggleClass('show');
			});
		});
	}
};
$('document').ready(function(){
	Pandora.init();
});
