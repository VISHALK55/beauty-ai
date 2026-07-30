package com.beautyai.salon.model;

import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbPartitionKey;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbSortKey;

@DynamoDbBean
public class AdCampaign {
    private String pk; // AD#<campaignId>
    private String sk; // PROFILE
    
    private String campaignId;
    private String salonIds;
    private String templateType;
    private int dailyBudget;
    private int durationDays;
    private String status;
    private long createdAt;

    // Fields for Meta API integration
    private String externalCampaignId;
    private int impressions;
    private int clicks;
    private double spend;

    @DynamoDbPartitionKey
    public String getPk() { return pk; }
    public void setPk(String pk) { this.pk = pk; }

    @DynamoDbSortKey
    public String getSk() { return sk; }
    public void setSk(String sk) { this.sk = sk; }

    public String getCampaignId() { return campaignId; }
    public void setCampaignId(String campaignId) { this.campaignId = campaignId; }

    public String getSalonIds() { return salonIds; }
    public void setSalonIds(String salonIds) { this.salonIds = salonIds; }

    public String getTemplateType() { return templateType; }
    public void setTemplateType(String templateType) { this.templateType = templateType; }

    public int getDailyBudget() { return dailyBudget; }
    public void setDailyBudget(int dailyBudget) { this.dailyBudget = dailyBudget; }

    public int getDurationDays() { return durationDays; }
    public void setDurationDays(int durationDays) { this.durationDays = durationDays; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public long getCreatedAt() { return createdAt; }
    public void setCreatedAt(long createdAt) { this.createdAt = createdAt; }

    public String getExternalCampaignId() { return externalCampaignId; }
    public void setExternalCampaignId(String externalCampaignId) { this.externalCampaignId = externalCampaignId; }

    public int getImpressions() { return impressions; }
    public void setImpressions(int impressions) { this.impressions = impressions; }

    public int getClicks() { return clicks; }
    public void setClicks(int clicks) { this.clicks = clicks; }

    public double getSpend() { return spend; }
    public void setSpend(double spend) { this.spend = spend; }
}
