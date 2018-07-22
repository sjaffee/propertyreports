'use strict';

REIApp.controller("propertyGridController", ['$scope','GridService', 'AnalysisHTTPService','PropertyHelper', 
	function ($scope, GridService, AnalysisHTTPService, PropertyHelper) {

	var self = this;
	self.property = new AnalysisHTTPService();

	self.propertyGridOptions = [];

	self.properties = [];
	self.propertyColumns = GridService.getPropertyColumns();
	self.propertyGridOptions = GridService.createGridOptions(self.properties,self.propertyColumns);

	self.fetchAllPropertyReports = function(){
		self.properties = AnalysisHTTPService.query();
		self.properties.$promise.then(
			function (result) {
				var properties = self.properties;
				for(var i = 0; i < properties.length; i++){
					if(!properties[i].propertyAddress){
						properties[i].propertyAddress
					}
				}
				self.propertyGridOptions.dataSource.data = self.properties;
			},
			function (error) {
				if(error.status != 404){
					console.log("Unable to retrieve records: " + error);
	                openErrorModal();
				}
				else{
					self.propertyGridOptions.dataSource.data = self.properties;
				}
			}
		);
	};
	
	self.fetchAllPropertyReports();

	$scope.addPropertyAnalysis = function () {
		self.property = new AnalysisHTTPService();
		self.property = PropertyHelper.initDefaultValues(self.property);
		openDetailForm();
	};
	
	$scope.editPropertyAnalysis = function ($event) {
        self.property = GridService.getSelectedRowObject($event,$scope.propertyList);
        //since we are not initializing values on edit, make sure to init the chart value to 'expenses' so it'll be chosen by default in results
        self.property.selectedReportDisplay = 'expenses';
        //refresh grid datasource so no stale data remains if previously canceling out of tab form modal without submit
        $scope.propertyList.dataSource.read();
        openDetailForm();
    };
    
    $scope.deletePropertyAnalysis = function($event){
        var property = GridService.getSelectedRowObject($event,$scope.propertyList);
        var action = AnalysisHTTPService.delete(property);
        action.$promise.then(
        		function (result) {
        			self.fetchAllPropertyReports();
        		},
        		function (error){
        			console.log("Unable to delete successfully", error);
        			openErrorModal();
        		}
        	);
     };
     
}]);