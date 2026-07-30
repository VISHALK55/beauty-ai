package com.beautyai.salon.model;

import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbPartitionKey;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbSortKey;

@DynamoDbBean
public class SalonServiceItem {

    private String pk; // SALON#<id>
    private String sk; // SERVICE#<service_id>
    
    private String id;
    private String salonId;
    private String name;
    private String description;
    private Integer priceINR;
    private String duration;
    private String icon;

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

    public String getSalonId() { return salonId; }
    public void setSalonId(String salonId) { this.salonId = salonId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Integer getPriceINR() { return priceINR; }
    public void setPriceINR(Integer priceINR) { this.priceINR = priceINR; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }

    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }
}
