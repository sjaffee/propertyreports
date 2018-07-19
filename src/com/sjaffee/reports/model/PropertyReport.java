// ----------------------------------------------
package com.sjaffee.reports.model;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.ws.rs.Path;
import javax.xml.bind.annotation.XmlRootElement;

import javax.xml.bind.annotation.XmlElement;


@Path("analysis")
@XmlRootElement(name="analysis")
@Entity
@Table(name="property")
public class PropertyReport {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private int id;
	
	@Column(name="report_title")
	private String reportTitle;
	
	@Embedded
	private Address propertyAddress;
	
	@Column(name="annual_property_taxes")
	private Integer annualPropertyTaxes;
	
	@Column(name="mls_number")
	private String mlsNumber;
	
	@Column(name="purchase_price")
	private Double purchasePrice;
	
	@Column(name="after_repair_value")
	private Double afterRepairValue;
	
	@Column(name="market_value")
	private Double marketValue;
	
	@Column(name="closing_costs")
	private Double closingCosts;
	
	@Column(name="estimated_repair_value")
	private Double estimatedRepairValue;
	
	@Column(name="cash_purchase")
	private Boolean isCashPurchase;
	
	@Embedded
	private Loan loanInfo;
	
	@Embedded
	private Income income;
	
	@Embedded
	private Expenses expenses;
	
//	@Embedded
//	private FutureEstimates futureEstimates;

	public Integer getId() {
		return id;
	}
	
	public void setId(Integer id) {
		this.id = id;
	}
	
	public PropertyReport(){
		this.annualPropertyTaxes = 0;
	}
	
	public String getReportTitle() {
		return reportTitle;
	}
	
	public void setReportTitle(String reportTitle) {
		this.reportTitle = reportTitle;
	}
	
	public Address getPropertyAddress() {
		return propertyAddress;
	}
	
	public void setPropertyAddress(Address propertyAddress) {
		this.propertyAddress = propertyAddress;
	}
	
	public Integer getAnnualPropertyTaxes() {
		return annualPropertyTaxes;
	}
	
	public void setAnnualPropertyTaxes(Integer annualPropertyTaxes) {
		this.annualPropertyTaxes = annualPropertyTaxes;
	}
	
	public String getMlsNumber() {
		return mlsNumber;
	}
	
	public void setMlsNumber(String mlsNumber) {
		this.mlsNumber = mlsNumber;
	}
	
	public Double getPurchasePrice() {
		return purchasePrice;
	}
	
	public void setPurchasePrice(Double purchasePrice) {
		this.purchasePrice = purchasePrice;
	}
	
	public Double getAfterRepairValue() {
		return afterRepairValue;
	}
	
	public void setAfterRepairValue(Double afterRepairValue) {
		this.afterRepairValue = afterRepairValue;
	}
	
	public Double getMarketValue() {
		return marketValue;
	}

	public void setMarketValue(Double marketValue) {
		this.marketValue = marketValue;
	}
	
	public Double getClosingCosts() {
		return closingCosts;
	}
	
	public void setClosingCosts(Double closingCosts) {
		this.closingCosts = closingCosts;
	}
	
	public Double getEstimatedRepairValue() {
		return estimatedRepairValue;
	}
	
	public void setEstimatedRepairValue(Double estimatedRepairValue) {
		this.estimatedRepairValue = estimatedRepairValue;
	}
	
	public Boolean getIsCashPurchase() {
		return isCashPurchase;
	}
	
	public void setIsCashPurchase(Boolean isCashPurchase) {
		this.isCashPurchase = isCashPurchase;
	}
	
	public Loan getLoanInfo() {
		return loanInfo;
	}
	
	public void setLoanInfo(Loan loanInfo) {
		this.loanInfo = loanInfo;
	}
	
	public Income getIncome() {
		return income;
	}
	
	public void setIncome(Income income) {
		this.income = income;
	}
	
	public Expenses getExpenses() {
		return expenses;
	}
	
	public void setExpenses(Expenses expenses) {
		this.expenses = expenses;
	}
	
////	public FutureEstimates getFutureEstimates() {
////		return futureEstimates;
////	}
////	
////	public void setFutureEstimates(FutureEstimates futureEstimates) {
////		this.futureEstimates = futureEstimates;
////	}

	@Override
	public String toString() {
		return "PropertyReport [reportTitle=" + reportTitle + ", propertyAddress=" + propertyAddress
				+ ", annualPropertyTaxes=" + annualPropertyTaxes + ", mlsNumber=" + mlsNumber + ", purchasePrice="
				+ purchasePrice + ", afterRepairValue=" + afterRepairValue + ", marketValue= " + marketValue + " closingCosts=" + closingCosts
				+ ", estimatedRepairValue=" + estimatedRepairValue + ", isCashPurchase=" + isCashPurchase
				+ ", loanInfo=" + loanInfo + ", income=" + income + ", expenses=" + expenses + "]";
	}

}
