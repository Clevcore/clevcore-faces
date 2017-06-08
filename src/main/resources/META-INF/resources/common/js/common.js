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
	selector = selector.replaceAll(":", "\\:");
	return document.querySelector(selector);
}

function getSelectors(selector) {
	selector = selector.replaceAll(":", "\\:");
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

function removeAllChild(id) {
	removeAllChildElement(getElement(id));
}

function removeAllChildElement(element) {
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}
}

function contain(idParent, idChild) {
	return containElement(getElement(idParent), getElement(idChild));
}

function containElement(parent, child) {
	return parent.contains(child);
}

// utils
var delay = (function() {
	var timeout = 0;
	return function(callback, ms, arguments) {
		clearTimeout(timeout);
		timeout = setTimeout(callback, ms, arguments);
		return timeout;
	};
})();

function clearDelay(timeout) {
	clearTimeout(timeout);
}

function getValiedCharactersRegExp() {
	return new RegExp(/[^a-zA-Z0-9 ]/g);
}

function prepareToSearch(value) {
	value = value.toUpperCase();
	value = removeAccentedCharacters(value);
	value = removeSpecialCharacters(value);

	return value;
}

function removeAccentedCharacters(value) {
	var characters = [ {
		'base' : 'a',
		'letters' : /[á]/g
	}, {
		'base' : 'A',
		'letters' : /[Á]/g
	}, {
		'base' : 'e',
		'letters' : /[é]/g
	}, {
		'base' : 'E',
		'letters' : /[É]/g
	}, {
		'base' : 'i',
		'letters' : /[í]/g
	}, {
		'base' : 'I',
		'letters' : /[Í]/g
	}, {
		'base' : 'o',
		'letters' : /[ó]/g
	}, {
		'base' : 'O',
		'letters' : /[Ó]/g
	}, {
		'base' : 'u',
		'letters' : /[ú]/g
	}, {
		'base' : 'U',
		'letters' : /[Ú]/g
	} ];

	for (var i = 0; i < characters.length; i++) {
		value = value.replace(characters[i].letters, characters[i].base);
	}

	return value;
}

function removeSpecialCharacters(value) {
	return value.replace(getValiedCharactersRegExp(), "");
}

function isSpecialCharacters(value) {
	return getValiedCharactersRegExp().test(value);
}

function sortByKey(array, key) {
	return array.sort(function(a, b) {
		var x = a[key];
		var y = b[key];

		return x < y ? -1 : (x > y ? 1 : 0);
	});
}

function setInputCheckbox(selectors, value) {
	var elements = getSelectors(selectors);

	for (var i = 0; elements.length; i++) {
		elements[i].checked = value;
	}
}

function getBoolean(value) {
	if (value == undefined) {
		return value;
	}

	if (typeof value === "boolean" || (typeof value === "object" && typeof value.valueOf() === "boolean")) {
		return value;
	}

	value = value.toLowerCase();
	if (value === "true" || value === "yes" || value === "on") {
		return true;
	} else {
		return false;
	}
}

function parseBoolean(value) {
	if (value == undefined) {
		return value;
	}

	if (typeof value === "boolean" || (typeof value === "object" && typeof value.valueOf() === "boolean")) {
		return value;
	}

	return value.toLowerCase() === "true";
}

function isBoolean(value) {
	return typeof value === "boolean" || (typeof value === "object" && typeof value.valueOf() === "boolean")
			|| (typeof value === "string" && (value.toLowerCase() === "true" || value.toLowerCase() === "false"));
}

function isNumeric(value) {
	return Number(parseFloat(value)) == value;
}

