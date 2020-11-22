package com.csis3275.project.SASRestaurantReservation.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.stereotype.Component;

@Component
@Entity
@Table(name = "Orders")
public class Order {
	
	@Id
	@Column(name = "order_id")	
	private int id;
	
	@OneToMany(targetEntity = OrderItem.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "order_fk", referencedColumnName = "order_id")
	private List<OrderItem> orderItem;
	
	public Order(int id, List<OrderItem> orderItem) {
		super();
		this.id = id;
		this.orderItem = orderItem;
	}
	
	public Order() {}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public List<OrderItem> getOrderItem() {
		return orderItem;
	}

	public void setOrderItem(List<OrderItem> orderItem) {
		this.orderItem = orderItem;
	}

	
	
	

}
