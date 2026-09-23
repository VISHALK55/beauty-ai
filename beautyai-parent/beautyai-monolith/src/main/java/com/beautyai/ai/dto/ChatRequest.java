package com.beautyai.ai.dto;

public class ChatRequest {
    private String salonId;
    private String customerId;
    private String message;

    public String getSalonId() { return salonId; }
    public void setSalonId(String salonId) { this.salonId = salonId; }

    public String getCustomerId() { return customerId; }
    public void setCustomerId(String customerId) { this.customerId = customerId; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
