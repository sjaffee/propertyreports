'use strict';

REIApp.controller('ResultsController', function($scope) {
	var self = this;

	self.propertyTestObj = {};
	self.options = null;

	self.closeResultsModal = function () {
		var resultsModal = document.getElementById('resultsModal');
		resultsModal.style.display = "none";
	}
	
	self.closeAllModals = function () {
		self.parentCtrl.closeTabForm();
	}

	self.expensePieColors = ['#8080FF', '#FF6600', '#90EE90', '#f44141','#f4d641','#f44197'];
	self.incomePieColors = ['#429bf4', '#f441e8', '#8080FF'];
	
	self.options = {
		responsive: false,
		legend: {
			display: true,
			position: 'right',
			labels: {
				boxWidth: 10,
				fontSize: 10
			}
		}
	}

});