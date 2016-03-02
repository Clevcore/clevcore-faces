/* generix */
function getHead() {
	return document.head;
}

function getBody() {
	return document.body;
}

function getElement(id) {
	return document.getElementById(id) || getSelector(id);
}

function getSelector(selector) {
	return document.querySelector(selector);
}

function getSelectors(selector) {
	return document.querySelectorAll(selector);
}

function getValue(id) {
	return getValueElement(getElement(id));
}

function getValueElement(element) {
	return element.value;
}

function setValue(id, value) {
	return setValueElement(getElement(id), value);
}

function setValueElement(element, value) {
	return element.value = value;
}

function addValue(id, value, isTop) {
	addValueElement(getElement(id), value, isTop);
}

function addValueElement(element, value, isTop) {
	try {
		var valueCurrent = element.value;

		if (isTop) {
			element.value = value + valueCurrent;
		} else {
			element.value = valueCurrent + value;
		}
	} catch (e) {
	}
}

function focus(id) {
	focusElement(getElement(id));
}

function focusElement(element) {
	element.focus();
}

function setDisabled(id, disabled) {
	setDisabledElement(getElement(id), disabled);
}

function setDisabledElement(element, disabled) {
	if (disabled) {
		element.setAttribute("disabled", "disabled");
	} else {
		element.removeAttribute("disabled");
	}
}

function hasAttribute(id, attribute) {
	return hasAttributeElement(getElement(id), attribute);
}

function hasAttributeElement(element, attribute) {
	return getAttributeElement(element, attribute) != null;
}

function getAttribute(id, attribute) {
	return getAttributeElement(getElement(id), attribute);
}

function getAttributeElement(element, attribute) {
	return element.getAttribute(attribute);
}

function setAttribute(id, attribute, value) {
	setAttributeElement(getElement(id), attribute, value);
}

function setAttributeElement(element, attribute, value) {
	if (value === undefined) {
		element.setAttribute(attribute, "");
	} else {
		element.setAttribute(attribute, value);
	}
}

function removeAttribute(id, attribute) {
	removeAttributeElement(getElement(id), attribute);
}

function removeAttributeElement(element, attribute) {
	element.removeAttribute(attribute);
}

function hasClassStyle(id, style, value) {
	return hasClassStyleElement(getElement(id), style, value);
}

function hasClassStyleElement(element, style, value) {
	return getClassStyleElement(element, style).indexOf(value) != -1;
}

function getClassStyle(id, style) {
	return getClassStyleElement(getElement(id), style);
}

function getClassStyleElement(element, style) {
	var computedStyle = document.defaultView.getComputedStyle(element, "");
	if (style !== undefined) {
		return computedStyle.getPropertyValue(style);
	}
	return computedStyle;
}

function hasClass(id, className) {
	return hasClassElement(getElement(id), className);
}

function hasClassElement(element, className) {
	return getClassElement(element).indexOf(className) != -1;
}

function getClass(id) {
	return getClassElement(getElement(id));
}

function getClassElement(element) {
	return element.className;
}

function setClass(id, className) {
	setClassElement(getElement(id), className);
}

function setClassElement(element, className) {
	element.className = className;
}

function addClass(id, className) {
	addClassElement(getElement(id), className);
}

function addClassElement(element, className) {
	var classCurrent = element.className;

	if (classCurrent.indexOf(className) == -1) {
		element.className = classCurrent + " " + className;
	}
}

function removeAllClass(id) {
	removeAllClassElement(getElement(id));
}

function removeAllClassElement(element) {
	element.className = "";
}

function removeClass(id, className) {
	removeClassElement(getElement(id), className);
}

function removeClassElement(element, className) {
	var classCurrent = element.className;
	classCurrent = classCurrent.replace(className, "");
	element.className = classCurrent;
}

function replaceClass(id, classNameOld, classNameNew) {
	replaceClassElement(getElement(id), classNameOld, classNameNew);
}

