REIApp.service('PropertyHelper', [ 'CommonService', function (CommonService) {

	this.initDefaultValues = function (property) {
		property.reportTitle = null;
		property.propertyAddress = {
			street:'',
			city:'',
			state:''
		};
		property.annualPropertyTaxes = null;
		property.mlsNumber = null;
		property.purchasePrice = null;
		property.afterRepairValue = null;
		property.marketValue = null;
		property.closingCosts = null;
		property.estimatedRepairValue = null;
		property.isCashPurchase = false;
		property.loanInfo = {};
		property.income = {};
		property.expenses = {};
		property.futureEstimates = {};
		property.results = {};
		property.selectedReportDisplay = 'expenses';
		property.expensePieData = [];
		property.expensePieLabels = [];
		property.incomePieData = [];
		property.incomePieLabels = [];

		return property;
	}

	//When calculating for results page, we need all null values to be set to 0 in order to calculate without NaN or 'undefined' errors
	this.preparePropertyForCalculation = function (propertyInput) {
        property = propertyInput;
        property.purchasePrice = CommonService.setNullToZero(property.purchasePrice);
        property.closingCosts = CommonService.setNullToZero(property.closingCosts);
        property.estimatedRepairValue = CommonService.setNullToZero(property.estimatedRepairValue);
        property.marketValue = CommonService.setNullToZero(property.marketValue);
        property.loanInfo.downpaymentPercentage = CommonService.setNullToZero(property.loanInfo.downpaymentPercentage);
        property.loanInfo.interestRate = CommonService.setNullToZero(property.loanInfo.interestRate);
        property.loanInfo.loanYears = CommonService.setNullToZero(property.loanInfo.loanYears);
        property.income.monthlyRent = CommonService.setNullToZero(property.income.monthlyRent);
        property.income.otherIncome = CommonService.setNullToZero(property.income.otherIncome);
        property.expenses.pmi = CommonService.setNullToZero(property.expenses.pmi);
        property.expenses.propertyTaxes = CommonService.setNullToZero(property.expenses.propertyTaxes);
        property.expenses.monthlyInsurance = CommonService.setNullToZero(property.expenses.monthlyInsurance);
        property.expenses.hoaFees = CommonService.setNullToZero(property.expenses.hoaFees);
        property.expenses.electricity = CommonService.setNullToZero(property.expenses.electricity);
        property.expenses.garbage = CommonService.setNullToZero(property.expenses.garbage);
        property.expenses.water = CommonService.setNullToZero(property.expenses.water);
        property.expenses.otherExpenses = CommonService.setNullToZero(property.expenses.otherExpenses);
        property.expenses.vacancyPercentage = CommonService.setNullToZero(property.expenses.vacancyPercentage);
        property.expenses.repairsPercentage = CommonService.setNullToZero(property.expenses.repairsPercentage);
        property.expenses.capExPercentage = CommonService.setNullToZero(property.expenses.capExPercentage);
		property.expenses.propertyManagementPercentage = CommonService.setNullToZero(property.expenses.propertyManagementPercentage);
		
		return property;
    }

}]);