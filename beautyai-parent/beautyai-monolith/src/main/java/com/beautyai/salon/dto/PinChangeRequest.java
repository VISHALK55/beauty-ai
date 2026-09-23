package com.beautyai.salon.dto;

public class PinChangeRequest {
    private String phoneNumber;
    private String newPin;

    public PinChangeRequest() {}

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getNewPin() {
        return newPin;
    }

    public void setNewPin(String newPin) {
        this.newPin = newPin;
    }
}
