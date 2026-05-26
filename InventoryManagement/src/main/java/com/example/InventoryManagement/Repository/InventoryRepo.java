package com.example.InventoryManagement.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.InventoryManagement.Entity.InventoryItemEntity;

public interface InventoryRepo extends JpaRepository<InventoryItemEntity, Long>{
	void deleteByItemName(String itemName);
}
