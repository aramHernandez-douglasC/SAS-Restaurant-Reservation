package tests.csis3275.project.SASRestaurantReservation.model;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.csis3275.project.SASRestaurantReservation.model.Seat;
import com.csis3275.project.SASRestaurantReservation.model.User;
import com.csis3275.project.SASRestaurantReservation.controller.UserController;

class ModelTest {

	
	Seat seatClean = new Seat();	
	User user = new User("testUser", "test", "User", "testUser@email.com", "Admin", "test");
	@BeforeEach
	void setUp() throws Exception {
		this.seatClean.setCapacity(3);
		this.seatClean.setxPos(200);
		this.seatClean.setyPos(300);
		this.seatClean.setCleanStatus("clean");
		this.seatClean.setId(1);
		
	}

	/**
	 * This test checks for if the clean status is actually
	 * working and setting it correctly**/
	@Test
	void seatTest() {
		assertEquals("clean",seatClean.getCleanStatus());
	}
	
	@Test
	void checkCleanTest() {
		assertTrue(seatClean.checkCleanSeat());
	}
	
	@Test
	void checkCleanTestNotPass() {
		seatClean.setCleanStatus("Dirty");
		assertFalse(seatClean.checkCleanSeat());
	}
	
	/**
	 * This method checks for the roles of each of the users and 
	 * which then will be send to the front end*/
	@Test
	void checkUserTest(){
		assertEquals("testUser", user.getUserName());
	}
	
	@Test 
	void checkIfAdmin(){
		assertTrue(user.checkIfAdmin());
	}
	
	@Test
	void checkIfAdminNotPass() {
		user.setType("Employee");
		assertFalse(user.checkIfAdmin());
	}
}
