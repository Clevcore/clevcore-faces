/* ajax */
var HandleAjax = {};

HandleAjax.listener = function(data) {
	switch (data.status) {
	case "begin":
		if (getAttributeElement(data.source, "data-onbegin") != null) {
			eval(getAttributeElement(data.source, "data-onbegin"));
		}

		if (data.source.tagName == "BUTTON") {
			setDisabledElement(data.source, true);
			addClassElement(data.source, "vTop");
			replaceClassElement(data.source.childNodes[0], "dNone", "dBlock");
			replaceClassElement(data.source.childNodes[1], "vVisible", "vHidden");
			addClassElement(data.source.childNodes[1], "h0");
			addClassElement(data.source.childNodes[1], "oHidden");
			waitDisable();
		}

		break;
	case "complete":
		if (getAttributeElement(data.source, "data-oncomplete") != null) {
			eval(getAttributeElement(data.source, "data-oncomplete"));
		}

		if (data.source.tagName == "BUTTON") {
			setDisabledElement(data.source, false);
			removeClassElement(data.source, "vTop");
			replaceClassElement(data.source.childNodes[0], "dBlock", "dNone");
			replaceClassElement(data.source.childNodes[1], "vHidden", "vVisible");
			removeClassElement(data.source.childNodes[1], "h0");
			removeClassElement(data.source.childNodes[1], "oHidden");
			waitEnable();
		}

		break;
	case "success":
		if (getAttributeElement(data.source, "data-onsuccess") != null) {
			eval(getAttributeElement(data.source, "data-onsuccess"));
		}

		reset();
		break;
	}

	wait(data.status);
};

/* accordion */
function initAccordion(id, opened) {
	var panelBody = getElement(id + ":id").firstChild.childNodes[1];

	addClassElement(panelBody, "hTransition oTransition");
	panelBody.style.maxHeight = getHeightElement(panelBody) + "px";
	if (opened) {
		addClassElement(panelBody, "dBlock oMax");
		panelBody.style.height = getHeightElement(panelBody) + "px";
	} else {
		addClassElement(panelBody, "dNone oMin");
		panelBody.style.height = "0px";
	}
}

function accordion(id) {
	var panelHead = getElement(id + ":id").firstChild.childNodes[0];
	var panelBody = getElement(id + ":id").firstChild.childNodes[1];
	var panelfoot = getElement(id + ":id").firstChild.childNodes[2];

	if ($(panelBody).hasClass("dNone")) {
		replaceClassElement($(panelHead).find(".fa-arrow-down")[0], "fa-arrow-down", "fa-arrow-up");
		replaceClassElement(panelfoot, "dNone", "dBlock");

		replaceClassElement(panelBody, "dNone", "dBlock");
		setTimeout(function() {
			replaceClassElement(panelBody, "oMin", "oMax");
			panelBody.style.height = panelBody.style.maxHeight;
		}, 10);
	} else {
		replaceClassElement($(panelHead).find(".fa-arrow-up")[0], "fa-arrow-up", "fa-arrow-down");
		replaceClassElement(panelfoot, "dBlock", "dNone");

		replaceClassElement(panelBody, "oMax", "oMin");
		panelBody.style.height = "0px";
		setTimeout(function() {
			replaceClassElement(panelBody, "dBlock", "dNone");
		}, 200);
		setTimeout(function() {
			replaceClassElement(panelBody, "dBlock", "dNone");
		}, 200);
	}
}

/* confirm navigation */
var ConfirmNavigation = {
	form : [],
	message : "",

	init : function() {
		ConfirmNavigation.initAttributes();

		ConfirmNavigation.listener();
		ConfirmNavigation.action();

		$(window).on("beforeunload", ConfirmNavigation.verify);
	},

	initAttributes : function() {
		$("form[data-confirm-navigation]").each(function() {
			ConfirmNavigation.form.push({
				id : this.id,
				enable : true
			});
		});
	},

	enable : function(id) {
		ConfirmNavigation.form.forEach(function(form) {
			if (form.id == id) {
				form.enable = true;
			}
		});
	},

	disable : function(id) {
		ConfirmNavigation.form.forEach(function(form) {
			if (form.id == id) {
				form.enable = false;
			}
		});
	},

	listener : function() {
		jsf.ajax.addOnEvent(function(data) {
			switch (data.status) {
			case "complete":
				var id = (data.source).closest('form').id;
				ConfirmNavigation.disable(id);
				break;
			case "success":
				var id = (data.source).closest('form').id;
				ConfirmNavigation.enable(id);
				break;
			}
		});
	},

	action : function() {
		$("form[data-confirm-navigation]").submit(function() {
			var id = this.id;
			ConfirmNavigation.disable(id);
		});
	},

	verify : function() {
		ConfirmNavigation.form.forEach(function(form) {
			if (form.enable) {
				var e = e || window.event;
				if (e) {
					e.returnValue = ConfirmNavigation.message;
				}
				return ConfirmNavigation.message;
			}
		});
	}

};

