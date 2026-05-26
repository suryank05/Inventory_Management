package com.example.InventoryManagement.Entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DeletedInventoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Long originalId;

    private String itemName;
    private String description;
    private Integer quantity;
    private BigDecimal price;

    private LocalDateTime createdAt;   
    private LocalDateTime updatedAt;

    @Column(nullable = false)
    private LocalDateTime deletedAt;  
}