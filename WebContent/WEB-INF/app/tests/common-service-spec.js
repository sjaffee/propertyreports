
describe('CommonService - ', function () {
	var CommonService;
	beforeEach(function () {
		//mock all of ciscorests dependencies
		angular.module('ngResource', []);
		angular.module('ngMessages', []);
		angular.module('kendo.directives', []);
		angular.module('ngIdle', []);
		angular.module('chart.js', []);
		//load analysis module
		module('analysis');

		//get CommonService service
		inject(function (_CommonService_) {
			CommonService = _CommonService_;
		});
	});

	describe('Rounding Invalid Data: ', function () {
		var invalidData; var testData;
		beforeEach(function () {
			invalidData = [null, undefined, '', 'word with spaces', '1,000.00', '4.75%'];
		});

		it(' roundToWholeNumber() Non-numeric should be set to null', function () {
			for (var i = 0; i < invalidData.length; i++) {
				expect(CommonService.roundToWholeNumber(invalidData[i])).toBeNull();
			}
		});

		it(' roundToTwoDecimals() Non-numeric should be set to null', function () {
			for (var i = 0; i < invalidData.length; i++) {
				expect(CommonService.roundToTwoDecimals(invalidData[i])).toBeNull();
			}
		});
	});

	//Tests roundToWholeNumber(), roundToTwoDecimals and round()
	describe('Rounding Numeric Data: ', function () {
		var testData;
		beforeEach(function () {
			testData =
				[
					{ input: 100.98, twoDecimalResult: 100.98, wholeNumberResult: 101 },
					{ input: 89345.44903442, twoDecimalResult: 89345.45, wholeNumberResult: 89345 },
					{ input: 89345.490234, twoDecimalResult: 89345.49, wholeNumberResult: 89345 },
					{ input: 89345.504923, twoDecimalResult: 89345.50, wholeNumberResult: 89346 },
					{ input: 99999.9, twoDecimalResult: 99999.9, wholeNumberResult: 100000 },
					{ input: 99999.99, twoDecimalResult: 99999.99, wholeNumberResult: 100000 },
					{ input: 99999.999, twoDecimalResult: 100000, wholeNumberResult: 100000 },
					{ input: 0.115, twoDecimalResult: 0.12, wholeNumberResult: 0 },
					{ input: 10000000000000.9956, twoDecimalResult: 10000000000001, wholeNumberResult: 10000000000001 },
					{ input: '100000.00', twoDecimalResult: 100000, wholeNumberResult: 100000 },
					{ input: '702932.999342313', twoDecimalResult: 702933, wholeNumberResult: 702933 },
					{ input: -786.5421, twoDecimalResult: -786.54, wholeNumberResult: -787 },
					{ input: -20872.4790, twoDecimalResult: -20872.48, wholeNumberResult: -20872 },
				];
		});

		//roundToWholeNumber()
		it('Anything numeric should be rounded to whole number', function () {
			for (var i = 0; i < testData.length; i++) {
				expect(CommonService.roundToWholeNumber(testData[i].input)).toEqual(testData[i].wholeNumberResult);
			}
		});

		//roundToTwoDecimals
		it('Anything numeric should be rounded to 2 decimal places', function () {
			for (var i = 0; i < testData.length; i++) {
				expect(CommonService.roundToTwoDecimals(testData[i].input)).toEqual(testData[i].twoDecimalResult);
			}
		});

		//round()
		it('Should round to whole number when flag == false', function () {
			for (var i = 0; i < testData.length; i++) {
				expect(CommonService.round(testData[i].input), false).toEqual(testData[i].wholeNumberResult);
			}
		});

		it('Should round to 2 decimal places when flag == true', function () {
			for (var i = 0; i < testData.length; i++) {
				expect(CommonService.round(testData[i].input, true)).toEqual(testData[i].twoDecimalResult);
			}
		});
	});

	//tests parseOutCommas
	it('Value should be left alone if no commas exist', function () {
		expect(CommonService.parseOutCommas(null)).toBeNull();
		expect(CommonService.parseOutCommas(undefined)).toEqual(undefined);
		expect(CommonService.parseOutCommas('')).toEqual('');
		expect(CommonService.parseOutCommas('        ')).toEqual('        ');
		expect(CommonService.parseOutCommas('Periods. Semi-colons; and no commas')).toEqual('Periods. Semi-colons; and no commas');
		expect(CommonService.parseOutCommas('!@#$%^&*()_+?><./')).not.toEqual('!@#$%^&*{}[]()_+?><./');
		expect(CommonService.parseOutCommas(23498234.00)).toEqual(23498234.00);
		expect(CommonService.parseOutPercentage(-72.999882)).toEqual(-72.999882);
		expect(CommonService.parseOutPercentage(-982342.00001)).toEqual(-982342.00001);
		expect(CommonService.parseOutCommas('23498234.00')).toEqual('23498234.00');
		expect(CommonService.parseOutCommas('75%')).toEqual('75%');
	});
	it('Should parse out all commas', function () {
		expect(CommonService.parseOutCommas('1,987')).toEqual('1987');
		expect(CommonService.parseOutCommas('100,000,000.98934')).toEqual('100000000.98934');
		expect(CommonService.parseOutCommas(',345,642,')).toEqual('345642');
		expect(CommonService.parseOutCommas('100,,000')).toEqual('100000');
		expect(CommonService.parseOutCommas('8934.34,345')).toEqual('8934.34345');
		expect(CommonService.parseOutCommas('-729,028.92')).toEqual('-729028.92');
		expect(CommonService.parseOutCommas('-5.7923')).toEqual('-5.7923');
		expect(CommonService.parseOutCommas(',,,,,,,,')).toEqual('');
		expect(CommonService.parseOutCommas('hey, check this out')).toEqual('hey check this out');
		expect(CommonService.parseOutCommas('@#$%,<>.,342345dfg#$%')).toEqual('@#$%<>.342345dfg#$%');
	});

	//tests parseOutPercentage
	it('Value should be left alone if no percent symbol exist', function () {
		expect(CommonService.parseOutPercentage(null)).toBeNull();
		expect(CommonService.parseOutPercentage(undefined)).toEqual(undefined);
		expect(CommonService.parseOutPercentage('')).toEqual('');
		expect(CommonService.parseOutPercentage('        ')).toEqual('        ');
		expect(CommonService.parseOutPercentage(75)).toEqual(75);
		expect(CommonService.parseOutPercentage(4.87)).toEqual(4.87);
		expect(CommonService.parseOutPercentage(-72.999882)).toEqual(-72.999882);
		expect(CommonService.parseOutPercentage(-982342.00001)).toEqual(-982342.00001);
		expect(CommonService.parseOutPercentage('1,000,000.09345')).toEqual('1,000,000.09345');
		expect(CommonService.parseOutPercentage('Periods. Semi-colons; Commas, No percents')).toEqual('Periods. Semi-colons; Commas, No percents');
		expect(CommonService.parseOutPercentage('!@#$,^&*()_+?><./')).toEqual('!@#$,^&*()_+?><./');
	});
	it('Should parse out all percent signs', function () {
		expect(CommonService.parseOutPercentage('4.75%')).toEqual('4.75');
		expect(CommonService.parseOutPercentage('1,293.8923%')).toEqual('1,293.8923');
		expect(CommonService.parseOutPercentage('%345%642%')).toEqual('345642');
		expect(CommonService.parseOutPercentage('100%%000')).toEqual('100000');
		expect(CommonService.parseOutPercentage('8934.34%345')).toEqual('8934.34345');
		expect(CommonService.parseOutPercentage('-4.75%')).toEqual('-4.75');
		expect(CommonService.parseOutPercentage('-17.88%')).toEqual('-17.88');
		expect(CommonService.parseOutPercentage('%%%%%%%%')).toEqual('');
		expect(CommonService.parseOutPercentage('hey% check this out')).toEqual('hey check this out');
		expect(CommonService.parseOutPercentage('@#$%,<>.%342345dfg#$%')).toEqual('@#$,<>.342345dfg#$');
	});

	//Tests setNullToZero() function
	it('Should set any null, empty or undefined value to 0', function () {
		expect(CommonService.setNullToZero(null)).toEqual(0);
		expect(CommonService.setNullToZero(undefined)).toEqual(0);
		expect(CommonService.setNullToZero('')).toEqual(0);
	});
	it('Should leave non null/empty values alone', function () {
		expect(CommonService.setNullToZero(273)).toEqual(273);
		expect(CommonService.setNullToZero(-98123)).toEqual(-98123);
		expect(CommonService.setNullToZero('words with spaces')).toEqual('words with spaces');
		expect(CommonService.setNullToZero('$#$%: @#$ +_)(&')).toEqual('$#$%: @#$ +_)(&');
		expect(CommonService.setNullToZero('89342')).toEqual('89342');
		expect(CommonService.setNullToZero(00000)).toEqual(00000);
		expect(CommonService.setNullToZero(0)).toEqual(0);
		expect(CommonService.setNullToZero(-9999)).toEqual(-9999);
		expect(CommonService.setNullToZero(-4.72)).toEqual(-4.72);
	});

	//Tests parseCurrencyInput()
	describe('Parsing currency with invalid input: ', function () {
		var invalidData;
		beforeEach(function () {
			invalidData = [null, undefined, '', 'asdfas', 'a', '10x10', '123abc456', 'using setences', '@#$%&^&*()><?', 'lett,ers.00'];
		});

		it('flag == true', function () {
			for (var i = 0; i < invalidData.length; i++) {
				expect(CommonService.parseCurrencyInput(invalidData[i], true)).toBeNull();
			}
		});

		it('flag == false', function () {
			for (var i = 0; i < invalidData.length; i++) {
				expect(CommonService.parseCurrencyInput(invalidData[i], false)).toBeNull();
			}
		});
	});

	//Tests parseCurrencyInput()
	describe('Value should be left alone if numeric with no commas or decimals : ', function () {
		var testIntData; var testStringData;
		beforeEach(function () {
			testIntData = [1, 100, 298345, 72749123478234, 999999999, -12, -47832000];
			testStringData = ['0', '0000000', '123', '0343523'];
		});

		it('flag == true', function () {
			for (var i = 0; i < testIntData.length; i++) {
				expect(CommonService.parseCurrencyInput(testIntData[i], true)).toEqual(testIntData[i]);
			}
			for (var i = 0; i < testStringData.length; i++) {
				expect(CommonService.parseCurrencyInput(testStringData[i], true)).toEqual(parseInt(testStringData[i]));
			}

		});

		it('flag == false', function () {
			for (var i = 0; i < testIntData.length; i++) {
				expect(CommonService.parseCurrencyInput(testIntData[i], false)).toEqual(testIntData[i]);
			}
			for (var i = 0; i < testStringData.length; i++) {
				expect(CommonService.parseCurrencyInput(testStringData[i], false)).toEqual(parseInt(testStringData[i]));
			}
		});
	});

	//Tests parseCurrencyInput()
	describe('Should round to 2 decimal places and remove commas : ', function () {
		var testData;
		beforeEach(function () {
			testData =
				[
					{ input: '1,000,000.00', twoDecimalResult: 1000000, wholeNumberResult: 1000000 },
					{ input: '9,923.3492345', twoDecimalResult: 9923.35, wholeNumberResult: 9923 },
					{ input: 70340345.903452, twoDecimalResult: 70340345.90, wholeNumberResult: 70340346 },
					{ input: '.97242', twoDecimalResult: 0.97, wholeNumberResult: 1 },
					{ input: ',.,9,7,2,4,2,', twoDecimalResult: 0.97, wholeNumberResult: 1 },
					{ input: '1,0000,00.90', twoDecimalResult: 1000000.9, wholeNumberResult: 1000001 },
					{ input: '000,000,000.000000', twoDecimalResult: 0, wholeNumberResult: 0 },
					{ input: 9.999, twoDecimalResult: 10, wholeNumberResult: 10 },
					{ input: -9.999, twoDecimalResult: -10, wholeNumberResult: -10 },
					{ input: -82.98629000, twoDecimalResult: -82.99, wholeNumberResult: -83 }
				]
		});

		it('flag == true', function () {
			for (var i = 0; i < testData.length; i++) {
				expect(CommonService.parseCurrencyInput(testData[i].input, true)).toEqual(testData[i].twoDecimalResult);
			}
		});
		it('flag == false', function () {
			for (var i = 0; i < testData.length; i++) {
				expect(CommonService.parseCurrencyInput(testData[i].input, false)).toEqual(testData[i].wholeNumberResult);
			}
		});
	});

	//Tests parsePercentageInput()
	describe('Parsing percentage with invalid input: ', function () {
		var invalidData;
		beforeEach(function () {
			invalidData = [null, undefined, '', 'asdfas', 'a', '10x10', '123abc456', 'using setences', '@#$%&^&*()><?', 'lett,ers.00'];
		});

		it('Value should be set to null if NaN w/ flag == true', function () {
			for (var i = 0; i < invalidData.length; i++) {
				expect(CommonService.parsePercentageInput(invalidData[i], true)).toBeNull();
			}
		});
		it('Value should be set to null if NaN w/ flag == false', function () {
			for (var i = 0; i < invalidData.length; i++) {
				expect(CommonService.parsePercentageInput(invalidData[i], false)).toBeNull();
			}
		});
	});

	//Tests parsePercentageInput()
	describe('Value should be left alone if numeric with no percent signs, commas or decimals : ', function () {
		var testIntData; var testStringData;
		beforeEach(function () {
			testIntData = [1, 100, 298345, 72749123478234, 999999999, -12, -47832000];
			testStringData = ['0', '0000000', '123', '0343523'];
		});

		it('flag == true', function () {
			for (var i = 0; i < testIntData.length; i++) {
				expect(CommonService.parsePercentageInput(testIntData[i], true)).toEqual(testIntData[i]);
			}
			for (var i = 0; i < testStringData.length; i++) {
				expect(CommonService.parsePercentageInput(testStringData[i], true)).toEqual(parseInt(testStringData[i]));
			}

		});

		it('flag == false', function () {
			for (var i = 0; i < testIntData.length; i++) {
				expect(CommonService.parsePercentageInput(testIntData[i], false)).toEqual(testIntData[i]);
			}
			for (var i = 0; i < testStringData.length; i++) {
				expect(CommonService.parsePercentageInput(testStringData[i], false)).toEqual(parseInt(testStringData[i]));
			}
		});
	});

	//Tests parsePercentageInput()
	describe('Should round to 2 decimal places and remove percent signs and commas : ', function () {

		var testIntData;
		beforeEach(function () {
			testData =
				[
					{ input: '1,000,000.00%', twoDecimalResult: 1000000, wholeNumberResult: 1000000 },
					{ input: '9,923.3492345%', twoDecimalResult: 9923.35, wholeNumberResult: 9923 },
					{ input: 70340345.903452, twoDecimalResult: 70340345.90, wholeNumberResult: 70340346 },
					{ input: '.97242%', twoDecimalResult: 0.97, wholeNumberResult: 1 },
					{ input: ',.,9%,7,2%,4,2%,', twoDecimalResult: 0.97, wholeNumberResult: 1 },
					{ input: '%1,0000,00.90%', twoDecimalResult: 1000000.9, wholeNumberResult: 1000001 },
					{ input: '000,000,000.%%000000', twoDecimalResult: 0, wholeNumberResult: 0 },
					{ input: 9.999, twoDecimalResult: 10, wholeNumberResult: 10 },
					{ input: -9.999, twoDecimalResult: -10, wholeNumberResult: -10 },
					{ input: -82.98629000, twoDecimalResult: -82.99, wholeNumberResult: -83 },
				]
		});
		it('flag == true', function () {
			for (var i = 0; i < testData.length; i++) {
				expect(CommonService.parsePercentageInput(testData[i].input, true)).toEqual(testData[i].twoDecimalResult);
			}
		});
		it('flag == false', function () {
			for (var i = 0; i < testData.length; i++) {
				expect(CommonService.parsePercentageInput(testData[i].input, false)).toEqual(testData[i].wholeNumberResult);
			}
		});
	});

	//Tests percentageToDecimal() and decimalToPercentage()
	describe('Converting percentage to decimal and decimal to percentage', function () {
		var invalidData; var testData;
		beforeEach(function () {
			invalidData = [null, undefined, '', '    ', 'randomstring', 'word with spaces', '@#$%#&#$!*()?<>'];
			testData = [
				{ percentage: 20, decimal: 0.20 },
				{ percentage: 4.75, decimal: 0.0475 },
				{ percentage: 0.01, decimal: 0.0001 },
				{ percentage: 17.5, decimal: 0.175 },
				{ percentage: 9874.59823, decimal: 98.7459823 },
				{ percentage: -23, decimal: -0.23 },
				{ percentage: -4.89023, decimal: -0.0489023 },
				{ percentage: -702804.5, decimal: -7028.045 },
				{ percentage: '00000083.083424', decimal: 0.83083424 },
				{ percentage: '5.08', decimal: 0.0508 },
			];
		});

		//Test percentageToDecimal()
		it('percentageToDecimal: Result should be 0 if typing in invalid characters', function () {
			for (var i = 0; i < invalidData.length; i++) {
				expect(CommonService.percentageToDecimal(invalidData[i])).toEqual(0);
			}
		});
		it('Convert from percent whole number representation to decimal representation', function () {
			for (var i = 0; i < testData.length; i++) {
				expect(CommonService.percentageToDecimal(testData[i].percentage)).toBeCloseTo(testData[i].decimal);
			}
		});

		//test decimalToPercentage()
		it('decimalToPercentage: Result should be 0 if typing in invalid characters', function () {
			for (var i = 0; i < invalidData.length; i++) {
				expect(CommonService.decimalToPercentage(invalidData[i])).toEqual(0);
			}
		});

		it('Convert from decimal representation to percent wholenumbers representation', function () {
			for (var i = 0; i < testData.length; i++) {
				expect(CommonService.decimalToPercentage(testData[i].decimal)).toBeCloseTo(testData[i].percentage);
			}
		});
	});

	//Test getPercentageOfValue()
	it('Should get the percentage given of the value supplied', function () {
		expect(CommonService.getPercentageOfValue(5, 1000)).toEqual(50);
		expect(CommonService.getPercentageOfValue(5, 18323.098342)).toBeCloseTo(916.1549171, 7);
		expect(CommonService.getPercentageOfValue(5, 99999238123.0234)).toBeCloseTo(4999961906.15117, 5);
		expect(CommonService.getPercentageOfValue(7, 1800)).toBeCloseTo(126, 0);
		expect(CommonService.getPercentageOfValue(7, 2250)).toBeCloseTo(157.5, 1);
		expect(CommonService.getPercentageOfValue(7, 9273.281237)).toBeCloseTo(649.12968659, 8);
		expect(CommonService.getPercentageOfValue(10, 1250)).toBeCloseTo(125, 0);
		expect(CommonService.getPercentageOfValue(10, 13082.0482)).toBeCloseTo(1308.20482, 5);
		expect(CommonService.getPercentageOfValue(11, 99999999)).toBeCloseTo(10999999.89, 2);
		expect(CommonService.getPercentageOfValue(11, 1200.000000182)).toBeCloseTo(132.00000002002, 11);
		expect(CommonService.getPercentageOfValue(125, 1400)).toBeCloseTo(1750, 0);
		expect(CommonService.getPercentageOfValue(100, 1276)).toBeCloseTo(1276, 0);
		expect(CommonService.getPercentageOfValue(20, 1899)).toBeCloseTo(379.8, 1);
		expect(CommonService.getPercentageOfValue(25, 1987.99)).toBeCloseTo(496.9975, 4);
		expect(CommonService.getPercentageOfValue(4.75023, 1578.897342)).toBeCloseTo(75.0012552088866, 13);
		expect(CommonService.getPercentageOfValue(9.02381, 9.02381)).toBeCloseTo(0.814291469161, 12);
		expect(CommonService.getPercentageOfValue(55.2382, 1200)).toBeCloseTo(662.8584, 4);
		expect(CommonService.getPercentageOfValue(22.2, 2000)).toBeCloseTo(444, 0);
		expect(CommonService.getPercentageOfValue(null, 1700)).toBeCloseTo(0);
		expect(CommonService.getPercentageOfValue(undefined, 1700)).toBeCloseTo(0);
		expect(CommonService.getPercentageOfValue('', 1700)).toBeCloseTo(0);
		expect(CommonService.getPercentageOfValue(5, null)).toBeCloseTo(0);
		expect(CommonService.getPercentageOfValue(7, undefined)).toBeCloseTo(0);
		expect(CommonService.getPercentageOfValue(11, '')).toBeCloseTo(0);
	});

	//Test annualToMonthlyValue() and monthlyToAnnualValue()
	describe('Converting annual to monthly and monthly to annual', function () {
		var amountDataSet;
		beforeEach(function () {
			amountDataSet =
				[
					{ annual: 2025, monthly: 168.75 },
					{ annual: 5712, monthly: 476 },
					{ annual: 12787, monthly: 1065.583333333333 },
					{ annual: 99239234232, monthly: 8269936186 },
					{ annual: 23, monthly: 1.91666666666667 },
					{ annual: 1, monthly: 0.0833333333333333 },
					{ annual: 1872.8723023, monthly: 156.072691858333 },
					{ annual: 20.5902391, monthly: 1.71585325833333 },
					{ annual: 550023.09283, monthly: 45835.2577358333 },
					{ annual: -5712, monthly: -476 },
					{ annual: -322, monthly: -26.8333333333333 },
					{ annual: -129082, monthly: -10756.8333333333 },
					{ annual: -1792.602304, monthly: -149.383525333333 },
					{ annual: 1000.00000000, monthly: 83.3333333333333 },
					{ annual: '2475.00', monthly: 206.25 },
					{ annual: '5287.98', monthly: 440.665 },
				];
		});

		//Test annualToMonthlyValue()
		it('Convert from annual amount to monthly amount', function () {

			for (var i = 0; i < amountDataSet.length; i++) {
				expect(CommonService.annualToMonthlyValue(amountDataSet[i].annual)).toBeCloseTo(amountDataSet[i].monthly);
			}
		});

		//Test monthlyToAnnualValue()
		it('Convert from monthly amount to annual amount', function () {

			for (var i = 0; i < amountDataSet.length; i++) {
				expect(CommonService.monthlyToAnnualValue(amountDataSet[i].monthly)).toBeCloseTo(amountDataSet[i].annual);
			}
		});
	});

	describe('Converting Invalid Data: ', function () {
		var invalidData;
		beforeEach(function () {
			invalidData = [null, undefined, ''];
		});

		it(' annualToMonthlyValue() ', function () {
			for (var i = 0; i < invalidData.length; i++) {
				expect(CommonService.annualToMonthlyValue(invalidData[i])).toEqual(0);
			}
		});

		it(' monthlyToAnnualValue() ', function () {
			for (var i = 0; i < invalidData.length; i++) {
				expect(CommonService.monthlyToAnnualValue(invalidData[i])).toEqual(0);
			}
		});
	});

	describe('Test arithmitic functions', function () {
		var testData;
		beforeEach(function () {
			testData =
			[
				{x: 120, y: 52, sum: 172, diff: 68, divide: 2.30769230769231, multiply: 6240},
				{x: 52, y: 120, sum: 172, diff: -68, divide: 0.433333333333333, multiply: 6240},
				{x: 1287.32, y: 1503.98273, sum: 2791.30273, diff: -216.66273, divide: 0.85594068, multiply: 1936107.048},
				{x: 0.00001, y: 0.000092834, sum: 0.000102834, diff: -0.000082834, divide: 0.107719155, multiply: 0.00000000092834},
				{x: -999999999, y: -975924511.90034, sum: -1975924510.90034, diff: -24075487.09966, divide: 1.02466941531449, multiply: 975924510924415500},
				{x: -83456.02, y: -782, sum: -84238.02, diff: -82674.02, divide: 106.7212532, multiply: 65262607.64},
				{x: -10.02, y: 34.092, sum: 24.072, diff: -44.112, divide: -0.293910595, multiply: -341.60184},
				{x: 34.092, y: -10.02, sum: 24.072, diff: 44.112, divide: -3.40239521, multiply: -341.60184},
				{x: 0, y: 0, sum: 0, diff: 0, divide: 0, multiply: 0},
				{x: 1899, y: 0, sum: 1899, diff: 1899, divide: Infinity, multiply: 0},
				{x: 0, y: 8734.924, sum: 8734.924, diff: -8734.924, divide: 0, multiply: 0},
				{x: 709238.9023, y: 709238.9023, sum: 1418477.8046, diff: 0, divide: 1, multiply: 503019820535.709},
				{x: null, y: 1200, sum: 1200, diff: -1200, divide: 0, multiply: 0},
				{x: null, y: null, sum: 0, diff: 0, divide: 0, multiply: 0},
				{x: 1200, y: null, sum: 1200, diff: 1200, divide: Infinity, multiply: 0},
				{x: undefined, y: 1200, sum: 1200, diff: -1200, divide: 0, multiply: 0},
				{x: null, y: undefined, sum: 0, diff: 0, divide: 0, multiply: 0},
				{x: 1200, y: undefined, sum: 1200, diff: 1200, divide: Infinity, multiply: 0},
				{x: 1200, y: '', sum: 1200, diff: 1200, divide: Infinity, multiply: 0},
				{x: '', y: '', sum: 0, diff: 0, divide: 0, multiply: 0},
				{x: '', y: null, sum: 0, diff: 0, divide: 0, multiply: 0},
				{x: null, y: '', sum: 0, diff: 0, divide: 0, multiply: 0},
				{x: '', y: 9999, sum: 9999, diff: -9999, divide: 0, multiply: 0}
			]
		});

		it('Should multiply, divide, sum and get difference of each pair ', function () {
			var dividend;
			for (var i = 0; i < testData.length; i++) {
				expect(CommonService.sum(testData[i].x, testData[i].y)).toBeCloseTo(testData[i].sum);
				expect(CommonService.difference(testData[i].x, testData[i].y)).toBeCloseTo(testData[i].diff);
				expect(CommonService.multiply(testData[i].x, testData[i].y)).toBeCloseTo(testData[i].multiply,2);
				dividend = CommonService.divide(testData[i].x, testData[i].y);
				if(isNaN(dividend) || dividend == Infinity){
					expect(dividend).toEqual(testData[i].divide);
				}
				else{
					expect(dividend).toBeCloseTo(testData[i].divide);
				}
				
			}
		});

		describe('Test sumArray() ', function () {
			var testData;
			beforeEach(function () {
				testData =
				[
					{ data: [124,982,999999,231], result: 1001336},
					{ data: [23,82.234,0.00092,-8723.823,0,99,1542125,98,-1209823], result: 323880.41192},
					{ data: [18.9871], result: 18.9871},
					{ data: [], result: 0},
					{ data: [0.0029,0.0000918,0.256,0.999,0,0.098231], result: 1.3562228},
					{ data: [-1576,-92.983,-0.0982], result: -1669.0812},
					{ data: [0,0,0,0], result: 0},
					{ data: [null,undefined,''], result: 0},
					{ data: [null,17.8,'',11,-2,undefined], result: 26.8},
					{ data: ['','',''], result: 0},
					{ data: [null], result: 0},
				];
			});

			it('Should sum an array of values ', function () {
				for(var i = 0; i < testData.length; i++){
					expect(CommonService.sumArray(testData[i].data)).toBeCloseTo(testData[i].result);
				}
			});
		});

		describe('Test conversion: ', function () {
			var testData;
			beforeEach(function () {
				testData =
				[
					{rate: 5, result: 0.004166667},
					{rate: 4.473, result: 0.0037275},
					{rate: 9.8097, result: 0.00817475},
					{rate: 0.098321, result: 0.0000819341666666667},
					{rate: 100, result: 0.0833333333333333},
					{rate: 1235.8921, result: 1.029910083},
					{rate: -8.734, result: -0.007278333},
					{rate: 29.77, result: 0.024808333},
					{rate: null, result: 0},
					{rate: '', result: 0},
					{rate: undefined, result: 0},
					{rate: 0, result: 0},
					{rate: 0.00, result: 0}
					
				];
			});

			it('Should convert from annual to monthly interest rate', function () {
				for(var i = 0; i < testData.length; i++){
					expect(CommonService.convertToMonthlyInterestRate(testData[i].rate)).toBeCloseTo(testData[i].result,4);
				}
			});
		});
	});


});