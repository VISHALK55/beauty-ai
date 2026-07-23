package com.beautyai.salon.model;

import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbPartitionKey;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbSortKey;
import java.util.Map;

@DynamoDbBean
public class Salon {

    private String pk; // SALON#<id>
    private String sk; // METADATA
    
    private String id;
    private String name;
    private String address;
    private String gstNumber;
    private Map<String, String> workingHours;
    
    // Multi-Tenant SaaS Fields
    private String aiSystemPrompt;
    private String googleMapsLink;

    @DynamoDbPartitionKey
    public String getPk() {
        return pk;
    }

    public void setPk(String pk) {
        this.pk = pk;
    }

    @DynamoDbSortKey
    public String getSk() {
        return sk;
    }

    public void setSk(String sk) {
        this.sk = sk;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
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
