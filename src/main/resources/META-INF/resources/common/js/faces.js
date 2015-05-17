/* init */
$(document).ready(function() {
	jsf.ajax.addOnEvent(HandleAjax.listener);
	reset();
	init();
});

function init() {
	if (window.addEventListener) {
		window.addEventListener("beforeunload", function() {
			remplaceClass("title", "animate-fadeInLeftLarge", "animate-fadeOutLeftLarge");
		}, false);
		window.addEventListener("beforeunload", function() {
			remplaceClass("subtitle", "animate-fadeInRightLarge", "animate-fadeOutRightLarge");
		}, false);
		window.addEventListener("beforeunload", function() {
			remplaceClass("section", "animate-fadeIn", "animate-fadeOut");
		}, false);
		window.addEventListener("beforeunload", function() {
			remplaceClass("footer", "animate-fadeIn", "animate-fadeOut");
		}, false);
	} else {
		window.attachEvent("onbeforeunload", function() {
			remplaceClass("title", "animate-fadeInLeftLarge", "animate-fadeOutLeftLarge");
		});
		window.attachEvent("onbeforeunload", function() {
			remplaceClass("subtitle", "animate-fadeInRightLarge", "animate-fadeOutRightLarge");
		});
		window.attachEvent("onbeforeunload", function() {
			remplaceClass("section", "animate-fadeIn", "animate-fadeOut");
		});
		window.attachEvent("onbeforeunload", function() {
			remplaceClass("footer", "animate-fadeIn", "animate-fadeOut");
		});
	}
}