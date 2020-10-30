package com.csis3275.project.SASRestaurantReservation.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.csis3275.project.SASRestaurantReservation.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

}
