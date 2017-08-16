var ANIMATION_TIME = 300;
var ANIMATION_TIME_FAST = 100;
var ANIMATION_TIME_SLOW = 900;

var MIN_WIDTH_PHONE = 320;
var MAX_WIDTH_PHONE = 480;

var MIN_WIDTH_TABLET = 640;
var MAX_WIDTH_TABLET = 800;

var MIN_WIDTH_DESKTOP = 960;
var MAX_WIDTH_DESKTOP = 1120;

var resources = {
	constant : {},
	icon : {},
	msg : {},
	setting : {}
};

/* init */
document.addEventListener("DOMContentLoaded", function() {
	Ajax.init();
	ConfirmNavigation.init();
	Reset.init();
	System.init();
});

/* ajax */
var Ajax = {
	EVENT : "jsfAjax",

	init : function() {
		jsf.ajax.addOnEvent(Ajax.onEvent);
		window.addEventListener(Ajax.EVENT, Ajax.listener);
	},

	onEvent : function(data) {
		triggerCustomEvent(Ajax.EVENT, data);
	},

	listener : function(event) {
		var data = event.detail;

		switch (data.status) {
		case "begin":
			if (getAttributeElement(data.source, "data-onbegin") != null) {
				eval(getAttributeElement(data.source, "data-onbegin"));
			}

			if (data.source.tagName == "BUTTON") {
				if (hasClassElement(data.source, "disabled-loading")) {
					setDisabledElement(data.source, true);
				} else {
					CommandButton.loadingOn(data.source);
					Wait.disable();
				}
			}

			SessionTimeout.reset();

			break;
		case "complete":
			if (getAttributeElement(data.source, "data-oncomplete") != null) {
				eval(getAttributeElement(data.source, "data-oncomplete"));
			}

			if (data.source.tagName == "BUTTON") {
				if (hasClassElement(data.source, "disabled-loading")) {
					setDisabledElement(data.source, false);
				} else {
					CommandButton.loadingOff(data.source);
					Wait.enable();
				}
			}

			break;
		case "success":
			if (getAttributeElement(data.source, "data-onsuccess") != null) {
				eval(getAttributeElement(data.source, "data-onsuccess"));
			}

			if (!facesContext.validationFailed && getAttributeElement(data.source, "data-onvalidation") != null) {
				eval(getAttributeElement(data.source, "data-onvalidation"));
			}

			Reset.init();
			break;
		}

		Wait.status(data.status);
	}
};

/* panel */
var Panel = {
	accordion : {
		init : function(id) {
			var panel = getElement(id + ":id");
			var panelHead = getSelector("#" + id + ":id .head");
			var panelBody = getSelector("#" + id + ":id .body");
			var opened = getBoolean(getAttributeElement(panel, "data-opened"));

			if (opened) {
				setAttributeElement(panelHead, "title", resources.msg.compress);
				if (print) {
					removeClassElement(panel, "noPrint");
				}
			} else {
				var iconHead1 = getElement("#" + id + ":id .accordion-icon-1");
				var iconHead2 = getElement("#" + id + ":id .accordion-icon-2");

				setAttributeElement(panelBody, "data-height", getHeightElement(panelBody));
				panelBody.style.height = "0";

				addClassElement(iconHead1, "trz90Ne");
				addClassElement(iconHead2, "trz45Ne");

				setAttributeElement(panelHead, "title", resources.msg.expand);
				if (print) {
					addClassElement(panel, "noPrint");
				}
			}

			remove(id + ":script");
		},

		onclick : function(id, onclick) {
			var panel = getElement(id + ":id");
			var panelHead = getSelector("#" + id + ":id .head");
			var panelBody = getSelector("#" + id + ":id .body");
			var opened = getBoolean(getAttributeElement(panel, "data-opened"));

			var print = getBoolean(getAttributeElement(panel, "data-only-print-when-opened"));

			var iconHead1 = getElement("#" + id + ":id .accordion-icon-1");
			var iconHead2 = getElement("#" + id + ":id .accordion-icon-2");

			if (opened) {
				var animate = getAttributeElement(panel, "data-animateout");

				setAttributeElement(panelBody, "data-height", getHeightElement(panelBody));
				panelBody.style.height = getAttributeElement(panelBody, "data-height") + "px";

				setTimeout(function() {
					panelBody.style.height = "0";
					addClassElement(panelBody, "animate-" + animate);
				}, 10);

				setTimeout(function() {
					removeClassElement(panelBody, "animate-" + animate);
				}, ANIMATION_TIME);

				addClassElement(iconHead1, "trz90Ne");
				addClassElement(iconHead2, "trz45Ne");

				setAttributeElement(panel, "data-opened", "false");
				setAttributeElement(panelHead, "title", resources.msg.expand);
				if (print) {
					addClassElement(panel, "noPrint");
				}
			} else {
				var animate = getAttributeElement(panel, "data-animatein");

				panelBody.style.height = getAttributeElement(panelBody, "data-height") + "px";
				addClassElement(panelBody, "animate-" + animate);

				setTimeout(function() {
					panelBody.style.height = "";
					removeClassElement(panelBody, "animate-" + animate);
				}, ANIMATION_TIME);

				removeClassElement(iconHead1, "trz90Ne");
				removeClassElement(iconHead2, "trz45Ne");

				setAttributeElement(panel, "data-opened", "true");
				setAttributeElement(panelHead, "title", resources.msg.compress);
				if (print) {
					removeClassElement(panel, "noPrint");
				}
			}

			setTimeout(function() {
				eval(onclick);
			}, ANIMATION_TIME + 10);
		}
	}

};

