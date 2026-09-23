package com.beautyai.ai.service;

import com.beautyai.ai.dto.GoogleReviewWebhookRequest;
import com.google.auth.oauth2.GoogleCredentials;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.InputStream;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

@Service
public class GoogleReviewAutoResponderService {

    private static final Logger LOGGER = Logger.getLogger(GoogleReviewAutoResponderService.class.getName());
    private final ChatClient chatClient;
    private final String accountId;
    private final RestTemplate restTemplate;

    public GoogleReviewAutoResponderService(ChatClient.Builder chatClientBuilder,
                                            @Value("${google.mybusiness.account-id}") String accountId) {
        this.chatClient = chatClientBuilder
                .defaultSystem("You are the friendly, professional, and empathetic owner of 'Pihu Makeover', a highly-rated beauty salon located in Bodhgaya. " +
                        "Your job is to reply to Google Maps reviews left by customers. " +
                        "If it is a 4 or 5-star review, express enthusiastic gratitude, mention specific details they loved (if any), and naturally weave in local SEO keywords like 'best bridal makeup in Bodhgaya' or 'beauty salon'. " +
                        "If it is a 1, 2, or 3-star review, be deeply apologetic, professional, do NOT make excuses, and politely ask them to contact management directly to resolve the issue. " +
                        "Always keep the reply concise, warm, and human-sounding. Do not include placeholders.")
                .build();
        this.accountId = accountId;
        this.restTemplate = new RestTemplate();
    }

    public String generateAndPublishReply(GoogleReviewWebhookRequest request) {
        LOGGER.info("Received new review from " + request.getReviewerName() + " with rating: " + request.getStarRating());

        String promptText = String.format("Customer Name: %s\nStar Rating: %d/5\nReview Text: %s\n\nPlease generate the perfect response to this review.",
                request.getReviewerName(),
                request.getStarRating(),
                request.getReviewText() != null ? request.getReviewText() : "(No text provided)");

        // 1. Generate the response using Spring AI
        String aiResponse = chatClient.prompt()
                .user(promptText)
                .call()
                .content();

        LOGGER.info("Generated AI Response: " + aiResponse);

        // 2. Publish to Google
        publishToGoogleMyBusiness(request, aiResponse);

        // 3. If bad review, send alert to owner (Simulated)
        if (request.getStarRating() <= 3) {
            sendOwnerAlert(request, aiResponse);
        }

        return aiResponse;
    }

    private void publishToGoogleMyBusiness(GoogleReviewWebhookRequest request, String reply) {
        try {
            // Load credentials from resources (the .json file we saved)
            InputStream credentialsStream = new ClassPathResource("google-cloud-api.json").getInputStream();
            GoogleCredentials credentials = GoogleCredentials.fromStream(credentialsStream)
                    .createScoped(Collections.singletonList("https://www.googleapis.com/auth/business.manage"));
            
            // Refresh to get access token
            credentials.refreshIfExpired();
            String accessToken = credentials.getAccessToken().getTokenValue();

            // Construct API URL
            // Format: accounts/{accountId}/locations/{locationId}/reviews/{reviewId}
            // Assuming request.getLocationId() and request.getReviewId() are just the raw IDs.
            String url = String.format("https://mybusiness.googleapis.com/v4/accounts/%s/locations/%s/reviews/%s/reply",
                    this.accountId, request.getLocationId(), request.getReviewId());

            // Prepare HTTP request
            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(accessToken);
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, String> body = new HashMap<>();
            body.put("comment", reply);

            HttpEntity<Map<String, String>> entity = new HttpEntity<>(body, headers);

            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.PUT, entity, String.class);

            if (response.getStatusCode().is2xxSuccessful()) {
                LOGGER.info("Successfully published reply to Google for review: " + request.getReviewId());
            } else {
                LOGGER.warning("Failed to publish reply. Status code: " + response.getStatusCode());
            }

        } catch (Exception e) {
            LOGGER.severe("Error publishing reply to Google My Business: " + e.getMessage());
        }
    }

    private void sendOwnerAlert(GoogleReviewWebhookRequest request, String autoReply) {
        // In production, this would trigger an SMS or WhatsApp to the owner
        LOGGER.warning("[ALERT] Low rating detected! Sent WhatsApp alert to owner for review by " + request.getReviewerName());
    }
}
