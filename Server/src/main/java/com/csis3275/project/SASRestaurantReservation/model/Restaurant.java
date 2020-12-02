package com.csis3275.project.SASRestaurantReservation.model;

import java.util.List;



//@Entity
//@Table(name = "Restaurant")
public class Restaurant {
	
	private int id;
	
	//Variable which will be used to scale the map
	private double sqCm;
	
	//Number selected arrengement	
	private int arrengementId;
	
	private List<Seat> seats;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public double getSqCm() {
		return sqCm;
	}

	public void setSqCm(double sqCm) {
		this.sqCm = sqCm;
	}

	public int getArrengementId() {
		return arrengementId;
	}

	public void setArrengementId(int arrengementId) {
		this.arrengementId = arrengementId;
	}

	public List<Seat> getSeats() {
		return seats;
	}

	public void setSeats(List<Seat> seats) {
		this.seats = seats;
	}
	
	
	
	
	

}