/* commandButton */
var CommandButton = {
	init : function(id) {
		var element = getElement(id + ":id");

		var waitBox = element.children[0];
		var waitIcon = waitBox.firstElementChild;

		var valueBox = element.children[1];
		var valueBoxHeight = Math.round(getHeightElement(valueBox));

		waitIcon.innerHTML = Wait.getSvg(16);
		remove(id + ":script");
	},

	loadingOn : function(element) {
		var waitBox = element.children[0];
		var textBox = element.children[1];

		setDisabledElement(element, true);
		addClassElement(element, "cWait vTop");

		replaceClassElement(waitBox, "dNone", "dBlock");

		replaceClassElement(textBox, "vVisible", "vHidden");
		addClassElement(textBox, "h0");
		addClassElement(textBox, "oHidden");
	},

	loadingOff : function(element) {
		var waitBox = element.children[0];
		var textBox = element.children[1];

		setDisabledElement(element, false);
		removeClassElement(element, "cWait vTop");

		replaceClassElement(waitBox, "dBlock", "dNone");

		replaceClassElement(textBox, "vHidden", "vVisible");
		removeClassElement(textBox, "h0");
		removeClassElement(textBox, "oHidden");
	}
};

/* confirmNavigation */
var ConfirmNavigation = {
	form : undefined,
	enable : undefined,

	init : function() {
		ConfirmNavigation.initAttributes();

		if (ConfirmNavigation.form.length > 0) {
			ConfirmNavigation.enable = true;

			ConfirmNavigation.listener();
			ConfirmNavigation.action();

			window.addEventListener("beforeunload", ConfirmNavigation.verify);
		}
	},

	initAttributes : function() {
		ConfirmNavigation.form = [];
		ConfirmNavigation.enable = false;

		document.querySelectorAll("form[data-confirm-navigation]").forEach(function(form) {
			ConfirmNavigation.form.push({
				id : form.id,
				serialize : getElement(form.id).serialize()
			});
		});
	},

	listener : function() {
		window.addEventListener(Ajax.EVENT, function(event) {
			var data = event.detail;

			switch (data.status) {
			case "complete":
				var formElement = (data.source).closest("form");

				if (formElement != null) {
					var form = Array.get(ConfirmNavigation.form, "id", formElement.id);

					if (form != null) {
						form.oldSerialize = form.serialize;
						form.serialize = getElement(form.id).serialize();
					}
				}

				break;
			case "success":
				var formElement = (data.source).closest("form");

				if (formElement != null) {
					var form = Array.get(ConfirmNavigation.form, "id", formElement.id);

					if (form != null) {
						if (facesContext.maximumSeverity.indexOf("INFO") === -1) {
							form.serialize = form.oldSerialize;
						}

						form.oldSerialize = undefined;
					}
				}

				break;
			}
		});
	},

	action : function() {
		document.querySelectorAll("form[data-confirm-navigation]").forEach(function(formElement) {
			formElement.addEventListener("submit", function(event) {
				var form = Array.get(ConfirmNavigation.form, "id", this.id);
				form.serialize = this.serialize();
			});
		});
	},

	verify : function(event) {
		setTimeout(function() {
			LoadingPage.off();
		}, 5000);

		ConfirmNavigation.form.forEach(function(form) {
			if (ConfirmNavigation.enable && ConfirmNavigation.modifiedForm(form)) {
				addClass(form.id, "animate animate-no");
				setTimeout(function() {
					removeClass(form.id, "animate animate-no");
				}, ANIMATION_TIME);

				if (event) {
					event.returnValue = resources.msg.confirm_navigation_info;
				}

				return resources.msg.confirm_navigation_info;
			}
		});
	},

	modifiedForm : function(form) {
		if (form.serialize != getElement(form.id).serialize()) {
			return true;
		}

		return false;
	},

	modifiedForms : function() {
		ConfirmNavigation.form.forEach(function(form) {
			if (ConfirmNavigation.modifiedForm(form)) {
				return true;
			}
		});

		return false;
	},

	on : function(id) {
		ConfirmNavigation.enable = true;
	},

	off : function(id) {
		ConfirmNavigation.enable = false;
	}

};

/* dataTable */
var DataTable = {
	init : function(id, size, rowIndex, onclick) {
		var row = getElement(id + ":dataTable:td:" + rowIndex).parentNode;
		setAttributeElement(row, "id", id + ":dataTable:tr:" + rowIndex);

		row.addEventListener("click", function() {
			getElement(id + ":rowIndex").value = rowIndex;
			getElement(id + ":rowIndex").onchange();
			eval(onclick);
		}, false);

		setClassElement(row, "cPointer");
		remove(id + ":dataTable:td:" + rowIndex);
		try {
			remove(id + ":dataTable:td:-1");
			setAttribute(id + ":dataTable", "data-size", size);
		} catch (e) {
		}
	},

	search : function(id, value) {
		getElement(id + ":searchInputText").value = value;
		getElement(id + ":searchCommandButton:id").click();
	}

};

