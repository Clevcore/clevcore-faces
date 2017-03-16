/* var */
var ANIMATION_TIME = 300;

var MIN_WIDTH_PHONE = 320;
var MAX_WIDTH_PHONE = 480;

var MIN_WIDTH_TABLET = 640;
var MAX_WIDTH_TABLET = 800;

var MIN_WIDTH_DESKTOP = 960;
var MAX_WIDTH_DESKTOP = 1120;

/* init */
$(document).ready(function() {
	jsf.ajax.addOnEvent(HandleAjax.init.onEvent);
	jsf.ajax.addOnError(HandleAjax.init.onError);

	window.addEventListener('jsfAjaxEvent', HandleAjax.listener);

	ConfirmNavigation.init();
});

var HandleSessionTimeout = {
	maxInactiveInterval : undefined,

	timeout1 : undefined,
	timeout2 : undefined,

	start : function() {
		HandleSessionTimeout.timeout1 = setTimeout(function() {
			showPopup("clevcore-sessionAboutTimeout");
		}, (HandleSessionTimeout.maxInactiveInterval - 60) * 1000);

		HandleSessionTimeout.timeout2 = setTimeout(function() {
			showPopup("clevcore-sessionTimeout");
		}, HandleSessionTimeout.maxInactiveInterval * 1000);
	},

	stop : function() {
		clearTimeout(HandleSessionTimeout.timeout1);
		clearTimeout(HandleSessionTimeout.timeout2);
	},

	reset : function() {
		HandleSessionTimeout.stop();
		HandleSessionTimeout.start();
	}
};

/* ajax */
var HandleAjax = {
	init : {
		onEvent : function onEvent(data) {
			var event = new CustomEvent("jsfAjaxEvent", {
				detail : {
					data : data
				}
			});

			window.dispatchEvent(event);
		},

		onError : function onError(data) {
			var event = new CustomEvent("jsfAjaxError", {
				detail : {
					data : data
				}
			});

			window.dispatchEvent(event);
		}
	},

	listener : function(event) {
		var data = event.detail.data;

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
					waitDisable();
				}
			}

			HandleSessionTimeout.reset();

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
					waitEnable();
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

		wait(data.status);
	}
};

/* accordion */
function initAccordion(id) {
	var panel = getElement(id + ":id");
	var panelBody = panel.children[1];
	var opened = getBoolean(getAttributeElement(panel, "data-opened"));

	if (opened) {
		addClassElement(panelBody, "dBlock oMax");
	} else {
		setAttributeElement(panelBody, "data-height", getHeightElement(panelBody) + "px");
		addClassElement(panelBody, "dNone oMin");

		if (getBoolean(getAttributeElement(panel, "data-only-print-when-opened"))) {
			addClassElement(panel, "noPrint");
		}
	}
}

