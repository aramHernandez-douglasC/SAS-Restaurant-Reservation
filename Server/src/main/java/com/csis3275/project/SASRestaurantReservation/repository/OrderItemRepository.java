package com.csis3275.project.SASRestaurantReservation.repository;

import org.springframework.data.repository.CrudRepository;

import com.csis3275.project.SASRestaurantReservation.model.OrderItem;

public interface OrderItemRepository extends CrudRepository<OrderItem, Integer> {

}
