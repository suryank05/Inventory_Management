package com.example.InventoryManagement.Mapper;

import com.example.InventoryManagement.DTO.DeletedInventoryResponse;
import com.example.InventoryManagement.DTO.InventoryItemRequest;
import com.example.InventoryManagement.DTO.InventoryItemResponse;
import com.example.InventoryManagement.DTO.UserResponse;
import com.example.InventoryManagement.Entity.DeletedInventoryEntity;
import com.example.InventoryManagement.Entity.InventoryItemEntity;
import com.example.InventoryManagement.Entity.User;

public final class DtoMapper {

	private DtoMapper() {
	}

	public static UserResponse toUserResponse(User user) {
		return UserResponse.builder()
				.id(user.getId())
				.userName(user.getUserName())
				.email(user.getEmail())
				.role(user.getRole())
				.build();
	}

	public static InventoryItemResponse toInventoryResponse(InventoryItemEntity item) {
		return InventoryItemResponse.builder()
				.id(item.getId())
				.itemName(item.getItemName())
				.description(item.getDescription())
				.quantity(item.getQuantity())
				.price(item.getPrice())
				.createdAt(item.getCreatedAt())
				.updatedAt(item.getUpdatedAt())
				.build();
	}

	public static InventoryItemEntity toInventoryEntity(InventoryItemRequest request) {
		return InventoryItemEntity.builder()
				.id(request.getId())
				.itemName(request.getItemName())
				.description(request.getDescription())
				.quantity(request.getQuantity())
				.price(request.getPrice())
				.build();
	}

	public static DeletedInventoryResponse toDeletedResponse(DeletedInventoryEntity entity) {
		return DeletedInventoryResponse.builder()
				.id(entity.getId())
				.originalId(entity.getOriginalId())
				.itemName(entity.getItemName())
				.description(entity.getDescription())
				.quantity(entity.getQuantity())
				.price(entity.getPrice())
				.createdAt(entity.getCreatedAt())
				.updatedAt(entity.getUpdatedAt())
				.deletedAt(entity.getDeletedAt())
				.build();
	}
}
