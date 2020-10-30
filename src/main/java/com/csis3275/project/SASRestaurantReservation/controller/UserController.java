package com.csis3275.project.SASRestaurantReservation.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.csis3275.project.SASRestaurantReservation.Repository.UserRepository;
import com.csis3275.project.SASRestaurantReservation.model.User;
@CrossOrigin(origins = "http://localhost:4200")


@RestController 
public class UserController {
	
	private UserRepository repository;
	
	
	//get all users
	@GetMapping("/users")
	public List<User> getAllUsers(){
		return repository.findAll();
		
	}
	
	@PostMapping("/login")
    public void authenticateUser( String username, String password) {
	
		
		   
//         String email = loginRequest.getEmail();
//         String password = loginRequest.getPassword();
                
      
	
	}
}
