package com.sjaffee.reports.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
import org.apache.log4j.Logger;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.util.UriComponentsBuilder;

import com.sjaffee.reports.hibernate.dao.DBPropertyDAO;
import com.sjaffee.reports.model.PropertyReport;

/**
 * Handles requests for the application home page.
 */
@Controller
public class PropertyReportController {
	
	private static final Logger log = Logger.getLogger(PropertyReportController.class);
	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home() {
		log.info("ENTERED APPLICATION! Routing to analysis.html");
		return "analysis";
	}
	
	//-------------------Retrieve All Property Reports--------------------------------------------------------
	
	
		@RequestMapping(value = "/analysis", method = RequestMethod.GET)
		public ResponseEntity<List<PropertyReport>> getPropertyReports(HttpServletRequest request) {
			List<PropertyReport> propertyReports = new ArrayList<PropertyReport>();
			try {
				//CALL SERVICE TO MAKE JDBC CALL TO RETRIEVE RECORDS
				DBPropertyDAO dao = new DBPropertyDAO();
				propertyReports = dao.loadPropertyReports();
				if (propertyReports.isEmpty()) {
					log.info("Property reports not found");
					return new ResponseEntity<List<PropertyReport>>(HttpStatus.NOT_FOUND);
				} else {
					log.info("Total property reports retrieved " + propertyReports.size());
				}
			} catch (Exception e) {
				log.error("Failed to fetch property reports with excepton :", e);
				return new ResponseEntity<List<PropertyReport>>(HttpStatus.CONFLICT);
			}
			log.info("Property Reportss GET method");
			return new ResponseEntity<List<PropertyReport>>(propertyReports, HttpStatus.OK);
		}

	    //---------------------Create a new Property Report--------------------------------------------------------
	    
	    @RequestMapping(value = "/analysis", method = RequestMethod.POST)
	    public ResponseEntity<PropertyReport> createPropertyReport(@RequestBody PropertyReport property, UriComponentsBuilder ucBuilder, HttpServletRequest request) {
	        log.info("Creating property report: ");
	 
	        Integer generatedId = null;
	        
	        try {
	        	DBPropertyDAO dao = new DBPropertyDAO();
	        	generatedId = dao.saveProperty(property);
	        	property.setId(generatedId);
			} catch (Exception e) {
				log.error("Property report creation failed with exception :", e);
				return new ResponseEntity<PropertyReport>(HttpStatus.CONFLICT);
			}
	        
	        //HttpHeaders headers = new HttpHeaders();
	        //headers.setLocation(ucBuilder.path("/analysis/{id}").buildAndExpand(property.getAnnualPropertyTaxes()).toUri());
	        return new ResponseEntity<PropertyReport>(property, HttpStatus.CREATED);
	    }
		
	    
	    //------------------- Update an existing Property Report --------------------------------------------------------
	    
	    @RequestMapping(value = "/analysis/{id}", method = RequestMethod.PUT)
	    public ResponseEntity<Object> updatePropertyReport(@PathVariable("id") long id, @RequestBody PropertyReport property, HttpServletRequest request) {
	        log.info("Updating Property Report " + id);
	           
			try {
				DBPropertyDAO dao = new DBPropertyDAO();
				dao.updateProperty(property);
			} catch (Exception e) {
				log.error("Property report update failed with exception :", e);
				return new ResponseEntity<Object>(HttpStatus.CONFLICT);
			}
	 
			return new ResponseEntity<Object>(HttpStatus.OK);
	    }
	    

	    //------------------- Delete a Property Report --------------------------------------------------------
	    
	    @RequestMapping(value = "/analysis/{id}", method = RequestMethod.DELETE)
	    public ResponseEntity<Object> deletePropertyReport(@PathVariable("id") long id, HttpServletRequest request) {
	        log.info("Fetching & Deleting Property Report with id " + id);
	 
	        try {
	        	DBPropertyDAO dao = new DBPropertyDAO();
				dao.deleteProperty(id);
			} catch (Exception e) {
				log.error("Property Report delete failed with exception :", e);
				return new ResponseEntity<Object>(HttpStatus.CONFLICT);
			}
	        return new ResponseEntity<Object>(HttpStatus.OK);
	    }    
	
}
