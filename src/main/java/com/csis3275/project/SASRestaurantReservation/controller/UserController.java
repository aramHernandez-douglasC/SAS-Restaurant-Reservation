package com.csis3275.project.SASRestaurantReservation.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
	
	@Autowired
	private UserRepository repository;
	
	
	//get all users
	@GetMapping("/users")
    public List<User> getAllUsers(){

        if (repository.findAll() == null) {
            System.out.print("There are not any users to read :(");
        }
        else {
            System.out.print(repository.findAll());
        }

        return repository.findAll();


    }

    @GetMapping("/angular")
    public ResponseEntity<List<User>> list() {
        List<User> list = repository.findAll();
        return ResponseEntity.ok().body(list);
    }
	
	@GetMapping("/login")
    public int verifyLogin( String username, String password) {
		
		User loginUser = repository.findByUsername(username);
		
		if(loginUser == null) {
			throw new RuntimeException("User does not exsist");
		}
		if(!loginUser.getPassword().equals(password)) {

			System.out.print("Password is incorrect");
			return 0;
		}
		return 1;
		
	
		   

                
      
	
	}
}