function replaceClassElement(element, classNameOld, classNameNew) {
	try {
		var classCurrent = element.className;
		classCurrent = classCurrent.replace(classNameOld, classNameNew);
		element.className = classCurrent;
	} catch (e) {
	}
}

function hasStyle(id, style) {
	return hasStyleElement(getElement(id), style);
}

function hasStyleElement(element, style) {
	return getStyleElement(element).indexOf(style) != -1;
}

function getStyle(id, style) {
	return getStyleElement(getElement(id), style);
}

function getStyleElement(element, style) {
	var style = element.style;
	if (style !== undefined) {
		return style.getPropertyValue(style);
	}
	return style.cssText;
}

function setStyle(id, style) {
	setStyleElement(getElement(id), style);
}

function setStyleElement(element, style) {
	removeAllStyleElement(element);
	addStyleElement(element, style);
}

function addStyle(id, style) {
	addStyleElement(getElement(id), style);
}

function addStyleElement(element, style) {
	var styleArray = style.split(";");
	for (var i = 0; i < styleArray.length; i++) {
		var propertyValueArray = styleArray[i].split(":");
		if (propertyValueArray.length == 2) {
			var property = hyphensToCamelcase(propertyValueArray[0].trim(" "));
			var value = propertyValueArray[1].trim(" ");
			var execute = "element.style." + property + " = '" + value + "';";
			eval(execute);
		}
	}
}

function removeAllStyle(id) {
	removeAllStyleElement(getElement(id));
}

function removeAllStyleElement(element) {
	removeAttributeElement(element, "style");
}

function removeStyle(id, style) {
	removeStyleElement(getElement(id), style);
}

function removeStyleElement(element, style) {
	var styleCurrent = element.style.cssText;
	styleCurrent = styleCurrent.replace(style, "");
	setStyleElement(element, styleCurrent);
}

function replaceStyle(id, styleOld, styleNew) {
	replaceStyleElement(getElement(id), styleOld, styleNew);
}

function replaceStyleElement(element, styleOld, styleNew) {
	try {
		var styleCurrent = element.style.cssText;
		styleCurrent = styleCurrent.replace(styleOld, styleNew);
		setStyleElement(element, styleCurrent);
	} catch (e) {
	}
}

function getInnerHTML(id) {
	return getInnerHTMLElement(getElement(id));
}

function getInnerHTMLElement(element) {
	return element.innerHTML;
}

function setInnerHTML(id, innerHTML) {
	setInnerHTMLElement(getElement(id), innerHTML);
}

function setInnerHTMLElement(element, innerHTML) {
	element.innerHTML = innerHTML;
}

function removeInnerHTML(id) {
	return removeInnerHTMLElement(getElement(id));
}

function removeInnerHTMLElement(element) {
	var innerHTMLCurrent = element.innerHTML;
	element.innerHTML = "";
	return innerHTMLCurrent;
}

function addInnerHTML(id, isTop, innerHTML) {
	addInnerHTMLElement(getElement(id), isTop, innerHTML);
}

function addInnerHTMLElement(element, isTop, innerHTML) {
	try {
		var innerHTMLCurrent = element.innerHTML;

		if (isTop) {
			element.innerHTML = innerHTML + innerHTMLCurrent;
		} else {
			element.innerHTML = innerHTMLCurrent + innerHTML;
		}
	} catch (e) {
	}
}

function remove(id) {
	removeElement(getElement(id));
}

function removeElement(element) {
	element.parentNode.removeChild(element);
}

// utils
function getBoolean(value) {
	if (value === undefined || value == null) {
		return value;
	} else {
		value = value.toLowerCase();
		if (value == "true" || value == "yes" || value == "on") {
			return true;
		} else {
			return false;
		}
	}
}

function getKeyCode() {
	return event.which || event.keyCode;
}

function autoscrollHeight() {
	var args = [];

	for (var i = 0; i < arguments.length; i++) {
		args.push(getElement(arguments[i]));
	}

	autoscrollHeightElement.apply(this, args);
}

