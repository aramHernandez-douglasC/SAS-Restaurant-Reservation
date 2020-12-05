package tests.csis3275.project.SASRestaurantReservation.model;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.csis3275.project.SASRestaurantReservation.model.MenuItem;

class MenuItemModelTest {
	
	MenuItem menuItem = new MenuItem();
	
	@BeforeEach
	void setUp() throws Exception {
		this.menuItem.setItemName("Baby Back Ribs");
		this.menuItem.setItemPrice("19.49");
	}

	@Test
	void CheckItemNameTest() {
		assertEquals("Baby Back Ribs", menuItem.getItemName());
	}
	
	@Test
	void CheckItemNameTestFail() {
		assertNotEquals("Pork Rinds", menuItem.getItemName());
	}

}
