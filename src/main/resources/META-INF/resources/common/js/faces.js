/* init */
$(document).ready(function() {
	jsf.ajax.addOnEvent(HandleAjax.listener);

	ConfirmNavigation.init();

	reset();
});