/* fab */
Fab = {
	id : undefined,

	action : function(event, id) {
		if (event !== undefined) {
			event.stopPropagation();
		}

		if (id !== undefined) {
			Fab.id = id;
		}

		var fab = getElement(Fab.id);

		var modal = getBoolean(getAttributeElement(fab, "data-modal")) ? fab.previousSibling : null;
		var opened = getBoolean(getAttributeElement(fab, "data-opened"));

		var items = getElement("#" + fab.id + " .fabItems");
		var icon = getElement("#" + fab.id + " .trigger i.tTransform");

		if (opened) {
			var animate = getAttributeElement(fab, "data-animateout");

			if (modal != null) {
				addClassElement(modal, "animate-fadeOut");
				setTimeout(function() {
					removeClassElement(modal, "animate-fadeOut");
					addClassElement(modal, "dNone");
				}, ANIMATION_TIME);
			}

			addClassElement(items, "animate-" + animate);
			setTimeout(function() {
				removeClassElement(items, "animate-" + animate);
				addClassElement(items, "dNone");
			}, ANIMATION_TIME);

			removeClassElement(icon, "trz225");

			setAttributeElement(fab, "data-opened", "false");

			window.removeEventListener("click", Fab.closeableClick);
			window.removeEventListener("keydown", Fab.closeableKey);

			Fab.id = null;
		} else {
			var animate = getAttributeElement(fab, "data-animatein");

			if (modal != null) {
				addClassElement(modal, "animate-fadeIn");
				removeClassElement(modal, "dNone");
				setTimeout(function() {
					removeClassElement(modal, "animate-fadeIn");
				}, ANIMATION_TIME);
			}

			addClassElement(items, "animate-" + animate);
			removeClassElement(items, "dNone");
			setTimeout(function() {
				removeClassElement(items, "animate-" + animate);
			}, ANIMATION_TIME);

			addClassElement(icon, "trz225");

			setAttributeElement(fab, "data-opened", "true");

			window.addEventListener("click", Fab.closeableClick);
			window.addEventListener("keydown", Fab.closeableKey);
		}
	},

	closeableClick : function(event) {
		Fab.action(event);
	},

	closeableKey : function(event) {
		actionToEscKey(event, Fab.action);
	}
};

/* floatIfNotVisible */
var FloatIfNotVisible = function() {
	var verify = function(element) {
		var style = "pFixed w100 " + (getAttributeElement(element, "data-floatClass") || "");
		var completely = hasClassElement(element, "-completely");

		if (hasClassElement(element, "js-float-top-if-not-visible")) {
			style += " aTop aLeft";
			if (!isVisibleVerticalElement(element, completely)) {
				addClassElement(element.firstElementChild, style);
			} else {
				removeClassElement(element.firstElementChild, style);
			}
		} else if (hasClassElement(element, "js-float-left-if-not-visible")) {
			style += " aTop aLeft";
			if (!isVisibleHorizontalElement(element, completely)) {
				addClassElement(element.firstElementChild, style);
			} else {
				removeClassElement(element.firstElementChild, style);
			}
		} else if (hasClassElement(element, "js-float-bottom-if-not-visible")) {
			style += " aBottom aLeft";
			if (!isVisibleVerticalElement(element, completely)) {
				addClassElement(element.firstElementChild, style);
			} else {
				removeClassElement(element.firstElementChild, style);
			}
		} else {
			style += " aTop aRight";
			if (!isVisibleHorizontalElement(element, completely)) {
				addClassElement(element.firstElementChild, style);
			} else {
				removeClassElement(element.firstElementChild, style);
			}
		}
	};

	var getElementArray = function() {
		return getSelectors("[class*='js-float-']");
	};

	return {
		init : function() {
			var elementArray = getElementArray();
			for (var i = 0; i < elementArray.length; i++) {
				addStyleElement(elementArray[i], "z-index: " + (elementArray.length - i) + ";");
				if (hasClassElement(elementArray[i], "js-float-top-if-not-visible")
						|| hasClassElement(elementArray[i], "js-float-bottom-if-not-visible")) {
					addStyleElement(elementArray[i], "height: " + getHeightElement(elementArray[i]) + "px;");
				} else {
					addStyleElement(elementArray[i], "width: " + getWidthElement(elementArray[i]) + "px;");
				}
			}

			FloatIfNotVisible.process();

			window.addEventListener("scroll", FloatIfNotVisible.process);
			window.addEventListener("resize", FloatIfNotVisible.process);

			// We don't find a event for change of height or width scroll by
			// this we use click event more a setTimeout
			window.addEventListener("click", FloatIfNotVisible.helper);
		},

		process : function() {
			var elementArray = getElementArray();
			for (var i = 0; i < elementArray.length; i++) {
				verify(elementArray[i]);
			}
		},

		helper : function() {
			setTimeout(function() {
				FloatIfNotVisible.process();
			}, ANIMATION_TIME || 200);
		}
	};
}();

