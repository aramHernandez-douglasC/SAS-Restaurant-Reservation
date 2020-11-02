package com.csis3275.project.SASRestaurantReservation.repository;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.csis3275.project.SASRestaurantReservation.model.User;


@Repository
public interface UserRepository extends CrudRepository<User, Long> {
	public User findByEmail(String email);
}
