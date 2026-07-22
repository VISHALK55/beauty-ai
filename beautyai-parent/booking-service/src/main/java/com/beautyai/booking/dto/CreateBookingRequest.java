package com.beautyai.booking.dto;

public class CreateBookingRequest {
    private String salonId;
    private String customerId;
    private String staffId;
    private String serviceId;
    private String startTime;
    private String date;

    public String getSalonId() { return salonId; }
    public void setSalonId(String salonId) { this.salonId = salonId; }

    public String getCustomerId() { return customerId; }
    public void setCustomerId(String customerId) { this.customerId = customerId; }

    public String getStaffId() { return staffId; }
    public void setStaffId(String staffId) { this.staffId = staffId; }

    public String getServiceId() { return serviceId; }
    public void setServiceId(String serviceId) { this.serviceId = serviceId; }

    public String getStartTime() { return startTime; }
    public void setStartTime(String startTime) { this.startTime = startTime; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
}
