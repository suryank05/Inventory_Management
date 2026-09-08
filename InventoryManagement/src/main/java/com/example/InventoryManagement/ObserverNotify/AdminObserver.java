package com.example.InventoryManagement.ObserverNotify;

import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class AdminObserver implements Observer {

	@Override
	public void update(String eventType, String productName) {
		log.info("Inventory event {} for product {}", eventType, productName);
	}
}