/* items */
var Items = {
	SHOW_EVENT : "showItems",
	HIDE_EVENT : "hideItems",

	id : undefined,

	init : function(id, accordion) {
		var items = getElement(id + ":items");
		var trigger = getElement(id + ":trigger");

		if (accordion) {
			var opened = getBoolean(getAttributeElement(items, "data-opened"));

			if (!opened) {
				setAttributeElement(items, "data-height", getHeightElement(items));
				items.style.height = "0";
			}

			if (trigger != null) {
				trigger.addEventListener("click", function() {
					Items.accordion(items.id);
				});
			}
		} else {
			if (trigger != null) {
				trigger.addEventListener("click", function(event) {
					Items.show(event, items.id);
				});
			}
		}

		remove(id + ":script");
	},

	accordion : function(id) {
		var items = getElement(id);
		var opened = getBoolean(getAttributeElement(items, "data-opened"));

		if (opened) {
			var animate = getAttributeElement(items, "data-animateout");

			setAttributeElement(items, "data-height", getHeightElement(items));
			items.style.height = getAttributeElement(items, "data-height") + "px";

			setTimeout(function() {
				items.style.height = "0";
				addClassElement(items.firstElementChild, "animate-" + animate);
			}, 10);

			setTimeout(function() {
				removeClassElement(items.firstElementChild, "animate-" + animate);
			}, ANIMATION_TIME);

			setAttributeElement(items, "data-opened", "false");
		} else {
			var animate = getAttributeElement(items, "data-animatein");

			items.style.height = getAttributeElement(items, "data-height") + "px";
			addClassElement(items.firstElementChild, "animate-" + animate);

			setTimeout(function() {
				items.style.height = "";
				removeClassElement(items.firstElementChild, "animate-" + animate);
			}, ANIMATION_TIME);

			setAttributeElement(items, "data-opened", "true");
		}
	},

	show : function(event, id) {
		if (event !== undefined) {
			event.stopPropagation();
		}

		if (id != Items.id) {
			if (Items.id !== undefined) {
				Items.hide();
			}
			Items.id = id;

			var items = getElement(id);
			var animate = getAttributeElement(items, "data-animatein");

			addClassElement(items.firstElementChild, "animate-" + animate);

			addClassElement(items, "vHidden");
			removeClassElement(items, "dNone");
			Items.resize();
			removeClassElement(items, "vHidden");

			setTimeout(function() {
				removeClassElement(items.firstElementChild, "animate-" + animate);
			}, ANIMATION_TIME);

			window.addEventListener("click", Items.hide);
			window.addEventListener("keydown", Items.closeable);
			window.addEventListener("resize", Items.resize);

			triggerCustomEvent(Items.SHOW_EVENT);
		} else {
			Items.hide();
		}
	},

	hide : function() {
		var items = getElement(Items.id);
		Items.id = undefined;

		var animate = getAttributeElement(items, "data-animateout");

		addClassElement(items.firstElementChild, "animate-" + animate);

		setTimeout(function() {
			addClassElement(items, "dNone");

			removeClassElement(items.firstElementChild, "animate-" + animate);
		}, ANIMATION_TIME);

		window.removeEventListener("click", Items.hide);
		window.removeEventListener("keydown", Items.closeable);
		window.removeEventListener("resize", Items.resize);

		triggerCustomEvent(Items.HIDE_EVENT);
	},

	closeable : function(event) {
		actionToEscKey(event, Items.hide);
	},

	resize : function() {
		var component = getElement(Items.id);
		var items = component.firstElementChild;

		items.style.height = "";

		var x = getAbsoluteRightElement(component);
		if (hasClassElement(component, "aRight")) {
			x += getWidthElement(component, true);
		}

		var y = getAbsoluteTopElement(component);
		if (hasClassElement(component, "aBottom")) {
			y += getHeightElement(component, true);
		}

		var openRight = x > getWidthWindow();
		var openBottom = y > getHeightWindow() / 2;

		if (openRight) {
			replaceClassElement(component, "aLeft", "aRight");

			if (openBottom) {
				replaceClassElement(component, "aTop", "aBottom");
			} else {
				replaceClassElement(component, "aBottom", "aTop");
			}
		} else {
			replaceClassElement(component, "aRight", "aLeft");

			if (openBottom) {
				replaceClassElement(component, "aTop", "aBottom");
			} else {
				replaceClassElement(component, "aBottom", "aTop");
			}
		}

		autoscrollHeightElement(items, 10);
	}
};

/* loadingPage */
var LoadingPage = {
	element : undefined,
	isEnable : undefined,

	init : function() {
		LoadingPage.element = getElement("loadingPage");
		LoadingPage.enable();

		window.addEventListener("load", function(event) {
			if (LoadingPage.isEnable) {
				LoadingPage.off();
			}
		});

		window.addEventListener("beforeunload", function(event) {
			if (LoadingPage.isEnable) {
				LoadingPage.on();
			}
		});
	},

	on : function() {
		removeClassElement(LoadingPage.element, "dNone");
	},

	off : function() {
		addClassElement(LoadingPage.element, "dNone");
	},

	enable : function() {
		LoadingPage.isEnable = true;
	},

	disable : function() {
		LoadingPage.isEnable = false;
	}
};

/* messages */
var Messages = {
	SHOW_EVENT : "showMessages",
	HIDE_EVENT : "hideMessages",
	TIME_HIDE : undefined,

	element : undefined,

	init : function(id, timeHide) {
		Messages.TIME_HIDE = timeHide;

		Messages.element = getElement(id + ":messages");

		remove(id + ":script");
	},

	show : function(value) {
		if (facesContext.maximumSeverity.indexOf("INFO") !== -1 && Popup.id !== undefined) {
			Popup.hide();
		}

		setInnerHTMLElement(Messages.element.firstElementChild, value);

		Messages.reposition();
		Messages.addAnimate(true);
		removeClassElement(Messages.element, "dNone");

		setTimeout(function() {
			Messages.removeAnimate(true);
		}, ANIMATION_TIME);

		setTimeout(function() {
			Messages.hide();
		}, Messages.TIME_HIDE);

		window.addEventListener("resize", Messages.reposition);

		triggerCustomEvent(Messages.SHOW_EVENT);
	},

	hide : function() {
		Messages.addAnimate(false);

		setTimeout(function() {
			removeInnerHTMLElement(Messages.element.firstElementChild);
			addClassElement(Messages.element, "dNone");
			Messages.removeAnimate(false);
		}, ANIMATION_TIME);

		window.removeEventListener("resize", Messages.reposition);

		triggerCustomEvent(Messages.HIDE_EVENT);
	},

	reposition : function() {
		if (getWidthWindow() <= MIN_WIDTH_TABLET) {
			removeClassElement(Messages.element, "tablet");
		} else {
			addClassElement(Messages.element, "tablet");
		}
	},

	addAnimate : function(isIn) {
		var animate = isIn ? "In" : "Out";

		if (getWidthWindow() <= MIN_WIDTH_TABLET) {
			addClassElement(Messages.element, "animate-fade" + animate + "DownSmall");
		} else {
			addClassElement(Messages.element, "animate-fade" + animate + "RightSmall");
		}
	},

	removeAnimate : function(isIn) {
		var animate = isIn ? "In" : "Out";

		if (getWidthWindow() <= MIN_WIDTH_TABLET) {
			removeClassElement(Messages.element, "animate-fade" + animate + "DownSmall");
		} else {
			removeClassElement(Messages.element, "animate-fade" + animate + "RightSmall");
		}
	}
};

