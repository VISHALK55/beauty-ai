package com.beautyai.salon.dto;

public class MetaIntegrationDto {
    private String metaAccessToken;
    private String metaAdAccountId;
    private String metaPageId;
    private String metaAppSecret;

    public String getMetaAccessToken() { return metaAccessToken; }
    public void setMetaAccessToken(String metaAccessToken) { this.metaAccessToken = metaAccessToken; }

    public String getMetaAdAccountId() { return metaAdAccountId; }
    public void setMetaAdAccountId(String metaAdAccountId) { this.metaAdAccountId = metaAdAccountId; }

    public String getMetaPageId() { return metaPageId; }
    public void setMetaPageId(String metaPageId) { this.metaPageId = metaPageId; }

    public String getMetaAppSecret() { return metaAppSecret; }
    public void setMetaAppSecret(String metaAppSecret) { this.metaAppSecret = metaAppSecret; }
}
