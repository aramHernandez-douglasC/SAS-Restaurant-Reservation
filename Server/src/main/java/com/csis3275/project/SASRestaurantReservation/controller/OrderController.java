package com.csis3275.project.SASRestaurantReservation.controller;

import java.util.List;
import static java.lang.System.out;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.csis3275.project.SASRestaurantReservation.model.MenuItem;
import com.csis3275.project.SASRestaurantReservation.repository.MenuItemRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.csis3275.project.SASRestaurantReservation.DAO.OrderRequest;
import com.csis3275.project.SASRestaurantReservation.model.MenuItem;
import com.csis3275.project.SASRestaurantReservation.model.Order;
import com.csis3275.project.SASRestaurantReservation.model.OrderItem;
import com.csis3275.project.SASRestaurantReservation.model.Seat;
import com.csis3275.project.SASRestaurantReservation.repository.MenuItemRepository;
import com.csis3275.project.SASRestaurantReservation.repository.OrderItemRepository;
import com.csis3275.project.SASRestaurantReservation.repository.OrderRepository;
import com.csis3275.project.SASRestaurantReservation.repository.SeatRepository;

@RestController
public class OrderController {

	@Autowired
	Seat seat;

	@Autowired
	Order order;

	@Autowired
	OrderItem orderItem;

	@Autowired
	SeatRepository seatRepo;

	@Autowired
	OrderRepository orderRepo;

	@Autowired
	OrderItemRepository oItRepo;

	/**
	 * This code will allow the front-end user to update and create 
	 * an order **/
	

	@PostMapping("/order/getAllBySeat")
	public List<Order> getAllOrdersBySeat(@RequestBody Seat seat) {
		return this.orderRepo.getOrdersBySeat(seat);
	}
	
	@GetMapping("/order/get-active")
	public Order getActiveOrder(@RequestParam int seatId) {
		return this.orderRepo.getActiveOrder(seatId);
	}
	
	@GetMapping("/order/get-all-unpaid-orders")
	public List<Order> getAllUnpaidOrders(){
		return null;
	}
	
	@GetMapping("/order/order-item/get-single")
	public OrderItem findOrder(@RequestParam int id) {
		return oItRepo.findById(id).get();
	}
	

	@GetMapping("/order/get-all")
	public List<Order> findAllOrders() {
		return orderRepo.findAll();
	}
	
	
	@PostMapping("/order/placeOrder")
	public void placeOrder(@RequestBody Order order) {		
		this.updateOrder(order);
	}

	@PostMapping("/order/order-item/delete")
	public void deleteSingleOrder(@RequestBody Order order, @RequestParam int itemId) {
		this.oItRepo.deleteItem(itemId);
		this.updateOrder(order);
		
	}
	
	@PostMapping("/order/pay")
	public void pay (@RequestBody Order order) {
		this.order = order;
		this.order.setOrderStatus("FALSE");
		this.order.setPayed("TRUE");
		this.orderRepo.save(this.order);
	}
	
	


	
	
	public void updateOrder(Order order) {
		this.order = order;
		this.order.setSubtotal();
		this.order.setTotal();		
		this.orderRepo.save(this.order);	
	}

}
