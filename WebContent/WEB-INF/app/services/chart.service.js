REIApp.service('ChartService', function () {

    this.getExpenseArray = function (mortgage, expenses, variableExpenses, income) {
        var expenseArr = 
        [
            { value: mortgage, label: 'Mortgage P&I' }, 
            { value: expenses.pmi, label: 'PMI' }, 
            { value: expenses.propertyTaxes, label: 'Property Taxes' }, 
            { value: expenses.monthlyInsurance, label: 'Insurance' }, 
            { value: expenses.hoaFees, label: 'HOA Fees' }, 
            { value: expenses.electricity, label: 'Electricity' }, 
            { value: expenses.garbage, label: 'Garbage' }, 
            { value: expenses.water, label: 'Water' },
            { value: expenses.otherExpenses, label: 'Other Expenses' },
            { value: variableExpenses.vacancy, label: 'Vacancy' },
            { value: variableExpenses.repairs, label: 'Repairs' },
            { value: variableExpenses.capEx, label: 'Cap Ex' },
            { value: variableExpenses.propertyManagement, label: 'Property Management' },
        ];

        return expenseArr;
    }

    this.getIncomeArray = function (income) {
        var incomeArr = [
            {value: income.monthlyRent, label: 'Monthly Rent'},
            {value: income.otherIncome, label: 'Other Income'}
        ]

        return incomeArr;
    }
    
    this.getPieChart = function (arr) {

        var pie = {};
        pie.data = [];
        pie.labels = [];

        for(var i = 0; i < arr.length; i++){
            if(arr[i].value > 0){
                pie.data.push(arr[i].value);
                pie.labels.push(arr[i].label);
            }
        }

        return pie;
    }

});