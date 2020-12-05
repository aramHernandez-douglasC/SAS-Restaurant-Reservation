package com.csis3275.project.SASRestaurantReservation.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.csis3275.project.SASRestaurantReservation.model.Role;
import com.csis3275.project.SASRestaurantReservation.model.RoleName;
 

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName roleName);
}