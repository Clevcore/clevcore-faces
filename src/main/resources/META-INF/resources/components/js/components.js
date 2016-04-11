/* var */
var ANIMATION_TIME = 300;

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

	listener : function() {
		var data = event.detail.data;

		switch (data.status) {
		case "begin":
			if (getAttributeElement(data.source, "data-onbegin") != null) {
				eval(getAttributeElement(data.source, "data-onbegin"));
			}

			if (data.source.tagName == "BUTTON") {
				CommandButton.loadingOn(data.source);
				waitDisable();
			}

			break;
		case "complete":
			if (getAttributeElement(data.source, "data-oncomplete") != null) {
				eval(getAttributeElement(data.source, "data-oncomplete"));
			}

			if (data.source.tagName == "BUTTON") {
				CommandButton.loadingOff(data.source);
				waitEnable();
			}

			break;
		case "success":
			if (getAttributeElement(data.source, "data-onsuccess") != null) {
				eval(getAttributeElement(data.source, "data-onsuccess"));
			}

			if (!facesContext.validationFailed && getAttributeElement(data.source, "data-onvalidation") != null) {
				eval(getAttributeElement(data.source, "data-onvalidation"));
			}

			reset();
			break;
		}

		wait(data.status);
	}
};

/* accordion */
function initAccordion(id) {
	var panel = getElement(id + ":id");
	var panelBody = panel.firstChild.childNodes[1];
	var opened = getBoolean(getAttributeElement(panel, "data-opened"));

	if (opened) {
		addClassElement(panelBody, "dBlock oMax");
	} else {
		setAttributeElement(panelBody, "data-height", getHeightElement(panelBody) + "px");
		addClassElement(panelBody, "dNone oMin");
	}
}

