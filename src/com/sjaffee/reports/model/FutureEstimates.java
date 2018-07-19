package com.sjaffee.reports.model;

import javax.persistence.Embeddable;

@Embeddable
public class FutureEstimates {

	private Integer annualIncomeGrowth;
	private Integer annualPVGrowth;
	private Integer annualExpenseGrowth;
	private Integer salesExpenses;
	
	public Integer getAnnualIncomeGrowth() {
		return annualIncomeGrowth;
	}
	
	public void setAnnualIncomeGrowth(Integer annualIncomeGrowth) {
		this.annualIncomeGrowth = annualIncomeGrowth;
	}
	
	public Integer getAnnualPVGrowth() {
		return annualPVGrowth;
	}
	
	public void setAnnualPVGrowth(Integer annualPVGrowth) {
		this.annualPVGrowth = annualPVGrowth;
	}
	
	public Integer getAnnualExpenseGrowth() {
		return annualExpenseGrowth;
	}
	
	public void setAnnualExpenseGrowth(Integer annualExpenseGrowth) {
		this.annualExpenseGrowth = annualExpenseGrowth;
	}
	
	public Integer getSalesExpenses() {
		return salesExpenses;
	}
	
	public void setSalesExpenses(Integer salesExpenses) {
		this.salesExpenses = salesExpenses;
	}
	
	@Override
	public String toString() {
		return "FutureEstimates [annualIncomeGrowth=" + annualIncomeGrowth + ", annualPVGrowth=" + annualPVGrowth
				+ ", annualExpenseGrowth=" + annualExpenseGrowth + ", salesExpenses=" + salesExpenses + "]";
	}
}
