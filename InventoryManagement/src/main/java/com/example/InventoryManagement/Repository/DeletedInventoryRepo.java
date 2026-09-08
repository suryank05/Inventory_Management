package com.example.InventoryManagement.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.InventoryManagement.Entity.DeletedInventoryEntity;

public interface DeletedInventoryRepo extends JpaRepository<DeletedInventoryEntity, Long> {
    List<DeletedInventoryEntity> findAllByOrderByDeletedAtDesc();
}
