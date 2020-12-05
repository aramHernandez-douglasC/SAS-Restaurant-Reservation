package com.csis3275.project.SASRestaurantReservation.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.stereotype.Component;

/**
 * 
 * @author Sean
 * Model to store Reservations.
 *
 */
@Component
@Entity
@Table(name = "RESERVATIONS")
public class Reservation {	
	@Id
	@Column(name = "customer_id")
	@GeneratedValue
	private int id;
	
	@Column(name = "customer_name")
	private String customerName;
	
	@Column(name = "customer_email")
	private String customerEmail;

	@Column(name = "customer_phone")
	private String customerPhone;

	@Column(name = "reservation_date")
	private String reservationDate;
	
	@Column(name = "reservation_time")
	private String reservationTime;
	
	@Column(name = "numberOfPeople")
	private int numOfPeople;
	
	public Reservation() {};
	
	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String name) {
		this.customerName = name;
	}
	
	public String getReservationTime() {
		return reservationTime;
	}
	
	public String getReservationDate() {
		return reservationDate;
	}

	public void setReservationTime(String time) {
		this.reservationTime = time;
	}
	

	public void setReservationDate(String date) {
		this.reservationDate = date;
	}
	
	
	public int getNumOfPeople() {

		return numOfPeople;
	}

	public void setNumOfPeople(int number) {
		this.numOfPeople = number;
	}
	public String getCustomerEmail() {
		return customerEmail;
	}

	public void setCustomerEmail(String customerEmail) {
		this.customerEmail = customerEmail;
	}

	public String getCustomerPhone() {
		return customerPhone;
	}

	public void setCustomerPhone(String customerPhone) {
		this.customerPhone = customerPhone;
	}
	
	public Integer getId() {
		return id;
	}

	public boolean needBigTable(int numberOfPeople) {
		if(numberOfPeople < 5) {
			return false;
		}else
		{
			return true;
		}
		
		
	}
	
	

}