/* menu */
var Menu = {
	init : function(id) {
		var menu = getElement(id);
		var trigger = menu.firstElementChild;
		var items = getElement("#" + id + " .items");

		trigger.addEventListener("click", function(event) {
			Items.show(event, items.id);
		});

		remove(id + ":script");
	}
};

/* navbar */
var Navbar = {
	SHOW_EVENT : "showNavbar",
	HIDE_EVENT : "hideNavbar",

	component : undefined,

	init : function() {
		Navbar.component = getElement("#navbar");

		window.addEventListener("load", function() {
			window.addEventListener("touchstart", Navbar.side.touch.start);
			window.addEventListener("touchmove", Navbar.side.touch.move);
			window.addEventListener("touchend", Navbar.side.touch.end);
		});
	},

	side : {
		SILL : 20,
		WITDH : 240,

		component : undefined,
		isOpen : undefined,

		init : function() {
			Navbar.side.component = getSelector("#navbar .side");
			Navbar.side.isOpen = false;

			Navbar.side.modal.component = getSelector("#navbar .modal");
		},

		state : {
			start : function() {
				Navbar.side.state.progress(0);
			},

			progress : function(x) {
				Navbar.side.component.style.left = x + "px";
			},

			end : function() {
				Navbar.side.state.progress(-(Navbar.side.WITDH + Navbar.side.SILL));
			}
		},

		event : {
			add : function() {
				Navbar.side.modal.component.addEventListener("click", Navbar.side.hide);
				window.addEventListener("keydown", Navbar.side.closeable);
			},

			remove : function() {
				Navbar.side.modal.component.removeEventListener("click", Navbar.side.hide);
				window.removeEventListener("keydown", Navbar.side.closeable);
			}
		},

		show : function() {
			Navbar.side.isOpen = true;

			Navbar.side.event.add();
			Navbar.side.state.start();
			Navbar.side.modal.show();
		},

		hide : function() {
			Navbar.side.isOpen = false;

			Navbar.side.event.remove();
			Navbar.side.state.end();
			Navbar.side.modal.hide();
		},

		closeable : function(event) {
			actionToEscKey(event, Navbar.side.hide);
		},

		modal : {
			component : undefined,

			state : {
				start : function() {
					Navbar.side.modal.state.progress(1);
				},

				progress : function(x) {
					Navbar.side.modal.component.style.opacity = x;
				},

				end : function() {
					Navbar.side.modal.state.progress(0);
				}
			},

			show : function() {
				removeClassElement(Navbar.side.modal.component, "dNone");

				setTimeout(function() {
					Navbar.side.modal.state.start();
				}, 10);

				triggerCustomEvent(Navbar.SHOW_EVENT);
			},

			hide : function() {
				Navbar.side.modal.state.end();

				setTimeout(function() {
					addClassElement(Navbar.side.modal.component, "dNone");
				}, ANIMATION_TIME);

				triggerCustomEvent(Navbar.HIDE_EVENT);
			}
		},

		touch : {
			LIMIT_TIME : 500,

			startPageX : undefined,
			realStartPageX : undefined,
			startTime : undefined,

			start : function(event) {
				var pageX = event.changedTouches[0].pageX;

				if (Navbar.side.isOpen) {
					Navbar.side.touch.startPageX = pageX < Navbar.side.WITDH ? pageX : Navbar.side.WITDH;
					Navbar.side.touch.realStartPageX = pageX;
					Navbar.side.touch.startTime = (new Date()).getTime();

					removeClassElement(Navbar.side.component, "tAll");
					removeClassElement(Navbar.side.modal.component, "oTransition");
				} else if (pageX < Navbar.side.SILL) {
					Navbar.side.touch.startPageX = pageX;
					Navbar.side.touch.realStartPageX = pageX;
					Navbar.side.touch.startTime = (new Date()).getTime();

					removeClassElement(Navbar.side.component, "tAll");
					removeClassElement(Navbar.side.modal.component, "oTransition");
					removeClassElement(Navbar.side.modal.component, "dNone");
				}
			},

			move : function(event) {
				if (Navbar.side.touch.startPageX != undefined) {
					var pageX = event.changedTouches[0].pageX;

					if (pageX < Navbar.side.WITDH) {
						var translate = pageX - (Navbar.side.isOpen ? Navbar.side.touch.startPageX : Navbar.side.WITDH);

						if (translate > 0) {
							translate = 0;
						}

						Navbar.side.state.progress(translate);
						Navbar.side.modal.state.progress(1 - (Math.abs(translate) / Navbar.side.WITDH));
					}
				}
			},

			end : function(event) {
				if (Navbar.side.touch.startPageX != undefined) {
					var pageX = event.changedTouches[0].pageX;

					addClassElement(Navbar.side.component, "tAll");
					addClassElement(Navbar.side.modal.component, "oTransition");

					if (Navbar.side.touch.realStartPageX != pageX) {
						var time = (new Date()).getTime() - Navbar.side.touch.startTime;

						if (time < Navbar.side.touch.LIMIT_TIME) {
							if (pageX < Navbar.side.touch.realStartPageX) {
								if (Navbar.side.isOpen) {
									Navbar.side.hide();
								} else {
									Navbar.side.state.end();
									Navbar.side.modal.state.end();
								}
							} else {
								if (!Navbar.side.isOpen) {
									Navbar.side.show();
								} else {
									Navbar.side.state.start();
									Navbar.side.modal.state.start();
								}
							}
						} else {
							if (pageX < Navbar.side.WITDH / 2) {
								if (Navbar.side.isOpen) {
									Navbar.side.hide();
								} else {
									Navbar.side.state.end();
									Navbar.side.modal.state.end();
								}
							} else {
								if (!Navbar.side.isOpen) {
									Navbar.side.show();
								} else {
									Navbar.side.state.start();
									Navbar.side.modal.state.start();
								}
							}
						}
					} else if (!Navbar.side.isOpen && pageX < Navbar.side.SILL) {
						addClassElement(Navbar.side.modal.component, "dNone");
					}

					Navbar.side.touch.startPageX = undefined;
					Navbar.side.touch.realStartPageX = undefined;
					Navbar.side.touch.startTime = undefined;
				}
			}
		}
	}
};

