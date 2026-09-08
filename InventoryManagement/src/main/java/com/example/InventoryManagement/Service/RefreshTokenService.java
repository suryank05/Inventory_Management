package com.example.InventoryManagement.Service;

import java.time.Instant;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.InventoryManagement.Entity.RefreshToken;
import com.example.InventoryManagement.Entity.User;
import com.example.InventoryManagement.Exception.BadRequestException;
import com.example.InventoryManagement.Repository.RefreshTokenRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

	private final RefreshTokenRepo refreshTokenRepo;

	@Value("${app.jwt.refresh-expiration-ms}")
	private long refreshExpirationMs;

	@Transactional
	public RefreshToken issue(User user) {
		RefreshToken token = RefreshToken.builder()
				.token(UUID.randomUUID().toString())
				.user(user)
				.expiryDate(Instant.now().plusMillis(refreshExpirationMs))
				.revoked(false)
				.build();
		return refreshTokenRepo.save(token);
	}

	@Transactional
	public RefreshToken rotate(String rawToken) {
		RefreshToken existing = refreshTokenRepo.findByToken(rawToken)
				.orElseThrow(() -> new BadRequestException("Invalid refresh token"));

		if (existing.isRevoked() || existing.getExpiryDate().isBefore(Instant.now())) {
			existing.setRevoked(true);
			refreshTokenRepo.save(existing);
			throw new BadRequestException("Refresh token expired or revoked");
		}

		existing.setRevoked(true);
		refreshTokenRepo.save(existing);
		return issue(existing.getUser());
	}

	@Transactional
	public void revoke(String rawToken) {
		refreshTokenRepo.findByToken(rawToken).ifPresent(token -> {
			token.setRevoked(true);
			refreshTokenRepo.save(token);
		});
	}
}
