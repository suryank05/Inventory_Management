package com.example.InventoryManagement.ObserverNotify;

import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class EmailObserver implements Observer {

	private final ObjectProvider<JavaMailSender> mailSender;
	@Value("${app.mail.recipient:}")
	private String recipientEmail;

	@Override
	public void update(String eventType, String productName) {
		if (!eventType.equalsIgnoreCase("Delete")) {
			return;
		}

		JavaMailSender sender = mailSender.getIfAvailable();
		if (sender == null || recipientEmail == null || recipientEmail.isBlank()) {
			log.warn("Skipping deletion email; mail is not configured");
			return;
		}

		java.util.concurrent.CompletableFuture.runAsync(() -> {
			try {
				SimpleMailMessage message = new SimpleMailMessage();
				message.setTo(recipientEmail);
				message.setSubject("Inventory Item Deleted: " + productName);
				message.setText(
						"Hello Admin,\n\nThe product \"" + productName
								+ "\" has been deleted from the inventory.\n\nPlease review if this was intentional.\n\n- Inventory Management System");
				sender.send(message);
				log.info("Deletion email sent for {}", productName);
			} catch (Exception e) {
				log.warn("Deletion email failed for {}: {}", productName, e.getMessage());
			}
		});
	}
}
