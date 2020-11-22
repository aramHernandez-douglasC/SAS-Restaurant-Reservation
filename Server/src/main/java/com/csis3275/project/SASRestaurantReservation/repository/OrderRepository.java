package com.csis3275.project.SASRestaurantReservation.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.csis3275.project.SASRestaurantReservation.model.Order;

public interface OrderRepository extends JpaRepository<Order, Integer> {

}
