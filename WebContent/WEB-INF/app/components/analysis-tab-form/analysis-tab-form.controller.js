'use strict';

REIApp.controller('AnalysisTabFormController', ['$scope', '$anchorScroll', '$location', 'AnalysisHTTPService', 'CalculationService', function ($scope, $anchorScroll, $location, AnalysisHTTPService, CalculationService) {

	var self = this;

	self.hasErrors = false;

	self.submit = function (formValid) {
		 if (formValid) {
			CalculationService.runCalculation(self.property);
			self.openResultsModal();
			self.saveOrUpdateSynchronously();
		 	self.hasErrors = false;
		 }
		 else {
		 	self.hasErrors = true;
		 	self.scrollToTop();
		 }
	}
	
	self.saveOrUpdateSynchronously = function(){
    	var action = null;
    	if(self.property.id==null){
			console.log('Saving new property report', self.property);    
			action = AnalysisHTTPService.save(self.property);
		}else{
			console.log('Updating property report with id ', self.property.id);
			action = AnalysisHTTPService.update(self.property);
		}
    	action.$promise.then(
    		function (result) {
    			self.parentCtrl.fetchAllPropertyReports();
    		},
    		function (error){
    			console.log("Unable to successfully save or update", error);
    			openErrorModal();
    		}
    	);
    }

	self.closeTabForm = function () {
		self.scrollToTop();
		modal.style.display = "none";
		self.reset();
	}

	self.scrollToTop = function () {
		$location.hash('top');
		$anchorScroll();
	}

	self.reset = function () {
		self.property = new AnalysisHTTPService();
		self.hasErrors = false;
		$scope.analysisTabStrip.select(0);
		$scope.tabForm.$setPristine(); //reset Form
	};

	self.openResultsModal = function () {
		var resultsModal = document.getElementById('resultsModal');
		resultsModal.style.display = "block";
	}

}]);