package com.beautyai.ai.controller;

import com.beautyai.ai.dto.ChatRequest;
import com.beautyai.ai.dto.ChatResponse;
import com.beautyai.ai.service.ReceptionistService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/ai")
public class ChatController {

    private final ReceptionistService receptionistService;

    public ChatController(ReceptionistService receptionistService) {
        this.receptionistService = receptionistService;
    }

    @PostMapping("/chat")
    public ResponseEntity<ChatResponse> chat(@RequestBody ChatRequest request) {
        ChatResponse response = receptionistService.handleChat(request);
        return ResponseEntity.ok(response);
    }
}