/* obsoleteBrowser */
var ObsoleteBrowser = {
	init : function(id) {
		document.addEventListener("DOMContentLoaded", function() {
			ObsoleteBrowser.check(id);
		});
	},

	check : function(id) {
		if (localStorage.getItem("notRememberObsoleteBrowser") !== "true") {
			if ((System.browser.name === System.CONSTANT.BROWSER.OPERA && parseFloat(System.browser.version) < 11.60)
					|| (System.browser.name === System.CONSTANT.BROWSER.CHROME && parseFloat(System.browser.version) < 15.0)
					|| (System.browser.name === System.CONSTANT.BROWSER.SAFARI && parseFloat(System.browser.version) < 5.1)
					|| (System.browser.name === System.CONSTANT.BROWSER.FIREFOX && parseFloat(System.browser.version) < 11.0)
					|| (System.browser.name === System.CONSTANT.BROWSER.INTERNET_EXPLORER && parseFloat(System.browser.version) < 10.0)) {
				Popup.show(id);
			}
		}
	},

	onchange : function(check) {
		localStorage.setItem("notRememberObsoleteBrowser", check.checked);
	}
}

/* popup */
var Popup = {
	SHOW_EVENT : "showPopup",
	HIDE_EVENT : "hidePopup",

	id : undefined,
	component : undefined,

	container : undefined,
	modal : undefined,

	panel : undefined,
	panelHead : undefined,
	panelBody : undefined,
	panelFoot : undefined,

	isAutocenter : undefined,
	isCloseable : undefined,
	isExpandable : undefined,
	isMovable : undefined,

	init : function(id) {
		Popup.id = id;
		Popup.component = getElement(Popup.id);

		Popup.container = getElement(Popup.id + ":container");
		Popup.modal = getSelector("#" + Popup.id + " .modal");

		Popup.panel = getSelector("#" + Popup.id + " .panel");
		Popup.panelHead = getSelector("#" + Popup.id + " .head");
		Popup.panelBody = getSelector("#" + Popup.id + " .body");
		Popup.panelFoot = getSelector("#" + Popup.id + " .foot");

		Popup.isAutocenter = getBoolean(getAttributeElement(Popup.component, "data-autocenter"));
		Popup.isCloseable = getBoolean(getAttributeElement(Popup.component, "data-closeable"));
		Popup.isExpandable = getBoolean(getAttributeElement(Popup.component, "data-expandable"));
		Popup.isMovable = getBoolean(getAttributeElement(Popup.component, "data-movable"));
	},

	reset : function(data) {
		if (data == undefined || data.status == undefined || data.status == "success") {
			Popup.panel = getSelector("#" + Popup.id + " .panel");
			Popup.panelHead = getSelector("#" + Popup.id + " .head");
			Popup.panelBody = getSelector("#" + Popup.id + " .body");
			Popup.panelFoot = getSelector("#" + Popup.id + " .foot");

			Popup.panelHead.addEventListener("mousedown", Popup.movable);

			Popup.expandable();
			Popup.scrollable();
		}
	},

	dest : function(id) {
		Popup.id = undefined;
		Popup.component = undefined;

		Popup.container = undefined;
		Popup.modal = undefined;

		Popup.panel = undefined;
		Popup.panelHead = undefined;
		Popup.panelBody = undefined;
		Popup.panelFoot = undefined;

		Popup.isAutocenter = undefined;
		Popup.isCloseable = undefined;
		Popup.isExpandable = undefined;
		Popup.isMovable = undefined;
	},

	event : {
		add : function() {
			window.addEventListener("resize", Popup.resize);
			window.addEventListener(Ajax.EVENT, Popup.reset);
			window.addEventListener("keydown", Popup.closeable);
			Popup.panelHead.addEventListener("mousedown", Popup.movable);
		},

		remove : function() {
			window.removeEventListener("resize", Popup.resize);
			window.removeEventListener(Ajax.EVENT, Popup.reset);
			window.removeEventListener("keydown", Popup.closeable);
			Popup.panelHead.removeEventListener("mousedown", Popup.movable);
		}
	},

	show : function(id) {
		if (Popup.id !== undefined) {
			Popup.hide();
			Popup.dest();
		}

		Popup.init(id);
		Popup.event.add();

		addClassElement(getBody(), "oHidden");
		removeClassElement(Popup.component, "dNone");

		Popup.resize();

		removeClassElement(Popup.component, "vHidden");

		setAttributeElement(Popup.component, "data-width", getWidthElement(Popup.panel));

		triggerCustomEvent(Popup.SHOW_EVENT);
	},

	hide : function() {
		Popup.event.remove();

		replaceClassElement(Popup.modal, "fadeIn", "fadeOut");
		replaceClassElement(Popup.container.firstChild, getAttributeElement(Popup.component, "data-animatein"),
				getAttributeElement(Popup.component, "data-animateout"));

		removeClassElement(getBody(), "oHidden");

		var component = Popup.component;
		var container = Popup.container;
		var modal = Popup.modal;
		setTimeout(function() {
			addClassElement(component, "dNone");
			addClassElement(component, "vHidden");

			replaceClassElement(modal, "fadeOut", "fadeIn");
			replaceClassElement(container.firstChild, getAttributeElement(component, "data-animateout"),
					getAttributeElement(component, "data-animatein"));
		}, ANIMATION_TIME);

		Popup.dest();

		triggerCustomEvent(Popup.HIDE_EVENT);
	},

	resize : function() {
		Popup.expandable();
		Popup.autocenter();
		Popup.scrollable();
	},

	autocenter : function() {
		if (Popup.isAutocenter) {
			if (!Popup.isExpandable) {
				Popup.panelBody.style.height = "";
			}

			autocenterElement(Popup.container);
		}
	},

	closeable : function(event) {
		if (Popup.isCloseable) {
			actionToEscKey(event, Popup.hide);
		}
	},

	expandable : function() {
		if (Popup.isExpandable) {
			var height = getHeightWindow();
			var width = getWidthWindow();

			if (width - getAttributeElement(Popup.component, "data-width") <= 20) {
				addClassElement(Popup.component, "expandable");

				Popup.container.style.top = "";
				Popup.container.style.left = "";

				Popup.panel.style.maxWidth = width + "px";
				Popup.panelBody.style.height = (height - getHeightElement(Popup.panelHead) - getHeightElement(Popup.panelFoot))
						+ "px";
			} else {
				removeClassElement(Popup.component, "expandable");

				Popup.panel.style.maxWidth = "";
				Popup.panelBody.style.height = "";
			}
		}
	},

	movable : function(event) {
		if (Popup.isMovable) {
			HandleMove.init(event, Popup.container, Popup.panel, Popup.panelHead);
		}
	},

	scrollable : function() {
		autoscrollHeightElement(Popup.panelBody, Popup.panelFoot);

		if (getHeightElement(Popup.panelBody) - getHeightScrollElement(Popup.panelBody) < 0) {
			addClassElement(Popup.panelHead, "bShadow3dp");
			addClassElement(Popup.panelFoot, "bShadow2dpNe");
		} else {
			removeClassElement(Popup.panelHead, "bShadow3dp");
			removeClassElement(Popup.panelFoot, "bShadow2dpNe");
		}
	}
};

