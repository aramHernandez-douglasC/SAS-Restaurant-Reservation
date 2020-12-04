package com.csis3275.project.SASRestaurantReservation.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.csis3275.project.SASRestaurantReservation.model.Order;
import com.csis3275.project.SASRestaurantReservation.model.Seat;

public interface OrderRepository extends JpaRepository<Order, Integer> {
	
	public List<Order> getOrdersBySeat(Seat s);
	
	
	@Query(value = "SELECT * FROM Orders WHERE seat_id = :seatId AND order_status = TRUE", nativeQuery = true)
	public Order getActiveOrder( @Param("seatId") int seatId);
	

}
