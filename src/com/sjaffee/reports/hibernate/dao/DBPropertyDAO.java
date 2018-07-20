package com.sjaffee.reports.hibernate.dao;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import com.sjaffee.reports.controller.PropertyReportController;
import com.sjaffee.reports.model.PropertyReport;

public class DBPropertyDAO implements PropertyDAO{

	private static final Logger log = Logger.getLogger(PropertyReportController.class);
	
	Session session;

	public Integer saveProperty(PropertyReport pr) {
		
		session = HibernateUtil.createSession();

		Integer generatedId = null;
		try{

			session.beginTransaction();

			//save the property report object
			log.info("Saving the property report object...");
			generatedId = (Integer) session.save(pr);

			session.getTransaction().commit();

			log.info("Done!");
		}
		catch(Exception e){
			log.error("Exception occured while saving property: " + e.getMessage());
		}
		
		return generatedId;

	}

	public void updateProperty(PropertyReport updatedReport) {
		
		session = HibernateUtil.createSession();

		try{

			session.beginTransaction();

			//Update the report object if it exists. Otherwise save it if not already in DB
			log.info("Updating the property report object...");
			session.saveOrUpdate(updatedReport);

			session.getTransaction().commit();

			log.info("Done!");
		}
		catch(Exception e){
			log.error("Exception occured while updating property: " + e.getMessage());
		}
	}

	public void deleteProperty(long id) {
		
		session = HibernateUtil.createSession();
		
		try{

			session.beginTransaction();

			//Update the report object if it exists. Otherwise save it if not already in DB
			log.info("Deleting the property report object...");
			Integer propertyId = (int) (long) id;
			PropertyReport property = session.get(PropertyReport.class,propertyId);
			session.delete(property);

			session.getTransaction().commit();

			log.info("Done!");
		}
		catch(Exception e){
			log.error("Exception occured while deleting property: " + e.getMessage());
		}

	}

	public ArrayList<PropertyReport> loadPropertyReports() {

		session = HibernateUtil.createSession();

		List<PropertyReport> reports = new ArrayList<PropertyReport>();

		try{
			
			session.beginTransaction();

			log.info("Retrieving property reports from DB");
			//get all property reports
			reports = session.createQuery("from PropertyReport").list();

			session.getTransaction().commit();
		}
		catch(Exception e){
			log.error("Exception occured while loading property: " + e.getMessage());
		}
		return (ArrayList<PropertyReport>) reports;
	}

}
