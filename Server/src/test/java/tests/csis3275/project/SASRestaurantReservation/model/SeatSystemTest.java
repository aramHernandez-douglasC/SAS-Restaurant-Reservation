package tests.csis3275.project.SASRestaurantReservation.model;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.csis3275.project.SASRestaurantReservation.controller.SeatController;

class SeatSystemTest {

	@Autowired
	private WebApplicationContext appContext;
	private MockMvc mock;
	
	@BeforeEach
	void setUp() {
		 this.mock = MockMvcBuilders.webAppContextSetup(appContext).build();
	}
//	
//	@Test
//	void getAllTest() throws Exception{
//		 mock.perform(
//			        //Controller
//				 post("/seats")			        
//			        .andExpect(status().isOk()));
//			        
//	}

}
