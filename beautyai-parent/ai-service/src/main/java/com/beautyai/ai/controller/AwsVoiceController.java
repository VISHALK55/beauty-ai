package com.beautyai.ai.controller;

import com.beautyai.ai.dto.ChatRequest;
import com.beautyai.ai.dto.ChatResponse;
import com.beautyai.ai.service.ReceptionistService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/ai")
public class AwsVoiceController {

    private final ReceptionistService receptionistService;

    public AwsVoiceController(ReceptionistService receptionistService) {
        this.receptionistService = receptionistService;
    }

    /**
     * Webhook endpoint specifically designed to be called by an AWS Lambda function 
     * triggered by Amazon Lex.
     */
    @PostMapping("/aws-webhook")
    public ResponseEntity<Map<String, Object>> handleLexWebhook(@RequestBody Map<String, Object> lexPayload) {
        // 1. Extract the transcribed speech from Lex payload (inputTranscript)
        String inputTranscript = (String) lexPayload.getOrDefault("inputTranscript", "");
        
        if (inputTranscript.isEmpty()) {
            inputTranscript = extractTextFromAlternativeLexFormat(lexPayload);
        }

        // 2. Pass it to our AI Service with context
        ChatRequest chatRequest = new ChatRequest();
        chatRequest.setSalonId("salon_bodhgaya_01"); // Context for Bodhgaya
        chatRequest.setMessage(inputTranscript);
        
        ChatResponse aiResponse = receptionistService.handleChat(chatRequest);

        // 3. Format the response back to what Amazon Lex / Lambda expects
        Map<String, Object> response = new HashMap<>();
        
        Map<String, Object> message = new HashMap<>();
        message.put("contentType", "PlainText");
        message.put("content", aiResponse.getReply());
        
        response.put("messages", List.of(message));

        // Close the dialog action so Lex speaks it and waits for next input
        Map<String, Object> dialogAction = new HashMap<>();
        dialogAction.put("type", "ElicitIntent"); // Keep conversation open
        
        Map<String, Object> sessionState = new HashMap<>();
        sessionState.put("dialogAction", dialogAction);
        
        response.put("sessionState", sessionState);

        return ResponseEntity.ok(response);
    }

    private String extractTextFromAlternativeLexFormat(Map<String, Object> payload) {
        // Backup extraction logic if structure varies
        try {
            if (payload.containsKey("currentIntent")) {
                return (String) payload.get("inputTranscript"); // Lex V1
            }
        } catch (Exception e) {
            // Ignore
        }
        return "Hello";
    }
}
