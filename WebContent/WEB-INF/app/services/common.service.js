REIApp.service('CommonService', function () {

	this.parseCurrencyInput = function (field, keepDecimals) {
		field = this.parseOutCommas(field);
		return this.round(field, keepDecimals);
	}

	this.parsePercentageInput = function (field, keepDecimals) {
		field = this.parseOutCommas(field);
		field = this.parseOutPercentage(field);
		return this.round(field, keepDecimals);
	}

	this.round = function (field, keepDecimals) {
		if (keepDecimals) {
			field = this.roundToTwoDecimals(field);
		}
		else {
			field = this.roundToWholeNumber(field);
		}
		return field;
	}

	this.roundToWholeNumber = function (field) {
		//round only if its not blank and is a number
		if (field && !isNaN(field)) {
			field = Math.round(field);
		}
		else {
			return null;
		}

		return field;
	}

	this.roundToTwoDecimals = function (field) {
		//round only if its not blank and is a number
		if (field && !isNaN(field)) {
			field = Math.round(field * 100) / 100;
		}
		else {
			return null;
		}

		return field;
	}

	this.parseOutCommas = function (field) {
		//field.replace does not work with numbers
		//when using comma's, it techincally becomes a string. So we check isNaN before replacing
		if (field && isNaN(field)) {
			field = field.replace(/,/g, '');
		}
		return field;
	}

	this.parseOutPercentage = function (field) {
		if (field && isNaN(field)) {
			field = field.replace(/%/g, '');
		}
		return field;
	}

	this.setNullToZero = function (field) {
		if (!field) {
			field = 0;
		}
		return field;
	}

	this.percentageToDecimal = function (percentage) {
		if (percentage && !isNaN(percentage)) {
			return percentage / 100;
		}
		return 0;
	}

	this.decimalToPercentage = function (percentage) {
		if (percentage && !isNaN(percentage)) {
			return percentage * 100;
		}
		return 0;
	}

	this.getPercentageOfValue = function (percentage, value) {
		return this.multiply(value,this.percentageToDecimal(percentage));
	}

	this.annualToMonthlyValue = function (amount) {
		return this.divide(amount,12);
	}

	this.monthlyToAnnualValue = function (amount) {
		return this.multiply(amount,12);
	}

	//ADD UNIT TESTS FOR THE FOLLOWING

	this.convertToMonthlyInterestRate = function (interest) {
        var interestRate = this.percentageToDecimal(interest);
        return this.annualToMonthlyValue(interestRate);
	}

	this.sum = function (x, y) {
		return this.setNullToZero(x) + this.setNullToZero(y);
	}

	this.sumArray = function (arr) {
		var val = 0;
		
		for(var i = 0; i < arr.length; i++) {
			val += this.setNullToZero(arr[i]);
		}
		return val;
	}

	this.difference = function (x, y) {
		return this.setNullToZero(x) - this.setNullToZero(y);
	}

	this.multiply = function (x, y) {
		return this.setNullToZero(x) * this.setNullToZero(y);
	}

	this.divide = function (x, y) {
		var numerator = this.setNullToZero(x);
		var denominator = this.setNullToZero(y);
		if(numerator == 0 && denominator == 0){
			return 0;
		}
		return numerator / denominator;
	}


});