package com.example.InventoryManagement.Service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import com.example.InventoryManagement.DTO.InventoryItemRequest;
import com.example.InventoryManagement.DTO.InventoryItemResponse;
import com.example.InventoryManagement.Entity.DeletedInventoryEntity;
import com.example.InventoryManagement.Entity.InventoryItemEntity;
import com.example.InventoryManagement.ObserverNotify.Observer;
import com.example.InventoryManagement.Repository.DeletedInventoryRepo;
import com.example.InventoryManagement.Repository.InventoryRepo;

import jakarta.persistence.EntityNotFoundException;

@ExtendWith(MockitoExtension.class)
class InventoryServiceTest {

	@Mock
	private InventoryRepo inventory;
	@Mock
	private DeletedInventoryRepo deleted;
	@Mock
	private Observer observer;

	private InventoryService inventoryService;

	@BeforeEach
	void setUp() {
		inventoryService = new InventoryService(inventory, List.of(observer), deleted);
	}

	@Test
	void addItemPersistsAndReturnsDto() {
		InventoryItemRequest request = new InventoryItemRequest();
		request.setItemName("Keyboard");
		request.setQuantity(4);
		request.setPrice(new BigDecimal("1200"));

		when(inventory.save(any(InventoryItemEntity.class))).thenAnswer(invocation -> {
			InventoryItemEntity entity = invocation.getArgument(0);
			entity.setId(11L);
			return entity;
		});

		InventoryItemResponse response = inventoryService.addItem(request);

		assertThat(response.getId()).isEqualTo(11L);
		assertThat(response.getItemName()).isEqualTo("Keyboard");
	}

	@Test
	void deleteItemCopiesSnapshotThenRemovesLiveRow() {
		InventoryItemEntity item = InventoryItemEntity.builder()
				.id(5L)
				.itemName("Mouse")
				.quantity(2)
				.price(new BigDecimal("500"))
				.createdAt(LocalDateTime.now())
				.build();
		when(inventory.findById(5L)).thenReturn(Optional.of(item));

		inventoryService.deleteItem(5L);

		verify(deleted).save(any(DeletedInventoryEntity.class));
		verify(inventory).deleteById(5L);
		verify(observer).update("Delete", "Mouse");
	}

	@Test
	void deleteItemThrowsWhenMissing() {
		when(inventory.findById(99L)).thenReturn(Optional.empty());

		assertThatThrownBy(() -> inventoryService.deleteItem(99L))
				.isInstanceOf(EntityNotFoundException.class);
		verify(deleted, never()).save(any());
	}

	@Test
	void paginatedResultsMapToDto() {
		InventoryItemEntity item = InventoryItemEntity.builder()
				.id(1L)
				.itemName("Cable")
				.quantity(10)
				.price(new BigDecimal("20"))
				.build();
		when(inventory.findAll(any(Pageable.class))).thenReturn(new PageImpl<>(List.of(item)));

		Page<InventoryItemResponse> page = inventoryService.getItemPaginated(0, 9);

		assertThat(page.getContent()).hasSize(1);
		assertThat(page.getContent().get(0).getItemName()).isEqualTo("Cable");
	}

	@Test
	void restoreItemRecreatesLiveRecord() {
		DeletedInventoryEntity snapshot = DeletedInventoryEntity.builder()
				.id(3L)
				.itemName("Monitor")
				.quantity(1)
				.price(new BigDecimal("9000"))
				.deletedAt(LocalDateTime.now())
				.build();
		when(deleted.findById(3L)).thenReturn(Optional.of(snapshot));
		when(inventory.save(any(InventoryItemEntity.class))).thenAnswer(inv -> inv.getArgument(0));

		InventoryItemResponse restored = inventoryService.restoreItem(3L);

		assertThat(restored.getItemName()).isEqualTo("Monitor");
		verify(deleted).deleteById(3L);
		verify(inventory, never()).deleteById(anyLong());
	}
}
