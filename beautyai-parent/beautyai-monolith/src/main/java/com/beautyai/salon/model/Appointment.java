package com.beautyai.salon.model;

import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbPartitionKey;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbSortKey;

@DynamoDbBean
public class Appointment {

    private String pk; // SALON#<id>
    private String sk; // APPOINTMENT#<appointment_id>
    
    private String id;
    private String salonId;
    private String customerName;
    private String salonName;
    private String serviceName;
    private Integer price;
    private String date;
    private String time;
    private String status;
    private String phone;
    private String source;

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

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getSalonName() { return salonName; }
    public void setSalonName(String salonName) { this.salonName = salonName; }

    public String getServiceName() { return serviceName; }
    public void setServiceName(String serviceName) { this.serviceName = serviceName; }

    public Integer getPrice() { return price; }
    public void setPrice(Integer price) { this.price = price; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }
}
