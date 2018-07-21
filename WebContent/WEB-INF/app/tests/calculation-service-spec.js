
describe('CalculationService - ', function () {
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

		describe('Down Payment and Loan Amount Calculation: ', function () {
			var testData;
			beforeEach(function () {
				testData =
					[
						{ purchasePrice: 100000, downPaymentPercentage: 20, results: { downPayment: 20000, loanAmount: 80000 } },
						{ purchasePrice: 259999, downPaymentPercentage: 3, results: { downPayment: 7799.97, loanAmount: 252199.03 } },
						{ purchasePrice: 289999, downPaymentPercentage: 1, results: { downPayment: 2899.99, loanAmount: 287099.01 } },
						{ purchasePrice: 289999, downPaymentPercentage: 0.01, results: { downPayment: 28.9999, loanAmount: 289970.0001 } },
						{ purchasePrice: 289999, downPaymentPercentage: 5.72, results: { downPayment: 16587.9428, loanAmount: 273411.0572 } },
						{ purchasePrice: 1783818292283, downPaymentPercentage: 25, results: { downPayment: 445954573070.75, loanAmount: 1337863719212.25 } },
						{ purchasePrice: 423021.80342, downPaymentPercentage: 45.735, results: { downPayment: 193469.021794137, loanAmount: 229552.781625863 } },
						{ purchasePrice: -999232, downPaymentPercentage: 82, results: { downPayment: -819370.24, loanAmount: -179861.76 } },
						{ purchasePrice: 220000, downPaymentPercentage: 175, results: { downPayment: 385000, loanAmount: -165000 } },
						{ purchasePrice: 0, downPaymentPercentage: 4.75, results: { downPayment: 0, loanAmount: 0 } },
						{ purchasePrice: 378992, downPaymentPercentage: -7, results: { downPayment: -26529.44, loanAmount: 405521.44 } },
						{ purchasePrice: -135999, downPaymentPercentage: -3.5, results: { downPayment: 4759.965, loanAmount: -140758.965 } },
						{ purchasePrice: 999999, downPaymentPercentage: 0, results: { downPayment: 0, loanAmount: 999999 } },
						{ purchasePrice: 7, downPaymentPercentage: 18, results: { downPayment: 1.26, loanAmount: 5.74 } },
						{ purchasePrice: 27.5, downPaymentPercentage: 278, results: { downPayment: 76.45, loanAmount: -48.95 } },
						{ purchasePrice: 125999, downPaymentPercentage: 35, results: { downPayment: 44099.65, loanAmount: 81899.35 } },
						{ purchasePrice: -100000.09, downPaymentPercentage: 0, results: { downPayment: 0, loanAmount: -100000.09 } },
						{ purchasePrice: 0.000001, downPaymentPercentage: 0.0000001, results: { downPayment: 0.000000000000001, loanAmount: 0.000000999999999 } },
						{ purchasePrice: '250000', downPaymentPercentage: '20', results: { downPayment: 50000, loanAmount: 200000 } },
						{ purchasePrice: null, downPaymentPercentage: '20', results: { downPayment: 0, loanAmount: 0 } },
						{ purchasePrice: 100000, downPaymentPercentage: null, results: { downPayment: 0, loanAmount: 100000 } },
						{ purchasePrice: '', downPaymentPercentage: '20', results: { downPayment: 0, loanAmount: 0 } },
						{ purchasePrice: 100000, downPaymentPercentage: '', results: { downPayment: 0, loanAmount: 100000 } },
						{ purchasePrice: null, downPaymentPercentage: null, results: { downPayment: 0, loanAmount: 0 } },
						{ purchasePrice: null, downPaymentPercentage: '', results: { downPayment: 0, loanAmount: 0 } },
						{ purchasePrice: '', downPaymentPercentage: undefined, results: { downPayment: 0, loanAmount: 0 } }
					];
			});

			it('Should get downpayment based on purchase price and downpayment percentage', function () {
				for (var i = 0; i < testData.length; i++) {
					expect(CalculationService.calculateDownPayment(testData[i].purchasePrice, testData[i].downPaymentPercentage)).toBeCloseTo(testData[i].results.downPayment);
				}
			});

			it('Should calculate loan amount based on downpayment', function () {
				for (var i = 0; i < testData.length; i++) {
					expect(CalculationService.calculateLoanAmount(testData[i].purchasePrice, testData[i].results.downPayment)).toBeCloseTo(testData[i].results.loanAmount);
				}
			});
		});
	});

	describe('Project Cost and Total Cash Needed Calculation: ', function () {
		var testData;
		beforeEach(function () {
			testData =
				[
					{ purchasePrice: 100000, closingCosts: 3500, estimatedRepairValue: 2000, loanInfo: {otherCharges: null}, isCashPurchase: false, results: { projectCost: 105500, downPayment: 20000, cashNeeded: 25500 } },
					{ purchasePrice: 259999, closingCosts: 3212, estimatedRepairValue: 4300, loanInfo: {otherCharges: 2121}, isCashPurchase: false,  results: { projectCost: 267511, downPayment: 59999, cashNeeded: 69632 } },
					{ purchasePrice: 100000, closingCosts: 3500, estimatedRepairValue: 2000, loanInfo: {otherCharges: 1789}, isCashPurchase: true, results: { projectCost: 105500, downPayment: 20000, cashNeeded: 127289 } },
					{ purchasePrice: 259999, closingCosts: 3212, estimatedRepairValue: 4300, loanInfo: {otherCharges: null}, isCashPurchase: true,  results: { projectCost: 267511, downPayment: 59999, cashNeeded: 327510 } },
					{ purchasePrice: 1783818292283, closingCosts: 1928342, estimatedRepairValue: 780234, loanInfo: {otherCharges: null}, isCashPurchase: false,  results: { projectCost: 1783821000859, downPayment: 982345213, cashNeeded: 985053789 } },
					{ purchasePrice: 423021.80342, closingCosts: 4021.40001, estimatedRepairValue: 15798.0782, loanInfo: {otherCharges: null}, isCashPurchase: false,  results: { projectCost: 442841.28163, downPayment: 85345.99283452, cashNeeded: 105165.471 } },
					{ purchasePrice: -999232, closingCosts: -3276, estimatedRepairValue: -4200, loanInfo: {otherCharges: -4576}, isCashPurchase: false,  results: { projectCost: -1006708, downPayment: -52874, cashNeeded: -64926 } },
					{ purchasePrice: 220000, closingCosts: -3500, estimatedRepairValue: 1800, loanInfo: {otherCharges: null}, isCashPurchase: false,  results: { projectCost: 218300, downPayment: -28000, cashNeeded: -29700 } },
					{ purchasePrice: 0, closingCosts: 2500, estimatedRepairValue: 4200, loanInfo: {otherCharges: null}, isCashPurchase: true,  results: { projectCost: 6700, downPayment: 25.17, cashNeeded: 6725.17 } },
					{ purchasePrice: 378992, closingCosts: 5243, estimatedRepairValue: 0, loanInfo: {otherCharges: null}, isCashPurchase: false,  results: { projectCost: 384235, downPayment: 17937, cashNeeded: 23180 } },
					{ purchasePrice: -135999, closingCosts: 0, estimatedRepairValue: 1800.98234, loanInfo: {otherCharges: null}, isCashPurchase: false,  results: { projectCost: -134198.01766, downPayment: 15000, cashNeeded: 16800.98234 } },
					{ purchasePrice: 0, closingCosts: 0, estimatedRepairValue: 0, loanInfo: {otherCharges: 0}, isCashPurchase: false,  results: { projectCost: 0, downPayment: 0, cashNeeded: 0 } },
					{ purchasePrice: 999999, closingCosts: 999999, estimatedRepairValue: 999999, loanInfo: {otherCharges: null}, isCashPurchase: false,  results: { projectCost: 2999997, downPayment: 999999, cashNeeded: 2999997 } },
					{ purchasePrice: 7, closingCosts: 9, estimatedRepairValue: 12, loanInfo: {otherCharges: null}, isCashPurchase: false,  results: { projectCost: 28, downPayment: 15, cashNeeded: 36 } },
					{ purchasePrice: 27.5, closingCosts: 18.000000021, estimatedRepairValue: 9, loanInfo: {otherCharges: 17.0982}, isCashPurchase: false,  results: { projectCost: 54.500000021, downPayment: 12.00000924, cashNeeded: 56.09820926 } },
					{ purchasePrice: 125999, closingCosts: 3725.7239, estimatedRepairValue: 2892, loanInfo: {otherCharges: null}, isCashPurchase: false,  results: { projectCost: 132616.7239, downPayment: 9999, cashNeeded: 16616.7239 } },
					{ purchasePrice: -100000.09, closingCosts: -2725.9987, estimatedRepairValue: -2900, loanInfo: {otherCharges: null}, isCashPurchase: true,  results: { projectCost: -105626.0887, downPayment: -92345.82345, cashNeeded: -197971.91215 } },
					{ purchasePrice: 0.000001, closingCosts: 0.00278, estimatedRepairValue: 0.8920, loanInfo: {otherCharges: null}, isCashPurchase: false,  results: { projectCost: 0.894781, downPayment: 0.0000001, cashNeeded: 0.8947801 } },
					{ purchasePrice: 120000, closingCosts: null, estimatedRepairValue: undefined, loanInfo: {otherCharges: null}, isCashPurchase: false,  results: { projectCost: 120000, downPayment: 20000, cashNeeded: 20000 } },
					{ purchasePrice: null, closingCosts: null, estimatedRepairValue: null, loanInfo: {otherCharges: null}, isCashPurchase: false,  results: { projectCost: 0, downPayment: 0, cashNeeded: 0 } },
					{ purchasePrice: '', closingCosts: undefined, estimatedRepairValue: null, loanInfo: {otherCharges: ''}, isCashPurchase: false,  results: { projectCost: 0, downPayment: 0, cashNeeded: 0 } },
					{ purchasePrice: null, closingCosts: 2532.92, estimatedRepairValue: '', loanInfo: {otherCharges: undefined}, isCashPurchase: false,  results: { projectCost: 2532.92, downPayment: 0, cashNeeded: 2532.92 } },
				];
		});

		it('Should sum all acquistion costs', function () {
			for (var i = 0; i < testData.length; i++) {
				expect(CalculationService.calculateProjectCost(testData[i])).toBeCloseTo(testData[i].results.projectCost);
			}
		});

		it('Sum total cash needed', function () {
			for (var i = 0; i < testData.length; i++) {
				expect(CalculationService.calculateTotalCashNeeded(testData[i])).toBeCloseTo(testData[i].results.cashNeeded);
			}
		});
	});



	//Testing loan amount and loan years. Interest rate is static.
	describe('P&I Calculation - Testing Varying Loan Amount and Years: ', function () {
		var loanAmount; var loanYears; var interest; var property;
		beforeEach(function () {
			loanAmount =
				[
					{ loan: 100000, r15: 772.68, r30: 515.63, r1: 8544.71, r3: 2981.40, r5: 1871.13, r10: 1043.62, r20: 640.77, r25: 564.38, r49: 431.94 },
					{ loan: 289000, r15: 2233.04, r30: 1490.19, r1: 24694.23, r3: 8616.24, r5: 5407.56, r10: 3016.09, r20: 1851.83, r25: 1631.06, r49: 1248.31 },
					{ loan: 352203, r15: 2721.40, r30: 1816.08, r1: 30094.75, r3: 10500.58, r5: 6590.17, r10: 3675.69, r20: 2256.82, r25: 1987.76, r49: 1521.31 },
					{ loan: 722999, r15: 5586.480, r30: 3728.048, r1: 61778.22, r3: 21555.49, r5: 13528.25, r10: 7545.43, r20: 4632.79, r25: 4080.46, r49: 3122.93 },
					{ loan: 199999, r15: 1545.35, r30: 1031.26, r1: 17089.34, r3: 5962.77, r5: 3742.24, r10: 2087.24, r20: 1281.54, r25: 1128.75, r49: 863.88 },
					{ loan: 0, r15: 0, r30: 0, r1: 0, r3: 0, r5: 0, r10: 0, r20: 0, r25: 0, r49: 0 },
					{ loan: 7, r15: 0.05, r30: 0.036, r1: 0.598, r3: 0.208, r5: 0.13, r10: 0.07, r20: 0.04, r25: 0.03, r49: 0.03 },
					{ loan: 2300, r15: 17.77, r30: 11.85, r1: 196.52, r3: 68.57, r5: 43.03, r10: 24.00, r20: 14.73, r25: 12.98, r49: 9.93 },
					{ loan: 44123, r15: 340.93, r30: 227.51, r1: 3770.18, r3: 1315.48, r5: 825.59, r10: 460.48, r20: 282.72, r25: 249.02, r49: 190.58 },
					{ loan: -200000, r15: -1545.37, r30: -1031.28, r1: -17089.44, r3: -5962.81, r5: -3742.27, r10: -2087.26, r20: -1281.55, r25: -1128.77, r49: -863.89 },
					{ loan: -187653, r15: -1449.97, r30: -967.61, r1: -16034.42, r3: -5594.69, r5: -3511.24, r10: -1958.41, r20: -1202.44, r25: -1059.08, r49: -810.56 },
					{ loan: null, r15: 0, r30: 0, r1: 0, r3: 0, r5: 0, r10: 0, r20: 0, r25: 0, r49: 0 },
					{ loan: '', r15: 0, r30: 0, r1: 0, r3: 0, r5: 0, r10: 0, r20: 0, r25: 0, r49: 0 },
				];
			loanYears = [15, 30, 1, 3, 5, 10, 20, 25, 49, null,'',undefined];
			interestRate = 4.65;
			property = {};
			property.results = {};
			property.loanInfo = {};
		});

		it(' P&I Calculation : ', function () {
			//fixed interest
			for (var i = 0; i < loanAmount.length; i++) {
				for (var j = 0; j < loanYears.length; j++) {
					property.results.loanAmount = loanAmount[i].loan;
					property.loanInfo.loanYears = loanYears[j];
					switch (loanYears[j]) {
						case 15:
							expect(CalculationService.calculatePrincipleAndInterest(property, interestRate)).toBeCloseTo(loanAmount[i].r15, 1);
							break;
						case 30:
							expect(CalculationService.calculatePrincipleAndInterest(property, interestRate)).toBeCloseTo(loanAmount[i].r30, 1);
							break;
						case 1:
							expect(CalculationService.calculatePrincipleAndInterest(property, interestRate)).toBeCloseTo(loanAmount[i].r1, 1);
							break;
						case 3:
							expect(CalculationService.calculatePrincipleAndInterest(property, interestRate)).toBeCloseTo(loanAmount[i].r3, 1);
							break;
						case 5:
							expect(CalculationService.calculatePrincipleAndInterest(property, interestRate)).toBeCloseTo(loanAmount[i].r5, 1);
							break;
						case 10:
							expect(CalculationService.calculatePrincipleAndInterest(property, interestRate)).toBeCloseTo(loanAmount[i].r10, 1);
							break;
						case 20:
							expect(CalculationService.calculatePrincipleAndInterest(property, interestRate)).toBeCloseTo(loanAmount[i].r20, 1);
							break;
						case 25:
							expect(CalculationService.calculatePrincipleAndInterest(property, interestRate)).toBeCloseTo(loanAmount[i].r25, 1);
							break;
						case 49:
							expect(CalculationService.calculatePrincipleAndInterest(property, interestRate)).toBeCloseTo(loanAmount[i].r49, 1);
							break;
						case null:
							expect(CalculationService.calculatePrincipleAndInterest(property, interestRate)).toBeCloseTo(0);
							break;
						case '':
							expect(CalculationService.calculatePrincipleAndInterest(property, interestRate)).toBeCloseTo(0);
							break;
						case undefined:
							expect(CalculationService.calculatePrincipleAndInterest(property, interestRate)).toBeCloseTo(0);
							break;
					}

				}
			}
		});
	});

	//Testing varying interest rates and a static purchase price
	describe('P&I Calculation - Testing Varying Interest Rates and Loan Years:  ', function () {
		var loanYears; var interest; var property;
		beforeEach(function () {
			//these numbers are the monthly interest rate. This equates to 5.952%, 2.9873452%, 0.001%, -4.75%, 0% and 3%
			interest =
				[
					{ rate: 5.952, r15: 2439.66, r30: 1729.75, r1: 24952.78, r3: 8816.02, r10: 3212.59, r20: 2069.62, r49: 1521.33 },
					{ rate: 2.9873452, r15: 2000.86, r30: 1220.61, r1: 24559.37, r3: 8431.86, r10: 2798.51, r20: 1606.44, r49: 939.69 },
					{ rate: 0.001, r15: 1611.22, r30: 805.67, r1: 24166.71, r3: 8055.65, r10: 2416.78, r20: 1208.45, r49: 493.31 },
					{ rate: -4.75, r15: 1101.67, r30: 362.15, r1: 23549.31, r3: 7479.27, r10: 1883.27, r20: 721.69, r49: 123.43 },
					{ rate: 3, r15: 2002.67, r30: 1222.64, r1: 24561.08, r3: 8433.52, r10: 2800.25, r20: 1608.32, r49: 941.98 },
					{ rate: 0, r15: 1611.11, r30: 805.55, r1: 24166.58, r3: 8055.53, r10: 2416.66, r20: 1208.33, r49: 493.19 },
					{ rate: null, r15: 1611.11, r30: 805.55, r1: 24166.58, r3: 8055.53, r10: 2416.66, r20: 1208.33, r49: 493.19 },
					{ rate: '', r15: 1611.11, r30: 805.55, r1: 24166.58, r3: 8055.53, r10: 2416.66, r20: 1208.33, r49: 493.19 },
					{ rate: undefined, r15: 1611.11, r30: 805.55, r1: 24166.58, r3: 8055.53, r10: 2416.66, r20: 1208.33, r49: 493.19 },
				];
			loanYears = [15, 30, 1, 3, 10, 20, 49];
			property = {};
			property.results = {};
			property.results.loanAmount = 289999;
			property.loanInfo = {};
		});

		it(' P&I Calculation : ', function () {
			//fixed loanAmount
			var interestRate;
			for (var i = 0; i < interest.length; i++) {
				for (var j = 0; j < loanYears.length; j++) {
					interestRate = interest[i].rate;
					property.loanInfo.loanYears = loanYears[j];
					switch (loanYears[j]) {
						case 15:
							expect(CalculationService.calculatePrincipleAndInterest(property, interestRate)).toBeCloseTo(interest[i].r15, 0);
							break;
						case 30:
							expect(CalculationService.calculatePrincipleAndInterest(property, interestRate)).toBeCloseTo(interest[i].r30, 0);
							break;
						case 1:
							expect(CalculationService.calculatePrincipleAndInterest(property, interestRate)).toBeCloseTo(interest[i].r1, 0);
							break;
						case 3:
							expect(CalculationService.calculatePrincipleAndInterest(property, interestRate)).toBeCloseTo(interest[i].r3, 0);
							break;
						case 5:
							expect(CalculationService.calculatePrincipleAndInterest(property, interestRate)).toBeCloseTo(interest[i].r5, 0);
							break;
						case 10:
							expect(CalculationService.calculatePrincipleAndInterest(property, interestRate)).toBeCloseTo(interest[i].r10, 0);
							break;
						case 20:
							expect(CalculationService.calculatePrincipleAndInterest(property, interestRate)).toBeCloseTo(interest[i].r20, 0);
							break;
						case 25:
							expect(CalculationService.calculatePrincipleAndInterest(property, interestRate)).toBeCloseTo(interest[i].r25, 0);
							break;
						case 49:
							expect(CalculationService.calculatePrincipleAndInterest(property, interestRate)).toBeCloseTo(interest[i].r49, 0);
							break;
					}

				}
			}
		});
	});

	describe('Testing P&I Calculation Special Cases: ', function () {
		var testData; var property;
		beforeEach(function () {
			testData =
				[
					{ loan: 0, interest: 0, r15: 0, r30: 0, r1: 0, r3: 0, r25: 0, r49: 0 },
					{ loan: 258293, interest: 0, r15: 1434.96, r30: 717.48, r1: 21524.42, r3: 7174.81, r25: 860.98, r49: 439.27 },
					{ loan: 0, interest: 4.75, r15: 0, r30: 0, r1: 0, r3: 0, r25: 0, r49: 0 },
					{ loan: -432888, interest: 5.952, r15: -3641.74, r30: -2582.04, r1: -37247.58, r3: -13159.88, r25: -2776.42, r49: -2270.93 },
					{ loan: -325999, interest: -5.952, r15: -1117.16, r30: -324.06, r1: -26298.72, r3: -8248.69, r25: -469.41, r49: -91.82 },
					{ loan: null, interest: null, r15: 0, r30: 0, r1: 0, r3: 0, r25: 0, r49: 0 },
					{ loan: '', interest: null, r15: 0, r30: 0, r1: 0, r3: 0, r25: 0, r49: 0 },
					{ loan: null, interest: '', r15: 0, r30: 0, r1: 0, r3: 0, r25: 0, r49: 0 },
					{ loan: undefined, interest: '', r15: 0, r30: 0, r1: 0, r3: 0, r25: 0, r49: 0 }
				];
			loanYears = [15, 30, 1, 3, 25, 49];
			property = {};
			property.results = {};
			property.loanInfo = {};
		});

		it(' P&I Calculation : ', function () {
			//fixed loanAmount
			var interestRate;
			for (var i = 0; i < testData.length; i++) {
				for (var j = 0; j < loanYears.length; j++) {
					interestRate = testData[i].interest;
					property.loanInfo.loanYears = loanYears[j];
					property.results.loanAmount = testData[i].loan;
					switch (loanYears[j]) {
						case 15:
							expect(CalculationService.calculatePrincipleAndInterest(property, interestRate)).toBeCloseTo(testData[i].r15, 0);
							break;
						case 30:
							expect(CalculationService.calculatePrincipleAndInterest(property, interestRate)).toBeCloseTo(testData[i].r30, 0);
							break;
						case 1:
							expect(CalculationService.calculatePrincipleAndInterest(property, interestRate)).toBeCloseTo(testData[i].r1, 0);
							break;
						case 3:
							expect(CalculationService.calculatePrincipleAndInterest(property, interestRate)).toBeCloseTo(testData[i].r3, 0);
							break;
						case 25:
							expect(CalculationService.calculatePrincipleAndInterest(property, interestRate)).toBeCloseTo(testData[i].r25, 0);
							break;
						case 49:
							expect(CalculationService.calculatePrincipleAndInterest(property, interestRate)).toBeCloseTo(testData[i].r49, 0);
							break;
					}
				}
			}
		});
	});

	describe('Testing Fixed Expense Calculations: ', function () {
		var fixedExpenses;
		beforeEach(function () {
			fixedExpenses =
				[
					{ pmi: 250, propertyTaxes: 578, monthlyInsurance: 157, hoaFees: 320, electricity: 217, garbage: 20, water: 28, otherExpenses: 32, total: 1602 },
					{ pmi: 250, propertyTaxes: 578, monthlyInsurance: 157, hoaFees: 0, electricity: 0, garbage: 0, water: 0, otherExpenses: 0, total: 985 },
					{ pmi: 323, propertyTaxes: 723.6342, monthlyInsurance: -32, hoaFees: 0.000012, electricity: 777.0981, garbage: 0, water: -32.5, otherExpenses: 88, total: 1847.232312 },
					{ pmi: 982345, propertyTaxes: 0.0009832, monthlyInsurance: 0, hoaFees: 15, electricity: -78.0098, garbage: 0, water: 28, otherExpenses: 99, total: 982408.9912 },
					{ pmi: 0, propertyTaxes: -763, monthlyInsurance: 252.00082, hoaFees: 99234.98, electricity: 234, garbage: -22, water: 17.77, otherExpenses: 0, total: 98953.75082 },
					{ pmi: -72, propertyTaxes: 72, monthlyInsurance: -72, hoaFees: 72, electricity: -72, garbage: 72, water: -72, otherExpenses: 72, total: 0 },
					{ pmi: 734.3457, propertyTaxes: -33.473, monthlyInsurance: -14.4444, hoaFees: 0, electricity: 0, garbage: 0, water: 0, otherExpenses: 0, total: 686.4283 },
					{ pmi: -823.743, propertyTaxes: 0, monthlyInsurance: 12.00, hoaFees: 88, electricity: -0, garbage: 823.743, water: 729, otherExpenses: 1000.00, total: 1829 },
					{ pmi: 0.000231, propertyTaxes: 824145.00, monthlyInsurance: 0.00053, hoaFees: 44, electricity: 982345.00001, garbage: .092, water: 23, otherExpenses: 4, total: 1806561.093 },
					{ pmi: .55, propertyTaxes: .18, monthlyInsurance: .17, hoaFees: .15, electricity: -.07, garbage: 8, water: 8, otherExpenses: 8, total: 24.98 },
					{ pmi: 100, propertyTaxes: 10, monthlyInsurance: 1, hoaFees: 01, electricity: 10, garbage: 100, water: 1000, otherExpenses: 10000, total: 11222 },
					{ pmi: 0, propertyTaxes: 0, monthlyInsurance: 0, hoaFees: 0, electricity: 0, garbage: 0, water: 0, otherExpenses: 0, total: 0 },
					{ pmi: 172.98, propertyTaxes: null, monthlyInsurance: 210, hoaFees: '', electricity: 73.124, garbage: undefined, water: -32.2, otherExpenses: 0, total: 423.904 },
					{ pmi: null, propertyTaxes: 0, monthlyInsurance: '', hoaFees: undefined, electricity: 0, garbage: null, water: null, otherExpenses: 0, total: 0 },
					{ pmi: null, propertyTaxes: null, monthlyInsurance: null, hoaFees: null, electricity: null, garbage: null, water: null, otherExpenses: null, total: 0 },
					{ pmi: '', propertyTaxes: null, monthlyInsurance: '', hoaFees: '', electricity: null, garbage: '', water: null, otherExpenses: null, total: 0 }

				]
		});

		it('Fixed expense calculations : ', function () {
			for (var i = 0; i < fixedExpenses.length; i++) {
				expect(CalculationService.calculateFixedCosts(fixedExpenses[i])).toBeCloseTo(fixedExpenses[i].total);
			}
		});
	});

	describe('Testing Variable Expense Calculations: ', function () {
		var variableExpenses;
		beforeEach(function () {
			variableExpenses =
				[
					{ vacancy: 250, repairs: 578, capEx: 157, propertyManagement: 320, total: 1305 },
					{ vacancy: 0, repairs: 0, capEx: 0, propertyManagement: 0, total: 0 },
					{ vacancy: 52.725, repairs: 52.725, capEx: 73.872, propertyManagement: 121.742, total: 301.064 },
					{ vacancy: 0.00021, repairs: 0.00021, capEx: 0.00038, propertyManagement: 0.00072, total: 0.00152 },
					{ vacancy: -12.72, repairs: -5, capEx: 0, propertyManagement: 178.00, total: 160.28 },
					{ vacancy: 9823452.93, repairs: 999999, capEx: 99999932, propertyManagement: 98729471, total: 209552854.93 },
					{ vacancy: 5.32, repairs: 7.39, capEx: 6.84, propertyManagement: 12.32, total: 31.87 },
					{ vacancy: 10, repairs: 100, capEx: 1000, propertyManagement: 10000, total: 11110 },
					{ vacancy: 120, repairs: -120, capEx: 120, propertyManagement: -120, total: 0 },
					{ vacancy: 111.1111, repairs: 111.1111, capEx: 111.1111, propertyManagement: 111.1111, total: 444.4444 },
					{ vacancy: -183, repairs: -873, capEx: -982.99, propertyManagement: -723, total: -2761.99 },
					{ vacancy: 120.50, repairs: 123.82, capEx: 140.79, propertyManagement: 155.23, total: 540.34 },
					{ vacancy: 99, repairs: 99.9, capEx: 0.9, propertyManagement: 09, total: 208.8 },
					{ vacancy: null, repairs: 187.281, capEx: '', propertyManagement: undefined, total: 187.281 },
					{ vacancy: null, repairs: null, capEx: null, propertyManagement: null, total: 0 },
				]
		});

		it('Variable expense calculations : ', function () {
			for (var i = 0; i < variableExpenses.length; i++) {
				expect(CalculationService.calculateVariableExpenses(variableExpenses[i])).toBeCloseTo(variableExpenses[i].total);
			}
		});
	});

	// //CANNOT ADJUST ANY OF THE TESTS DATA WITHOUT CAUSING THE REST TO FAIL
	describe('Testing Income Calculations: ', function () {

		var incomeData;
		beforeEach(function () {
			incomeData =
				[
					{ income: { monthlyRent: 1000, otherIncome: 25, total: 1025 } },
					{ income: { monthlyRent: 1200, otherIncome: 0, total: 1200 } },
					{ income: { monthlyRent: 1850, otherIncome: 1435, total: 3285 } },
					{ income: { monthlyRent: 2025, otherIncome: 108, total: 2133 } },
					{ income: { monthlyRent: 2576.892342, otherIncome: 33.333331, total: 2610.225673 } },
					{ income: { monthlyRent: 0, otherIncome: 1250, total: 1250 } },
					{ income: { monthlyRent: 9999, otherIncome: 0, total: 9999 } },
					{ income: { monthlyRent: 129765.6204, otherIncome: 9023.98231, total: 138789.6027 } },
					{ income: { monthlyRent: 0.0000001, otherIncome: 0.000000078, total: 0.000000178 } },
					{ income: { monthlyRent: 1200.000293, otherIncome: 20, total: 1220.000293 } },
					{ income: { monthlyRent: 1200, otherIncome: 20.99999823, total: 1220.999998 } },
					{ income: { monthlyRent: 0, otherIncome: 0, total: 0 } },
					{ income: { monthlyRent: -627, otherIncome: -32, total: -659 } },
					{ income: { monthlyRent: -782.9823, otherIncome: -15.282, total: -798.2643 } },
					{ income: { monthlyRent: 558, otherIncome: -19, total: 539 } },
					{ income: { monthlyRent: -871, otherIncome: 900, total: 29 } },
					{ income: { monthlyRent: 872435297, otherIncome: 9998234, total: 882433531 } },
					{ income: { monthlyRent: 0.782345, otherIncome: 0.5689231, total: 1.3512681 } },
					{ income: { monthlyRent: 1899, otherIncome: null, total: 1899 } },
					{ income: { monthlyRent: null, otherIncome: null, total: 0 } },
					{ income: { monthlyRent: null, otherIncome: 25, total: 25 } },
					{ income: { monthlyRent: '', otherIncome: 25, total: 25 } }
				]
		});

		it('Should sum all income: ', function () {
			for (var i = 0; i < incomeData.length; i++) {
				expect(CalculationService.calculateMonthlyIncome(incomeData[i].income.monthlyRent, incomeData[i].income.otherIncome)).toBeCloseTo(incomeData[i].income.total);

			}
		});
	});

	describe('Testing Total Expense Calculations: ', function () {
		var calculatedExpenses; var mortgage; var length; var testData;
		beforeEach(function () {
			testData =
				[
					{ mortgage: 412.72, income: 1500, expenses: { pmi: 0, propertyTaxes: 578, monthlyInsurance: 157, hoaFees: 0, electricity: 0, garbage: 20, water: 0, otherExpenses: 0, vacancyPercentage: 5, repairsPercentage: 5, capExPercentage: 7, propertyManagementPercentage: 11 }, total: 1587.72 },
					{ mortgage: 1289.8923, income: 1800, expenses: { pmi: 250, propertyTaxes: 578, monthlyInsurance: 157, hoaFees: 320, electricity: 217, garbage: 20, water: 28, otherExpenses: 32, vacancyPercentage: 1, repairsPercentage: 2, capExPercentage: 3, propertyManagementPercentage: 5 }, total: 3089.8923 },
					{ mortgage: -783.28, income: 1200, expenses: { pmi: 323, propertyTaxes: 723.6342, monthlyInsurance: -32, hoaFees: 0.000012, electricity: 777.0981, garbage: 0, water: -32.5, otherExpenses: 88, vacancyPercentage: -3, repairsPercentage: 5, capExPercentage: -7, propertyManagementPercentage: 10 }, total: 1123.952312 },
					{ mortgage: 33.587, income: 99999921, expenses: { pmi: 982345, propertyTaxes: 0.0009832, monthlyInsurance: 0, hoaFees: 15, electricity: -78.0098, garbage: 0, water: 28, otherExpenses: 99, vacancyPercentage: 1.8, repairsPercentage: 4.93, capExPercentage: 2.56, propertyManagementPercentage: 9.87123 }, total: 20143657.4408115 },
					{ mortgage: 1234, income: 109231, expenses: { pmi: 0, propertyTaxes: -763, monthlyInsurance: 252.00082, hoaFees: 99234.98, electricity: 234, garbage: -22, water: 17.77, otherExpenses: 0, vacancyPercentage: 5, repairsPercentage: 5, capExPercentage: 5, propertyManagementPercentage: 10 }, total: 127495.50082 },
					{ mortgage: 0, income: -982, expenses: { pmi: -72, propertyTaxes: 72, monthlyInsurance: -72, hoaFees: 72, electricity: -72, garbage: 72, water: -72, otherExpenses: 72, vacancyPercentage: 0.1, repairsPercentage: 0.872, capExPercentage: 0.029, propertyManagementPercentage: 0.12 }, total: -11.00822 },
					{ mortgage: 12, income: 832.909841, expenses: { pmi: 734.3457, propertyTaxes: -33.473, monthlyInsurance: -14.4444, hoaFees: 0, electricity: 0, garbage: 0, water: 0, otherExpenses: 0, vacancyPercentage: 0, repairsPercentage: 12, capExPercentage: 0, propertyManagementPercentage: 12 }, total: 898.32666184 },
					{ mortgage: 568.92, income: 25, expenses: { pmi: -823.743, propertyTaxes: 0, monthlyInsurance: 12.00, hoaFees: 88, electricity: -0, garbage: 823.743, water: 729, otherExpenses: 1000.00, vacancyPercentage: 12, repairsPercentage: 0, capExPercentage: 9, propertyManagementPercentage: 1.32 }, total: 2403.5 },
					{ mortgage: 1218.99, income: 0.030182, expenses: { pmi: 0.000231, propertyTaxes: 824145.00, monthlyInsurance: 0.00053, hoaFees: 44, electricity: 982345.00001, garbage: .092, water: 23, otherExpenses: 4, vacancyPercentage: 15, repairsPercentage: -15, capExPercentage: 15, propertyManagementPercentage: -15 }, total: 1807780.082771 },
					{ mortgage: 1000, income: 2899, expenses: { pmi: .55, propertyTaxes: .18, monthlyInsurance: .17, hoaFees: .15, electricity: -.07, garbage: 8, water: 8, otherExpenses: 8, vacancyPercentage: 05, repairsPercentage: 005, capExPercentage: 0005, propertyManagementPercentage: 0005 }, total: 1604.78 },
					{ mortgage: 820320.1235, income: 820320.1235, expenses: { pmi: 100, propertyTaxes: 10, monthlyInsurance: 1, hoaFees: 01, electricity: 10, garbage: 100, water: 1000, otherExpenses: 10000, vacancyPercentage: 1, repairsPercentage: 10, capExPercentage: 100, propertyManagementPercentage: -90 }, total: 1003809.349435 },
					{ mortgage: 1800, income: 1801, expenses: { pmi: 0, propertyTaxes: 0, monthlyInsurance: 0, hoaFees: 0, electricity: 0, garbage: 0, water: 0, otherExpenses: 0, vacancyPercentage: 0, repairsPercentage: 0, capExPercentage: 0, propertyManagementPercentage: 0 }, total: 1800 },
					{ mortgage: 1800, income: 2032, expenses: { pmi: null, propertyTaxes: null, monthlyInsurance: null, hoaFees: null, electricity: '', garbage: null, water: undefined, otherExpenses: null, vacancyPercentage: null, repairsPercentage: null, capExPercentage: null, propertyManagementPercentage: null }, total: 1800 },
					{ mortgage: null, income: '', expenses: { pmi: null, propertyTaxes: null, monthlyInsurance: null, hoaFees: null, electricity: '', garbage: null, water: undefined, otherExpenses: null, vacancyPercentage: null, repairsPercentage: null, capExPercentage: null, propertyManagementPercentage: null }, total: 0 }
				]

		});

		it('Total expense calculations : ', function () {
			for (var i = 0; i < testData.length; i++) {
				expect(CalculationService.calculateTotalExpenses(testData[i].mortgage, testData[i].expenses, testData[i].income)).toBeCloseTo(testData[i].total);
			}
		});

		it('Cash flow calculations : ', function () {
			var cashflowResults = [-87.72, -1289.8923, 76.047688, 79856263.56, -18264.50082, -970.99178, -65.41682084, -2378.5, -1807780.053, 1294.22, -183489.2259, 1, 232, 0];
			for (var i = 0; i < testData.length; i++) {
				expect(CalculationService.calculateCashFlow(testData[i].income, testData[i].total)).toBeCloseTo(cashflowResults[i]);
			}
		});
	});

	describe('Testing Cash on Cash ROI Calculations: ', function () {
		var testData;
		beforeEach(function () {
			testData =
				[
					{ totalCashNeeded: 20000, cashFlow: 200, result: 12 },
					{ totalCashNeeded: 50000, cashFlow: 520, result: 12.48 },
					{ totalCashNeeded: 57999.8, cashFlow: 32.8923, result: 0.68 },
					{ totalCashNeeded: 17458.6, cashFlow: -72.8301, result: -5.01 },
					{ totalCashNeeded: 269196.4, cashFlow: -9992.813, result: -44.55 },
					{ totalCashNeeded: 300000, cashFlow: -182, result: -0.73 },
					{ totalCashNeeded: 750000, cashFlow: -389, result: -0.62 },
					{ totalCashNeeded: 869997.0823, cashFlow: 1251.899, result: 1.73 },
					{ totalCashNeeded: 261879, cashFlow: 5002.93, result: 22.92 },
					{ totalCashNeeded: 4037946, cashFlow: 0, result: 0 },
					{ totalCashNeeded: 0, cashFlow: 28.99, result: 100 },
					{ totalCashNeeded: -2349.482, cashFlow: 12, result: -6.13 },
					{ totalCashNeeded: 178203, cashFlow: null, result: 0 },
					{ totalCashNeeded: 178203, cashFlow: '', result: 0 },
					{ totalCashNeeded: null, cashFlow: 252.74, result: 100 },
					{ totalCashNeeded: '', cashFlow: 252.74, result: 100 },
					{ totalCashNeeded: 0, cashFlow: 0, result: 0 },
					{ totalCashNeeded: 0, cashFlow: -100, result: 'N/A' },
					{ totalCashNeeded: null, cashFlow: -172, result: 'N/A' },
					{ totalCashNeeded: '', cashFlow: -353.87, result: 'N/A' },
					{ totalCashNeeded: undefined, cashFlow: -189.89, result: 'N/A' }
				]
		});

		it('CoCROI calculations : ', function () {
			var cocroi;
			for (var i = 0; i < testData.length; i++) {
				cocroi = CalculationService.calculateCashOnCashROI(testData[i].cashFlow, testData[i].totalCashNeeded);
				if(isNaN(cocroi)){
					expect(cocroi).toEqual(testData[i].result);
				}
				else{
					expect(cocroi).toBeCloseTo(testData[i].result);
				}
			}
		});
	});

	describe('Testing 50% Rule Calculations: ', function () {
		var testData;
		beforeEach(function () {
			testData =
				[
					{ income: 0, mortgage: 0, expense: 0, cashflow: 0 },
					{ income: 0, mortgage: 412.68, expense: 0, cashflow: -412.68 },
					{ income: 1025, mortgage: 0, expense: 512.5, cashflow: 512.5 },
					{ income: -800.8923, mortgage: -881.711, expense: -400.44615, cashflow: 481.26485 },
					{ income: -1899, mortgage: 500, expense: -949.5, cashflow: -1449.5 },
					{ income: 1748.99, mortgage: -1000, expense: 874.495, cashflow: 1874.495 },
					{ income: 199999999, mortgage: 99997863.5, expense: 99999999.5, cashflow: 2136 },
					{ income: 1257, mortgage: 628.5, expense: 628.5, cashflow: 0 },
					{ income: 0.078291, mortgage: 0.02834, expense: 0.0391455, cashflow: 0.0108055 },
					{ income: 795, mortgage: 281.71, expense: 397.5, cashflow: 115.79 },
					{ income: 2034.98, mortgage: 591, expense: 1017.49, cashflow: 426.49 },
					{ income: 2245, mortgage: 1082.23, expense: 1122.5, cashflow: 40.27 },
					{ income: null, mortgage: 1082.23, expense: 0, cashflow: -1082.23 },
					{ income: null, mortgage: null, expense: 0, cashflow: 0 },
					{ income: 1250.92, mortgage: null, expense: 625.46, cashflow: 625.46 },
					{ income: undefined, mortgage: '', expense: 0, cashflow: 0 }
				]
		});

		it('50% Calculations : ', function () {
			var fiftyPercentRule = {};
			for (var i = 0; i < testData.length; i++) {
				fiftyPercentRule = CalculationService.calculateFiftyPercentRule(testData[i].income, testData[i].mortgage);
				expect(fiftyPercentRule.expenses).toBeCloseTo(testData[i].expense);
				expect(fiftyPercentRule.cashflow).toBeCloseTo(testData[i].cashflow);
			}
		});
	});

	describe('Testing 1% Rule Calculations: ', function () {
		var testData;
		beforeEach(function () {
			testData =
				[
					{ income: { monthlyRent: 0 }, purchasePrice: 0, result: 'N/A' },
					{ income: { monthlyRent: 1025 }, purchasePrice: 0, result: 'N/A' },
					{ income: { monthlyRent: 0 }, purchasePrice: 125999, result: 0 },
					{ income: { monthlyRent: -1000 }, purchasePrice: -100000, result: 1 },
					{ income: { monthlyRent: 3200.23 }, purchasePrice: 284999.99, result: 1.122887759 },
					{ income: { monthlyRent: 2540 }, purchasePrice: 254000, result: 1 },
					{ income: { monthlyRent: 0.0798 }, purchasePrice: 1.087, result: 7.341306348 },
					{ income: { monthlyRent: 129876.9023 }, purchasePrice: 1893749, result: 6.858189882 },
					{ income: { monthlyRent: -1257 }, purchasePrice: 120000, result: -1.0475 },
					{ income: { monthlyRent: -1899 }, purchasePrice: -252030, result: 0.753481728 },
					{ income: { monthlyRent: 1400 }, purchasePrice: -238742, result: -0.586407084 },
					{ income: { monthlyRent: null }, purchasePrice: 125003, result: 0 },
					{ income: { monthlyRent: null }, purchasePrice: null, result: 'N/A' },
					{ income: { monthlyRent: '' }, purchasePrice: undefined, result: 'N/A' },
				]
		});

		it('1% Calculations : ', function () {
			var onePercentRule;
			for (var i = 0; i < testData.length; i++) {
				onePercentRule = CalculationService.calculateOnePercentRule(testData[i]);
				if (isNaN(onePercentRule)) {
					expect(onePercentRule).toEqual(testData[i].result);
				}
				else {
					expect(onePercentRule).toBeCloseTo(testData[i].result);
				}
			}
		});
	});

	describe('Testing getVariableExpenseValues(): ', function () {
		var testData;
		beforeEach(function () {
			testData =
				[
					{ income: 1750, expenses: { vacancyPercentage: 5, repairsPercentage: 5, capExPercentage: 7, propertyManagementPercentage: 11 }, result: { vacancy: 87.5, repairs: 87.5, capEx: 122.5, propertyManagement: 192.5 } },
					{ income: 1283.37, expenses: { vacancyPercentage: 2.8, repairsPercentage: 3.9, capExPercentage: 4.025, propertyManagementPercentage: 18.71 }, result: { vacancy: 35.93436, repairs: 50.05143, capEx: 51.6556425, propertyManagement: 240.118527 } },
					{ income: 1200, expenses: { vacancyPercentage: 0, repairsPercentage: 0, capExPercentage: 2, propertyManagementPercentage: 1 }, result: { vacancy: 0, repairs: 0, capEx: 24, propertyManagement: 12 } },
					{ income: 0.0821, expenses: { vacancyPercentage: 0.1, repairsPercentage: 0.01, capExPercentage: 0.1287, propertyManagementPercentage: 0.09999 }, result: { vacancy: 0.0000821, repairs: 0.00000821, capEx: 0.000105663, propertyManagement: 0.00008209179 } },
					{ income: 0, expenses: { vacancyPercentage: 5, repairsPercentage: 5, capExPercentage: 7, propertyManagementPercentage: 11 }, result: { vacancy: 0, repairs: 0, capEx: 0, propertyManagement: 0 } },
					{ income: 1999999, expenses: { vacancyPercentage: 2, repairsPercentage: 3, capExPercentage: 4, propertyManagementPercentage: 5 }, result: { vacancy: 39999.98, repairs: 59999.97, capEx: 79999.96, propertyManagement: 99999.95 } },
					{ income: 1899, expenses: { vacancyPercentage: -5, repairsPercentage: -5, capExPercentage: -7, propertyManagementPercentage: -11 }, result: { vacancy: -94.95, repairs: -94.95, capEx: -132.93, propertyManagement: -208.89 } },
					{ income: 1500, expenses: { vacancyPercentage: 25, repairsPercentage: 25, capExPercentage: 25, propertyManagementPercentage: 25 }, result: { vacancy: 375, repairs: 375, capEx: 375, propertyManagement: 375 } },
					{ income: 1786, expenses: { vacancyPercentage: 0, repairsPercentage: 100, capExPercentage: 0, propertyManagementPercentage: 0 }, result: { vacancy: 0, repairs: 1786, capEx: 0, propertyManagement: 0 } },
					{ income: 2300, expenses: { vacancyPercentage: 20, repairsPercentage: 55.762, capExPercentage: 82, propertyManagementPercentage: 33.98 }, result: { vacancy: 460, repairs: 1282.526, capEx: 1886, propertyManagement: 781.54 } },
					{ income: null, expenses: { vacancyPercentage: 5, repairsPercentage: 5, capExPercentage: 7, propertyManagementPercentage: 11 }, result: { vacancy: 0, repairs: 0, capEx: 0, propertyManagement: 0 } },
					{ income: 1200, expenses: { vacancyPercentage: null, repairsPercentage: null, capExPercentage: null, propertyManagementPercentage: null }, result: { vacancy: 0, repairs: 0, capEx: 0, propertyManagement: 0 } },
					{ income: 1200, expenses: { vacancyPercentage: undefined, repairsPercentage: '', capExPercentage: 15, propertyManagementPercentage: null }, result: { vacancy: 0, repairs: 0, capEx: 180, propertyManagement: 0 } },
					{ income: '', expenses: { vacancyPercentage: undefined, repairsPercentage: '7', capExPercentage: 15, propertyManagementPercentage: null }, result: { vacancy: 0, repairs: 0, capEx: 0, propertyManagement: 0 } },
					{ income: '1899', expenses: { vacancyPercentage: 0, repairsPercentage: '7', capExPercentage: null, propertyManagementPercentage: 12 }, result: { vacancy: 0, repairs: 132.93, capEx: 0, propertyManagement: 227.88 } },
					
				]
		});

		it('Should get variable expense based on percentage of income amount ', function () {
			var variableExpenses = {};
			for (var i = 0; i < testData.length; i++) {
				variableExpenses = CalculationService.getVariableExpenseValues(testData[i].expenses, testData[i].income);
				expect(variableExpenses.vacancy).toBeCloseTo(testData[i].result.vacancy);
				expect(variableExpenses.repairs).toBeCloseTo(testData[i].result.repairs);
				expect(variableExpenses.capEx).toBeCloseTo(testData[i].result.capEx);
				expect(variableExpenses.propertyManagement).toBeCloseTo(testData[i].result.propertyManagement);
			}
		});
	});

	describe('Testing Discount Amount Calculation: ', function () {
		var testData;
		beforeEach(function () {
			testData =
				[
					{ purchasePrice: 289294, marketValue: 333291, result: 13.2007765 },
					{ purchasePrice: 333291, marketValue: 289294, result: -13.2007765 },
					{ purchasePrice: 0, marketValue: 125999, result: 100 },
					{ purchasePrice: 125999, marketValue: 0, result: 'N/A' },
					{ purchasePrice: 299999, marketValue: 299999, result: 0 },
					{ purchasePrice: 15000.98723, marketValue: 14500, result: -3.339695064 },
					{ purchasePrice: 0.902, marketValue: 0.02, result: -97.7827051 },
					{ purchasePrice: 981740242, marketValue: 1081740242, result: 9.244363491 },
					{ purchasePrice: 7, marketValue: 15, result: 53.33333333 },
					{ purchasePrice: -1200, marketValue: -1582, result: 31.83333333 },
					{ purchasePrice: -314023, marketValue: 98723, result: 418.0849447 },
					{ purchasePrice: 76323.92, marketValue: -800000, result: -1148.164193 },
					{ purchasePrice: 0, marketValue: 0, result: 'N/A' },
					{ purchasePrice: 100000, marketValue: null, result: 'N/A' },
					{ purchasePrice: null, marketValue: null, result: 'N/A' },
					{ purchasePrice: '', marketValue: undefined, result: 'N/A' },
					{ purchasePrice: 120000, marketValue: '', result: 'N/A' },
					{ purchasePrice: '', marketValue: 120000, result: 100 },
					{ purchasePrice: '', marketValue: 152759, result: 100 }
					
				]
		});

		it('Should get the purchase discount amount based on MV and purchase price ', function () {
			for (var i = 0; i < testData.length; i++) {
				if (testData[i].marketValue) {
					expect(CalculationService.calculateDiscountAmount(testData[i].purchasePrice, testData[i].marketValue)).toBeCloseTo(testData[i].result);
				}
				else {
					expect(CalculationService.calculateDiscountAmount(testData[i].purchasePrice, testData[i].marketValue)).toEqual(testData[i].result);
				}

			}
		});
	});
});