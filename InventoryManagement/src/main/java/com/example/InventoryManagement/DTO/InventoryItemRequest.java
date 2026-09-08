package com.example.InventoryManagement.DTO;

import java.math.BigDecimal;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class InventoryItemRequest {

	private Long id;

	@NotBlank(message = "Item name is required")
	private String itemName;

	private String description;

	@NotNull
	@Min(0)
	private Integer quantity;

	@NotNull
	@DecimalMin(value = "0.0", inclusive = true)
	private BigDecimal price;
}
