'use strict';

REIApp.controller('PurchaseInfoController', ['$scope','CommonService', function ($scope, CommonService) {
	var self = this;

	self.setPurchasePrice = function () {
		self.property.purchasePrice = CommonService.parseCurrencyInput(self.property.purchasePrice,true);
	}
	
	self.setAfterRepairValue = function () {
		self.property.afterRepairValue = CommonService.parseCurrencyInput(self.property.afterRepairValue,true);
	}

	self.setMarketValue = function () {
		self.property.marketValue = CommonService.parseCurrencyInput(self.property.marketValue,true);
	}

	self.setClosingCosts = function () {
		self.property.closingCosts = CommonService.parseCurrencyInput(self.property.closingCosts,true);
	}

	self.setEstimatedRepairValue = function () {
		self.property.estimatedRepairValue = CommonService.parseCurrencyInput(self.property.estimatedRepairValue,true);
	}

	self.setIsCashPurchase = function () {
		if(self.property.isCashPurchase){
			self.property.loanInfo.downpaymentPercentage = null;
			self.property.loanInfo.interestRate = null;
			self.property.loanInfo.otherCharges = null;
			self.property.loanInfo.loanYears = null;
		}
	}

	self.setDownpaymentPercentage = function () {
		self.property.loanInfo.downpaymentPercentage = CommonService.parsePercentageInput(self.property.loanInfo.downpaymentPercentage,false);
	}

	self.setInterestRate = function () {
		self.property.loanInfo.interestRate = CommonService.parsePercentageInput(self.property.loanInfo.interestRate,true);
	}

	self.setOtherCharges = function () {
		self.property.loanInfo.otherCharges = CommonService.parseCurrencyInput(self.property.loanInfo.otherCharges,true);
	}

	self.setLoanYears = function () {
		self.property.loanInfo.loanYears = CommonService.parseCurrencyInput(self.property.loanInfo.loanYears,false);
	}


}]);