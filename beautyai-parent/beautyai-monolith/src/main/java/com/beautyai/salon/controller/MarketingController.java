package com.beautyai.salon.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.List;
import java.util.Map;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/v1/marketing")
@CrossOrigin(origins = "*") // For demo purposes; configure properly in prod
public class MarketingController {

    private static final Logger logger = LoggerFactory.getLogger(MarketingController.class);

    static class NuclearBlastPayload {
        private String salonId;
        private List<String> phoneNumbers;

        public String getSalonId() {
            return salonId;
        }

        public void setSalonId(String salonId) {
            this.salonId = salonId;
        }

        public List<String> getPhoneNumbers() {
            return phoneNumbers;
        }

        public void setPhoneNumbers(List<String> phoneNumbers) {
            this.phoneNumbers = phoneNumbers;
        }
    }

    @PostMapping("/nuclear-blast")
    public ResponseEntity<Map<String, Object>> dispatchNuclearBlast(@RequestBody NuclearBlastPayload payload) {
        logger.info("☢️ INITIATING NUCLEAR BLAST FOR SALON: {}", payload.getSalonId());
        
        List<String> rawNumbers = payload.getPhoneNumbers();
        if (rawNumbers == null || rawNumbers.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "No phone numbers provided"));
        }

        int validCount = 0;
        List<String> formattedNumbers = new ArrayList<>();

        for (String number : rawNumbers) {
            // Very basic cleanup for simulation
            String cleaned = number.replaceAll("[^0-9+]", "");
            if (!cleaned.isEmpty()) {
                if (!cleaned.startsWith("+")) {
                    cleaned = "+91" + cleaned; // Assume India for this demo context
                }
                formattedNumbers.add(cleaned);
                validCount++;
            }
        }

        logger.info("Validated {} phone numbers out of {} provided.", validCount, rawNumbers.size());
        
        // Simulating the staggered dispatch via Twilio / Meta Graph API
        logger.info("Beginning Simulated Staggered Dispatch...");
        for (String number : formattedNumbers) {
            logger.info("DISPATCH: Sending WhatsApp 10% OFF Review Bribe to {}", number);
        }
        
        logger.info("✅ NUCLEAR BLAST COMPLETE. {} messages placed in dispatch queue.", validCount);

        return ResponseEntity.ok(Map.of(
            "status", "success",
            "message", validCount + " WhatsApp review prompts dispatched to queue.",
            "dispatchedCount", validCount
        ));
    }
}
