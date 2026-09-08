package com.example.InventoryManagement.Security;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

class JwtUtilTest {

	private JwtUtil jwtUtil;

	@BeforeEach
	void setUp() {
		jwtUtil = new JwtUtil("test-secret-key-which-is-at-least-32-bytes-long!!", 3_600_000);
	}

	@Test
	void generatedTokenIsValidForSameUser() {
		User user = new User("admin@example.com", "x", List.of(new SimpleGrantedAuthority("ROLE_ADMIN")));
		String token = jwtUtil.generateAccessToken(user);

		assertThat(jwtUtil.extractUsername(token)).isEqualTo("admin@example.com");
		assertThat(jwtUtil.isTokenValid(token, user)).isTrue();
	}

	@Test
	void tokenIsRejectedForDifferentUser() {
		User owner = new User("a@example.com", "x", List.of(new SimpleGrantedAuthority("ROLE_EMPLOYEE")));
		User other = new User("b@example.com", "x", List.of(new SimpleGrantedAuthority("ROLE_EMPLOYEE")));
		String token = jwtUtil.generateAccessToken(owner);

		assertThat(jwtUtil.isTokenValid(token, other)).isFalse();
	}
}
