package com.sjaffee.reports.model;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class Income {
	
	@Column(name="monthly_rent")
	private Double monthlyRent;
	
	@Column(name="other_income")
	private Double otherIncome;
	
	public Double getMonthlyRent() {
		return monthlyRent;
	}
	public void setMonthlyRent(Double monthlyRent) {
		this.monthlyRent = monthlyRent;
	}
	
	public Double getOtherIncome() {
		return otherIncome;
	}
	
	public void setOtherIncome(Double otherIncome) {
		this.otherIncome = otherIncome;
	}

	public Double getTotalIncome(){
		return monthlyRent + otherIncome;
	}
	
	@Override
	public String toString() {
		return "Income [monthlyRent=" + monthlyRent + ", otherIncome=" + otherIncome + "]";
	}
	
	
}
