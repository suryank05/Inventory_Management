package com.example.InventoryManagement.Controller;

import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.InventoryManagement.DTO.ApiResponse;
import com.example.InventoryManagement.DTO.UserRequest;
import com.example.InventoryManagement.DTO.UserResponse;
import com.example.InventoryManagement.Service.UserService;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class UserController {

	private final UserService service;

	@GetMapping("/get")
	public ResponseEntity<ApiResponse<List<UserResponse>>> getUsers() {
		return ResponseEntity.ok(ApiResponse.ok(service.getAll()));
	}

	@PostMapping("/add")
	public ResponseEntity<ApiResponse<UserResponse>> addUser(@Valid @RequestBody UserRequest user) {
		return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok(service.createUser(user)));
	}

	@PostMapping("/upload-excel")
	public ResponseEntity<ApiResponse<Void>> uploadExcel(@RequestParam("file") MultipartFile file) {
		service.importUsersFromExcel(file);
		return ResponseEntity.ok(ApiResponse.ok("Users uploaded successfully", null));
	}

	@PutMapping("/update")
	public ResponseEntity<ApiResponse<UserResponse>> updateUser(@Valid @RequestBody UserRequest user) {
		return ResponseEntity.ok(ApiResponse.ok(service.updateUser(user)));
	}

	@DeleteMapping("/delete")
	public ResponseEntity<ApiResponse<Void>> deleteUser(@RequestParam String email) {
		service.deleteUser(email);
		return ResponseEntity.ok(ApiResponse.ok("User deleted", null));
	}

	@GetMapping("/download-template")
	public void downloadTemplate(HttpServletResponse response) throws IOException {
		service.generateExcelTemplate(response);
	}
}
