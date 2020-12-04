package com.csis3275.project.SASRestaurantReservation.repository;

import org.springframework.data.repository.CrudRepository;
import com.csis3275.project.SASRestaurantReservation.model.Reservation;

/**
 * 
 * @author Sean
 * Repository to interact with table MENU_ITEMS.
 *
 */

public interface ReservationRepository extends CrudRepository<Reservation, Integer> {

}
