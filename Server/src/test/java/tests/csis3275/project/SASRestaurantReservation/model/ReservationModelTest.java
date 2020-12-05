package tests.csis3275.project.SASRestaurantReservation.model;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Date;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.csis3275.project.SASRestaurantReservation.model.Reservation;


class ReservationModelTest {
	
	
	
	Reservation testRes = new Reservation();
	String reservationTime = "2020/10/8";

	
	@BeforeEach
	void setUp() throws Exception {
		this.testRes.setCustomerName("Phil");
		this.testRes.setCustomerEmail("Phil@gmail.com");
		this.testRes.setReservationTime(reservationTime);
		this.testRes.setNumOfPeople(2);
		
	}

	@Test
	void testCustomerName() {
		assertEquals("Phil", testRes.getCustomerName());
	}
	
	@Test
	void decideIfBigTableTest() {
		assertTrue(testRes.needBigTable(10));
		
		}
	@Test
	void decideIfBigNotPassTest() {
		assertFalse(testRes.needBigTable(3));
	}

}
