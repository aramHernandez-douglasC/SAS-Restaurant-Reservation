package com.csis3275.project.SASRestaurantReservation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.csis3275.project.SASRestaurantReservation.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {
	
	@Modifying
	@Transactional
	@Query(value = "Delete from Order_Item Where ORDER_ITEM_ID =:id", nativeQuery = true)
	public void deleteItem(@Param("id")int itemId);

}
