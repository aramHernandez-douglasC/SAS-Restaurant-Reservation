package com.csis3275.project.SASRestaurantReservation.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import com.csis3275.project.SASRestaurantReservation.model.Reservation;
import com.csis3275.project.SASRestaurantReservation.repository.ReservationRepository;

@CrossOrigin(origins = "http://localhost:4200")

@RestController
public class ReservationController {
	@Autowired
	private ReservationRepository repository;
	@Autowired
	private Reservation reservation;
	
	/**
	 * @author Sean
	 * This class will hold items for the Reservation and their times. 
	 **/
	/**Get Mapping to retrieve all reservations.
	 */
	
	@GetMapping(value = "/reservations")
	public Iterable<Reservation> getAllMenuItems() {
		return repository.findAll();
	}
	
	/**Post Mapping to add new reservation.
	 */
	
	@PostMapping(value = "/reservation/new", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Reservation> saveMenuItem(@RequestBody Reservation res) throws Throwable {
		
		try {
			if (repository.findByCustomerEmail(res.getCustomerEmail()) == null) {
				this.reservation = repository.save(res);
				System.out.println("Reservation from: "+ this.reservation.getCustomerName());
				return new ResponseEntity<Reservation>(this.reservation, HttpStatus.ACCEPTED);
			}

		} catch (Exception e) {
			throw new Exception(e);
		}
		return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
	}
	
	/**Post Mapping to delete reservation.
	 */
	@PostMapping(value = "/reservation/delete/{customerId}")
	public void deleteMenuItem(@PathVariable("customerId") int customerId) throws Throwable {
		try {
			if (repository.findById(customerId) != null) {
				repository.deleteById(customerId);
				System.out.print("Reservation Deleted successfully");
			}
		} catch (Exception e) {
			throw new Exception(e);
		}

	}

}
