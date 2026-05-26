package com.example.InventoryManagement.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.InventoryManagement.Entity.User;
import com.example.InventoryManagement.IO.RegisterRequest;

public interface UserRepo extends JpaRepository<User, Long>{
	void deleteByuserName(String userName);
	
	void deleteByemail(String email);
	
	Optional<User> findByuserName(String name);
	
	Optional<User> findByEmail(String email);
	
}
