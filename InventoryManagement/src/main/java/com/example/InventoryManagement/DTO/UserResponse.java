package com.example.InventoryManagement.DTO;

import com.example.InventoryManagement.Entity.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
	private Long id;
	private String userName;
	private String email;
	private Role role;
}
