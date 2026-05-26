package com.example.InventoryManagement.Security;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.InventoryManagement.Entity.User;
import com.example.InventoryManagement.Repository.UserRepo;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepo userRepository;

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

    	 User user = userRepository.findByEmail(email)
    		        .orElseThrow(() ->
    		            new UsernameNotFoundException("User not found: " + email));

    	
    	return new org.springframework.security.core.userdetails.User(
    	        user.getEmail(),
    	        user.getPassword(),
    	        List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole()))
    	    );
    }
    
    
}
