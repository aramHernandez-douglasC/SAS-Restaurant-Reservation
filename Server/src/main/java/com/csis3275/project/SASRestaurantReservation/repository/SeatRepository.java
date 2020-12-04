package com.csis3275.project.SASRestaurantReservation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import com.csis3275.project.SASRestaurantReservation.model.Seat;
import com.csis3275.project.SASRestaurantReservation.model.User;


public interface SeatRepository extends JpaRepository<Seat, Integer> {

}