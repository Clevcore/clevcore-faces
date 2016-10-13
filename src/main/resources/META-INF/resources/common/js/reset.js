$(document).ready(
		function() {
			Reset.init();
			Reset.init();
			Reset.init();

			if (browser.name == "Firefox") {
				setAttribute("html", "moznomarginboxes", "");
				setAttribute("html", "mozdisallowselectionprint", "");
			}

			if (!notRememberVersionBrowserUnsupported) {
				if ((browser.name == "Opera" && parseFloat(browser.version) < 11.60)
						|| (browser.name == "Chrome" && parseFloat(browser.version) < 15.0)
						|| (browser.name == "Safari" && parseFloat(browser.version) < 5.1)
						|| (browser.name == "Firefox" && parseFloat(browser.version) < 11.0)
						|| (browser.name == "Internet Explorer" && parseFloat(browser.version) < 10.0)) {
					showPopup("clevcore-versionBrowserUnsupportedPopup");
				}
			}
		});

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
				element.style.height = (heightValue == 0 ? 80 : heightValue) + "px";

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
			if (key == 13) {
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

			if (key == 13) {
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
					|| elementArray[index].getAttribute("type") == "hidden");

			if (elementArray[currentIndex].nodeName != "TEXTAREA") {
				Reset.nextElement.verify(index, elementArray, event);
			}
		},

		verify : function(index, elementArray, event) {
			if (elementArray[index] != null) {
				if (elementArray[index].getAttribute("type") == "submit") {
					elementArray[index].click();
				} else if (elementArray[index].getAttribute("type") == "button") {
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

/* Event */
(function() {
	if (typeof window.CustomEvent === "function") {
		return false;
	}

	function CustomEvent(name, params) {
		var defaultParams = {
			bubbles : false,
			cancelable : false,
			detail : undefined
		};

		if (params === undefined) {
			params = defaultParams;
		} else {
			if (params.bubbles === undefined) {
				params.bubbles = defaultParams.bubbles;
			}
			if (params.cancelable === undefined) {
				params.cancelable = defaultParams.cancelable;
			}
			if (params.detail === undefined) {
				params.detail = defaultParams.detail;
			}
		}

		var event = document.createEvent('CustomEvent');
		event.initCustomEvent(name, params.bubbles, params.cancelable, params.detail);
		return event;
	}

	CustomEvent.prototype = window.Event.prototype;

	window.CustomEvent = CustomEvent;
})();

/* Math */
(function() {
	function decimalAdjust(type, value, exp) {
		if (typeof exp === 'undefined' || +exp === 0) {
			return Math[type](value);
		}

		value = +value;
		exp = +exp;

		if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
			return NaN;
		}

		value = value.toString().split('e');
		value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
		value = value.toString().split('e');

		return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
	}

	if (!Math.round10) {
		Math.round10 = function(value, exp) {
			return decimalAdjust('round', value, exp);
		};
	}

	if (!Math.floor10) {
		Math.floor10 = function(value, exp) {
			return decimalAdjust('floor', value, exp);
		};
	}

	if (!Math.ceil10) {
		Math.ceil10 = function(value, exp) {
			return decimalAdjust('ceil', value, exp);
		};
	}
})();

/* String */
(function() {
	String.prototype.trimAll = function() {
		var target = this;
		if (target !== undefined) {
			return target.replace(/\s/g, ' ');
		}
		return target;
	};

	String.prototype.replaceAll = function(search, replacement) {
		var target = this;
		return target.split(search).join(replacement);
	};

	String.prototype.ordinalIndexOf = function(search, ordinal) {
		var target = this;
		return ordinalIndexOf(target, search, ordinal, false);
	};

	String.prototype.lastOrdinalIndexOf = function(search, ordinal) {
		var target = this;
		return ordinalIndexOf(target, search, ordinal, true);
	};

	function ordinalIndexOf(value, searchValue, ordinal, lastIndex) {
		if (value == null || searchValue == null || ordinal <= 0) {
			return -1;
		}

		if (searchValue.length == 0) {
			return lastIndex ? value.length : 0;
		}

		var found = 0;
		var index = lastIndex ? value.length : -1;

		do {
			if (lastIndex) {
				index = value.lastIndexOf(searchValue, index - 1);
			} else {
				index = value.indexOf(searchValue, index + 1);
			}
			if (index < 0) {
				return index;
			}
			found++;
		} while (found < ordinal);

		return index;
	}
})();

/* forEach */
(function() {
	if (typeof NodeList.prototype.forEach === "undefined") {
		NodeList.prototype.forEach = Array.prototype.forEach;
	}

	if (typeof HTMLCollection.prototype.forEach === "undefined") {
		HTMLCollection.prototype.forEach = Array.prototype.forEach;
	}
})();