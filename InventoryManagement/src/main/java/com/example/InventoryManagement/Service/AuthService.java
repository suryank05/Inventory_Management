package com.example.InventoryManagement.Service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.InventoryManagement.Entity.RefreshToken;
import com.example.InventoryManagement.Entity.User;
import com.example.InventoryManagement.Exception.ResourceNotFoundException;
import com.example.InventoryManagement.IO.AuthenticationRequest;
import com.example.InventoryManagement.IO.AuthenticationResponse;
import com.example.InventoryManagement.IO.RegisterRequest;
import com.example.InventoryManagement.Repository.UserRepo;
import com.example.InventoryManagement.Security.CustomUserDetails;
import com.example.InventoryManagement.Security.CustomUserDetailsService;
import com.example.InventoryManagement.Security.JwtUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

	private final AuthenticationManager authenticationManager;
	private final CustomUserDetailsService userDetailsService;
	private final JwtUtil jwtUtil;
	private final UserService userService;
	private final UserRepo userRepo;
	private final RefreshTokenService refreshTokenService;

	public AuthenticationResponse login(AuthenticationRequest request) {
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

		UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
		User user = userRepo.findByEmail(request.getEmail())
				.orElseThrow(() -> new ResourceNotFoundException("User not found"));
		RefreshToken refreshToken = refreshTokenService.issue(user);
		return toResponse(userDetails, refreshToken.getToken());
	}

	public void register(RegisterRequest request) {
		userService.registerUser(request);
	}

	@Transactional
	public AuthenticationResponse refresh(String refreshToken) {
		RefreshToken rotated = refreshTokenService.rotate(refreshToken);
		UserDetails userDetails = new CustomUserDetails(rotated.getUser());
		return toResponse(userDetails, rotated.getToken());
	}

	public void logout(String refreshToken) {
		refreshTokenService.revoke(refreshToken);
	}

	private AuthenticationResponse toResponse(UserDetails userDetails, String refreshToken) {
		String accessToken = jwtUtil.generateAccessToken(userDetails);
		return AuthenticationResponse.builder()
				.token(accessToken)
				.refreshToken(refreshToken)
				.tokenType("Bearer")
				.expiresIn(jwtUtil.getAccessExpirationMs() / 1000)
				.build();
	}
}
