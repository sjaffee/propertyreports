package com.sjaffee.reports.hibernate.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import com.sjaffee.reports.model.PropertyReport;

public class HibernateUtil {

	private static SessionFactory factory;

	private HibernateUtil() {

	}

	public static synchronized SessionFactory getSessionFactory(){
		if(factory == null){
			factory = new Configuration()
					.configure("hibernate.cfg.xml")
					.addAnnotatedClass(PropertyReport.class)
					.buildSessionFactory();
		}

		return factory;
	}

	public static synchronized Session createSession(){
		//create session factory
		factory = getSessionFactory();

		//create session
		Session session = factory.getCurrentSession();

		return session;
	}
}
