package com.example.InventoryManagement.ObserverNotify;

import org.springframework.stereotype.Component;

@Component
public class AdminObserver implements Observer{
	
	String Name="Admin";
	


	@Override
	public void update(String eventType, String productName) {
		// TODO Auto-generated method stub
		System.out.println("The product "+productName+" has been "+eventType);
		
	}

}
