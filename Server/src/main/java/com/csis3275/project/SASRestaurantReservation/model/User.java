package com.csis3275.project.SASRestaurantReservation.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "users")

public class User {

	@Id
	@Column(name = "user_id")
	@GeneratedValue
	private int id;

	@Column(name = "user_name")
	private String userName;

	@Column(name = "first_name")
	private String firstName;

	@Column(name = "last_name")
	private String lastName;

	@Column(name = "email")
	private String email;

	@Column(name = "type")
	private String type;

	@Column(name = "password")
	private String password;

	public User() {

	}

	public User(String username, String first_name, String last_name, String email, String type, String password) {
		super();
		this.userName = username;
		this.firstName = first_name;
		this.lastName = last_name;
		this.email = email;
		this.type = type;
		this.password = password;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUsername(String username) {
		this.userName = username;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirst_name(String first_name) {
		this.firstName = first_name;
	}

	public String getLast_name() {
		return lastName;
	}

	public void setLast_name(String last_name) {
		this.lastName = last_name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", firstName=" + firstName + ", type=" + type + "]";
	}
	
	public String createFullName() {
		String fullname = this.firstName + this.lastName;
		return fullname;
	}
	public boolean checkIfAdmin() {
		if(this.getType() == "Admin") {
			return true;
		}return false;
		
	}

}
