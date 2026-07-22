package com.beautyai.booking.model;

import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbPartitionKey;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbSecondaryPartitionKey;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbSecondarySortKey;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbSortKey;

@DynamoDbBean
public class Booking {

    private String pk; // SALON#<id>
    private String sk; // APPT#<date>#<id>
    
    private String id;
    private String customerId;
    private String staffId;
    private String serviceId;
    private String startTime;
    private String status; // PENDING, CONFIRMED, COMPLETED, CANCELLED
    
    private String gsi1pk; // CUSTOMER#<id>
    private String gsi1sk; // APPT#<date>

    @DynamoDbPartitionKey
    public String getPk() { return pk; }
    public void setPk(String pk) { this.pk = pk; }

    @DynamoDbSortKey
    public String getSk() { return sk; }
    public void setSk(String sk) { this.sk = sk; }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getCustomerId() { return customerId; }
    public void setCustomerId(String customerId) { this.customerId = customerId; }

    public String getStaffId() { return staffId; }
    public void setStaffId(String staffId) { this.staffId = staffId; }

    public String getServiceId() { return serviceId; }
    public void setServiceId(String serviceId) { this.serviceId = serviceId; }

    public String getStartTime() { return startTime; }
    public void setStartTime(String startTime) { this.startTime = startTime; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    @DynamoDbSecondaryPartitionKey(indexNames = {"GSI1"})
    public String getGsi1pk() { return gsi1pk; }
    public void setGsi1pk(String gsi1pk) { this.gsi1pk = gsi1pk; }

    @DynamoDbSecondarySortKey(indexNames = {"GSI1"})
    public String getGsi1sk() { return gsi1sk; }
    public void setGsi1sk(String gsi1sk) { this.gsi1sk = gsi1sk; }
}
