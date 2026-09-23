package com.beautyai.ai.controller;

import com.beautyai.ai.dto.GoogleReviewWebhookRequest;
import com.beautyai.ai.service.GoogleReviewAutoResponderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/ai/google-reviews")
@CrossOrigin(origins = "*") // For development testing
public class GoogleReviewController {

    private final GoogleReviewAutoResponderService autoResponderService;

    public GoogleReviewController(GoogleReviewAutoResponderService autoResponderService) {
        this.autoResponderService = autoResponderService;
    }

    /**
     * Webhook endpoint that Google My Business API would call when a new review is posted.
     */
    @PostMapping("/webhook")
    public ResponseEntity<Map<String, String>> handleNewReviewWebhook(@RequestBody GoogleReviewWebhookRequest request) {
        
        // 1. Hand off to the AI service to generate and publish the reply
        String aiReply = autoResponderService.generateAndPublishReply(request);

        // 2. Return success back to Google (or our frontend simulator)
        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        response.put("action", "AI auto-replied and published to Google.");
        response.put("generatedReply", aiReply);

        return ResponseEntity.ok(response);
    }
}
