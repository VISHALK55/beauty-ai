package com.beautyai.salon.dto;

public class GeoRankUpdateDto {
    private Boolean geoRankEnabled;
    private String googleMapsLink;

    public Boolean getGeoRankEnabled() {
        return geoRankEnabled;
    }

    public void setGeoRankEnabled(Boolean geoRankEnabled) {
        this.geoRankEnabled = geoRankEnabled;
    }

    public String getGoogleMapsLink() {
        return googleMapsLink;
    }

    public void setGoogleMapsLink(String googleMapsLink) {
        this.googleMapsLink = googleMapsLink;
    }
}
