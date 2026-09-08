package com.example.InventoryManagement.DTO;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InventoryItemResponse {
	private Long id;
	private String itemName;
	private String description;
	private Integer quantity;
	private BigDecimal price;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
}
