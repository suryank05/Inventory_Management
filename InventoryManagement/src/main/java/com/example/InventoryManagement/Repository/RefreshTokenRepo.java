package com.example.InventoryManagement.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.InventoryManagement.Entity.RefreshToken;
import com.example.InventoryManagement.Entity.User;

public interface RefreshTokenRepo extends JpaRepository<RefreshToken, Long> {
	Optional<RefreshToken> findByToken(String token);

	void deleteByUser(User user);
}
