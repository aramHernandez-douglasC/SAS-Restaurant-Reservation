package com.csis3275.project.SASRestaurantReservation.controller;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.csis3275.project.SASRestaurantReservation.message.request.LoginForm;
import com.csis3275.project.SASRestaurantReservation.message.request.SignUpForm;
import com.csis3275.project.SASRestaurantReservation.message.response.JwtResponse;
import com.csis3275.project.SASRestaurantReservation.message.response.ResponseMessage;
import com.csis3275.project.SASRestaurantReservation.model.Role;
import com.csis3275.project.SASRestaurantReservation.model.RoleName;
import com.csis3275.project.SASRestaurantReservation.model.User;
import com.csis3275.project.SASRestaurantReservation.repository.RoleRepository;
import com.csis3275.project.SASRestaurantReservation.repository.UserRepository;
import com.csis3275.project.SASRestaurantReservation.security.jwt.JwtProvider;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthRestAPIS {
 
  @Autowired
  AuthenticationManager authenticationManager;
 
  @Autowired
  UserRepository userRepository;
 
  @Autowired
  RoleRepository roleRepository;
 
  @Autowired
  PasswordEncoder encoder;
 
  @Autowired
  JwtProvider jwtProvider;
 
  @PostMapping("/signin")
  public ResponseEntity authenticateUser(@RequestBody LoginForm loginRequest) {
 
    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
 
    SecurityContextHolder.getContext().setAuthentication(authentication);
 
    String jwt = jwtProvider.generateJwtToken(authentication);
    UserDetails userDetails = (UserDetails) authentication.getPrincipal();
 
    return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getUsername(), userDetails.getAuthorities()));
  }
  
 
  @PostMapping("/signup")
  public ResponseEntity registerUser(@RequestBody SignUpForm signUpRequest) {
    if (userRepository.existsByUsername(signUpRequest.getUsername())) {
      return new ResponseEntity<>(new ResponseMessage("Fail -> Username is already taken!"),
          HttpStatus.BAD_REQUEST);
    }
 
    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
      return new ResponseEntity<>(new ResponseMessage("Fail -> Email is already in use!"),
          HttpStatus.BAD_REQUEST);
    }
 
    // Creating user's account
    User user = new User(signUpRequest.getName(), signUpRequest.getUsername(), signUpRequest.getEmail(),
        encoder.encode(signUpRequest.getPassword()));
 
    Set<String> strRoles = signUpRequest.getRole();
    Set roles = new HashSet<>();
 
    strRoles.forEach(role -> {
      switch (role) {
      case "admin":
        Role adminRole = roleRepository.findByName(RoleName.admin)
            .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
        roles.add(adminRole);
 
        break;
      case "pm":
        Role pmRole = roleRepository.findByName(RoleName.employee)
            .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
        roles.add(pmRole);
 
        break;
      default:
        Role userRole = roleRepository.findByName(RoleName.customer)
            .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
        roles.add(userRole);
      }
    });
 
    user.setRoles(roles);
    userRepository.save(user);
 
    return new ResponseEntity<>(new ResponseMessage("User registered successfully!"), HttpStatus.OK);
  }
}