function accordion(id, titleCompress, titleExpand) {
	var panel = getElement(id + ":id");
	var panelHead = panel.children[0];
	var panelBody = panel.children[1];
	var panelFoot = panel.children[2];
	var opened = getBoolean(getAttributeElement(panel, "data-opened"));

	if (opened) {
		setAttributeElement(panel, "data-opened", "false");

		if (getBoolean(getAttributeElement(panel, "data-only-print-when-opened"))) {
			addClassElement(panel, "noPrint");
		}

		setAttributeElement(panelHead, "title", titleExpand);
		replaceClassElement($(panelHead).find(".fa-chevron-down")[0], "fa-chevron-down", "fa-chevron-right");
		replaceClassElement($(panelHead).find(".fa-minus")[0], "fa-minus", "fa-plus");

		setAttributeElement(panelBody, "data-height", getHeightElement(panelBody) + "px");
		panelBody.style.height = getHeightElement(panelBody) + "px";

		setTimeout(function() {
			replaceClassElement(panelBody, "oMax", "oMin");
			panelBody.style.height = "0px";
		}, 10);

		setTimeout(function() {
			replaceClassElement(panelBody, "dBlock", "dNone");
		}, ANIMATION_TIME);

		setTimeout(function() {
			replaceClassElement(panelFoot, "dBlock", "dNone");
		}, 20);
	} else {
		setAttributeElement(panel, "data-opened", "true");

		if (getBoolean(getAttributeElement(panel, "data-only-print-when-opened"))) {
			removeClassElement(panel, "noPrint");
		}

		setAttributeElement(panelHead, "title", titleCompress);
		replaceClassElement($(panelHead).find(".fa-chevron-right")[0], "fa-chevron-right", "fa-chevron-down");
		replaceClassElement($(panelHead).find(".fa-plus")[0], "fa-plus", "fa-minus");

		panelBody.style.height = "0px";
		replaceClassElement(panelBody, "dNone", "dBlock");

		setTimeout(function() {
			replaceClassElement(panelBody, "oMin", "oMax");
			panelBody.style.height = getAttributeElement(panelBody, "data-height");
		}, 10);

		setTimeout(function() {
			panelBody.style.height = "";
		}, ANIMATION_TIME);

		setTimeout(function() {
			replaceClassElement(panelFoot, "dNone", "dBlock");
		}, 20);
	}
}

/* commandButton */
var CommandButton = {
	loadingOn : function(element) {
		setDisabledElement(element, true);
		addClassElement(element, "vTop");
		replaceClassElement(element.children[0], "dNone", "dBlock");
		replaceClassElement(element.children[1], "vVisible", "vHidden");
		addClassElement(element.children[1], "h0");
		addClassElement(element.children[1], "oHidden");
	},

	loadingOff : function(element) {
		setDisabledElement(element, false);
		removeClassElement(element, "vTop");
		replaceClassElement(element.children[0], "dBlock", "dNone");
		replaceClassElement(element.children[1], "vHidden", "vVisible");
		removeClassElement(element.children[1], "h0");
		removeClassElement(element.children[1], "oHidden");
	}

};

