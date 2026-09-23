package com.beautyai.ai.dto;

public class CompetitorAnalysisRequest {
    private String competitorName;
    private String rawReviews;
    private String servicesOffered;

    public CompetitorAnalysisRequest() {
    }

    public CompetitorAnalysisRequest(String competitorName, String rawReviews, String servicesOffered) {
        this.competitorName = competitorName;
        this.rawReviews = rawReviews;
        this.servicesOffered = servicesOffered;
    }

    public String getCompetitorName() {
        return competitorName;
    }

    public void setCompetitorName(String competitorName) {
        this.competitorName = competitorName;
    }

    public String getRawReviews() {
        return rawReviews;
    }

    public void setRawReviews(String rawReviews) {
        this.rawReviews = rawReviews;
    }

    public String getServicesOffered() {
        return servicesOffered;
    }

    public void setServicesOffered(String servicesOffered) {
        this.servicesOffered = servicesOffered;
    }
}
