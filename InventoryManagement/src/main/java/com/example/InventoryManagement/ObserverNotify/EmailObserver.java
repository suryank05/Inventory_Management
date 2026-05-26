package com.example.InventoryManagement.ObserverNotify;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
public class EmailObserver implements Observer {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${app.mail.recipient}")
    private String recipientEmail;

    @Override
    public void update(String eventType, String productName) {
        // Only send email on DELETE — ignore everything else
    	System.out.println("this is the emailObserver");
        if (!eventType.equalsIgnoreCase("Delete")) {
            return;
        }

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipientEmail);
        message.setSubject("Inventory Item Deleted: " + productName);
        message.setText(
            "Hello Admin,\n\n" +
            "The product \"" + productName + "\" has been deleted from the inventory.\n\n" +
            "Please review if this was intentional.\n\n" +
            "- Inventory Management System"
        );

        mailSender.send(message);
        System.out.println("Email sent for deletion of: " + productName);
    }
}
