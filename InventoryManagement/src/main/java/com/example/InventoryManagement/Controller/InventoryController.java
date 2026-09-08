package com.example.InventoryManagement.Controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.InventoryManagement.DTO.ApiResponse;
import com.example.InventoryManagement.DTO.DeletedInventoryResponse;
import com.example.InventoryManagement.DTO.InventoryItemRequest;
import com.example.InventoryManagement.DTO.InventoryItemResponse;
import com.example.InventoryManagement.Service.InventoryService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/inventory")
@RequiredArgsConstructor
public class InventoryController {

	private final InventoryService service;

	@GetMapping("/getall")
	public ResponseEntity<ApiResponse<Page<InventoryItemResponse>>> getAll(
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "9") int size) {
		return ResponseEntity.ok(ApiResponse.ok(service.getItemPaginated(page, size)));
	}

	@PostMapping("/add")
	public ResponseEntity<ApiResponse<InventoryItemResponse>> addItem(
			@Valid @RequestBody InventoryItemRequest item) {
		return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok(service.addItem(item)));
	}

	@PutMapping("/update")
	public ResponseEntity<ApiResponse<InventoryItemResponse>> updateItem(
			@Valid @RequestBody InventoryItemRequest updateItem) {
		return ResponseEntity.ok(ApiResponse.ok(service.updateItem(updateItem)));
	}

	@GetMapping("/deleted")
	public ResponseEntity<ApiResponse<List<DeletedInventoryResponse>>> getDeletedItems() {
		return ResponseEntity.ok(ApiResponse.ok(service.getAllDeletedItems()));
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<ApiResponse<Void>> deleteItem(@PathVariable long id) {
		service.deleteItem(id);
		return ResponseEntity.ok(ApiResponse.ok("Item moved to recycle bin", null));
	}

	@PutMapping("/restore/{id}")
	public ResponseEntity<ApiResponse<InventoryItemResponse>> restoreDeletedItem(@PathVariable("id") long id) {
		return ResponseEntity.ok(ApiResponse.ok(service.restoreItem(id)));
	}
}