function accordion(id, titleCompress, titleExpand) {
	var panel = getElement(id + ":id");
	var panelHead = panel.firstChild.childNodes[0];
	var panelBody = panel.firstChild.childNodes[1];
	var panelFoot = panel.firstChild.childNodes[2];
	var opened = getBoolean(getAttributeElement(panel, "data-opened"));

	if (opened) {
		setAttributeElement(panel, "data-opened", "false");
		addClassElement(panel, "noPrint");

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
		removeClassElement(panel, "noPrint");

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

/* command button */
var CommandButton = {
	loadingOn : function(element) {
		setDisabledElement(element, true);
		addClassElement(element, "vTop");
		replaceClassElement(element.childNodes[0], "dNone", "dBlock");
		replaceClassElement(element.childNodes[1], "vVisible", "vHidden");
		addClassElement(element.childNodes[1], "h0");
		addClassElement(element.childNodes[1], "oHidden");
	},

	loadingOff : function(element) {
		setDisabledElement(element, false);
		removeClassElement(element, "vTop");
		replaceClassElement(element.childNodes[0], "dBlock", "dNone");
		replaceClassElement(element.childNodes[1], "vHidden", "vVisible");
		removeClassElement(element.childNodes[1], "h0");
		removeClassElement(element.childNodes[1], "oHidden");
	}

};

/* confirm navigation */
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
		window.addEventListener('jsfAjaxEvent', function() {
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

	verify : function() {
		ConfirmNavigation.form.forEach(function(form) {
			if (ConfirmNavigation.enable && form.serialize != $("#" + form.id).serialize()) {
				addClass(form.id, "animate animate-no");
				setTimeout(function() {
					removeClass(form.id, "animate animate-no");
				}, ANIMATION_TIME);

				var e = e || window.event;
				if (e) {
					e.returnValue = ConfirmNavigation.message;
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
var fabClick;

function fab(id) {
	id = id;

	var position = getAttributeElement(getElement(id), "data-position");
	var animateIn = getAttributeElement(getElement(id), "data-animatein");
	var animateOut = getAttributeElement(getElement(id), "data-animateout");

	var modal;
	if (eval(getAttributeElement(getElement(id), "data-modal"))) {
		modal = getElement(id).previousSibling;
	} else {
		modal = null;
	}

	var panel;
	var trigger;

	if (position == "topLeft") {
		panel = getElement(id).childNodes[1];
		trigger = getElement(id).childNodes[0].childNodes[0].childNodes[0];
	} else if (position == "topRight") {
		panel = getElement(id).childNodes[1];
		trigger = getElement(id).childNodes[0].childNodes[1].childNodes[0];
	} else if (position == "bottomLeft") {
		panel = getElement(id).childNodes[0];
		trigger = getElement(id).childNodes[1].childNodes[0].childNodes[0];
	} else {
		panel = getElement(id).childNodes[0];
		trigger = getElement(id).childNodes[1].childNodes[1].childNodes[0];
	}

	addClassElement(trigger.childNodes[1].childNodes[0], "tTransform");

	if (getClassElement(panel).indexOf("dNone") != -1) {
		if (modal != null) {
			replaceClassElement(modal, "dNone", "dBlock");
		}

		replaceClassElement(panel, "dNone", "dBlock");
		addClassElement(trigger.childNodes[1].childNodes[0], "trz225");

		idFab = id;
		fabClick = false;

		window.addEventListener("click", fabHandler, false);
		window.addEventListener("keydown", fabHandler, false);
	} else {
		if (modal != null) {
			replaceClassElement(modal, "animate-fadeIn", "animate-fadeOut");
		}

		replaceClassElement(panel, "animate-" + animateIn, "animate-" + animateOut);
		removeClassElement(trigger.childNodes[1].childNodes[0], "trz225");

		setTimeout(function() {
			if (modal != null) {
				replaceClassElement(modal, "dBlock", "dNone");
				replaceClassElement(modal, "animate-fadeOut", "animate-fadeIn");
			}

			replaceClassElement(panel, "dBlock", "dNone");
			replaceClassElement(panel, "animate-" + animateOut, "animate-" + animateIn);
		}, ANIMATION_TIME);

		idFab = null;
		fabClick = null;

		window.removeEventListener("click", fabHandler, false);
		window.removeEventListener("keydown", fabHandler, false);
	}
}

function fabHandler(e) {
	var key = e.which ? e.which : event.keyCode;

	if (fabClick && (key == 1 || key == 27)) {
		fab(idFab);
	}

	if (!fabClick) {
		fabClick = true;
	}
}

/* graphicImage */
function lazyload() {
	$("img.lazy").lazyload();
}

/* menu */
var idMenu = null;

function showMenu(id) {
	if (id != idMenu) {
		idMenu = id;

		removeClass(idMenu + ":menuItems", "dNone");

		window.addEventListener("click", menuHandler);
		window.addEventListener("keydown", menuCloseable);

		event.stopPropagation();
	}
}

function hideMenu() {
	replaceClassElement(getElement(idMenu + ":menuItems").firstChild, "animate-"
			+ getAttribute(idMenu, "data-animatein"), "animate-" + getAttribute(idMenu, "data-animateout"));

	setTimeout(function() {
		addClass(idMenu + ":menuItems", "dNone");

		replaceClassElement(getElement(idMenu + ":menuItems").firstChild, "animate-"
				+ getAttribute(idMenu, "data-animateout"), "animate-" + getAttribute(idMenu, "data-animatein"));

		idMenu = null;
	}, ANIMATION_TIME);

	window.removeEventListener("click", menuHandler);
	window.removeEventListener("keydown", menuCloseable);
}

function menuHandler() {
	if (!containElement(getElement(idMenu + ":menuTrigger"), event.toElement)) {
		hideMenu();
	}
}

function menuCloseable() {
	actionToEscKey(hideMenu);
}

/* popup */
var idPopup = null;

function showPopup(id) {
	idPopup = id;

	addClassElement(getSelector("body"), "oHidden");
	removeClass(idPopup, "dNone");

	popupAutocenter();

	if (getBoolean(getAttribute(idPopup, "data-autocenter"))) {
		window.addEventListener("resize", popupAutocenter);
	}
	if (getBoolean(getAttribute(idPopup, "data-closeable"))) {
		window.addEventListener("keydown", popupCloseable);
	}
	if (getBoolean(getAttribute(idPopup, "data-scrollable"))) {
		popupScrollable();
		window.addEventListener("resize", popupScrollable);
		window.addEventListener("jsfAjaxEvent", popupScrollable);
	}

	if (getAttribute(idPopup, "data-onshow") != null) {
		eval(getAttribute(idPopup, "data-onshow"));
	}

	removeClass(idPopup, "vHidden");
}

function hidePopup(id) {
	if (id != null) {
		idPopup = id;
	}

	replaceClass(idPopup + ":modal", "animate-fadeIn", "animate-fadeOut");

	replaceClassElement(getElement(idPopup + ':id').firstChild, "animate-" + getAttribute(idPopup, "data-animatein"),
			"animate-" + getAttribute(idPopup, "data-animateout"));

	setTimeout(function() {
		addClass(idPopup, "dNone");
		addClass(idPopup, "vHidden");

		replaceClass(idPopup + ":modal", "animate-fadeOut", "animate-fadeIn");
		replaceClassElement(getElement(idPopup + ':id').firstChild, "animate-"
				+ getAttribute(idPopup, "data-animateout"), "animate-" + getAttribute(idPopup, "data-animatein"));
		idPopup = null;
	}, ANIMATION_TIME);

	if (getBoolean(getAttribute(idPopup, "data-autocenter"))) {
		window.removeEventListener("resize", popupAutocenter);
	}
	if (getBoolean(getAttribute(idPopup, "data-closeable"))) {
		window.removeEventListener("keydown", popupCloseable);
	}
	if (getBoolean(getAttribute(idPopup, "data-scrollable"))) {
		window.removeEventListener("resize", popupScrollable);
		window.removeEventListener("jsfAjaxEvent", popupScrollable);
	}

	if (getAttribute(idPopup, "data-onhide") != null) {
		eval(getAttribute(idPopup, "data-onhide"));
	}

	removeClassElement(getSelector("body"), "oHidden");
}

function popupAutocenter() {
	var container = getElement(idPopup + ':id');
	var element = getSelector("#" + idPopup + " .panel");

	autocenterElement(container, element);
}

function popupCloseable() {
	actionToEscKey(hidePopup);
}

function popupMovable() {
	var container = getElement(idPopup + ':id');
	var elementToMove = getSelector("#" + idPopup + " .panel");
	var elementToClick = getSelector("#" + idPopup + " .head");

	HandleMove.init(container, elementToMove, elementToClick);
}

function popupScrollable(data) {
	if (data != undefined && data.status != undefined && data.status != "success") {
		return;
	}

	var popupHead = getSelector("#" + idPopup + " .head");
	var popupBody = getSelector("#" + idPopup + " .body");
	var popupFoot = getSelector("#" + idPopup + " .foot");

	autoscrollHeightElement(popupBody, popupHead, popupFoot);
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