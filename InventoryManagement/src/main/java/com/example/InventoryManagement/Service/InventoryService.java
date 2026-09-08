package com.example.InventoryManagement.Service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.InventoryManagement.DTO.DeletedInventoryResponse;
import com.example.InventoryManagement.DTO.InventoryItemRequest;
import com.example.InventoryManagement.DTO.InventoryItemResponse;
import com.example.InventoryManagement.Entity.DeletedInventoryEntity;
import com.example.InventoryManagement.Entity.InventoryItemEntity;
import com.example.InventoryManagement.Mapper.DtoMapper;
import com.example.InventoryManagement.ObserverNotify.Observer;
import com.example.InventoryManagement.Repository.DeletedInventoryRepo;
import com.example.InventoryManagement.Repository.InventoryRepo;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class InventoryService {

	private final InventoryRepo inventory;
	private final List<Observer> observers;
	private final DeletedInventoryRepo deleted;

	public List<InventoryItemResponse> getAllItems() {
		return inventory.findAll().stream().map(DtoMapper::toInventoryResponse).toList();
	}

	public List<DeletedInventoryResponse> getAllDeletedItems() {
		return deleted.findAllByOrderByDeletedAtDesc().stream().map(DtoMapper::toDeletedResponse).toList();
	}

	public InventoryItemResponse addItem(InventoryItemRequest item) {
		InventoryItemEntity saved = inventory.save(DtoMapper.toInventoryEntity(item));
		return DtoMapper.toInventoryResponse(saved);
	}

	public void notifyObserver(String eventType, String productName) {
		for (Observer o : observers) {
			o.update(eventType, productName);
		}
	}

	@Transactional
	public InventoryItemResponse updateItem(InventoryItemRequest updateItem) {
		if (updateItem.getId() == null) {
			throw new EntityNotFoundException("Item id is required");
		}
		InventoryItemEntity item = inventory.findById(updateItem.getId())
				.orElseThrow(() -> new EntityNotFoundException("Inventory item not found"));
		if (updateItem.getDescription() != null) {
			item.setDescription(updateItem.getDescription());
		}
		if (updateItem.getPrice() != null) {
			item.setPrice(updateItem.getPrice());
		}
		if (updateItem.getQuantity() != null) {
			item.setQuantity(updateItem.getQuantity());
		}
		if (updateItem.getItemName() != null) {
			item.setItemName(updateItem.getItemName());
		}
		InventoryItemEntity saved = inventory.save(item);
		notifyObserver("UPDATED", saved.getItemName());
		return DtoMapper.toInventoryResponse(saved);
	}

	@Transactional
	public void deleteItem(long id) {
		InventoryItemEntity item = inventory.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Inventory item not found"));
		DeletedInventoryEntity snapshot = DeletedInventoryEntity.builder()
				.originalId(item.getId())
				.itemName(item.getItemName())
				.description(item.getDescription())
				.quantity(item.getQuantity())
				.price(item.getPrice())
				.createdAt(item.getCreatedAt())
				.updatedAt(item.getUpdatedAt())
				.deletedAt(LocalDateTime.now())
				.build();
		deleted.save(snapshot);
		inventory.deleteById(id);
		notifyObserver("Delete", item.getItemName());
		log.info("Soft-deleted inventory item {}", id);
	}

	@Transactional
	public InventoryItemResponse restoreItem(long deletedRecordId) {
		DeletedInventoryEntity snapshot = deleted.findById(deletedRecordId)
				.orElseThrow(() -> new EntityNotFoundException("Deleted record not found"));

		InventoryItemEntity restored = InventoryItemEntity.builder()
				.itemName(snapshot.getItemName())
				.description(snapshot.getDescription())
				.quantity(snapshot.getQuantity())
				.price(snapshot.getPrice())
				.createdAt(snapshot.getCreatedAt())
				.build();
		inventory.save(restored);
		deleted.deleteById(deletedRecordId);
		return DtoMapper.toInventoryResponse(restored);
	}

	public Page<InventoryItemResponse> getItemPaginated(int page, int size) {
		Pageable pg = PageRequest.of(page, size);
		return inventory.findAll(pg).map(DtoMapper::toInventoryResponse);
	}
}
