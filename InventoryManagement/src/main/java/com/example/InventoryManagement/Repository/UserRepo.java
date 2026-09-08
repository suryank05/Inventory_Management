package com.example.InventoryManagement.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.InventoryManagement.Entity.User;

public interface UserRepo extends JpaRepository<User, Long> {
	void deleteByEmail(String email);

	Optional<User> findByUserName(String name);

	Optional<User> findByEmail(String email);

	boolean existsByEmail(String email);
}
