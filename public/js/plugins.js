/*!
 * Bootstrap v3.3.6 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under the MIT license
 */
if ('undefined' == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");
+(function (a) {
	'use strict';
	var b = a.fn.jquery.split(' ')[0].split('.');
	if ((b[0] < 2 && b[1] < 9) || (1 == b[0] && 9 == b[1] && b[2] < 1) || b[0] > 2)
		throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 3");
})(jQuery),
	+(function (a) {
		'use strict';
		function b() {
			var a = document.createElement('bootstrap'),
				b = {
					WebkitTransition: 'webkitTransitionEnd',
					MozTransition: 'transitionend',
					OTransition: 'oTransitionEnd otransitionend',
					transition: 'transitionend',
				};
			for (var c in b) if (void 0 !== a.style[c]) return { end: b[c] };
			return !1;
		}
		(a.fn.emulateTransitionEnd = function (b) {
			var c = !1,
				d = this;
			a(this).one('bsTransitionEnd', function () {
				c = !0;
			});
			var e = function () {
				c || a(d).trigger(a.support.transition.end);
			};
			return setTimeout(e, b), this;
		}),
			a(function () {
				(a.support.transition = b()),
					a.support.transition &&
						(a.event.special.bsTransitionEnd = {
							bindType: a.support.transition.end,
							delegateType: a.support.transition.end,
							handle: function (b) {
								return a(b.target).is(this) ? b.handleObj.handler.apply(this, arguments) : void 0;
							},
						});
			});
	})(jQuery),
	+(function (a) {
		'use strict';
		function b(b) {
			return this.each(function () {
				var c = a(this),
					e = c.data('bs.alert');
				e || c.data('bs.alert', (e = new d(this))), 'string' == typeof b && e[b].call(c);
			});
		}
		var c = '[data-dismiss="alert"]',
			d = function (b) {
				a(b).on('click', c, this.close);
			};
		(d.VERSION = '3.3.6'),
			(d.TRANSITION_DURATION = 150),
			(d.prototype.close = function (b) {
				function c() {
					g.detach().trigger('closed.bs.alert').remove();
				}
				var e = a(this),
					f = e.attr('data-target');
				f || ((f = e.attr('href')), (f = f && f.replace(/.*(?=#[^\s]*$)/, '')));
				var g = a(f);
				b && b.preventDefault(),
					g.length || (g = e.closest('.alert')),
					g.trigger((b = a.Event('close.bs.alert'))),
					b.isDefaultPrevented() ||
						(g.removeClass('in'),
						a.support.transition && g.hasClass('fade') ? g.one('bsTransitionEnd', c).emulateTransitionEnd(d.TRANSITION_DURATION) : c());
			});
		var e = a.fn.alert;
		(a.fn.alert = b),
			(a.fn.alert.Constructor = d),
			(a.fn.alert.noConflict = function () {
				return (a.fn.alert = e), this;
			}),
			a(document).on('click.bs.alert.data-api', c, d.prototype.close);
	})(jQuery),
	+(function (a) {
		'use strict';
		function b(b) {
			return this.each(function () {
				var d = a(this),
					e = d.data('bs.button'),
					f = 'object' == typeof b && b;
				e || d.data('bs.button', (e = new c(this, f))), 'toggle' == b ? e.toggle() : b && e.setState(b);
			});
		}
		var c = function (b, d) {
			(this.$element = a(b)), (this.options = a.extend({}, c.DEFAULTS, d)), (this.isLoading = !1);
		};
		(c.VERSION = '3.3.6'),
			(c.DEFAULTS = { loadingText: 'loading...' }),
			(c.prototype.setState = function (b) {
				var c = 'disabled',
					d = this.$element,
					e = d.is('input') ? 'val' : 'html',
					f = d.data();
				(b += 'Text'),
					null == f.resetText && d.data('resetText', d[e]()),
					setTimeout(
						a.proxy(function () {
							d[e](null == f[b] ? this.options[b] : f[b]),
								'loadingText' == b
									? ((this.isLoading = !0), d.addClass(c).attr(c, c))
									: this.isLoading && ((this.isLoading = !1), d.removeClass(c).removeAttr(c));
						}, this),
						0
					);
			}),
			(c.prototype.toggle = function () {
				var a = !0,
					b = this.$element.closest('[data-toggle="buttons"]');
				if (b.length) {
					var c = this.$element.find('input');
					'radio' == c.prop('type')
						? (c.prop('checked') && (a = !1), b.find('.active').removeClass('active'), this.$element.addClass('active'))
						: 'checkbox' == c.prop('type') &&
						  (c.prop('checked') !== this.$element.hasClass('active') && (a = !1), this.$element.toggleClass('active')),
						c.prop('checked', this.$element.hasClass('active')),
						a && c.trigger('change');
				} else this.$element.attr('aria-pressed', !this.$element.hasClass('active')), this.$element.toggleClass('active');
			});
		var d = a.fn.button;
		(a.fn.button = b),
			(a.fn.button.Constructor = c),
			(a.fn.button.noConflict = function () {
				return (a.fn.button = d), this;
			}),
			a(document)
				.on('click.bs.button.data-api', '[data-toggle^="button"]', function (c) {
					var d = a(c.target);
					d.hasClass('btn') || (d = d.closest('.btn')),
						b.call(d, 'toggle'),
						a(c.target).is('input[type="radio"]') || a(c.target).is('input[type="checkbox"]') || c.preventDefault();
				})
				.on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (b) {
					a(b.target)
						.closest('.btn')
						.toggleClass('focus', /^focus(in)?$/.test(b.type));
				});
	})(jQuery),
	+(function (a) {
		'use strict';
		function b(b) {
			return this.each(function () {
				var d = a(this),
					e = d.data('bs.carousel'),
					f = a.extend({}, c.DEFAULTS, d.data(), 'object' == typeof b && b),
					g = 'string' == typeof b ? b : f.slide;
				e || d.data('bs.carousel', (e = new c(this, f))), 'number' == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle();
			});
		}
		var c = function (b, c) {
			(this.$element = a(b)),
				(this.$indicators = this.$element.find('.carousel-indicators')),
				(this.options = c),
				(this.paused = null),
				(this.sliding = null),
				(this.interval = null),
				(this.$active = null),
				(this.$items = null),
				this.options.keyboard && this.$element.on('keydown.bs.carousel', a.proxy(this.keydown, this)),
				'hover' == this.options.pause &&
					!('ontouchstart' in document.documentElement) &&
					this.$element.on('mouseenter.bs.carousel', a.proxy(this.pause, this)).on('mouseleave.bs.carousel', a.proxy(this.cycle, this));
		};
		(c.VERSION = '3.3.6'),
			(c.TRANSITION_DURATION = 600),
			(c.DEFAULTS = { interval: 5e3, pause: 'hover', wrap: !0, keyboard: !0 }),
			(c.prototype.keydown = function (a) {
				if (!/input|textarea/i.test(a.target.tagName)) {
					switch (a.which) {
						case 37:
							this.prev();
							break;
						case 39:
							this.next();
							break;
						default:
							return;
					}
					a.preventDefault();
				}
			}),
			(c.prototype.cycle = function (b) {
				return (
					b || (this.paused = !1),
					this.interval && clearInterval(this.interval),
					this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)),
					this
				);
			}),
			(c.prototype.getItemIndex = function (a) {
				return (this.$items = a.parent().children('.item')), this.$items.index(a || this.$active);
			}),
			(c.prototype.getItemForDirection = function (a, b) {
				var c = this.getItemIndex(b),
					d = ('prev' == a && 0 === c) || ('next' == a && c == this.$items.length - 1);
				if (d && !this.options.wrap) return b;
				var e = 'prev' == a ? -1 : 1,
					f = (c + e) % this.$items.length;
				return this.$items.eq(f);
			}),
			(c.prototype.to = function (a) {
				var b = this,
					c = this.getItemIndex((this.$active = this.$element.find('.item.active')));
				return a > this.$items.length - 1 || 0 > a
					? void 0
					: this.sliding
					? this.$element.one('slid.bs.carousel', function () {
							b.to(a);
					  })
					: c == a
					? this.pause().cycle()
					: this.slide(a > c ? 'next' : 'prev', this.$items.eq(a));
			}),
			(c.prototype.pause = function (b) {
				return (
					b || (this.paused = !0),
					this.$element.find('.next, .prev').length &&
						a.support.transition &&
						(this.$element.trigger(a.support.transition.end), this.cycle(!0)),
					(this.interval = clearInterval(this.interval)),
					this
				);
			}),
			(c.prototype.next = function () {
				return this.sliding ? void 0 : this.slide('next');
			}),
			(c.prototype.prev = function () {
				return this.sliding ? void 0 : this.slide('prev');
			}),
			(c.prototype.slide = function (b, d) {
				var e = this.$element.find('.item.active'),
					f = d || this.getItemForDirection(b, e),
					g = this.interval,
					h = 'next' == b ? 'left' : 'right',
					i = this;
				if (f.hasClass('active')) return (this.sliding = !1);
				var j = f[0],
					k = a.Event('slide.bs.carousel', { relatedTarget: j, direction: h });
				if ((this.$element.trigger(k), !k.isDefaultPrevented())) {
					if (((this.sliding = !0), g && this.pause(), this.$indicators.length)) {
						this.$indicators.find('.active').removeClass('active');
						var l = a(this.$indicators.children()[this.getItemIndex(f)]);
						l && l.addClass('active');
					}
					var m = a.Event('slid.bs.carousel', { relatedTarget: j, direction: h });
					return (
						a.support.transition && this.$element.hasClass('slide')
							? (f.addClass(b),
							  f[0].offsetWidth,
							  e.addClass(h),
							  f.addClass(h),
							  e
									.one('bsTransitionEnd', function () {
										f.removeClass([b, h].join(' ')).addClass('active'),
											e.removeClass(['active', h].join(' ')),
											(i.sliding = !1),
											setTimeout(function () {
												i.$element.trigger(m);
											}, 0);
									})
									.emulateTransitionEnd(c.TRANSITION_DURATION))
							: (e.removeClass('active'), f.addClass('active'), (this.sliding = !1), this.$element.trigger(m)),
						g && this.cycle(),
						this
					);
				}
			});
		var d = a.fn.carousel;
		(a.fn.carousel = b),
			(a.fn.carousel.Constructor = c),
			(a.fn.carousel.noConflict = function () {
				return (a.fn.carousel = d), this;
			});
		var e = function (c) {
			var d,
				e = a(this),
				f = a(e.attr('data-target') || ((d = e.attr('href')) && d.replace(/.*(?=#[^\s]+$)/, '')));
			if (f.hasClass('carousel')) {
				var g = a.extend({}, f.data(), e.data()),
					h = e.attr('data-slide-to');
				h && (g.interval = !1), b.call(f, g), h && f.data('bs.carousel').to(h), c.preventDefault();
			}
		};
		a(document).on('click.bs.carousel.data-api', '[data-slide]', e).on('click.bs.carousel.data-api', '[data-slide-to]', e),
			a(window).on('load', function () {
				a('[data-ride="carousel"]').each(function () {
					var c = a(this);
					b.call(c, c.data());
				});
			});
	})(jQuery),
	+(function (a) {
		'use strict';
		function b(b) {
			var c,
				d = b.attr('data-target') || ((c = b.attr('href')) && c.replace(/.*(?=#[^\s]+$)/, ''));
			return a(d);
		}
		function c(b) {
			return this.each(function () {
				var c = a(this),
					e = c.data('bs.collapse'),
					f = a.extend({}, d.DEFAULTS, c.data(), 'object' == typeof b && b);
				!e && f.toggle && /show|hide/.test(b) && (f.toggle = !1),
					e || c.data('bs.collapse', (e = new d(this, f))),
					'string' == typeof b && e[b]();
			});
		}
		var d = function (b, c) {
			(this.$element = a(b)),
				(this.options = a.extend({}, d.DEFAULTS, c)),
				(this.$trigger = a('[data-toggle="collapse"][href="#' + b.id + '"],[data-toggle="collapse"][data-target="#' + b.id + '"]')),
				(this.transitioning = null),
				this.options.parent ? (this.$parent = this.getParent()) : this.addAriaAndCollapsedClass(this.$element, this.$trigger),
				this.options.toggle && this.toggle();
		};
		(d.VERSION = '3.3.6'),
			(d.TRANSITION_DURATION = 350),
			(d.DEFAULTS = { toggle: !0 }),
			(d.prototype.dimension = function () {
				var a = this.$element.hasClass('width');
				return a ? 'width' : 'height';
			}),
			(d.prototype.show = function () {
				if (!this.transitioning && !this.$element.hasClass('in')) {
					var b,
						e = this.$parent && this.$parent.children('.panel').children('.in, .collapsing');
					if (!(e && e.length && ((b = e.data('bs.collapse')), b && b.transitioning))) {
						var f = a.Event('show.bs.collapse');
						if ((this.$element.trigger(f), !f.isDefaultPrevented())) {
							e && e.length && (c.call(e, 'hide'), b || e.data('bs.collapse', null));
							var g = this.dimension();
							this.$element.removeClass('collapse').addClass('collapsing')[g](0).attr('aria-expanded', !0),
								this.$trigger.removeClass('collapsed').attr('aria-expanded', !0),
								(this.transitioning = 1);
							var h = function () {
								this.$element.removeClass('collapsing').addClass('collapse in')[g](''),
									(this.transitioning = 0),
									this.$element.trigger('shown.bs.collapse');
							};
							if (!a.support.transition) return h.call(this);
							var i = a.camelCase(['scroll', g].join('-'));
							this.$element
								.one('bsTransitionEnd', a.proxy(h, this))
								.emulateTransitionEnd(d.TRANSITION_DURATION)
								[g](this.$element[0][i]);
						}
					}
				}
			}),
			(d.prototype.hide = function () {
				if (!this.transitioning && this.$element.hasClass('in')) {
					var b = a.Event('hide.bs.collapse');
					if ((this.$element.trigger(b), !b.isDefaultPrevented())) {
						var c = this.dimension();
						this.$element[c](this.$element[c]())[0].offsetHeight,
							this.$element.addClass('collapsing').removeClass('collapse in').attr('aria-expanded', !1),
							this.$trigger.addClass('collapsed').attr('aria-expanded', !1),
							(this.transitioning = 1);
						var e = function () {
							(this.transitioning = 0), this.$element.removeClass('collapsing').addClass('collapse').trigger('hidden.bs.collapse');
						};
						return a.support.transition
							? void this.$element[c](0).one('bsTransitionEnd', a.proxy(e, this)).emulateTransitionEnd(d.TRANSITION_DURATION)
							: e.call(this);
					}
				}
			}),
			(d.prototype.toggle = function () {
				this[this.$element.hasClass('in') ? 'hide' : 'show']();
			}),
			(d.prototype.getParent = function () {
				return a(this.options.parent)
					.find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
					.each(
						a.proxy(function (c, d) {
							var e = a(d);
							this.addAriaAndCollapsedClass(b(e), e);
						}, this)
					)
					.end();
			}),
			(d.prototype.addAriaAndCollapsedClass = function (a, b) {
				var c = a.hasClass('in');
				a.attr('aria-expanded', c), b.toggleClass('collapsed', !c).attr('aria-expanded', c);
			});
		var e = a.fn.collapse;
		(a.fn.collapse = c),
			(a.fn.collapse.Constructor = d),
			(a.fn.collapse.noConflict = function () {
				return (a.fn.collapse = e), this;
			}),
			a(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (d) {
				var e = a(this);
				e.attr('data-target') || d.preventDefault();
				var f = b(e),
					g = f.data('bs.collapse'),
					h = g ? 'toggle' : e.data();
				c.call(f, h);
			});
	})(jQuery),
	+(function (a) {
		'use strict';
		function b(b) {
			var c = b.attr('data-target');
			c || ((c = b.attr('href')), (c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, '')));
			var d = c && a(c);
			return d && d.length ? d : b.parent();
		}
		function c(c) {
			(c && 3 === c.which) ||
				(a(e).remove(),
				a(f).each(function () {
					var d = a(this),
						e = b(d),
						f = { relatedTarget: this };
					e.hasClass('open') &&
						((c && 'click' == c.type && /input|textarea/i.test(c.target.tagName) && a.contains(e[0], c.target)) ||
							(e.trigger((c = a.Event('hide.bs.dropdown', f))),
							c.isDefaultPrevented() ||
								(d.attr('aria-expanded', 'false'), e.removeClass('open').trigger(a.Event('hidden.bs.dropdown', f)))));
				}));
		}
		function d(b) {
			return this.each(function () {
				var c = a(this),
					d = c.data('bs.dropdown');
				d || c.data('bs.dropdown', (d = new g(this))), 'string' == typeof b && d[b].call(c);
			});
		}
		var e = '.dropdown-backdrop',
			f = '[data-toggle="dropdown"]',
			g = function (b) {
				a(b).on('click.bs.dropdown', this.toggle);
			};
		(g.VERSION = '3.3.6'),
			(g.prototype.toggle = function (d) {
				var e = a(this);
				if (!e.is('.disabled, :disabled')) {
					var f = b(e),
						g = f.hasClass('open');
					if ((c(), !g)) {
						'ontouchstart' in document.documentElement &&
							!f.closest('.navbar-nav').length &&
							a(document.createElement('div')).addClass('dropdown-backdrop').insertAfter(a(this)).on('click', c);
						var h = { relatedTarget: this };
						if ((f.trigger((d = a.Event('show.bs.dropdown', h))), d.isDefaultPrevented())) return;
						e.trigger('focus').attr('aria-expanded', 'true'), f.toggleClass('open').trigger(a.Event('shown.bs.dropdown', h));
					}
					return !1;
				}
			}),
			(g.prototype.keydown = function (c) {
				if (/(38|40|27|32)/.test(c.which) && !/input|textarea/i.test(c.target.tagName)) {
					var d = a(this);
					if ((c.preventDefault(), c.stopPropagation(), !d.is('.disabled, :disabled'))) {
						var e = b(d),
							g = e.hasClass('open');
						if ((!g && 27 != c.which) || (g && 27 == c.which)) return 27 == c.which && e.find(f).trigger('focus'), d.trigger('click');
						var h = ' li:not(.disabled):visible a',
							i = e.find('.dropdown-menu' + h);
						if (i.length) {
							var j = i.index(c.target);
							38 == c.which && j > 0 && j--, 40 == c.which && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).trigger('focus');
						}
					}
				}
			});
		var h = a.fn.dropdown;
		(a.fn.dropdown = d),
			(a.fn.dropdown.Constructor = g),
			(a.fn.dropdown.noConflict = function () {
				return (a.fn.dropdown = h), this;
			}),
			a(document)
				.on('click.bs.dropdown.data-api', c)
				.on('click.bs.dropdown.data-api', '.dropdown form', function (a) {
					a.stopPropagation();
				})
				.on('click.bs.dropdown.data-api', f, g.prototype.toggle)
				.on('keydown.bs.dropdown.data-api', f, g.prototype.keydown)
				.on('keydown.bs.dropdown.data-api', '.dropdown-menu', g.prototype.keydown);
	})(jQuery),
	+(function (a) {
		'use strict';
		function b(b, d) {
			return this.each(function () {
				var e = a(this),
					f = e.data('bs.modal'),
					g = a.extend({}, c.DEFAULTS, e.data(), 'object' == typeof b && b);
				f || e.data('bs.modal', (f = new c(this, g))), 'string' == typeof b ? f[b](d) : g.show && f.show(d);
			});
		}
		var c = function (b, c) {
			(this.options = c),
				(this.$body = a(document.body)),
				(this.$element = a(b)),
				(this.$dialog = this.$element.find('.modal-dialog')),
				(this.$backdrop = null),
				(this.isShown = null),
				(this.originalBodyPad = null),
				(this.scrollbarWidth = 0),
				(this.ignoreBackdropClick = !1),
				this.options.remote &&
					this.$element.find('.modal-content').load(
						this.options.remote,
						a.proxy(function () {
							this.$element.trigger('loaded.bs.modal');
						}, this)
					);
		};
		(c.VERSION = '3.3.6'),
			(c.TRANSITION_DURATION = 300),
			(c.BACKDROP_TRANSITION_DURATION = 150),
			(c.DEFAULTS = { backdrop: !0, keyboard: !0, show: !0 }),
			(c.prototype.toggle = function (a) {
				return this.isShown ? this.hide() : this.show(a);
			}),
			(c.prototype.show = function (b) {
				var d = this,
					e = a.Event('show.bs.modal', { relatedTarget: b });
				this.$element.trigger(e),
					this.isShown ||
						e.isDefaultPrevented() ||
						((this.isShown = !0),
						this.checkScrollbar(),
						this.setScrollbar(),
						this.$body.addClass('modal-open'),
						this.escape(),
						this.resize(),
						this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', a.proxy(this.hide, this)),
						this.$dialog.on('mousedown.dismiss.bs.modal', function () {
							d.$element.one('mouseup.dismiss.bs.modal', function (b) {
								a(b.target).is(d.$element) && (d.ignoreBackdropClick = !0);
							});
						}),
						this.backdrop(function () {
							var e = a.support.transition && d.$element.hasClass('fade');
							d.$element.parent().length || d.$element.appendTo(d.$body),
								d.$element.show().scrollTop(0),
								d.adjustDialog(),
								e && d.$element[0].offsetWidth,
								d.$element.addClass('in'),
								d.enforceFocus();
							var f = a.Event('shown.bs.modal', { relatedTarget: b });
							e
								? d.$dialog
										.one('bsTransitionEnd', function () {
											d.$element.trigger('focus').trigger(f);
										})
										.emulateTransitionEnd(c.TRANSITION_DURATION)
								: d.$element.trigger('focus').trigger(f);
						}));
			}),
			(c.prototype.hide = function (b) {
				b && b.preventDefault(),
					(b = a.Event('hide.bs.modal')),
					this.$element.trigger(b),
					this.isShown &&
						!b.isDefaultPrevented() &&
						((this.isShown = !1),
						this.escape(),
						this.resize(),
						a(document).off('focusin.bs.modal'),
						this.$element.removeClass('in').off('click.dismiss.bs.modal').off('mouseup.dismiss.bs.modal'),
						this.$dialog.off('mousedown.dismiss.bs.modal'),
						a.support.transition && this.$element.hasClass('fade')
							? this.$element.one('bsTransitionEnd', a.proxy(this.hideModal, this)).emulateTransitionEnd(c.TRANSITION_DURATION)
							: this.hideModal());
			}),
			(c.prototype.enforceFocus = function () {
				a(document)
					.off('focusin.bs.modal')
					.on(
						'focusin.bs.modal',
						a.proxy(function (a) {
							this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger('focus');
						}, this)
					);
			}),
			(c.prototype.escape = function () {
				this.isShown && this.options.keyboard
					? this.$element.on(
							'keydown.dismiss.bs.modal',
							a.proxy(function (a) {
								27 == a.which && this.hide();
							}, this)
					  )
					: this.isShown || this.$element.off('keydown.dismiss.bs.modal');
			}),
			(c.prototype.resize = function () {
				this.isShown ? a(window).on('resize.bs.modal', a.proxy(this.handleUpdate, this)) : a(window).off('resize.bs.modal');
			}),
			(c.prototype.hideModal = function () {
				var a = this;
				this.$element.hide(),
					this.backdrop(function () {
						a.$body.removeClass('modal-open'), a.resetAdjustments(), a.resetScrollbar(), a.$element.trigger('hidden.bs.modal');
					});
			}),
			(c.prototype.removeBackdrop = function () {
				this.$backdrop && this.$backdrop.remove(), (this.$backdrop = null);
			}),
			(c.prototype.backdrop = function (b) {
				var d = this,
					e = this.$element.hasClass('fade') ? 'fade' : '';
				if (this.isShown && this.options.backdrop) {
					var f = a.support.transition && e;
					if (
						((this.$backdrop = a(document.createElement('div'))
							.addClass('modal-backdrop ' + e)
							.appendTo(this.$body)),
						this.$element.on(
							'click.dismiss.bs.modal',
							a.proxy(function (a) {
								return this.ignoreBackdropClick
									? void (this.ignoreBackdropClick = !1)
									: void (
											a.target === a.currentTarget &&
											('static' == this.options.backdrop ? this.$element[0].focus() : this.hide())
									  );
							}, this)
						),
						f && this.$backdrop[0].offsetWidth,
						this.$backdrop.addClass('in'),
						!b)
					)
						return;
					f ? this.$backdrop.one('bsTransitionEnd', b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : b();
				} else if (!this.isShown && this.$backdrop) {
					this.$backdrop.removeClass('in');
					var g = function () {
						d.removeBackdrop(), b && b();
					};
					a.support.transition && this.$element.hasClass('fade')
						? this.$backdrop.one('bsTransitionEnd', g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION)
						: g();
				} else b && b();
			}),
			(c.prototype.handleUpdate = function () {
				this.adjustDialog();
			}),
			(c.prototype.adjustDialog = function () {
				var a = this.$element[0].scrollHeight > document.documentElement.clientHeight;
				this.$element.css({
					paddingLeft: !this.bodyIsOverflowing && a ? this.scrollbarWidth : '',
					paddingRight: this.bodyIsOverflowing && !a ? this.scrollbarWidth : '',
				});
			}),
			(c.prototype.resetAdjustments = function () {
				this.$element.css({ paddingLeft: '', paddingRight: '' });
			}),
			(c.prototype.checkScrollbar = function () {
				var a = window.innerWidth;
				if (!a) {
					var b = document.documentElement.getBoundingClientRect();
					a = b.right - Math.abs(b.left);
				}
				(this.bodyIsOverflowing = document.body.clientWidth < a), (this.scrollbarWidth = this.measureScrollbar());
			}),
			(c.prototype.setScrollbar = function () {
				var a = parseInt(this.$body.css('padding-right') || 0, 10);
				(this.originalBodyPad = document.body.style.paddingRight || ''),
					this.bodyIsOverflowing && this.$body.css('padding-right', a + this.scrollbarWidth);
			}),
			(c.prototype.resetScrollbar = function () {
				this.$body.css('padding-right', this.originalBodyPad);
			}),
			(c.prototype.measureScrollbar = function () {
				var a = document.createElement('div');
				(a.className = 'modal-scrollbar-measure'), this.$body.append(a);
				var b = a.offsetWidth - a.clientWidth;
				return this.$body[0].removeChild(a), b;
			});
		var d = a.fn.modal;
		(a.fn.modal = b),
			(a.fn.modal.Constructor = c),
			(a.fn.modal.noConflict = function () {
				return (a.fn.modal = d), this;
			}),
			a(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (c) {
				var d = a(this),
					e = d.attr('href'),
					f = a(d.attr('data-target') || (e && e.replace(/.*(?=#[^\s]+$)/, ''))),
					g = f.data('bs.modal') ? 'toggle' : a.extend({ remote: !/#/.test(e) && e }, f.data(), d.data());
				d.is('a') && c.preventDefault(),
					f.one('show.bs.modal', function (a) {
						a.isDefaultPrevented() ||
							f.one('hidden.bs.modal', function () {
								d.is(':visible') && d.trigger('focus');
							});
					}),
					b.call(f, g, this);
			});
	})(jQuery),
	+(function (a) {
		'use strict';
		function b(b) {
			return this.each(function () {
				var d = a(this),
					e = d.data('bs.tooltip'),
					f = 'object' == typeof b && b;
				(e || !/destroy|hide/.test(b)) && (e || d.data('bs.tooltip', (e = new c(this, f))), 'string' == typeof b && e[b]());
			});
		}
		var c = function (a, b) {
			(this.type = null),
				(this.options = null),
				(this.enabled = null),
				(this.timeout = null),
				(this.hoverState = null),
				(this.$element = null),
				(this.inState = null),
				this.init('tooltip', a, b);
		};
		(c.VERSION = '3.3.6'),
			(c.TRANSITION_DURATION = 150),
			(c.DEFAULTS = {
				animation: !0,
				placement: 'top',
				selector: !1,
				template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
				trigger: 'hover focus',
				title: '',
				delay: 0,
				html: !1,
				container: !1,
				viewport: { selector: 'body', padding: 0 },
			}),
			(c.prototype.init = function (b, c, d) {
				if (
					((this.enabled = !0),
					(this.type = b),
					(this.$element = a(c)),
					(this.options = this.getOptions(d)),
					(this.$viewport =
						this.options.viewport &&
						a(
							a.isFunction(this.options.viewport)
								? this.options.viewport.call(this, this.$element)
								: this.options.viewport.selector || this.options.viewport
						)),
					(this.inState = { click: !1, hover: !1, focus: !1 }),
					this.$element[0] instanceof document.constructor && !this.options.selector)
				)
					throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!');
				for (var e = this.options.trigger.split(' '), f = e.length; f--; ) {
					var g = e[f];
					if ('click' == g) this.$element.on('click.' + this.type, this.options.selector, a.proxy(this.toggle, this));
					else if ('manual' != g) {
						var h = 'hover' == g ? 'mouseenter' : 'focusin',
							i = 'hover' == g ? 'mouseleave' : 'focusout';
						this.$element.on(h + '.' + this.type, this.options.selector, a.proxy(this.enter, this)),
							this.$element.on(i + '.' + this.type, this.options.selector, a.proxy(this.leave, this));
					}
				}
				this.options.selector ? (this._options = a.extend({}, this.options, { trigger: 'manual', selector: '' })) : this.fixTitle();
			}),
			(c.prototype.getDefaults = function () {
				return c.DEFAULTS;
			}),
			(c.prototype.getOptions = function (b) {
				return (
					(b = a.extend({}, this.getDefaults(), this.$element.data(), b)),
					b.delay && 'number' == typeof b.delay && (b.delay = { show: b.delay, hide: b.delay }),
					b
				);
			}),
			(c.prototype.getDelegateOptions = function () {
				var b = {},
					c = this.getDefaults();
				return (
					this._options &&
						a.each(this._options, function (a, d) {
							c[a] != d && (b[a] = d);
						}),
					b
				);
			}),
			(c.prototype.enter = function (b) {
				var c = b instanceof this.constructor ? b : a(b.currentTarget).data('bs.' + this.type);
				return (
					c || ((c = new this.constructor(b.currentTarget, this.getDelegateOptions())), a(b.currentTarget).data('bs.' + this.type, c)),
					b instanceof a.Event && (c.inState['focusin' == b.type ? 'focus' : 'hover'] = !0),
					c.tip().hasClass('in') || 'in' == c.hoverState
						? void (c.hoverState = 'in')
						: (clearTimeout(c.timeout),
						  (c.hoverState = 'in'),
						  c.options.delay && c.options.delay.show
								? void (c.timeout = setTimeout(function () {
										'in' == c.hoverState && c.show();
								  }, c.options.delay.show))
								: c.show())
				);
			}),
			(c.prototype.isInStateTrue = function () {
				for (var a in this.inState) if (this.inState[a]) return !0;
				return !1;
			}),
			(c.prototype.leave = function (b) {
				var c = b instanceof this.constructor ? b : a(b.currentTarget).data('bs.' + this.type);
				return (
					c || ((c = new this.constructor(b.currentTarget, this.getDelegateOptions())), a(b.currentTarget).data('bs.' + this.type, c)),
					b instanceof a.Event && (c.inState['focusout' == b.type ? 'focus' : 'hover'] = !1),
					c.isInStateTrue()
						? void 0
						: (clearTimeout(c.timeout),
						  (c.hoverState = 'out'),
						  c.options.delay && c.options.delay.hide
								? void (c.timeout = setTimeout(function () {
										'out' == c.hoverState && c.hide();
								  }, c.options.delay.hide))
								: c.hide())
				);
			}),
			(c.prototype.show = function () {
				var b = a.Event('show.bs.' + this.type);
				if (this.hasContent() && this.enabled) {
					this.$element.trigger(b);
					var d = a.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
					if (b.isDefaultPrevented() || !d) return;
					var e = this,
						f = this.tip(),
						g = this.getUID(this.type);
					this.setContent(), f.attr('id', g), this.$element.attr('aria-describedby', g), this.options.animation && f.addClass('fade');
					var h =
							'function' == typeof this.options.placement
								? this.options.placement.call(this, f[0], this.$element[0])
								: this.options.placement,
						i = /\s?auto?\s?/i,
						j = i.test(h);
					j && (h = h.replace(i, '') || 'top'),
						f
							.detach()
							.css({ top: 0, left: 0, display: 'block' })
							.addClass(h)
							.data('bs.' + this.type, this),
						this.options.container ? f.appendTo(this.options.container) : f.insertAfter(this.$element),
						this.$element.trigger('inserted.bs.' + this.type);
					var k = this.getPosition(),
						l = f[0].offsetWidth,
						m = f[0].offsetHeight;
					if (j) {
						var n = h,
							o = this.getPosition(this.$viewport);
						(h =
							'bottom' == h && k.bottom + m > o.bottom
								? 'top'
								: 'top' == h && k.top - m < o.top
								? 'bottom'
								: 'right' == h && k.right + l > o.width
								? 'left'
								: 'left' == h && k.left - l < o.left
								? 'right'
								: h),
							f.removeClass(n).addClass(h);
					}
					var p = this.getCalculatedOffset(h, k, l, m);
					this.applyPlacement(p, h);
					var q = function () {
						var a = e.hoverState;
						e.$element.trigger('shown.bs.' + e.type), (e.hoverState = null), 'out' == a && e.leave(e);
					};
					a.support.transition && this.$tip.hasClass('fade')
						? f.one('bsTransitionEnd', q).emulateTransitionEnd(c.TRANSITION_DURATION)
						: q();
				}
			}),
			(c.prototype.applyPlacement = function (b, c) {
				var d = this.tip(),
					e = d[0].offsetWidth,
					f = d[0].offsetHeight,
					g = parseInt(d.css('margin-top'), 10),
					h = parseInt(d.css('margin-left'), 10);
				isNaN(g) && (g = 0),
					isNaN(h) && (h = 0),
					(b.top += g),
					(b.left += h),
					a.offset.setOffset(
						d[0],
						a.extend(
							{
								using: function (a) {
									d.css({ top: Math.round(a.top), left: Math.round(a.left) });
								},
							},
							b
						),
						0
					),
					d.addClass('in');
				var i = d[0].offsetWidth,
					j = d[0].offsetHeight;
				'top' == c && j != f && (b.top = b.top + f - j);
				var k = this.getViewportAdjustedDelta(c, b, i, j);
				k.left ? (b.left += k.left) : (b.top += k.top);
				var l = /top|bottom/.test(c),
					m = l ? 2 * k.left - e + i : 2 * k.top - f + j,
					n = l ? 'offsetWidth' : 'offsetHeight';
				d.offset(b), this.replaceArrow(m, d[0][n], l);
			}),
			(c.prototype.replaceArrow = function (a, b, c) {
				this.arrow()
					.css(c ? 'left' : 'top', 50 * (1 - a / b) + '%')
					.css(c ? 'top' : 'left', '');
			}),
			(c.prototype.setContent = function () {
				var a = this.tip(),
					b = this.getTitle();
				a.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](b), a.removeClass('fade in top bottom left right');
			}),
			(c.prototype.hide = function (b) {
				function d() {
					'in' != e.hoverState && f.detach(), e.$element.removeAttr('aria-describedby').trigger('hidden.bs.' + e.type), b && b();
				}
				var e = this,
					f = a(this.$tip),
					g = a.Event('hide.bs.' + this.type);
				return (
					this.$element.trigger(g),
					g.isDefaultPrevented()
						? void 0
						: (f.removeClass('in'),
						  a.support.transition && f.hasClass('fade') ? f.one('bsTransitionEnd', d).emulateTransitionEnd(c.TRANSITION_DURATION) : d(),
						  (this.hoverState = null),
						  this)
				);
			}),
			(c.prototype.fixTitle = function () {
				var a = this.$element;
				(a.attr('title') || 'string' != typeof a.attr('data-original-title')) &&
					a.attr('data-original-title', a.attr('title') || '').attr('title', '');
			}),
			(c.prototype.hasContent = function () {
				return this.getTitle();
			}),
			(c.prototype.getPosition = function (b) {
				b = b || this.$element;
				var c = b[0],
					d = 'BODY' == c.tagName,
					e = c.getBoundingClientRect();
				null == e.width && (e = a.extend({}, e, { width: e.right - e.left, height: e.bottom - e.top }));
				var f = d ? { top: 0, left: 0 } : b.offset(),
					g = { scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop() },
					h = d ? { width: a(window).width(), height: a(window).height() } : null;
				return a.extend({}, e, g, h, f);
			}),
			(c.prototype.getCalculatedOffset = function (a, b, c, d) {
				return 'bottom' == a
					? { top: b.top + b.height, left: b.left + b.width / 2 - c / 2 }
					: 'top' == a
					? { top: b.top - d, left: b.left + b.width / 2 - c / 2 }
					: 'left' == a
					? { top: b.top + b.height / 2 - d / 2, left: b.left - c }
					: { top: b.top + b.height / 2 - d / 2, left: b.left + b.width };
			}),
			(c.prototype.getViewportAdjustedDelta = function (a, b, c, d) {
				var e = { top: 0, left: 0 };
				if (!this.$viewport) return e;
				var f = (this.options.viewport && this.options.viewport.padding) || 0,
					g = this.getPosition(this.$viewport);
				if (/right|left/.test(a)) {
					var h = b.top - f - g.scroll,
						i = b.top + f - g.scroll + d;
					h < g.top ? (e.top = g.top - h) : i > g.top + g.height && (e.top = g.top + g.height - i);
				} else {
					var j = b.left - f,
						k = b.left + f + c;
					j < g.left ? (e.left = g.left - j) : k > g.right && (e.left = g.left + g.width - k);
				}
				return e;
			}),
			(c.prototype.getTitle = function () {
				var a,
					b = this.$element,
					c = this.options;
				return (a = b.attr('data-original-title') || ('function' == typeof c.title ? c.title.call(b[0]) : c.title));
			}),
			(c.prototype.getUID = function (a) {
				do a += ~~(1e6 * Math.random());
				while (document.getElementById(a));
				return a;
			}),
			(c.prototype.tip = function () {
				if (!this.$tip && ((this.$tip = a(this.options.template)), 1 != this.$tip.length))
					throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!');
				return this.$tip;
			}),
			(c.prototype.arrow = function () {
				return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'));
			}),
			(c.prototype.enable = function () {
				this.enabled = !0;
			}),
			(c.prototype.disable = function () {
				this.enabled = !1;
			}),
			(c.prototype.toggleEnabled = function () {
				this.enabled = !this.enabled;
			}),
			(c.prototype.toggle = function (b) {
				var c = this;
				b &&
					((c = a(b.currentTarget).data('bs.' + this.type)),
					c || ((c = new this.constructor(b.currentTarget, this.getDelegateOptions())), a(b.currentTarget).data('bs.' + this.type, c))),
					b
						? ((c.inState.click = !c.inState.click), c.isInStateTrue() ? c.enter(c) : c.leave(c))
						: c.tip().hasClass('in')
						? c.leave(c)
						: c.enter(c);
			}),
			(c.prototype.destroy = function () {
				var a = this;
				clearTimeout(this.timeout),
					this.hide(function () {
						a.$element.off('.' + a.type).removeData('bs.' + a.type),
							a.$tip && a.$tip.detach(),
							(a.$tip = null),
							(a.$arrow = null),
							(a.$viewport = null);
					});
			});
		var d = a.fn.tooltip;
		(a.fn.tooltip = b),
			(a.fn.tooltip.Constructor = c),
			(a.fn.tooltip.noConflict = function () {
				return (a.fn.tooltip = d), this;
			});
	})(jQuery),
	+(function (a) {
		'use strict';
		function b(b) {
			return this.each(function () {
				var d = a(this),
					e = d.data('bs.popover'),
					f = 'object' == typeof b && b;
				(e || !/destroy|hide/.test(b)) && (e || d.data('bs.popover', (e = new c(this, f))), 'string' == typeof b && e[b]());
			});
		}
		var c = function (a, b) {
			this.init('popover', a, b);
		};
		if (!a.fn.tooltip) throw new Error('Popover requires tooltip.js');
		(c.VERSION = '3.3.6'),
			(c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
				placement: 'right',
				trigger: 'click',
				content: '',
				template:
					'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
			})),
			(c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype)),
			(c.prototype.constructor = c),
			(c.prototype.getDefaults = function () {
				return c.DEFAULTS;
			}),
			(c.prototype.setContent = function () {
				var a = this.tip(),
					b = this.getTitle(),
					c = this.getContent();
				a.find('.popover-title')[this.options.html ? 'html' : 'text'](b),
					a.find('.popover-content').children().detach().end()[this.options.html ? ('string' == typeof c ? 'html' : 'append') : 'text'](c),
					a.removeClass('fade top bottom left right in'),
					a.find('.popover-title').html() || a.find('.popover-title').hide();
			}),
			(c.prototype.hasContent = function () {
				return this.getTitle() || this.getContent();
			}),
			(c.prototype.getContent = function () {
				var a = this.$element,
					b = this.options;
				return a.attr('data-content') || ('function' == typeof b.content ? b.content.call(a[0]) : b.content);
			}),
			(c.prototype.arrow = function () {
				return (this.$arrow = this.$arrow || this.tip().find('.arrow'));
			});
		var d = a.fn.popover;
		(a.fn.popover = b),
			(a.fn.popover.Constructor = c),
			(a.fn.popover.noConflict = function () {
				return (a.fn.popover = d), this;
			});
	})(jQuery),
	+(function (a) {
		'use strict';
		function b(c, d) {
			(this.$body = a(document.body)),
				(this.$scrollElement = a(a(c).is(document.body) ? window : c)),
				(this.options = a.extend({}, b.DEFAULTS, d)),
				(this.selector = (this.options.target || '') + ' .nav li > a'),
				(this.offsets = []),
				(this.targets = []),
				(this.activeTarget = null),
				(this.scrollHeight = 0),
				this.$scrollElement.on('scroll.bs.scrollspy', a.proxy(this.process, this)),
				this.refresh(),
				this.process();
		}
		function c(c) {
			return this.each(function () {
				var d = a(this),
					e = d.data('bs.scrollspy'),
					f = 'object' == typeof c && c;
				e || d.data('bs.scrollspy', (e = new b(this, f))), 'string' == typeof c && e[c]();
			});
		}
		(b.VERSION = '3.3.6'),
			(b.DEFAULTS = { offset: 10 }),
			(b.prototype.getScrollHeight = function () {
				return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
			}),
			(b.prototype.refresh = function () {
				var b = this,
					c = 'offset',
					d = 0;
				(this.offsets = []),
					(this.targets = []),
					(this.scrollHeight = this.getScrollHeight()),
					a.isWindow(this.$scrollElement[0]) || ((c = 'position'), (d = this.$scrollElement.scrollTop())),
					this.$body
						.find(this.selector)
						.map(function () {
							var b = a(this),
								e = b.data('target') || b.attr('href'),
								f = /^#./.test(e) && a(e);
							return (f && f.length && f.is(':visible') && [[f[c]().top + d, e]]) || null;
						})
						.sort(function (a, b) {
							return a[0] - b[0];
						})
						.each(function () {
							b.offsets.push(this[0]), b.targets.push(this[1]);
						});
			}),
			(b.prototype.process = function () {
				var a,
					b = this.$scrollElement.scrollTop() + this.options.offset,
					c = this.getScrollHeight(),
					d = this.options.offset + c - this.$scrollElement.height(),
					e = this.offsets,
					f = this.targets,
					g = this.activeTarget;
				if ((this.scrollHeight != c && this.refresh(), b >= d)) return g != (a = f[f.length - 1]) && this.activate(a);
				if (g && b < e[0]) return (this.activeTarget = null), this.clear();
				for (a = e.length; a--; ) g != f[a] && b >= e[a] && (void 0 === e[a + 1] || b < e[a + 1]) && this.activate(f[a]);
			}),
			(b.prototype.activate = function (b) {
				(this.activeTarget = b), this.clear();
				var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
					d = a(c).parents('li').addClass('active');
				d.parent('.dropdown-menu').length && (d = d.closest('li.dropdown').addClass('active')), d.trigger('activate.bs.scrollspy');
			}),
			(b.prototype.clear = function () {
				a(this.selector).parentsUntil(this.options.target, '.active').removeClass('active');
			});
		var d = a.fn.scrollspy;
		(a.fn.scrollspy = c),
			(a.fn.scrollspy.Constructor = b),
			(a.fn.scrollspy.noConflict = function () {
				return (a.fn.scrollspy = d), this;
			}),
			a(window).on('load.bs.scrollspy.data-api', function () {
				a('[data-spy="scroll"]').each(function () {
					var b = a(this);
					c.call(b, b.data());
				});
			});
	})(jQuery),
	+(function (a) {
		'use strict';
		function b(b) {
			return this.each(function () {
				var d = a(this),
					e = d.data('bs.tab');
				e || d.data('bs.tab', (e = new c(this))), 'string' == typeof b && e[b]();
			});
		}
		var c = function (b) {
			this.element = a(b);
		};
		(c.VERSION = '3.3.6'),
			(c.TRANSITION_DURATION = 150),
			(c.prototype.show = function () {
				var b = this.element,
					c = b.closest('ul:not(.dropdown-menu)'),
					d = b.data('target');
				if ((d || ((d = b.attr('href')), (d = d && d.replace(/.*(?=#[^\s]*$)/, ''))), !b.parent('li').hasClass('active'))) {
					var e = c.find('.active:last a'),
						f = a.Event('hide.bs.tab', { relatedTarget: b[0] }),
						g = a.Event('show.bs.tab', { relatedTarget: e[0] });
					if ((e.trigger(f), b.trigger(g), !g.isDefaultPrevented() && !f.isDefaultPrevented())) {
						var h = a(d);
						this.activate(b.closest('li'), c),
							this.activate(h, h.parent(), function () {
								e.trigger({ type: 'hidden.bs.tab', relatedTarget: b[0] }), b.trigger({ type: 'shown.bs.tab', relatedTarget: e[0] });
							});
					}
				}
			}),
			(c.prototype.activate = function (b, d, e) {
				function f() {
					g
						.removeClass('active')
						.find('> .dropdown-menu > .active')
						.removeClass('active')
						.end()
						.find('[data-toggle="tab"]')
						.attr('aria-expanded', !1),
						b.addClass('active').find('[data-toggle="tab"]').attr('aria-expanded', !0),
						h ? (b[0].offsetWidth, b.addClass('in')) : b.removeClass('fade'),
						b.parent('.dropdown-menu').length &&
							b.closest('li.dropdown').addClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded', !0),
						e && e();
				}
				var g = d.find('> .active'),
					h = e && a.support.transition && ((g.length && g.hasClass('fade')) || !!d.find('> .fade').length);
				g.length && h ? g.one('bsTransitionEnd', f).emulateTransitionEnd(c.TRANSITION_DURATION) : f(), g.removeClass('in');
			});
		var d = a.fn.tab;
		(a.fn.tab = b),
			(a.fn.tab.Constructor = c),
			(a.fn.tab.noConflict = function () {
				return (a.fn.tab = d), this;
			});
		var e = function (c) {
			c.preventDefault(), b.call(a(this), 'show');
		};
		a(document).on('click.bs.tab.data-api', '[data-toggle="tab"]', e).on('click.bs.tab.data-api', '[data-toggle="pill"]', e);
	})(jQuery),
	+(function (a) {
		'use strict';
		function b(b) {
			return this.each(function () {
				var d = a(this),
					e = d.data('bs.affix'),
					f = 'object' == typeof b && b;
				e || d.data('bs.affix', (e = new c(this, f))), 'string' == typeof b && e[b]();
			});
		}
		var c = function (b, d) {
			(this.options = a.extend({}, c.DEFAULTS, d)),
				(this.$target = a(this.options.target)
					.on('scroll.bs.affix.data-api', a.proxy(this.checkPosition, this))
					.on('click.bs.affix.data-api', a.proxy(this.checkPositionWithEventLoop, this))),
				(this.$element = a(b)),
				(this.affixed = null),
				(this.unpin = null),
				(this.pinnedOffset = null),
				this.checkPosition();
		};
		(c.VERSION = '3.3.6'),
			(c.RESET = 'affix affix-top affix-bottom'),
			(c.DEFAULTS = { offset: 0, target: window }),
			(c.prototype.getState = function (a, b, c, d) {
				var e = this.$target.scrollTop(),
					f = this.$element.offset(),
					g = this.$target.height();
				if (null != c && 'top' == this.affixed) return c > e ? 'top' : !1;
				if ('bottom' == this.affixed) return null != c ? (e + this.unpin <= f.top ? !1 : 'bottom') : a - d >= e + g ? !1 : 'bottom';
				var h = null == this.affixed,
					i = h ? e : f.top,
					j = h ? g : b;
				return null != c && c >= e ? 'top' : null != d && i + j >= a - d ? 'bottom' : !1;
			}),
			(c.prototype.getPinnedOffset = function () {
				if (this.pinnedOffset) return this.pinnedOffset;
				this.$element.removeClass(c.RESET).addClass('affix');
				var a = this.$target.scrollTop(),
					b = this.$element.offset();
				return (this.pinnedOffset = b.top - a);
			}),
			(c.prototype.checkPositionWithEventLoop = function () {
				setTimeout(a.proxy(this.checkPosition, this), 1);
			}),
			(c.prototype.checkPosition = function () {
				if (this.$element.is(':visible')) {
					var b = this.$element.height(),
						d = this.options.offset,
						e = d.top,
						f = d.bottom,
						g = Math.max(a(document).height(), a(document.body).height());
					'object' != typeof d && (f = e = d),
						'function' == typeof e && (e = d.top(this.$element)),
						'function' == typeof f && (f = d.bottom(this.$element));
					var h = this.getState(g, b, e, f);
					if (this.affixed != h) {
						null != this.unpin && this.$element.css('top', '');
						var i = 'affix' + (h ? '-' + h : ''),
							j = a.Event(i + '.bs.affix');
						if ((this.$element.trigger(j), j.isDefaultPrevented())) return;
						(this.affixed = h),
							(this.unpin = 'bottom' == h ? this.getPinnedOffset() : null),
							this.$element
								.removeClass(c.RESET)
								.addClass(i)
								.trigger(i.replace('affix', 'affixed') + '.bs.affix');
					}
					'bottom' == h && this.$element.offset({ top: g - b - f });
				}
			});
		var d = a.fn.affix;
		(a.fn.affix = b),
			(a.fn.affix.Constructor = c),
			(a.fn.affix.noConflict = function () {
				return (a.fn.affix = d), this;
			}),
			a(window).on('load', function () {
				a('[data-spy="affix"]').each(function () {
					var c = a(this),
						d = c.data();
					(d.offset = d.offset || {}),
						null != d.offsetBottom && (d.offset.bottom = d.offsetBottom),
						null != d.offsetTop && (d.offset.top = d.offsetTop),
						b.call(c, d);
				});
			});
	})(jQuery);

/*
 Version: 1.5.9
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
!(function (a) {
	'use strict';
	'function' == typeof define && define.amd
		? define(['jquery'], a)
		: 'undefined' != typeof exports
		? (module.exports = a(require('jquery')))
		: a(jQuery);
})(function (a) {
	'use strict';
	var b = window.Slick || {};
	(b = (function () {
		function c(c, d) {
			var f,
				e = this;
			(e.defaults = {
				accessibility: !0,
				adaptiveHeight: !1,
				appendArrows: a(c),
				appendDots: a(c),
				arrows: !0,
				asNavFor: null,
				prevArrow:
					'<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
				nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
				autoplay: !1,
				autoplaySpeed: 3e3,
				centerMode: !1,
				centerPadding: '50px',
				cssEase: 'ease',
				customPaging: function (a, b) {
					return '<button type="button" data-role="none" role="button" aria-required="false" tabindex="0">' + (b + 1) + '</button>';
				},
				dots: !1,
				dotsClass: 'slick-dots',
				draggable: !0,
				easing: 'linear',
				edgeFriction: 0.35,
				fade: !1,
				focusOnSelect: !1,
				infinite: !0,
				initialSlide: 0,
				lazyLoad: 'ondemand',
				mobileFirst: !1,
				pauseOnHover: !0,
				pauseOnDotsHover: !1,
				respondTo: 'window',
				responsive: null,
				rows: 1,
				rtl: !1,
				slide: '',
				slidesPerRow: 1,
				slidesToShow: 1,
				slidesToScroll: 1,
				speed: 500,
				swipe: !0,
				swipeToSlide: !1,
				touchMove: !0,
				touchThreshold: 5,
				useCSS: !0,
				useTransform: !1,
				variableWidth: !1,
				vertical: !1,
				verticalSwiping: !1,
				waitForAnimate: !0,
				zIndex: 1e3,
			}),
				(e.initials = {
					animating: !1,
					dragging: !1,
					autoPlayTimer: null,
					currentDirection: 0,
					currentLeft: null,
					currentSlide: 0,
					direction: 1,
					$dots: null,
					listWidth: null,
					listHeight: null,
					loadIndex: 0,
					$nextArrow: null,
					$prevArrow: null,
					slideCount: null,
					slideWidth: null,
					$slideTrack: null,
					$slides: null,
					sliding: !1,
					slideOffset: 0,
					swipeLeft: null,
					$list: null,
					touchObject: {},
					transformsEnabled: !1,
					unslicked: !1,
				}),
				a.extend(e, e.initials),
				(e.activeBreakpoint = null),
				(e.animType = null),
				(e.animProp = null),
				(e.breakpoints = []),
				(e.breakpointSettings = []),
				(e.cssTransitions = !1),
				(e.hidden = 'hidden'),
				(e.paused = !1),
				(e.positionProp = null),
				(e.respondTo = null),
				(e.rowCount = 1),
				(e.shouldClick = !0),
				(e.$slider = a(c)),
				(e.$slidesCache = null),
				(e.transformType = null),
				(e.transitionType = null),
				(e.visibilityChange = 'visibilitychange'),
				(e.windowWidth = 0),
				(e.windowTimer = null),
				(f = a(c).data('slick') || {}),
				(e.options = a.extend({}, e.defaults, f, d)),
				(e.currentSlide = e.options.initialSlide),
				(e.originalSettings = e.options),
				'undefined' != typeof document.mozHidden
					? ((e.hidden = 'mozHidden'), (e.visibilityChange = 'mozvisibilitychange'))
					: 'undefined' != typeof document.webkitHidden && ((e.hidden = 'webkitHidden'), (e.visibilityChange = 'webkitvisibilitychange')),
				(e.autoPlay = a.proxy(e.autoPlay, e)),
				(e.autoPlayClear = a.proxy(e.autoPlayClear, e)),
				(e.changeSlide = a.proxy(e.changeSlide, e)),
				(e.clickHandler = a.proxy(e.clickHandler, e)),
				(e.selectHandler = a.proxy(e.selectHandler, e)),
				(e.setPosition = a.proxy(e.setPosition, e)),
				(e.swipeHandler = a.proxy(e.swipeHandler, e)),
				(e.dragHandler = a.proxy(e.dragHandler, e)),
				(e.keyHandler = a.proxy(e.keyHandler, e)),
				(e.autoPlayIterator = a.proxy(e.autoPlayIterator, e)),
				(e.instanceUid = b++),
				(e.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
				e.registerBreakpoints(),
				e.init(!0),
				e.checkResponsive(!0);
		}
		var b = 0;
		return c;
	})()),
		(b.prototype.addSlide = b.prototype.slickAdd =
			function (b, c, d) {
				var e = this;
				if ('boolean' == typeof c) (d = c), (c = null);
				else if (0 > c || c >= e.slideCount) return !1;
				e.unload(),
					'number' == typeof c
						? 0 === c && 0 === e.$slides.length
							? a(b).appendTo(e.$slideTrack)
							: d
							? a(b).insertBefore(e.$slides.eq(c))
							: a(b).insertAfter(e.$slides.eq(c))
						: d === !0
						? a(b).prependTo(e.$slideTrack)
						: a(b).appendTo(e.$slideTrack),
					(e.$slides = e.$slideTrack.children(this.options.slide)),
					e.$slideTrack.children(this.options.slide).detach(),
					e.$slideTrack.append(e.$slides),
					e.$slides.each(function (b, c) {
						a(c).attr('data-slick-index', b);
					}),
					(e.$slidesCache = e.$slides),
					e.reinit();
			}),
		(b.prototype.animateHeight = function () {
			var a = this;
			if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
				var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
				a.$list.animate({ height: b }, a.options.speed);
			}
		}),
		(b.prototype.animateSlide = function (b, c) {
			var d = {},
				e = this;
			e.animateHeight(),
				e.options.rtl === !0 && e.options.vertical === !1 && (b = -b),
				e.transformsEnabled === !1
					? e.options.vertical === !1
						? e.$slideTrack.animate({ left: b }, e.options.speed, e.options.easing, c)
						: e.$slideTrack.animate({ top: b }, e.options.speed, e.options.easing, c)
					: e.cssTransitions === !1
					? (e.options.rtl === !0 && (e.currentLeft = -e.currentLeft),
					  a({ animStart: e.currentLeft }).animate(
							{ animStart: b },
							{
								duration: e.options.speed,
								easing: e.options.easing,
								step: function (a) {
									(a = Math.ceil(a)),
										e.options.vertical === !1
											? ((d[e.animType] = 'translate(' + a + 'px, 0px)'), e.$slideTrack.css(d))
											: ((d[e.animType] = 'translate(0px,' + a + 'px)'), e.$slideTrack.css(d));
								},
								complete: function () {
									c && c.call();
								},
							}
					  ))
					: (e.applyTransition(),
					  (b = Math.ceil(b)),
					  e.options.vertical === !1
							? (d[e.animType] = 'translate3d(' + b + 'px, 0px, 0px)')
							: (d[e.animType] = 'translate3d(0px,' + b + 'px, 0px)'),
					  e.$slideTrack.css(d),
					  c &&
							setTimeout(function () {
								e.disableTransition(), c.call();
							}, e.options.speed));
		}),
		(b.prototype.asNavFor = function (b) {
			var c = this,
				d = c.options.asNavFor;
			d && null !== d && (d = a(d).not(c.$slider)),
				null !== d &&
					'object' == typeof d &&
					d.each(function () {
						var c = a(this).slick('getSlick');
						c.unslicked || c.slideHandler(b, !0);
					});
		}),
		(b.prototype.applyTransition = function (a) {
			var b = this,
				c = {};
			b.options.fade === !1
				? (c[b.transitionType] = b.transformType + ' ' + b.options.speed + 'ms ' + b.options.cssEase)
				: (c[b.transitionType] = 'opacity ' + b.options.speed + 'ms ' + b.options.cssEase),
				b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c);
		}),
		(b.prototype.autoPlay = function () {
			var a = this;
			a.autoPlayTimer && clearInterval(a.autoPlayTimer),
				a.slideCount > a.options.slidesToShow &&
					a.paused !== !0 &&
					(a.autoPlayTimer = setInterval(a.autoPlayIterator, a.options.autoplaySpeed));
		}),
		(b.prototype.autoPlayClear = function () {
			var a = this;
			a.autoPlayTimer && clearInterval(a.autoPlayTimer);
		}),
		(b.prototype.autoPlayIterator = function () {
			var a = this;
			a.options.infinite === !1
				? 1 === a.direction
					? (a.currentSlide + 1 === a.slideCount - 1 && (a.direction = 0), a.slideHandler(a.currentSlide + a.options.slidesToScroll))
					: (a.currentSlide - 1 === 0 && (a.direction = 1), a.slideHandler(a.currentSlide - a.options.slidesToScroll))
				: a.slideHandler(a.currentSlide + a.options.slidesToScroll);
		}),
		(b.prototype.buildArrows = function () {
			var b = this;
			b.options.arrows === !0 &&
				((b.$prevArrow = a(b.options.prevArrow).addClass('slick-arrow')),
				(b.$nextArrow = a(b.options.nextArrow).addClass('slick-arrow')),
				b.slideCount > b.options.slidesToShow
					? (b.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex'),
					  b.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex'),
					  b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.prependTo(b.options.appendArrows),
					  b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.appendTo(b.options.appendArrows),
					  b.options.infinite !== !0 && b.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true'))
					: b.$prevArrow.add(b.$nextArrow).addClass('slick-hidden').attr({ 'aria-disabled': 'true', tabindex: '-1' }));
		}),
		(b.prototype.buildDots = function () {
			var c,
				d,
				b = this;
			if (b.options.dots === !0 && b.slideCount > b.options.slidesToShow) {
				for (d = '<ul class="' + b.options.dotsClass + '">', c = 0; c <= b.getDotCount(); c += 1)
					d += '<li>' + b.options.customPaging.call(this, b, c) + '</li>';
				(d += '</ul>'),
					(b.$dots = a(d).appendTo(b.options.appendDots)),
					b.$dots.find('li').first().addClass('slick-active').attr('aria-hidden', 'false');
			}
		}),
		(b.prototype.buildOut = function () {
			var b = this;
			(b.$slides = b.$slider.children(b.options.slide + ':not(.slick-cloned)').addClass('slick-slide')),
				(b.slideCount = b.$slides.length),
				b.$slides.each(function (b, c) {
					a(c)
						.attr('data-slick-index', b)
						.data('originalStyling', a(c).attr('style') || '');
				}),
				b.$slider.addClass('slick-slider'),
				(b.$slideTrack =
					0 === b.slideCount
						? a('<div class="slick-track"/>').appendTo(b.$slider)
						: b.$slides.wrapAll('<div class="slick-track"/>').parent()),
				(b.$list = b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent()),
				b.$slideTrack.css('opacity', 0),
				(b.options.centerMode === !0 || b.options.swipeToSlide === !0) && (b.options.slidesToScroll = 1),
				a('img[data-lazy]', b.$slider).not('[src]').addClass('slick-loading'),
				b.setupInfinite(),
				b.buildArrows(),
				b.buildDots(),
				b.updateDots(),
				b.setSlideClasses('number' == typeof b.currentSlide ? b.currentSlide : 0),
				b.options.draggable === !0 && b.$list.addClass('draggable');
		}),
		(b.prototype.buildRows = function () {
			var b,
				c,
				d,
				e,
				f,
				g,
				h,
				a = this;
			if (((e = document.createDocumentFragment()), (g = a.$slider.children()), a.options.rows > 1)) {
				for (h = a.options.slidesPerRow * a.options.rows, f = Math.ceil(g.length / h), b = 0; f > b; b++) {
					var i = document.createElement('div');
					for (c = 0; c < a.options.rows; c++) {
						var j = document.createElement('div');
						for (d = 0; d < a.options.slidesPerRow; d++) {
							var k = b * h + (c * a.options.slidesPerRow + d);
							g.get(k) && j.appendChild(g.get(k));
						}
						i.appendChild(j);
					}
					e.appendChild(i);
				}
				a.$slider.html(e),
					a.$slider
						.children()
						.children()
						.children()
						.css({ width: 100 / a.options.slidesPerRow + '%', display: 'inline-block' });
			}
		}),
		(b.prototype.checkResponsive = function (b, c) {
			var e,
				f,
				g,
				d = this,
				h = !1,
				i = d.$slider.width(),
				j = window.innerWidth || a(window).width();
			if (
				('window' === d.respondTo ? (g = j) : 'slider' === d.respondTo ? (g = i) : 'min' === d.respondTo && (g = Math.min(j, i)),
				d.options.responsive && d.options.responsive.length && null !== d.options.responsive)
			) {
				f = null;
				for (e in d.breakpoints)
					d.breakpoints.hasOwnProperty(e) &&
						(d.originalSettings.mobileFirst === !1
							? g < d.breakpoints[e] && (f = d.breakpoints[e])
							: g > d.breakpoints[e] && (f = d.breakpoints[e]));
				null !== f
					? null !== d.activeBreakpoint
						? (f !== d.activeBreakpoint || c) &&
						  ((d.activeBreakpoint = f),
						  'unslick' === d.breakpointSettings[f]
								? d.unslick(f)
								: ((d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f])),
								  b === !0 && (d.currentSlide = d.options.initialSlide),
								  d.refresh(b)),
						  (h = f))
						: ((d.activeBreakpoint = f),
						  'unslick' === d.breakpointSettings[f]
								? d.unslick(f)
								: ((d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f])),
								  b === !0 && (d.currentSlide = d.options.initialSlide),
								  d.refresh(b)),
						  (h = f))
					: null !== d.activeBreakpoint &&
					  ((d.activeBreakpoint = null),
					  (d.options = d.originalSettings),
					  b === !0 && (d.currentSlide = d.options.initialSlide),
					  d.refresh(b),
					  (h = f)),
					b || h === !1 || d.$slider.trigger('breakpoint', [d, h]);
			}
		}),
		(b.prototype.changeSlide = function (b, c) {
			var f,
				g,
				h,
				d = this,
				e = a(b.target);
			switch (
				(e.is('a') && b.preventDefault(),
				e.is('li') || (e = e.closest('li')),
				(h = d.slideCount % d.options.slidesToScroll !== 0),
				(f = h ? 0 : (d.slideCount - d.currentSlide) % d.options.slidesToScroll),
				b.data.message)
			) {
				case 'previous':
					(g = 0 === f ? d.options.slidesToScroll : d.options.slidesToShow - f),
						d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide - g, !1, c);
					break;
				case 'next':
					(g = 0 === f ? d.options.slidesToScroll : f), d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide + g, !1, c);
					break;
				case 'index':
					var i = 0 === b.data.index ? 0 : b.data.index || e.index() * d.options.slidesToScroll;
					d.slideHandler(d.checkNavigable(i), !1, c), e.children().trigger('focus');
					break;
				default:
					return;
			}
		}),
		(b.prototype.checkNavigable = function (a) {
			var c,
				d,
				b = this;
			if (((c = b.getNavigableIndexes()), (d = 0), a > c[c.length - 1])) a = c[c.length - 1];
			else
				for (var e in c) {
					if (a < c[e]) {
						a = d;
						break;
					}
					d = c[e];
				}
			return a;
		}),
		(b.prototype.cleanUpEvents = function () {
			var b = this;
			b.options.dots &&
				null !== b.$dots &&
				(a('li', b.$dots).off('click.slick', b.changeSlide),
				b.options.pauseOnDotsHover === !0 &&
					b.options.autoplay === !0 &&
					a('li', b.$dots).off('mouseenter.slick', a.proxy(b.setPaused, b, !0)).off('mouseleave.slick', a.proxy(b.setPaused, b, !1))),
				b.options.arrows === !0 &&
					b.slideCount > b.options.slidesToShow &&
					(b.$prevArrow && b.$prevArrow.off('click.slick', b.changeSlide), b.$nextArrow && b.$nextArrow.off('click.slick', b.changeSlide)),
				b.$list.off('touchstart.slick mousedown.slick', b.swipeHandler),
				b.$list.off('touchmove.slick mousemove.slick', b.swipeHandler),
				b.$list.off('touchend.slick mouseup.slick', b.swipeHandler),
				b.$list.off('touchcancel.slick mouseleave.slick', b.swipeHandler),
				b.$list.off('click.slick', b.clickHandler),
				a(document).off(b.visibilityChange, b.visibility),
				b.$list.off('mouseenter.slick', a.proxy(b.setPaused, b, !0)),
				b.$list.off('mouseleave.slick', a.proxy(b.setPaused, b, !1)),
				b.options.accessibility === !0 && b.$list.off('keydown.slick', b.keyHandler),
				b.options.focusOnSelect === !0 && a(b.$slideTrack).children().off('click.slick', b.selectHandler),
				a(window).off('orientationchange.slick.slick-' + b.instanceUid, b.orientationChange),
				a(window).off('resize.slick.slick-' + b.instanceUid, b.resize),
				a('[draggable!=true]', b.$slideTrack).off('dragstart', b.preventDefault),
				a(window).off('load.slick.slick-' + b.instanceUid, b.setPosition),
				a(document).off('ready.slick.slick-' + b.instanceUid, b.setPosition);
		}),
		(b.prototype.cleanUpRows = function () {
			var b,
				a = this;
			a.options.rows > 1 && ((b = a.$slides.children().children()), b.removeAttr('style'), a.$slider.html(b));
		}),
		(b.prototype.clickHandler = function (a) {
			var b = this;
			b.shouldClick === !1 && (a.stopImmediatePropagation(), a.stopPropagation(), a.preventDefault());
		}),
		(b.prototype.destroy = function (b) {
			var c = this;
			c.autoPlayClear(),
				(c.touchObject = {}),
				c.cleanUpEvents(),
				a('.slick-cloned', c.$slider).detach(),
				c.$dots && c.$dots.remove(),
				c.$prevArrow &&
					c.$prevArrow.length &&
					(c.$prevArrow
						.removeClass('slick-disabled slick-arrow slick-hidden')
						.removeAttr('aria-hidden aria-disabled tabindex')
						.css('display', ''),
					c.htmlExpr.test(c.options.prevArrow) && c.$prevArrow.remove()),
				c.$nextArrow &&
					c.$nextArrow.length &&
					(c.$nextArrow
						.removeClass('slick-disabled slick-arrow slick-hidden')
						.removeAttr('aria-hidden aria-disabled tabindex')
						.css('display', ''),
					c.htmlExpr.test(c.options.nextArrow) && c.$nextArrow.remove()),
				c.$slides &&
					(c.$slides
						.removeClass('slick-slide slick-active slick-center slick-visible slick-current')
						.removeAttr('aria-hidden')
						.removeAttr('data-slick-index')
						.each(function () {
							a(this).attr('style', a(this).data('originalStyling'));
						}),
					c.$slideTrack.children(this.options.slide).detach(),
					c.$slideTrack.detach(),
					c.$list.detach(),
					c.$slider.append(c.$slides)),
				c.cleanUpRows(),
				c.$slider.removeClass('slick-slider'),
				c.$slider.removeClass('slick-initialized'),
				(c.unslicked = !0),
				b || c.$slider.trigger('destroy', [c]);
		}),
		(b.prototype.disableTransition = function (a) {
			var b = this,
				c = {};
			(c[b.transitionType] = ''), b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c);
		}),
		(b.prototype.fadeSlide = function (a, b) {
			var c = this;
			c.cssTransitions === !1
				? (c.$slides.eq(a).css({ zIndex: c.options.zIndex }), c.$slides.eq(a).animate({ opacity: 1 }, c.options.speed, c.options.easing, b))
				: (c.applyTransition(a),
				  c.$slides.eq(a).css({ opacity: 1, zIndex: c.options.zIndex }),
				  b &&
						setTimeout(function () {
							c.disableTransition(a), b.call();
						}, c.options.speed));
		}),
		(b.prototype.fadeSlideOut = function (a) {
			var b = this;
			b.cssTransitions === !1
				? b.$slides.eq(a).animate({ opacity: 0, zIndex: b.options.zIndex - 2 }, b.options.speed, b.options.easing)
				: (b.applyTransition(a), b.$slides.eq(a).css({ opacity: 0, zIndex: b.options.zIndex - 2 }));
		}),
		(b.prototype.filterSlides = b.prototype.slickFilter =
			function (a) {
				var b = this;
				null !== a &&
					((b.$slidesCache = b.$slides),
					b.unload(),
					b.$slideTrack.children(this.options.slide).detach(),
					b.$slidesCache.filter(a).appendTo(b.$slideTrack),
					b.reinit());
			}),
		(b.prototype.getCurrent = b.prototype.slickCurrentSlide =
			function () {
				var a = this;
				return a.currentSlide;
			}),
		(b.prototype.getDotCount = function () {
			var a = this,
				b = 0,
				c = 0,
				d = 0;
			if (a.options.infinite === !0)
				for (; b < a.slideCount; )
					++d,
						(b = c + a.options.slidesToScroll),
						(c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow);
			else if (a.options.centerMode === !0) d = a.slideCount;
			else
				for (; b < a.slideCount; )
					++d,
						(b = c + a.options.slidesToScroll),
						(c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow);
			return d - 1;
		}),
		(b.prototype.getLeft = function (a) {
			var c,
				d,
				f,
				b = this,
				e = 0;
			return (
				(b.slideOffset = 0),
				(d = b.$slides.first().outerHeight(!0)),
				b.options.infinite === !0
					? (b.slideCount > b.options.slidesToShow &&
							((b.slideOffset = b.slideWidth * b.options.slidesToShow * -1), (e = d * b.options.slidesToShow * -1)),
					  b.slideCount % b.options.slidesToScroll !== 0 &&
							a + b.options.slidesToScroll > b.slideCount &&
							b.slideCount > b.options.slidesToShow &&
							(a > b.slideCount
								? ((b.slideOffset = (b.options.slidesToShow - (a - b.slideCount)) * b.slideWidth * -1),
								  (e = (b.options.slidesToShow - (a - b.slideCount)) * d * -1))
								: ((b.slideOffset = (b.slideCount % b.options.slidesToScroll) * b.slideWidth * -1),
								  (e = (b.slideCount % b.options.slidesToScroll) * d * -1))))
					: a + b.options.slidesToShow > b.slideCount &&
					  ((b.slideOffset = (a + b.options.slidesToShow - b.slideCount) * b.slideWidth),
					  (e = (a + b.options.slidesToShow - b.slideCount) * d)),
				b.slideCount <= b.options.slidesToShow && ((b.slideOffset = 0), (e = 0)),
				b.options.centerMode === !0 && b.options.infinite === !0
					? (b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2) - b.slideWidth)
					: b.options.centerMode === !0 && ((b.slideOffset = 0), (b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2))),
				(c = b.options.vertical === !1 ? a * b.slideWidth * -1 + b.slideOffset : a * d * -1 + e),
				b.options.variableWidth === !0 &&
					((f =
						b.slideCount <= b.options.slidesToShow || b.options.infinite === !1
							? b.$slideTrack.children('.slick-slide').eq(a)
							: b.$slideTrack.children('.slick-slide').eq(a + b.options.slidesToShow)),
					(c =
						b.options.rtl === !0
							? f[0]
								? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width())
								: 0
							: f[0]
							? -1 * f[0].offsetLeft
							: 0),
					b.options.centerMode === !0 &&
						((f =
							b.slideCount <= b.options.slidesToShow || b.options.infinite === !1
								? b.$slideTrack.children('.slick-slide').eq(a)
								: b.$slideTrack.children('.slick-slide').eq(a + b.options.slidesToShow + 1)),
						(c =
							b.options.rtl === !0
								? f[0]
									? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width())
									: 0
								: f[0]
								? -1 * f[0].offsetLeft
								: 0),
						(c += (b.$list.width() - f.outerWidth()) / 2))),
				c
			);
		}),
		(b.prototype.getOption = b.prototype.slickGetOption =
			function (a) {
				var b = this;
				return b.options[a];
			}),
		(b.prototype.getNavigableIndexes = function () {
			var e,
				a = this,
				b = 0,
				c = 0,
				d = [];
			for (
				a.options.infinite === !1
					? (e = a.slideCount)
					: ((b = -1 * a.options.slidesToScroll), (c = -1 * a.options.slidesToScroll), (e = 2 * a.slideCount));
				e > b;

			)
				d.push(b),
					(b = c + a.options.slidesToScroll),
					(c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow);
			return d;
		}),
		(b.prototype.getSlick = function () {
			return this;
		}),
		(b.prototype.getSlideCount = function () {
			var c,
				d,
				e,
				b = this;
			return (
				(e = b.options.centerMode === !0 ? b.slideWidth * Math.floor(b.options.slidesToShow / 2) : 0),
				b.options.swipeToSlide === !0
					? (b.$slideTrack.find('.slick-slide').each(function (c, f) {
							return f.offsetLeft - e + a(f).outerWidth() / 2 > -1 * b.swipeLeft ? ((d = f), !1) : void 0;
					  }),
					  (c = Math.abs(a(d).attr('data-slick-index') - b.currentSlide) || 1))
					: b.options.slidesToScroll
			);
		}),
		(b.prototype.goTo = b.prototype.slickGoTo =
			function (a, b) {
				var c = this;
				c.changeSlide({ data: { message: 'index', index: parseInt(a) } }, b);
			}),
		(b.prototype.init = function (b) {
			var c = this;
			a(c.$slider).hasClass('slick-initialized') ||
				(a(c.$slider).addClass('slick-initialized'),
				c.buildRows(),
				c.buildOut(),
				c.setProps(),
				c.startLoad(),
				c.loadSlider(),
				c.initializeEvents(),
				c.updateArrows(),
				c.updateDots()),
				b && c.$slider.trigger('init', [c]),
				c.options.accessibility === !0 && c.initADA();
		}),
		(b.prototype.initArrowEvents = function () {
			var a = this;
			a.options.arrows === !0 &&
				a.slideCount > a.options.slidesToShow &&
				(a.$prevArrow.on('click.slick', { message: 'previous' }, a.changeSlide),
				a.$nextArrow.on('click.slick', { message: 'next' }, a.changeSlide));
		}),
		(b.prototype.initDotEvents = function () {
			var b = this;
			b.options.dots === !0 && b.slideCount > b.options.slidesToShow && a('li', b.$dots).on('click.slick', { message: 'index' }, b.changeSlide),
				b.options.dots === !0 &&
					b.options.pauseOnDotsHover === !0 &&
					b.options.autoplay === !0 &&
					a('li', b.$dots).on('mouseenter.slick', a.proxy(b.setPaused, b, !0)).on('mouseleave.slick', a.proxy(b.setPaused, b, !1));
		}),
		(b.prototype.initializeEvents = function () {
			var b = this;
			b.initArrowEvents(),
				b.initDotEvents(),
				b.$list.on('touchstart.slick mousedown.slick', { action: 'start' }, b.swipeHandler),
				b.$list.on('touchmove.slick mousemove.slick', { action: 'move' }, b.swipeHandler),
				b.$list.on('touchend.slick mouseup.slick', { action: 'end' }, b.swipeHandler),
				b.$list.on('touchcancel.slick mouseleave.slick', { action: 'end' }, b.swipeHandler),
				b.$list.on('click.slick', b.clickHandler),
				a(document).on(b.visibilityChange, a.proxy(b.visibility, b)),
				b.$list.on('mouseenter.slick', a.proxy(b.setPaused, b, !0)),
				b.$list.on('mouseleave.slick', a.proxy(b.setPaused, b, !1)),
				b.options.accessibility === !0 && b.$list.on('keydown.slick', b.keyHandler),
				b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on('click.slick', b.selectHandler),
				a(window).on('orientationchange.slick.slick-' + b.instanceUid, a.proxy(b.orientationChange, b)),
				a(window).on('resize.slick.slick-' + b.instanceUid, a.proxy(b.resize, b)),
				a('[draggable!=true]', b.$slideTrack).on('dragstart', b.preventDefault),
				a(window).on('load.slick.slick-' + b.instanceUid, b.setPosition),
				a(document).on('ready.slick.slick-' + b.instanceUid, b.setPosition);
		}),
		(b.prototype.initUI = function () {
			var a = this;
			a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.show(), a.$nextArrow.show()),
				a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.show(),
				a.options.autoplay === !0 && a.autoPlay();
		}),
		(b.prototype.keyHandler = function (a) {
			var b = this;
			a.target.tagName.match('TEXTAREA|INPUT|SELECT') ||
				(37 === a.keyCode && b.options.accessibility === !0
					? b.changeSlide({ data: { message: 'previous' } })
					: 39 === a.keyCode && b.options.accessibility === !0 && b.changeSlide({ data: { message: 'next' } }));
		}),
		(b.prototype.lazyLoad = function () {
			function g(b) {
				a('img[data-lazy]', b).each(function () {
					var b = a(this),
						c = a(this).attr('data-lazy'),
						d = document.createElement('img');
					(d.onload = function () {
						b.animate({ opacity: 0 }, 100, function () {
							b.attr('src', c).animate({ opacity: 1 }, 200, function () {
								b.removeAttr('data-lazy').removeClass('slick-loading');
							});
						});
					}),
						(d.src = c);
				});
			}
			var c,
				d,
				e,
				f,
				b = this;
			b.options.centerMode === !0
				? b.options.infinite === !0
					? ((e = b.currentSlide + (b.options.slidesToShow / 2 + 1)), (f = e + b.options.slidesToShow + 2))
					: ((e = Math.max(0, b.currentSlide - (b.options.slidesToShow / 2 + 1))),
					  (f = 2 + (b.options.slidesToShow / 2 + 1) + b.currentSlide))
				: ((e = b.options.infinite ? b.options.slidesToShow + b.currentSlide : b.currentSlide),
				  (f = e + b.options.slidesToShow),
				  b.options.fade === !0 && (e > 0 && e--, f <= b.slideCount && f++)),
				(c = b.$slider.find('.slick-slide').slice(e, f)),
				g(c),
				b.slideCount <= b.options.slidesToShow
					? ((d = b.$slider.find('.slick-slide')), g(d))
					: b.currentSlide >= b.slideCount - b.options.slidesToShow
					? ((d = b.$slider.find('.slick-cloned').slice(0, b.options.slidesToShow)), g(d))
					: 0 === b.currentSlide && ((d = b.$slider.find('.slick-cloned').slice(-1 * b.options.slidesToShow)), g(d));
		}),
		(b.prototype.loadSlider = function () {
			var a = this;
			a.setPosition(),
				a.$slideTrack.css({ opacity: 1 }),
				a.$slider.removeClass('slick-loading'),
				a.initUI(),
				'progressive' === a.options.lazyLoad && a.progressiveLazyLoad();
		}),
		(b.prototype.next = b.prototype.slickNext =
			function () {
				var a = this;
				a.changeSlide({ data: { message: 'next' } });
			}),
		(b.prototype.orientationChange = function () {
			var a = this;
			a.checkResponsive(), a.setPosition();
		}),
		(b.prototype.pause = b.prototype.slickPause =
			function () {
				var a = this;
				a.autoPlayClear(), (a.paused = !0);
			}),
		(b.prototype.play = b.prototype.slickPlay =
			function () {
				var a = this;
				(a.paused = !1), a.autoPlay();
			}),
		(b.prototype.postSlide = function (a) {
			var b = this;
			b.$slider.trigger('afterChange', [b, a]),
				(b.animating = !1),
				b.setPosition(),
				(b.swipeLeft = null),
				b.options.autoplay === !0 && b.paused === !1 && b.autoPlay(),
				b.options.accessibility === !0 && b.initADA();
		}),
		(b.prototype.prev = b.prototype.slickPrev =
			function () {
				var a = this;
				a.changeSlide({ data: { message: 'previous' } });
			}),
		(b.prototype.preventDefault = function (a) {
			a.preventDefault();
		}),
		(b.prototype.progressiveLazyLoad = function () {
			var c,
				d,
				b = this;
			(c = a('img[data-lazy]', b.$slider).length),
				c > 0 &&
					((d = a('img[data-lazy]', b.$slider).first()),
					d.attr('src', null),
					d
						.attr('src', d.attr('data-lazy'))
						.removeClass('slick-loading')
						.load(function () {
							d.removeAttr('data-lazy'), b.progressiveLazyLoad(), b.options.adaptiveHeight === !0 && b.setPosition();
						})
						.error(function () {
							d.removeAttr('data-lazy'), b.progressiveLazyLoad();
						}));
		}),
		(b.prototype.refresh = function (b) {
			var d,
				e,
				c = this;
			(e = c.slideCount - c.options.slidesToShow),
				c.options.infinite || (c.slideCount <= c.options.slidesToShow ? (c.currentSlide = 0) : c.currentSlide > e && (c.currentSlide = e)),
				(d = c.currentSlide),
				c.destroy(!0),
				a.extend(c, c.initials, { currentSlide: d }),
				c.init(),
				b || c.changeSlide({ data: { message: 'index', index: d } }, !1);
		}),
		(b.prototype.registerBreakpoints = function () {
			var c,
				d,
				e,
				b = this,
				f = b.options.responsive || null;
			if ('array' === a.type(f) && f.length) {
				b.respondTo = b.options.respondTo || 'window';
				for (c in f)
					if (((e = b.breakpoints.length - 1), (d = f[c].breakpoint), f.hasOwnProperty(c))) {
						for (; e >= 0; ) b.breakpoints[e] && b.breakpoints[e] === d && b.breakpoints.splice(e, 1), e--;
						b.breakpoints.push(d), (b.breakpointSettings[d] = f[c].settings);
					}
				b.breakpoints.sort(function (a, c) {
					return b.options.mobileFirst ? a - c : c - a;
				});
			}
		}),
		(b.prototype.reinit = function () {
			var b = this;
			(b.$slides = b.$slideTrack.children(b.options.slide).addClass('slick-slide')),
				(b.slideCount = b.$slides.length),
				b.currentSlide >= b.slideCount && 0 !== b.currentSlide && (b.currentSlide = b.currentSlide - b.options.slidesToScroll),
				b.slideCount <= b.options.slidesToShow && (b.currentSlide = 0),
				b.registerBreakpoints(),
				b.setProps(),
				b.setupInfinite(),
				b.buildArrows(),
				b.updateArrows(),
				b.initArrowEvents(),
				b.buildDots(),
				b.updateDots(),
				b.initDotEvents(),
				b.checkResponsive(!1, !0),
				b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on('click.slick', b.selectHandler),
				b.setSlideClasses(0),
				b.setPosition(),
				b.$slider.trigger('reInit', [b]),
				b.options.autoplay === !0 && b.focusHandler();
		}),
		(b.prototype.resize = function () {
			var b = this;
			a(window).width() !== b.windowWidth &&
				(clearTimeout(b.windowDelay),
				(b.windowDelay = window.setTimeout(function () {
					(b.windowWidth = a(window).width()), b.checkResponsive(), b.unslicked || b.setPosition();
				}, 50)));
		}),
		(b.prototype.removeSlide = b.prototype.slickRemove =
			function (a, b, c) {
				var d = this;
				return (
					'boolean' == typeof a ? ((b = a), (a = b === !0 ? 0 : d.slideCount - 1)) : (a = b === !0 ? --a : a),
					d.slideCount < 1 || 0 > a || a > d.slideCount - 1
						? !1
						: (d.unload(),
						  c === !0 ? d.$slideTrack.children().remove() : d.$slideTrack.children(this.options.slide).eq(a).remove(),
						  (d.$slides = d.$slideTrack.children(this.options.slide)),
						  d.$slideTrack.children(this.options.slide).detach(),
						  d.$slideTrack.append(d.$slides),
						  (d.$slidesCache = d.$slides),
						  void d.reinit())
				);
			}),
		(b.prototype.setCSS = function (a) {
			var d,
				e,
				b = this,
				c = {};
			b.options.rtl === !0 && (a = -a),
				(d = 'left' == b.positionProp ? Math.ceil(a) + 'px' : '0px'),
				(e = 'top' == b.positionProp ? Math.ceil(a) + 'px' : '0px'),
				(c[b.positionProp] = a),
				b.transformsEnabled === !1
					? b.$slideTrack.css(c)
					: ((c = {}),
					  b.cssTransitions === !1
							? ((c[b.animType] = 'translate(' + d + ', ' + e + ')'), b.$slideTrack.css(c))
							: ((c[b.animType] = 'translate3d(' + d + ', ' + e + ', 0px)'), b.$slideTrack.css(c)));
		}),
		(b.prototype.setDimensions = function () {
			var a = this;
			a.options.vertical === !1
				? a.options.centerMode === !0 && a.$list.css({ padding: '0px ' + a.options.centerPadding })
				: (a.$list.height(a.$slides.first().outerHeight(!0) * a.options.slidesToShow),
				  a.options.centerMode === !0 && a.$list.css({ padding: a.options.centerPadding + ' 0px' })),
				(a.listWidth = a.$list.width()),
				(a.listHeight = a.$list.height()),
				a.options.vertical === !1 && a.options.variableWidth === !1
					? ((a.slideWidth = Math.ceil(a.listWidth / a.options.slidesToShow)),
					  a.$slideTrack.width(Math.ceil(a.slideWidth * a.$slideTrack.children('.slick-slide').length)))
					: a.options.variableWidth === !0
					? a.$slideTrack.width(5e3 * a.slideCount)
					: ((a.slideWidth = Math.ceil(a.listWidth)),
					  a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0) * a.$slideTrack.children('.slick-slide').length)));
			var b = a.$slides.first().outerWidth(!0) - a.$slides.first().width();
			a.options.variableWidth === !1 && a.$slideTrack.children('.slick-slide').width(a.slideWidth - b);
		}),
		(b.prototype.setFade = function () {
			var c,
				b = this;
			b.$slides.each(function (d, e) {
				(c = b.slideWidth * d * -1),
					b.options.rtl === !0
						? a(e).css({ position: 'relative', right: c, top: 0, zIndex: b.options.zIndex - 2, opacity: 0 })
						: a(e).css({ position: 'relative', left: c, top: 0, zIndex: b.options.zIndex - 2, opacity: 0 });
			}),
				b.$slides.eq(b.currentSlide).css({ zIndex: b.options.zIndex - 1, opacity: 1 });
		}),
		(b.prototype.setHeight = function () {
			var a = this;
			if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
				var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
				a.$list.css('height', b);
			}
		}),
		(b.prototype.setOption = b.prototype.slickSetOption =
			function (b, c, d) {
				var f,
					g,
					e = this;
				if ('responsive' === b && 'array' === a.type(c))
					for (g in c)
						if ('array' !== a.type(e.options.responsive)) e.options.responsive = [c[g]];
						else {
							for (f = e.options.responsive.length - 1; f >= 0; )
								e.options.responsive[f].breakpoint === c[g].breakpoint && e.options.responsive.splice(f, 1), f--;
							e.options.responsive.push(c[g]);
						}
				else e.options[b] = c;
				d === !0 && (e.unload(), e.reinit());
			}),
		(b.prototype.setPosition = function () {
			var a = this;
			a.setDimensions(),
				a.setHeight(),
				a.options.fade === !1 ? a.setCSS(a.getLeft(a.currentSlide)) : a.setFade(),
				a.$slider.trigger('setPosition', [a]);
		}),
		(b.prototype.setProps = function () {
			var a = this,
				b = document.body.style;
			(a.positionProp = a.options.vertical === !0 ? 'top' : 'left'),
				'top' === a.positionProp ? a.$slider.addClass('slick-vertical') : a.$slider.removeClass('slick-vertical'),
				(void 0 !== b.WebkitTransition || void 0 !== b.MozTransition || void 0 !== b.msTransition) &&
					a.options.useCSS === !0 &&
					(a.cssTransitions = !0),
				a.options.fade &&
					('number' == typeof a.options.zIndex ? a.options.zIndex < 3 && (a.options.zIndex = 3) : (a.options.zIndex = a.defaults.zIndex)),
				void 0 !== b.OTransform &&
					((a.animType = 'OTransform'),
					(a.transformType = '-o-transform'),
					(a.transitionType = 'OTransition'),
					void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)),
				void 0 !== b.MozTransform &&
					((a.animType = 'MozTransform'),
					(a.transformType = '-moz-transform'),
					(a.transitionType = 'MozTransition'),
					void 0 === b.perspectiveProperty && void 0 === b.MozPerspective && (a.animType = !1)),
				void 0 !== b.webkitTransform &&
					((a.animType = 'webkitTransform'),
					(a.transformType = '-webkit-transform'),
					(a.transitionType = 'webkitTransition'),
					void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)),
				void 0 !== b.msTransform &&
					((a.animType = 'msTransform'),
					(a.transformType = '-ms-transform'),
					(a.transitionType = 'msTransition'),
					void 0 === b.msTransform && (a.animType = !1)),
				void 0 !== b.transform &&
					a.animType !== !1 &&
					((a.animType = 'transform'), (a.transformType = 'transform'), (a.transitionType = 'transition')),
				(a.transformsEnabled = a.options.useTransform && null !== a.animType && a.animType !== !1);
		}),
		(b.prototype.setSlideClasses = function (a) {
			var c,
				d,
				e,
				f,
				b = this;
			(d = b.$slider.find('.slick-slide').removeClass('slick-active slick-center slick-current').attr('aria-hidden', 'true')),
				b.$slides.eq(a).addClass('slick-current'),
				b.options.centerMode === !0
					? ((c = Math.floor(b.options.slidesToShow / 2)),
					  b.options.infinite === !0 &&
							(a >= c && a <= b.slideCount - 1 - c
								? b.$slides
										.slice(a - c, a + c + 1)
										.addClass('slick-active')
										.attr('aria-hidden', 'false')
								: ((e = b.options.slidesToShow + a),
								  d
										.slice(e - c + 1, e + c + 2)
										.addClass('slick-active')
										.attr('aria-hidden', 'false')),
							0 === a
								? d.eq(d.length - 1 - b.options.slidesToShow).addClass('slick-center')
								: a === b.slideCount - 1 && d.eq(b.options.slidesToShow).addClass('slick-center')),
					  b.$slides.eq(a).addClass('slick-center'))
					: a >= 0 && a <= b.slideCount - b.options.slidesToShow
					? b.$slides
							.slice(a, a + b.options.slidesToShow)
							.addClass('slick-active')
							.attr('aria-hidden', 'false')
					: d.length <= b.options.slidesToShow
					? d.addClass('slick-active').attr('aria-hidden', 'false')
					: ((f = b.slideCount % b.options.slidesToShow),
					  (e = b.options.infinite === !0 ? b.options.slidesToShow + a : a),
					  b.options.slidesToShow == b.options.slidesToScroll && b.slideCount - a < b.options.slidesToShow
							? d
									.slice(e - (b.options.slidesToShow - f), e + f)
									.addClass('slick-active')
									.attr('aria-hidden', 'false')
							: d
									.slice(e, e + b.options.slidesToShow)
									.addClass('slick-active')
									.attr('aria-hidden', 'false')),
				'ondemand' === b.options.lazyLoad && b.lazyLoad();
		}),
		(b.prototype.setupInfinite = function () {
			var c,
				d,
				e,
				b = this;
			if (
				(b.options.fade === !0 && (b.options.centerMode = !1),
				b.options.infinite === !0 && b.options.fade === !1 && ((d = null), b.slideCount > b.options.slidesToShow))
			) {
				for (
					e = b.options.centerMode === !0 ? b.options.slidesToShow + 1 : b.options.slidesToShow, c = b.slideCount;
					c > b.slideCount - e;
					c -= 1
				)
					(d = c - 1),
						a(b.$slides[d])
							.clone(!0)
							.attr('id', '')
							.attr('data-slick-index', d - b.slideCount)
							.prependTo(b.$slideTrack)
							.addClass('slick-cloned');
				for (c = 0; e > c; c += 1)
					(d = c),
						a(b.$slides[d])
							.clone(!0)
							.attr('id', '')
							.attr('data-slick-index', d + b.slideCount)
							.appendTo(b.$slideTrack)
							.addClass('slick-cloned');
				b.$slideTrack
					.find('.slick-cloned')
					.find('[id]')
					.each(function () {
						a(this).attr('id', '');
					});
			}
		}),
		(b.prototype.setPaused = function (a) {
			var b = this;
			b.options.autoplay === !0 && b.options.pauseOnHover === !0 && ((b.paused = a), a ? b.autoPlayClear() : b.autoPlay());
		}),
		(b.prototype.selectHandler = function (b) {
			var c = this,
				d = a(b.target).is('.slick-slide') ? a(b.target) : a(b.target).parents('.slick-slide'),
				e = parseInt(d.attr('data-slick-index'));
			return e || (e = 0), c.slideCount <= c.options.slidesToShow ? (c.setSlideClasses(e), void c.asNavFor(e)) : void c.slideHandler(e);
		}),
		(b.prototype.slideHandler = function (a, b, c) {
			var d,
				e,
				f,
				g,
				h = null,
				i = this;
			return (
				(b = b || !1),
				(i.animating === !0 && i.options.waitForAnimate === !0) ||
				(i.options.fade === !0 && i.currentSlide === a) ||
				i.slideCount <= i.options.slidesToShow
					? void 0
					: (b === !1 && i.asNavFor(a),
					  (d = a),
					  (h = i.getLeft(d)),
					  (g = i.getLeft(i.currentSlide)),
					  (i.currentLeft = null === i.swipeLeft ? g : i.swipeLeft),
					  i.options.infinite === !1 && i.options.centerMode === !1 && (0 > a || a > i.getDotCount() * i.options.slidesToScroll)
							? void (
									i.options.fade === !1 &&
									((d = i.currentSlide),
									c !== !0
										? i.animateSlide(g, function () {
												i.postSlide(d);
										  })
										: i.postSlide(d))
							  )
							: i.options.infinite === !1 && i.options.centerMode === !0 && (0 > a || a > i.slideCount - i.options.slidesToScroll)
							? void (
									i.options.fade === !1 &&
									((d = i.currentSlide),
									c !== !0
										? i.animateSlide(g, function () {
												i.postSlide(d);
										  })
										: i.postSlide(d))
							  )
							: (i.options.autoplay === !0 && clearInterval(i.autoPlayTimer),
							  (e =
									0 > d
										? i.slideCount % i.options.slidesToScroll !== 0
											? i.slideCount - (i.slideCount % i.options.slidesToScroll)
											: i.slideCount + d
										: d >= i.slideCount
										? i.slideCount % i.options.slidesToScroll !== 0
											? 0
											: d - i.slideCount
										: d),
							  (i.animating = !0),
							  i.$slider.trigger('beforeChange', [i, i.currentSlide, e]),
							  (f = i.currentSlide),
							  (i.currentSlide = e),
							  i.setSlideClasses(i.currentSlide),
							  i.updateDots(),
							  i.updateArrows(),
							  i.options.fade === !0
									? (c !== !0
											? (i.fadeSlideOut(f),
											  i.fadeSlide(e, function () {
													i.postSlide(e);
											  }))
											: i.postSlide(e),
									  void i.animateHeight())
									: void (c !== !0
											? i.animateSlide(h, function () {
													i.postSlide(e);
											  })
											: i.postSlide(e))))
			);
		}),
		(b.prototype.startLoad = function () {
			var a = this;
			a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.hide(), a.$nextArrow.hide()),
				a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.hide(),
				a.$slider.addClass('slick-loading');
		}),
		(b.prototype.swipeDirection = function () {
			var a,
				b,
				c,
				d,
				e = this;
			return (
				(a = e.touchObject.startX - e.touchObject.curX),
				(b = e.touchObject.startY - e.touchObject.curY),
				(c = Math.atan2(b, a)),
				(d = Math.round((180 * c) / Math.PI)),
				0 > d && (d = 360 - Math.abs(d)),
				45 >= d && d >= 0
					? e.options.rtl === !1
						? 'left'
						: 'right'
					: 360 >= d && d >= 315
					? e.options.rtl === !1
						? 'left'
						: 'right'
					: d >= 135 && 225 >= d
					? e.options.rtl === !1
						? 'right'
						: 'left'
					: e.options.verticalSwiping === !0
					? d >= 35 && 135 >= d
						? 'left'
						: 'right'
					: 'vertical'
			);
		}),
		(b.prototype.swipeEnd = function (a) {
			var c,
				b = this;
			if (((b.dragging = !1), (b.shouldClick = b.touchObject.swipeLength > 10 ? !1 : !0), void 0 === b.touchObject.curX)) return !1;
			if (
				(b.touchObject.edgeHit === !0 && b.$slider.trigger('edge', [b, b.swipeDirection()]),
				b.touchObject.swipeLength >= b.touchObject.minSwipe)
			)
				switch (b.swipeDirection()) {
					case 'left':
						(c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide + b.getSlideCount()) : b.currentSlide + b.getSlideCount()),
							b.slideHandler(c),
							(b.currentDirection = 0),
							(b.touchObject = {}),
							b.$slider.trigger('swipe', [b, 'left']);
						break;
					case 'right':
						(c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide - b.getSlideCount()) : b.currentSlide - b.getSlideCount()),
							b.slideHandler(c),
							(b.currentDirection = 1),
							(b.touchObject = {}),
							b.$slider.trigger('swipe', [b, 'right']);
				}
			else b.touchObject.startX !== b.touchObject.curX && (b.slideHandler(b.currentSlide), (b.touchObject = {}));
		}),
		(b.prototype.swipeHandler = function (a) {
			var b = this;
			if (
				!(
					b.options.swipe === !1 ||
					('ontouchend' in document && b.options.swipe === !1) ||
					(b.options.draggable === !1 && -1 !== a.type.indexOf('mouse'))
				)
			)
				switch (
					((b.touchObject.fingerCount = a.originalEvent && void 0 !== a.originalEvent.touches ? a.originalEvent.touches.length : 1),
					(b.touchObject.minSwipe = b.listWidth / b.options.touchThreshold),
					b.options.verticalSwiping === !0 && (b.touchObject.minSwipe = b.listHeight / b.options.touchThreshold),
					a.data.action)
				) {
					case 'start':
						b.swipeStart(a);
						break;
					case 'move':
						b.swipeMove(a);
						break;
					case 'end':
						b.swipeEnd(a);
				}
		}),
		(b.prototype.swipeMove = function (a) {
			var d,
				e,
				f,
				g,
				h,
				b = this;
			return (
				(h = void 0 !== a.originalEvent ? a.originalEvent.touches : null),
				!b.dragging || (h && 1 !== h.length)
					? !1
					: ((d = b.getLeft(b.currentSlide)),
					  (b.touchObject.curX = void 0 !== h ? h[0].pageX : a.clientX),
					  (b.touchObject.curY = void 0 !== h ? h[0].pageY : a.clientY),
					  (b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curX - b.touchObject.startX, 2)))),
					  b.options.verticalSwiping === !0 &&
							(b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curY - b.touchObject.startY, 2)))),
					  (e = b.swipeDirection()),
					  'vertical' !== e
							? (void 0 !== a.originalEvent && b.touchObject.swipeLength > 4 && a.preventDefault(),
							  (g = (b.options.rtl === !1 ? 1 : -1) * (b.touchObject.curX > b.touchObject.startX ? 1 : -1)),
							  b.options.verticalSwiping === !0 && (g = b.touchObject.curY > b.touchObject.startY ? 1 : -1),
							  (f = b.touchObject.swipeLength),
							  (b.touchObject.edgeHit = !1),
							  b.options.infinite === !1 &&
									((0 === b.currentSlide && 'right' === e) || (b.currentSlide >= b.getDotCount() && 'left' === e)) &&
									((f = b.touchObject.swipeLength * b.options.edgeFriction), (b.touchObject.edgeHit = !0)),
							  b.options.vertical === !1 ? (b.swipeLeft = d + f * g) : (b.swipeLeft = d + f * (b.$list.height() / b.listWidth) * g),
							  b.options.verticalSwiping === !0 && (b.swipeLeft = d + f * g),
							  b.options.fade === !0 || b.options.touchMove === !1
									? !1
									: b.animating === !0
									? ((b.swipeLeft = null), !1)
									: void b.setCSS(b.swipeLeft))
							: void 0)
			);
		}),
		(b.prototype.swipeStart = function (a) {
			var c,
				b = this;
			return 1 !== b.touchObject.fingerCount || b.slideCount <= b.options.slidesToShow
				? ((b.touchObject = {}), !1)
				: (void 0 !== a.originalEvent && void 0 !== a.originalEvent.touches && (c = a.originalEvent.touches[0]),
				  (b.touchObject.startX = b.touchObject.curX = void 0 !== c ? c.pageX : a.clientX),
				  (b.touchObject.startY = b.touchObject.curY = void 0 !== c ? c.pageY : a.clientY),
				  void (b.dragging = !0));
		}),
		(b.prototype.unfilterSlides = b.prototype.slickUnfilter =
			function () {
				var a = this;
				null !== a.$slidesCache &&
					(a.unload(), a.$slideTrack.children(this.options.slide).detach(), a.$slidesCache.appendTo(a.$slideTrack), a.reinit());
			}),
		(b.prototype.unload = function () {
			var b = this;
			a('.slick-cloned', b.$slider).remove(),
				b.$dots && b.$dots.remove(),
				b.$prevArrow && b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.remove(),
				b.$nextArrow && b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.remove(),
				b.$slides.removeClass('slick-slide slick-active slick-visible slick-current').attr('aria-hidden', 'true').css('width', '');
		}),
		(b.prototype.unslick = function (a) {
			var b = this;
			b.$slider.trigger('unslick', [b, a]), b.destroy();
		}),
		(b.prototype.updateArrows = function () {
			var b,
				a = this;
			(b = Math.floor(a.options.slidesToShow / 2)),
				a.options.arrows === !0 &&
					a.slideCount > a.options.slidesToShow &&
					!a.options.infinite &&
					(a.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false'),
					a.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false'),
					0 === a.currentSlide
						? (a.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true'),
						  a.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false'))
						: a.currentSlide >= a.slideCount - a.options.slidesToShow && a.options.centerMode === !1
						? (a.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true'),
						  a.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false'))
						: a.currentSlide >= a.slideCount - 1 &&
						  a.options.centerMode === !0 &&
						  (a.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true'),
						  a.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false')));
		}),
		(b.prototype.updateDots = function () {
			var a = this;
			null !== a.$dots &&
				(a.$dots.find('li').removeClass('slick-active').attr('aria-hidden', 'true'),
				a.$dots
					.find('li')
					.eq(Math.floor(a.currentSlide / a.options.slidesToScroll))
					.addClass('slick-active')
					.attr('aria-hidden', 'false'));
		}),
		(b.prototype.visibility = function () {
			var a = this;
			document[a.hidden] ? ((a.paused = !0), a.autoPlayClear()) : a.options.autoplay === !0 && ((a.paused = !1), a.autoPlay());
		}),
		(b.prototype.initADA = function () {
			var b = this;
			b.$slides
				.add(b.$slideTrack.find('.slick-cloned'))
				.attr({ 'aria-hidden': 'true', tabindex: '-1' })
				.find('a, input, button, select')
				.attr({ tabindex: '-1' }),
				b.$slideTrack.attr('role', 'listbox'),
				b.$slides.not(b.$slideTrack.find('.slick-cloned')).each(function (c) {
					a(this).attr({ role: 'option', 'aria-describedby': 'slick-slide' + b.instanceUid + c });
				}),
				null !== b.$dots &&
					b.$dots
						.attr('role', 'tablist')
						.find('li')
						.each(function (c) {
							a(this).attr({
								role: 'presentation',
								'aria-selected': 'false',
								'aria-controls': 'navigation' + b.instanceUid + c,
								id: 'slick-slide' + b.instanceUid + c,
							});
						})
						.first()
						.attr('aria-selected', 'true')
						.end()
						.find('button')
						.attr('role', 'button')
						.end()
						.closest('div')
						.attr('role', 'toolbar'),
				b.activateADA();
		}),
		(b.prototype.activateADA = function () {
			var a = this;
			a.$slideTrack.find('.slick-active').attr({ 'aria-hidden': 'false' }).find('a, input, button, select').attr({ tabindex: '0' });
		}),
		(b.prototype.focusHandler = function () {
			var b = this;
			b.$slider.on('focus.slick blur.slick', '*', function (c) {
				c.stopImmediatePropagation();
				var d = a(this);
				setTimeout(function () {
					b.isPlay && (d.is(':focus') ? (b.autoPlayClear(), (b.paused = !0)) : ((b.paused = !1), b.autoPlay()));
				}, 0);
			});
		}),
		(a.fn.slick = function () {
			var f,
				g,
				a = this,
				c = arguments[0],
				d = Array.prototype.slice.call(arguments, 1),
				e = a.length;
			for (f = 0; e > f; f++)
				if (
					('object' == typeof c || 'undefined' == typeof c ? (a[f].slick = new b(a[f], c)) : (g = a[f].slick[c].apply(a[f].slick, d)),
					'undefined' != typeof g)
				)
					return g;
			return a;
		});
});

/*
	Light Box

*/

/*! fancyBox v2.1.5 fancyapps.com | fancyapps.com/fancybox/#license */
(function (r, G, f, v) {
	var J = f('html'),
		n = f(r),
		p = f(G),
		b = (f.fancybox = function () {
			b.open.apply(this, arguments);
		}),
		I = navigator.userAgent.match(/msie/i),
		B = null,
		s = G.createTouch !== v,
		t = function (a) {
			return a && a.hasOwnProperty && a instanceof f;
		},
		q = function (a) {
			return a && 'string' === f.type(a);
		},
		E = function (a) {
			return q(a) && 0 < a.indexOf('%');
		},
		l = function (a, d) {
			var e = parseInt(a, 10) || 0;
			d && E(a) && (e *= b.getViewport()[d] / 100);
			return Math.ceil(e);
		},
		w = function (a, b) {
			return l(a, b) + 'px';
		};
	f.extend(b, {
		version: '2.1.5',
		defaults: {
			padding: 15,
			margin: 20,
			width: 800,
			height: 600,
			minWidth: 100,
			minHeight: 100,
			maxWidth: 9999,
			maxHeight: 9999,
			pixelRatio: 1,
			autoSize: !0,
			autoHeight: !1,
			autoWidth: !1,
			autoResize: !0,
			autoCenter: !s,
			fitToView: !0,
			aspectRatio: !1,
			topRatio: 0.5,
			leftRatio: 0.5,
			scrolling: 'auto',
			wrapCSS: '',
			arrows: !0,
			closeBtn: !0,
			closeClick: !1,
			nextClick: !1,
			mouseWheel: !0,
			autoPlay: !1,
			playSpeed: 3e3,
			preload: 3,
			modal: !1,
			loop: !0,
			ajax: { dataType: 'html', headers: { 'X-fancyBox': !0 } },
			iframe: { scrolling: 'auto', preload: !0 },
			swf: { wmode: 'transparent', allowfullscreen: 'true', allowscriptaccess: 'always' },
			keys: {
				next: { 13: 'left', 34: 'up', 39: 'left', 40: 'up' },
				prev: { 8: 'right', 33: 'down', 37: 'right', 38: 'down' },
				close: [27],
				play: [32],
				toggle: [70],
			},
			direction: { next: 'left', prev: 'right' },
			scrollOutside: !0,
			index: 0,
			type: null,
			href: null,
			content: null,
			title: null,
			tpl: {
				wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
				image: '<img class="fancybox-image" src="{href}" alt="" />',
				iframe:
					'<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' +
					(I ? ' allowtransparency="true"' : '') +
					'></iframe>',
				error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
				closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
				next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
				prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>',
			},
			openEffect: 'fade',
			openSpeed: 250,
			openEasing: 'swing',
			openOpacity: !0,
			openMethod: 'zoomIn',
			closeEffect: 'fade',
			closeSpeed: 250,
			closeEasing: 'swing',
			closeOpacity: !0,
			closeMethod: 'zoomOut',
			nextEffect: 'elastic',
			nextSpeed: 250,
			nextEasing: 'swing',
			nextMethod: 'changeIn',
			prevEffect: 'elastic',
			prevSpeed: 250,
			prevEasing: 'swing',
			prevMethod: 'changeOut',
			helpers: { overlay: !0, title: !0 },
			onCancel: f.noop,
			beforeLoad: f.noop,
			afterLoad: f.noop,
			beforeShow: f.noop,
			afterShow: f.noop,
			beforeChange: f.noop,
			beforeClose: f.noop,
			afterClose: f.noop,
		},
		group: {},
		opts: {},
		previous: null,
		coming: null,
		current: null,
		isActive: !1,
		isOpen: !1,
		isOpened: !1,
		wrap: null,
		skin: null,
		outer: null,
		inner: null,
		player: { timer: null, isActive: !1 },
		ajaxLoad: null,
		imgPreload: null,
		transitions: {},
		helpers: {},
		open: function (a, d) {
			if (a && (f.isPlainObject(d) || (d = {}), !1 !== b.close(!0)))
				return (
					f.isArray(a) || (a = t(a) ? f(a).get() : [a]),
					f.each(a, function (e, c) {
						var k = {},
							g,
							h,
							j,
							m,
							l;
						'object' === f.type(c) &&
							(c.nodeType && (c = f(c)),
							t(c)
								? ((k = {
										href: c.data('fancybox-href') || c.attr('href'),
										title: c.data('fancybox-title') || c.attr('title'),
										isDom: !0,
										element: c,
								  }),
								  f.metadata && f.extend(!0, k, c.metadata()))
								: (k = c));
						g = d.href || k.href || (q(c) ? c : null);
						h = d.title !== v ? d.title : k.title || '';
						m = (j = d.content || k.content) ? 'html' : d.type || k.type;
						!m && k.isDom && ((m = c.data('fancybox-type')), m || (m = (m = c.prop('class').match(/fancybox\.(\w+)/)) ? m[1] : null));
						q(g) &&
							(m ||
								(b.isImage(g)
									? (m = 'image')
									: b.isSWF(g)
									? (m = 'swf')
									: '#' === g.charAt(0)
									? (m = 'inline')
									: q(c) && ((m = 'html'), (j = c))),
							'ajax' === m && ((l = g.split(/\s+/, 2)), (g = l.shift()), (l = l.shift())));
						j ||
							('inline' === m
								? g
									? (j = f(q(g) ? g.replace(/.*(?=#[^\s]+$)/, '') : g))
									: k.isDom && (j = c)
								: 'html' === m
								? (j = g)
								: !m && !g && k.isDom && ((m = 'inline'), (j = c)));
						f.extend(k, { href: g, type: m, content: j, title: h, selector: l });
						a[e] = k;
					}),
					(b.opts = f.extend(!0, {}, b.defaults, d)),
					d.keys !== v && (b.opts.keys = d.keys ? f.extend({}, b.defaults.keys, d.keys) : !1),
					(b.group = a),
					b._start(b.opts.index)
				);
		},
		cancel: function () {
			var a = b.coming;
			a &&
				!1 !== b.trigger('onCancel') &&
				(b.hideLoading(),
				b.ajaxLoad && b.ajaxLoad.abort(),
				(b.ajaxLoad = null),
				b.imgPreload && (b.imgPreload.onload = b.imgPreload.onerror = null),
				a.wrap && a.wrap.stop(!0, !0).trigger('onReset').remove(),
				(b.coming = null),
				b.current || b._afterZoomOut(a));
		},
		close: function (a) {
			b.cancel();
			!1 !== b.trigger('beforeClose') &&
				(b.unbindEvents(),
				b.isActive &&
					(!b.isOpen || !0 === a
						? (f('.fancybox-wrap').stop(!0).trigger('onReset').remove(), b._afterZoomOut())
						: ((b.isOpen = b.isOpened = !1),
						  (b.isClosing = !0),
						  f('.fancybox-item, .fancybox-nav').remove(),
						  b.wrap.stop(!0, !0).removeClass('fancybox-opened'),
						  b.transitions[b.current.closeMethod]())));
		},
		play: function (a) {
			var d = function () {
					clearTimeout(b.player.timer);
				},
				e = function () {
					d();
					b.current && b.player.isActive && (b.player.timer = setTimeout(b.next, b.current.playSpeed));
				},
				c = function () {
					d();
					p.unbind('.player');
					b.player.isActive = !1;
					b.trigger('onPlayEnd');
				};
			if (!0 === a || (!b.player.isActive && !1 !== a)) {
				if (b.current && (b.current.loop || b.current.index < b.group.length - 1))
					(b.player.isActive = !0),
						p.bind({ 'onCancel.player beforeClose.player': c, 'onUpdate.player': e, 'beforeLoad.player': d }),
						e(),
						b.trigger('onPlayStart');
			} else c();
		},
		next: function (a) {
			var d = b.current;
			d && (q(a) || (a = d.direction.next), b.jumpto(d.index + 1, a, 'next'));
		},
		prev: function (a) {
			var d = b.current;
			d && (q(a) || (a = d.direction.prev), b.jumpto(d.index - 1, a, 'prev'));
		},
		jumpto: function (a, d, e) {
			var c = b.current;
			c &&
				((a = l(a)),
				(b.direction = d || c.direction[a >= c.index ? 'next' : 'prev']),
				(b.router = e || 'jumpto'),
				c.loop && (0 > a && (a = c.group.length + (a % c.group.length)), (a %= c.group.length)),
				c.group[a] !== v && (b.cancel(), b._start(a)));
		},
		reposition: function (a, d) {
			var e = b.current,
				c = e ? e.wrap : null,
				k;
			c &&
				((k = b._getPosition(d)),
				a && 'scroll' === a.type ? (delete k.position, c.stop(!0, !0).animate(k, 200)) : (c.css(k), (e.pos = f.extend({}, e.dim, k))));
		},
		update: function (a) {
			var d = a && a.type,
				e = !d || 'orientationchange' === d;
			e && (clearTimeout(B), (B = null));
			b.isOpen &&
				!B &&
				(B = setTimeout(
					function () {
						var c = b.current;
						c &&
							!b.isClosing &&
							(b.wrap.removeClass('fancybox-tmp'),
							(e || 'load' === d || ('resize' === d && c.autoResize)) && b._setDimension(),
							('scroll' === d && c.canShrink) || b.reposition(a),
							b.trigger('onUpdate'),
							(B = null));
					},
					e && !s ? 0 : 300
				));
		},
		toggle: function (a) {
			b.isOpen &&
				((b.current.fitToView = 'boolean' === f.type(a) ? a : !b.current.fitToView),
				s && (b.wrap.removeAttr('style').addClass('fancybox-tmp'), b.trigger('onUpdate')),
				b.update());
		},
		hideLoading: function () {
			p.unbind('.loading');
			f('#fancybox-loading').remove();
		},
		showLoading: function () {
			var a, d;
			b.hideLoading();
			a = f('<div id="fancybox-loading"><div></div></div>').click(b.cancel).appendTo('body');
			p.bind('keydown.loading', function (a) {
				if (27 === (a.which || a.keyCode)) a.preventDefault(), b.cancel();
			});
			b.defaults.fixed || ((d = b.getViewport()), a.css({ position: 'absolute', top: 0.5 * d.h + d.y, left: 0.5 * d.w + d.x }));
		},
		getViewport: function () {
			var a = (b.current && b.current.locked) || !1,
				d = { x: n.scrollLeft(), y: n.scrollTop() };
			a
				? ((d.w = a[0].clientWidth), (d.h = a[0].clientHeight))
				: ((d.w = s && r.innerWidth ? r.innerWidth : n.width()), (d.h = s && r.innerHeight ? r.innerHeight : n.height()));
			return d;
		},
		unbindEvents: function () {
			b.wrap && t(b.wrap) && b.wrap.unbind('.fb');
			p.unbind('.fb');
			n.unbind('.fb');
		},
		bindEvents: function () {
			var a = b.current,
				d;
			a &&
				(n.bind('orientationchange.fb' + (s ? '' : ' resize.fb') + (a.autoCenter && !a.locked ? ' scroll.fb' : ''), b.update),
				(d = a.keys) &&
					p.bind('keydown.fb', function (e) {
						var c = e.which || e.keyCode,
							k = e.target || e.srcElement;
						if (27 === c && b.coming) return !1;
						!e.ctrlKey &&
							!e.altKey &&
							!e.shiftKey &&
							!e.metaKey &&
							(!k || (!k.type && !f(k).is('[contenteditable]'))) &&
							f.each(d, function (d, k) {
								if (1 < a.group.length && k[c] !== v) return b[d](k[c]), e.preventDefault(), !1;
								if (-1 < f.inArray(c, k)) return b[d](), e.preventDefault(), !1;
							});
					}),
				f.fn.mousewheel &&
					a.mouseWheel &&
					b.wrap.bind('mousewheel.fb', function (d, c, k, g) {
						for (var h = f(d.target || null), j = !1; h.length && !j && !h.is('.fancybox-skin') && !h.is('.fancybox-wrap'); )
							(j =
								h[0] &&
								!(h[0].style.overflow && 'hidden' === h[0].style.overflow) &&
								((h[0].clientWidth && h[0].scrollWidth > h[0].clientWidth) ||
									(h[0].clientHeight && h[0].scrollHeight > h[0].clientHeight))),
								(h = f(h).parent());
						if (0 !== c && !j && 1 < b.group.length && !a.canShrink) {
							if (0 < g || 0 < k) b.prev(0 < g ? 'down' : 'left');
							else if (0 > g || 0 > k) b.next(0 > g ? 'up' : 'right');
							d.preventDefault();
						}
					}));
		},
		trigger: function (a, d) {
			var e,
				c = d || b.coming || b.current;
			if (c) {
				f.isFunction(c[a]) && (e = c[a].apply(c, Array.prototype.slice.call(arguments, 1)));
				if (!1 === e) return !1;
				c.helpers &&
					f.each(c.helpers, function (d, e) {
						if (e && b.helpers[d] && f.isFunction(b.helpers[d][a])) b.helpers[d][a](f.extend(!0, {}, b.helpers[d].defaults, e), c);
					});
				p.trigger(a);
			}
		},
		isImage: function (a) {
			return q(a) && a.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i);
		},
		isSWF: function (a) {
			return q(a) && a.match(/\.(swf)((\?|#).*)?$/i);
		},
		_start: function (a) {
			var d = {},
				e,
				c;
			a = l(a);
			e = b.group[a] || null;
			if (!e) return !1;
			d = f.extend(!0, {}, b.opts, e);
			e = d.margin;
			c = d.padding;
			'number' === f.type(e) && (d.margin = [e, e, e, e]);
			'number' === f.type(c) && (d.padding = [c, c, c, c]);
			d.modal &&
				f.extend(!0, d, {
					closeBtn: !1,
					closeClick: !1,
					nextClick: !1,
					arrows: !1,
					mouseWheel: !1,
					keys: null,
					helpers: { overlay: { closeClick: !1 } },
				});
			d.autoSize && (d.autoWidth = d.autoHeight = !0);
			'auto' === d.width && (d.autoWidth = !0);
			'auto' === d.height && (d.autoHeight = !0);
			d.group = b.group;
			d.index = a;
			b.coming = d;
			if (!1 === b.trigger('beforeLoad')) b.coming = null;
			else {
				c = d.type;
				e = d.href;
				if (!c)
					return (b.coming = null), b.current && b.router && 'jumpto' !== b.router ? ((b.current.index = a), b[b.router](b.direction)) : !1;
				b.isActive = !0;
				if ('image' === c || 'swf' === c) (d.autoHeight = d.autoWidth = !1), (d.scrolling = 'visible');
				'image' === c && (d.aspectRatio = !0);
				'iframe' === c && s && (d.scrolling = 'scroll');
				d.wrap = f(d.tpl.wrap)
					.addClass('fancybox-' + (s ? 'mobile' : 'desktop') + ' fancybox-type-' + c + ' fancybox-tmp ' + d.wrapCSS)
					.appendTo(d.parent || 'body');
				f.extend(d, { skin: f('.fancybox-skin', d.wrap), outer: f('.fancybox-outer', d.wrap), inner: f('.fancybox-inner', d.wrap) });
				f.each(['Top', 'Right', 'Bottom', 'Left'], function (a, b) {
					d.skin.css('padding' + b, w(d.padding[a]));
				});
				b.trigger('onReady');
				if ('inline' === c || 'html' === c) {
					if (!d.content || !d.content.length) return b._error('content');
				} else if (!e) return b._error('href');
				'image' === c ? b._loadImage() : 'ajax' === c ? b._loadAjax() : 'iframe' === c ? b._loadIframe() : b._afterLoad();
			}
		},
		_error: function (a) {
			f.extend(b.coming, {
				type: 'html',
				autoWidth: !0,
				autoHeight: !0,
				minWidth: 0,
				minHeight: 0,
				scrolling: 'no',
				hasError: a,
				content: b.coming.tpl.error,
			});
			b._afterLoad();
		},
		_loadImage: function () {
			var a = (b.imgPreload = new Image());
			a.onload = function () {
				this.onload = this.onerror = null;
				b.coming.width = this.width / b.opts.pixelRatio;
				b.coming.height = this.height / b.opts.pixelRatio;
				b._afterLoad();
			};
			a.onerror = function () {
				this.onload = this.onerror = null;
				b._error('image');
			};
			a.src = b.coming.href;
			!0 !== a.complete && b.showLoading();
		},
		_loadAjax: function () {
			var a = b.coming;
			b.showLoading();
			b.ajaxLoad = f.ajax(
				f.extend({}, a.ajax, {
					url: a.href,
					error: function (a, e) {
						b.coming && 'abort' !== e ? b._error('ajax', a) : b.hideLoading();
					},
					success: function (d, e) {
						'success' === e && ((a.content = d), b._afterLoad());
					},
				})
			);
		},
		_loadIframe: function () {
			var a = b.coming,
				d = f(a.tpl.iframe.replace(/\{rnd\}/g, new Date().getTime()))
					.attr('scrolling', s ? 'auto' : a.iframe.scrolling)
					.attr('src', a.href);
			f(a.wrap).bind('onReset', function () {
				try {
					f(this).find('iframe').hide().attr('src', '//about:blank').end().empty();
				} catch (a) {}
			});
			a.iframe.preload &&
				(b.showLoading(),
				d.one('load', function () {
					f(this).data('ready', 1);
					s || f(this).bind('load.fb', b.update);
					f(this).parents('.fancybox-wrap').width('100%').removeClass('fancybox-tmp').show();
					b._afterLoad();
				}));
			a.content = d.appendTo(a.inner);
			a.iframe.preload || b._afterLoad();
		},
		_preloadImages: function () {
			var a = b.group,
				d = b.current,
				e = a.length,
				c = d.preload ? Math.min(d.preload, e - 1) : 0,
				f,
				g;
			for (g = 1; g <= c; g += 1) (f = a[(d.index + g) % e]), 'image' === f.type && f.href && (new Image().src = f.href);
		},
		_afterLoad: function () {
			var a = b.coming,
				d = b.current,
				e,
				c,
				k,
				g,
				h;
			b.hideLoading();
			if (a && !1 !== b.isActive)
				if (!1 === b.trigger('afterLoad', a, d)) a.wrap.stop(!0).trigger('onReset').remove(), (b.coming = null);
				else {
					d &&
						(b.trigger('beforeChange', d), d.wrap.stop(!0).removeClass('fancybox-opened').find('.fancybox-item, .fancybox-nav').remove());
					b.unbindEvents();
					e = a.content;
					c = a.type;
					k = a.scrolling;
					f.extend(b, { wrap: a.wrap, skin: a.skin, outer: a.outer, inner: a.inner, current: a, previous: d });
					g = a.href;
					switch (c) {
						case 'inline':
						case 'ajax':
						case 'html':
							a.selector
								? (e = f('<div>').html(e).find(a.selector))
								: t(e) &&
								  (e.data('fancybox-placeholder') ||
										e.data('fancybox-placeholder', f('<div class="fancybox-placeholder"></div>').insertAfter(e).hide()),
								  (e = e.show().detach()),
								  a.wrap.bind('onReset', function () {
										f(this).find(e).length &&
											e.hide().replaceAll(e.data('fancybox-placeholder')).data('fancybox-placeholder', !1);
								  }));
							break;
						case 'image':
							e = a.tpl.image.replace('{href}', g);
							break;
						case 'swf':
							(e =
								'<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' +
								g +
								'"></param>'),
								(h = ''),
								f.each(a.swf, function (a, b) {
									e += '<param name="' + a + '" value="' + b + '"></param>';
									h += ' ' + a + '="' + b + '"';
								}),
								(e +=
									'<embed src="' +
									g +
									'" type="application/x-shockwave-flash" width="100%" height="100%"' +
									h +
									'></embed></object>');
					}
					(!t(e) || !e.parent().is(a.inner)) && a.inner.append(e);
					b.trigger('beforeShow');
					a.inner.css('overflow', 'yes' === k ? 'scroll' : 'no' === k ? 'hidden' : k);
					b._setDimension();
					b.reposition();
					b.isOpen = !1;
					b.coming = null;
					b.bindEvents();
					if (b.isOpened) {
						if (d.prevMethod) b.transitions[d.prevMethod]();
					} else f('.fancybox-wrap').not(a.wrap).stop(!0).trigger('onReset').remove();
					b.transitions[b.isOpened ? a.nextMethod : a.openMethod]();
					b._preloadImages();
				}
		},
		_setDimension: function () {
			var a = b.getViewport(),
				d = 0,
				e = !1,
				c = !1,
				e = b.wrap,
				k = b.skin,
				g = b.inner,
				h = b.current,
				c = h.width,
				j = h.height,
				m = h.minWidth,
				u = h.minHeight,
				n = h.maxWidth,
				p = h.maxHeight,
				s = h.scrolling,
				q = h.scrollOutside ? h.scrollbarWidth : 0,
				x = h.margin,
				y = l(x[1] + x[3]),
				r = l(x[0] + x[2]),
				v,
				z,
				t,
				C,
				A,
				F,
				B,
				D,
				H;
			e.add(k).add(g).width('auto').height('auto').removeClass('fancybox-tmp');
			x = l(k.outerWidth(!0) - k.width());
			v = l(k.outerHeight(!0) - k.height());
			z = y + x;
			t = r + v;
			C = E(c) ? ((a.w - z) * l(c)) / 100 : c;
			A = E(j) ? ((a.h - t) * l(j)) / 100 : j;
			if ('iframe' === h.type) {
				if (((H = h.content), h.autoHeight && 1 === H.data('ready')))
					try {
						H[0].contentWindow.document.location &&
							(g.width(C).height(9999), (F = H.contents().find('body')), q && F.css('overflow-x', 'hidden'), (A = F.outerHeight(!0)));
					} catch (G) {}
			} else if (h.autoWidth || h.autoHeight)
				g.addClass('fancybox-tmp'),
					h.autoWidth || g.width(C),
					h.autoHeight || g.height(A),
					h.autoWidth && (C = g.width()),
					h.autoHeight && (A = g.height()),
					g.removeClass('fancybox-tmp');
			c = l(C);
			j = l(A);
			D = C / A;
			m = l(E(m) ? l(m, 'w') - z : m);
			n = l(E(n) ? l(n, 'w') - z : n);
			u = l(E(u) ? l(u, 'h') - t : u);
			p = l(E(p) ? l(p, 'h') - t : p);
			F = n;
			B = p;
			h.fitToView && ((n = Math.min(a.w - z, n)), (p = Math.min(a.h - t, p)));
			z = a.w - y;
			r = a.h - r;
			h.aspectRatio
				? (c > n && ((c = n), (j = l(c / D))),
				  j > p && ((j = p), (c = l(j * D))),
				  c < m && ((c = m), (j = l(c / D))),
				  j < u && ((j = u), (c = l(j * D))))
				: ((c = Math.max(m, Math.min(c, n))),
				  h.autoHeight && 'iframe' !== h.type && (g.width(c), (j = g.height())),
				  (j = Math.max(u, Math.min(j, p))));
			if (h.fitToView)
				if ((g.width(c).height(j), e.width(c + x), (a = e.width()), (y = e.height()), h.aspectRatio))
					for (; (a > z || y > r) && c > m && j > u && !(19 < d++); )
						(j = Math.max(u, Math.min(p, j - 10))),
							(c = l(j * D)),
							c < m && ((c = m), (j = l(c / D))),
							c > n && ((c = n), (j = l(c / D))),
							g.width(c).height(j),
							e.width(c + x),
							(a = e.width()),
							(y = e.height());
				else (c = Math.max(m, Math.min(c, c - (a - z)))), (j = Math.max(u, Math.min(j, j - (y - r))));
			q && 'auto' === s && j < A && c + x + q < z && (c += q);
			g.width(c).height(j);
			e.width(c + x);
			a = e.width();
			y = e.height();
			e = (a > z || y > r) && c > m && j > u;
			c = h.aspectRatio ? c < F && j < B && c < C && j < A : (c < F || j < B) && (c < C || j < A);
			f.extend(h, {
				dim: { width: w(a), height: w(y) },
				origWidth: C,
				origHeight: A,
				canShrink: e,
				canExpand: c,
				wPadding: x,
				hPadding: v,
				wrapSpace: y - k.outerHeight(!0),
				skinSpace: k.height() - j,
			});
			!H && h.autoHeight && j > u && j < p && !c && g.height('auto');
		},
		_getPosition: function (a) {
			var d = b.current,
				e = b.getViewport(),
				c = d.margin,
				f = b.wrap.width() + c[1] + c[3],
				g = b.wrap.height() + c[0] + c[2],
				c = { position: 'absolute', top: c[0], left: c[3] };
			d.autoCenter && d.fixed && !a && g <= e.h && f <= e.w ? (c.position = 'fixed') : d.locked || ((c.top += e.y), (c.left += e.x));
			c.top = w(Math.max(c.top, c.top + (e.h - g) * d.topRatio));
			c.left = w(Math.max(c.left, c.left + (e.w - f) * d.leftRatio));
			return c;
		},
		_afterZoomIn: function () {
			var a = b.current;
			a &&
				((b.isOpen = b.isOpened = !0),
				b.wrap.css('overflow', 'visible').addClass('fancybox-opened'),
				b.update(),
				(a.closeClick || (a.nextClick && 1 < b.group.length)) &&
					b.inner.css('cursor', 'pointer').bind('click.fb', function (d) {
						!f(d.target).is('a') && !f(d.target).parent().is('a') && (d.preventDefault(), b[a.closeClick ? 'close' : 'next']());
					}),
				a.closeBtn &&
					f(a.tpl.closeBtn)
						.appendTo(b.skin)
						.bind('click.fb', function (a) {
							a.preventDefault();
							b.close();
						}),
				a.arrows &&
					1 < b.group.length &&
					((a.loop || 0 < a.index) && f(a.tpl.prev).appendTo(b.outer).bind('click.fb', b.prev),
					(a.loop || a.index < b.group.length - 1) && f(a.tpl.next).appendTo(b.outer).bind('click.fb', b.next)),
				b.trigger('afterShow'),
				!a.loop && a.index === a.group.length - 1 ? b.play(!1) : b.opts.autoPlay && !b.player.isActive && ((b.opts.autoPlay = !1), b.play()));
		},
		_afterZoomOut: function (a) {
			a = a || b.current;
			f('.fancybox-wrap').trigger('onReset').remove();
			f.extend(b, {
				group: {},
				opts: {},
				router: !1,
				current: null,
				isActive: !1,
				isOpened: !1,
				isOpen: !1,
				isClosing: !1,
				wrap: null,
				skin: null,
				outer: null,
				inner: null,
			});
			b.trigger('afterClose', a);
		},
	});
	b.transitions = {
		getOrigPosition: function () {
			var a = b.current,
				d = a.element,
				e = a.orig,
				c = {},
				f = 50,
				g = 50,
				h = a.hPadding,
				j = a.wPadding,
				m = b.getViewport();
			!e && a.isDom && d.is(':visible') && ((e = d.find('img:first')), e.length || (e = d));
			t(e)
				? ((c = e.offset()), e.is('img') && ((f = e.outerWidth()), (g = e.outerHeight())))
				: ((c.top = m.y + (m.h - g) * a.topRatio), (c.left = m.x + (m.w - f) * a.leftRatio));
			if ('fixed' === b.wrap.css('position') || a.locked) (c.top -= m.y), (c.left -= m.x);
			return (c = { top: w(c.top - h * a.topRatio), left: w(c.left - j * a.leftRatio), width: w(f + j), height: w(g + h) });
		},
		step: function (a, d) {
			var e,
				c,
				f = d.prop;
			c = b.current;
			var g = c.wrapSpace,
				h = c.skinSpace;
			if ('width' === f || 'height' === f)
				(e = d.end === d.start ? 1 : (a - d.start) / (d.end - d.start)),
					b.isClosing && (e = 1 - e),
					(c = 'width' === f ? c.wPadding : c.hPadding),
					(c = a - c),
					b.skin[f](l('width' === f ? c : c - g * e)),
					b.inner[f](l('width' === f ? c : c - g * e - h * e));
		},
		zoomIn: function () {
			var a = b.current,
				d = a.pos,
				e = a.openEffect,
				c = 'elastic' === e,
				k = f.extend({ opacity: 1 }, d);
			delete k.position;
			c ? ((d = this.getOrigPosition()), a.openOpacity && (d.opacity = 0.1)) : 'fade' === e && (d.opacity = 0.1);
			b.wrap
				.css(d)
				.animate(k, { duration: 'none' === e ? 0 : a.openSpeed, easing: a.openEasing, step: c ? this.step : null, complete: b._afterZoomIn });
		},
		zoomOut: function () {
			var a = b.current,
				d = a.closeEffect,
				e = 'elastic' === d,
				c = { opacity: 0.1 };
			e && ((c = this.getOrigPosition()), a.closeOpacity && (c.opacity = 0.1));
			b.wrap.animate(c, {
				duration: 'none' === d ? 0 : a.closeSpeed,
				easing: a.closeEasing,
				step: e ? this.step : null,
				complete: b._afterZoomOut,
			});
		},
		changeIn: function () {
			var a = b.current,
				d = a.nextEffect,
				e = a.pos,
				c = { opacity: 1 },
				f = b.direction,
				g;
			e.opacity = 0.1;
			'elastic' === d &&
				((g = 'down' === f || 'up' === f ? 'top' : 'left'),
				'down' === f || 'right' === f ? ((e[g] = w(l(e[g]) - 200)), (c[g] = '+=200px')) : ((e[g] = w(l(e[g]) + 200)), (c[g] = '-=200px')));
			'none' === d ? b._afterZoomIn() : b.wrap.css(e).animate(c, { duration: a.nextSpeed, easing: a.nextEasing, complete: b._afterZoomIn });
		},
		changeOut: function () {
			var a = b.previous,
				d = a.prevEffect,
				e = { opacity: 0.1 },
				c = b.direction;
			'elastic' === d && (e['down' === c || 'up' === c ? 'top' : 'left'] = ('up' === c || 'left' === c ? '-' : '+') + '=200px');
			a.wrap.animate(e, {
				duration: 'none' === d ? 0 : a.prevSpeed,
				easing: a.prevEasing,
				complete: function () {
					f(this).trigger('onReset').remove();
				},
			});
		},
	};
	b.helpers.overlay = {
		defaults: { closeClick: !0, speedOut: 200, showEarly: !0, css: {}, locked: !s, fixed: !0 },
		overlay: null,
		fixed: !1,
		el: f('html'),
		create: function (a) {
			a = f.extend({}, this.defaults, a);
			this.overlay && this.close();
			this.overlay = f('<div class="fancybox-overlay"></div>').appendTo(b.coming ? b.coming.parent : a.parent);
			this.fixed = !1;
			a.fixed && b.defaults.fixed && (this.overlay.addClass('fancybox-overlay-fixed'), (this.fixed = !0));
		},
		open: function (a) {
			var d = this;
			a = f.extend({}, this.defaults, a);
			this.overlay ? this.overlay.unbind('.overlay').width('auto').height('auto') : this.create(a);
			this.fixed || (n.bind('resize.overlay', f.proxy(this.update, this)), this.update());
			a.closeClick &&
				this.overlay.bind('click.overlay', function (a) {
					if (f(a.target).hasClass('fancybox-overlay')) return b.isActive ? b.close() : d.close(), !1;
				});
			this.overlay.css(a.css).show();
		},
		close: function () {
			var a, b;
			n.unbind('resize.overlay');
			this.el.hasClass('fancybox-lock') &&
				(f('.fancybox-margin').removeClass('fancybox-margin'),
				(a = n.scrollTop()),
				(b = n.scrollLeft()),
				this.el.removeClass('fancybox-lock'),
				n.scrollTop(a).scrollLeft(b));
			f('.fancybox-overlay').remove().hide();
			f.extend(this, { overlay: null, fixed: !1 });
		},
		update: function () {
			var a = '100%',
				b;
			this.overlay.width(a).height('100%');
			I
				? ((b = Math.max(G.documentElement.offsetWidth, G.body.offsetWidth)), p.width() > b && (a = p.width()))
				: p.width() > n.width() && (a = p.width());
			this.overlay.width(a).height(p.height());
		},
		onReady: function (a, b) {
			var e = this.overlay;
			f('.fancybox-overlay').stop(!0, !0);
			e || this.create(a);
			a.locked &&
				this.fixed &&
				b.fixed &&
				(e || (this.margin = p.height() > n.height() ? f('html').css('margin-right').replace('px', '') : !1),
				(b.locked = this.overlay.append(b.wrap)),
				(b.fixed = !1));
			!0 === a.showEarly && this.beforeShow.apply(this, arguments);
		},
		beforeShow: function (a, b) {
			var e, c;
			b.locked &&
				(!1 !== this.margin &&
					(f('*')
						.filter(function () {
							return 'fixed' === f(this).css('position') && !f(this).hasClass('fancybox-overlay') && !f(this).hasClass('fancybox-wrap');
						})
						.addClass('fancybox-margin'),
					this.el.addClass('fancybox-margin')),
				(e = n.scrollTop()),
				(c = n.scrollLeft()),
				this.el.addClass('fancybox-lock'),
				n.scrollTop(e).scrollLeft(c));
			this.open(a);
		},
		onUpdate: function () {
			this.fixed || this.update();
		},
		afterClose: function (a) {
			this.overlay && !b.coming && this.overlay.fadeOut(a.speedOut, f.proxy(this.close, this));
		},
	};
	b.helpers.title = {
		defaults: { type: 'float', position: 'bottom' },
		beforeShow: function (a) {
			var d = b.current,
				e = d.title,
				c = a.type;
			f.isFunction(e) && (e = e.call(d.element, d));
			if (q(e) && '' !== f.trim(e)) {
				d = f('<div class="fancybox-title fancybox-title-' + c + '-wrap">' + e + '</div>');
				switch (c) {
					case 'inside':
						c = b.skin;
						break;
					case 'outside':
						c = b.wrap;
						break;
					case 'over':
						c = b.inner;
						break;
					default:
						(c = b.skin),
							d.appendTo('body'),
							I && d.width(d.width()),
							d.wrapInner('<span class="child"></span>'),
							(b.current.margin[2] += Math.abs(l(d.css('margin-bottom'))));
				}
				d['top' === a.position ? 'prependTo' : 'appendTo'](c);
			}
		},
	};
	f.fn.fancybox = function (a) {
		var d,
			e = f(this),
			c = this.selector || '',
			k = function (g) {
				var h = f(this).blur(),
					j = d,
					k,
					l;
				!g.ctrlKey &&
					!g.altKey &&
					!g.shiftKey &&
					!g.metaKey &&
					!h.is('.fancybox-wrap') &&
					((k = a.groupAttr || 'data-fancybox-group'),
					(l = h.attr(k)),
					l || ((k = 'rel'), (l = h.get(0)[k])),
					l && '' !== l && 'nofollow' !== l && ((h = c.length ? f(c) : e), (h = h.filter('[' + k + '="' + l + '"]')), (j = h.index(this))),
					(a.index = j),
					!1 !== b.open(h, a) && g.preventDefault());
			};
		a = a || {};
		d = a.index || 0;
		!c || !1 === a.live
			? e.unbind('click.fb-start').bind('click.fb-start', k)
			: p.undelegate(c, 'click.fb-start').delegate(c + ":not('.fancybox-item, .fancybox-nav')", 'click.fb-start', k);
		this.filter('[data-fancybox-start=1]').trigger('click');
		return this;
	};
	p.ready(function () {
		var a, d;
		f.scrollbarWidth === v &&
			(f.scrollbarWidth = function () {
				var a = f('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body'),
					b = a.children(),
					b = b.innerWidth() - b.height(99).innerWidth();
				a.remove();
				return b;
			});
		if (f.support.fixedPosition === v) {
			a = f.support;
			d = f('<div style="position:fixed;top:20px;"></div>').appendTo('body');
			var e = 20 === d[0].offsetTop || 15 === d[0].offsetTop;
			d.remove();
			a.fixedPosition = e;
		}
		f.extend(b.defaults, { scrollbarWidth: f.scrollbarWidth(), fixed: f.support.fixedPosition, parent: f('body') });
		a = f(r).width();
		J.addClass('fancybox-lock-test');
		d = f(r).width();
		J.removeClass('fancybox-lock-test');
		f("<style type='text/css'>.fancybox-margin{margin-right:" + (d - a) + 'px;}</style>').appendTo('head');
	});
})(window, document, jQuery);

/*!
 * Isotope PACKAGED v2.2.2
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * http://isotope.metafizzy.co
 * Copyright 2015 Metafizzy
 */

!(function (a) {
	function b() {}
	function c(a) {
		function c(b) {
			b.prototype.option ||
				(b.prototype.option = function (b) {
					a.isPlainObject(b) && (this.options = a.extend(!0, this.options, b));
				});
		}
		function e(b, c) {
			a.fn[b] = function (e) {
				if ('string' == typeof e) {
					for (var g = d.call(arguments, 1), h = 0, i = this.length; i > h; h++) {
						var j = this[h],
							k = a.data(j, b);
						if (k)
							if (a.isFunction(k[e]) && '_' !== e.charAt(0)) {
								var l = k[e].apply(k, g);
								if (void 0 !== l) return l;
							} else f("no such method '" + e + "' for " + b + ' instance');
						else f('cannot call methods on ' + b + " prior to initialization; attempted to call '" + e + "'");
					}
					return this;
				}
				return this.each(function () {
					var d = a.data(this, b);
					d ? (d.option(e), d._init()) : ((d = new c(this, e)), a.data(this, b, d));
				});
			};
		}
		if (a) {
			var f =
				'undefined' == typeof console
					? b
					: function (a) {
							console.error(a);
					  };
			return (
				(a.bridget = function (a, b) {
					c(b), e(a, b);
				}),
				a.bridget
			);
		}
	}
	var d = Array.prototype.slice;
	'function' == typeof define && define.amd
		? define('jquery-bridget/jquery.bridget', ['jquery'], c)
		: c('object' == typeof exports ? require('jquery') : a.jQuery);
})(window),
	(function (a) {
		function b(b) {
			var c = a.event;
			return (c.target = c.target || c.srcElement || b), c;
		}
		var c = document.documentElement,
			d = function () {};
		c.addEventListener
			? (d = function (a, b, c) {
					a.addEventListener(b, c, !1);
			  })
			: c.attachEvent &&
			  (d = function (a, c, d) {
					(a[c + d] = d.handleEvent
						? function () {
								var c = b(a);
								d.handleEvent.call(d, c);
						  }
						: function () {
								var c = b(a);
								d.call(a, c);
						  }),
						a.attachEvent('on' + c, a[c + d]);
			  });
		var e = function () {};
		c.removeEventListener
			? (e = function (a, b, c) {
					a.removeEventListener(b, c, !1);
			  })
			: c.detachEvent &&
			  (e = function (a, b, c) {
					a.detachEvent('on' + b, a[b + c]);
					try {
						delete a[b + c];
					} catch (d) {
						a[b + c] = void 0;
					}
			  });
		var f = { bind: d, unbind: e };
		'function' == typeof define && define.amd
			? define('eventie/eventie', f)
			: 'object' == typeof exports
			? (module.exports = f)
			: (a.eventie = f);
	})(window),
	function () {
		'use strict';
		function a() {}
		function b(a, b) {
			for (var c = a.length; c--; ) if (a[c].listener === b) return c;
			return -1;
		}
		function c(a) {
			return function () {
				return this[a].apply(this, arguments);
			};
		}
		var d = a.prototype,
			e = this,
			f = e.EventEmitter;
		(d.getListeners = function (a) {
			var b,
				c,
				d = this._getEvents();
			if (a instanceof RegExp) {
				b = {};
				for (c in d) d.hasOwnProperty(c) && a.test(c) && (b[c] = d[c]);
			} else b = d[a] || (d[a] = []);
			return b;
		}),
			(d.flattenListeners = function (a) {
				var b,
					c = [];
				for (b = 0; b < a.length; b += 1) c.push(a[b].listener);
				return c;
			}),
			(d.getListenersAsObject = function (a) {
				var b,
					c = this.getListeners(a);
				return c instanceof Array && ((b = {}), (b[a] = c)), b || c;
			}),
			(d.addListener = function (a, c) {
				var d,
					e = this.getListenersAsObject(a),
					f = 'object' == typeof c;
				for (d in e) e.hasOwnProperty(d) && -1 === b(e[d], c) && e[d].push(f ? c : { listener: c, once: !1 });
				return this;
			}),
			(d.on = c('addListener')),
			(d.addOnceListener = function (a, b) {
				return this.addListener(a, { listener: b, once: !0 });
			}),
			(d.once = c('addOnceListener')),
			(d.defineEvent = function (a) {
				return this.getListeners(a), this;
			}),
			(d.defineEvents = function (a) {
				for (var b = 0; b < a.length; b += 1) this.defineEvent(a[b]);
				return this;
			}),
			(d.removeListener = function (a, c) {
				var d,
					e,
					f = this.getListenersAsObject(a);
				for (e in f) f.hasOwnProperty(e) && ((d = b(f[e], c)), -1 !== d && f[e].splice(d, 1));
				return this;
			}),
			(d.off = c('removeListener')),
			(d.addListeners = function (a, b) {
				return this.manipulateListeners(!1, a, b);
			}),
			(d.removeListeners = function (a, b) {
				return this.manipulateListeners(!0, a, b);
			}),
			(d.manipulateListeners = function (a, b, c) {
				var d,
					e,
					f = a ? this.removeListener : this.addListener,
					g = a ? this.removeListeners : this.addListeners;
				if ('object' != typeof b || b instanceof RegExp) for (d = c.length; d--; ) f.call(this, b, c[d]);
				else for (d in b) b.hasOwnProperty(d) && (e = b[d]) && ('function' == typeof e ? f.call(this, d, e) : g.call(this, d, e));
				return this;
			}),
			(d.removeEvent = function (a) {
				var b,
					c = typeof a,
					d = this._getEvents();
				if ('string' === c) delete d[a];
				else if (a instanceof RegExp) for (b in d) d.hasOwnProperty(b) && a.test(b) && delete d[b];
				else delete this._events;
				return this;
			}),
			(d.removeAllListeners = c('removeEvent')),
			(d.emitEvent = function (a, b) {
				var c,
					d,
					e,
					f,
					g = this.getListenersAsObject(a);
				for (e in g)
					if (g.hasOwnProperty(e))
						for (d = g[e].length; d--; )
							(c = g[e][d]),
								c.once === !0 && this.removeListener(a, c.listener),
								(f = c.listener.apply(this, b || [])),
								f === this._getOnceReturnValue() && this.removeListener(a, c.listener);
				return this;
			}),
			(d.trigger = c('emitEvent')),
			(d.emit = function (a) {
				var b = Array.prototype.slice.call(arguments, 1);
				return this.emitEvent(a, b);
			}),
			(d.setOnceReturnValue = function (a) {
				return (this._onceReturnValue = a), this;
			}),
			(d._getOnceReturnValue = function () {
				return this.hasOwnProperty('_onceReturnValue') ? this._onceReturnValue : !0;
			}),
			(d._getEvents = function () {
				return this._events || (this._events = {});
			}),
			(a.noConflict = function () {
				return (e.EventEmitter = f), a;
			}),
			'function' == typeof define && define.amd
				? define('eventEmitter/EventEmitter', [], function () {
						return a;
				  })
				: 'object' == typeof module && module.exports
				? (module.exports = a)
				: (e.EventEmitter = a);
	}.call(this),
	(function (a) {
		function b(a) {
			if (a) {
				if ('string' == typeof d[a]) return a;
				a = a.charAt(0).toUpperCase() + a.slice(1);
				for (var b, e = 0, f = c.length; f > e; e++) if (((b = c[e] + a), 'string' == typeof d[b])) return b;
			}
		}
		var c = 'Webkit Moz ms Ms O'.split(' '),
			d = document.documentElement.style;
		'function' == typeof define && define.amd
			? define('get-style-property/get-style-property', [], function () {
					return b;
			  })
			: 'object' == typeof exports
			? (module.exports = b)
			: (a.getStyleProperty = b);
	})(window),
	(function (a, b) {
		function c(a) {
			var b = parseFloat(a),
				c = -1 === a.indexOf('%') && !isNaN(b);
			return c && b;
		}
		function d() {}
		function e() {
			for (var a = { width: 0, height: 0, innerWidth: 0, innerHeight: 0, outerWidth: 0, outerHeight: 0 }, b = 0, c = h.length; c > b; b++) {
				var d = h[b];
				a[d] = 0;
			}
			return a;
		}
		function f(b) {
			function d() {
				if (!m) {
					m = !0;
					var d = a.getComputedStyle;
					if (
						((j = (function () {
							var a = d
								? function (a) {
										return d(a, null);
								  }
								: function (a) {
										return a.currentStyle;
								  };
							return function (b) {
								var c = a(b);
								return (
									c ||
										g(
											'Style returned ' +
												c +
												'. Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1'
										),
									c
								);
							};
						})()),
						(k = b('boxSizing')))
					) {
						var e = document.createElement('div');
						(e.style.width = '200px'),
							(e.style.padding = '1px 2px 3px 4px'),
							(e.style.borderStyle = 'solid'),
							(e.style.borderWidth = '1px 2px 3px 4px'),
							(e.style[k] = 'border-box');
						var f = document.body || document.documentElement;
						f.appendChild(e);
						var h = j(e);
						(l = 200 === c(h.width)), f.removeChild(e);
					}
				}
			}
			function f(a) {
				if ((d(), 'string' == typeof a && (a = document.querySelector(a)), a && 'object' == typeof a && a.nodeType)) {
					var b = j(a);
					if ('none' === b.display) return e();
					var f = {};
					(f.width = a.offsetWidth), (f.height = a.offsetHeight);
					for (var g = (f.isBorderBox = !(!k || !b[k] || 'border-box' !== b[k])), m = 0, n = h.length; n > m; m++) {
						var o = h[m],
							p = b[o];
						p = i(a, p);
						var q = parseFloat(p);
						f[o] = isNaN(q) ? 0 : q;
					}
					var r = f.paddingLeft + f.paddingRight,
						s = f.paddingTop + f.paddingBottom,
						t = f.marginLeft + f.marginRight,
						u = f.marginTop + f.marginBottom,
						v = f.borderLeftWidth + f.borderRightWidth,
						w = f.borderTopWidth + f.borderBottomWidth,
						x = g && l,
						y = c(b.width);
					y !== !1 && (f.width = y + (x ? 0 : r + v));
					var z = c(b.height);
					return (
						z !== !1 && (f.height = z + (x ? 0 : s + w)),
						(f.innerWidth = f.width - (r + v)),
						(f.innerHeight = f.height - (s + w)),
						(f.outerWidth = f.width + t),
						(f.outerHeight = f.height + u),
						f
					);
				}
			}
			function i(b, c) {
				if (a.getComputedStyle || -1 === c.indexOf('%')) return c;
				var d = b.style,
					e = d.left,
					f = b.runtimeStyle,
					g = f && f.left;
				return g && (f.left = b.currentStyle.left), (d.left = c), (c = d.pixelLeft), (d.left = e), g && (f.left = g), c;
			}
			var j,
				k,
				l,
				m = !1;
			return f;
		}
		var g =
				'undefined' == typeof console
					? d
					: function (a) {
							console.error(a);
					  },
			h = [
				'paddingLeft',
				'paddingRight',
				'paddingTop',
				'paddingBottom',
				'marginLeft',
				'marginRight',
				'marginTop',
				'marginBottom',
				'borderLeftWidth',
				'borderRightWidth',
				'borderTopWidth',
				'borderBottomWidth',
			];
		'function' == typeof define && define.amd
			? define('get-size/get-size', ['get-style-property/get-style-property'], f)
			: 'object' == typeof exports
			? (module.exports = f(require('desandro-get-style-property')))
			: (a.getSize = f(a.getStyleProperty));
	})(window),
	(function (a) {
		function b(a) {
			'function' == typeof a && (b.isReady ? a() : g.push(a));
		}
		function c(a) {
			var c = 'readystatechange' === a.type && 'complete' !== f.readyState;
			b.isReady || c || d();
		}
		function d() {
			b.isReady = !0;
			for (var a = 0, c = g.length; c > a; a++) {
				var d = g[a];
				d();
			}
		}
		function e(e) {
			return 'complete' === f.readyState ? d() : (e.bind(f, 'DOMContentLoaded', c), e.bind(f, 'readystatechange', c), e.bind(a, 'load', c)), b;
		}
		var f = a.document,
			g = [];
		(b.isReady = !1),
			'function' == typeof define && define.amd
				? define('doc-ready/doc-ready', ['eventie/eventie'], e)
				: 'object' == typeof exports
				? (module.exports = e(require('eventie')))
				: (a.docReady = e(a.eventie));
	})(window),
	(function (a) {
		'use strict';
		function b(a, b) {
			return a[g](b);
		}
		function c(a) {
			if (!a.parentNode) {
				var b = document.createDocumentFragment();
				b.appendChild(a);
			}
		}
		function d(a, b) {
			c(a);
			for (var d = a.parentNode.querySelectorAll(b), e = 0, f = d.length; f > e; e++) if (d[e] === a) return !0;
			return !1;
		}
		function e(a, d) {
			return c(a), b(a, d);
		}
		var f,
			g = (function () {
				if (a.matches) return 'matches';
				if (a.matchesSelector) return 'matchesSelector';
				for (var b = ['webkit', 'moz', 'ms', 'o'], c = 0, d = b.length; d > c; c++) {
					var e = b[c],
						f = e + 'MatchesSelector';
					if (a[f]) return f;
				}
			})();
		if (g) {
			var h = document.createElement('div'),
				i = b(h, 'div');
			f = i ? b : e;
		} else f = d;
		'function' == typeof define && define.amd
			? define('matches-selector/matches-selector', [], function () {
					return f;
			  })
			: 'object' == typeof exports
			? (module.exports = f)
			: (window.matchesSelector = f);
	})(Element.prototype),
	(function (a, b) {
		'use strict';
		'function' == typeof define && define.amd
			? define('fizzy-ui-utils/utils', ['doc-ready/doc-ready', 'matches-selector/matches-selector'], function (c, d) {
					return b(a, c, d);
			  })
			: 'object' == typeof exports
			? (module.exports = b(a, require('doc-ready'), require('desandro-matches-selector')))
			: (a.fizzyUIUtils = b(a, a.docReady, a.matchesSelector));
	})(window, function (a, b, c) {
		var d = {};
		(d.extend = function (a, b) {
			for (var c in b) a[c] = b[c];
			return a;
		}),
			(d.modulo = function (a, b) {
				return ((a % b) + b) % b;
			});
		var e = Object.prototype.toString;
		(d.isArray = function (a) {
			return '[object Array]' == e.call(a);
		}),
			(d.makeArray = function (a) {
				var b = [];
				if (d.isArray(a)) b = a;
				else if (a && 'number' == typeof a.length) for (var c = 0, e = a.length; e > c; c++) b.push(a[c]);
				else b.push(a);
				return b;
			}),
			(d.indexOf = Array.prototype.indexOf
				? function (a, b) {
						return a.indexOf(b);
				  }
				: function (a, b) {
						for (var c = 0, d = a.length; d > c; c++) if (a[c] === b) return c;
						return -1;
				  }),
			(d.removeFrom = function (a, b) {
				var c = d.indexOf(a, b);
				-1 != c && a.splice(c, 1);
			}),
			(d.isElement =
				'function' == typeof HTMLElement || 'object' == typeof HTMLElement
					? function (a) {
							return a instanceof HTMLElement;
					  }
					: function (a) {
							return a && 'object' == typeof a && 1 == a.nodeType && 'string' == typeof a.nodeName;
					  }),
			(d.setText = (function () {
				function a(a, c) {
					(b = b || (void 0 !== document.documentElement.textContent ? 'textContent' : 'innerText')), (a[b] = c);
				}
				var b;
				return a;
			})()),
			(d.getParent = function (a, b) {
				for (; a != document.body; ) if (((a = a.parentNode), c(a, b))) return a;
			}),
			(d.getQueryElement = function (a) {
				return 'string' == typeof a ? document.querySelector(a) : a;
			}),
			(d.handleEvent = function (a) {
				var b = 'on' + a.type;
				this[b] && this[b](a);
			}),
			(d.filterFindElements = function (a, b) {
				a = d.makeArray(a);
				for (var e = [], f = 0, g = a.length; g > f; f++) {
					var h = a[f];
					if (d.isElement(h))
						if (b) {
							c(h, b) && e.push(h);
							for (var i = h.querySelectorAll(b), j = 0, k = i.length; k > j; j++) e.push(i[j]);
						} else e.push(h);
				}
				return e;
			}),
			(d.debounceMethod = function (a, b, c) {
				var d = a.prototype[b],
					e = b + 'Timeout';
				a.prototype[b] = function () {
					var a = this[e];
					a && clearTimeout(a);
					var b = arguments,
						f = this;
					this[e] = setTimeout(function () {
						d.apply(f, b), delete f[e];
					}, c || 100);
				};
			}),
			(d.toDashed = function (a) {
				return a
					.replace(/(.)([A-Z])/g, function (a, b, c) {
						return b + '-' + c;
					})
					.toLowerCase();
			});
		var f = a.console;
		return (
			(d.htmlInit = function (c, e) {
				b(function () {
					for (
						var b = d.toDashed(e), g = document.querySelectorAll('.js-' + b), h = 'data-' + b + '-options', i = 0, j = g.length;
						j > i;
						i++
					) {
						var k,
							l = g[i],
							m = l.getAttribute(h);
						try {
							k = m && JSON.parse(m);
						} catch (n) {
							f && f.error('Error parsing ' + h + ' on ' + l.nodeName.toLowerCase() + (l.id ? '#' + l.id : '') + ': ' + n);
							continue;
						}
						var o = new c(l, k),
							p = a.jQuery;
						p && p.data(l, e, o);
					}
				});
			}),
			d
		);
	}),
	(function (a, b) {
		'use strict';
		'function' == typeof define && define.amd
			? define(
					'outlayer/item',
					['eventEmitter/EventEmitter', 'get-size/get-size', 'get-style-property/get-style-property', 'fizzy-ui-utils/utils'],
					function (c, d, e, f) {
						return b(a, c, d, e, f);
					}
			  )
			: 'object' == typeof exports
			? (module.exports = b(
					a,
					require('wolfy87-eventemitter'),
					require('get-size'),
					require('desandro-get-style-property'),
					require('fizzy-ui-utils')
			  ))
			: ((a.Outlayer = {}), (a.Outlayer.Item = b(a, a.EventEmitter, a.getSize, a.getStyleProperty, a.fizzyUIUtils)));
	})(window, function (a, b, c, d, e) {
		'use strict';
		function f(a) {
			for (var b in a) return !1;
			return (b = null), !0;
		}
		function g(a, b) {
			a && ((this.element = a), (this.layout = b), (this.position = { x: 0, y: 0 }), this._create());
		}
		function h(a) {
			return a.replace(/([A-Z])/g, function (a) {
				return '-' + a.toLowerCase();
			});
		}
		var i = a.getComputedStyle,
			j = i
				? function (a) {
						return i(a, null);
				  }
				: function (a) {
						return a.currentStyle;
				  },
			k = d('transition'),
			l = d('transform'),
			m = k && l,
			n = !!d('perspective'),
			o = {
				WebkitTransition: 'webkitTransitionEnd',
				MozTransition: 'transitionend',
				OTransition: 'otransitionend',
				transition: 'transitionend',
			}[k],
			p = ['transform', 'transition', 'transitionDuration', 'transitionProperty'],
			q = (function () {
				for (var a = {}, b = 0, c = p.length; c > b; b++) {
					var e = p[b],
						f = d(e);
					f && f !== e && (a[e] = f);
				}
				return a;
			})();
		e.extend(g.prototype, b.prototype),
			(g.prototype._create = function () {
				(this._transn = { ingProperties: {}, clean: {}, onEnd: {} }), this.css({ position: 'absolute' });
			}),
			(g.prototype.handleEvent = function (a) {
				var b = 'on' + a.type;
				this[b] && this[b](a);
			}),
			(g.prototype.getSize = function () {
				this.size = c(this.element);
			}),
			(g.prototype.css = function (a) {
				var b = this.element.style;
				for (var c in a) {
					var d = q[c] || c;
					b[d] = a[c];
				}
			}),
			(g.prototype.getPosition = function () {
				var a = j(this.element),
					b = this.layout.options,
					c = b.isOriginLeft,
					d = b.isOriginTop,
					e = a[c ? 'left' : 'right'],
					f = a[d ? 'top' : 'bottom'],
					g = this.layout.size,
					h = -1 != e.indexOf('%') ? (parseFloat(e) / 100) * g.width : parseInt(e, 10),
					i = -1 != f.indexOf('%') ? (parseFloat(f) / 100) * g.height : parseInt(f, 10);
				(h = isNaN(h) ? 0 : h),
					(i = isNaN(i) ? 0 : i),
					(h -= c ? g.paddingLeft : g.paddingRight),
					(i -= d ? g.paddingTop : g.paddingBottom),
					(this.position.x = h),
					(this.position.y = i);
			}),
			(g.prototype.layoutPosition = function () {
				var a = this.layout.size,
					b = this.layout.options,
					c = {},
					d = b.isOriginLeft ? 'paddingLeft' : 'paddingRight',
					e = b.isOriginLeft ? 'left' : 'right',
					f = b.isOriginLeft ? 'right' : 'left',
					g = this.position.x + a[d];
				(c[e] = this.getXValue(g)), (c[f] = '');
				var h = b.isOriginTop ? 'paddingTop' : 'paddingBottom',
					i = b.isOriginTop ? 'top' : 'bottom',
					j = b.isOriginTop ? 'bottom' : 'top',
					k = this.position.y + a[h];
				(c[i] = this.getYValue(k)), (c[j] = ''), this.css(c), this.emitEvent('layout', [this]);
			}),
			(g.prototype.getXValue = function (a) {
				var b = this.layout.options;
				return b.percentPosition && !b.isHorizontal ? (a / this.layout.size.width) * 100 + '%' : a + 'px';
			}),
			(g.prototype.getYValue = function (a) {
				var b = this.layout.options;
				return b.percentPosition && b.isHorizontal ? (a / this.layout.size.height) * 100 + '%' : a + 'px';
			}),
			(g.prototype._transitionTo = function (a, b) {
				this.getPosition();
				var c = this.position.x,
					d = this.position.y,
					e = parseInt(a, 10),
					f = parseInt(b, 10),
					g = e === this.position.x && f === this.position.y;
				if ((this.setPosition(a, b), g && !this.isTransitioning)) return void this.layoutPosition();
				var h = a - c,
					i = b - d,
					j = {};
				(j.transform = this.getTranslate(h, i)),
					this.transition({ to: j, onTransitionEnd: { transform: this.layoutPosition }, isCleaning: !0 });
			}),
			(g.prototype.getTranslate = function (a, b) {
				var c = this.layout.options;
				return (
					(a = c.isOriginLeft ? a : -a),
					(b = c.isOriginTop ? b : -b),
					n ? 'translate3d(' + a + 'px, ' + b + 'px, 0)' : 'translate(' + a + 'px, ' + b + 'px)'
				);
			}),
			(g.prototype.goTo = function (a, b) {
				this.setPosition(a, b), this.layoutPosition();
			}),
			(g.prototype.moveTo = m ? g.prototype._transitionTo : g.prototype.goTo),
			(g.prototype.setPosition = function (a, b) {
				(this.position.x = parseInt(a, 10)), (this.position.y = parseInt(b, 10));
			}),
			(g.prototype._nonTransition = function (a) {
				this.css(a.to), a.isCleaning && this._removeStyles(a.to);
				for (var b in a.onTransitionEnd) a.onTransitionEnd[b].call(this);
			}),
			(g.prototype._transition = function (a) {
				if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(a);
				var b = this._transn;
				for (var c in a.onTransitionEnd) b.onEnd[c] = a.onTransitionEnd[c];
				for (c in a.to) (b.ingProperties[c] = !0), a.isCleaning && (b.clean[c] = !0);
				if (a.from) {
					this.css(a.from);
					var d = this.element.offsetHeight;
					d = null;
				}
				this.enableTransition(a.to), this.css(a.to), (this.isTransitioning = !0);
			});
		var r = 'opacity,' + h(q.transform || 'transform');
		(g.prototype.enableTransition = function () {
			this.isTransitioning ||
				(this.css({ transitionProperty: r, transitionDuration: this.layout.options.transitionDuration }),
				this.element.addEventListener(o, this, !1));
		}),
			(g.prototype.transition = g.prototype[k ? '_transition' : '_nonTransition']),
			(g.prototype.onwebkitTransitionEnd = function (a) {
				this.ontransitionend(a);
			}),
			(g.prototype.onotransitionend = function (a) {
				this.ontransitionend(a);
			});
		var s = { '-webkit-transform': 'transform', '-moz-transform': 'transform', '-o-transform': 'transform' };
		(g.prototype.ontransitionend = function (a) {
			if (a.target === this.element) {
				var b = this._transn,
					c = s[a.propertyName] || a.propertyName;
				if (
					(delete b.ingProperties[c],
					f(b.ingProperties) && this.disableTransition(),
					c in b.clean && ((this.element.style[a.propertyName] = ''), delete b.clean[c]),
					c in b.onEnd)
				) {
					var d = b.onEnd[c];
					d.call(this), delete b.onEnd[c];
				}
				this.emitEvent('transitionEnd', [this]);
			}
		}),
			(g.prototype.disableTransition = function () {
				this.removeTransitionStyles(), this.element.removeEventListener(o, this, !1), (this.isTransitioning = !1);
			}),
			(g.prototype._removeStyles = function (a) {
				var b = {};
				for (var c in a) b[c] = '';
				this.css(b);
			});
		var t = { transitionProperty: '', transitionDuration: '' };
		return (
			(g.prototype.removeTransitionStyles = function () {
				this.css(t);
			}),
			(g.prototype.removeElem = function () {
				this.element.parentNode.removeChild(this.element), this.css({ display: '' }), this.emitEvent('remove', [this]);
			}),
			(g.prototype.remove = function () {
				if (!k || !parseFloat(this.layout.options.transitionDuration)) return void this.removeElem();
				var a = this;
				this.once('transitionEnd', function () {
					a.removeElem();
				}),
					this.hide();
			}),
			(g.prototype.reveal = function () {
				delete this.isHidden, this.css({ display: '' });
				var a = this.layout.options,
					b = {},
					c = this.getHideRevealTransitionEndProperty('visibleStyle');
				(b[c] = this.onRevealTransitionEnd), this.transition({ from: a.hiddenStyle, to: a.visibleStyle, isCleaning: !0, onTransitionEnd: b });
			}),
			(g.prototype.onRevealTransitionEnd = function () {
				this.isHidden || this.emitEvent('reveal');
			}),
			(g.prototype.getHideRevealTransitionEndProperty = function (a) {
				var b = this.layout.options[a];
				if (b.opacity) return 'opacity';
				for (var c in b) return c;
			}),
			(g.prototype.hide = function () {
				(this.isHidden = !0), this.css({ display: '' });
				var a = this.layout.options,
					b = {},
					c = this.getHideRevealTransitionEndProperty('hiddenStyle');
				(b[c] = this.onHideTransitionEnd), this.transition({ from: a.visibleStyle, to: a.hiddenStyle, isCleaning: !0, onTransitionEnd: b });
			}),
			(g.prototype.onHideTransitionEnd = function () {
				this.isHidden && (this.css({ display: 'none' }), this.emitEvent('hide'));
			}),
			(g.prototype.destroy = function () {
				this.css({ position: '', left: '', right: '', top: '', bottom: '', transition: '', transform: '' });
			}),
			g
		);
	}),
	(function (a, b) {
		'use strict';
		'function' == typeof define && define.amd
			? define(
					'outlayer/outlayer',
					['eventie/eventie', 'eventEmitter/EventEmitter', 'get-size/get-size', 'fizzy-ui-utils/utils', './item'],
					function (c, d, e, f, g) {
						return b(a, c, d, e, f, g);
					}
			  )
			: 'object' == typeof exports
			? (module.exports = b(
					a,
					require('eventie'),
					require('wolfy87-eventemitter'),
					require('get-size'),
					require('fizzy-ui-utils'),
					require('./item')
			  ))
			: (a.Outlayer = b(a, a.eventie, a.EventEmitter, a.getSize, a.fizzyUIUtils, a.Outlayer.Item));
	})(window, function (a, b, c, d, e, f) {
		'use strict';
		function g(a, b) {
			var c = e.getQueryElement(a);
			if (!c) return void (h && h.error('Bad element for ' + this.constructor.namespace + ': ' + (c || a)));
			(this.element = c), i && (this.$element = i(this.element)), (this.options = e.extend({}, this.constructor.defaults)), this.option(b);
			var d = ++k;
			(this.element.outlayerGUID = d), (l[d] = this), this._create(), this.options.isInitLayout && this.layout();
		}
		var h = a.console,
			i = a.jQuery,
			j = function () {},
			k = 0,
			l = {};
		return (
			(g.namespace = 'outlayer'),
			(g.Item = f),
			(g.defaults = {
				containerStyle: { position: 'relative' },
				isInitLayout: !0,
				isOriginLeft: !0,
				isOriginTop: !0,
				isResizeBound: !0,
				isResizingContainer: !0,
				transitionDuration: '0.4s',
				hiddenStyle: { opacity: 0, transform: 'scale(0.001)' },
				visibleStyle: { opacity: 1, transform: 'scale(1)' },
			}),
			e.extend(g.prototype, c.prototype),
			(g.prototype.option = function (a) {
				e.extend(this.options, a);
			}),
			(g.prototype._create = function () {
				this.reloadItems(),
					(this.stamps = []),
					this.stamp(this.options.stamp),
					e.extend(this.element.style, this.options.containerStyle),
					this.options.isResizeBound && this.bindResize();
			}),
			(g.prototype.reloadItems = function () {
				this.items = this._itemize(this.element.children);
			}),
			(g.prototype._itemize = function (a) {
				for (var b = this._filterFindItemElements(a), c = this.constructor.Item, d = [], e = 0, f = b.length; f > e; e++) {
					var g = b[e],
						h = new c(g, this);
					d.push(h);
				}
				return d;
			}),
			(g.prototype._filterFindItemElements = function (a) {
				return e.filterFindElements(a, this.options.itemSelector);
			}),
			(g.prototype.getItemElements = function () {
				for (var a = [], b = 0, c = this.items.length; c > b; b++) a.push(this.items[b].element);
				return a;
			}),
			(g.prototype.layout = function () {
				this._resetLayout(), this._manageStamps();
				var a = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
				this.layoutItems(this.items, a), (this._isLayoutInited = !0);
			}),
			(g.prototype._init = g.prototype.layout),
			(g.prototype._resetLayout = function () {
				this.getSize();
			}),
			(g.prototype.getSize = function () {
				this.size = d(this.element);
			}),
			(g.prototype._getMeasurement = function (a, b) {
				var c,
					f = this.options[a];
				f
					? ('string' == typeof f ? (c = this.element.querySelector(f)) : e.isElement(f) && (c = f), (this[a] = c ? d(c)[b] : f))
					: (this[a] = 0);
			}),
			(g.prototype.layoutItems = function (a, b) {
				(a = this._getItemsForLayout(a)), this._layoutItems(a, b), this._postLayout();
			}),
			(g.prototype._getItemsForLayout = function (a) {
				for (var b = [], c = 0, d = a.length; d > c; c++) {
					var e = a[c];
					e.isIgnored || b.push(e);
				}
				return b;
			}),
			(g.prototype._layoutItems = function (a, b) {
				if ((this._emitCompleteOnItems('layout', a), a && a.length)) {
					for (var c = [], d = 0, e = a.length; e > d; d++) {
						var f = a[d],
							g = this._getItemLayoutPosition(f);
						(g.item = f), (g.isInstant = b || f.isLayoutInstant), c.push(g);
					}
					this._processLayoutQueue(c);
				}
			}),
			(g.prototype._getItemLayoutPosition = function () {
				return { x: 0, y: 0 };
			}),
			(g.prototype._processLayoutQueue = function (a) {
				for (var b = 0, c = a.length; c > b; b++) {
					var d = a[b];
					this._positionItem(d.item, d.x, d.y, d.isInstant);
				}
			}),
			(g.prototype._positionItem = function (a, b, c, d) {
				d ? a.goTo(b, c) : a.moveTo(b, c);
			}),
			(g.prototype._postLayout = function () {
				this.resizeContainer();
			}),
			(g.prototype.resizeContainer = function () {
				if (this.options.isResizingContainer) {
					var a = this._getContainerSize();
					a && (this._setContainerMeasure(a.width, !0), this._setContainerMeasure(a.height, !1));
				}
			}),
			(g.prototype._getContainerSize = j),
			(g.prototype._setContainerMeasure = function (a, b) {
				if (void 0 !== a) {
					var c = this.size;
					c.isBorderBox &&
						(a += b
							? c.paddingLeft + c.paddingRight + c.borderLeftWidth + c.borderRightWidth
							: c.paddingBottom + c.paddingTop + c.borderTopWidth + c.borderBottomWidth),
						(a = Math.max(a, 0)),
						(this.element.style[b ? 'width' : 'height'] = a + 'px');
				}
			}),
			(g.prototype._emitCompleteOnItems = function (a, b) {
				function c() {
					e.dispatchEvent(a + 'Complete', null, [b]);
				}
				function d() {
					g++, g === f && c();
				}
				var e = this,
					f = b.length;
				if (!b || !f) return void c();
				for (var g = 0, h = 0, i = b.length; i > h; h++) {
					var j = b[h];
					j.once(a, d);
				}
			}),
			(g.prototype.dispatchEvent = function (a, b, c) {
				var d = b ? [b].concat(c) : c;
				if ((this.emitEvent(a, d), i))
					if (((this.$element = this.$element || i(this.element)), b)) {
						var e = i.Event(b);
						(e.type = a), this.$element.trigger(e, c);
					} else this.$element.trigger(a, c);
			}),
			(g.prototype.ignore = function (a) {
				var b = this.getItem(a);
				b && (b.isIgnored = !0);
			}),
			(g.prototype.unignore = function (a) {
				var b = this.getItem(a);
				b && delete b.isIgnored;
			}),
			(g.prototype.stamp = function (a) {
				if ((a = this._find(a))) {
					this.stamps = this.stamps.concat(a);
					for (var b = 0, c = a.length; c > b; b++) {
						var d = a[b];
						this.ignore(d);
					}
				}
			}),
			(g.prototype.unstamp = function (a) {
				if ((a = this._find(a)))
					for (var b = 0, c = a.length; c > b; b++) {
						var d = a[b];
						e.removeFrom(this.stamps, d), this.unignore(d);
					}
			}),
			(g.prototype._find = function (a) {
				return a ? ('string' == typeof a && (a = this.element.querySelectorAll(a)), (a = e.makeArray(a))) : void 0;
			}),
			(g.prototype._manageStamps = function () {
				if (this.stamps && this.stamps.length) {
					this._getBoundingRect();
					for (var a = 0, b = this.stamps.length; b > a; a++) {
						var c = this.stamps[a];
						this._manageStamp(c);
					}
				}
			}),
			(g.prototype._getBoundingRect = function () {
				var a = this.element.getBoundingClientRect(),
					b = this.size;
				this._boundingRect = {
					left: a.left + b.paddingLeft + b.borderLeftWidth,
					top: a.top + b.paddingTop + b.borderTopWidth,
					right: a.right - (b.paddingRight + b.borderRightWidth),
					bottom: a.bottom - (b.paddingBottom + b.borderBottomWidth),
				};
			}),
			(g.prototype._manageStamp = j),
			(g.prototype._getElementOffset = function (a) {
				var b = a.getBoundingClientRect(),
					c = this._boundingRect,
					e = d(a),
					f = {
						left: b.left - c.left - e.marginLeft,
						top: b.top - c.top - e.marginTop,
						right: c.right - b.right - e.marginRight,
						bottom: c.bottom - b.bottom - e.marginBottom,
					};
				return f;
			}),
			(g.prototype.handleEvent = function (a) {
				var b = 'on' + a.type;
				this[b] && this[b](a);
			}),
			(g.prototype.bindResize = function () {
				this.isResizeBound || (b.bind(a, 'resize', this), (this.isResizeBound = !0));
			}),
			(g.prototype.unbindResize = function () {
				this.isResizeBound && b.unbind(a, 'resize', this), (this.isResizeBound = !1);
			}),
			(g.prototype.onresize = function () {
				function a() {
					b.resize(), delete b.resizeTimeout;
				}
				this.resizeTimeout && clearTimeout(this.resizeTimeout);
				var b = this;
				this.resizeTimeout = setTimeout(a, 100);
			}),
			(g.prototype.resize = function () {
				this.isResizeBound && this.needsResizeLayout() && this.layout();
			}),
			(g.prototype.needsResizeLayout = function () {
				var a = d(this.element),
					b = this.size && a;
				return b && a.innerWidth !== this.size.innerWidth;
			}),
			(g.prototype.addItems = function (a) {
				var b = this._itemize(a);
				return b.length && (this.items = this.items.concat(b)), b;
			}),
			(g.prototype.appended = function (a) {
				var b = this.addItems(a);
				b.length && (this.layoutItems(b, !0), this.reveal(b));
			}),
			(g.prototype.prepended = function (a) {
				var b = this._itemize(a);
				if (b.length) {
					var c = this.items.slice(0);
					(this.items = b.concat(c)),
						this._resetLayout(),
						this._manageStamps(),
						this.layoutItems(b, !0),
						this.reveal(b),
						this.layoutItems(c);
				}
			}),
			(g.prototype.reveal = function (a) {
				this._emitCompleteOnItems('reveal', a);
				for (var b = a && a.length, c = 0; b && b > c; c++) {
					var d = a[c];
					d.reveal();
				}
			}),
			(g.prototype.hide = function (a) {
				this._emitCompleteOnItems('hide', a);
				for (var b = a && a.length, c = 0; b && b > c; c++) {
					var d = a[c];
					d.hide();
				}
			}),
			(g.prototype.revealItemElements = function (a) {
				var b = this.getItems(a);
				this.reveal(b);
			}),
			(g.prototype.hideItemElements = function (a) {
				var b = this.getItems(a);
				this.hide(b);
			}),
			(g.prototype.getItem = function (a) {
				for (var b = 0, c = this.items.length; c > b; b++) {
					var d = this.items[b];
					if (d.element === a) return d;
				}
			}),
			(g.prototype.getItems = function (a) {
				a = e.makeArray(a);
				for (var b = [], c = 0, d = a.length; d > c; c++) {
					var f = a[c],
						g = this.getItem(f);
					g && b.push(g);
				}
				return b;
			}),
			(g.prototype.remove = function (a) {
				var b = this.getItems(a);
				if ((this._emitCompleteOnItems('remove', b), b && b.length))
					for (var c = 0, d = b.length; d > c; c++) {
						var f = b[c];
						f.remove(), e.removeFrom(this.items, f);
					}
			}),
			(g.prototype.destroy = function () {
				var a = this.element.style;
				(a.height = ''), (a.position = ''), (a.width = '');
				for (var b = 0, c = this.items.length; c > b; b++) {
					var d = this.items[b];
					d.destroy();
				}
				this.unbindResize();
				var e = this.element.outlayerGUID;
				delete l[e], delete this.element.outlayerGUID, i && i.removeData(this.element, this.constructor.namespace);
			}),
			(g.data = function (a) {
				a = e.getQueryElement(a);
				var b = a && a.outlayerGUID;
				return b && l[b];
			}),
			(g.create = function (a, b) {
				function c() {
					g.apply(this, arguments);
				}
				return (
					Object.create ? (c.prototype = Object.create(g.prototype)) : e.extend(c.prototype, g.prototype),
					(c.prototype.constructor = c),
					(c.defaults = e.extend({}, g.defaults)),
					e.extend(c.defaults, b),
					(c.prototype.settings = {}),
					(c.namespace = a),
					(c.data = g.data),
					(c.Item = function () {
						f.apply(this, arguments);
					}),
					(c.Item.prototype = new f()),
					e.htmlInit(c, a),
					i && i.bridget && i.bridget(a, c),
					c
				);
			}),
			(g.Item = f),
			g
		);
	}),
	(function (a, b) {
		'use strict';
		'function' == typeof define && define.amd
			? define('isotope/js/item', ['outlayer/outlayer'], b)
			: 'object' == typeof exports
			? (module.exports = b(require('outlayer')))
			: ((a.Isotope = a.Isotope || {}), (a.Isotope.Item = b(a.Outlayer)));
	})(window, function (a) {
		'use strict';
		function b() {
			a.Item.apply(this, arguments);
		}
		(b.prototype = new a.Item()),
			(b.prototype._create = function () {
				(this.id = this.layout.itemGUID++), a.Item.prototype._create.call(this), (this.sortData = {});
			}),
			(b.prototype.updateSortData = function () {
				if (!this.isIgnored) {
					(this.sortData.id = this.id), (this.sortData['original-order'] = this.id), (this.sortData.random = Math.random());
					var a = this.layout.options.getSortData,
						b = this.layout._sorters;
					for (var c in a) {
						var d = b[c];
						this.sortData[c] = d(this.element, this);
					}
				}
			});
		var c = b.prototype.destroy;
		return (
			(b.prototype.destroy = function () {
				c.apply(this, arguments), this.css({ display: '' });
			}),
			b
		);
	}),
	(function (a, b) {
		'use strict';
		'function' == typeof define && define.amd
			? define('isotope/js/layout-mode', ['get-size/get-size', 'outlayer/outlayer'], b)
			: 'object' == typeof exports
			? (module.exports = b(require('get-size'), require('outlayer')))
			: ((a.Isotope = a.Isotope || {}), (a.Isotope.LayoutMode = b(a.getSize, a.Outlayer)));
	})(window, function (a, b) {
		'use strict';
		function c(a) {
			(this.isotope = a),
				a && ((this.options = a.options[this.namespace]), (this.element = a.element), (this.items = a.filteredItems), (this.size = a.size));
		}
		return (
			(function () {
				function a(a) {
					return function () {
						return b.prototype[a].apply(this.isotope, arguments);
					};
				}
				for (
					var d = ['_resetLayout', '_getItemLayoutPosition', '_manageStamp', '_getContainerSize', '_getElementOffset', 'needsResizeLayout'],
						e = 0,
						f = d.length;
					f > e;
					e++
				) {
					var g = d[e];
					c.prototype[g] = a(g);
				}
			})(),
			(c.prototype.needsVerticalResizeLayout = function () {
				var b = a(this.isotope.element),
					c = this.isotope.size && b;
				return c && b.innerHeight != this.isotope.size.innerHeight;
			}),
			(c.prototype._getMeasurement = function () {
				this.isotope._getMeasurement.apply(this, arguments);
			}),
			(c.prototype.getColumnWidth = function () {
				this.getSegmentSize('column', 'Width');
			}),
			(c.prototype.getRowHeight = function () {
				this.getSegmentSize('row', 'Height');
			}),
			(c.prototype.getSegmentSize = function (a, b) {
				var c = a + b,
					d = 'outer' + b;
				if ((this._getMeasurement(c, d), !this[c])) {
					var e = this.getFirstItemSize();
					this[c] = (e && e[d]) || this.isotope.size['inner' + b];
				}
			}),
			(c.prototype.getFirstItemSize = function () {
				var b = this.isotope.filteredItems[0];
				return b && b.element && a(b.element);
			}),
			(c.prototype.layout = function () {
				this.isotope.layout.apply(this.isotope, arguments);
			}),
			(c.prototype.getSize = function () {
				this.isotope.getSize(), (this.size = this.isotope.size);
			}),
			(c.modes = {}),
			(c.create = function (a, b) {
				function d() {
					c.apply(this, arguments);
				}
				return (d.prototype = new c()), b && (d.options = b), (d.prototype.namespace = a), (c.modes[a] = d), d;
			}),
			c
		);
	}),
	(function (a, b) {
		'use strict';
		'function' == typeof define && define.amd
			? define('masonry/masonry', ['outlayer/outlayer', 'get-size/get-size', 'fizzy-ui-utils/utils'], b)
			: 'object' == typeof exports
			? (module.exports = b(require('outlayer'), require('get-size'), require('fizzy-ui-utils')))
			: (a.Masonry = b(a.Outlayer, a.getSize, a.fizzyUIUtils));
	})(window, function (a, b, c) {
		var d = a.create('masonry');
		return (
			(d.prototype._resetLayout = function () {
				this.getSize(),
					this._getMeasurement('columnWidth', 'outerWidth'),
					this._getMeasurement('gutter', 'outerWidth'),
					this.measureColumns();
				var a = this.cols;
				for (this.colYs = []; a--; ) this.colYs.push(0);
				this.maxY = 0;
			}),
			(d.prototype.measureColumns = function () {
				if ((this.getContainerWidth(), !this.columnWidth)) {
					var a = this.items[0],
						c = a && a.element;
					this.columnWidth = (c && b(c).outerWidth) || this.containerWidth;
				}
				var d = (this.columnWidth += this.gutter),
					e = this.containerWidth + this.gutter,
					f = e / d,
					g = d - (e % d),
					h = g && 1 > g ? 'round' : 'floor';
				(f = Math[h](f)), (this.cols = Math.max(f, 1));
			}),
			(d.prototype.getContainerWidth = function () {
				var a = this.options.isFitWidth ? this.element.parentNode : this.element,
					c = b(a);
				this.containerWidth = c && c.innerWidth;
			}),
			(d.prototype._getItemLayoutPosition = function (a) {
				a.getSize();
				var b = a.size.outerWidth % this.columnWidth,
					d = b && 1 > b ? 'round' : 'ceil',
					e = Math[d](a.size.outerWidth / this.columnWidth);
				e = Math.min(e, this.cols);
				for (
					var f = this._getColGroup(e),
						g = Math.min.apply(Math, f),
						h = c.indexOf(f, g),
						i = { x: this.columnWidth * h, y: g },
						j = g + a.size.outerHeight,
						k = this.cols + 1 - f.length,
						l = 0;
					k > l;
					l++
				)
					this.colYs[h + l] = j;
				return i;
			}),
			(d.prototype._getColGroup = function (a) {
				if (2 > a) return this.colYs;
				for (var b = [], c = this.cols + 1 - a, d = 0; c > d; d++) {
					var e = this.colYs.slice(d, d + a);
					b[d] = Math.max.apply(Math, e);
				}
				return b;
			}),
			(d.prototype._manageStamp = function (a) {
				var c = b(a),
					d = this._getElementOffset(a),
					e = this.options.isOriginLeft ? d.left : d.right,
					f = e + c.outerWidth,
					g = Math.floor(e / this.columnWidth);
				g = Math.max(0, g);
				var h = Math.floor(f / this.columnWidth);
				(h -= f % this.columnWidth ? 0 : 1), (h = Math.min(this.cols - 1, h));
				for (var i = (this.options.isOriginTop ? d.top : d.bottom) + c.outerHeight, j = g; h >= j; j++)
					this.colYs[j] = Math.max(i, this.colYs[j]);
			}),
			(d.prototype._getContainerSize = function () {
				this.maxY = Math.max.apply(Math, this.colYs);
				var a = { height: this.maxY };
				return this.options.isFitWidth && (a.width = this._getContainerFitWidth()), a;
			}),
			(d.prototype._getContainerFitWidth = function () {
				for (var a = 0, b = this.cols; --b && 0 === this.colYs[b]; ) a++;
				return (this.cols - a) * this.columnWidth - this.gutter;
			}),
			(d.prototype.needsResizeLayout = function () {
				var a = this.containerWidth;
				return this.getContainerWidth(), a !== this.containerWidth;
			}),
			d
		);
	}),
	(function (a, b) {
		'use strict';
		'function' == typeof define && define.amd
			? define('isotope/js/layout-modes/masonry', ['../layout-mode', 'masonry/masonry'], b)
			: 'object' == typeof exports
			? (module.exports = b(require('../layout-mode'), require('masonry-layout')))
			: b(a.Isotope.LayoutMode, a.Masonry);
	})(window, function (a, b) {
		'use strict';
		function c(a, b) {
			for (var c in b) a[c] = b[c];
			return a;
		}
		var d = a.create('masonry'),
			e = d.prototype._getElementOffset,
			f = d.prototype.layout,
			g = d.prototype._getMeasurement;
		c(d.prototype, b.prototype), (d.prototype._getElementOffset = e), (d.prototype.layout = f), (d.prototype._getMeasurement = g);
		var h = d.prototype.measureColumns;
		d.prototype.measureColumns = function () {
			(this.items = this.isotope.filteredItems), h.call(this);
		};
		var i = d.prototype._manageStamp;
		return (
			(d.prototype._manageStamp = function () {
				(this.options.isOriginLeft = this.isotope.options.isOriginLeft),
					(this.options.isOriginTop = this.isotope.options.isOriginTop),
					i.apply(this, arguments);
			}),
			d
		);
	}),
	(function (a, b) {
		'use strict';
		'function' == typeof define && define.amd
			? define('isotope/js/layout-modes/fit-rows', ['../layout-mode'], b)
			: 'object' == typeof exports
			? (module.exports = b(require('../layout-mode')))
			: b(a.Isotope.LayoutMode);
	})(window, function (a) {
		'use strict';
		var b = a.create('fitRows');
		return (
			(b.prototype._resetLayout = function () {
				(this.x = 0), (this.y = 0), (this.maxY = 0), this._getMeasurement('gutter', 'outerWidth');
			}),
			(b.prototype._getItemLayoutPosition = function (a) {
				a.getSize();
				var b = a.size.outerWidth + this.gutter,
					c = this.isotope.size.innerWidth + this.gutter;
				0 !== this.x && b + this.x > c && ((this.x = 0), (this.y = this.maxY));
				var d = { x: this.x, y: this.y };
				return (this.maxY = Math.max(this.maxY, this.y + a.size.outerHeight)), (this.x += b), d;
			}),
			(b.prototype._getContainerSize = function () {
				return { height: this.maxY };
			}),
			b
		);
	}),
	(function (a, b) {
		'use strict';
		'function' == typeof define && define.amd
			? define('isotope/js/layout-modes/vertical', ['../layout-mode'], b)
			: 'object' == typeof exports
			? (module.exports = b(require('../layout-mode')))
			: b(a.Isotope.LayoutMode);
	})(window, function (a) {
		'use strict';
		var b = a.create('vertical', { horizontalAlignment: 0 });
		return (
			(b.prototype._resetLayout = function () {
				this.y = 0;
			}),
			(b.prototype._getItemLayoutPosition = function (a) {
				a.getSize();
				var b = (this.isotope.size.innerWidth - a.size.outerWidth) * this.options.horizontalAlignment,
					c = this.y;
				return (this.y += a.size.outerHeight), { x: b, y: c };
			}),
			(b.prototype._getContainerSize = function () {
				return { height: this.y };
			}),
			b
		);
	}),
	(function (a, b) {
		'use strict';
		'function' == typeof define && define.amd
			? define(
					[
						'outlayer/outlayer',
						'get-size/get-size',
						'matches-selector/matches-selector',
						'fizzy-ui-utils/utils',
						'isotope/js/item',
						'isotope/js/layout-mode',
						'isotope/js/layout-modes/masonry',
						'isotope/js/layout-modes/fit-rows',
						'isotope/js/layout-modes/vertical',
					],
					function (c, d, e, f, g, h) {
						return b(a, c, d, e, f, g, h);
					}
			  )
			: 'object' == typeof exports
			? (module.exports = b(
					a,
					require('outlayer'),
					require('get-size'),
					require('desandro-matches-selector'),
					require('fizzy-ui-utils'),
					require('./item'),
					require('./layout-mode'),
					require('./layout-modes/masonry'),
					require('./layout-modes/fit-rows'),
					require('./layout-modes/vertical')
			  ))
			: (a.Isotope = b(a, a.Outlayer, a.getSize, a.matchesSelector, a.fizzyUIUtils, a.Isotope.Item, a.Isotope.LayoutMode));
	})(window, function (a, b, c, d, e, f, g) {
		function h(a, b) {
			return function (c, d) {
				for (var e = 0, f = a.length; f > e; e++) {
					var g = a[e],
						h = c.sortData[g],
						i = d.sortData[g];
					if (h > i || i > h) {
						var j = void 0 !== b[g] ? b[g] : b,
							k = j ? 1 : -1;
						return (h > i ? 1 : -1) * k;
					}
				}
				return 0;
			};
		}
		var i = a.jQuery,
			j = String.prototype.trim
				? function (a) {
						return a.trim();
				  }
				: function (a) {
						return a.replace(/^\s+|\s+$/g, '');
				  },
			k = document.documentElement,
			l = k.textContent
				? function (a) {
						return a.textContent;
				  }
				: function (a) {
						return a.innerText;
				  },
			m = b.create('isotope', { layoutMode: 'masonry', isJQueryFiltering: !0, sortAscending: !0 });
		(m.Item = f),
			(m.LayoutMode = g),
			(m.prototype._create = function () {
				(this.itemGUID = 0),
					(this._sorters = {}),
					this._getSorters(),
					b.prototype._create.call(this),
					(this.modes = {}),
					(this.filteredItems = this.items),
					(this.sortHistory = ['original-order']);
				for (var a in g.modes) this._initLayoutMode(a);
			}),
			(m.prototype.reloadItems = function () {
				(this.itemGUID = 0), b.prototype.reloadItems.call(this);
			}),
			(m.prototype._itemize = function () {
				for (var a = b.prototype._itemize.apply(this, arguments), c = 0, d = a.length; d > c; c++) {
					var e = a[c];
					e.id = this.itemGUID++;
				}
				return this._updateItemsSortData(a), a;
			}),
			(m.prototype._initLayoutMode = function (a) {
				var b = g.modes[a],
					c = this.options[a] || {};
				(this.options[a] = b.options ? e.extend(b.options, c) : c), (this.modes[a] = new b(this));
			}),
			(m.prototype.layout = function () {
				return !this._isLayoutInited && this.options.isInitLayout ? void this.arrange() : void this._layout();
			}),
			(m.prototype._layout = function () {
				var a = this._getIsInstant();
				this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, a), (this._isLayoutInited = !0);
			}),
			(m.prototype.arrange = function (a) {
				function b() {
					d.reveal(c.needReveal), d.hide(c.needHide);
				}
				this.option(a), this._getIsInstant();
				var c = this._filter(this.items);
				this.filteredItems = c.matches;
				var d = this;
				this._bindArrangeComplete(), this._isInstant ? this._noTransition(b) : b(), this._sort(), this._layout();
			}),
			(m.prototype._init = m.prototype.arrange),
			(m.prototype._getIsInstant = function () {
				var a = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
				return (this._isInstant = a), a;
			}),
			(m.prototype._bindArrangeComplete = function () {
				function a() {
					b && c && d && e.dispatchEvent('arrangeComplete', null, [e.filteredItems]);
				}
				var b,
					c,
					d,
					e = this;
				this.once('layoutComplete', function () {
					(b = !0), a();
				}),
					this.once('hideComplete', function () {
						(c = !0), a();
					}),
					this.once('revealComplete', function () {
						(d = !0), a();
					});
			}),
			(m.prototype._filter = function (a) {
				var b = this.options.filter;
				b = b || '*';
				for (var c = [], d = [], e = [], f = this._getFilterTest(b), g = 0, h = a.length; h > g; g++) {
					var i = a[g];
					if (!i.isIgnored) {
						var j = f(i);
						j && c.push(i), j && i.isHidden ? d.push(i) : j || i.isHidden || e.push(i);
					}
				}
				return { matches: c, needReveal: d, needHide: e };
			}),
			(m.prototype._getFilterTest = function (a) {
				return i && this.options.isJQueryFiltering
					? function (b) {
							return i(b.element).is(a);
					  }
					: 'function' == typeof a
					? function (b) {
							return a(b.element);
					  }
					: function (b) {
							return d(b.element, a);
					  };
			}),
			(m.prototype.updateSortData = function (a) {
				var b;
				a ? ((a = e.makeArray(a)), (b = this.getItems(a))) : (b = this.items), this._getSorters(), this._updateItemsSortData(b);
			}),
			(m.prototype._getSorters = function () {
				var a = this.options.getSortData;
				for (var b in a) {
					var c = a[b];
					this._sorters[b] = n(c);
				}
			}),
			(m.prototype._updateItemsSortData = function (a) {
				for (var b = a && a.length, c = 0; b && b > c; c++) {
					var d = a[c];
					d.updateSortData();
				}
			});
		var n = (function () {
			function a(a) {
				if ('string' != typeof a) return a;
				var c = j(a).split(' '),
					d = c[0],
					e = d.match(/^\[(.+)\]$/),
					f = e && e[1],
					g = b(f, d),
					h = m.sortDataParsers[c[1]];
				return (a = h
					? function (a) {
							return a && h(g(a));
					  }
					: function (a) {
							return a && g(a);
					  });
			}
			function b(a, b) {
				var c;
				return (c = a
					? function (b) {
							return b.getAttribute(a);
					  }
					: function (a) {
							var c = a.querySelector(b);
							return c && l(c);
					  });
			}
			return a;
		})();
		(m.sortDataParsers = {
			parseInt: function (a) {
				return parseInt(a, 10);
			},
			parseFloat: function (a) {
				return parseFloat(a);
			},
		}),
			(m.prototype._sort = function () {
				var a = this.options.sortBy;
				if (a) {
					var b = [].concat.apply(a, this.sortHistory),
						c = h(b, this.options.sortAscending);
					this.filteredItems.sort(c), a != this.sortHistory[0] && this.sortHistory.unshift(a);
				}
			}),
			(m.prototype._mode = function () {
				var a = this.options.layoutMode,
					b = this.modes[a];
				if (!b) throw new Error('No layout mode: ' + a);
				return (b.options = this.options[a]), b;
			}),
			(m.prototype._resetLayout = function () {
				b.prototype._resetLayout.call(this), this._mode()._resetLayout();
			}),
			(m.prototype._getItemLayoutPosition = function (a) {
				return this._mode()._getItemLayoutPosition(a);
			}),
			(m.prototype._manageStamp = function (a) {
				this._mode()._manageStamp(a);
			}),
			(m.prototype._getContainerSize = function () {
				return this._mode()._getContainerSize();
			}),
			(m.prototype.needsResizeLayout = function () {
				return this._mode().needsResizeLayout();
			}),
			(m.prototype.appended = function (a) {
				var b = this.addItems(a);
				if (b.length) {
					var c = this._filterRevealAdded(b);
					this.filteredItems = this.filteredItems.concat(c);
				}
			}),
			(m.prototype.prepended = function (a) {
				var b = this._itemize(a);
				if (b.length) {
					this._resetLayout(), this._manageStamps();
					var c = this._filterRevealAdded(b);
					this.layoutItems(this.filteredItems), (this.filteredItems = c.concat(this.filteredItems)), (this.items = b.concat(this.items));
				}
			}),
			(m.prototype._filterRevealAdded = function (a) {
				var b = this._filter(a);
				return this.hide(b.needHide), this.reveal(b.matches), this.layoutItems(b.matches, !0), b.matches;
			}),
			(m.prototype.insert = function (a) {
				var b = this.addItems(a);
				if (b.length) {
					var c,
						d,
						e = b.length;
					for (c = 0; e > c; c++) (d = b[c]), this.element.appendChild(d.element);
					var f = this._filter(b).matches;
					for (c = 0; e > c; c++) b[c].isLayoutInstant = !0;
					for (this.arrange(), c = 0; e > c; c++) delete b[c].isLayoutInstant;
					this.reveal(f);
				}
			});
		var o = m.prototype.remove;
		return (
			(m.prototype.remove = function (a) {
				a = e.makeArray(a);
				var b = this.getItems(a);
				o.call(this, a);
				var c = b && b.length;
				if (c)
					for (var d = 0; c > d; d++) {
						var f = b[d];
						e.removeFrom(this.filteredItems, f);
					}
			}),
			(m.prototype.shuffle = function () {
				for (var a = 0, b = this.items.length; b > a; a++) {
					var c = this.items[a];
					c.sortData.random = Math.random();
				}
				(this.options.sortBy = 'random'), this._sort(), this._layout();
			}),
			(m.prototype._noTransition = function (a) {
				var b = this.options.transitionDuration;
				this.options.transitionDuration = 0;
				var c = a.call(this);
				return (this.options.transitionDuration = b), c;
			}),
			(m.prototype.getFilteredItemElements = function () {
				for (var a = [], b = 0, c = this.filteredItems.length; c > b; b++) a.push(this.filteredItems[b].element);
				return a;
			}),
			m
		);
	});

/*!
 * tabset plugins
 */
!(function (t, s) {
	'use strict';
	function a(t, s) {
		(this.$holder = t), (this.options = s), this.init();
	}
	(a.prototype = {
		init: function () {
			(this.$tabLinks = this.$holder.find(this.options.tabLinks)),
				this.setStartActiveIndex(),
				this.setActiveTab(),
				this.options.autoHeight && (this.$tabHolder = t(this.$tabLinks.eq(0).attr(this.options.attrib)).parent());
		},
		setStartActiveIndex: function () {
			var t,
				s = this.getClassTarget(this.$tabLinks),
				a = s.filter('.' + this.options.activeClass),
				i = this.$tabLinks.filter('[' + this.options.attrib + '="' + location.hash + '"]');
			this.options.checkHash && i.length && (a = i),
				(t = s.index(a)),
				(this.activeTabIndex = this.prevTabIndex = -1 === t ? (this.options.defaultTab ? 0 : null) : t);
		},
		setActiveTab: function () {
			var s = this;
			this.$tabLinks.each(function (a, i) {
				var e = t(i),
					n = s.getClassTarget(e),
					o = t(e.attr(s.options.attrib));
				a !== s.activeTabIndex
					? (n.removeClass(s.options.activeClass), o.addClass(s.options.tabHiddenClass).removeClass(s.options.activeClass))
					: (n.addClass(s.options.activeClass), o.removeClass(s.options.tabHiddenClass).addClass(s.options.activeClass)),
					s.attachTabLink(e, a);
			});
		},
		attachTabLink: function (t, s) {
			var a = this;
			t.on(this.options.event + '.tabset', function (t) {
				t.preventDefault(), a.activeTabIndex === a.prevTabIndex && a.activeTabIndex !== s && ((a.activeTabIndex = s), a.switchTabs());
			});
		},
		resizeHolder: function (t) {
			var s = this;
			t
				? (this.$tabHolder.height(t),
				  setTimeout(function () {
						s.$tabHolder.addClass('transition');
				  }, 10))
				: s.$tabHolder.removeClass('transition').height('');
		},
		switchTabs: function () {
			var t = this,
				s = this.$tabLinks.eq(this.prevTabIndex),
				a = this.$tabLinks.eq(this.activeTabIndex),
				i = this.getTab(s),
				e = this.getTab(a);
			i.removeClass(this.options.activeClass),
				t.haveTabHolder() && this.resizeHolder(i.outerHeight()),
				setTimeout(
					function () {
						t.getClassTarget(s).removeClass(t.options.activeClass),
							i.addClass(t.options.tabHiddenClass),
							e.removeClass(t.options.tabHiddenClass).addClass(t.options.activeClass),
							t.getClassTarget(a).addClass(t.options.activeClass),
							t.haveTabHolder()
								? (t.resizeHolder(e.outerHeight()),
								  setTimeout(function () {
										t.resizeHolder(), (t.prevTabIndex = t.activeTabIndex);
								  }, t.options.animSpeed))
								: (t.prevTabIndex = t.activeTabIndex);
					},
					this.options.autoHeight ? this.options.animSpeed : 1
				);
		},
		getClassTarget: function (t) {
			return this.options.addToParent ? t.parent() : t;
		},
		getActiveTab: function () {
			return this.getTab(this.$tabLinks.eq(this.activeTabIndex));
		},
		getTab: function (s) {
			return t(s.attr(this.options.attrib));
		},
		haveTabHolder: function () {
			return this.$tabHolder && this.$tabHolder.length;
		},
		destroy: function () {
			var s = this;
			this.$tabLinks.off('.tabset').each(function () {
				var a = t(this);
				s.getClassTarget(a).removeClass(s.options.activeClass),
					t(a.attr(s.options.attrib)).removeClass(s.options.activeClass + ' ' + s.options.tabHiddenClass);
			}),
				this.$holder.removeData('Tabset');
		},
	}),
		(t.fn.tabset = function (s) {
			return (
				(s = t.extend(
					{
						activeClass: 'active',
						addToParent: !1,
						autoHeight: !1,
						checkHash: !1,
						defaultTab: !0,
						animSpeed: 500,
						tabLinks: 'a',
						attrib: 'href',
						event: 'click',
						tabHiddenClass: 'js-tab-hidden',
					},
					s
				)),
				(s.autoHeight = s.autoHeight && t.support.opacity),
				this.each(function () {
					var i = t(this);
					i.data('Tabset') || i.data('Tabset', new a(i, s));
				})
			);
		});
})(jQuery, jQuery(window));

/* == malihu jquery custom scrollbar plugin == Version: 3.1.4, License: MIT License (MIT) */
!(function (e) {
	'undefined' != typeof module && module.exports ? (module.exports = e) : e(jQuery, window, document);
})(function (e) {
	!(function (t) {
		var o = 'function' == typeof define && define.amd,
			a = 'undefined' != typeof module && module.exports,
			n = 'https:' == document.location.protocol ? 'https:' : 'http:',
			i = 'cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js';
		o ||
			(a
				? require('jquery-mousewheel')(e)
				: e.event.special.mousewheel || e('head').append(decodeURI('%3Cscript src=' + n + '//' + i + '%3E%3C/script%3E'))),
			t();
	})(function () {
		var t,
			o = 'mCustomScrollbar',
			a = 'mCS',
			n = '.mCustomScrollbar',
			i = {
				setTop: 0,
				setLeft: 0,
				axis: 'y',
				scrollbarPosition: 'inside',
				scrollInertia: 950,
				autoDraggerLength: !0,
				alwaysShowScrollbar: 0,
				snapOffset: 0,
				mouseWheel: {
					enable: !0,
					scrollAmount: 'auto',
					axis: 'y',
					deltaFactor: 'auto',
					disableOver: ['select', 'option', 'keygen', 'datalist', 'textarea'],
				},
				scrollButtons: { scrollType: 'stepless', scrollAmount: 'auto' },
				keyboard: { enable: !0, scrollType: 'stepless', scrollAmount: 'auto' },
				contentTouchScroll: 25,
				documentTouchScroll: !0,
				advanced: {
					autoScrollOnFocus: "input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
					updateOnContentResize: !0,
					updateOnImageLoad: 'auto',
					autoUpdateTimeout: 60,
				},
				theme: 'light',
				callbacks: { onTotalScrollOffset: 0, onTotalScrollBackOffset: 0, alwaysTriggerOffsets: !0 },
			},
			r = 0,
			l = {},
			s = window.attachEvent && !window.addEventListener ? 1 : 0,
			c = !1,
			d = [
				'mCSB_dragger_onDrag',
				'mCSB_scrollTools_onDrag',
				'mCS_img_loaded',
				'mCS_disabled',
				'mCS_destroyed',
				'mCS_no_scrollbar',
				'mCS-autoHide',
				'mCS-dir-rtl',
				'mCS_no_scrollbar_y',
				'mCS_no_scrollbar_x',
				'mCS_y_hidden',
				'mCS_x_hidden',
				'mCSB_draggerContainer',
				'mCSB_buttonUp',
				'mCSB_buttonDown',
				'mCSB_buttonLeft',
				'mCSB_buttonRight',
			],
			u = {
				init: function (t) {
					var t = e.extend(!0, {}, i, t),
						o = f.call(this);
					if (t.live) {
						var s = t.liveSelector || this.selector || n,
							c = e(s);
						if ('off' === t.live) return void m(s);
						l[s] = setTimeout(function () {
							c.mCustomScrollbar(t), 'once' === t.live && c.length && m(s);
						}, 500);
					} else m(s);
					return (
						(t.setWidth = t.set_width ? t.set_width : t.setWidth),
						(t.setHeight = t.set_height ? t.set_height : t.setHeight),
						(t.axis = t.horizontalScroll ? 'x' : p(t.axis)),
						(t.scrollInertia = t.scrollInertia > 0 && t.scrollInertia < 17 ? 17 : t.scrollInertia),
						'object' != typeof t.mouseWheel &&
							1 == t.mouseWheel &&
							(t.mouseWheel = {
								enable: !0,
								scrollAmount: 'auto',
								axis: 'y',
								preventDefault: !1,
								deltaFactor: 'auto',
								normalizeDelta: !1,
								invert: !1,
							}),
						(t.mouseWheel.scrollAmount = t.mouseWheelPixels ? t.mouseWheelPixels : t.mouseWheel.scrollAmount),
						(t.mouseWheel.normalizeDelta = t.advanced.normalizeMouseWheelDelta
							? t.advanced.normalizeMouseWheelDelta
							: t.mouseWheel.normalizeDelta),
						(t.scrollButtons.scrollType = g(t.scrollButtons.scrollType)),
						h(t),
						e(o).each(function () {
							var o = e(this);
							if (!o.data(a)) {
								o.data(a, {
									idx: ++r,
									opt: t,
									scrollRatio: { y: null, x: null },
									overflowed: null,
									contentReset: { y: null, x: null },
									bindEvents: !1,
									tweenRunning: !1,
									sequential: {},
									langDir: o.css('direction'),
									cbOffsets: null,
									trigger: null,
									poll: { size: { o: 0, n: 0 }, img: { o: 0, n: 0 }, change: { o: 0, n: 0 } },
								});
								var n = o.data(a),
									i = n.opt,
									l = o.data('mcs-axis'),
									s = o.data('mcs-scrollbar-position'),
									c = o.data('mcs-theme');
								l && (i.axis = l),
									s && (i.scrollbarPosition = s),
									c && ((i.theme = c), h(i)),
									v.call(this),
									n && i.callbacks.onCreate && 'function' == typeof i.callbacks.onCreate && i.callbacks.onCreate.call(this),
									e('#mCSB_' + n.idx + '_container img:not(.' + d[2] + ')').addClass(d[2]),
									u.update.call(null, o);
							}
						})
					);
				},
				update: function (t, o) {
					var n = t || f.call(this);
					return e(n).each(function () {
						var t = e(this);
						if (t.data(a)) {
							var n = t.data(a),
								i = n.opt,
								r = e('#mCSB_' + n.idx + '_container'),
								l = e('#mCSB_' + n.idx),
								s = [e('#mCSB_' + n.idx + '_dragger_vertical'), e('#mCSB_' + n.idx + '_dragger_horizontal')];
							if (!r.length) return;
							n.tweenRunning && V(t),
								o &&
									n &&
									i.callbacks.onBeforeUpdate &&
									'function' == typeof i.callbacks.onBeforeUpdate &&
									i.callbacks.onBeforeUpdate.call(this),
								t.hasClass(d[3]) && t.removeClass(d[3]),
								t.hasClass(d[4]) && t.removeClass(d[4]),
								l.css('max-height', 'none'),
								l.height() !== t.height() && l.css('max-height', t.height()),
								_.call(this),
								'y' === i.axis || i.advanced.autoExpandHorizontalScroll || r.css('width', x(r)),
								(n.overflowed = y.call(this)),
								M.call(this),
								i.autoDraggerLength && S.call(this),
								b.call(this),
								T.call(this);
							var c = [Math.abs(r[0].offsetTop), Math.abs(r[0].offsetLeft)];
							'x' !== i.axis &&
								(n.overflowed[0]
									? s[0].height() > s[0].parent().height()
										? B.call(this)
										: (Q(t, c[0].toString(), { dir: 'y', dur: 0, overwrite: 'none' }), (n.contentReset.y = null))
									: (B.call(this),
									  'y' === i.axis
											? k.call(this)
											: 'yx' === i.axis && n.overflowed[1] && Q(t, c[1].toString(), { dir: 'x', dur: 0, overwrite: 'none' }))),
								'y' !== i.axis &&
									(n.overflowed[1]
										? s[1].width() > s[1].parent().width()
											? B.call(this)
											: (Q(t, c[1].toString(), { dir: 'x', dur: 0, overwrite: 'none' }), (n.contentReset.x = null))
										: (B.call(this),
										  'x' === i.axis
												? k.call(this)
												: 'yx' === i.axis &&
												  n.overflowed[0] &&
												  Q(t, c[0].toString(), { dir: 'y', dur: 0, overwrite: 'none' }))),
								o &&
									n &&
									(2 === o && i.callbacks.onImageLoad && 'function' == typeof i.callbacks.onImageLoad
										? i.callbacks.onImageLoad.call(this)
										: 3 === o && i.callbacks.onSelectorChange && 'function' == typeof i.callbacks.onSelectorChange
										? i.callbacks.onSelectorChange.call(this)
										: i.callbacks.onUpdate && 'function' == typeof i.callbacks.onUpdate && i.callbacks.onUpdate.call(this)),
								X.call(this);
						}
					});
				},
				scrollTo: function (t, o) {
					if ('undefined' != typeof t && null != t) {
						var n = f.call(this);
						return e(n).each(function () {
							var n = e(this);
							if (n.data(a)) {
								var i = n.data(a),
									r = i.opt,
									l = {
										trigger: 'external',
										scrollInertia: r.scrollInertia,
										scrollEasing: 'mcsEaseInOut',
										moveDragger: !1,
										timeout: 60,
										callbacks: !0,
										onStart: !0,
										onUpdate: !0,
										onComplete: !0,
									},
									s = e.extend(!0, {}, l, o),
									c = Y.call(this, t),
									d = s.scrollInertia > 0 && s.scrollInertia < 17 ? 17 : s.scrollInertia;
								(c[0] = j.call(this, c[0], 'y')),
									(c[1] = j.call(this, c[1], 'x')),
									s.moveDragger && ((c[0] *= i.scrollRatio.y), (c[1] *= i.scrollRatio.x)),
									(s.dur = ae() ? 0 : d),
									setTimeout(function () {
										null !== c[0] &&
											'undefined' != typeof c[0] &&
											'x' !== r.axis &&
											i.overflowed[0] &&
											((s.dir = 'y'), (s.overwrite = 'all'), Q(n, c[0].toString(), s)),
											null !== c[1] &&
												'undefined' != typeof c[1] &&
												'y' !== r.axis &&
												i.overflowed[1] &&
												((s.dir = 'x'), (s.overwrite = 'none'), Q(n, c[1].toString(), s));
									}, s.timeout);
							}
						});
					}
				},
				stop: function () {
					var t = f.call(this);
					return e(t).each(function () {
						var t = e(this);
						t.data(a) && V(t);
					});
				},
				disable: function (t) {
					var o = f.call(this);
					return e(o).each(function () {
						var o = e(this);
						if (o.data(a)) {
							o.data(a);
							X.call(this, 'remove'), k.call(this), t && B.call(this), M.call(this, !0), o.addClass(d[3]);
						}
					});
				},
				destroy: function () {
					var t = f.call(this);
					return e(t).each(function () {
						var n = e(this);
						if (n.data(a)) {
							var i = n.data(a),
								r = i.opt,
								l = e('#mCSB_' + i.idx),
								s = e('#mCSB_' + i.idx + '_container'),
								c = e('.mCSB_' + i.idx + '_scrollbar');
							r.live && m(r.liveSelector || e(t).selector),
								X.call(this, 'remove'),
								k.call(this),
								B.call(this),
								n.removeData(a),
								Z(this, 'mcs'),
								c.remove(),
								s.find('img.' + d[2]).removeClass(d[2]),
								l.replaceWith(s.contents()),
								n.removeClass(o + ' _' + a + '_' + i.idx + ' ' + d[6] + ' ' + d[7] + ' ' + d[5] + ' ' + d[3]).addClass(d[4]);
						}
					});
				},
			},
			f = function () {
				return 'object' != typeof e(this) || e(this).length < 1 ? n : this;
			},
			h = function (t) {
				var o = ['rounded', 'rounded-dark', 'rounded-dots', 'rounded-dots-dark'],
					a = [
						'rounded-dots',
						'rounded-dots-dark',
						'3d',
						'3d-dark',
						'3d-thick',
						'3d-thick-dark',
						'inset',
						'inset-dark',
						'inset-2',
						'inset-2-dark',
						'inset-3',
						'inset-3-dark',
					],
					n = ['minimal', 'minimal-dark'],
					i = ['minimal', 'minimal-dark'],
					r = ['minimal', 'minimal-dark'];
				(t.autoDraggerLength = e.inArray(t.theme, o) > -1 ? !1 : t.autoDraggerLength),
					(t.autoExpandScrollbar = e.inArray(t.theme, a) > -1 ? !1 : t.autoExpandScrollbar),
					(t.scrollButtons.enable = e.inArray(t.theme, n) > -1 ? !1 : t.scrollButtons.enable),
					(t.autoHideScrollbar = e.inArray(t.theme, i) > -1 ? !0 : t.autoHideScrollbar),
					(t.scrollbarPosition = e.inArray(t.theme, r) > -1 ? 'outside' : t.scrollbarPosition);
			},
			m = function (e) {
				l[e] && (clearTimeout(l[e]), Z(l, e));
			},
			p = function (e) {
				return 'yx' === e || 'xy' === e || 'auto' === e ? 'yx' : 'x' === e || 'horizontal' === e ? 'x' : 'y';
			},
			g = function (e) {
				return 'stepped' === e || 'pixels' === e || 'step' === e || 'click' === e ? 'stepped' : 'stepless';
			},
			v = function () {
				var t = e(this),
					n = t.data(a),
					i = n.opt,
					r = i.autoExpandScrollbar ? ' ' + d[1] + '_expand' : '',
					l = [
						"<div id='mCSB_" +
							n.idx +
							"_scrollbar_vertical' class='mCSB_scrollTools mCSB_" +
							n.idx +
							'_scrollbar mCS-' +
							i.theme +
							' mCSB_scrollTools_vertical' +
							r +
							"'><div class='" +
							d[12] +
							"'><div id='mCSB_" +
							n.idx +
							"_dragger_vertical' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>",
						"<div id='mCSB_" +
							n.idx +
							"_scrollbar_horizontal' class='mCSB_scrollTools mCSB_" +
							n.idx +
							'_scrollbar mCS-' +
							i.theme +
							' mCSB_scrollTools_horizontal' +
							r +
							"'><div class='" +
							d[12] +
							"'><div id='mCSB_" +
							n.idx +
							"_dragger_horizontal' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>",
					],
					s = 'yx' === i.axis ? 'mCSB_vertical_horizontal' : 'x' === i.axis ? 'mCSB_horizontal' : 'mCSB_vertical',
					c = 'yx' === i.axis ? l[0] + l[1] : 'x' === i.axis ? l[1] : l[0],
					u = 'yx' === i.axis ? "<div id='mCSB_" + n.idx + "_container_wrapper' class='mCSB_container_wrapper' />" : '',
					f = i.autoHideScrollbar ? ' ' + d[6] : '',
					h = 'x' !== i.axis && 'rtl' === n.langDir ? ' ' + d[7] : '';
				i.setWidth && t.css('width', i.setWidth),
					i.setHeight && t.css('height', i.setHeight),
					(i.setLeft = 'y' !== i.axis && 'rtl' === n.langDir ? '989999px' : i.setLeft),
					t
						.addClass(o + ' _' + a + '_' + n.idx + f + h)
						.wrapInner(
							"<div id='mCSB_" +
								n.idx +
								"' class='mCustomScrollBox mCS-" +
								i.theme +
								' ' +
								s +
								"'><div id='mCSB_" +
								n.idx +
								"_container' class='mCSB_container' style='position:relative; top:" +
								i.setTop +
								'; left:' +
								i.setLeft +
								";' dir='" +
								n.langDir +
								"' /></div>"
						);
				var m = e('#mCSB_' + n.idx),
					p = e('#mCSB_' + n.idx + '_container');
				'y' === i.axis || i.advanced.autoExpandHorizontalScroll || p.css('width', x(p)),
					'outside' === i.scrollbarPosition
						? ('static' === t.css('position') && t.css('position', 'relative'),
						  t.css('overflow', 'visible'),
						  m.addClass('mCSB_outside').after(c))
						: (m.addClass('mCSB_inside').append(c), p.wrap(u)),
					w.call(this);
				var g = [e('#mCSB_' + n.idx + '_dragger_vertical'), e('#mCSB_' + n.idx + '_dragger_horizontal')];
				g[0].css('min-height', g[0].height()), g[1].css('min-width', g[1].width());
			},
			x = function (t) {
				var o = [
						t[0].scrollWidth,
						Math.max.apply(
							Math,
							t
								.children()
								.map(function () {
									return e(this).outerWidth(!0);
								})
								.get()
						),
					],
					a = t.parent().width();
				return o[0] > a ? o[0] : o[1] > a ? o[1] : '100%';
			},
			_ = function () {
				var t = e(this),
					o = t.data(a),
					n = o.opt,
					i = e('#mCSB_' + o.idx + '_container');
				if (n.advanced.autoExpandHorizontalScroll && 'y' !== n.axis) {
					i.css({ width: 'auto', 'min-width': 0, 'overflow-x': 'scroll' });
					var r = Math.ceil(i[0].scrollWidth);
					3 === n.advanced.autoExpandHorizontalScroll || (2 !== n.advanced.autoExpandHorizontalScroll && r > i.parent().width())
						? i.css({ width: r, 'min-width': '100%', 'overflow-x': 'inherit' })
						: i
								.css({ 'overflow-x': 'inherit', position: 'absolute' })
								.wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />")
								.css({
									width: Math.ceil(i[0].getBoundingClientRect().right + 0.4) - Math.floor(i[0].getBoundingClientRect().left),
									'min-width': '100%',
									position: 'relative',
								})
								.unwrap();
				}
			},
			w = function () {
				var t = e(this),
					o = t.data(a),
					n = o.opt,
					i = e('.mCSB_' + o.idx + '_scrollbar:first'),
					r = te(n.scrollButtons.tabindex) ? "tabindex='" + n.scrollButtons.tabindex + "'" : '',
					l = [
						"<a href='#' class='" + d[13] + "' oncontextmenu='return false;' " + r + ' />',
						"<a href='#' class='" + d[14] + "' oncontextmenu='return false;' " + r + ' />',
						"<a href='#' class='" + d[15] + "' oncontextmenu='return false;' " + r + ' />',
						"<a href='#' class='" + d[16] + "' oncontextmenu='return false;' " + r + ' />',
					],
					s = ['x' === n.axis ? l[2] : l[0], 'x' === n.axis ? l[3] : l[1], l[2], l[3]];
				n.scrollButtons.enable && i.prepend(s[0]).append(s[1]).next('.mCSB_scrollTools').prepend(s[2]).append(s[3]);
			},
			S = function () {
				var t = e(this),
					o = t.data(a),
					n = e('#mCSB_' + o.idx),
					i = e('#mCSB_' + o.idx + '_container'),
					r = [e('#mCSB_' + o.idx + '_dragger_vertical'), e('#mCSB_' + o.idx + '_dragger_horizontal')],
					l = [n.height() / i.outerHeight(!1), n.width() / i.outerWidth(!1)],
					c = [
						parseInt(r[0].css('min-height')),
						Math.round(l[0] * r[0].parent().height()),
						parseInt(r[1].css('min-width')),
						Math.round(l[1] * r[1].parent().width()),
					],
					d = s && c[1] < c[0] ? c[0] : c[1],
					u = s && c[3] < c[2] ? c[2] : c[3];
				r[0]
					.css({ height: d, 'max-height': r[0].parent().height() - 10 })
					.find('.mCSB_dragger_bar')
					.css({ 'line-height': c[0] + 'px' }),
					r[1].css({ width: u, 'max-width': r[1].parent().width() - 10 });
			},
			b = function () {
				var t = e(this),
					o = t.data(a),
					n = e('#mCSB_' + o.idx),
					i = e('#mCSB_' + o.idx + '_container'),
					r = [e('#mCSB_' + o.idx + '_dragger_vertical'), e('#mCSB_' + o.idx + '_dragger_horizontal')],
					l = [i.outerHeight(!1) - n.height(), i.outerWidth(!1) - n.width()],
					s = [l[0] / (r[0].parent().height() - r[0].height()), l[1] / (r[1].parent().width() - r[1].width())];
				o.scrollRatio = { y: s[0], x: s[1] };
			},
			C = function (e, t, o) {
				var a = o ? d[0] + '_expanded' : '',
					n = e.closest('.mCSB_scrollTools');
				'active' === t
					? (e.toggleClass(d[0] + ' ' + a), n.toggleClass(d[1]), (e[0]._draggable = e[0]._draggable ? 0 : 1))
					: e[0]._draggable || ('hide' === t ? (e.removeClass(d[0]), n.removeClass(d[1])) : (e.addClass(d[0]), n.addClass(d[1])));
			},
			y = function () {
				var t = e(this),
					o = t.data(a),
					n = e('#mCSB_' + o.idx),
					i = e('#mCSB_' + o.idx + '_container'),
					r = null == o.overflowed ? i.height() : i.outerHeight(!1),
					l = null == o.overflowed ? i.width() : i.outerWidth(!1),
					s = i[0].scrollHeight,
					c = i[0].scrollWidth;
				return s > r && (r = s), c > l && (l = c), [r > n.height(), l > n.width()];
			},
			B = function () {
				var t = e(this),
					o = t.data(a),
					n = o.opt,
					i = e('#mCSB_' + o.idx),
					r = e('#mCSB_' + o.idx + '_container'),
					l = [e('#mCSB_' + o.idx + '_dragger_vertical'), e('#mCSB_' + o.idx + '_dragger_horizontal')];
				if (
					(V(t),
					(('x' !== n.axis && !o.overflowed[0]) || ('y' === n.axis && o.overflowed[0])) && (l[0].add(r).css('top', 0), Q(t, '_resetY')),
					('y' !== n.axis && !o.overflowed[1]) || ('x' === n.axis && o.overflowed[1]))
				) {
					var s = (dx = 0);
					'rtl' === o.langDir && ((s = i.width() - r.outerWidth(!1)), (dx = Math.abs(s / o.scrollRatio.x))),
						r.css('left', s),
						l[1].css('left', dx),
						Q(t, '_resetX');
				}
			},
			T = function () {
				function t() {
					r = setTimeout(function () {
						e.event.special.mousewheel ? (clearTimeout(r), W.call(o[0])) : t();
					}, 100);
				}
				var o = e(this),
					n = o.data(a),
					i = n.opt;
				if (!n.bindEvents) {
					if ((I.call(this), i.contentTouchScroll && D.call(this), E.call(this), i.mouseWheel.enable)) {
						var r;
						t();
					}
					z.call(this),
						H.call(this),
						i.advanced.autoScrollOnFocus && P.call(this),
						i.scrollButtons.enable && U.call(this),
						i.keyboard.enable && F.call(this),
						(n.bindEvents = !0);
				}
			},
			k = function () {
				var t = e(this),
					o = t.data(a),
					n = o.opt,
					i = a + '_' + o.idx,
					r = '.mCSB_' + o.idx + '_scrollbar',
					l = e(
						'#mCSB_' +
							o.idx +
							',#mCSB_' +
							o.idx +
							'_container,#mCSB_' +
							o.idx +
							'_container_wrapper,' +
							r +
							' .' +
							d[12] +
							',#mCSB_' +
							o.idx +
							'_dragger_vertical,#mCSB_' +
							o.idx +
							'_dragger_horizontal,' +
							r +
							'>a'
					),
					s = e('#mCSB_' + o.idx + '_container');
				n.advanced.releaseDraggableSelectors && l.add(e(n.advanced.releaseDraggableSelectors)),
					n.advanced.extraDraggableSelectors && l.add(e(n.advanced.extraDraggableSelectors)),
					o.bindEvents &&
						(e(document)
							.add(e(!A() || top.document))
							.unbind('.' + i),
						l.each(function () {
							e(this).unbind('.' + i);
						}),
						clearTimeout(t[0]._focusTimeout),
						Z(t[0], '_focusTimeout'),
						clearTimeout(o.sequential.step),
						Z(o.sequential, 'step'),
						clearTimeout(s[0].onCompleteTimeout),
						Z(s[0], 'onCompleteTimeout'),
						(o.bindEvents = !1));
			},
			M = function (t) {
				var o = e(this),
					n = o.data(a),
					i = n.opt,
					r = e('#mCSB_' + n.idx + '_container_wrapper'),
					l = r.length ? r : e('#mCSB_' + n.idx + '_container'),
					s = [e('#mCSB_' + n.idx + '_scrollbar_vertical'), e('#mCSB_' + n.idx + '_scrollbar_horizontal')],
					c = [s[0].find('.mCSB_dragger'), s[1].find('.mCSB_dragger')];
				'x' !== i.axis &&
					(n.overflowed[0] && !t
						? (s[0].add(c[0]).add(s[0].children('a')).css('display', 'block'), l.removeClass(d[8] + ' ' + d[10]))
						: (i.alwaysShowScrollbar
								? (2 !== i.alwaysShowScrollbar && c[0].css('display', 'none'), l.removeClass(d[10]))
								: (s[0].css('display', 'none'), l.addClass(d[10])),
						  l.addClass(d[8]))),
					'y' !== i.axis &&
						(n.overflowed[1] && !t
							? (s[1].add(c[1]).add(s[1].children('a')).css('display', 'block'), l.removeClass(d[9] + ' ' + d[11]))
							: (i.alwaysShowScrollbar
									? (2 !== i.alwaysShowScrollbar && c[1].css('display', 'none'), l.removeClass(d[11]))
									: (s[1].css('display', 'none'), l.addClass(d[11])),
							  l.addClass(d[9]))),
					n.overflowed[0] || n.overflowed[1] ? o.removeClass(d[5]) : o.addClass(d[5]);
			},
			O = function (t) {
				var o = t.type,
					a =
						t.target.ownerDocument !== document && null !== frameElement
							? [e(frameElement).offset().top, e(frameElement).offset().left]
							: null,
					n =
						A() && t.target.ownerDocument !== top.document && null !== frameElement
							? [e(t.view.frameElement).offset().top, e(t.view.frameElement).offset().left]
							: [0, 0];
				switch (o) {
					case 'pointerdown':
					case 'MSPointerDown':
					case 'pointermove':
					case 'MSPointerMove':
					case 'pointerup':
					case 'MSPointerUp':
						return a
							? [t.originalEvent.pageY - a[0] + n[0], t.originalEvent.pageX - a[1] + n[1], !1]
							: [t.originalEvent.pageY, t.originalEvent.pageX, !1];
					case 'touchstart':
					case 'touchmove':
					case 'touchend':
						var i = t.originalEvent.touches[0] || t.originalEvent.changedTouches[0],
							r = t.originalEvent.touches.length || t.originalEvent.changedTouches.length;
						return t.target.ownerDocument !== document ? [i.screenY, i.screenX, r > 1] : [i.pageY, i.pageX, r > 1];
					default:
						return a ? [t.pageY - a[0] + n[0], t.pageX - a[1] + n[1], !1] : [t.pageY, t.pageX, !1];
				}
			},
			I = function () {
				function t(e) {
					var t = m.find('iframe');
					if (t.length) {
						var o = e ? 'auto' : 'none';
						t.css('pointer-events', o);
					}
				}
				function o(e, t, o, a) {
					if (((m[0].idleTimer = u.scrollInertia < 233 ? 250 : 0), n.attr('id') === h[1]))
						var i = 'x',
							r = (n[0].offsetLeft - t + a) * d.scrollRatio.x;
					else
						var i = 'y',
							r = (n[0].offsetTop - e + o) * d.scrollRatio.y;
					Q(l, r.toString(), { dir: i, drag: !0 });
				}
				var n,
					i,
					r,
					l = e(this),
					d = l.data(a),
					u = d.opt,
					f = a + '_' + d.idx,
					h = ['mCSB_' + d.idx + '_dragger_vertical', 'mCSB_' + d.idx + '_dragger_horizontal'],
					m = e('#mCSB_' + d.idx + '_container'),
					p = e('#' + h[0] + ',#' + h[1]),
					g = u.advanced.releaseDraggableSelectors ? p.add(e(u.advanced.releaseDraggableSelectors)) : p,
					v = u.advanced.extraDraggableSelectors
						? e(!A() || top.document).add(e(u.advanced.extraDraggableSelectors))
						: e(!A() || top.document);
				p
					.bind('mousedown.' + f + ' touchstart.' + f + ' pointerdown.' + f + ' MSPointerDown.' + f, function (o) {
						if ((o.stopImmediatePropagation(), o.preventDefault(), $(o))) {
							(c = !0),
								s &&
									(document.onselectstart = function () {
										return !1;
									}),
								t(!1),
								V(l),
								(n = e(this));
							var a = n.offset(),
								d = O(o)[0] - a.top,
								f = O(o)[1] - a.left,
								h = n.height() + a.top,
								m = n.width() + a.left;
							h > d && d > 0 && m > f && f > 0 && ((i = d), (r = f)), C(n, 'active', u.autoExpandScrollbar);
						}
					})
					.bind('touchmove.' + f, function (e) {
						e.stopImmediatePropagation(), e.preventDefault();
						var t = n.offset(),
							a = O(e)[0] - t.top,
							l = O(e)[1] - t.left;
						o(i, r, a, l);
					}),
					e(document)
						.add(v)
						.bind('mousemove.' + f + ' pointermove.' + f + ' MSPointerMove.' + f, function (e) {
							if (n) {
								var t = n.offset(),
									a = O(e)[0] - t.top,
									l = O(e)[1] - t.left;
								if (i === a && r === l) return;
								o(i, r, a, l);
							}
						})
						.add(g)
						.bind('mouseup.' + f + ' touchend.' + f + ' pointerup.' + f + ' MSPointerUp.' + f, function () {
							n && (C(n, 'active', u.autoExpandScrollbar), (n = null)), (c = !1), s && (document.onselectstart = null), t(!0);
						});
			},
			D = function () {
				function o(e) {
					if (!ee(e) || c || O(e)[2]) return void (t = 0);
					(t = 1), (b = 0), (C = 0), (d = 1), y.removeClass('mCS_touch_action');
					var o = I.offset();
					(u = O(e)[0] - o.top), (f = O(e)[1] - o.left), (z = [O(e)[0], O(e)[1]]);
				}
				function n(e) {
					if (ee(e) && !c && !O(e)[2] && (T.documentTouchScroll || e.preventDefault(), e.stopImmediatePropagation(), (!C || b) && d)) {
						g = J();
						var t = M.offset(),
							o = O(e)[0] - t.top,
							a = O(e)[1] - t.left,
							n = 'mcsLinearOut';
						if ((E.push(o), W.push(a), (z[2] = Math.abs(O(e)[0] - z[0])), (z[3] = Math.abs(O(e)[1] - z[1])), B.overflowed[0]))
							var i = D[0].parent().height() - D[0].height(),
								r = u - o > 0 && o - u > -(i * B.scrollRatio.y) && (2 * z[3] < z[2] || 'yx' === T.axis);
						if (B.overflowed[1])
							var l = D[1].parent().width() - D[1].width(),
								h = f - a > 0 && a - f > -(l * B.scrollRatio.x) && (2 * z[2] < z[3] || 'yx' === T.axis);
						r || h ? (U || e.preventDefault(), (b = 1)) : ((C = 1), y.addClass('mCS_touch_action')),
							U && e.preventDefault(),
							(w = 'yx' === T.axis ? [u - o, f - a] : 'x' === T.axis ? [null, f - a] : [u - o, null]),
							(I[0].idleTimer = 250),
							B.overflowed[0] && s(w[0], R, n, 'y', 'all', !0),
							B.overflowed[1] && s(w[1], R, n, 'x', L, !0);
					}
				}
				function i(e) {
					if (!ee(e) || c || O(e)[2]) return void (t = 0);
					(t = 1), e.stopImmediatePropagation(), V(y), (p = J());
					var o = M.offset();
					(h = O(e)[0] - o.top), (m = O(e)[1] - o.left), (E = []), (W = []);
				}
				function r(e) {
					if (ee(e) && !c && !O(e)[2]) {
						(d = 0), e.stopImmediatePropagation(), (b = 0), (C = 0), (v = J());
						var t = M.offset(),
							o = O(e)[0] - t.top,
							a = O(e)[1] - t.left;
						if (!(v - g > 30)) {
							_ = 1e3 / (v - p);
							var n = 'mcsEaseOut',
								i = 2.5 > _,
								r = i ? [E[E.length - 2], W[W.length - 2]] : [0, 0];
							x = i ? [o - r[0], a - r[1]] : [o - h, a - m];
							var u = [Math.abs(x[0]), Math.abs(x[1])];
							_ = i ? [Math.abs(x[0] / 4), Math.abs(x[1] / 4)] : [_, _];
							var f = [Math.abs(I[0].offsetTop) - x[0] * l(u[0] / _[0], _[0]), Math.abs(I[0].offsetLeft) - x[1] * l(u[1] / _[1], _[1])];
							(w = 'yx' === T.axis ? [f[0], f[1]] : 'x' === T.axis ? [null, f[1]] : [f[0], null]),
								(S = [4 * u[0] + T.scrollInertia, 4 * u[1] + T.scrollInertia]);
							var y = parseInt(T.contentTouchScroll) || 0;
							(w[0] = u[0] > y ? w[0] : 0),
								(w[1] = u[1] > y ? w[1] : 0),
								B.overflowed[0] && s(w[0], S[0], n, 'y', L, !1),
								B.overflowed[1] && s(w[1], S[1], n, 'x', L, !1);
						}
					}
				}
				function l(e, t) {
					var o = [1.5 * t, 2 * t, t / 1.5, t / 2];
					return e > 90
						? t > 4
							? o[0]
							: o[3]
						: e > 60
						? t > 3
							? o[3]
							: o[2]
						: e > 30
						? t > 8
							? o[1]
							: t > 6
							? o[0]
							: t > 4
							? t
							: o[2]
						: t > 8
						? t
						: o[3];
				}
				function s(e, t, o, a, n, i) {
					e && Q(y, e.toString(), { dur: t, scrollEasing: o, dir: a, overwrite: n, drag: i });
				}
				var d,
					u,
					f,
					h,
					m,
					p,
					g,
					v,
					x,
					_,
					w,
					S,
					b,
					C,
					y = e(this),
					B = y.data(a),
					T = B.opt,
					k = a + '_' + B.idx,
					M = e('#mCSB_' + B.idx),
					I = e('#mCSB_' + B.idx + '_container'),
					D = [e('#mCSB_' + B.idx + '_dragger_vertical'), e('#mCSB_' + B.idx + '_dragger_horizontal')],
					E = [],
					W = [],
					R = 0,
					L = 'yx' === T.axis ? 'none' : 'all',
					z = [],
					P = I.find('iframe'),
					H = [
						'touchstart.' + k + ' pointerdown.' + k + ' MSPointerDown.' + k,
						'touchmove.' + k + ' pointermove.' + k + ' MSPointerMove.' + k,
						'touchend.' + k + ' pointerup.' + k + ' MSPointerUp.' + k,
					],
					U = void 0 !== document.body.style.touchAction;
				I.bind(H[0], function (e) {
					o(e);
				}).bind(H[1], function (e) {
					n(e);
				}),
					M.bind(H[0], function (e) {
						i(e);
					}).bind(H[2], function (e) {
						r(e);
					}),
					P.length &&
						P.each(function () {
							e(this).bind('load', function () {
								A(this) &&
									e(this.contentDocument || this.contentWindow.document)
										.bind(H[0], function (e) {
											o(e), i(e);
										})
										.bind(H[1], function (e) {
											n(e);
										})
										.bind(H[2], function (e) {
											r(e);
										});
							});
						});
			},
			E = function () {
				function o() {
					return window.getSelection
						? window.getSelection().toString()
						: document.selection && 'Control' != document.selection.type
						? document.selection.createRange().text
						: 0;
				}
				function n(e, t, o) {
					(d.type = o && i ? 'stepped' : 'stepless'), (d.scrollAmount = 10), q(r, e, t, 'mcsLinearOut', o ? 60 : null);
				}
				var i,
					r = e(this),
					l = r.data(a),
					s = l.opt,
					d = l.sequential,
					u = a + '_' + l.idx,
					f = e('#mCSB_' + l.idx + '_container'),
					h = f.parent();
				f.bind('mousedown.' + u, function () {
					t || i || ((i = 1), (c = !0));
				})
					.add(document)
					.bind('mousemove.' + u, function (e) {
						if (!t && i && o()) {
							var a = f.offset(),
								r = O(e)[0] - a.top + f[0].offsetTop,
								c = O(e)[1] - a.left + f[0].offsetLeft;
							r > 0 && r < h.height() && c > 0 && c < h.width()
								? d.step && n('off', null, 'stepped')
								: ('x' !== s.axis && l.overflowed[0] && (0 > r ? n('on', 38) : r > h.height() && n('on', 40)),
								  'y' !== s.axis && l.overflowed[1] && (0 > c ? n('on', 37) : c > h.width() && n('on', 39)));
						}
					})
					.bind('mouseup.' + u + ' dragend.' + u, function () {
						t || (i && ((i = 0), n('off', null)), (c = !1));
					});
			},
			W = function () {
				function t(t, a) {
					if ((V(o), !L(o, t.target))) {
						var r =
								'auto' !== i.mouseWheel.deltaFactor
									? parseInt(i.mouseWheel.deltaFactor)
									: s && t.deltaFactor < 100
									? 100
									: t.deltaFactor || 100,
							d = i.scrollInertia;
						if ('x' === i.axis || 'x' === i.mouseWheel.axis)
							var u = 'x',
								f = [Math.round(r * n.scrollRatio.x), parseInt(i.mouseWheel.scrollAmount)],
								h = 'auto' !== i.mouseWheel.scrollAmount ? f[1] : f[0] >= l.width() ? 0.9 * l.width() : f[0],
								m = Math.abs(e('#mCSB_' + n.idx + '_container')[0].offsetLeft),
								p = c[1][0].offsetLeft,
								g = c[1].parent().width() - c[1].width(),
								v = 'y' === i.mouseWheel.axis ? t.deltaY || a : t.deltaX;
						else
							var u = 'y',
								f = [Math.round(r * n.scrollRatio.y), parseInt(i.mouseWheel.scrollAmount)],
								h = 'auto' !== i.mouseWheel.scrollAmount ? f[1] : f[0] >= l.height() ? 0.9 * l.height() : f[0],
								m = Math.abs(e('#mCSB_' + n.idx + '_container')[0].offsetTop),
								p = c[0][0].offsetTop,
								g = c[0].parent().height() - c[0].height(),
								v = t.deltaY || a;
						('y' === u && !n.overflowed[0]) ||
							('x' === u && !n.overflowed[1]) ||
							((i.mouseWheel.invert || t.webkitDirectionInvertedFromDevice) && (v = -v),
							i.mouseWheel.normalizeDelta && (v = 0 > v ? -1 : 1),
							((v > 0 && 0 !== p) || (0 > v && p !== g) || i.mouseWheel.preventDefault) &&
								(t.stopImmediatePropagation(), t.preventDefault()),
							t.deltaFactor < 5 && !i.mouseWheel.normalizeDelta && ((h = t.deltaFactor), (d = 17)),
							Q(o, (m - v * h).toString(), { dir: u, dur: d }));
					}
				}
				if (e(this).data(a)) {
					var o = e(this),
						n = o.data(a),
						i = n.opt,
						r = a + '_' + n.idx,
						l = e('#mCSB_' + n.idx),
						c = [e('#mCSB_' + n.idx + '_dragger_vertical'), e('#mCSB_' + n.idx + '_dragger_horizontal')],
						d = e('#mCSB_' + n.idx + '_container').find('iframe');
					d.length &&
						d.each(function () {
							e(this).bind('load', function () {
								A(this) &&
									e(this.contentDocument || this.contentWindow.document).bind('mousewheel.' + r, function (e, o) {
										t(e, o);
									});
							});
						}),
						l.bind('mousewheel.' + r, function (e, o) {
							t(e, o);
						});
				}
			},
			R = new Object(),
			A = function (t) {
				var o = !1,
					a = !1,
					n = null;
				if ((void 0 === t ? (a = '#empty') : void 0 !== e(t).attr('id') && (a = e(t).attr('id')), a !== !1 && void 0 !== R[a])) return R[a];
				if (t) {
					try {
						var i = t.contentDocument || t.contentWindow.document;
						n = i.body.innerHTML;
					} catch (r) {}
					o = null !== n;
				} else {
					try {
						var i = top.document;
						n = i.body.innerHTML;
					} catch (r) {}
					o = null !== n;
				}
				return a !== !1 && (R[a] = o), o;
			},
			L = function (t, o) {
				var n = o.nodeName.toLowerCase(),
					i = t.data(a).opt.mouseWheel.disableOver,
					r = ['select', 'textarea'];
				return e.inArray(n, i) > -1 && !(e.inArray(n, r) > -1 && !e(o).is(':focus'));
			},
			z = function () {
				var t,
					o = e(this),
					n = o.data(a),
					i = a + '_' + n.idx,
					r = e('#mCSB_' + n.idx + '_container'),
					l = r.parent(),
					s = e('.mCSB_' + n.idx + '_scrollbar .' + d[12]);
				s.bind('mousedown.' + i + ' touchstart.' + i + ' pointerdown.' + i + ' MSPointerDown.' + i, function (o) {
					(c = !0), e(o.target).hasClass('mCSB_dragger') || (t = 1);
				})
					.bind('touchend.' + i + ' pointerup.' + i + ' MSPointerUp.' + i, function () {
						c = !1;
					})
					.bind('click.' + i, function (a) {
						if (t && ((t = 0), e(a.target).hasClass(d[12]) || e(a.target).hasClass('mCSB_draggerRail'))) {
							V(o);
							var i = e(this),
								s = i.find('.mCSB_dragger');
							if (i.parent('.mCSB_scrollTools_horizontal').length > 0) {
								if (!n.overflowed[1]) return;
								var c = 'x',
									u = a.pageX > s.offset().left ? -1 : 1,
									f = Math.abs(r[0].offsetLeft) - u * (0.9 * l.width());
							} else {
								if (!n.overflowed[0]) return;
								var c = 'y',
									u = a.pageY > s.offset().top ? -1 : 1,
									f = Math.abs(r[0].offsetTop) - u * (0.9 * l.height());
							}
							Q(o, f.toString(), { dir: c, scrollEasing: 'mcsEaseInOut' });
						}
					});
			},
			P = function () {
				var t = e(this),
					o = t.data(a),
					n = o.opt,
					i = a + '_' + o.idx,
					r = e('#mCSB_' + o.idx + '_container'),
					l = r.parent();
				r.bind('focusin.' + i, function () {
					var o = e(document.activeElement),
						a = r.find('.mCustomScrollBox').length,
						i = 0;
					o.is(n.advanced.autoScrollOnFocus) &&
						(V(t),
						clearTimeout(t[0]._focusTimeout),
						(t[0]._focusTimer = a ? (i + 17) * a : 0),
						(t[0]._focusTimeout = setTimeout(function () {
							var e = [oe(o)[0], oe(o)[1]],
								a = [r[0].offsetTop, r[0].offsetLeft],
								s = [
									a[0] + e[0] >= 0 && a[0] + e[0] < l.height() - o.outerHeight(!1),
									a[1] + e[1] >= 0 && a[0] + e[1] < l.width() - o.outerWidth(!1),
								],
								c = 'yx' !== n.axis || s[0] || s[1] ? 'all' : 'none';
							'x' === n.axis || s[0] || Q(t, e[0].toString(), { dir: 'y', scrollEasing: 'mcsEaseInOut', overwrite: c, dur: i }),
								'y' === n.axis || s[1] || Q(t, e[1].toString(), { dir: 'x', scrollEasing: 'mcsEaseInOut', overwrite: c, dur: i });
						}, t[0]._focusTimer)));
				});
			},
			H = function () {
				var t = e(this),
					o = t.data(a),
					n = a + '_' + o.idx,
					i = e('#mCSB_' + o.idx + '_container').parent();
				i.bind('scroll.' + n, function () {
					(0 === i.scrollTop() && 0 === i.scrollLeft()) || e('.mCSB_' + o.idx + '_scrollbar').css('visibility', 'hidden');
				});
			},
			U = function () {
				var t = e(this),
					o = t.data(a),
					n = o.opt,
					i = o.sequential,
					r = a + '_' + o.idx,
					l = '.mCSB_' + o.idx + '_scrollbar',
					s = e(l + '>a');
				s.bind(
					'mousedown.' +
						r +
						' touchstart.' +
						r +
						' pointerdown.' +
						r +
						' MSPointerDown.' +
						r +
						' mouseup.' +
						r +
						' touchend.' +
						r +
						' pointerup.' +
						r +
						' MSPointerUp.' +
						r +
						' mouseout.' +
						r +
						' pointerout.' +
						r +
						' MSPointerOut.' +
						r +
						' click.' +
						r,
					function (a) {
						function r(e, o) {
							(i.scrollAmount = n.scrollButtons.scrollAmount), q(t, e, o);
						}
						if ((a.preventDefault(), $(a))) {
							var l = e(this).attr('class');
							switch (((i.type = n.scrollButtons.scrollType), a.type)) {
								case 'mousedown':
								case 'touchstart':
								case 'pointerdown':
								case 'MSPointerDown':
									if ('stepped' === i.type) return;
									(c = !0), (o.tweenRunning = !1), r('on', l);
									break;
								case 'mouseup':
								case 'touchend':
								case 'pointerup':
								case 'MSPointerUp':
								case 'mouseout':
								case 'pointerout':
								case 'MSPointerOut':
									if ('stepped' === i.type) return;
									(c = !1), i.dir && r('off', l);
									break;
								case 'click':
									if ('stepped' !== i.type || o.tweenRunning) return;
									r('on', l);
							}
						}
					}
				);
			},
			F = function () {
				function t(t) {
					function a(e, t) {
						(r.type = i.keyboard.scrollType),
							(r.scrollAmount = i.keyboard.scrollAmount),
							('stepped' === r.type && n.tweenRunning) || q(o, e, t);
					}
					switch (t.type) {
						case 'blur':
							n.tweenRunning && r.dir && a('off', null);
							break;
						case 'keydown':
						case 'keyup':
							var l = t.keyCode ? t.keyCode : t.which,
								s = 'on';
							if (('x' !== i.axis && (38 === l || 40 === l)) || ('y' !== i.axis && (37 === l || 39 === l))) {
								if (((38 === l || 40 === l) && !n.overflowed[0]) || ((37 === l || 39 === l) && !n.overflowed[1])) return;
								'keyup' === t.type && (s = 'off'),
									e(document.activeElement).is(u) || (t.preventDefault(), t.stopImmediatePropagation(), a(s, l));
							} else if (33 === l || 34 === l) {
								if (
									((n.overflowed[0] || n.overflowed[1]) && (t.preventDefault(), t.stopImmediatePropagation()), 'keyup' === t.type)
								) {
									V(o);
									var f = 34 === l ? -1 : 1;
									if ('x' === i.axis || ('yx' === i.axis && n.overflowed[1] && !n.overflowed[0]))
										var h = 'x',
											m = Math.abs(c[0].offsetLeft) - f * (0.9 * d.width());
									else
										var h = 'y',
											m = Math.abs(c[0].offsetTop) - f * (0.9 * d.height());
									Q(o, m.toString(), { dir: h, scrollEasing: 'mcsEaseInOut' });
								}
							} else if (
								(35 === l || 36 === l) &&
								!e(document.activeElement).is(u) &&
								((n.overflowed[0] || n.overflowed[1]) && (t.preventDefault(), t.stopImmediatePropagation()), 'keyup' === t.type)
							) {
								if ('x' === i.axis || ('yx' === i.axis && n.overflowed[1] && !n.overflowed[0]))
									var h = 'x',
										m = 35 === l ? Math.abs(d.width() - c.outerWidth(!1)) : 0;
								else
									var h = 'y',
										m = 35 === l ? Math.abs(d.height() - c.outerHeight(!1)) : 0;
								Q(o, m.toString(), { dir: h, scrollEasing: 'mcsEaseInOut' });
							}
					}
				}
				var o = e(this),
					n = o.data(a),
					i = n.opt,
					r = n.sequential,
					l = a + '_' + n.idx,
					s = e('#mCSB_' + n.idx),
					c = e('#mCSB_' + n.idx + '_container'),
					d = c.parent(),
					u = "input,textarea,select,datalist,keygen,[contenteditable='true']",
					f = c.find('iframe'),
					h = ['blur.' + l + ' keydown.' + l + ' keyup.' + l];
				f.length &&
					f.each(function () {
						e(this).bind('load', function () {
							A(this) &&
								e(this.contentDocument || this.contentWindow.document).bind(h[0], function (e) {
									t(e);
								});
						});
					}),
					s.attr('tabindex', '0').bind(h[0], function (e) {
						t(e);
					});
			},
			q = function (t, o, n, i, r) {
				function l(e) {
					u.snapAmount &&
						(f.scrollAmount = u.snapAmount instanceof Array ? ('x' === f.dir[0] ? u.snapAmount[1] : u.snapAmount[0]) : u.snapAmount);
					var o = 'stepped' !== f.type,
						a = r ? r : e ? (o ? p / 1.5 : g) : 1e3 / 60,
						n = e ? (o ? 7.5 : 40) : 2.5,
						s = [Math.abs(h[0].offsetTop), Math.abs(h[0].offsetLeft)],
						d = [c.scrollRatio.y > 10 ? 10 : c.scrollRatio.y, c.scrollRatio.x > 10 ? 10 : c.scrollRatio.x],
						m = 'x' === f.dir[0] ? s[1] + f.dir[1] * (d[1] * n) : s[0] + f.dir[1] * (d[0] * n),
						v = 'x' === f.dir[0] ? s[1] + f.dir[1] * parseInt(f.scrollAmount) : s[0] + f.dir[1] * parseInt(f.scrollAmount),
						x = 'auto' !== f.scrollAmount ? v : m,
						_ = i ? i : e ? (o ? 'mcsLinearOut' : 'mcsEaseInOut') : 'mcsLinear',
						w = !!e;
					return (
						e && 17 > a && (x = 'x' === f.dir[0] ? s[1] : s[0]),
						Q(t, x.toString(), { dir: f.dir[0], scrollEasing: _, dur: a, onComplete: w }),
						e
							? void (f.dir = !1)
							: (clearTimeout(f.step),
							  void (f.step = setTimeout(function () {
									l();
							  }, a)))
					);
				}
				function s() {
					clearTimeout(f.step), Z(f, 'step'), V(t);
				}
				var c = t.data(a),
					u = c.opt,
					f = c.sequential,
					h = e('#mCSB_' + c.idx + '_container'),
					m = 'stepped' === f.type,
					p = u.scrollInertia < 26 ? 26 : u.scrollInertia,
					g = u.scrollInertia < 1 ? 17 : u.scrollInertia;
				switch (o) {
					case 'on':
						if (
							((f.dir = [
								n === d[16] || n === d[15] || 39 === n || 37 === n ? 'x' : 'y',
								n === d[13] || n === d[15] || 38 === n || 37 === n ? -1 : 1,
							]),
							V(t),
							te(n) && 'stepped' === f.type)
						)
							return;
						l(m);
						break;
					case 'off':
						s(), (m || (c.tweenRunning && f.dir)) && l(!0);
				}
			},
			Y = function (t) {
				var o = e(this).data(a).opt,
					n = [];
				return (
					'function' == typeof t && (t = t()),
					t instanceof Array
						? (n = t.length > 1 ? [t[0], t[1]] : 'x' === o.axis ? [null, t[0]] : [t[0], null])
						: ((n[0] = t.y ? t.y : t.x || 'x' === o.axis ? null : t), (n[1] = t.x ? t.x : t.y || 'y' === o.axis ? null : t)),
					'function' == typeof n[0] && (n[0] = n[0]()),
					'function' == typeof n[1] && (n[1] = n[1]()),
					n
				);
			},
			j = function (t, o) {
				if (null != t && 'undefined' != typeof t) {
					var n = e(this),
						i = n.data(a),
						r = i.opt,
						l = e('#mCSB_' + i.idx + '_container'),
						s = l.parent(),
						c = typeof t;
					o || (o = 'x' === r.axis ? 'x' : 'y');
					var d = 'x' === o ? l.outerWidth(!1) - s.width() : l.outerHeight(!1) - s.height(),
						f = 'x' === o ? l[0].offsetLeft : l[0].offsetTop,
						h = 'x' === o ? 'left' : 'top';
					switch (c) {
						case 'function':
							return t();
						case 'object':
							var m = t.jquery ? t : e(t);
							if (!m.length) return;
							return 'x' === o ? oe(m)[1] : oe(m)[0];
						case 'string':
						case 'number':
							if (te(t)) return Math.abs(t);
							if (-1 !== t.indexOf('%')) return Math.abs((d * parseInt(t)) / 100);
							if (-1 !== t.indexOf('-=')) return Math.abs(f - parseInt(t.split('-=')[1]));
							if (-1 !== t.indexOf('+=')) {
								var p = f + parseInt(t.split('+=')[1]);
								return p >= 0 ? 0 : Math.abs(p);
							}
							if (-1 !== t.indexOf('px') && te(t.split('px')[0])) return Math.abs(t.split('px')[0]);
							if ('top' === t || 'left' === t) return 0;
							if ('bottom' === t) return Math.abs(s.height() - l.outerHeight(!1));
							if ('right' === t) return Math.abs(s.width() - l.outerWidth(!1));
							if ('first' === t || 'last' === t) {
								var m = l.find(':' + t);
								return 'x' === o ? oe(m)[1] : oe(m)[0];
							}
							return e(t).length ? ('x' === o ? oe(e(t))[1] : oe(e(t))[0]) : (l.css(h, t), void u.update.call(null, n[0]));
					}
				}
			},
			X = function (t) {
				function o() {
					return (
						clearTimeout(f[0].autoUpdate),
						0 === l.parents('html').length
							? void (l = null)
							: void (f[0].autoUpdate = setTimeout(function () {
									return c.advanced.updateOnSelectorChange && ((s.poll.change.n = i()), s.poll.change.n !== s.poll.change.o)
										? ((s.poll.change.o = s.poll.change.n), void r(3))
										: c.advanced.updateOnContentResize &&
										  ((s.poll.size.n =
												l[0].scrollHeight + l[0].scrollWidth + f[0].offsetHeight + l[0].offsetHeight + l[0].offsetWidth),
										  s.poll.size.n !== s.poll.size.o)
										? ((s.poll.size.o = s.poll.size.n), void r(1))
										: !c.advanced.updateOnImageLoad ||
										  ('auto' === c.advanced.updateOnImageLoad && 'y' === c.axis) ||
										  ((s.poll.img.n = f.find('img').length), s.poll.img.n === s.poll.img.o)
										? void (
												(c.advanced.updateOnSelectorChange ||
													c.advanced.updateOnContentResize ||
													c.advanced.updateOnImageLoad) &&
												o()
										  )
										: ((s.poll.img.o = s.poll.img.n),
										  void f.find('img').each(function () {
												n(this);
										  }));
							  }, c.advanced.autoUpdateTimeout))
					);
				}
				function n(t) {
					function o(e, t) {
						return function () {
							return t.apply(e, arguments);
						};
					}
					function a() {
						(this.onload = null), e(t).addClass(d[2]), r(2);
					}
					if (e(t).hasClass(d[2])) return void r();
					var n = new Image();
					(n.onload = o(n, a)), (n.src = t.src);
				}
				function i() {
					c.advanced.updateOnSelectorChange === !0 && (c.advanced.updateOnSelectorChange = '*');
					var e = 0,
						t = f.find(c.advanced.updateOnSelectorChange);
					return (
						c.advanced.updateOnSelectorChange &&
							t.length > 0 &&
							t.each(function () {
								e += this.offsetHeight + this.offsetWidth;
							}),
						e
					);
				}
				function r(e) {
					clearTimeout(f[0].autoUpdate), u.update.call(null, l[0], e);
				}
				var l = e(this),
					s = l.data(a),
					c = s.opt,
					f = e('#mCSB_' + s.idx + '_container');
				return t ? (clearTimeout(f[0].autoUpdate), void Z(f[0], 'autoUpdate')) : void o();
			},
			N = function (e, t, o) {
				return Math.round(e / t) * t - o;
			},
			V = function (t) {
				var o = t.data(a),
					n = e(
						'#mCSB_' +
							o.idx +
							'_container,#mCSB_' +
							o.idx +
							'_container_wrapper,#mCSB_' +
							o.idx +
							'_dragger_vertical,#mCSB_' +
							o.idx +
							'_dragger_horizontal'
					);
				n.each(function () {
					K.call(this);
				});
			},
			Q = function (t, o, n) {
				function i(e) {
					return s && c.callbacks[e] && 'function' == typeof c.callbacks[e];
				}
				function r() {
					return [c.callbacks.alwaysTriggerOffsets || w >= S[0] + y, c.callbacks.alwaysTriggerOffsets || -B >= w];
				}
				function l() {
					var e = [h[0].offsetTop, h[0].offsetLeft],
						o = [x[0].offsetTop, x[0].offsetLeft],
						a = [h.outerHeight(!1), h.outerWidth(!1)],
						i = [f.height(), f.width()];
					t[0].mcs = {
						content: h,
						top: e[0],
						left: e[1],
						draggerTop: o[0],
						draggerLeft: o[1],
						topPct: Math.round((100 * Math.abs(e[0])) / (Math.abs(a[0]) - i[0])),
						leftPct: Math.round((100 * Math.abs(e[1])) / (Math.abs(a[1]) - i[1])),
						direction: n.dir,
					};
				}
				var s = t.data(a),
					c = s.opt,
					d = {
						trigger: 'internal',
						dir: 'y',
						scrollEasing: 'mcsEaseOut',
						drag: !1,
						dur: c.scrollInertia,
						overwrite: 'all',
						callbacks: !0,
						onStart: !0,
						onUpdate: !0,
						onComplete: !0,
					},
					n = e.extend(d, n),
					u = [n.dur, n.drag ? 0 : n.dur],
					f = e('#mCSB_' + s.idx),
					h = e('#mCSB_' + s.idx + '_container'),
					m = h.parent(),
					p = c.callbacks.onTotalScrollOffset ? Y.call(t, c.callbacks.onTotalScrollOffset) : [0, 0],
					g = c.callbacks.onTotalScrollBackOffset ? Y.call(t, c.callbacks.onTotalScrollBackOffset) : [0, 0];
				if (
					((s.trigger = n.trigger),
					(0 === m.scrollTop() && 0 === m.scrollLeft()) ||
						(e('.mCSB_' + s.idx + '_scrollbar').css('visibility', 'visible'), m.scrollTop(0).scrollLeft(0)),
					'_resetY' !== o || s.contentReset.y || (i('onOverflowYNone') && c.callbacks.onOverflowYNone.call(t[0]), (s.contentReset.y = 1)),
					'_resetX' !== o || s.contentReset.x || (i('onOverflowXNone') && c.callbacks.onOverflowXNone.call(t[0]), (s.contentReset.x = 1)),
					'_resetY' !== o && '_resetX' !== o)
				) {
					if (
						((!s.contentReset.y && t[0].mcs) ||
							!s.overflowed[0] ||
							(i('onOverflowY') && c.callbacks.onOverflowY.call(t[0]), (s.contentReset.x = null)),
						(!s.contentReset.x && t[0].mcs) ||
							!s.overflowed[1] ||
							(i('onOverflowX') && c.callbacks.onOverflowX.call(t[0]), (s.contentReset.x = null)),
						c.snapAmount)
					) {
						var v = c.snapAmount instanceof Array ? ('x' === n.dir ? c.snapAmount[1] : c.snapAmount[0]) : c.snapAmount;
						o = N(o, v, c.snapOffset);
					}
					switch (n.dir) {
						case 'x':
							var x = e('#mCSB_' + s.idx + '_dragger_horizontal'),
								_ = 'left',
								w = h[0].offsetLeft,
								S = [f.width() - h.outerWidth(!1), x.parent().width() - x.width()],
								b = [o, 0 === o ? 0 : o / s.scrollRatio.x],
								y = p[1],
								B = g[1],
								T = y > 0 ? y / s.scrollRatio.x : 0,
								k = B > 0 ? B / s.scrollRatio.x : 0;
							break;
						case 'y':
							var x = e('#mCSB_' + s.idx + '_dragger_vertical'),
								_ = 'top',
								w = h[0].offsetTop,
								S = [f.height() - h.outerHeight(!1), x.parent().height() - x.height()],
								b = [o, 0 === o ? 0 : o / s.scrollRatio.y],
								y = p[0],
								B = g[0],
								T = y > 0 ? y / s.scrollRatio.y : 0,
								k = B > 0 ? B / s.scrollRatio.y : 0;
					}
					b[1] < 0 || (0 === b[0] && 0 === b[1]) ? (b = [0, 0]) : b[1] >= S[1] ? (b = [S[0], S[1]]) : (b[0] = -b[0]),
						t[0].mcs || (l(), i('onInit') && c.callbacks.onInit.call(t[0])),
						clearTimeout(h[0].onCompleteTimeout),
						G(x[0], _, Math.round(b[1]), u[1], n.scrollEasing),
						(!s.tweenRunning && ((0 === w && b[0] >= 0) || (w === S[0] && b[0] <= S[0]))) ||
							G(h[0], _, Math.round(b[0]), u[0], n.scrollEasing, n.overwrite, {
								onStart: function () {
									n.callbacks &&
										n.onStart &&
										!s.tweenRunning &&
										(i('onScrollStart') && (l(), c.callbacks.onScrollStart.call(t[0])),
										(s.tweenRunning = !0),
										C(x),
										(s.cbOffsets = r()));
								},
								onUpdate: function () {
									n.callbacks && n.onUpdate && i('whileScrolling') && (l(), c.callbacks.whileScrolling.call(t[0]));
								},
								onComplete: function () {
									if (n.callbacks && n.onComplete) {
										'yx' === c.axis && clearTimeout(h[0].onCompleteTimeout);
										var e = h[0].idleTimer || 0;
										h[0].onCompleteTimeout = setTimeout(function () {
											i('onScroll') && (l(), c.callbacks.onScroll.call(t[0])),
												i('onTotalScroll') &&
													b[1] >= S[1] - T &&
													s.cbOffsets[0] &&
													(l(), c.callbacks.onTotalScroll.call(t[0])),
												i('onTotalScrollBack') &&
													b[1] <= k &&
													s.cbOffsets[1] &&
													(l(), c.callbacks.onTotalScrollBack.call(t[0])),
												(s.tweenRunning = !1),
												(h[0].idleTimer = 0),
												C(x, 'hide');
										}, e);
									}
								},
							});
				}
			},
			G = function (e, t, o, a, n, i, r) {
				function l() {
					S.stop ||
						(x || m.call(),
						(x = J() - v),
						s(),
						x >= S.time && ((S.time = x > S.time ? x + f - (x - S.time) : x + f - 1), S.time < x + 1 && (S.time = x + 1)),
						S.time < a ? (S.id = h(l)) : g.call());
				}
				function s() {
					a > 0 ? ((S.currVal = u(S.time, _, b, a, n)), (w[t] = Math.round(S.currVal) + 'px')) : (w[t] = o + 'px'), p.call();
				}
				function c() {
					(f = 1e3 / 60),
						(S.time = x + f),
						(h = window.requestAnimationFrame
							? window.requestAnimationFrame
							: function (e) {
									return s(), setTimeout(e, 0.01);
							  }),
						(S.id = h(l));
				}
				function d() {
					null != S.id && (window.requestAnimationFrame ? window.cancelAnimationFrame(S.id) : clearTimeout(S.id), (S.id = null));
				}
				function u(e, t, o, a, n) {
					switch (n) {
						case 'linear':
						case 'mcsLinear':
							return (o * e) / a + t;
						case 'mcsLinearOut':
							return (e /= a), e--, o * Math.sqrt(1 - e * e) + t;
						case 'easeInOutSmooth':
							return (e /= a / 2), 1 > e ? (o / 2) * e * e + t : (e--, (-o / 2) * (e * (e - 2) - 1) + t);
						case 'easeInOutStrong':
							return (e /= a / 2), 1 > e ? (o / 2) * Math.pow(2, 10 * (e - 1)) + t : (e--, (o / 2) * (-Math.pow(2, -10 * e) + 2) + t);
						case 'easeInOut':
						case 'mcsEaseInOut':
							return (e /= a / 2), 1 > e ? (o / 2) * e * e * e + t : ((e -= 2), (o / 2) * (e * e * e + 2) + t);
						case 'easeOutSmooth':
							return (e /= a), e--, -o * (e * e * e * e - 1) + t;
						case 'easeOutStrong':
							return o * (-Math.pow(2, (-10 * e) / a) + 1) + t;
						case 'easeOut':
						case 'mcsEaseOut':
						default:
							var i = (e /= a) * e,
								r = i * e;
							return t + o * (0.499999999999997 * r * i + -2.5 * i * i + 5.5 * r + -6.5 * i + 4 * e);
					}
				}
				e._mTween || (e._mTween = { top: {}, left: {} });
				var f,
					h,
					r = r || {},
					m = r.onStart || function () {},
					p = r.onUpdate || function () {},
					g = r.onComplete || function () {},
					v = J(),
					x = 0,
					_ = e.offsetTop,
					w = e.style,
					S = e._mTween[t];
				'left' === t && (_ = e.offsetLeft);
				var b = o - _;
				(S.stop = 0), 'none' !== i && d(), c();
			},
			J = function () {
				return window.performance && window.performance.now
					? window.performance.now()
					: window.performance && window.performance.webkitNow
					? window.performance.webkitNow()
					: Date.now
					? Date.now()
					: new Date().getTime();
			},
			K = function () {
				var e = this;
				e._mTween || (e._mTween = { top: {}, left: {} });
				for (var t = ['top', 'left'], o = 0; o < t.length; o++) {
					var a = t[o];
					e._mTween[a].id &&
						(window.requestAnimationFrame ? window.cancelAnimationFrame(e._mTween[a].id) : clearTimeout(e._mTween[a].id),
						(e._mTween[a].id = null),
						(e._mTween[a].stop = 1));
				}
			},
			Z = function (e, t) {
				try {
					delete e[t];
				} catch (o) {
					e[t] = null;
				}
			},
			$ = function (e) {
				return !(e.which && 1 !== e.which);
			},
			ee = function (e) {
				var t = e.originalEvent.pointerType;
				return !(t && 'touch' !== t && 2 !== t);
			},
			te = function (e) {
				return !isNaN(parseFloat(e)) && isFinite(e);
			},
			oe = function (e) {
				var t = e.parents('.mCSB_container');
				return [e.offset().top - t.offset().top, e.offset().left - t.offset().left];
			},
			ae = function () {
				function e() {
					var e = ['webkit', 'moz', 'ms', 'o'];
					if ('hidden' in document) return 'hidden';
					for (var t = 0; t < e.length; t++) if (e[t] + 'Hidden' in document) return e[t] + 'Hidden';
					return null;
				}
				var t = e();
				return t ? document[t] : !1;
			};
		(e.fn[o] = function (t) {
			return u[t]
				? u[t].apply(this, Array.prototype.slice.call(arguments, 1))
				: 'object' != typeof t && t
				? void e.error('Method ' + t + ' does not exist')
				: u.init.apply(this, arguments);
		}),
			(e[o] = function (t) {
				return u[t]
					? u[t].apply(this, Array.prototype.slice.call(arguments, 1))
					: 'object' != typeof t && t
					? void e.error('Method ' + t + ' does not exist')
					: u.init.apply(this, arguments);
			}),
			(e[o].defaults = i),
			(window[o] = !0),
			e(window).bind('load', function () {
				e(n)[o](),
					e.extend(e.expr[':'], {
						mcsInView:
							e.expr[':'].mcsInView ||
							function (t) {
								var o,
									a,
									n = e(t),
									i = n.parents('.mCSB_container');
								if (i.length)
									return (
										(o = i.parent()),
										(a = [i[0].offsetTop, i[0].offsetLeft]),
										a[0] + oe(n)[0] >= 0 &&
											a[0] + oe(n)[0] < o.height() - n.outerHeight(!1) &&
											a[1] + oe(n)[1] >= 0 &&
											a[1] + oe(n)[1] < o.width() - n.outerWidth(!1)
									);
							},
						mcsInSight:
							e.expr[':'].mcsInSight ||
							function (t) {
								var o,
									a,
									n,
									i,
									r = e(t),
									l = r.parents('.mCSB_container');
								if (l.length)
									return (
										(o = [r.outerHeight(!1), r.outerWidth(!1)]),
										(n = [l[0].offsetTop + oe(r)[0], l[0].offsetLeft + oe(r)[1]]),
										(a = [l.parent()[0].offsetHeight, l.parent()[0].offsetWidth]),
										(i = [o[0] < a[0] ? [0.9, 0.1] : [0.6, 0.4], o[1] < a[1] ? [0.9, 0.1] : [0.6, 0.4]]),
										n[0] - a[0] * i[0][0] < 0 &&
											n[0] + o[0] - a[0] * i[0][1] >= 0 &&
											n[1] - a[1] * i[1][0] < 0 &&
											n[1] + o[1] - a[1] * i[1][1] >= 0
									);
							},
						mcsOverflow:
							e.expr[':'].mcsOverflow ||
							function (t) {
								var o = e(t).data(a);
								if (o) return o.overflowed[0] || o.overflowed[1];
							},
					});
			});
	});
});

/*!
 * jQuery Mousewheel 3.1.13
 *
 * Copyright 2015 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
!(function (a) {
	'function' == typeof define && define.amd ? define(['jquery'], a) : 'object' == typeof exports ? (module.exports = a) : a(jQuery);
})(function (a) {
	function b(b) {
		var g = b || window.event,
			h = i.call(arguments, 1),
			j = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0;
		if (
			((b = a.event.fix(g)),
			(b.type = 'mousewheel'),
			'detail' in g && (m = -1 * g.detail),
			'wheelDelta' in g && (m = g.wheelDelta),
			'wheelDeltaY' in g && (m = g.wheelDeltaY),
			'wheelDeltaX' in g && (l = -1 * g.wheelDeltaX),
			'axis' in g && g.axis === g.HORIZONTAL_AXIS && ((l = -1 * m), (m = 0)),
			(j = 0 === m ? l : m),
			'deltaY' in g && ((m = -1 * g.deltaY), (j = m)),
			'deltaX' in g && ((l = g.deltaX), 0 === m && (j = -1 * l)),
			0 !== m || 0 !== l)
		) {
			if (1 === g.deltaMode) {
				var q = a.data(this, 'mousewheel-line-height');
				(j *= q), (m *= q), (l *= q);
			} else if (2 === g.deltaMode) {
				var r = a.data(this, 'mousewheel-page-height');
				(j *= r), (m *= r), (l *= r);
			}
			if (
				((n = Math.max(Math.abs(m), Math.abs(l))),
				(!f || f > n) && ((f = n), d(g, n) && (f /= 40)),
				d(g, n) && ((j /= 40), (l /= 40), (m /= 40)),
				(j = Math[j >= 1 ? 'floor' : 'ceil'](j / f)),
				(l = Math[l >= 1 ? 'floor' : 'ceil'](l / f)),
				(m = Math[m >= 1 ? 'floor' : 'ceil'](m / f)),
				k.settings.normalizeOffset && this.getBoundingClientRect)
			) {
				var s = this.getBoundingClientRect();
				(o = b.clientX - s.left), (p = b.clientY - s.top);
			}
			return (
				(b.deltaX = l),
				(b.deltaY = m),
				(b.deltaFactor = f),
				(b.offsetX = o),
				(b.offsetY = p),
				(b.deltaMode = 0),
				h.unshift(b, j, l, m),
				e && clearTimeout(e),
				(e = setTimeout(c, 200)),
				(a.event.dispatch || a.event.handle).apply(this, h)
			);
		}
	}
	function c() {
		f = null;
	}
	function d(a, b) {
		return k.settings.adjustOldDeltas && 'mousewheel' === a.type && b % 120 === 0;
	}
	var e,
		f,
		g = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
		h = 'onwheel' in document || document.documentMode >= 9 ? ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
		i = Array.prototype.slice;
	if (a.event.fixHooks) for (var j = g.length; j; ) a.event.fixHooks[g[--j]] = a.event.mouseHooks;
	var k = (a.event.special.mousewheel = {
		version: '3.1.12',
		setup: function () {
			if (this.addEventListener) for (var c = h.length; c; ) this.addEventListener(h[--c], b, !1);
			else this.onmousewheel = b;
			a.data(this, 'mousewheel-line-height', k.getLineHeight(this)), a.data(this, 'mousewheel-page-height', k.getPageHeight(this));
		},
		teardown: function () {
			if (this.removeEventListener) for (var c = h.length; c; ) this.removeEventListener(h[--c], b, !1);
			else this.onmousewheel = null;
			a.removeData(this, 'mousewheel-line-height'), a.removeData(this, 'mousewheel-page-height');
		},
		getLineHeight: function (b) {
			var c = a(b),
				d = c['offsetParent' in a.fn ? 'offsetParent' : 'parent']();
			return d.length || (d = a('body')), parseInt(d.css('fontSize'), 10) || parseInt(c.css('fontSize'), 10) || 16;
		},
		getPageHeight: function (b) {
			return a(b).height();
		},
		settings: { adjustOldDeltas: !0, normalizeOffset: !0 },
	});
	a.fn.extend({
		mousewheel: function (a) {
			return a ? this.bind('mousewheel', a) : this.trigger('mousewheel');
		},
		unmousewheel: function (a) {
			return this.unbind('mousewheel', a);
		},
	});
});

/*! WOW - v1.1.2 - 2016-04-08
 * Copyright (c) 2016 Matthieu Aussaguel;*/ (function () {
	var a,
		b,
		c,
		d,
		e,
		f = function (a, b) {
			return function () {
				return a.apply(b, arguments);
			};
		},
		g =
			[].indexOf ||
			function (a) {
				for (var b = 0, c = this.length; c > b; b++) if (b in this && this[b] === a) return b;
				return -1;
			};
	(b = (function () {
		function a() {}
		return (
			(a.prototype.extend = function (a, b) {
				var c, d;
				for (c in b) (d = b[c]), null == a[c] && (a[c] = d);
				return a;
			}),
			(a.prototype.isMobile = function (a) {
				return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a);
			}),
			(a.prototype.createEvent = function (a, b, c, d) {
				var e;
				return (
					null == b && (b = !1),
					null == c && (c = !1),
					null == d && (d = null),
					null != document.createEvent
						? ((e = document.createEvent('CustomEvent')), e.initCustomEvent(a, b, c, d))
						: null != document.createEventObject
						? ((e = document.createEventObject()), (e.eventType = a))
						: (e.eventName = a),
					e
				);
			}),
			(a.prototype.emitEvent = function (a, b) {
				return null != a.dispatchEvent ? a.dispatchEvent(b) : b in (null != a) ? a[b]() : 'on' + b in (null != a) ? a['on' + b]() : void 0;
			}),
			(a.prototype.addEvent = function (a, b, c) {
				return null != a.addEventListener ? a.addEventListener(b, c, !1) : null != a.attachEvent ? a.attachEvent('on' + b, c) : (a[b] = c);
			}),
			(a.prototype.removeEvent = function (a, b, c) {
				return null != a.removeEventListener
					? a.removeEventListener(b, c, !1)
					: null != a.detachEvent
					? a.detachEvent('on' + b, c)
					: delete a[b];
			}),
			(a.prototype.innerHeight = function () {
				return 'innerHeight' in window ? window.innerHeight : document.documentElement.clientHeight;
			}),
			a
		);
	})()),
		(c =
			this.WeakMap ||
			this.MozWeakMap ||
			(c = (function () {
				function a() {
					(this.keys = []), (this.values = []);
				}
				return (
					(a.prototype.get = function (a) {
						var b, c, d, e, f;
						for (f = this.keys, b = d = 0, e = f.length; e > d; b = ++d) if (((c = f[b]), c === a)) return this.values[b];
					}),
					(a.prototype.set = function (a, b) {
						var c, d, e, f, g;
						for (g = this.keys, c = e = 0, f = g.length; f > e; c = ++e) if (((d = g[c]), d === a)) return void (this.values[c] = b);
						return this.keys.push(a), this.values.push(b);
					}),
					a
				);
			})())),
		(a =
			this.MutationObserver ||
			this.WebkitMutationObserver ||
			this.MozMutationObserver ||
			(a = (function () {
				function a() {
					'undefined' != typeof console && null !== console && console.warn('MutationObserver is not supported by your browser.'),
						'undefined' != typeof console &&
							null !== console &&
							console.warn('WOW.js cannot detect dom mutations, please call .sync() after loading new content.');
				}
				return (a.notSupported = !0), (a.prototype.observe = function () {}), a;
			})())),
		(d =
			this.getComputedStyle ||
			function (a, b) {
				return (
					(this.getPropertyValue = function (b) {
						var c;
						return (
							'float' === b && (b = 'styleFloat'),
							e.test(b) &&
								b.replace(e, function (a, b) {
									return b.toUpperCase();
								}),
							(null != (c = a.currentStyle) ? c[b] : void 0) || null
						);
					}),
					this
				);
			}),
		(e = /(\-([a-z]){1})/g),
		(this.WOW = (function () {
			function e(a) {
				null == a && (a = {}),
					(this.scrollCallback = f(this.scrollCallback, this)),
					(this.scrollHandler = f(this.scrollHandler, this)),
					(this.resetAnimation = f(this.resetAnimation, this)),
					(this.start = f(this.start, this)),
					(this.scrolled = !0),
					(this.config = this.util().extend(a, this.defaults)),
					null != a.scrollContainer && (this.config.scrollContainer = document.querySelector(a.scrollContainer)),
					(this.animationNameCache = new c()),
					(this.wowEvent = this.util().createEvent(this.config.boxClass));
			}
			return (
				(e.prototype.defaults = {
					boxClass: 'wow',
					animateClass: 'animated',
					offset: 0,
					mobile: !0,
					live: !0,
					callback: null,
					scrollContainer: null,
				}),
				(e.prototype.init = function () {
					var a;
					return (
						(this.element = window.document.documentElement),
						'interactive' === (a = document.readyState) || 'complete' === a
							? this.start()
							: this.util().addEvent(document, 'DOMContentLoaded', this.start),
						(this.finished = [])
					);
				}),
				(e.prototype.start = function () {
					var b, c, d, e;
					if (
						((this.stopped = !1),
						(this.boxes = function () {
							var a, c, d, e;
							for (d = this.element.querySelectorAll('.' + this.config.boxClass), e = [], a = 0, c = d.length; c > a; a++)
								(b = d[a]), e.push(b);
							return e;
						}.call(this)),
						(this.all = function () {
							var a, c, d, e;
							for (d = this.boxes, e = [], a = 0, c = d.length; c > a; a++) (b = d[a]), e.push(b);
							return e;
						}.call(this)),
						this.boxes.length)
					)
						if (this.disabled()) this.resetStyle();
						else for (e = this.boxes, c = 0, d = e.length; d > c; c++) (b = e[c]), this.applyStyle(b, !0);
					return (
						this.disabled() ||
							(this.util().addEvent(this.config.scrollContainer || window, 'scroll', this.scrollHandler),
							this.util().addEvent(window, 'resize', this.scrollHandler),
							(this.interval = setInterval(this.scrollCallback, 50))),
						this.config.live
							? new a(
									(function (a) {
										return function (b) {
											var c, d, e, f, g;
											for (g = [], c = 0, d = b.length; d > c; c++)
												(f = b[c]),
													g.push(
														function () {
															var a, b, c, d;
															for (c = f.addedNodes || [], d = [], a = 0, b = c.length; b > a; a++)
																(e = c[a]), d.push(this.doSync(e));
															return d;
														}.call(a)
													);
											return g;
										};
									})(this)
							  ).observe(document.body, { childList: !0, subtree: !0 })
							: void 0
					);
				}),
				(e.prototype.stop = function () {
					return (
						(this.stopped = !0),
						this.util().removeEvent(this.config.scrollContainer || window, 'scroll', this.scrollHandler),
						this.util().removeEvent(window, 'resize', this.scrollHandler),
						null != this.interval ? clearInterval(this.interval) : void 0
					);
				}),
				(e.prototype.sync = function (b) {
					return a.notSupported ? this.doSync(this.element) : void 0;
				}),
				(e.prototype.doSync = function (a) {
					var b, c, d, e, f;
					if ((null == a && (a = this.element), 1 === a.nodeType)) {
						for (a = a.parentNode || a, e = a.querySelectorAll('.' + this.config.boxClass), f = [], c = 0, d = e.length; d > c; c++)
							(b = e[c]),
								g.call(this.all, b) < 0
									? (this.boxes.push(b),
									  this.all.push(b),
									  this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(b, !0),
									  f.push((this.scrolled = !0)))
									: f.push(void 0);
						return f;
					}
				}),
				(e.prototype.show = function (a) {
					return (
						this.applyStyle(a),
						(a.className = a.className + ' ' + this.config.animateClass),
						null != this.config.callback && this.config.callback(a),
						this.util().emitEvent(a, this.wowEvent),
						this.util().addEvent(a, 'animationend', this.resetAnimation),
						this.util().addEvent(a, 'oanimationend', this.resetAnimation),
						this.util().addEvent(a, 'webkitAnimationEnd', this.resetAnimation),
						this.util().addEvent(a, 'MSAnimationEnd', this.resetAnimation),
						a
					);
				}),
				(e.prototype.applyStyle = function (a, b) {
					var c, d, e;
					return (
						(d = a.getAttribute('data-wow-duration')),
						(c = a.getAttribute('data-wow-delay')),
						(e = a.getAttribute('data-wow-iteration')),
						this.animate(
							(function (f) {
								return function () {
									return f.customStyle(a, b, d, c, e);
								};
							})(this)
						)
					);
				}),
				(e.prototype.animate = (function () {
					return 'requestAnimationFrame' in window
						? function (a) {
								return window.requestAnimationFrame(a);
						  }
						: function (a) {
								return a();
						  };
				})()),
				(e.prototype.resetStyle = function () {
					var a, b, c, d, e;
					for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++) (a = d[b]), e.push((a.style.visibility = 'visible'));
					return e;
				}),
				(e.prototype.resetAnimation = function (a) {
					var b;
					return a.type.toLowerCase().indexOf('animationend') >= 0
						? ((b = a.target || a.srcElement), (b.className = b.className.replace(this.config.animateClass, '').trim()))
						: void 0;
				}),
				(e.prototype.customStyle = function (a, b, c, d, e) {
					return (
						b && this.cacheAnimationName(a),
						(a.style.visibility = b ? 'hidden' : 'visible'),
						c && this.vendorSet(a.style, { animationDuration: c }),
						d && this.vendorSet(a.style, { animationDelay: d }),
						e && this.vendorSet(a.style, { animationIterationCount: e }),
						this.vendorSet(a.style, { animationName: b ? 'none' : this.cachedAnimationName(a) }),
						a
					);
				}),
				(e.prototype.vendors = ['moz', 'webkit']),
				(e.prototype.vendorSet = function (a, b) {
					var c, d, e, f;
					d = [];
					for (c in b)
						(e = b[c]),
							(a['' + c] = e),
							d.push(
								function () {
									var b, d, g, h;
									for (g = this.vendors, h = [], b = 0, d = g.length; d > b; b++)
										(f = g[b]), h.push((a['' + f + c.charAt(0).toUpperCase() + c.substr(1)] = e));
									return h;
								}.call(this)
							);
					return d;
				}),
				(e.prototype.vendorCSS = function (a, b) {
					var c, e, f, g, h, i;
					for (h = d(a), g = h.getPropertyCSSValue(b), f = this.vendors, c = 0, e = f.length; e > c; c++)
						(i = f[c]), (g = g || h.getPropertyCSSValue('-' + i + '-' + b));
					return g;
				}),
				(e.prototype.animationName = function (a) {
					var b;
					try {
						b = this.vendorCSS(a, 'animation-name').cssText;
					} catch (c) {
						b = d(a).getPropertyValue('animation-name');
					}
					return 'none' === b ? '' : b;
				}),
				(e.prototype.cacheAnimationName = function (a) {
					return this.animationNameCache.set(a, this.animationName(a));
				}),
				(e.prototype.cachedAnimationName = function (a) {
					return this.animationNameCache.get(a);
				}),
				(e.prototype.scrollHandler = function () {
					return (this.scrolled = !0);
				}),
				(e.prototype.scrollCallback = function () {
					var a;
					return !this.scrolled ||
						((this.scrolled = !1),
						(this.boxes = function () {
							var b, c, d, e;
							for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++)
								(a = d[b]), a && (this.isVisible(a) ? this.show(a) : e.push(a));
							return e;
						}.call(this)),
						this.boxes.length || this.config.live)
						? void 0
						: this.stop();
				}),
				(e.prototype.offsetTop = function (a) {
					for (var b; void 0 === a.offsetTop; ) a = a.parentNode;
					for (b = a.offsetTop; (a = a.offsetParent); ) b += a.offsetTop;
					return b;
				}),
				(e.prototype.isVisible = function (a) {
					var b, c, d, e, f;
					return (
						(c = a.getAttribute('data-wow-offset') || this.config.offset),
						(f = (this.config.scrollContainer && this.config.scrollContainer.scrollTop) || window.pageYOffset),
						(e = f + Math.min(this.element.clientHeight, this.util().innerHeight()) - c),
						(d = this.offsetTop(a)),
						(b = d + a.clientHeight),
						e >= d && b >= f
					);
				}),
				(e.prototype.util = function () {
					return null != this._util ? this._util : (this._util = new b());
				}),
				(e.prototype.disabled = function () {
					return !this.config.mobile && this.util().isMobile(navigator.userAgent);
				}),
				e
			);
		})());
}.call(this));

/*!
 *
 * jQuery CountDown
 *
 */
/*
!function(a){a.fn.countdown=function(b,c){"use strict";function g(){var b=Date.parse(e.date)/1e3,g=Math.floor(a.now()/1e3);b<=g&&(c.call(this),clearInterval(f));var h=b-g,i=Math.floor(h/86400);h-=60*i*60*24;var j=Math.floor(h/3600);h-=60*j*60;var k=Math.floor(h/60);h-=60*k,1==i?d.find(".timeRefDays").text("day"):d.find(".timeRefDays").text("days"),1==j?d.find(".timeRefHours").text("hour"):d.find(".timeRefHours").text("hours"),1==k?d.find(".timeRefMinutes").text("minute"):d.find(".timeRefMinutes").text("minutes"),1==h?d.find(".timeRefSeconds").text("second"):d.find(".timeRefSeconds").text("seconds"),"on"==e.format&&(i=String(i).length>=2?i:"0"+i,j=String(j).length>=2?j:"0"+j,k=String(k).length>=2?k:"0"+k,h=String(h).length>=2?h:"0"+h),isNaN(b)?(alert("Invalid date. Here's an example: 12 Tuesday 2012 17:30:00"),clearInterval(f)):(d.find(".days").text(i),d.find(".hours").text(j),d.find(".minutes").text(k),d.find(".seconds").text(h))}var d=a(this),e={date:null,format:null};b&&a.extend(e,b);var f;g(),f=setInterval(g,1e3)}}(jQuery);
*/

/* -----------------------------------------------
/* Author : Vincent Garreau  - vincentgarreau.com
/* MIT license: http://opensource.org/licenses/MIT
/* Demo / Generator : vincentgarreau.com/particles.js
/* GitHub : github.com/VincentGarreau/particles.js
/* How to use? : Check the GitHub README
/* v2.0.0
/* ----------------------------------------------- */

/*
function hexToRgb(e){var a=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;e=e.replace(a,function(e,a,t,i){return a+a+t+t+i+i});var t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?{r:parseInt(t[1],16),g:parseInt(t[2],16),b:parseInt(t[3],16)}:null}function clamp(e,a,t){return Math.min(Math.max(e,a),t)}function isInArray(e,a){return a.indexOf(e)>-1}var pJS=function(e,a){var t=document.querySelector("#"+e+" > .particles-js-canvas-el");this.pJS={canvas:{el:t,w:t.offsetWidth,h:t.offsetHeight},particles:{number:{value:400,density:{enable:!0,value_area:800}},color:{value:"#fff"},shape:{type:"circle",stroke:{width:0,color:"#ff0000"},polygon:{nb_sides:5},image:{src:"",width:100,height:100}},opacity:{value:1,random:!1,anim:{enable:!1,speed:2,opacity_min:0,sync:!1}},size:{value:20,random:!1,anim:{enable:!1,speed:20,size_min:0,sync:!1}},line_linked:{enable:!0,distance:100,color:"#fff",opacity:1,width:1},move:{enable:!0,speed:2,direction:"none",random:!1,straight:!1,out_mode:"out",bounce:!1,attract:{enable:!1,rotateX:3e3,rotateY:3e3}},array:[]},interactivity:{detect_on:"canvas",events:{onhover:{enable:!0,mode:"grab"},onclick:{enable:!0,mode:"push"},resize:!0},modes:{grab:{distance:100,line_linked:{opacity:1}},bubble:{distance:200,size:80,duration:.4},repulse:{distance:200,duration:.4},push:{particles_nb:4},remove:{particles_nb:2}},mouse:{}},retina_detect:!1,fn:{interact:{},modes:{},vendors:{}},tmp:{}};var i=this.pJS;a&&Object.deepExtend(i,a),i.tmp.obj={size_value:i.particles.size.value,size_anim_speed:i.particles.size.anim.speed,move_speed:i.particles.move.speed,line_linked_distance:i.particles.line_linked.distance,line_linked_width:i.particles.line_linked.width,mode_grab_distance:i.interactivity.modes.grab.distance,mode_bubble_distance:i.interactivity.modes.bubble.distance,mode_bubble_size:i.interactivity.modes.bubble.size,mode_repulse_distance:i.interactivity.modes.repulse.distance},i.fn.retinaInit=function(){i.retina_detect&&window.devicePixelRatio>1?(i.canvas.pxratio=window.devicePixelRatio,i.tmp.retina=!0):(i.canvas.pxratio=1,i.tmp.retina=!1),i.canvas.w=i.canvas.el.offsetWidth*i.canvas.pxratio,i.canvas.h=i.canvas.el.offsetHeight*i.canvas.pxratio,i.particles.size.value=i.tmp.obj.size_value*i.canvas.pxratio,i.particles.size.anim.speed=i.tmp.obj.size_anim_speed*i.canvas.pxratio,i.particles.move.speed=i.tmp.obj.move_speed*i.canvas.pxratio,i.particles.line_linked.distance=i.tmp.obj.line_linked_distance*i.canvas.pxratio,i.interactivity.modes.grab.distance=i.tmp.obj.mode_grab_distance*i.canvas.pxratio,i.interactivity.modes.bubble.distance=i.tmp.obj.mode_bubble_distance*i.canvas.pxratio,i.particles.line_linked.width=i.tmp.obj.line_linked_width*i.canvas.pxratio,i.interactivity.modes.bubble.size=i.tmp.obj.mode_bubble_size*i.canvas.pxratio,i.interactivity.modes.repulse.distance=i.tmp.obj.mode_repulse_distance*i.canvas.pxratio},i.fn.canvasInit=function(){i.canvas.ctx=i.canvas.el.getContext("2d")},i.fn.canvasSize=function(){i.canvas.el.width=i.canvas.w,i.canvas.el.height=i.canvas.h,i&&i.interactivity.events.resize&&window.addEventListener("resize",function(){i.canvas.w=i.canvas.el.offsetWidth,i.canvas.h=i.canvas.el.offsetHeight,i.tmp.retina&&(i.canvas.w*=i.canvas.pxratio,i.canvas.h*=i.canvas.pxratio),i.canvas.el.width=i.canvas.w,i.canvas.el.height=i.canvas.h,i.particles.move.enable||(i.fn.particlesEmpty(),i.fn.particlesCreate(),i.fn.particlesDraw(),i.fn.vendors.densityAutoParticles()),i.fn.vendors.densityAutoParticles()})},i.fn.canvasPaint=function(){i.canvas.ctx.fillRect(0,0,i.canvas.w,i.canvas.h)},i.fn.canvasClear=function(){i.canvas.ctx.clearRect(0,0,i.canvas.w,i.canvas.h)},i.fn.particle=function(e,a,t){if(this.radius=(i.particles.size.random?Math.random():1)*i.particles.size.value,i.particles.size.anim.enable&&(this.size_status=!1,this.vs=i.particles.size.anim.speed/100,i.particles.size.anim.sync||(this.vs=this.vs*Math.random())),this.x=t?t.x:Math.random()*i.canvas.w,this.y=t?t.y:Math.random()*i.canvas.h,this.x>i.canvas.w-2*this.radius?this.x=this.x-this.radius:this.x<2*this.radius&&(this.x=this.x+this.radius),this.y>i.canvas.h-2*this.radius?this.y=this.y-this.radius:this.y<2*this.radius&&(this.y=this.y+this.radius),i.particles.move.bounce&&i.fn.vendors.checkOverlap(this,t),this.color={},"object"==typeof e.value)if(e.value instanceof Array){var s=e.value[Math.floor(Math.random()*i.particles.color.value.length)];this.color.rgb=hexToRgb(s)}else void 0!=e.value.r&&void 0!=e.value.g&&void 0!=e.value.b&&(this.color.rgb={r:e.value.r,g:e.value.g,b:e.value.b}),void 0!=e.value.h&&void 0!=e.value.s&&void 0!=e.value.l&&(this.color.hsl={h:e.value.h,s:e.value.s,l:e.value.l});else"random"==e.value?this.color.rgb={r:Math.floor(256*Math.random())+0,g:Math.floor(256*Math.random())+0,b:Math.floor(256*Math.random())+0}:"string"==typeof e.value&&(this.color=e,this.color.rgb=hexToRgb(this.color.value));this.opacity=(i.particles.opacity.random?Math.random():1)*i.particles.opacity.value,i.particles.opacity.anim.enable&&(this.opacity_status=!1,this.vo=i.particles.opacity.anim.speed/100,i.particles.opacity.anim.sync||(this.vo=this.vo*Math.random()));var n={};switch(i.particles.move.direction){case"top":n={x:0,y:-1};break;case"top-right":n={x:.5,y:-.5};break;case"right":n={x:1,y:-0};break;case"bottom-right":n={x:.5,y:.5};break;case"bottom":n={x:0,y:1};break;case"bottom-left":n={x:-.5,y:1};break;case"left":n={x:-1,y:0};break;case"top-left":n={x:-.5,y:-.5};break;default:n={x:0,y:0}}i.particles.move.straight?(this.vx=n.x,this.vy=n.y,i.particles.move.random&&(this.vx=this.vx*Math.random(),this.vy=this.vy*Math.random())):(this.vx=n.x+Math.random()-.5,this.vy=n.y+Math.random()-.5),this.vx_i=this.vx,this.vy_i=this.vy;var r=i.particles.shape.type;if("object"==typeof r){if(r instanceof Array){var c=r[Math.floor(Math.random()*r.length)];this.shape=c}}else this.shape=r;if("image"==this.shape){var o=i.particles.shape;this.img={src:o.image.src,ratio:o.image.width/o.image.height},this.img.ratio||(this.img.ratio=1),"svg"==i.tmp.img_type&&void 0!=i.tmp.source_svg&&(i.fn.vendors.createSvgImg(this),i.tmp.pushing&&(this.img.loaded=!1))}},i.fn.particle.prototype.draw=function(){function e(){i.canvas.ctx.drawImage(r,a.x-t,a.y-t,2*t,2*t/a.img.ratio)}var a=this;if(void 0!=a.radius_bubble)var t=a.radius_bubble;else var t=a.radius;if(void 0!=a.opacity_bubble)var s=a.opacity_bubble;else var s=a.opacity;if(a.color.rgb)var n="rgba("+a.color.rgb.r+","+a.color.rgb.g+","+a.color.rgb.b+","+s+")";else var n="hsla("+a.color.hsl.h+","+a.color.hsl.s+"%,"+a.color.hsl.l+"%,"+s+")";switch(i.canvas.ctx.fillStyle=n,i.canvas.ctx.beginPath(),a.shape){case"circle":i.canvas.ctx.arc(a.x,a.y,t,0,2*Math.PI,!1);break;case"edge":i.canvas.ctx.rect(a.x-t,a.y-t,2*t,2*t);break;case"triangle":i.fn.vendors.drawShape(i.canvas.ctx,a.x-t,a.y+t/1.66,2*t,3,2);break;case"polygon":i.fn.vendors.drawShape(i.canvas.ctx,a.x-t/(i.particles.shape.polygon.nb_sides/3.5),a.y-t/.76,2.66*t/(i.particles.shape.polygon.nb_sides/3),i.particles.shape.polygon.nb_sides,1);break;case"star":i.fn.vendors.drawShape(i.canvas.ctx,a.x-2*t/(i.particles.shape.polygon.nb_sides/4),a.y-t/1.52,2*t*2.66/(i.particles.shape.polygon.nb_sides/3),i.particles.shape.polygon.nb_sides,2);break;case"image":if("svg"==i.tmp.img_type)var r=a.img.obj;else var r=i.tmp.img_obj;r&&e()}i.canvas.ctx.closePath(),i.particles.shape.stroke.width>0&&(i.canvas.ctx.strokeStyle=i.particles.shape.stroke.color,i.canvas.ctx.lineWidth=i.particles.shape.stroke.width,i.canvas.ctx.stroke()),i.canvas.ctx.fill()},i.fn.particlesCreate=function(){for(var e=0;e<i.particles.number.value;e++)i.particles.array.push(new i.fn.particle(i.particles.color,i.particles.opacity.value))},i.fn.particlesUpdate=function(){for(var e=0;e<i.particles.array.length;e++){var a=i.particles.array[e];if(i.particles.move.enable){var t=i.particles.move.speed/2;a.x+=a.vx*t,a.y+=a.vy*t}if(i.particles.opacity.anim.enable&&(1==a.opacity_status?(a.opacity>=i.particles.opacity.value&&(a.opacity_status=!1),a.opacity+=a.vo):(a.opacity<=i.particles.opacity.anim.opacity_min&&(a.opacity_status=!0),a.opacity-=a.vo),a.opacity<0&&(a.opacity=0)),i.particles.size.anim.enable&&(1==a.size_status?(a.radius>=i.particles.size.value&&(a.size_status=!1),a.radius+=a.vs):(a.radius<=i.particles.size.anim.size_min&&(a.size_status=!0),a.radius-=a.vs),a.radius<0&&(a.radius=0)),"bounce"==i.particles.move.out_mode)var s={x_left:a.radius,x_right:i.canvas.w,y_top:a.radius,y_bottom:i.canvas.h};else var s={x_left:-a.radius,x_right:i.canvas.w+a.radius,y_top:-a.radius,y_bottom:i.canvas.h+a.radius};switch(a.x-a.radius>i.canvas.w?(a.x=s.x_left,a.y=Math.random()*i.canvas.h):a.x+a.radius<0&&(a.x=s.x_right,a.y=Math.random()*i.canvas.h),a.y-a.radius>i.canvas.h?(a.y=s.y_top,a.x=Math.random()*i.canvas.w):a.y+a.radius<0&&(a.y=s.y_bottom,a.x=Math.random()*i.canvas.w),i.particles.move.out_mode){case"bounce":a.x+a.radius>i.canvas.w?a.vx=-a.vx:a.x-a.radius<0&&(a.vx=-a.vx),a.y+a.radius>i.canvas.h?a.vy=-a.vy:a.y-a.radius<0&&(a.vy=-a.vy)}if(isInArray("grab",i.interactivity.events.onhover.mode)&&i.fn.modes.grabParticle(a),(isInArray("bubble",i.interactivity.events.onhover.mode)||isInArray("bubble",i.interactivity.events.onclick.mode))&&i.fn.modes.bubbleParticle(a),(isInArray("repulse",i.interactivity.events.onhover.mode)||isInArray("repulse",i.interactivity.events.onclick.mode))&&i.fn.modes.repulseParticle(a),i.particles.line_linked.enable||i.particles.move.attract.enable)for(var n=e+1;n<i.particles.array.length;n++){var r=i.particles.array[n];i.particles.line_linked.enable&&i.fn.interact.linkParticles(a,r),i.particles.move.attract.enable&&i.fn.interact.attractParticles(a,r),i.particles.move.bounce&&i.fn.interact.bounceParticles(a,r)}}},i.fn.particlesDraw=function(){i.canvas.ctx.clearRect(0,0,i.canvas.w,i.canvas.h),i.fn.particlesUpdate();for(var e=0;e<i.particles.array.length;e++){var a=i.particles.array[e];a.draw()}},i.fn.particlesEmpty=function(){i.particles.array=[]},i.fn.particlesRefresh=function(){cancelRequestAnimFrame(i.fn.checkAnimFrame),cancelRequestAnimFrame(i.fn.drawAnimFrame),i.tmp.source_svg=void 0,i.tmp.img_obj=void 0,i.tmp.count_svg=0,i.fn.particlesEmpty(),i.fn.canvasClear(),i.fn.vendors.start()},i.fn.interact.linkParticles=function(e,a){var t=e.x-a.x,s=e.y-a.y,n=Math.sqrt(t*t+s*s);if(n<=i.particles.line_linked.distance){var r=i.particles.line_linked.opacity-n/(1/i.particles.line_linked.opacity)/i.particles.line_linked.distance;if(r>0){var c=i.particles.line_linked.color_rgb_line;i.canvas.ctx.strokeStyle="rgba("+c.r+","+c.g+","+c.b+","+r+")",i.canvas.ctx.lineWidth=i.particles.line_linked.width,i.canvas.ctx.beginPath(),i.canvas.ctx.moveTo(e.x,e.y),i.canvas.ctx.lineTo(a.x,a.y),i.canvas.ctx.stroke(),i.canvas.ctx.closePath()}}},i.fn.interact.attractParticles=function(e,a){var t=e.x-a.x,s=e.y-a.y,n=Math.sqrt(t*t+s*s);if(n<=i.particles.line_linked.distance){var r=t/(1e3*i.particles.move.attract.rotateX),c=s/(1e3*i.particles.move.attract.rotateY);e.vx-=r,e.vy-=c,a.vx+=r,a.vy+=c}},i.fn.interact.bounceParticles=function(e,a){var t=e.x-a.x,i=e.y-a.y,s=Math.sqrt(t*t+i*i),n=e.radius+a.radius;n>=s&&(e.vx=-e.vx,e.vy=-e.vy,a.vx=-a.vx,a.vy=-a.vy)},i.fn.modes.pushParticles=function(e,a){i.tmp.pushing=!0;for(var t=0;e>t;t++)i.particles.array.push(new i.fn.particle(i.particles.color,i.particles.opacity.value,{x:a?a.pos_x:Math.random()*i.canvas.w,y:a?a.pos_y:Math.random()*i.canvas.h})),t==e-1&&(i.particles.move.enable||i.fn.particlesDraw(),i.tmp.pushing=!1)},i.fn.modes.removeParticles=function(e){i.particles.array.splice(0,e),i.particles.move.enable||i.fn.particlesDraw()},i.fn.modes.bubbleParticle=function(e){function a(){e.opacity_bubble=e.opacity,e.radius_bubble=e.radius}function t(a,t,s,n,c){if(a!=t)if(i.tmp.bubble_duration_end){if(void 0!=s){var o=n-p*(n-a)/i.interactivity.modes.bubble.duration,l=a-o;d=a+l,"size"==c&&(e.radius_bubble=d),"opacity"==c&&(e.opacity_bubble=d)}}else if(r<=i.interactivity.modes.bubble.distance){if(void 0!=s)var v=s;else var v=n;if(v!=a){var d=n-p*(n-a)/i.interactivity.modes.bubble.duration;"size"==c&&(e.radius_bubble=d),"opacity"==c&&(e.opacity_bubble=d)}}else"size"==c&&(e.radius_bubble=void 0),"opacity"==c&&(e.opacity_bubble=void 0)}if(i.interactivity.events.onhover.enable&&isInArray("bubble",i.interactivity.events.onhover.mode)){var s=e.x-i.interactivity.mouse.pos_x,n=e.y-i.interactivity.mouse.pos_y,r=Math.sqrt(s*s+n*n),c=1-r/i.interactivity.modes.bubble.distance;if(r<=i.interactivity.modes.bubble.distance){if(c>=0&&"mousemove"==i.interactivity.status){if(i.interactivity.modes.bubble.size!=i.particles.size.value)if(i.interactivity.modes.bubble.size>i.particles.size.value){var o=e.radius+i.interactivity.modes.bubble.size*c;o>=0&&(e.radius_bubble=o)}else{var l=e.radius-i.interactivity.modes.bubble.size,o=e.radius-l*c;o>0?e.radius_bubble=o:e.radius_bubble=0}if(i.interactivity.modes.bubble.opacity!=i.particles.opacity.value)if(i.interactivity.modes.bubble.opacity>i.particles.opacity.value){var v=i.interactivity.modes.bubble.opacity*c;v>e.opacity&&v<=i.interactivity.modes.bubble.opacity&&(e.opacity_bubble=v)}else{var v=e.opacity-(i.particles.opacity.value-i.interactivity.modes.bubble.opacity)*c;v<e.opacity&&v>=i.interactivity.modes.bubble.opacity&&(e.opacity_bubble=v)}}}else a();"mouseleave"==i.interactivity.status&&a()}else if(i.interactivity.events.onclick.enable&&isInArray("bubble",i.interactivity.events.onclick.mode)){if(i.tmp.bubble_clicking){var s=e.x-i.interactivity.mouse.click_pos_x,n=e.y-i.interactivity.mouse.click_pos_y,r=Math.sqrt(s*s+n*n),p=((new Date).getTime()-i.interactivity.mouse.click_time)/1e3;p>i.interactivity.modes.bubble.duration&&(i.tmp.bubble_duration_end=!0),p>2*i.interactivity.modes.bubble.duration&&(i.tmp.bubble_clicking=!1,i.tmp.bubble_duration_end=!1)}i.tmp.bubble_clicking&&(t(i.interactivity.modes.bubble.size,i.particles.size.value,e.radius_bubble,e.radius,"size"),t(i.interactivity.modes.bubble.opacity,i.particles.opacity.value,e.opacity_bubble,e.opacity,"opacity"))}},i.fn.modes.repulseParticle=function(e){function a(){var a=Math.atan2(d,p);if(e.vx=u*Math.cos(a),e.vy=u*Math.sin(a),"bounce"==i.particles.move.out_mode){var t={x:e.x+e.vx,y:e.y+e.vy};t.x+e.radius>i.canvas.w?e.vx=-e.vx:t.x-e.radius<0&&(e.vx=-e.vx),t.y+e.radius>i.canvas.h?e.vy=-e.vy:t.y-e.radius<0&&(e.vy=-e.vy)}}if(i.interactivity.events.onhover.enable&&isInArray("repulse",i.interactivity.events.onhover.mode)&&"mousemove"==i.interactivity.status){var t=e.x-i.interactivity.mouse.pos_x,s=e.y-i.interactivity.mouse.pos_y,n=Math.sqrt(t*t+s*s),r={x:t/n,y:s/n},c=i.interactivity.modes.repulse.distance,o=100,l=clamp(1/c*(-1*Math.pow(n/c,2)+1)*c*o,0,50),v={x:e.x+r.x*l,y:e.y+r.y*l};"bounce"==i.particles.move.out_mode?(v.x-e.radius>0&&v.x+e.radius<i.canvas.w&&(e.x=v.x),v.y-e.radius>0&&v.y+e.radius<i.canvas.h&&(e.y=v.y)):(e.x=v.x,e.y=v.y)}else if(i.interactivity.events.onclick.enable&&isInArray("repulse",i.interactivity.events.onclick.mode))if(i.tmp.repulse_finish||(i.tmp.repulse_count++,i.tmp.repulse_count==i.particles.array.length&&(i.tmp.repulse_finish=!0)),i.tmp.repulse_clicking){var c=Math.pow(i.interactivity.modes.repulse.distance/6,3),p=i.interactivity.mouse.click_pos_x-e.x,d=i.interactivity.mouse.click_pos_y-e.y,m=p*p+d*d,u=-c/m*1;c>=m&&a()}else 0==i.tmp.repulse_clicking&&(e.vx=e.vx_i,e.vy=e.vy_i)},i.fn.modes.grabParticle=function(e){if(i.interactivity.events.onhover.enable&&"mousemove"==i.interactivity.status){var a=e.x-i.interactivity.mouse.pos_x,t=e.y-i.interactivity.mouse.pos_y,s=Math.sqrt(a*a+t*t);if(s<=i.interactivity.modes.grab.distance){var n=i.interactivity.modes.grab.line_linked.opacity-s/(1/i.interactivity.modes.grab.line_linked.opacity)/i.interactivity.modes.grab.distance;if(n>0){var r=i.particles.line_linked.color_rgb_line;i.canvas.ctx.strokeStyle="rgba("+r.r+","+r.g+","+r.b+","+n+")",i.canvas.ctx.lineWidth=i.particles.line_linked.width,i.canvas.ctx.beginPath(),i.canvas.ctx.moveTo(e.x,e.y),i.canvas.ctx.lineTo(i.interactivity.mouse.pos_x,i.interactivity.mouse.pos_y),i.canvas.ctx.stroke(),i.canvas.ctx.closePath()}}}},i.fn.vendors.eventsListeners=function(){"window"==i.interactivity.detect_on?i.interactivity.el=window:i.interactivity.el=i.canvas.el,(i.interactivity.events.onhover.enable||i.interactivity.events.onclick.enable)&&(i.interactivity.el.addEventListener("mousemove",function(e){if(i.interactivity.el==window)var a=e.clientX,t=e.clientY;else var a=e.offsetX||e.clientX,t=e.offsetY||e.clientY;i.interactivity.mouse.pos_x=a,i.interactivity.mouse.pos_y=t,i.tmp.retina&&(i.interactivity.mouse.pos_x*=i.canvas.pxratio,i.interactivity.mouse.pos_y*=i.canvas.pxratio),i.interactivity.status="mousemove"}),i.interactivity.el.addEventListener("mouseleave",function(e){i.interactivity.mouse.pos_x=null,i.interactivity.mouse.pos_y=null,i.interactivity.status="mouseleave"})),i.interactivity.events.onclick.enable&&i.interactivity.el.addEventListener("click",function(){if(i.interactivity.mouse.click_pos_x=i.interactivity.mouse.pos_x,i.interactivity.mouse.click_pos_y=i.interactivity.mouse.pos_y,i.interactivity.mouse.click_time=(new Date).getTime(),i.interactivity.events.onclick.enable)switch(i.interactivity.events.onclick.mode){case"push":i.particles.move.enable?i.fn.modes.pushParticles(i.interactivity.modes.push.particles_nb,i.interactivity.mouse):1==i.interactivity.modes.push.particles_nb?i.fn.modes.pushParticles(i.interactivity.modes.push.particles_nb,i.interactivity.mouse):i.interactivity.modes.push.particles_nb>1&&i.fn.modes.pushParticles(i.interactivity.modes.push.particles_nb);break;case"remove":i.fn.modes.removeParticles(i.interactivity.modes.remove.particles_nb);break;case"bubble":i.tmp.bubble_clicking=!0;break;case"repulse":i.tmp.repulse_clicking=!0,i.tmp.repulse_count=0,i.tmp.repulse_finish=!1,setTimeout(function(){i.tmp.repulse_clicking=!1},1e3*i.interactivity.modes.repulse.duration)}})},i.fn.vendors.densityAutoParticles=function(){if(i.particles.number.density.enable){var e=i.canvas.el.width*i.canvas.el.height/1e3;i.tmp.retina&&(e/=2*i.canvas.pxratio);var a=e*i.particles.number.value/i.particles.number.density.value_area,t=i.particles.array.length-a;0>t?i.fn.modes.pushParticles(Math.abs(t)):i.fn.modes.removeParticles(t)}},i.fn.vendors.checkOverlap=function(e,a){for(var t=0;t<i.particles.array.length;t++){var s=i.particles.array[t],n=e.x-s.x,r=e.y-s.y,c=Math.sqrt(n*n+r*r);c<=e.radius+s.radius&&(e.x=a?a.x:Math.random()*i.canvas.w,e.y=a?a.y:Math.random()*i.canvas.h,i.fn.vendors.checkOverlap(e))}},i.fn.vendors.createSvgImg=function(e){var a=i.tmp.source_svg,t=/#([0-9A-F]{3,6})/gi,s=a.replace(t,function(a,t,i,s){if(e.color.rgb)var n="rgba("+e.color.rgb.r+","+e.color.rgb.g+","+e.color.rgb.b+","+e.opacity+")";else var n="hsla("+e.color.hsl.h+","+e.color.hsl.s+"%,"+e.color.hsl.l+"%,"+e.opacity+")";return n}),n=new Blob([s],{type:"image/svg+xml;charset=utf-8"}),r=window.URL||window.webkitURL||window,c=r.createObjectURL(n),o=new Image;o.addEventListener("load",function(){e.img.obj=o,e.img.loaded=!0,r.revokeObjectURL(c),i.tmp.count_svg++}),o.src=c},i.fn.vendors.destroypJS=function(){cancelAnimationFrame(i.fn.drawAnimFrame),t.remove(),pJSDom=null},i.fn.vendors.drawShape=function(e,a,t,i,s,n){var r=s*n,c=s/n,o=180*(c-2)/c,l=Math.PI-Math.PI*o/180;e.save(),e.beginPath(),e.translate(a,t),e.moveTo(0,0);for(var v=0;r>v;v++)e.lineTo(i,0),e.translate(i,0),e.rotate(l);e.fill(),e.restore()},i.fn.vendors.exportImg=function(){window.open(i.canvas.el.toDataURL("image/png"),"_blank")},i.fn.vendors.loadImg=function(e){if(i.tmp.img_error=void 0,""!=i.particles.shape.image.src)if("svg"==e){var a=new XMLHttpRequest;a.open("GET",i.particles.shape.image.src),a.onreadystatechange=function(e){4==a.readyState&&(200==a.status?(i.tmp.source_svg=e.currentTarget.response,i.fn.vendors.checkBeforeDraw()):(console.log("Error pJS - Image not found"),i.tmp.img_error=!0))},a.send()}else{var t=new Image;t.addEventListener("load",function(){i.tmp.img_obj=t,i.fn.vendors.checkBeforeDraw()}),t.src=i.particles.shape.image.src}else console.log("Error pJS - No image.src"),i.tmp.img_error=!0},i.fn.vendors.draw=function(){"image"==i.particles.shape.type?"svg"==i.tmp.img_type?i.tmp.count_svg>=i.particles.number.value?(i.fn.particlesDraw(),i.particles.move.enable?i.fn.drawAnimFrame=requestAnimFrame(i.fn.vendors.draw):cancelRequestAnimFrame(i.fn.drawAnimFrame)):i.tmp.img_error||(i.fn.drawAnimFrame=requestAnimFrame(i.fn.vendors.draw)):void 0!=i.tmp.img_obj?(i.fn.particlesDraw(),i.particles.move.enable?i.fn.drawAnimFrame=requestAnimFrame(i.fn.vendors.draw):cancelRequestAnimFrame(i.fn.drawAnimFrame)):i.tmp.img_error||(i.fn.drawAnimFrame=requestAnimFrame(i.fn.vendors.draw)):(i.fn.particlesDraw(),i.particles.move.enable?i.fn.drawAnimFrame=requestAnimFrame(i.fn.vendors.draw):cancelRequestAnimFrame(i.fn.drawAnimFrame))},i.fn.vendors.checkBeforeDraw=function(){"image"==i.particles.shape.type?"svg"==i.tmp.img_type&&void 0==i.tmp.source_svg?i.tmp.checkAnimFrame=requestAnimFrame(check):(cancelRequestAnimFrame(i.tmp.checkAnimFrame),i.tmp.img_error||(i.fn.vendors.init(),i.fn.vendors.draw())):(i.fn.vendors.init(),i.fn.vendors.draw())},i.fn.vendors.init=function(){i.fn.retinaInit(),i.fn.canvasInit(),i.fn.canvasSize(),i.fn.canvasPaint(),i.fn.particlesCreate(),i.fn.vendors.densityAutoParticles(),i.particles.line_linked.color_rgb_line=hexToRgb(i.particles.line_linked.color)},i.fn.vendors.start=function(){isInArray("image",i.particles.shape.type)?(i.tmp.img_type=i.particles.shape.image.src.substr(i.particles.shape.image.src.length-3),i.fn.vendors.loadImg(i.tmp.img_type)):i.fn.vendors.checkBeforeDraw()},i.fn.vendors.eventsListeners(),i.fn.vendors.start()};Object.deepExtend=function(e,a){for(var t in a)a[t]&&a[t].constructor&&a[t].constructor===Object?(e[t]=e[t]||{},arguments.callee(e[t],a[t])):e[t]=a[t];return e},window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}(),window.cancelRequestAnimFrame=function(){return window.cancelAnimationFrame||window.webkitCancelRequestAnimationFrame||window.mozCancelRequestAnimationFrame||window.oCancelRequestAnimationFrame||window.msCancelRequestAnimationFrame||clearTimeout}(),window.pJSDom=[],window.particlesJS=function(e,a){"string"!=typeof e&&(a=e,e="particles-js"),e||(e="particles-js");var t=document.getElementById(e),i="particles-js-canvas-el",s=t.getElementsByClassName(i);if(s.length)for(;s.length>0;)t.removeChild(s[0]);var n=document.createElement("canvas");n.className=i,n.style.width="100%",n.style.height="100%";var r=document.getElementById(e).appendChild(n);null!=r&&pJSDom.push(new pJS(e,a))},window.particlesJS.load=function(e,a,t){var i=new XMLHttpRequest;i.open("GET",a),i.onreadystatechange=function(a){if(4==i.readyState)if(200==i.status){var s=JSON.parse(a.currentTarget.response);window.particlesJS(e,s),t&&t()}else console.log("Error pJS - XMLHttpRequest status: "+i.status),console.log("Error pJS - File config not found")},i.send()};
*/

/* -----------------------------------------------
/* How to use? : Check the GitHub README
/* ----------------------------------------------- */

/* To load a config file (particles.json) you need to host this demo (MAMP/WAMP/local)... */
/*
particlesJS.load('particles-js', 'particles.json', function() {
  console.log('particles.js loaded - callback');
});
*/

/* Otherwise just put the config content (json): */

/*particlesJS('particles-js',

  {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 5,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 6,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true,
    "config_demo": {
      "hide_card": false,
      "background_color": "#b61924",
      "background_image": "",
      "background_position": "50% 50%",
      "background_repeat": "no-repeat",
      "background_size": "cover"
    }
  }

);*/
