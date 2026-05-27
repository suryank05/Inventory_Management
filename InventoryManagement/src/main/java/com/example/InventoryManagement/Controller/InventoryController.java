package com.example.InventoryManagement.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.InventoryManagement.Entity.DeletedInventoryEntity;
import com.example.InventoryManagement.Entity.InventoryItemEntity;
import com.example.InventoryManagement.Repository.DeletedInventoryRepo;
import com.example.InventoryManagement.Service.InventoryService;

import jakarta.persistence.EntityNotFoundException;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/inventory")
public class InventoryController {
	@Autowired
	InventoryService service;
	
	
	@GetMapping("/getall")
	private ResponseEntity<Page<InventoryItemEntity>> getAll(@RequestParam(defaultValue="0") int page,@RequestParam(defaultValue="9") int size){
		Page<InventoryItemEntity> itemPage = service.getItemPaginated(page, size);
	    
	    if(itemPage.isEmpty()) {
	        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
	    }
	    return ResponseEntity.status(HttpStatus.OK).body(itemPage);
	}
	
	@PostMapping("/add")
	private ResponseEntity<InventoryItemEntity> addItem(@RequestBody InventoryItemEntity item){
		InventoryItemEntity updated =service.addItem(item);
		
		return ResponseEntity.ok(updated);
	}
	
	@PutMapping("/update")
	private ResponseEntity<InventoryItemEntity> updateItem(@RequestBody InventoryItemEntity updateItem){
		
		InventoryItemEntity updated=service.updateItem(updateItem);
		
//		if(ans!=null) {
//			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Updated Successfully");
//		}
//		else {
//			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Not Updated Successfully");
//		}
		
		return ResponseEntity.ok(updated);

		
	}
	
	@GetMapping("/deleted")
	public ResponseEntity<List<DeletedInventoryEntity>> getDeletedItems() {
		// This assumes you have created a method in your InventoryService called getAllDeletedItems()
		// which just does `return deletedRepository.findAll();`
		List<DeletedInventoryEntity> deletedItems = service.getAllDeletedItems();
		
		System.out.println("The request is in the getDeletedItems");
		
		if(deletedItems.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(deletedItems);
	}
	
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Void> deleteItem(@PathVariable long id){
		service.DeleteItem(id);
		System.out.println("the request is in the controller");
		return ResponseEntity.noContent().build();
		
	}
	
	@PutMapping("/restore/{id}")
    public ResponseEntity<InventoryItemEntity> restoreDeletedItem(@PathVariable("id") long id) {
        try {
            // Call the service method you already wrote
            InventoryItemEntity restoredItem = service.restoreItem(id);
    		System.out.println("The request is in the restoreDeletedItem");
            return ResponseEntity.status(HttpStatus.OK).body(restoredItem);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
        	e.printStackTrace(); 
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
	 
	
}
