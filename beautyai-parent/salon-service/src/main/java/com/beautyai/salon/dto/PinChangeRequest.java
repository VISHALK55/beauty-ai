package com.beautyai.salon.dto;

public class PinChangeRequest {
    private String currentPin;
    private String newPin;

    public PinChangeRequest() {}

    public String getCurrentPin() {
        return currentPin;
    }

    public void setCurrentPin(String currentPin) {
        this.currentPin = currentPin;
    }

    public String getNewPin() {
        return newPin;
    }

    public void setNewPin(String newPin) {
        this.newPin = newPin;
    }
}
