package com.example.InventoryManagement.DTO;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RefreshTokenRequest {
	@NotBlank
	private String refreshToken;
}
