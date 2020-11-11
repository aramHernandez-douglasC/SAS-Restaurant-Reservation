package com.csis3275.project.SASRestaurantReservation.repository;

import org.springframework.data.repository.CrudRepository;

import com.csis3275.project.SASRestaurantReservation.model.Seat;

public interface SeatRepository extends CrudRepository<Seat, Integer> {

}