/* dataTable */
function dataTableRow(id, size, rowIndex, onRowClick) {
	var trElement = getElement(id + ":dataTable:td:" + rowIndex).parentNode;
	setAttributeElement(trElement, "id", id + ":dataTable:tr:" + rowIndex);
	setAttributeElement(trElement, "onclick", "getElement('" + id + ":rowIndex').value = '" + rowIndex
			+ "'; getElement('" + id + ":rowIndex').onchange(); " + onRowClick);
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

/* graphicImage */
function lazyload() {
	$("img.lazy").lazyload();
}

/* menu */
var idMenu = null;
var idMenuTrigger = null;
var isMenuOut = false;

function showMenu(id, idTrigger) {
	hideMenu();

	idMenu = id;
	idMenuTrigger = idTrigger;
	isMenuOut = false;

	setClass(idMenu + ":menu", "dBlock");

	if (window.addEventListener) {
		window.addEventListener("click", menuHandler, false);
		getElement(idMenu + ":id").addEventListener("mouseover", menuOver, false);
		getElement(idMenu + ":id").addEventListener("mouseout", menuOut, false);
		getElement(idMenuTrigger).addEventListener("mouseover", menuOver, false);
		getElement(idMenuTrigger).addEventListener("mouseout", menuOut, false);
	} else {
		window.attachEvent("onclick", menuHandler);
		getElement(idMenu + ":id").attachEvent("onmouseover", menuOver);
		getElement(idMenu + ":id").attachEvent("onmouseout", menuOut);
		getElement(idMenuTrigger).attachEvent("onmouseover", menuOver);
		getElement(idMenuTrigger).attachEvent("onmouseout", menuOut);
	}
}

function hideMenu() {
	if (idMenu != null) {
		setClass(idMenu + ":menu", "dNone");

		if (window.removeEventListener) {
			window.removeEventListener("click", menuHandler, false);
			getElement(idMenu + ":id").removeEventListener("mouseover", menuOver, false);
			getElement(idMenu + ":id").removeEventListener("mouseout", menuOut, false);
			getElement(idMenuTrigger).removeEventListener("mouseover", menuOver, false);
			getElement(idMenuTrigger).removeEventListener("mouseout", menuOut, false);
		} else {
			window.detachEvent("onclick", menuHandler);
			getElement(idMenu + ":id").detachEvent("onmouseover", menuOver);
			getElement(idMenu + ":id").detachEvent("onmouseout", menuOut);
			getElement(idMenuTrigger).detachEvent("onmouseover", menuOver);
			getElement(idMenuTrigger).detachEvent("onmouseout", menuOut);
		}

		idMenu = null;
		idMenuTrigger = null;
	}
}

function menuHandler(e) {
	if (isMenuOut) {
		hideMenu();
	}
}

function menuOver() {
	isMenuOut = false;
}

function menuOut() {
	isMenuOut = true;
}

/* popup */
var idPopup = null;
var statusPopup = false;
var vx, vy;

function showPopup(id) {
	idPopup = id;

	remplaceClass(idPopup, "dNone", "dBlock");

	popupAutoCenter();

	if (window.addEventListener) {
		if (eval(getAttribute(idPopup, "data-autocenter"))) {
			window.addEventListener("resize", popupAutoCenter, false);
		}
		if (eval(getAttribute(idPopup, "data-closeable"))) {
			window.addEventListener("keydown", popupHandler, false);
		}
	} else {
		if (eval(getAttribute(idPopup, "data-autocenter"))) {
			window.attachEvent("onresize", popupAutoCenter);
		}
		if (eval(getAttribute(idPopup, "data-closeable"))) {
			window.attachEvent("onkeydown", popupHandler);
		}
	}
}

function hidePopup(id) {
	if (id != null) {
		idPopup = id;
	}

	remplaceClass(idPopup, "animate-fadeIn", "animate-fadeOut");
	replaceClassElement(getElement(idPopup).firstChild.firstChild.firstChild, "animate-"
			+ getAttribute(idPopup, "data-animatein"), "animate-" + getAttribute(idPopup, "data-animateout"));

	setTimeout(function() {
		remplaceClass(idPopup, "dBlock", "dNone");
		remplaceClass(idPopup, "animate-fadeOut", "animate-fadeIn");
		replaceClassElement(getElement(idPopup).firstChild.firstChild.firstChild, "animate-"
				+ getAttribute(idPopup, "data-animateout"), "animate-" + getAttribute(idPopup, "data-animatein"));
		idPopup = null;
	}, 500);

	if (window.removeEventListener) {
		if (eval(getAttribute(idPopup, "data-autocenter"))) {
			window.removeEventListener("resize", popupAutoCenter, false);
		}
		if (eval(getAttribute(idPopup, "data-closeable"))) {
			window.removeEventListener("keydown", popupHandler, false);
		}
	} else {
		if (eval(getAttribute(idPopup, "data-autocenter"))) {
			window.detachEvent("onresize", popupAutoCenter);
		}
		if (eval(getAttribute(idPopup, "data-closeable"))) {
			window.detachEvent("onkeydown", popupHandler);
		}
	}
}

function popupHandler(e) {
	if (((e.which) ? e.which : event.keyCode) == 27) {
		hidePopup();
	}
}

function movePopup(window, panelMove) {
	panelMove.onmousedown = function(event) {
		addClass("body", "unselectable");
		addClassElement(panelMove, "cMove");

		document.onmousemove = function(event) {
			event = event || window.event;
			if (statusPopup) {
				window.style.left = (event.clientX - vx) + "px";
				window.style.top = (event.clientY - vy) + "px";

				if (panelMove.offsetLeft + panelMove.offsetWidth > widthWindow()) {
					window.style.left = (widthWindow() - panelMove.offsetWidth) + "px";
				}
				if (panelMove.offsetTop + panelMove.offsetHeight > getHeightWindow()) {
					window.style.top = (getHeightWindow() - panelMove.offsetHeight) + "px";
				}
			} else {
				if (!statusPopup) {
					statusPopup = true;
					vx = event.clientX - window.offsetLeft;
					vy = event.clientY - window.offsetTop;
				}
			}
		};

		document.onmouseup = function() {
			removeClass("body", "unselectable");
			removeClassElement(panelMove, "cMove");
			statusPopup = false;
			document.onmousemove = null;
		};
	};
}

function popupAutoCenter() {
	if (idPopup != null) {
		getElement(idPopup).firstChild.firstChild.style.left = "";
		var top = ((getHeightWindow() - 20 - getHeightElement(getElement(idPopup).firstChild.firstChild.firstChild)) / 2)
				+ getHeightCurrentScroll();
		if (top > 0) {
			getElement(idPopup).firstChild.firstChild.style.top = top + "px";
		} else {
			getElement(idPopup).firstChild.firstChild.style.top = "";
		}
	}
}

/* shortcut */
var idShortcut = null;

function shortcut(id) {
	idShortcut = id;

	var position = getAttributeElement(getElement(idShortcut), "data-position");
	var animateIn = getAttributeElement(getElement(idShortcut), "data-animatein");
	var animateOut = getAttributeElement(getElement(idShortcut), "data-animateout");

	var modal;
	if (eval(getAttributeElement(getElement(idShortcut), "data-modal"))) {
		modal = getElement(idShortcut).previousSibling;
	} else {
		modal = null;
	}

	var panel;
	var trigger;

	if (position == "topLeft") {
		panel = getElement(idShortcut).childNodes[1];
		trigger = getElement(idShortcut).childNodes[0].childNodes[0].childNodes[0];
	} else if (position == "topRight") {
		panel = getElement(idShortcut).childNodes[1];
		trigger = getElement(idShortcut).childNodes[0].childNodes[1].childNodes[0];
	} else if (position == "bottomLeft") {
		panel = getElement(idShortcut).childNodes[0];
		trigger = getElement(idShortcut).childNodes[1].childNodes[0].childNodes[0];
	} else {
		panel = getElement(idShortcut).childNodes[0];
		trigger = getElement(idShortcut).childNodes[1].childNodes[1].childNodes[0];
	}

	if (getClassElement(panel).indexOf("dNone") != -1) {
		if (modal != null) {
			replaceClassElement(modal, "dNone", "dBlock");
		}

		replaceClassElement(panel, "dNone", "dBlock");
		addClassElement(trigger, "trz225");

		if (window.addEventListener) {
			window.addEventListener("keydown", shortcutHandler, false);
		} else {
			window.attachEvent("onkeydown", shortcutHandler);
		}
	} else {
		if (modal != null) {
			replaceClassElement(modal, "animate-fadeIn", "animate-fadeOut");
		}

		replaceClassElement(panel, "animate-" + animateIn, "animate-" + animateOut);
		removeClassElement(trigger, "trz225");

		setTimeout(function() {
			if (modal != null) {
				replaceClassElement(modal, "dBlock", "dNone");
				replaceClassElement(modal, "animate-fadeOut", "animate-fadeIn");
			}

			replaceClassElement(panel, "dBlock", "dNone");
			replaceClassElement(panel, "animate-" + animateOut, "animate-" + animateIn);
		}, 500);

		if (window.removeEventListener) {
			window.removeEventListener("keydown", shortcutHandler, false);
		} else {
			window.detachEvent("onkeydown", shortcutHandler);
		}

		idShortcut = null;
	}
}

function shortcutHandler(e) {
	if (((e.which) ? e.which : event.keyCode) == 27) {
		shortcut(idShortcut);
	}
}

/* wait */
function wait(status) {
	if (isWaitEnable) {
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