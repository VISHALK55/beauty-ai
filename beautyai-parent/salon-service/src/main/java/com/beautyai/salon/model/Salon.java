package com.beautyai.salon.model;

import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbPartitionKey;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbSortKey;
import java.util.Map;
import java.util.List;

@DynamoDbBean
public class Salon {

    private String pk; // SALON#<id>
    private String sk; // METADATA
    
    private String id;
    private String name;
    private String address;
    private String gstNumber;
    private Map<String, String> workingHours;
    
    private String city;
    private String phone;
    private String rating;
    private Integer reviews;
    private String image;
    private List<String> neighborhoods;
    
    // Multi-Tenant SaaS Fields
    private String aiSystemPrompt;
    private String googleMapsLink;
    private String accessPin;

    @DynamoDbPartitionKey
    @software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbAttribute("PK")
    public String getPk() {
        return pk;
    }

    public void setPk(String pk) {
        this.pk = pk;
    }

    @DynamoDbSortKey
    @software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbAttribute("SK")
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

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getRating() { return rating; }
    public void setRating(String rating) { this.rating = rating; }

    public Integer getReviews() { return reviews; }
    public void setReviews(Integer reviews) { this.reviews = reviews; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public List<String> getNeighborhoods() { return neighborhoods; }
    public void setNeighborhoods(List<String> neighborhoods) { this.neighborhoods = neighborhoods; }

    public String getAiSystemPrompt() { return aiSystemPrompt; }
    public void setAiSystemPrompt(String aiSystemPrompt) { this.aiSystemPrompt = aiSystemPrompt; }

    public String getGoogleMapsLink() { return googleMapsLink; }
    public void setGoogleMapsLink(String googleMapsLink) { this.googleMapsLink = googleMapsLink; }

    public String getAccessPin() { return accessPin; }
    public void setAccessPin(String accessPin) { this.accessPin = accessPin; }
}
