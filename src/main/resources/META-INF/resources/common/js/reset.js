$(document).ready(function() {
	reset();

	if (browserDetect.browser == "Firefox") {
		setAttribute("html", "moznomarginboxes", "");
		setAttribute("html", "mozdisallowselectionprint", "");
	}
});

function reset() {
	$('textarea[data-height]').each(function() {
		var heightValue = Math.max(getAttributeElement(this, "data-height"), this.scrollHeight);
		if (heightValue == 0) {
			heightValue = 80;
		}
		this.style.height = heightValue + "px";
	}).on('input', function() {
		this.style.height = 'auto';
		this.style.height = Math.max(getAttributeElement(this, "data-height"), this.scrollHeight) + 'px';
	});

	$("[data-only=number]").on("keyup keypress", function(e) {
		var value = this.value + String.fromCharCode(e.keyCode || e.which);
		if (isNaN(value)) {
			e.preventDefault();
			return false;
		}
	});

	$("button, input, select, textarea").off("keyup");
	$("button, input, select, textarea").on("keyup", function(e) {
		var key = e.keyCode || e.which;
		if (key == 13) {
			var elementArray = $("button, input, select, textarea");
			var index = elementArray.index(this);

			handleNextElement(index, elementArray, e);

			e.preventDefault();
			return false;
		}
	});

	$("form").on("keyup keypress", function(e) {
		var key = e.keyCode || e.which;
		if (key == 13) {
			if (!$(e.target).is("textarea") || e.shiftKey) {
				e.preventDefault();
				return false;
			}
		}
	});

	ConfirmNavigation.action();

	FloatIfNotVisible.init();
}

function handleNextElement(index, elementArray, event) {
	var currentIndex = index;

	do {
		index++;
	} while (elementArray[index].classList.contains("dNone") || $(elementArray[index]).is("[disabled='disabled']")
			|| $(elementArray[index]).is("input[type='hidden']"));

	if (!$(elementArray[currentIndex]).is("textarea")) {
		helperNextElement(index, elementArray, event);
	}
}

function helperNextElement(index, elementArray, event) {
	if (elementArray[index] != null) {
		if ($(elementArray[index]).is("[type='submit']")) {
			elementArray[index].click();
		} else if ($(elementArray[index]).is("[type='button']")) {
			if ($(elementArray[index]).attr("onclick") != null && $(elementArray[index]).attr("onclick") != "") {
				elementArray[index].click();
			} else {
				handleNextElement(index, elementArray, event);
			}
		} else {
			elementArray[index].focus();
		}
	} else {
		elementArray[0].focus();
	}
}

function getCaret(input) {
	if ('selectionStart' in input) {
		// Standard-compliant browsers
		return input.selectionStart;
	} else if (document.selection) {
		// IE
		input.focus();
		var sel = document.selection.createRange();
		var selLen = document.selection.createRange().text.length;
		sel.moveStart('character', -input.value.length);
		return sel.text.length - selLen;
	}
}

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