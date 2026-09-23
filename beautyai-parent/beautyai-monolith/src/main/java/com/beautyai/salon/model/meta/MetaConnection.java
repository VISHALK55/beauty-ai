package com.beautyai.salon.model.meta;

import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbPartitionKey;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbSortKey;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbAttribute;

@DynamoDbBean
public class MetaConnection {

    private String pk; // BUSINESS#<businessId>
    private String sk; // META_CONN
    
    private String businessId;
    private String metaUserId;
    private String encryptedAccessToken;
    private Long tokenExpiresAt;
    
    private String adAccountId;
    private String pageId;
    private String instagramUserId;
    
    private String status; // ACTIVE, EXPIRED
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

    @DynamoDbAttribute("salonId") public String getBusinessId() { return businessId; }
    public void setBusinessId(String businessId) { this.businessId = businessId; }

    public String getMetaUserId() { return metaUserId; }
    public void setMetaUserId(String metaUserId) { this.metaUserId = metaUserId; }

    public String getEncryptedAccessToken() { return encryptedAccessToken; }
    public void setEncryptedAccessToken(String encryptedAccessToken) { this.encryptedAccessToken = encryptedAccessToken; }

    public Long getTokenExpiresAt() { return tokenExpiresAt; }
    public void setTokenExpiresAt(Long tokenExpiresAt) { this.tokenExpiresAt = tokenExpiresAt; }

    public String getAdAccountId() { return adAccountId; }
    public void setAdAccountId(String adAccountId) { this.adAccountId = adAccountId; }

    public String getPageId() { return pageId; }
    public void setPageId(String pageId) { this.pageId = pageId; }

    public String getInstagramUserId() { return instagramUserId; }
    public void setInstagramUserId(String instagramUserId) { this.instagramUserId = instagramUserId; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Long getCreatedAt() { return createdAt; }
    public void setCreatedAt(Long createdAt) { this.createdAt = createdAt; }

    public Long getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Long updatedAt) { this.updatedAt = updatedAt; }
}
