package com.beautyai.salon.dto;

public class CreateServiceRequest {
    private String name;
    private String description;
    private Integer priceINR;
    private String duration;
    private String icon;

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
