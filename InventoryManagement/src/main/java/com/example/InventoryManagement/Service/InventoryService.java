package com.example.InventoryManagement.Service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.example.InventoryManagement.Entity.DeletedInventoryEntity;
import com.example.InventoryManagement.Entity.InventoryItemEntity;
import com.example.InventoryManagement.ObserverNotify.EmailObserver;
import com.example.InventoryManagement.ObserverNotify.Observer;
import com.example.InventoryManagement.Repository.DeletedInventoryRepo;
import com.example.InventoryManagement.Repository.InventoryRepo;

import graphql.com.google.common.base.Optional;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class InventoryService {
	
	@Autowired
	InventoryRepo inventory;
	
	@Autowired
    List<Observer> observers;
	
	@Autowired
	DeletedInventoryRepo deleted;

	public List<InventoryItemEntity> getAllItems() {
		// TODO Auto-generated method stub
		System.out.println("The request is in the getAllItems");
		return inventory.findAll();
	}
	

	public List<DeletedInventoryEntity> getAllDeletedItems() {
	    return deleted.findAll(); 
	}
	

	public InventoryItemEntity addItem(InventoryItemEntity item) {
		return inventory.save(item);
	}
	
	public void NotifyObserver(String eventType, String productName) {
		for(Observer o:observers) {
			o.update(eventType,productName);
		}
	}

	public InventoryItemEntity updateItem(InventoryItemEntity updateItem) {
			InventoryItemEntity item=inventory.findById(updateItem.getId()).orElseThrow(()->new EntityNotFoundException("not found the entry"));
			if(updateItem.getDescription()!=null) {
				item.setDescription(updateItem.getDescription());
			}
			
			if(updateItem.getPrice()!=null) {
				item.setPrice(updateItem.getPrice());
			}
			
			if(updateItem.getQuantity()!=null) {
				item.setQuantity(updateItem.getQuantity());
			}
			
			if(updateItem.getItemName()!=null) {
				item.setItemName(updateItem.getItemName());
			}
			InventoryItemEntity saved = inventory.save(item);
			NotifyObserver("UPDATED", saved.getItemName());
			return saved;
	}

	@Transactional
	public void DeleteItem(long name) {
		System.out.println("the request is in the service");
		
		InventoryItemEntity item=inventory.findById(name).orElseThrow(()-> new EntityNotFoundException());	
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
		
		
		
		inventory.deleteById(name);
		NotifyObserver("Delete",item.getItemName());
		System.out.println("the request has left the service");
		
	}

	@Transactional
    public InventoryItemEntity restoreItem(long deletedRecordId) {
        DeletedInventoryEntity snapshot = deleted.findById(deletedRecordId)
                .orElseThrow(() -> new EntityNotFoundException("Deleted record not found"));

        InventoryItemEntity restored = InventoryItemEntity.builder()
                // .id(snapshot.getOriginalId())  <--- DELETE THIS LINE!
                .itemName(snapshot.getItemName())
                .Description(snapshot.getDescription())
                .Quantity(snapshot.getQuantity())
                .Price(snapshot.getPrice())
                .createdAt(snapshot.getCreatedAt())
                .build();

        inventory.save(restored);
        System.out.println("The request is in the restoreItem");

        deleted.deleteById(deletedRecordId);

        // NotifyObserver("RESTORED", restored.getItemName()); // Leave this commented out for now
        return restored;
    }
	
	public Page<InventoryItemEntity> getItemPaginated(int page,int size){
		Pageable pg=PageRequest.of(page,size);
		
		return inventory.findAll(pg);
		
	}
	
	

}
