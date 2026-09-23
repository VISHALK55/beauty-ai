package com.beautyai.salon.dto;

public class AuthResponse {
    private String token;
    private String role;
    private String salonId;
    
    public AuthResponse(String token, String role, String salonId) {
        this.token = token;
        this.role = role;
        this.salonId = salonId;
    }
    
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getSalonId() { return salonId; }
    public void setSalonId(String salonId) { this.salonId = salonId; }
}
