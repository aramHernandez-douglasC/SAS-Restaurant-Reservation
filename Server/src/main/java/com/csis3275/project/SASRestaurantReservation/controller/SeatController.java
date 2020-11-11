package com.csis3275.project.SASRestaurantReservation.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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

	@GetMapping(value = "/seats", produces = MediaType.APPLICATION_JSON_VALUE)
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

}
