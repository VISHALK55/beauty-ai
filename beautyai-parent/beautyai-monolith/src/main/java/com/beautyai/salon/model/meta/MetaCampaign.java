package com.beautyai.salon.model.meta;

import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbPartitionKey;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbSortKey;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbAttribute;

@DynamoDbBean
public class MetaCampaign {

    private String pk; // SALON#<businessId>
    private String sk; // META_CAMP#<campaignId>
    
    private String id;
    private String businessId;
    
    // Meta IDs
    private String metaCampaignId;
    private String metaAdSetId;
    private String metaCreativeId;
    private String metaAdId;
    
    // Configuration
    private String name;
    private String objective;
    private Double dailyBudget;
    private String currency;
    
    private Double latitude;
    private Double longitude;
    private Integer radiusKm;
    private Integer ageMin;
    private Integer ageMax;
    private String gender; // ALL, WOMEN, MEN
    
    private Integer durationDays;
    
    private String creativeImageUrl;
    private String primaryText;
    private String headline;
    private String callToAction;
    
    // Lifecycle
    private String status; // DRAFT, READY_TO_PUBLISH, ACTIVE, PAUSED, ERROR
    private String metaStatus;
    
    private Long createdAt;
    private Long updatedAt;

    @DynamoDbPartitionKey
    @DynamoDbAttribute("PK")
    public String getPk() { return pk; }
    public void setPk(String pk) { this.pk = pk; }

    @DynamoDbSortKey
    @DynamoDbAttribute("SK")
    public String getSk() { return sk; }
    public void setSk(String sk) { this.sk = sk; }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    @DynamoDbAttribute("salonId") public String getBusinessId() { return businessId; }
    public void setBusinessId(String businessId) { this.businessId = businessId; }

    public String getMetaCampaignId() { return metaCampaignId; }
    public void setMetaCampaignId(String metaCampaignId) { this.metaCampaignId = metaCampaignId; }

    public String getMetaAdSetId() { return metaAdSetId; }
    public void setMetaAdSetId(String metaAdSetId) { this.metaAdSetId = metaAdSetId; }

    public String getMetaCreativeId() { return metaCreativeId; }
    public void setMetaCreativeId(String metaCreativeId) { this.metaCreativeId = metaCreativeId; }

    public String getMetaAdId() { return metaAdId; }
    public void setMetaAdId(String metaAdId) { this.metaAdId = metaAdId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getObjective() { return objective; }
    public void setObjective(String objective) { this.objective = objective; }

    public Double getDailyBudget() { return dailyBudget; }
    public void setDailyBudget(Double dailyBudget) { this.dailyBudget = dailyBudget; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }

    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }

    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }

    public Integer getRadiusKm() { return radiusKm; }
    public void setRadiusKm(Integer radiusKm) { this.radiusKm = radiusKm; }

    public Integer getAgeMin() { return ageMin; }
    public void setAgeMin(Integer ageMin) { this.ageMin = ageMin; }

    public Integer getAgeMax() { return ageMax; }
    public void setAgeMax(Integer ageMax) { this.ageMax = ageMax; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public Integer getDurationDays() { return durationDays; }
    public void setDurationDays(Integer durationDays) { this.durationDays = durationDays; }

    public String getCreativeImageUrl() { return creativeImageUrl; }
    public void setCreativeImageUrl(String creativeImageUrl) { this.creativeImageUrl = creativeImageUrl; }

    public String getPrimaryText() { return primaryText; }
    public void setPrimaryText(String primaryText) { this.primaryText = primaryText; }

    public String getHeadline() { return headline; }
    public void setHeadline(String headline) { this.headline = headline; }

    public String getCallToAction() { return callToAction; }
    public void setCallToAction(String callToAction) { this.callToAction = callToAction; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getMetaStatus() { return metaStatus; }
    public void setMetaStatus(String metaStatus) { this.metaStatus = metaStatus; }

    public Long getCreatedAt() { return createdAt; }
    public void setCreatedAt(Long createdAt) { this.createdAt = createdAt; }

    public Long getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Long updatedAt) { this.updatedAt = updatedAt; }
}
