package com.csis3275.project.SASRestaurantReservation.DAO;

import com.csis3275.project.SASRestaurantReservation.model.Seat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class OrderRequest {
	private Seat seat;

	
	
}
