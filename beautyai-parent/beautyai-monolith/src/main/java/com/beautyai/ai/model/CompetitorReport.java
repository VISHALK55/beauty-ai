package com.beautyai.ai.model;

import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbPartitionKey;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbSortKey;

@DynamoDbBean
public class CompetitorReport {

    private String pk; // e.g. SALON#123
    private String sk; // e.g. COMPETITOR_REPORT#<competitorName>#<timestamp>

    private String competitorName;
    private String servicesOffered;
    private String rawReviews;
    private String generatedReport;
    private long createdAt;

    @DynamoDbPartitionKey
    public String getPk() {
        return pk;
    }

    public void setPk(String pk) {
        this.pk = pk;
    }

    @DynamoDbSortKey
    public String getSk() {
        return sk;
    }

    public void setSk(String sk) {
        this.sk = sk;
    }

    public String getCompetitorName() {
        return competitorName;
    }

    public void setCompetitorName(String competitorName) {
        this.competitorName = competitorName;
    }

    public String getServicesOffered() {
        return servicesOffered;
    }

    public void setServicesOffered(String servicesOffered) {
        this.servicesOffered = servicesOffered;
    }

    public String getRawReviews() {
        return rawReviews;
    }

    public void setRawReviews(String rawReviews) {
        this.rawReviews = rawReviews;
    }

    public String getGeneratedReport() {
        return generatedReport;
    }

    public void setGeneratedReport(String generatedReport) {
        this.generatedReport = generatedReport;
    }

    public long getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(long createdAt) {
        this.createdAt = createdAt;
    }
}
