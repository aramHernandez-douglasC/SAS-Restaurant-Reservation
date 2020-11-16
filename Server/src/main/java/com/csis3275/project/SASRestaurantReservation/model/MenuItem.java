package com.csis3275.project.SASRestaurantReservation.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.stereotype.Component;

/**
 * 
 * @author Saran
 * Model to store MENU_ITEMS.
 *
 */
@Component
@Entity
@Table(name = "MENU_ITEMS")
public class MenuItem {
	
	@Id
	@Column(name = "item_id")
	@GeneratedValue
	private int id;

	@Column(name = "item_name")
	private String itemName;

	@Column(name = "item_price")
	private String itemPrice;

	public MenuItem(String userName, String firstName) {
		super();
		this.itemName = userName;
		this.itemPrice = firstName;
	}
	
	public MenuItem() {}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String userName) {
		this.itemName = userName;
	}

	public String getItemPrice() {
		return itemPrice;
	}

	public void setItemPrice(String firstName) {
		this.itemPrice = firstName;
	}

	public Integer getId() {
		return id;
	}
	
}
