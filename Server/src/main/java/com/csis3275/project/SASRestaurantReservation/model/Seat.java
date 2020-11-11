package com.csis3275.project.SASRestaurantReservation.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.stereotype.Component;

@Component
@Entity
@Table(name = "seat")
public class Seat {
	@Id
	@Column(name = "seat_id")
	@GeneratedValue
	private int id;
	
	@Column (name = "xposition")
	private int xPos;
	
	@Column (name = "yposition")
	private int yPos;
	
	@Column (name = "capacity")
	private int capacity;
	
	@Column (name = "cleanStatus")	
	private String cleanStatus;
	
	
	@ManyToOne
	private User serverId;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getxPos() {
		return xPos;
	}

	public void setxPos(int xPos) {
		this.xPos = xPos;
	}

	public int getyPos() {
		return yPos;
	}

	public void setyPos(int yPos) {
		this.yPos = yPos;
	}

	public int getCapacity() {
		return capacity;
	}

	public void setCapacity(int capacity) {
		this.capacity = capacity;
	}

	public String getCleanStatus() {
		return cleanStatus;
	}

	public void setCleanStatus(String cleanStatus) {
		this.cleanStatus = cleanStatus;
	}

	public User getServerId() {
		return serverId;
	}

	public void setServerId(User serverId) {
		this.serverId = serverId;
	}
	
	
	

}
