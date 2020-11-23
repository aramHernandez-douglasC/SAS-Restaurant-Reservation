package com.csis3275.project.SASRestaurantReservation.message.request;

import java.util.Set;
public class SignUpForm {

    private String name;

    private String username;
 
    private String email;
    
    private Set role;
    
    private String password;
 
    public String getName() {
        return name;
    }
 
    public void setName(String name) {
        this.name = name;
    }
 
    public String getUsername() {
        return username;
    }
 
    public void setUsername(String username) {
        this.username = username;
    }
 
    public String getEmail() {
        return email;
    }
 
    public void setEmail(String email) {
        this.email = email;
    }
 
    public String getPassword() {
        return password;
    }
 
    public void setPassword(String password) {
        this.password = password;
    }
    
    public Set getRole() {
      return this.role;
    }
    
    public void setRole(Set role) {
      this.role = role;
    }
}
