package com.sjaffee.reports.model;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class Loan {
	
	@Column(name="downpayment_percentage")
	private Double downpaymentPercentage;
	
	@Column(name="interest_rate")
	private Double interestRate;

	//	private Integer pointsCharged;
	
	@Column(name="other_charges")
	private Double otherCharges;
	
	@Column(name="loan_years")
	private Integer loanYears;
	
	public Double getDownpaymentPercentage() {
		return downpaymentPercentage;
	}
	
	public void setDownpaymentPercentage(Double downpaymentPercentage) {
		this.downpaymentPercentage = downpaymentPercentage;
	}
	
	public Double getInterestRate() {
		return interestRate;
	}
	
	public void setInterestRate(Double interestRate) {
		this.interestRate = interestRate;
	}

//	public Integer getPointsCharged() {
//		return pointsCharged;
//	}
//
//	public void setPointsCharged(Integer pointsCharged) {
//		this.pointsCharged = pointsCharged;
//	}

	public Double getOtherCharges() {
		return otherCharges;
	}

	public void setOtherCharges(Double otherCharges) {
		this.otherCharges = otherCharges;
	}

	public Integer getLoanYears() {
		return loanYears;
	}

	public void setLoanYears(Integer loanYears) {
		this.loanYears = loanYears;
	}
	
	@Override
	public String toString() {
		return "LoanDetails [downpaymentPercentage=" + downpaymentPercentage + ", interestRate=" + interestRate
				+ ", otherCharges=" + otherCharges + ", loanYears=" + loanYears
				+ "]";
	}
	
	
}
