package com.example.InventoryManagement.ObserverNotify;

public interface Subject {
	void addObserver(Observer o);
	void removeObserver(Observer o);
	void notifyObservers(String eventType, String productName);

}