/* confirmNavigation */
var ConfirmNavigation = {
	form : [],
	enable : false,
	message : "",

	init : function() {
		ConfirmNavigation.initAttributes();

		if (ConfirmNavigation.form.length > 0) {
			ConfirmNavigation.enable = true;

			ConfirmNavigation.listener();
			ConfirmNavigation.action();

			$(window).on("beforeunload", ConfirmNavigation.verify);
		}
	},

	initAttributes : function() {
		$("form[data-confirm-navigation]").each(function() {
			ConfirmNavigation.form.push({
				id : this.id,
				serialize : $(this).serialize()
			});
		});
	},

	listener : function() {
		window.addEventListener('jsfAjaxEvent', function(event) {
			var data = event.detail.data;

			switch (data.status) {
			case "complete":
				var formElement = (data.source).closest('form');

				if (formElement != null) {
					var form = Array.get(ConfirmNavigation.form, "id", formElement.id);

					if (form != null) {
						form.oldSerialize = form.serialize;
						form.serialize = $("#" + form.id).serialize();
					}
				}

				break;
			case "success":
				var formElement = (data.source).closest('form');

				if (formElement != null) {
					var form = Array.get(ConfirmNavigation.form, "id", formElement.id);

					if (form != null) {
						if (facesContext.maximumSeverity.indexOf("INFO") == -1) {
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
		$("form[data-confirm-navigation]").submit(function() {
			var form = Array.get(ConfirmNavigation.form, "id", this.id);
			form.serialize = $("#" + form.id).serialize();
		});
	},

	enable : function(id) {
		ConfirmNavigation.enable = true;
	},

	disable : function(id) {
		ConfirmNavigation.enable = false;
	},

	verify : function(event) {
		setTimeout(function() {
			addClass("loadingPage", "dNone");
		}, 5000);

		ConfirmNavigation.form.forEach(function(form) {
			if (ConfirmNavigation.enable && form.serialize != $("#" + form.id).serialize()) {
				addClass(form.id, "animate animate-no");
				setTimeout(function() {
					removeClass(form.id, "animate animate-no");
				}, ANIMATION_TIME);

				if (event) {
					event.returnValue = ConfirmNavigation.message;
				}
				return ConfirmNavigation.message;
			}
		});
	},

	modifiedForms : function() {
		var modifiedForms = false;

		ConfirmNavigation.form.forEach(function(form) {
			if (ConfirmNavigation.enable && form.serialize != $("#" + form.id).serialize()) {
				modifiedForms = true;
				return;
			}
		});

		return modifiedForms;
	}

};

/* dataTable */
function dataTableRow(id, size, rowIndex, onRowClick) {
	var trElement = getElement(id + ":dataTable:td:" + rowIndex).parentNode;
	setAttributeElement(trElement, "id", id + ":dataTable:tr:" + rowIndex);

	trElement.addEventListener('click', function() {
		getElement(id + ':rowIndex').value = rowIndex;
		getElement(id + ':rowIndex').onchange();
		eval(onRowClick);
	}, false);

	setClassElement(trElement, "cPointer");
	remove(id + ":dataTable:td:" + rowIndex);
	try {
		remove(id + ":dataTable:td:-1");
		setAttribute(id + ":dataTable", "data-size", size);
	} catch (e) {
	}
}

function searchDataTable(id, value) {
	getElement(id + ":searchInputText").value = value;
	getElement(id + ":searchCommandButton:id").click();
}

/* fab */
var idFab = null;

function fab(event, id) {
	if (event !== undefined) {
		event.stopPropagation();
	}

	if (id != null) {
		idFab = id;
	}

	var position = getAttributeElement(getElement(idFab), "data-position");
	var animateIn = getAttributeElement(getElement(idFab), "data-animatein");
	var animateOut = getAttributeElement(getElement(idFab), "data-animateout");

	var items = getElement("#" + idFab + " .fabItems");
	var trigger = getElement("#" + idFab + " .trigger button");
	var icon = getElement("#" + idFab + " .trigger i.tTransform");

	var modal;
	if (eval(getAttributeElement(getElement(idFab), "data-modal"))) {
		modal = getElement(idFab).previousSibling;
	} else {
		modal = null;
	}

	if (getClassElement(items).indexOf("dNone") != -1) {
		if (modal != null) {
			replaceClassElement(modal, "dNone", "dBlock");
		}

		replaceClassElement(items, "dNone", "dBlock");
		addClassElement(icon, "trz225");

		window.addEventListener("click", fabCloseableClick, false);
		window.addEventListener("keydown", fabCloseableKey, false);
	} else {
		idFab = null;

		if (modal != null) {
			replaceClassElement(modal, "animate-fadeIn", "animate-fadeOut");
		}

		replaceClassElement(items, "animate-" + animateIn, "animate-" + animateOut);
		removeClassElement(icon, "trz225");

		setTimeout(function() {
			if (modal != null) {
				replaceClassElement(modal, "dBlock", "dNone");
				replaceClassElement(modal, "animate-fadeOut", "animate-fadeIn");
			}

			replaceClassElement(items, "dBlock", "dNone");
			replaceClassElement(items, "animate-" + animateOut, "animate-" + animateIn);
		}, ANIMATION_TIME);

		window.removeEventListener("click", fabCloseableClick, false);
		window.removeEventListener("keydown", fabCloseableKey, false);
	}
}

function fabCloseableClick(event) {
	fab(event);
}

function fabCloseableKey(event) {
	actionToEscKey(event, fab);
}

/* graphicImage */
function lazyload() {
	$("img.lazy").lazyload();
}

/* items */
var idItems = null;

function initItems(id, isAccordion) {
	var items = getElement(id + ":items");
	var trigger = getElement(id + ":trigger");

	if (isAccordion) {
		var opened = getBoolean(getAttributeElement(items, "data-opened"));

		if (!opened) {
			setAttributeElement(items, "data-height", getHeightElement(items));
			items.style.height = "0";
			addClassElement(items, "dNone");
		}

		if (trigger != null) {
			trigger.addEventListener("click", function() {
				accordionItems(items.id);
			});
		}
	} else {
		if (trigger != null) {
			trigger.addEventListener("click", function(event) {
				showItems(event, items.id);
			});
		}
	}
}

function accordionItems(id) {
	var items = getElement(id);
	var opened = getBoolean(getAttributeElement(items, "data-opened"));

	if (opened) {
		var animatein = getAttributeElement(items, "data-animatein");
		var animateout = getAttributeElement(items, "data-animateout");

		setAttributeElement(items, "data-height", getHeightElement(items));
		items.style.height = getAttributeElement(items, "data-height") + "px";

		setTimeout(function() {
			items.style.height = "0";
			replaceClassElement(items.firstElementChild, "animate-" + animatein, "animate-" + animateout);
		}, 10);

		setTimeout(function() {
			addClassElement(items, "dNone");
			replaceClassElement(items.firstElementChild, "animate-" + animateout, "animate-" + animatein);
		}, ANIMATION_TIME);

		setAttributeElement(items, "data-opened", "false");
	} else {
		removeClassElement(items, "dNone");

		setTimeout(function() {
			items.style.height = getAttributeElement(items, "data-height") + "px";
		}, 10);

		setTimeout(function() {
			items.style.height = "";
		}, ANIMATION_TIME);

		setAttributeElement(items, "data-opened", "true");
	}
}

function showItems(event, id) {
	if (event !== undefined) {
		event.stopPropagation();
	}

	if (id != idItems) {
		if (idItems != null) {
			hideItems();
		}
		idItems = id;

		addClass(idItems, "vHidden");
		removeClass(idItems, "dNone");

		itemsResize();

		removeClass(idItems, "vHidden");

		window.addEventListener("click", itemsHandler);
		window.addEventListener("keydown", itemsCloseable);
		window.addEventListener("resize", itemsResize);
	} else {
		hideItems();
	}
}

function hideItems() {
	var items = getElement(idItems);

	var animatein = getAttributeElement(items, "data-animatein");
	var animateout = getAttributeElement(items, "data-animateout");

	replaceClassElement(items.firstElementChild, "animate-" + animatein, "animate-" + animateout);

	setTimeout(function() {
		addClassElement(items, "dNone");

		replaceClassElement(items.firstElementChild, "animate-" + animateout, "animate-" + animatein);
	}, ANIMATION_TIME);

	window.removeEventListener("click", itemsHandler);
	window.removeEventListener("keydown", itemsCloseable);
	window.removeEventListener("resize", itemsResize);

	idItems = null;
}

function itemsHandler() {
	hideItems();
}

function itemsCloseable(event) {
	actionToEscKey(event, hideItems);
}

function itemsResize() {
	var component = getElement(idItems);
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

/* menu */
function initMenu(id) {
	var menu = getElement(id);
	var trigger = menu.firstElementChild;
	var items = getElement("#" + id + " .items");

	trigger.addEventListener("click", function(event) {
		showItems(event, items.id);
	});
}

/* messages */
function initMessages(id, timeHide) {
	var messages = getElement(id + ":old");
	addInnerHTMLElement(messages, true, removeInnerHTMLElement(getElement(id + ":new")));

	var message = messages.firstChild;
	var height = getHeightElement(message);
	message.style.height = "0";

	setTimeout(function() {
		message.style.height = height + "px";
		setClassElement(message, "aRight");
	}, 10);

	setTimeout(function() {
		removeClassElement(messages.lastChild, "aRight");
		messages.lastChild.style.height = "0";
		setTimeout(function() {
			removeElement(messages.lastChild);
		}, ANIMATION_TIME);
	}, timeHide);

	if (hasClassElement(message.firstChild, "info") && Popup.id != null) {
		hidePopup();
	}

	remove(id + ":script");
}

/* navbar */
var Navbar = {
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
			},

			hide : function() {
				Navbar.side.modal.state.end();
				setTimeout(function() {
					addClassElement(Navbar.side.modal.component, "dNone");
				}, ANIMATION_TIME);
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

/* popup */
var Popup = {
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
			window.addEventListener("jsfAjaxEvent", Popup.reset);
			window.addEventListener("keydown", Popup.closeable);
			Popup.panelHead.addEventListener("mousedown", Popup.movable);
		},

		remove : function() {
			window.removeEventListener("resize", Popup.resize);
			window.removeEventListener("jsfAjaxEvent", Popup.reset);
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

		var onshow = getAttributeElement(Popup.component, "data-onshow");
		if (onshow != null) {
			eval(onshow);
		}
	},

	hide : function() {
		Popup.event.remove();

		replaceClassElement(Popup.modal, "fadeIn", "fadeOut");
		replaceClassElement(Popup.container.firstChild, getAttributeElement(Popup.component, "data-animatein"),
				getAttributeElement(Popup.component, "data-animateout"));

		removeClassElement(getBody(), "oHidden");

		var onhide = getAttributeElement(Popup.component, "data-onhide");
		if (onhide != null) {
			eval(onhide);
		}

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
			actionToEscKey(event, hidePopup);
		}
	},

	expandable : function() {
		if (Popup.isExpandable) {
			var height = getHeightWindow();
			var width = getWidthWindow();

			if (width <= MIN_WIDTH_TABLET) {
				Popup.container.style.top = "";
				Popup.container.style.left = "";

				Popup.panel.style.maxWidth = width + "px";
				Popup.panelBody.style.height = (height - getHeightElement(Popup.panelHead) - getHeightElement(Popup.panelFoot))
						+ "px";
			} else {
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
	}
};

/**
 * @deprecated Since version 1.4. Use Popup.show() instead.
 */
function showPopup(id) {
	Popup.show(id);
}

/**
 * @deprecated Since version 1.4. Use Popup.hide() instead.
 */
function hidePopup() {
	Popup.hide();
}

/* selectManyCheckbox */
function initSelectManyCheckbox(id) {
	var checkbox = getSelectors("[name='" + id + ":selectManyCheckbox']");

	for (var i = 0; checkbox[i]; i++) {
		getElement(id + ':' + i).checked = checkbox[i].checked;
	}
}

function selectManyCheckboxChange(id, index, element) {
	var selectManyCheckbox = getElement(id + ':selectManyCheckbox:' + index);

	selectManyCheckbox.checked = element.checked;

	if (selectManyCheckbox.onchange != null) {
		getElement(id + ':selectManyCheckbox:' + index).onchange();
	}
}

function selectManyCheckboxClick(id, index) {
	var selectManyCheckbox = getElement(id + ':selectManyCheckbox:' + index);

	if (selectManyCheckbox.onclick != null) {
		getElement(id + ':selectManyCheckbox:' + index).onclick();
	}
}

/* loadingPage */
function initLoadingpage() {
	window.addEventListener("load", function(event) {
		addClass("loadingPage", "dNone");
	});

	window.addEventListener("beforeunload", function(event) {
		removeClass("loadingPage", "dNone");
	});
}

/* wait */
var isWaitEnable = false;

function wait(status) {
	if (isWaitEnable && getElement("wait") !== undefined) {
		if (status == "begin") {
			removeClass("wait", "dNone");
		} else {
			addClass("wait", "dNone");
		}
	}
}

function waitEnable() {
	isWaitEnable = true;
}

function waitDisable() {
	isWaitEnable = false;
}