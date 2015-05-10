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

	$("textarea[date-height]").bind("keyup keydown", function(e) {
		var height = parseInt(getAttributeElement(this, "date-height"));
		if (this.scrollHeight > height) {
			this.style.height = 0;
			this.style.height = this.scrollHeight + "px";
		}
	});

	$("[data-only=number]").bind(
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

	$("button, input, select, textarea").bind(
			"keyup",
			function(e) {
				var key = e.keyCode || e.which;
				if (key == 13) {
					elementArray = $("button, input, select, textarea");
					index = elementArray.index(this);

					do {
						index++;
						nextElement = elementArray[index];
					} while (nextElement.classList.contains("dNone") || $(nextElement).is("[disabled='disabled']")
							|| $(nextElement).is("input[type='hidden']"));

					if (nextElement != null) {
						if ($(nextElement).is("[type='submit']")) {
							nextElement.click();
						} else if ($(this).is("textarea")) {
							if (!e.shiftKey) {
								nextElement.focus();
							}
						} else {
							nextElement.focus();
						}
					} else {
						elementArray[0].focus();
					}

					e.preventDefault();
					return false;
				}
			});

	$("form").bind("keyup keypress", function(e) {
		var key = e.keyCode || e.which;
		if (key == 13) {
			if (!$(e.target).is("textarea") || !e.shiftKey) {
				e.preventDefault();
				return false;
			}
		}
	});

}