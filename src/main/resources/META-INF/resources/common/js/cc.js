var cc = {};
cc.jsf = {};

cc.jsf.ajax = function() {
	var errorListeners = [];
	var eventListeners = [];

	return {
		sendError : function sendError(data) {
			for ( var i in errorListeners) {
				if (errorListeners.hasOwnProperty(i)) {
					errorListeners[i].call(null, data);
				}
			}
		},

		sendEvent : function sendEvent(data) {
			for ( var i in eventListeners) {
				if (eventListeners.hasOwnProperty(i)) {
					eventListeners[i].call(null, data);
				}
			}
		},

		addOnError : function addOnError(callback) {
			if (typeof callback === 'function') {
				errorListeners[errorListeners.length] = callback;
			} else {
				throw new Error("cc.jsf.ajax.addOnError:  Added a callback that was not a function.");
			}
		},

		addOnEvent : function addOnEvent(callback) {
			if (typeof callback === 'function') {
				eventListeners[eventListeners.length] = callback;
			} else {
				throw new Error("cc.jsf.ajax.addOnEvent: Added a callback that was not a function.");
			}
		},

		removeOnError : function removeOnError(callback) {
			if (typeof callback === 'function') {
				var index = errorListeners.indexOf(callback);
				if (index != -1) {
					errorListeners.splice(index, 1);
				}
			} else {
				throw new Error("cc.jsf.ajax.removeOnError:  Removed a callback that was not a function.");
			}
		},

		removeOnEvent : function removeOnEvent(callback) {
			if (typeof callback === 'function') {
				var index = eventListeners.indexOf(callback);
				if (index != -1) {
					eventListeners.splice(index, 1);
				}
			} else {
				throw new Error("cc.jsf.ajax.removeOnEvent: Removed a callback that was not a function.");
			}
		}
	};
}();

jsf.ajax.addOnError(cc.jsf.ajax.sendError);
jsf.ajax.addOnEvent(cc.jsf.ajax.sendEvent);