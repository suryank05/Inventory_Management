package com.example.InventoryManagement.ObserverNotify;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

public class Inventory implements Subject{
	List<Observer> observers=new ArrayList<>();
	
	@Autowired
	Observer ob;

	@Override
	public void addObserver(Observer o) {
		// TODO Auto-generated method stub
		observers.add(o);
		
	}

	@Override
	public void removeObserver(Observer o) {
		// TODO Auto-generated method stub
		observers.remove(o);
	}

	@Override
	public void notifyObservers(String eventType, String productName) {
		for(Observer o:observers) {
			o.update(eventType, productName);
		}
		
	}
	
	

}
