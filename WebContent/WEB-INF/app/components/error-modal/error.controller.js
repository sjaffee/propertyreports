'use strict';

REIApp.controller('ErrorController', function () {
    var self = this;
	
	self.close = function(){
		var modal = document.getElementById('errorModal');
		modal.style.display = "none";
	}

})