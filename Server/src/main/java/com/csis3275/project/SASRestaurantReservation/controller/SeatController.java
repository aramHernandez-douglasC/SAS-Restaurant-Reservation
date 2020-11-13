package com.csis3275.project.SASRestaurantReservation.controller;

import java.util.Optional;

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
	 * GET ALL SEATS 
	 * 
	 * This method returns a list of all the seats stored on the database with their
	 * respective properties so they can be displayed on the front-end
	 * 
	 * @return a list of type iterable containing all the seats.
	 * 
	 *  @author Aram Hernandez 300285533
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
				System.out.println("New seat created!");
				return new ResponseEntity<Seat>(this.seat, HttpStatus.ACCEPTED);
			}

		} catch (Exception e) {
			throw new Exception(e);
		}
		return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
	}
	
	
	/**
	 * DELETE SEAT
	 * 
	 * This method looks for the seat id which you want to delete from the database depending on 
	 * the ID specified by the front-end user, it also first looks if the id selected exists on 
	 * the database, and if not it throws a exception 
	 * @throws e: An exception in case there is something wrong with the input or it doesn't
	 * 				exists
	 * @author Aram Hernandez 300285533
	 *  **/
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
	 * UPDATE SEAT STATUS
	 * 
	 * This method looks for the seat_id stored on the database and stores it 
	 * on the seat model defined before. Then it gets the status of the current selected 
	 * seat and updates it depending on what the user selected using the CRUD 
	 * repository on the SeatRepository object
	 * 
	 *   @param seatId: The seat Id which you want to update 
	 *   @param status: the status in which you want the seat to become.
	 *   
	 *   @author Aram Hernandez 300285533
	 * **/
	@PutMapping (value = "/update-seat-status")
	public ResponseEntity<Seat> updateSeatStatus(@RequestParam int seatId, @RequestParam String status) throws Throwable{
		System.out.println("id =" + seatId + "status: "+ status);
		try {
			this.seat = repository.findById(seatId).get();
			
			if (this.seat != null) {
				this.seat.setCleanStatus(status);
				repository.save(this.seat);
				System.out.println("Seat updated successfully: " + this.seat.getId());
				return new ResponseEntity<Seat>(this.seat,HttpStatus.OK);
			}
		} catch (Exception e) {
			throw new Exception(e);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

}
