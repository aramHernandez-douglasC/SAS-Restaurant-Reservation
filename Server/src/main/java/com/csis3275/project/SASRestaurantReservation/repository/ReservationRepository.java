package com.csis3275.project.SASRestaurantReservation.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
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
	
	 @Query(value = "SELECT reservation_time FROM RESERVATIONS WHERE reservation_date = :reservationDate", nativeQuery = true)
	    List<String> findReservationsByDate(@Param("reservationDate") String reservationDate);
}
