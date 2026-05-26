package com.example.InventoryManagement.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.InventoryManagement.Entity.User;
import com.example.InventoryManagement.Service.UserService;

import io.jsonwebtoken.io.IOException;
import jakarta.servlet.http.HttpServletResponse;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/user")
public class UserController {
	@Autowired
	UserService service;
	
	@GetMapping("/get")
	private ResponseEntity<List<User>> getUsers(){
		List<User> l=service.getAll();
		
		if(l.isEmpty()) {
			return ResponseEntity.noContent().build();
		}
		else {
			return ResponseEntity.ok(l);
		}
		
	}
	
	@PostMapping("/add")
	private ResponseEntity<User> addUser(@RequestBody User user){
		User u=service.createUser(user);
		
		return ResponseEntity.ok(u);
	}
	
	@PostMapping("/upload-excel")
	public ResponseEntity<String> uploadExcel(@RequestParam("file") MultipartFile file) {
		System.out.println("THe excel upload request is in the controller");
		 if (file.isEmpty()) {
		        return ResponseEntity.badRequest().body("File is empty");
		    }

		    try {
		        service.importUsersFromExcel(file);
		        return ResponseEntity.ok("Users uploaded successfully");
		    } catch (Exception e) {
		        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
		                .body("Upload failed: " + e.getMessage());
		 }
	}
	
	@PutMapping("/update")
	private ResponseEntity<User> updateUser(@RequestBody User user){
		User u=service.updateUser(user);
		
		return ResponseEntity.ok(u);
	}
	                                  
	@DeleteMapping("/delete")
	private ResponseEntity<Void> deleteUser(@RequestParam String email){
		service.deleteUser(email);
		
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping("/download-template")
	@PreAuthorize("has_Role('ADMIN')")
	public void downloadTemplate(HttpServletResponse response) throws IOException, java.io.IOException {
	    service.generateExcelTemplate(response);
	}
}
