//Calculation Service will help set up the data for calculation
//The Calculation Helper Service is what will be in charge of running the actual calculations

REIApp.service('CalculationService', ['CommonService', 'ChartService', 'PropertyHelper', function (CommonService, ChartService, PropertyHelper) {

    var property = {};

    //these fields will be set through various setters and used as dependent data to perform certain calculations
    var variableExpenses = null;

    this.runCalculation = function (propertyInput) {
        property = PropertyHelper.preparePropertyForCalculation(propertyInput);

        property.results = {};

        property.results.downPayment = this.calculateDownPayment(property.purchasePrice, property.loanInfo.downpaymentPercentage);
        property.results.loanAmount = this.calculateLoanAmount(property.purchasePrice, property.results.downPayment);
        property.results.monthlyIncome = this.calculateMonthlyIncome(property.income.monthlyRent, property.income.otherIncome);
        property.results.totalProjectCost = this.calculateProjectCost(property);
        property.results.totalCashNeeded = this.calculateTotalCashNeeded(property);
        property.results.principleAndInterest = this.calculatePrincipleAndInterest(property, property.loanInfo.interestRate);
        property.results.discountAmount = this.calculateDiscountAmount(property.purchasePrice, property.marketValue);
        property.results.monthlyExpense = this.calculateTotalExpenses(property.results.principleAndInterest, property.expenses, property.results.monthlyIncome);
        property.results.cashflow = this.calculateCashFlow(property.results.monthlyIncome, property.results.monthlyExpense);
        property.results.cashOnCashROI = this.calculateCashOnCashROI(property.results.cashflow, property.results.totalCashNeeded);
        property.results.onePercentRule = this.calculateOnePercentRule(property);
        property.results.fiftyPercentRule = this.calculateFiftyPercentRule(property.results.monthlyIncome, property.results.principleAndInterest);
        this.setupPieCharts(property.income, property.results.principleAndInterest, property.expenses, variableExpenses, property.results.monthlyIncome);

        return property.results;
    }

    this.calculateDownPayment = function (purchasePrice, downPaymentPercentage) {
        downPaymentPercentage = CommonService.percentageToDecimal(downPaymentPercentage);
        return CommonService.multiply(purchasePrice, downPaymentPercentage);
    }

    this.calculateMonthlyIncome = function (monthlyRent, otherIncome) {
        return CommonService.sum(monthlyRent, otherIncome);
    }

    this.calculateTotalCashNeeded = function (property) {
        var input = [property.closingCosts, property.estimatedRepairValue, property.results.downPayment];
        return CommonService.sumArray(input);
    }

    this.calculateProjectCost = function (property) {
        var input = [property.purchasePrice, property.closingCosts, property.estimatedRepairValue];
        return CommonService.sumArray(input);
    }

    this.calculateLoanAmount = function (purchasePrice, downPayment) {
        return CommonService.difference(purchasePrice, downPayment);
    }

    this.calculateOnePercentRule = function (property) {
        //javaScript returns infinity if denominator is 0 or empty. So return 0 in that case instead
        if (!property.purchasePrice || property.purchasePrice == 0) {
            return "N/A";
        }
        var onePercentRule = CommonService.divide(property.income.monthlyRent, property.purchasePrice);
        return this.roundToTwoDecimals(CommonService.decimalToPercentage(CommonService.setNullToZero(onePercentRule)));
    }

    this.calculatePrincipleAndInterest = function (property, interestRate) {

        var monthlyInterestRate = CommonService.convertToMonthlyInterestRate(interestRate);
        var loanAmount = property.results.loanAmount;
        var numberOfPayments = CommonService.multiply(property.loanInfo.loanYears, 12);

        if (loanAmount == 0) {
            return 0;
        }

        if (monthlyInterestRate == 0) {
            return CommonService.divide(loanAmount, numberOfPayments);
        }

        var numerator = CommonService.multiply(monthlyInterestRate, Math.pow(1 + monthlyInterestRate, numberOfPayments));
        var denominator = CommonService.difference(Math.pow(1 + monthlyInterestRate, numberOfPayments), 1);

        if (denominator == 0) {
            return 0;
        }

        var mortgage = CommonService.multiply(loanAmount, (numerator / denominator));
        return CommonService.setNullToZero(mortgage);
    }

    this.calculateTotalExpenses = function (mortgage, expenses, monthlyIncome) {
        variableExpenses = this.getVariableExpenseValues(expenses, monthlyIncome);
        var monthlyExpenses = mortgage + (this.calculateFixedCosts(expenses) + this.calculateVariableExpenses(variableExpenses));
        return CommonService.setNullToZero(monthlyExpenses);
    }

    this.calculateFixedCosts = function (expenses) {
        return CommonService.setNullToZero(expenses.pmi) + CommonService.setNullToZero(expenses.propertyTaxes) + CommonService.setNullToZero(expenses.monthlyInsurance)
            + CommonService.setNullToZero(expenses.hoaFees) + CommonService.setNullToZero(expenses.electricity) + CommonService.setNullToZero(expenses.garbage)
            + CommonService.setNullToZero(expenses.water) + CommonService.setNullToZero(expenses.otherExpenses);
    }

    this.calculateVariableExpenses = function (variableExpense) {
        return CommonService.setNullToZero(variableExpense.vacancy) + CommonService.setNullToZero(variableExpense.repairs)
            + CommonService.setNullToZero(variableExpense.capEx) + CommonService.setNullToZero(variableExpense.propertyManagement);
    }

    this.calculateCashFlow = function (monthlyIncome, monthlyExpense) {
        var cashFlow = CommonService.difference(monthlyIncome, monthlyExpense);
        return CommonService.setNullToZero(cashFlow);
    }

    this.calculateCashOnCashROI = function (cashFlow, totalCashNeeded) {

        if (!totalCashNeeded || totalCashNeeded == 0) {
            if (cashFlow > 0) {
                return 100;
            }
            else if (cashFlow == 0) {
                return 0;
            }
            else {
                return 'N/A';
            }
        }
        var annualCashFlow = CommonService.monthlyToAnnualValue(cashFlow);
        var cocRoi = CommonService.divide(annualCashFlow, totalCashNeeded);
        cocRoi = CommonService.decimalToPercentage(cocRoi);
        return this.roundToTwoDecimals(CommonService.setNullToZero(cocRoi));
    }

    this.calculateFiftyPercentRule = function (monthlyIncome, mortgage) {
        var fiftyPercentRule = {};
        fiftyPercentRule.expenses = CommonService.multiply(monthlyIncome,0.5);
        fiftyPercentRule.cashflow = CommonService.difference(fiftyPercentRule.expenses,mortgage);
        return fiftyPercentRule;
    }

    this.getVariableExpenseValues = function (expenses, income) {
        var variableExpense = {};
        variableExpense.vacancy = CommonService.getPercentageOfValue(expenses.vacancyPercentage, income);
        variableExpense.repairs = CommonService.getPercentageOfValue(expenses.repairsPercentage, income);
        variableExpense.capEx = CommonService.getPercentageOfValue(expenses.capExPercentage, income);
        variableExpense.propertyManagement = CommonService.getPercentageOfValue(expenses.propertyManagementPercentage, income);
        return variableExpense;
    }

    this.calculateDiscountAmount = function (purchasePrice, marketValue) {
        //javaScript returns infinity if denominator is 0 or empty. So return 0 in that case instead
        if (!marketValue) {
            return "N/A";
        }

        var discount = 0;
        if (purchasePrice <= marketValue) {
            discount = 1 - (purchasePrice / marketValue);
        }
        else {
            discount = -(1 - (marketValue / purchasePrice));
        }
        return this.roundToTwoDecimals(CommonService.decimalToPercentage(CommonService.setNullToZero(discount)));
    }

    this.setupPieCharts = function (income, principleAndInterest, expenses, variableExpenses, monthlyIncome) {
        var expensePieChart = ChartService.getPieChart(ChartService.getExpenseArray(principleAndInterest, expenses, variableExpenses, monthlyIncome));
        var incomePieChart = ChartService.getPieChart(ChartService.getIncomeArray(income));
        property.expensePieData = expensePieChart.data;
        property.expensePieLabels = expensePieChart.labels;
        property.incomePieData = incomePieChart.data;
        property.incomePieLabels = incomePieChart.labels;
    }

    this.roundToTwoDecimals = function (field) {
        //round only if its not blank and is a number
        if (field && !isNaN(field)) {
            field = Math.round(field * 100) / 100;
        }

        return field;
    }

}]);