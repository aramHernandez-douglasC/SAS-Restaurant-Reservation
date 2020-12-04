package com.csis3275.project.SASRestaurantReservation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.csis3275.project.SASRestaurantReservation.model.MenuItem;

/**
 * 
 * @author Saran
 * Repository to interact with table MENU_ITEMS.
 *
 */
@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, Integer> {

}