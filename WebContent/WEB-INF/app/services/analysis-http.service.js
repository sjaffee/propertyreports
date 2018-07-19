'use strict';


REIApp.factory('AnalysisHTTPService', ['$resource', function ($resource) {
	//$resource() function returns an object of resource class
	
	var url = 'http://localhost:8080/propertyreport/analysis/:id';
	
	return $resource(
			url, 
    		{id: '@id'},//Handy for update & delete. id will be set with id of instance
    		{
    			update: {
    			      method: 'PUT' // To send the HTTP Put request when calling this custom update method.
    			}
    			
    		}
    );
}]);