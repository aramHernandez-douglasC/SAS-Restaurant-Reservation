package com.csis3275.project.SASRestaurantReservation.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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

	@PostMapping("/placeOrder")
	public void placeOrder(@RequestBody Seat seat) {
		seatRepo.save(seat);
		// menuRepo.save(menu);
	}

	@DeleteMapping("/delete-single-item")
	public void deleteSingleOrder(@RequestParam int id) {
		this.orderItem = this.oItRepo.findById(id).get();
		oItRepo.delete(this.orderItem);
		System.out.println("Item deleted to:" + this.orderItem.getId());

	}
	

	@GetMapping("/get-all/orders")
	public List<Seat> findAllOrders() {
		return seatRepo.findAll();
	}

}
