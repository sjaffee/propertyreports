describe('Full Calculation Testing - ', function () {
    var CalculationService;
    beforeEach(function () {
        //mock all of analysis dependencies
        angular.module('ngResource', []);
        angular.module('ngMessages', []);
        angular.module('kendo.directives', []);
        angular.module('ngIdle', []);
        angular.module('chart.js', []);
        //load analysis module
        module('analysis');

        //get CalculationService service
        inject(function (_CalculationService_) {
            CalculationService = _CalculationService_;
        });
    });

    describe('Testing Income and Expense Calculations: ', function () {

        var CommonService;
        beforeEach(function () {
            //get CommonService service
            inject(function (_CommonService_) {
                CommonService = _CommonService_;
            });
        });

        describe('Testing runCalculations() : ', function () {
            var PropertyHelper;
            beforeEach(function () {
                inject(function (_PropertyHelper_) {
                    PropertyHelper = _PropertyHelper_;
                });
            });

            it('Should get downpayment based on purchase price and downpayment percentage', function () {
                var property = {};
                property = PropertyHelper.initDefaultValues(property);

                property.reportTitle = null;
                property.propertyAddress = {};
                property.annualPropertyTaxes = 2500;
                property.mlsNumber = null;
                property.purchasePrice = 100000;
                property.afterRepairValue = 120000;
                property.marketValue = 130000;
                property.closingCosts = 3000;
                property.estimatedRepairValue = 2000;
                property.isCashPurchase = false;
                property.loanInfo = { downpaymentPercentage: 20, interestRate: 4.75, otherCharges: null, loanYears: 30 };
                property.income = { monthlyRent: 1000, otherIncome: 25 };
                property.expenses = { pmi: null, propertyTaxes: 208.33, monthlyInsurance: 157, hoaFees: null, electricity: null, garbage: null, water: null, otherExpenses: null, vacancyPercentage: 5, repairsPercentage: 5, capExPercentage: 7, propertyManagementPercentage: 11};
                property.futureEstimates = {annualIncomeGrowth: null, annualPVGrowth: null, annualExpenseGrowth: null, salesExpenses: null};
                property.results = {};
                property.selectedReportDisplay = 'expenses';
                property.expensePieData = [];
                property.expensePieLabels = [];
                property.incomePieData = [];
                property.incomePieLabels = [];

                var results = CalculationService.runCalculation(property);
                expect(results.downPayment).toEqual(20000);
                expect(results.loanAmount).toEqual(80000);
                expect(results.monthlyIncome).toEqual(1025);
                expect(results.totalProjectCost).toEqual(105000);
                expect(results.totalCashNeeded).toEqual(25000);
                expect(results.principleAndInterest).toBeCloseTo(417.31,1);
                expect(results.discountAmount).toBeCloseTo(23.08);
                expect(results.monthlyExpense).toBeCloseTo(1069.64,1);
                expect(results.cashflow).toBeCloseTo(-44.64,1);
                expect(results.cashOnCashROI).toBeCloseTo(-2.14272,1);
                expect(results.onePercentRule).toBeCloseTo(1,1);
                expect(results.fiftyPercentRule.expenses).toBeCloseTo(512.5,1);
                expect(results.fiftyPercentRule.cashflow).toBeCloseTo(95.19,1);

            });
        });
    });

});