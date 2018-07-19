package com.sjaffee.reports.model;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class Expenses {
	
	@Column(name="pmi")
	private Double pmi;
	
	@Column(name="property_taxes")
	private Double propertyTaxes;
	
	@Column(name="monthly_insurance")
	private Double monthlyInsurance;
	
	@Column(name="hoa_fees")
	private Double hoaFees;
	
	@Column(name="electricity")
	private Double electricity;
	
	@Column(name="garbage")
	private Double garbage;
	
	@Column(name="water")
	private Double water;
	
	@Column(name="other_expenses")
	private Double otherExpenses;
	
	@Column(name="vacancy_percentage")
	private Integer vacancyPercentage;
	
	@Column(name="repairs_percentage")
	private Integer repairsPercentage;
	
	@Column(name="cap_ex_percentage")
	private Integer capExPercentage;
	
	@Column(name="property_management_percentage")
	private Integer propertyManagementPercentage;

	public Double getPmi() {
		return pmi;
	}
	
	public void setPmi(Double pmi) {
		this.pmi = pmi;
	}
	
	public Double getPropertyTaxes() {
		return propertyTaxes;
	}
	
	public void setPropertyTaxes(Double propertyTaxes) {
		this.propertyTaxes = propertyTaxes;
	}
	
	public Double getMonthlyInsurance() {
		return monthlyInsurance;
	}
	
	public void setMonthlyInsurance(Double monthlyInsurance) {
		this.monthlyInsurance = monthlyInsurance;
	}
	
	public Double getHoaFees() {
		return hoaFees;
	}
	
	public void setHoaFees(Double hoaFees) {
		this.hoaFees = hoaFees;
	}
	
	public Double getElectricity() {
		return electricity;
	}
	
	public void setElectricity(Double electricity) {
		this.electricity = electricity;
	}
	
	public Double getGarbage() {
		return garbage;
	}
	
	public void setGarbage(Double garbage) {
		this.garbage = garbage;
	}
	
	public Double getWater() {
		return water;
	}
	
	public void setWater(Double water) {
		this.water = water;
	}
	
	public Double getOtherExpenses() {
		return otherExpenses;
	}
	
	public void setOtherExpenses(Double otherExpenses) {
		this.otherExpenses = otherExpenses;
	}
	
	public Integer getVacancyPercentage() {
		return vacancyPercentage;
	}

	public void setVacancyPercentage(Integer vacancyPercentage) {
		this.vacancyPercentage = vacancyPercentage;
	}

	public Integer getRepairsPercentage() {
		return repairsPercentage;
	}

	public void setRepairsPercentage(Integer repairsPercentage) {
		this.repairsPercentage = repairsPercentage;
	}

	public Integer getCapExPercentage() {
		return capExPercentage;
	}

	public void setCapExPercentage(Integer capExPercentage) {
		this.capExPercentage = capExPercentage;
	}

	public Integer getPropertyManagementPercentage() {
		return propertyManagementPercentage;
	}

	public void setPropertyManagementPercentage(Integer propertyManagementPercentage) {
		this.propertyManagementPercentage = propertyManagementPercentage;
	}

	@Override
	public String toString() {
		return "Expenses [pmi=" + pmi + ", propertyTaxes=" + propertyTaxes + ", monthlyInsurance=" + monthlyInsurance
				+ ", hoaFees=" + hoaFees + ", electricity=" + electricity + ", garbage=" + garbage + ", water=" + water
				+ ", otherExpenses=" + otherExpenses + ", vacancyPercentage=" + vacancyPercentage
				+ ", repairsPercentage=" + repairsPercentage + ", capExPercentage=" + capExPercentage
				+ ", propertyManagementPercentage=" + propertyManagementPercentage + "]";
	}
	
	
}
