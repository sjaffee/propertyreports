package com.sjaffee.reports.hibernate.dao;

import java.util.List;

import com.sjaffee.reports.model.PropertyReport;

public interface PropertyDAO {
	
	public void saveProperty(PropertyReport pr);
	public void updateProperty(PropertyReport pr);
	public void deleteProperty(long id);
	public List<PropertyReport> loadPropertyReports();
	
}
