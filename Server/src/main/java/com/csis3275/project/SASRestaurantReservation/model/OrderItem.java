package com.csis3275.project.SASRestaurantReservation.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.stereotype.Component;

@Component
@Entity
@Table(name = "OrderItem")
public class OrderItem {
	
	@Id
	@Column(name = "orderItem_id")
	
	private int id;
	
	@Column(name = "quantity")
	private int quantity;
	
	@ManyToOne (cascade = CascadeType.ALL)
	@JoinColumn(name ="item_id", referencedColumnName = "item_id")
	public MenuItem item;
	
	
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	
	
	

}
