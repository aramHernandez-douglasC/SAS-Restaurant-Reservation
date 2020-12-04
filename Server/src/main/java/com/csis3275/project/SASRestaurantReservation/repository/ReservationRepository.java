package com.csis3275.project.SASRestaurantReservation.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.csis3275.project.SASRestaurantReservation.model.Reservation;
import com.csis3275.project.SASRestaurantReservation.model.User;

/**
 * 
 * @author Sean
 * Repository to interact with table MENU_ITEMS.
 *
 */
@Repository
public interface ReservationRepository extends CrudRepository<Reservation, Integer> {
	public User findByCustomerEmail(String customerEmail);
}