function autoscrollHeightElement() {
	var height = getHeightWindow();

	for (var i = 1; i < arguments.length; i++) {
		height -= getHeightElement(arguments[i]);
	}

	if (height - getHeightScrollElement(arguments[0]) > 0) {
		arguments[0].style.height = "";
	} else {
		arguments[0].style.height = height + "px";
	}
}

function autoscrollWidth() {
	var args = [];

	for (var i = 0; i < arguments.length; i++) {
		args.push(getElement(arguments[i]));
	}

	autoscrollWidthElement.apply(this, args);
}

function autoscrollWidthElement() {
	var width = getWidthWindow();

	for (var i = 1; i < arguments.length; i++) {
		width -= getHeightElement(arguments[i]);
	}

	if (width - getWidthScrollElement(arguments[0]) > 0) {
		arguments[0].style.width = "";
	} else {
		arguments[0].style.width = width + "px";
	}
}

function autoscroll() {
	autoscrollHeight.apply(this, arguments);
	autoscrollWidth.apply(this, arguments);
}

function autoscrollElement() {
	autoscrollHeightElement.apply(this, arguments);
	autoscrollWidthElement.apply(this, arguments);
}

function autocenterHeight(idContainer, idElement) {
	if (idElement === undefined) {
		idElement = idContainer;
	}
	autocenterHeightElement(getElement(idContainer), getElement(idElement));
}

function autocenterHeightElement(container, element) {
	if (element === undefined) {
		element = container;
	}

	var top = 0;
	if (getTopElement(element) == 0) {
		top = (getHeightWindow() - getHeightElement(element)) / 2;
	}
	if (top > 0) {
		container.style.top = top + "px";
	} else {
		container.style.top = "";
	}
}

function autocenterWidth(idContainer, idElement) {
	if (idElement === undefined) {
		idElement = idContainer;
	}
	autocenterWidthElement(getElement(idContainer), getElement(idElement));
}

function autocenterWidthElement(container, element) {
	if (element === undefined) {
		element = container;
	}

	var left = 0;
	if (getLeftElement(element) == 0) {
		left = (getWidthWindow() - getWidthElement(element)) / 2;
	}
	if (left > 0) {
		container.style.left = left + "px";
	} else {
		container.style.left = "";
	}
}

function autocenter(idContainer, idElement) {
	autocenterElement(getElement(idContainer), getElement(idElement));
}

function autocenterElement(container, element) {
	autocenterHeightElement(container, element);
	autocenterWidthElement(container, element);
}

function getHeight(id, withMargin) {
	return getHeightElement(getElement(id), withMargin);
}

function getHeightElement(element, withMargin) {
	var margin = 0;
	if (withMargin !== undefined && withMargin) {
		margin = parseInt(getClassStyleElement(element, 'margin-top'))
				+ parseInt(getClassStyleElement(element, 'margin-bottom'));
	}
	return element.offsetHeight + margin;
}

function getHeightScroll(id) {
	return getHeightScrollElement(getElement(id));
}

function getHeightScrollElement(element) {
	return element.scrollHeight;
}

function getHeightWindow() {
	return getHeightElement(getBody());
}

function getHeightWindowScroll() {
	return getHeightScrollElement(getBody());
}

function getHeightScreen() {
	return screen.height;
}

function getWidth(id, withMargin) {
	return getWidthElement(getElement(id), withMargin);
}

function getWidthElement(element, withMargin) {
	var margin = 0;
	if (withMargin !== undefined && withMargin) {
		margin = parseInt(getClassStyleElement(element, 'margin-left'))
				+ parseInt(getClassStyleElement(element, 'margin-right'));
	}
	return element.offsetWidth + margin;
}

function getWidthScroll(id) {
	return getWidthScrollElement(getElement(id));
}

function getWidthScrollElement(element) {
	return element.scrollWidth;
}

function getWidthWindow() {
	return getWidthElement(getBody());
}

function getWidthWindowScroll() {
	return getWidthScrollElement(getBody());
}

