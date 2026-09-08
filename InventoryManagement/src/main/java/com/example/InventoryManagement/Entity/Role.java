package com.example.InventoryManagement.Entity;

public enum Role {
	ADMIN,
	EMPLOYEE;

	public static Role fromString(String value) {
		if (value == null || value.isBlank()) {
			return EMPLOYEE;
		}
		try {
			return Role.valueOf(value.trim().toUpperCase());
		} catch (IllegalArgumentException ex) {
			return EMPLOYEE;
		}
	}
}
