function reset() {
	$("textarea[date-height]").each(function() {
		var height = parseInt(getAttributeElement(this, "date-height"));
		if (height != null) {
			addClassElement(this, "oHidden");
			if (this.scrollHeight > height) {
				this.style.height = 0;
				this.style.height = this.scrollHeight + "px";
			} else {
				this.style.height = height + "px";
			}
		}
	});

	$("textarea[date-height]").on("keyup keydown", function(e) {
		var height = parseInt(getAttributeElement(this, "date-height"));
		if (this.scrollHeight > height) {
			this.style.height = 0;
			this.style.height = this.scrollHeight + "px";
		}
	});

	$("[data-only=number]").on(
			"keyup keypress",
			function(e) {
				var key = e.keyCode || e.which;
				if (!(35 <= key && key <= 39) && !(44 <= key && key <= 46) && !(48 <= key && key <= 57) && key != 8
						&& key != 9 && key != 13) {
					e.preventDefault();
					return false;
				}
			});

	$(".datetimepicker").datetimepicker({
		pickTime : false,
		language : "es",
		icons : {
			time : "fa fa-clock-o",
			date : "fa fa-calendar",
			up : "fa fa-arrow-up",
			down : "fa fa-arrow-down"
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
			if (!$(e.target).is("textarea") || !e.shiftKey) {
				e.preventDefault();
				return false;
			}
		}
	});

}

function handleNextElement(index, elementArray, event) {
	var currentIndex = index;

	do {
		index++;
	} while (elementArray[index].classList.contains("dNone") || $(elementArray[index]).is("[disabled='disabled']")
			|| $(elementArray[index]).is("input[type='hidden']"));

	if ($(elementArray[currentIndex]).is("textarea")) {
		if (!event.shiftKey) {
			helperNextElement(index, elementArray, event);
		}
	} else {
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