function getWidthScreen() {
	return screen.width;
}

function getBottom(id) {
	return getBottomElement(getElement(id));
}

function getBottomElement(element) {
	return getTopElement(element) + getHeightElement(element);
}

function getBottomScroll(id) {
	return getBottomScrollElement(getElement(id));
}

function getBottomScrollElement(element) {
	return getTopScrollElement(element) + getHeightElement(element);
}

function getBottomWindowScroll() {
	return getBottomScrollElement(getBody());
}

function getLeft(id) {
	return getLeftElement(getElement(id));
}

function getLeftElement(element) {
	return element.offsetLeft;
}

function getLeftScroll(id) {
	return getLeftScrollElement(getElement(id));
}

function getLeftScrollElement(element) {
	return element.scrollLeft;
}

function getLeftWindowScroll() {
	return getLeftScrollElement(getBody());
}

function getRight(id) {
	return getRightElement(getElement(id));
}

function getRightElement(element) {
	return getLeftElement(element) + getWidthElement(element);
}

function getRightScroll(id) {
	return getRightScrollElement(getElement(id));
}

function getRightScrollElement(element) {
	return getLeftScrollElement(element) + getWidthElement(element);
}

function getRightWindowScroll() {
	return getRightScrollElement(getBody());
}

function getTop(id) {
	return getTopElement(getElement(id));
}

function getTopElement(element) {
	return element.offsetTop;
}

function getTopScroll(id) {
	return getTopScrollElement(getElement(id));
}

function getTopScrollElement(element) {
	return element.scrollTop;
}

function getTopWindowScroll() {
	return getTopScrollElement(getBody());
}

function isVisibleVertical(id) {
	return isVisibleVerticalElement(getElement(id));
}

function isVisibleVerticalElement(element) {
	return getBottomElement(element) > getTopWindowScroll() && getTopElement(element) < getBottomWindowScroll();
}

function isVisibleHorizontal(id) {
	return isVisibleHorizontalElement(getElement(id));
}

function isVisibleHorizontalElement(element) {
	return getRightElement(element) > getLeftWindowScroll() && getLeftElement(element) < getRightWindowScroll();
}

function isVisible(id) {
	return isVisibleElement(getElement(id));
}

function isVisibleElement(element) {
	return isVisibleVerticalElement(element) && isVisibleHorizontalElement(element);
}

Array.get = function(array, key, value) {
	var indexOf = Array.indexOf(array, key, value);
	if (indexOf != -1) {
		return array[indexOf];
	} else {
		return undefined;
	}
}

Array.indexOf = function(array, key, value) {
	for (var i = 0; i < array.length; i++) {
		if (array[i][key] == value) {
			return i;
		}
	}
	return -1;
}

function actionToEscKey(callback) {
	if (getKeyCode() == 27) {
		callback.call(this);
	}
}

function keyRestriction(keys) {
	key = getKeyCode();
	keys = keys.split(",");

	for (var i = 0; i < keys.length; i++) {
		if (eval(key - keys[i]) == 0) {
			return true;
		}
	}

	return false;
}

function camelcaseToHyphens(value) {
	return value.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function hyphensToCamelcase(value) {
	return value.toLowerCase().replace(/-(.)/g, function(match, group) {
		return group.toUpperCase();
	});
}

function fullTrim(id) {
	return getElement(id).value.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g, '').replace(/\s+/g, ' ');
}

function isNoData(id) {
	return fullTrim(id) == "";
}

function fullScreen() {
	if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
		if (document.documentElement.requestFullscreen) {
			document.documentElement.requestFullscreen();
		} else if (document.documentElement.mozRequestFullScreen) {
			document.documentElement.mozRequestFullScreen();
		} else if (document.documentElement.webkitRequestFullscreen) {
			document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
		}
	} else {
		if (document.cancelFullScreen) {
			document.cancelFullScreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitCancelFullScreen) {
			document.webkitCancelFullScreen();
		}
	}
}

