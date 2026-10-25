package com.example.InventoryManagement.Helpers;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class GetCurrentUsername {
	public String getCurrentUsername() {
	    Authentication authentication =
	            SecurityContextHolder.getContext().getAuthentication();

	    if (authentication == null || !authentication.isAuthenticated()) {
	        return "SYSTEM";
	    }

	    return authentication.getName();
	}

}
