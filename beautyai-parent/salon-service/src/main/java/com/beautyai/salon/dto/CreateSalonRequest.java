package com.beautyai.salon.dto;

import java.util.Map;

public class CreateSalonRequest {
    private String name;
    private String address;
    private String gstNumber;
    private Map<String, String> workingHours;

    // Multi-Tenant SaaS Fields
    private String aiSystemPrompt;
    private String googleMapsLink;

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getGstNumber() { return gstNumber; }
    public void setGstNumber(String gstNumber) { this.gstNumber = gstNumber; }

    public Map<String, String> getWorkingHours() { return workingHours; }
    public void setWorkingHours(Map<String, String> workingHours) { this.workingHours = workingHours; }

    public String getAiSystemPrompt() { return aiSystemPrompt; }
    public void setAiSystemPrompt(String aiSystemPrompt) { this.aiSystemPrompt = aiSystemPrompt; }

    public String getGoogleMapsLink() { return googleMapsLink; }
    public void setGoogleMapsLink(String googleMapsLink) { this.googleMapsLink = googleMapsLink; }
}
