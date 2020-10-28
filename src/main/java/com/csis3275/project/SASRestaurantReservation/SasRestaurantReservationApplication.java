package com.csis3275.project.SASRestaurantReservation;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
public class SasRestaurantReservationApplication {
	public static void main(String[] args) {
		SpringApplication.run(SasRestaurantReservationApplication.class, args);
	}
}
