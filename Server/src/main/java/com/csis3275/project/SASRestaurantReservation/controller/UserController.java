package com.csis3275.project.SASRestaurantReservation.controller;

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

	// get all users
	@GetMapping(value = "/users", produces = MediaType.APPLICATION_JSON_VALUE)
	public Iterable<User> getAllUsers() {
		return repository.findAll();

	}
	// login functionality
	@PostMapping("/login")
	public ResponseEntity<User> authenticateUser(@RequestParam String email, @RequestParam String password)
			throws Throwable {
		try {
			User user = repository.findByEmail(email);
			if (user != null && user.getPassword().equals(password)) {
					System.out.println(user.getFirstName() + " successfully logged in");
					return new ResponseEntity<User>(user, HttpStatus.OK);
			}
		} catch (Exception e) {
			throw new Exception(e);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		
	}

	// register functionality
	@PostMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<User> save(@RequestBody User user) throws Throwable {
		try {
			repository.findByEmail(user.getEmail());
			if (repository.findByEmail(user.getEmail()) == null) {
				User newUser = repository.save(user);
				System.out.println("New user created!");
				return new ResponseEntity<User>(newUser,HttpStatus.ACCEPTED);
			}	
		} catch (Exception e) {
			throw new Exception(e);
		}
		return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
	}

	/**
	 * 
	 * @param 
	 * @return 
	 * 
	 * @author Saran Jha 
	 * **/
	@PostMapping(value = "/reset", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<User> resetPassword(@RequestParam String email, @RequestParam String password)
			throws Throwable {
		try {
			User user = repository.findByEmail(email);
			if (user != null) {
				user.setPassword(password);
				repository.save(user);
				System.out.println("Updated password for " + user.getFirstName());
				return new ResponseEntity<User>(user, HttpStatus.OK);				
			}
		} catch (Exception e) {
			throw new Exception(e);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

}
