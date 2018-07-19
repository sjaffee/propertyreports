'use strict';

REIApp.controller('RentalInfoController', ['$scope','CommonService', function($scope, CommonService) {
	var self = this;

	self.vacancyAmount = 0;
	self.repairAmount = 0;
	self.capExAmount = 0;
	self.managementAmount = 0;
	
	self.setMonthlyRent = function () {
		self.property.income.monthlyRent = CommonService.parseCurrencyInput(self.property.income.monthlyRent,true);
		self.updateExpensePercentages();
	}

	self.setOtherIncome = function () {
		self.property.income.otherIncome = CommonService.parseCurrencyInput(self.property.income.otherIncome,true);
		self.updateExpensePercentages();
	}

	self.getTotalIncome = function () {
		return CommonService.setNullToZero(self.property.income.monthlyRent) + CommonService.setNullToZero(self.property.income.otherIncome);
	}

	self.setPmi = function () {
		self.property.expenses.pmi = CommonService.parseCurrencyInput(self.property.expenses.pmi,true);
	}

	self.setPropertyTaxes = function () {
		self.property.expenses.propertyTaxes = CommonService.parseCurrencyInput(self.property.expenses.propertyTaxes,true);
	}

	self.setMonthlyInsurance = function () {
		self.property.expenses.monthlyInsurance = CommonService.parseCurrencyInput(self.property.expenses.monthlyInsurance,true);
	}

	self.setHoaFees = function () {
		self.property.expenses.hoaFees = CommonService.parseCurrencyInput(self.property.expenses.hoaFees,true);
	}

	self.setElectricity = function () {
		self.property.expenses.electricity = CommonService.parseCurrencyInput(self.property.expenses.electricity,true);
	}

	self.setGarbage = function () {
		self.property.expenses.garbage = CommonService.parseCurrencyInput(self.property.expenses.garbage,true);
	}

	self.setWater = function () {
		self.property.expenses.water = CommonService.parseCurrencyInput(self.property.expenses.water,true);
	}

	self.setOtherExpenses = function () {
		self.property.expenses.otherExpenses = CommonService.parseCurrencyInput(self.property.expenses.otherExpenses,true);
	}

	self.setVacancyPercentage = function () {
		self.property.expenses.vacancyPercentage = CommonService.parsePercentageInput(self.property.expenses.vacancyPercentage,false);
		self.updateVacancyAmount(); 
	}

	self.setRepairsPercentage = function () {
		self.property.expenses.repairsPercentage = CommonService.parsePercentageInput(self.property.expenses.repairsPercentage,false);
		self.updateRepairAmount();
	}

	self.setCapExPercentage = function () {
		self.property.expenses.capExPercentage = CommonService.parsePercentageInput(self.property.expenses.capExPercentage,false);
		self.updateCapExAmount();
	}
	
	self.setPropertyManagementPercentage = function () {
		self.property.expenses.propertyManagementPercentage = CommonService.parsePercentageInput(self.property.expenses.propertyManagementPercentage,false);
		self.updateManagementAmount();
	}

	self.setAnnualIncomeGrowth = function () {
		self.property.futureEstimates.annualIncomeGrowth = CommonService.parsePercentageInput(self.property.futureEstimates.annualIncomeGrowth,false);
	}

	self.setAnnualPVGrowth = function () {
		self.property.futureEstimates.annualPVGrowth = CommonService.parsePercentageInput(self.property.futureEstimates.annualPVGrowth,false);
	}
	
	self.setAnnualExpenseGrowth = function () {
		self.property.futureEstimates.annualExpenseGrowth = CommonService.parsePercentageInput(self.property.futureEstimates.annualExpenseGrowth,false);
	}
	
	self.setSalesExpenses = function () {
		self.property.futureEstimates.salesExpenses = CommonService.parsePercentageInput(self.property.futureEstimates.salesExpenses,false);
	}

	self.updateExpensePercentages = function () {
		self.updateVacancyAmount();
		self.updateRepairAmount();
		self.updateCapExAmount();
		self.updateManagementAmount();
	}

	self.updateVacancyAmount = function () {
		var vacancyPercentage = CommonService.setNullToZero(self.property.expenses.vacancyPercentage);
		self.vacancyAmount = CommonService.getPercentageOfValue(vacancyPercentage,self.getTotalIncome());
	}

	self.updateRepairAmount = function () {
		var repairsPercentage = CommonService.setNullToZero(self.property.expenses.repairsPercentage);
		self.repairAmount = CommonService.getPercentageOfValue(repairsPercentage,self.getTotalIncome());
	}

	self.updateCapExAmount = function () {
		var capExPercentage = CommonService.setNullToZero(self.property.expenses.capExPercentage);
		self.capExAmount = CommonService.getPercentageOfValue(capExPercentage,self.getTotalIncome());
	}

	self.updateManagementAmount = function () {
		var managementPercentage = CommonService.setNullToZero(self.property.expenses.propertyManagementPercentage);
		self.managementAmount = CommonService.getPercentageOfValue(managementPercentage,self.getTotalIncome());
	}
	
	
}]);