/* selectManyCheckbox */
var SelectManyCheckbox = {
	init : function(id) {
		var checkbox = getSelectors("[name='" + id + ":selectManyCheckbox']");

		for (var i = 0; checkbox[i]; i++) {
			getElement(id + ":" + i).checked = checkbox[i].checked;
		}
	},

	onchange : function(id, index, checked) {
		var element = getElement(id + ":selectManyCheckbox:" + index);

		element.checked = checked;

		if (element.onchange != null) {
			element.onchange();
		}
	},

	onclick : function(id, index) {
		var element = getElement(id + ":selectManyCheckbox:" + index);

		if (element.onclick != null) {
			element.onclick();
		}
	}
};

/* sessionTimeout */
var SessionTimeout = {
	id : undefined,
	maxInactiveInterval : undefined,

	timeout1 : undefined,
	timeout2 : undefined,

	init : function(id, maxInactiveInterval) {
		document.addEventListener("DOMContentLoaded", function() {
			SessionTimeout.id = id;
			SessionTimeout.maxInactiveInterval = maxInactiveInterval;
			SessionTimeout.start();
		});
	},

	start : function() {
		SessionTimeout.timeout1 = setTimeout(function() {
			Popup.show(SessionTimeout.id + ":sessionAboutTimeout");
		}, (SessionTimeout.maxInactiveInterval - 60) * 1000);

		SessionTimeout.timeout2 = setTimeout(function() {
			Popup.show(SessionTimeout.id + ":sessionTimeout");
		}, SessionTimeout.maxInactiveInterval * 1000);
	},

	stop : function() {
		clearTimeout(SessionTimeout.timeout1);
		clearTimeout(SessionTimeout.timeout2);
	},

	reset : function() {
		SessionTimeout.stop();
		SessionTimeout.start();
	}
};

