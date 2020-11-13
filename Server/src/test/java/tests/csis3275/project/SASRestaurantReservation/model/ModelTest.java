package tests.csis3275.project.SASRestaurantReservation.model;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.csis3275.project.SASRestaurantReservation.model.Seat;
import com.csis3275.project.SASRestaurantReservation.model.User;
import com.csis3275.project.SASRestaurantReservation.controller.UserController;

class ModelTest {

	
	Seat seatClean = new Seat(10, 100, 200, 5, "Clean", "2");
	User user = new User("testUser", "test", "User", "testUser@email.com", "Admin", "test");
	@BeforeEach
	void setUp() throws Exception {
		
		
		
	}

	@Test
	void seatTest() {
		assertEquals("Clean",seatClean.getCleanStatus());
	}
	
	@Test
	void checkCleanTest() {
		assertTrue(seatClean.checkCleanSeat());
	}
	
	@Test
	void checkCleanTestNotPass() {
		seatClean.setCleanStatus("Dirty");
		assertTrue(seatClean.checkCleanSeat());
	}
	
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
		assertTrue(user.checkIfAdmin());
	}
}
