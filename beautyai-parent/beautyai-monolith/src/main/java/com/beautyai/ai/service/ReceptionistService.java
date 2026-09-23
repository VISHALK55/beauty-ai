package com.beautyai.ai.service;

import com.beautyai.ai.dto.ChatRequest;
import com.beautyai.ai.dto.ChatResponse;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class ReceptionistService {

    private final ChatClient chatClient;

    public ReceptionistService(ChatClient.Builder chatClientBuilder) {
        // Build the chat client with a system prompt setting the persona
        this.chatClient = chatClientBuilder
                .defaultSystem("You are a friendly, multilingual AI receptionist for BeautyAI, a premium beauty salon located in Bodhgaya, India. " +
                        "Your goal is to answer FAQs, attract foreign tourists, and assist with pricing. " +
                        "Always respond in the same language the user speaks. " +
                        "Here are the static packages you offer: " +
                        "1. Basic Glow Up ($75): Haircut, basic styling, express facial. " +
                        "2. Bridal Elegance ($250): Full bridal makeup, advanced hair styling, premium manicure. " +
                        "3. Rejuvenation Spa ($120): Deep tissue massage, luxury facial, aromatherapy. " +
                        "4. Color & Treat ($150): Full hair color, deep conditioning, blowout. " +
                        "Keep your responses elegant and concise. If the user asks something you cannot handle or demands to speak to a human, " +
                        "say exactly 'HANDOVER_TRIGGER' at the end of your message.")
                .build();
    }

    public ChatResponse handleChat(ChatRequest request) {
        String aiResponse = chatClient.prompt()
                .user(request.getMessage())
                .call()
                .content();
                
        String action = "NONE";
        
        // Basic intent processing
        if (aiResponse != null && aiResponse.contains("HANDOVER_TRIGGER")) {
            action = "HANDOVER";
            aiResponse = aiResponse.replace("HANDOVER_TRIGGER", "").trim();
        }

        return new ChatResponse(aiResponse, action);
    }
}