/* wait */
var Wait = {
	element : undefined,
	isEnable : undefined,

	init : function() {
		Wait.element = getElement("wait");
		Wait.element.innerHTML = Wait.getSvg(50);
		Wait.enable();
	},

	status : function(status) {
		if (Wait.isEnable && Wait.element !== undefined) {
			if (status == "begin") {
				Wait.on();
			} else {
				Wait.off();
			}
		}
	},

	on : function() {
		removeClassElement(Wait.element, "dNone");
	},

	off : function() {
		addClassElement(Wait.element, "dNone");
	},

	enable : function() {
		Wait.isEnable = true;
	},

	disable : function() {
		Wait.isEnable = false;
	},

	getSvg : function(size) {
		var svg = '';

		svg += '<svg class="wait-spinner" width="' + size + '" height="' + size + '" viewBox="0 0 44 44">';
		svg += '  <circle class="wait-path" cx="22" cy="22" r="20" fill="none" stroke-width="4"></circle>';
		svg += '</svg>';

		return svg
	}
}

/* reset */
var Reset = {
	init : function() {
		if (Reset.autoheight.enable) {
			Reset.autoheight.on();
		}

		if (Reset.stopEnterSubmit.enable) {
			Reset.stopEnterSubmit.on();
		}

		if (Reset.nextElement.enable) {
			Reset.nextElement.on();
		}

		if (Reset.onlyNumber.enable) {
			Reset.onlyNumber.on();
		}

		ConfirmNavigation.action();
		FloatIfNotVisible.init();
	},

	autoheight : {
		enable : true,

		query : function() {
			return document.querySelectorAll("textarea[data-height]");
		},

		on : function() {
			Reset.autoheight.query().forEach(function(element) {
				var heightValue = Math.max(getAttributeElement(element, "data-height"), element.scrollHeight);
				element.style.height = (heightValue === 0 ? 80 : heightValue) + "px";

				element.addEventListener("keyup", Reset.autoheight.process);
				element.addEventListener("keypress", Reset.autoheight.process);
			});

			Reset.autoheight.enable = true;
		},

		off : function() {
			Reset.autoheight.query().forEach(function(element) {
				element.style.height = "";

				element.removeEventListener("keyup", Reset.autoheight.process);
				element.removeEventListener("keypress", Reset.autoheight.process);
			});

			Reset.autoheight.enable = false;
		},

		process : function(event) {
			this.style.height = "auto";
			this.style.height = Math.max(getAttributeElement(this, "data-height"), this.scrollHeight) + "px";
		}
	},

	stopEnterSubmit : {
		enable : true,

		query : function() {
			return document.querySelectorAll("form");
		},

		on : function() {
			Reset.stopEnterSubmit.query().forEach(function(element) {
				element.addEventListener("keypress", Reset.stopEnterSubmit.process);
			});

			Reset.stopEnterSubmit.enable = true;
		},

		off : function() {
			Reset.stopEnterSubmit.query().forEach(function(element) {
				element.removeEventListener("keypress", Reset.stopEnterSubmit.process);
			});

			Reset.stopEnterSubmit.enable = false;
		},

		process : function(event) {
			var key = event.keyCode || event.which;
			if (key === 13) {
				if (event.target.nodeName != "TEXTAREA" || event.shiftKey) {
					event.preventDefault();
					return false;
				}
			}
		},
	},

	nextElement : {
		enable : true,

		query : function() {
			return document.querySelectorAll("button, input, select, textarea");
		},

		on : function() {
			Reset.nextElement.query().forEach(function(element) {
				element.addEventListener("keyup", Reset.nextElement.process);
			});

			Reset.nextElement.enable = true;
		},

		off : function() {
			Reset.nextElement.query().forEach(function(element) {
				element.removeEventListener("keyup", Reset.nextElement.process);
			});

			Reset.nextElement.enable = false;
		},

		process : function(event) {
			var key = event.keyCode || event.which;

			if (key === 13) {
				var elementArray = Reset.nextElement.query();

				var index;
				for (index = 0; index < elementArray.length; index++) {
					if (elementArray[index] === this) {
						break;
					}
				}

				Reset.nextElement.search(index, elementArray, event);

				event.preventDefault();
				return false;
			}
		},

		search : function(index, elementArray, event) {
			var currentIndex = index;

			do {
				index++;
			} while (elementArray[index].classList.contains("dNone")
					|| elementArray[index].getAttribute("type") === "hidden");

			if (elementArray[currentIndex].nodeName != "TEXTAREA") {
				Reset.nextElement.verify(index, elementArray, event);
			}
		},

		verify : function(index, elementArray, event) {
			if (elementArray[index] != null) {
				if (elementArray[index].getAttribute("type") === "submit") {
					elementArray[index].click();
				} else if (elementArray[index].getAttribute("type") === "button") {
					if (elementArray[index].getAttribute("onclick") != null
							&& elementArray[index].getAttribute("onclick") != "") {
						elementArray[index].click();
					} else {
						Reset.nextElement.search(index, elementArray, event);
					}
				} else {
					elementArray[index].focus();
				}
			} else {
				elementArray[0].focus();
			}
		}
	},

	onlyNumber : {
		enable : true,

		query : function() {
			return document.querySelectorAll("[data-only=number]");
		},

		on : function() {
			Reset.onlyNumber.query().forEach(function(element) {
				element.addEventListener("keyup", Reset.onlyNumber.process);
				element.addEventListener("keypress", Reset.onlyNumber.process);
			});

			Reset.onlyNumber.enable = true;
		},

		off : function() {
			Reset.onlyNumber.query().forEach(function(element) {
				element.removeEventListener("keyup", Reset.onlyNumber.process);
				element.removeEventListener("keypress", Reset.onlyNumber.process);
			});

			Reset.onlyNumber.enable = false;
		},

		process : function(event) {
			var value = this.value + String.fromCharCode(event.keyCode || event.which);
			if (isNaN(value)) {
				event.preventDefault();
				return false;
			}
		}
	}
};