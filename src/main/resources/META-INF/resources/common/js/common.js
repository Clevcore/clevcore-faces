/* generix */
function remove(id) {
	removeElement(getElement(id));
}

function removeElement(element) {
	element.parentNode.removeChild(element);
}

function getElement(id) {
	return document.getElementById(id);
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

function getStyle(id) {
	return getStyleElement(getElement(id));
}

function getStyleElement(element) {
	return element.style;
}

function setStyle(id, style) {
	setStyleElement(getElement(id), style);
}

function setStyleElement(element, style) {
	element.style = style;
}

function addStyle(id, style) {
	addStyleElement(getElement(id), style);
}

function addStyleElement(element, style) {
	var styleCurrent = element.style;
	element.style = styleCurrent + " " + style;
}

function deleteStyle(id) {
	deleteStyleElement(getElement(id));
}

function deleteStyleElement(element) {
	element.style = "";
}

function removeStyle(id, style) {
	removeStyleElement(getElement(id), style);
}

function removeStyleElement(element, style) {
	var classStyle = element.style;
	classStyle = classStyle.replace(style, "");
	element.style = classStyle;
}

function remplaceStyle(id, styleNameOld, styleNameNew) {
	remplaceStyleElement(getElement(id), styleNameOld, styleNameNew);
}

function remplaceStyleElement(element, styleNameOld, styleNameNew) {
	try {
		var styleCurrent = element.style;
		styleCurrent = styleCurrent.replace(styleNameOld, styleNameNew);
		element.style = styleCurrent;
	} catch (e) {
	}
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
	element.setAttribute(attribute, value);
}

function removeAttribute(id, attribute) {
	removeAttributeElement(getElement(id), attribute);
}

function removeAttributeElement(element, attribute) {
	element.removeAttribute(attribute);
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

function deleteClass(id) {
	deleteClassElement(getElement(id));
}

function deleteClassElement(element) {
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

function remplaceClass(id, classNameOld, classNameNew) {
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

// utils
function getHeight(id) {
	return getHeightElement(getElement(id));
}

function getHeightElement(element) {
	return Math.max(element.clientHeight, element.offsetHeight);
}

function getHeightWindow() {
	return document.documentElement["clientHeight"];
}

function getHeightWindowFull() {
	return Math.max(document.documentElement["clientHeight"], document.body["offsetHeight"],
			document.documentElement["offsetHeight"], document.body["scrollHeight"],
			document.documentElement["scrollHeight"]);
}

function width(id) {
	return widthElement(getElement(id));
}

function widthElement(element) {
	return Math.max(element.clientWidth, element.offsetWidth);
}

function widthWindow() {
	return document.documentElement["clientWidth"];
}

function widthWindowFull() {
	return Math.max(document.documentElement["clientWidth"], document.body["offsetWidth"],
			document.documentElement["offsetWidth"], document.body["scrollWidth"],
			document.documentElement["scrollWidth"]);
}

function keyRestriction(keys) {
	key = ((event.which) ? event.which : event.keyCode);
	keys = keys.split(",");

	for (var i = 0; i < keys.length; i++) {
		if (eval(key - keys[i]) == 0) {
			return true;
		}
	}

	return false;
}

function fullTrim(id) {
	return getElement(id).value.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g, '').replace(/\s+/g, ' ');
}

function isNoData(id) {
	return fullTrim(id) == "";
}

function heightCenter(id) {
	getElement(id).style.top = (getHeightWindow() - getHeightElement(getElement(id))) / 2 + "px";
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
		scrollTop : getHeightWindowFull()
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