'use strict';

REIApp.controller('PropertyInfoController', ['$scope','CommonService', function ($scope, CommonService) {
	var self = this;

	self.setTaxes = function () {
		self.setAnnualPropertyTaxes();
		self.updateMonthlyPropertyTaxes();
	}

	self.setAnnualPropertyTaxes = function () {
		self.property.annualPropertyTaxes = CommonService.parseCurrencyInput(self.property.annualPropertyTaxes,true);
	}

	self.updateMonthlyPropertyTaxes = function () {
		if(self.property.annualPropertyTaxes){
			var monthlyTaxes = self.property.annualPropertyTaxes / 12;
			self.property.expenses.propertyTaxes = CommonService.roundToTwoDecimals(monthlyTaxes);
		}
	}

}]);