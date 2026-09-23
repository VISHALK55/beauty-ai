package com.beautyai.ai.dto;

public class GoogleReviewWebhookRequest {
    private String reviewId;
    private String locationId;
    private String reviewerName;
    private int starRating;
    private String reviewText;
    private long timestamp;

    public GoogleReviewWebhookRequest() {
    }

    public GoogleReviewWebhookRequest(String reviewId, String locationId, String reviewerName, int starRating, String reviewText, long timestamp) {
        this.reviewId = reviewId;
        this.locationId = locationId;
        this.reviewerName = reviewerName;
        this.starRating = starRating;
        this.reviewText = reviewText;
        this.timestamp = timestamp;
    }

    public String getReviewId() {
        return reviewId;
    }

    public void setReviewId(String reviewId) {
        this.reviewId = reviewId;
    }

    public String getLocationId() {
        return locationId;
    }

    public void setLocationId(String locationId) {
        this.locationId = locationId;
    }

    public String getReviewerName() {
        return reviewerName;
    }

    public void setReviewerName(String reviewerName) {
        this.reviewerName = reviewerName;
    }

    public int getStarRating() {
        return starRating;
    }

    public void setStarRating(int starRating) {
        this.starRating = starRating;
    }

    public String getReviewText() {
        return reviewText;
    }

    public void setReviewText(String reviewText) {
        this.reviewText = reviewText;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }
}