function animateScroll(id, time) {
	$("html, body").stop().animate({
		scrollTop : $("#" + id).offset().top
	}, time | 1500);
}

function animateScrollTop(time) {
	$("html, body").stop().animate({
		scrollTop : 0
	}, time | 1500);
}

function animateScrollBottom(time) {
	$("html, body").stop().animate({
		scrollTop : getHeightWindow()
	}, time | 1500);
}

function getUrl() {
	var url = getUrlFull();
	return url.split("pages").length > 0 ? url.split("pages")[0] : url;
}

function getUrlFull() {
	return document.URL;
}

function redirect(url) {
	var link = document.createElement("a");
	link.href = url;
	document.body.appendChild(link);
	link.click();
}

function windowOpen(url) {
	window.open(url);
}

var HandleMove = {
	container : undefined,
	elementToMove : undefined,
	elementToClick : undefined,

	minLimitX : undefined,
	minLimitY : undefined,
	maxLimitX : undefined,
	maxLimitY : undefined,

	startX : undefined,
	startY : undefined,

	init : function(container, elementToMove, elementToClick) {
		HandleMove.container = container;
		HandleMove.elementToMove = elementToMove;
		HandleMove.elementToClick = elementToClick;

		HandleMove.minLimitX = 0;
		HandleMove.minLimitX -= getLeftElement(HandleMove.elementToMove);
		if (HandleMove.minLimitX == 0) {
			HandleMove.maxLimitX = getWidthWindow() - getWidthElement(HandleMove.elementToMove);
		} else {
			if (HandleMove.container.style.left == "") {
				HandleMove.minLimitX -= getLeftElement(HandleMove.container);
			}
			HandleMove.maxLimitX = HandleMove.minLimitX * -1;
		}

		HandleMove.minLimitY = 0;
		HandleMove.minLimitY -= getTopElement(HandleMove.elementToMove);
		if (HandleMove.minLimitY == 0) {
			HandleMove.maxLimitY = getHeightWindow() - getHeightElement(HandleMove.elementToMove);
		} else {
			if (HandleMove.container.style.top == "") {
				HandleMove.minLimitY -= getTopElement(HandleMove.container);
			}
			HandleMove.maxLimitY = HandleMove.minLimitY * -1;
		}

		HandleMove.startX = event.clientX - getLeftElement(HandleMove.container);
		HandleMove.startY = event.clientY - getTopElement(HandleMove.container);

		addClassElement(getBody(), "unselectable");
		addClassElement(HandleMove.elementToClick, "cDefault");

		window.addEventListener("mousemove", HandleMove.move);
		window.addEventListener("mouseup", HandleMove.dest);
	},

	move : function(event) {
		var x = event.clientX - HandleMove.startX;
		var y = event.clientY - HandleMove.startY;

		if (x < HandleMove.minLimitX) {
			x = HandleMove.minLimitX;
		}
		if (x > HandleMove.maxLimitX) {
			x = HandleMove.maxLimitX;
		}

		if (y < HandleMove.minLimitY) {
			y = HandleMove.minLimitY;
		}
		if (y > HandleMove.maxLimitY) {
			y = HandleMove.maxLimitY;
		}

		HandleMove.container.style.left = x + "px";
		HandleMove.container.style.top = y + "px";
	},

	dest : function() {
		removeClassElement(getBody(), "unselectable");
		removeClassElement(HandleMove.elementToClick, "cDefault");

		HandleMove.container = undefined;
		HandleMove.elementToMove = undefined;
		HandleMove.elementToClick = undefined;

		HandleMove.minLimitX = undefined;
		HandleMove.minLimitY = undefined;
		HandleMove.maxLimitX = undefined;
		HandleMove.maxLimitY = undefined;

		HandleMove.startX = undefined;
		HandleMove.startY = undefined;

		window.removeEventListener("mousemove", HandleMove.move);
		window.removeEventListener("mouseup", HandleMove.dest);
	}
};

