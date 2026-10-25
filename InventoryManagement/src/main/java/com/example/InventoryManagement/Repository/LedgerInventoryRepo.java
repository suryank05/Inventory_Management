package com.example.InventoryManagement.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.InventoryManagement.Entity.InventoryItemEntity;
import com.example.InventoryManagement.Entity.LedgerEntity;

public interface LedgerInventoryRepo extends JpaRepository<LedgerEntity, Long>{
}
