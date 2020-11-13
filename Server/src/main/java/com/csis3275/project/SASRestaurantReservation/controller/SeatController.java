package com.csis3275.project.SASRestaurantReservation.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.csis3275.project.SASRestaurantReservation.model.Seat;
import com.csis3275.project.SASRestaurantReservation.repository.SeatRepository;

@CrossOrigin(origins = "http://localhost:4200")

@RestController
public class SeatController {

	@Autowired
	private SeatRepository repository;

	@Autowired
	private Seat seat;

	/**
	 * Get all seats
	 **/

	@GetMapping(value = "/seats")
	public Iterable<Seat> getAllSeats() {
		return repository.findAll();
	}

	@PostMapping(value = "/newSeat", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Seat> saveSeat(@RequestBody Seat seat) throws Throwable {
		try {
			if (repository.findById(seat.getId()) == null) {
				this.seat = repository.save(seat);
				System.out.println("New user created!");
				return new ResponseEntity<Seat>(this.seat, HttpStatus.ACCEPTED);
			}

		} catch (Exception e) {
			throw new Exception(e);
		}
		return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
	}

	@DeleteMapping(value = "/delete-seat")
	public void deleteSeat(@RequestParam int seatId) throws Throwable {
		try {
			if (repository.findById(seatId) != null) {
				repository.deleteById(seatId);
				System.out.print("Seat Deleted successfully");
			}
		} catch (Exception e) {
			throw new Exception(e);
		}

	}
	/**
	 * UPDATE SEAT (ADMIN)
	 * 
	 * This method takes a whole seat object in with updated values, it then
	 * finds the seat in the database that has a corresponding id to the one it
	 * has receieved in parameter. it then sets the current seat to the newly
	 * added seat attributes from the parameter object. Once the updated values
	 * are added, the seat gets updated in the database using the CRUD operations
	 * from the repository.

	 *   @param Seat seat : the object with updated seat values 
	 *   
	 *   @author Sean Gaudette 300283112
	 * **/
	@PutMapping(value = "/updateSeat", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Seat> updateSeat(@RequestBody Seat seat1) throws Throwable {
		try {
			
				
			if (seat1 != null) {
				this.seat = seat1;
				repository.save(this.seat);
				System.out.println("User Updated!");
				System.out.print("Seat updated successfully: " + this.seat.getId());
			}

		} catch (Exception e) {
			throw new Exception(e);
		}
		return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
	}

}