function getKeyCode(event) {
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
	var height = 0;
	for (var i = 1; i < arguments.length; i++) {
		if (!isNaN(arguments[i])) {
			height -= arguments[i];
		} else {
			height -= getHeightElement(arguments[i]);
		}
	}

	var top = getAbsoluteTopElement(arguments[0]);
	if (top > 0) {
		height += getHeightWindow() - top;
	} else {
		height += getHeightElement(arguments[0]) + top;
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
	var width = 0;
	for (var i = 1; i < arguments.length; i++) {
		if (!isNaN(arguments[i])) {
			width -= arguments[i];
		} else {
			width -= getWidthElement(arguments[i]);
		}
	}

	var left = getAbsoluteLeftElement(arguments[0]);
	if (left > 0) {
		width += getWidthWindow() - left;
	} else {
		width += getWidthElement(arguments[0]) + left;
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

function autocenterHeight(id) {
	autocenterHeightElement(getElement(id));
}

function autocenterHeightElement(element) {
	var top = (getHeightWindow() - getHeightElement(element)) / 2;

	if (top > 0) {
		element.style.top = top + "px";
	} else {
		element.style.top = "";
	}
}

function autocenterWidth(id) {
	autocenterWidthElement(getElement(id));
}

function autocenterWidthElement(element) {
	var left = (getWidthWindow() - getWidthElement(element)) / 2;

	if (left > 0) {
		element.style.left = left + "px";
	} else {
		element.style.left = "";
	}
}

function autocenter(id) {
	autocenterElement(getElement(id));
}

function autocenterElement(element) {
	autocenterHeightElement(element);
	autocenterWidthElement(element);
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

function getAbsoluteBottom(id) {
	return getAbsoluteBottomElement(getElement(id));
}

function getAbsoluteBottomElement(element) {
	return getAbsoluteTopElement(element) + getHeightElement(element);
}

function getAbsoluteLeft(id) {
	return getAbsoluteLeftElement(getElement(id));
}

function getAbsoluteLeftElement(element) {
	var result = 0;

	while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetLeft)) {
		result += element.offsetLeft - element.scrollLeft;
		element = element.offsetParent;
	}

	return result;
}

function getAbsoluteRight(id) {
	return getAbsoluteRightElement(getElement(id));
}

function getAbsoluteRightElement(element) {
	return getAbsoluteLeftElement(element) + getWidthElement(element);
}

function getAbsoluteTop(id) {
	return getAbsoluteTopElement(getElement(id));
}

function getAbsoluteTopElement(element) {
	var result = 0;

	while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
		result += element.offsetTop - element.scrollTop;
		element = element.offsetParent;
	}

	return result;
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

function isVisibleVertical(id, completely) {
	return isVisibleVerticalElement(getElement(id), completely);
}

function isVisibleVerticalElement(element, completely) {
	if (completely === undefined || !completely) {
		return getBottomElement(element) > getTopWindowScroll() && getTopElement(element) < getBottomWindowScroll();
	} else {
		return getTopElement(element) >= getTopWindowScroll() && getBottomElement(element) <= getBottomWindowScroll();
	}
}

function isVisibleHorizontal(id, completely) {
	return isVisibleHorizontalElement(getElement(id), completely);
}

function isVisibleHorizontalElement(element, completely) {
	if (completely === undefined || !completely) {
		return getRightElement(element) > getLeftWindowScroll() && getLeftElement(element) < getRightWindowScroll();
	} else {
		return getLeftElement(element) >= getLeftWindowScroll() && getRightElement(element) <= getRightWindowScroll();
	}
}

function isVisible(id, completely) {
	return isVisibleElement(getElement(id), completely);
}

function isVisibleElement(element, completely) {
	return isVisibleVerticalElement(element, completely) && isVisibleHorizontalElement(element, completely);
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

function actionToEscKey(event, callback) {
	if (getKeyCode(event) == 27) {
		callback.call(this);
	}
}

function keyRestriction(event, keys) {
	key = getKeyCode(event);
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

function parameterToObject() {
	var result = {};

	var parameters = window.location.search.substring(1).split("&");
	parameters.forEach(function(parameter) {
		parameter = parameter.split("=");

		if (isNumeric(parameter[1])) {
			result[parameter[0]] = parseFloat(decodeURIComponent(parameter[1]));
		} else if (isBoolean(parameter[1])) {
			result[parameter[0]] = parseBoolean(decodeURIComponent(parameter[1]));
		} else {
			result[parameter[0]] = decodeURIComponent(parameter[1]);
		}
	});

	return result;
}

function objectToParameter(parameters) {
	var result;

	result = Object.keys(parameters).map(function(key) {
		var value = parameters[key];
		return encodeURIComponent(key) + (value !== undefined && value !== "" ? "=" + encodeURIComponent(value) : "");
	}).join("&");

	return result;
}

function getDirectory() {
	var beginIndex = getUrlFull().ordinalIndexOf("/", 4);
	var endIndex = getUrlFull().lastIndexOf("/");

	if (beginIndex !== endIndex) {
		return getUrlFull().substring(beginIndex, endIndex + 1);
	} else {
		return "";
	}
}

function getPage() {
	var page = getPageFull();

	if (page.indexOf("?") !== -1) {
		return page.substring(0, page.indexOf("?"));
	} else if (page.indexOf("#") !== -1) {
		return page.substring(0, page.indexOf("#"));
	} else if (page.indexOf(";") !== -1) {
		return page.substring(0, page.indexOf(";"));
	} else {
		return page;
	}
}

function getPageFull() {
	var index = getUrlFull().lastIndexOf("/");

	if (index !== -1) {
		return getUrlFull().substring(index + 1);
	} else {
		return "";
	}
}

function getPath() {
	var path = getPathFull();

	if (path.indexOf("?") !== -1) {
		return path.substring(0, path.indexOf("?"));
	} else if (path.indexOf("#") !== -1) {
		return path.substring(0, path.indexOf("#"));
	} else if (path.indexOf(";") !== -1) {
		return path.substring(0, path.indexOf(";"));
	} else {
		return path;
	}
}

function getPathFull() {
	var index = getUrlFull().ordinalIndexOf("/", 4);

	if (index !== -1) {
		return getUrlFull().substring(index);
	} else {
		return "";
	}
}

function getUrl() {
	var index = getUrlFull().ordinalIndexOf("/", 4);

	if (index !== -1) {
		return getUrlFull().substring(0, index);
	} else {
		return "";
	}
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
	return window.open(url);
}

function windowOpenNew(url) {
	if (url.indexOf("http://") == -1) {
		url = "http://" + url;
	}

	return window.open(url, "_blank");
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

	init : function(event, container, elementToMove, elementToClick) {
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

var browser = {
	name : undefined,
	version : undefined,

	init : function() {
		var data = [ {
			order : 1,
			name : "Opera",
			string : "OPR",
			version : "OPR/"
		}, {
			order : 2,
			name : "Chrome",
			string : "Chrome",
			version : "Chrome/"
		}, {
			order : 3,
			name : "Safari",
			string : "Safari",
			version : "Version/"
		}, {
			order : 4,
			name : "Firefox",
			string : "Firefox",
			version : "Firefox/"
		}, {
			order : 5,
			name : "Internet Explorer",
			string : "MSIE",
			version : "MSIE "
		}, {
			order : 6,
			name : "Edge",
			string : "Trident",
			version : "rv:"
		} ];

		if (navigator.userAgent) {
			for (var i = 0; i < data.length; i++) {
				if (navigator.userAgent.indexOf(data[i].string) != -1) {
					this.name = data[i].name;

					this.version = "";
					var index = navigator.userAgent.indexOf(data[i].version);
					var result = navigator.userAgent.substring(index + data[i].version.length);
					for (var j = 0; j < result.length; j++) {
						if (!isNaN(result.charAt(j)) || result.charAt(j) == ".") {
							this.version += result.charAt(j);
						} else {
							break;
						}
					}

					break;
				}
			}
		}
	}
};
browser.init();

var Geolocation = {
	supported : navigator.geolocation !== undefined,

	options : {
		enableHighAccuracy : true,
		timeout : Infinity,
		maximumAge : 0
	},

	onSuccess : function(position) {
		var event = new CustomEvent("onGeolocationSuccess", {
			detail : {
				data : position
			}
		});
		window.dispatchEvent(event);
	},

	onError : function(error) {
		var event = new CustomEvent("onGeolocationError", {
			detail : {
				data : error
			}
		});
		window.dispatchEvent(event);
	},

	onNotSupported : function(error) {
		var event = new CustomEvent("onGeolocationNotSupported");
		window.dispatchEvent(event);
	},

	getLocation : function() {
		if (Geolocation.supported) {
			var successCallback;
			var errorCallback;
			var options;

			if (arguments.length == 1) {
				successCallback = arguments[0];
				options = Geolocation.options;
			} else if (arguments.length == 2) {
				successCallback = arguments[0];
				if (typeof (arguments[1]) === "function") {
					errorCallback = arguments[1];
					options = Geolocation.options;
				} else {
					options = arguments[1];
				}
			} else if (arguments.length == 3) {
				successCallback = arguments[0];
				errorCallback = arguments[1];
				options = arguments[2];
			}

			navigator.geolocation.getCurrentPosition(function(position) {
				Geolocation.onSuccess(position);
				successCallback.call(this, position);
			}, function(error) {
				Geolocation.onError(error);
				if (errorCallback) {
					errorCallback.call(this, error);
				}
			}, options);
		} else {
			Geolocation.onNotSupported();
		}
	}
};