var FloatIfNotVisible = function() {
	var verify = function(element) {
		var style = "pFixed w100 " + (getAttributeElement(element, "data-floatClass") || "");

		if (hasClassElement(element, "js-float-top-if-not-visible")) {
			style += " aTop aLeft";
			if (!isVisibleVerticalElement(element)) {
				addClassElement(element.firstElementChild, style);
			} else {
				removeClassElement(element.firstElementChild, style);
			}
		} else if (hasClassElement(element, "js-float-left-if-not-visible")) {
			style += " aTop aLeft";
			if (!isVisibleHorizontalElement(element)) {
				addClassElement(element.firstElementChild, style);
			} else {
				removeClassElement(element.firstElementChild, style);
			}
		} else if (hasClassElement(element, "js-float-bottom-if-not-visible")) {
			style += " aBottom aLeft";
			if (!isVisibleVerticalElement(element)) {
				addClassElement(element.firstElementChild, style);
			} else {
				removeClassElement(element.firstElementChild, style);
			}
		} else {
			style += " aTop aRight";
			if (!isVisibleHorizontalElement(element)) {
				addClassElement(element.firstElementChild, style);
			} else {
				removeClassElement(element.firstElementChild, style);
			}
		}
	};

	var getElementArray = function() {
		return getSelectors(".js-float-top-if-not-visible, .js-float-left-if-not-visible, .js-float-bottom-if-not-visible, .js-right-top-if-not-visible");
	};

	return {
		init : function() {
			var elementArray = getElementArray();
			for (var i = 0; i < elementArray.length; i++) {
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

var browserDetect = {
	init : function() {
		this.browser = this.searchString(this.dataBrowser);
		this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion);
		this.os = this.searchString(this.dataOS);
	},
	searchString : function(data) {
		for (var i = 0; i < data.length; i++) {
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1) {
					return data[i].identity;
				}
			} else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion : function(dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1)
			return;
		return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
	},
	dataBrowser : [ {
		string : navigator.vendor,
		subString : "Apple",
		identity : "Safari",
		versionSearch : "Version"
	}, {
		string : navigator.vendor,
		subString : "Camino",
		identity : "Camino"
	}, {
		string : navigator.userAgent,
		subString : "Chrome",
		identity : "Chrome"
	}, {
		string : navigator.userAgent,
		subString : "Firefox",
		identity : "Firefox"
	}, {
		string : navigator.userAgent,
		subString : "Gecko",
		identity : "Mozilla",
		versionSearch : "rv"
	}, {
		string : navigator.vendor,
		subString : "iCab",
		identity : "iCab"
	}, {
		string : navigator.vendor,
		subString : "KDE",
		identity : "Konqueror"
	}, {
		string : navigator.userAgent,
		subString : "MSIE",
		identity : "IE",
		versionSearch : "MSIE"
	}, {
		string : navigator.userAgent,
		subString : "Mozilla",
		identity : "Netscape",
		versionSearch : "Mozilla"
	}, {
		string : navigator.userAgent,
		subString : "Netscape",
		identity : "Netscape"
	}, {
		string : navigator.userAgent,
		subString : "OmniWeb",
		versionSearch : "OmniWeb/",
		identity : "OmniWeb"
	}, {
		prop : window.opera,
		identity : "Opera",
		versionSearch : "Version"
	} ],
	dataOS : [ {
		string : navigator.platform,
		subString : "Android",
		identity : "Android"
	}, {
		string : navigator.userAgent,
		subString : "iPad",
		identity : "iOS"
	}, {
		string : navigator.userAgent,
		subString : "iPhone",
		identity : "iOS"
	}, {
		string : navigator.userAgent,
		subString : "iPod",
		identity : "iOS"
	}, {
		string : navigator.platform,
		subString : "Linux",
		identity : "Linux"
	}, {
		string : navigator.platform,
		subString : "Mac",
		identity : "Mac"
	}, {
		string : navigator.platform,
		subString : "Win",
		identity : "Windows"
	} ]
};
browserDetect.init();