package com.csis3275.project.SASRestaurantReservation.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.csis3275.project.SASRestaurantReservation.repository.UserRepository;
import com.csis3275.project.SASRestaurantReservation.model.User;

@CrossOrigin(origins = "http://localhost:4200")

@RestController
public class UserController {

	@Autowired
	private UserRepository repository;

	/**
	 * GET ALL USERS
	 * 
	 * This method returns a list of all the users stored on the database with their
	 * respective properties so they can be displayed on the front-end
	 * 
	 * @return a list of type iterable containing all the users.
	 * 
	 *  @author 
	 **/
//	@GetMapping(value = "/users", produces = MediaType.APPLICATION_JSON_VALUE)
//	public Iterable<User> getAllUsers() {
//		return repository.findAll();
//
//	}
//	/**
//	 * AUTHENTICATE USER
//	 * 
//	 * This method checks that user exists on the database and also that user and password 
//	 * match to the ones stored on the back-end.
//	 * 
//	 * @return ResponseEntity: User 
//	 * 
//	 *  @author Sean G
//	 **/
//	@PostMapping("/login")
//	public ResponseEntity<User> authenticateUser(@RequestParam String email, @RequestParam String password, 
//			HttpSession htpses)
//			throws Throwable {
//		try {
//			htpses.invalidate();
//			User user = repository.findByEmail(email);
//			if (user != null && user.getPassword().equals(password)) {
//					System.out.println(user.getFirstName() + " successfully logged in");
//					
//					
//					return new ResponseEntity<User>(user, HttpStatus.OK);
//			}
//		} catch (Exception e) {
//			throw new Exception(e);
//		}
//		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//		
//	}
//	
//	
//	
//	/**
//	 * REGISTER METHOD
//	 * 
//	 * This method helps to validate the user input and 
//	 * store the user on the database with the specified parameters
//	 * 
//	 * @param User user : expects a user object from the client
//	 * @return ResponseEntity :User  Returns the response that will be sent to the client
//	 * @author Aram Hernandez 300285533
//	 * 
//	 * **/
//	
//	@PostMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
//	public ResponseEntity<User> save(@RequestBody User user) throws Throwable {
//		try {
//			repository.findByEmail(user.getEmail());
//			if (repository.findByEmail(user.getEmail()) == null) {
//				User newUser = repository.save(user);
//				System.out.println("New user created!");
//				return new ResponseEntity<User>(newUser,HttpStatus.ACCEPTED);
//			}	
//		} catch (Exception e) {
//			throw new Exception(e);
//		}
//		return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
//	}
//
//	/**
//	 * PASSWORD RESET METHOD
//	 * 
//	 * This method helps the user restore the password in case of losing it 
//	 * 
//	 * @param email :String, password :String ; The request from the client
//	 * @return ResponseEntity : which response will be sent to the client
//	 * 
//	 * @author Saran Jha 
//	 * **/
//	@PostMapping(value = "/reset", produces = MediaType.APPLICATION_JSON_VALUE)
//	@ResponseBody
//	public ResponseEntity<User> resetPassword(@RequestParam String email, @RequestParam String password)
//			throws Throwable {
//		try {
//			User user = repository.findByEmail(email);
//			if (user != null) {
//				user.setPassword(password);
//				repository.save(user);
//				System.out.println("Updated password for " + user.getFirstName());
//				return new ResponseEntity<User>(user, HttpStatus.OK);				
//			}
//		} catch (Exception e) {
//			throw new Exception(e);
//		}
//		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//	}
//
}
