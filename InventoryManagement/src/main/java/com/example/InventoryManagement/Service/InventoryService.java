package com.example.InventoryManagement.Service;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

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
import com.example.InventoryManagement.Entity.LedgerEntity;
import com.example.InventoryManagement.Helpers.GetCurrentUsername;
import com.example.InventoryManagement.Mapper.DtoMapper;
import com.example.InventoryManagement.ObserverNotify.Observer;
import com.example.InventoryManagement.Repository.DeletedInventoryRepo;
import com.example.InventoryManagement.Repository.InventoryRepo;
import com.example.InventoryManagement.Repository.LedgerInventoryRepo;

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
	
	private final LedgerInventoryRepo ledger;
	
	private final GetCurrentUsername userName;
	
	private void saveLedger(Integer quantityBefore,
       Integer quantityAfter,
            String description) {
		
		LedgerEntity leg = LedgerEntity.builder()
		.userName(userName.getCurrentUsername())
		.quantityBefore(quantityBefore)
		.quantityAfter(quantityAfter)
		.actionDone(description)
		.build();
		
		ledger.save(leg);
		}
	
	

	public List<InventoryItemResponse> getAllItems() {
		LedgerEntity leg = LedgerEntity.builder()
		        .userName(userName.getCurrentUsername())
		        .quantityBefore(null)
		        .quantityAfter(null)
		        .actionDone("Listed_Inventory")
		        .build();

		ledger.save(leg);
		return inventory.findAll().stream().map(DtoMapper::toInventoryResponse).toList();
	}

	public List<DeletedInventoryResponse> getAllDeletedItems() {
		LedgerEntity leg = LedgerEntity.builder()
		        .userName(userName.getCurrentUsername())
		        .quantityBefore(null)
		        .quantityAfter(null)
		        .actionDone("Viewed_Deleted_Items")
		        .build();
		
		ledger.save(leg);
		return deleted.findAllByOrderByDeletedAtDesc().stream().map(DtoMapper::toDeletedResponse).toList();
	}
	
	@Transactional
	public InventoryItemResponse addItem(InventoryItemRequest item) {
		InventoryItemEntity saved = inventory.save(DtoMapper.toInventoryEntity(item));
		
		LedgerEntity leg = LedgerEntity.builder()
		        .userName(userName.getCurrentUsername())
		        .quantityBefore(0)
		        .quantityAfter(saved.getQuantity())
		        .actionDone("Added_Item wiht the name as "+saved.getItemName())
		        .build();
		
		ledger.save(leg);
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
	            .orElseThrow(() ->
	                    new EntityNotFoundException("Inventory item not found"));

	    String oldName = item.getItemName();
	    Integer quantityBefore = item.getQuantity();
	    Integer quantityAfter = quantityBefore;

	    StringBuilder description = new StringBuilder();
	    description.append("Updated inventory item '")
	            .append(oldName)
	            .append("': ");

	    boolean changed = false;

	    if (updateItem.getDescription() != null
	            && !updateItem.getDescription().equals(item.getDescription())) {

	        description.append("Description changed from '")
	                .append(item.getDescription())
	                .append("' to '")
	                .append(updateItem.getDescription())
	                .append("'; ");

	        item.setDescription(updateItem.getDescription());
	        changed = true;
	    }

	    if (updateItem.getPrice() != null
	            && !updateItem.getPrice().equals(item.getPrice())) {

	        description.append("Price changed from '")
	                .append(item.getPrice())
	                .append("' to '")
	                .append(updateItem.getPrice())
	                .append("'; ");

	        item.setPrice(updateItem.getPrice());
	        changed = true;
	    }

	    if (updateItem.getQuantity() != null
	            && !updateItem.getQuantity().equals(quantityBefore)) {

	        quantityAfter = updateItem.getQuantity();

	        description.append("Quantity changed from ")
	                .append(quantityBefore)
	                .append(" to ")
	                .append(quantityAfter)
	                .append("; ");

	        item.setQuantity(quantityAfter);
	        changed = true;
	    }

	    if (updateItem.getItemName() != null
	            && !updateItem.getItemName().equals(item.getItemName())) {

	        description.append("Name changed from '")
	                .append(item.getItemName())
	                .append("' to '")
	                .append(updateItem.getItemName())
	                .append("'; ");

	        item.setItemName(updateItem.getItemName());
	        changed = true;
	    }

	    if (changed) {
	        InventoryItemEntity saved = inventory.save(item);

	        if (quantityBefore != null && !quantityBefore.equals(quantityAfter)) {
	            saveLedger(
	                    quantityBefore,
	                    quantityAfter,
	                    description.toString()
	            );
	        } else {
	            saveLedger(
	                    null,
	                    null,
	                    description.toString()
	            );
	        }

	        notifyObserver("UPDATED", saved.getItemName());

	        return DtoMapper.toInventoryResponse(saved);
	    }

	    return DtoMapper.toInventoryResponse(item);
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
		
		LedgerEntity leg = LedgerEntity.builder()
		        .userName(getCurrentUsername())
		        .quantityBefore(null)
		        .quantityAfter(null)
		        .actionDone("Deleted item '" + item.getItemName()
		                + "' with quantity " + item.getQuantity())
		        .build();

		ledger.save(leg);
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
		InventoryItemEntity saved = inventory.save(restored);
		deleted.deleteById(deletedRecordId);
		
		LedgerEntity leg = LedgerEntity.builder()
		        .userName(userName.getCurrentUsername())
		        .quantityBefore(null)
		        .quantityAfter(null)
		        .actionDone("Restored_Item with the name "+snapshot.getItemName()+" with quantity "+snapshot.getQuantity())
		        .build();
		
		ledger.save(leg);
		return DtoMapper.toInventoryResponse(saved);
	}

	public Page<InventoryItemResponse> getItemPaginated(int page, int size) {
		Pageable pg = PageRequest.of(page, size);
		return inventory.findAll(pg).map(DtoMapper::toInventoryResponse);
	}
}
