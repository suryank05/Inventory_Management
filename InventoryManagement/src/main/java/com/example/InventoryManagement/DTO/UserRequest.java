package com.example.InventoryManagement.DTO;

import com.example.InventoryManagement.Entity.Role;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserRequest {

	@NotBlank(message = "Username is required")
	@Size(min = 2, max = 80)
	private String userName;

	@NotBlank(message = "Email is required")
	@Email
	private String email;

	@Size(min = 8, max = 72, message = "Password must be between 8 and 72 characters")
	private String password;

	private Role role;
}
