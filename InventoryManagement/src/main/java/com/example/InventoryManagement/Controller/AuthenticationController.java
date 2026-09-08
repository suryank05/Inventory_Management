package com.example.InventoryManagement.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.InventoryManagement.DTO.ApiResponse;
import com.example.InventoryManagement.DTO.RefreshTokenRequest;
import com.example.InventoryManagement.IO.AuthenticationRequest;
import com.example.InventoryManagement.IO.AuthenticationResponse;
import com.example.InventoryManagement.IO.RegisterRequest;
import com.example.InventoryManagement.Service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

	private final AuthService authService;

	@PostMapping("/login")
	public ResponseEntity<ApiResponse<AuthenticationResponse>> login(
			@Valid @RequestBody AuthenticationRequest request) {
		log.debug("Login attempt for {}", request.getEmail());
		return ResponseEntity.ok(ApiResponse.ok(authService.login(request)));
	}

	@PostMapping("/register")
	public ResponseEntity<ApiResponse<Void>> register(@Valid @RequestBody RegisterRequest user) {
		authService.register(user);
		return ResponseEntity.ok(ApiResponse.ok("User registered successfully", null));
	}

	@PostMapping("/refresh")
	public ResponseEntity<ApiResponse<AuthenticationResponse>> refresh(
			@Valid @RequestBody RefreshTokenRequest request) {
		return ResponseEntity.ok(ApiResponse.ok(authService.refresh(request.getRefreshToken())));
	}

	@PostMapping("/logout")
	public ResponseEntity<ApiResponse<Void>> logout(@Valid @RequestBody RefreshTokenRequest request) {
		authService.logout(request.getRefreshToken());
		return ResponseEntity.ok(ApiResponse.ok("Logged out", null));
	}
}
