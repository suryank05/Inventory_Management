package com.example.InventoryManagement.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.InventoryManagement.IO.AuthenticationRequest;
import com.example.InventoryManagement.IO.AuthenticationResponse;
import com.example.InventoryManagement.IO.RegisterRequest;
import com.example.InventoryManagement.Security.CustomUserDetailsService;
import com.example.InventoryManagement.Security.JwtUtil;
import com.example.InventoryManagement.Service.UserService;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/auth")
public class AuthenticationController {
	@Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private UserService service;
    
   
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest request) {
    	System.out.println(">>> Login request received for email: " + request.getEmail());

        try {
            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    );

            authenticationManager.authenticate(authToken);
            System.out.println(">>> Authentication successful");

            UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());

            String token = jwtUtil.generateToken(userDetails);

            return ResponseEntity.ok(new AuthenticationResponse(token));

        } catch (Exception e) {
            System.out.println("!!! Authentication failed: " + e.getMessage());
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest user) {
        // Encode password
//        user.setPassword(PasswordEncoder.encode(user.getPassword()));

        // Save user
        service.registerUser(user);
		
		return ResponseEntity.ok("User registered successfully");
	

    }
    
}
