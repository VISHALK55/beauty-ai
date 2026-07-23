package com.beautyai.notification;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.util.logging.Logger;

@Service
public class WhatsAppReviewJob {

    private static final Logger logger = Logger.getLogger(WhatsAppReviewJob.class.getName());

    /**
     * In a real production system, this method would listen to an event queue (like Amazon SQS)
     * for 'AppointmentCompleted' events. 
     * For this MVP, we simulate a cron job that checks for recently completed appointments.
     */
    @Scheduled(fixedRate = 60000) // Runs every minute for demonstration
    public void processPendingReviewRequests() {
        // Step 1: Query Database for Appointments that finished exactly 2 hours ago.
        // For demonstration, we simulate fetching an appointment for "Pihu Makeover Saloon".
        String customerPhone = "+919876543210";
        String customerName = "Aarti";
        String salonName = "Pihu Makeover Saloon";
        String salonLocation = "Bodhgaya";
        String googleMapsLink = "https://maps.google.com/?cid=987654321";
        
        boolean hasPendingRequest = checkForPendingRequests();
        
        if (hasPendingRequest) {
            // Step 2: Construct the exact localized message
            String message = String.format(
                "Hi %s! Thank you for visiting %s (%s) today. " +
                "If you loved your service, we would be incredibly grateful if you left us a quick 5-star review here: %s",
                customerName, salonName, salonLocation, googleMapsLink
            );

            // Step 3: Trigger WhatsApp Cloud API (Mocked via Logger for MVP)
            sendWhatsAppMessage(customerPhone, message);
        }
    }

    private void sendWhatsAppMessage(String phone, String message) {
        logger.info("\n=======================================================");
        logger.info("📱 [WHATSAPP API TRIGGERED]");
        logger.info("To: " + phone);
        logger.info("Message: " + message);
        logger.info("Status: DELIVERED (Mock)");
        logger.info("=======================================================\n");
    }

    private boolean checkForPendingRequests() {
        // Mock logic: randomly return true 10% of the time to simulate incoming data during testing
        return Math.random() > 0.9;
    }
}
