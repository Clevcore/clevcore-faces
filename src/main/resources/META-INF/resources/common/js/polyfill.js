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

		var event = document.createEvent("CustomEvent");
		event.initCustomEvent(name, params.bubbles, params.cancelable, params.detail);
		return event;
	}

	CustomEvent.prototype = window.Event.prototype;

	window.CustomEvent = CustomEvent;
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

/* Math */
(function() {
	function decimalAdjust(type, value, exp) {
		if (typeof exp === "undefined" || +exp === 0) {
			return Math[type](value);
		}

		value = +value;
		exp = +exp;

		if (isNaN(value) || !(typeof exp === "number" && exp % 1 === 0)) {
			return NaN;
		}

		value = value.toString().split("e");
		value = Math[type](+(value[0] + "e" + (value[1] ? (+value[1] - exp) : -exp)));
		value = value.toString().split("e");

		return +(value[0] + "e" + (value[1] ? (+value[1] + exp) : exp));
	}

	if (!Math.round10) {
		Math.round10 = function(value, exp) {
			return decimalAdjust("round", value, exp);
		};
	}

	if (!Math.floor10) {
		Math.floor10 = function(value, exp) {
			return decimalAdjust("floor", value, exp);
		};
	}

	if (!Math.ceil10) {
		Math.ceil10 = function(value, exp) {
			return decimalAdjust("ceil", value, exp);
		};
	}
})();

/* Serialize */
(function() {
	HTMLElement.prototype.serialize = function() {
		var result = {};
		var elements = this.querySelectorAll("input, select, textarea");

		elements.forEach(function(element) {
			var name = element.name;
			var value = element.value;

			if (name) {
				result[name] = value;
			}
		});

		return JSON.stringify(result);
	}
})();

/* String */
(function() {
	String.prototype.trimAll = function() {
		var target = this;
		if (target !== undefined) {
			return target.replace(/\s/g, " ");
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
		if (value === undefined || searchValue === undefined || ordinal <= 0) {
			return -1;
		}

		if (searchValue.length === 0) {
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