package com.csis3275.project.SASRestaurantReservation.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
	
	static final double TAX = 0.04;
	/**
	 * This will be true if order is currently opened or 
	 * false if it's closed 
	 * */	
	@Column(name= "order_status")
	private String orderStatus ;
	
	@Column(name="is_payed")
	private String payed ;
	
	@Column(name = "subtotal")
	private double subtotal;
	
	@Column(name = "Total")
	private double total;
	
	@ManyToOne (cascade = CascadeType.ALL)
	@JoinColumn(name ="seat_id", referencedColumnName = "seat_id")
	public Seat seat;
	
	@OneToMany(targetEntity = OrderItem.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "order_fk", referencedColumnName = "order_id")
	private List<OrderItem> orderItem;

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

	

	public String getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}

	public String getPayed() {
		return payed;
	}

	public void setPayed(String payed) {
		this.payed = payed;
	}

	public double getSubtotal() {
		return subtotal;
	}

	public void setSubtotal() {
	
		double sum = 0;
		List<OrderItem> listOrder = this.orderItem;
		for (int i = 0; i < listOrder.size();i++) {
			listOrder.get(i).setSubtotal();
			sum += listOrder.get(i).getSubtotal();
			
		}
		this.subtotal = sum;
	}

	public double getTotal() {
		return total;
	}

	public void setTotal() {
		this.total = (this.subtotal * TAX) + this.subtotal;
	}
	
	
	

	
	
	

}
