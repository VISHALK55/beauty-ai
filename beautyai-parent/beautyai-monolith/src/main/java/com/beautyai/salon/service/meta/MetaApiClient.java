package com.beautyai.salon.service.meta;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class MetaApiClient {

    private final String apiVersion;
    private final String appId;
    private final String appSecret;
    private final String redirectUri;
    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;

    public MetaApiClient(
            @Value("${meta.ads.api-version:v22.0}") String apiVersion,
            @Value("${meta.ads.app-id}") String appId,
            @Value("${meta.ads.app-secret}") String appSecret,
            @Value("${meta.ads.redirect-uri}") String redirectUri) {
        this.apiVersion = apiVersion;
        this.appId = appId;
        this.appSecret = appSecret;
        this.redirectUri = redirectUri;
        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(10))
                .build();
        this.objectMapper = new ObjectMapper();
    }

    private String getBaseUrl() {
        return "https://graph.facebook.com/" + apiVersion;
    }

    public Map<String, Object> exchangeCodeForToken(String code) {
        String url = getBaseUrl() + "/oauth/access_token?client_id=" + appId +
                "&redirect_uri=" + URLEncoder.encode(redirectUri, StandardCharsets.UTF_8) +
                "&client_secret=" + appSecret +
                "&code=" + code;
        return executeGet(url, null);
    }

    public Map<String, Object> getLongLivedToken(String shortToken) {
        String url = getBaseUrl() + "/oauth/access_token?grant_type=fb_exchange_token" +
                "&client_id=" + appId +
                "&client_secret=" + appSecret +
                "&fb_exchange_token=" + shortToken;
        return executeGet(url, null);
    }
    
    public Map<String, Object> getMe(String accessToken) {
        return executeGet(getBaseUrl() + "/me", accessToken);
    }
    
    public Map<String, Object> getAdAccounts(String metaUserId, String accessToken) {
        return executeGet(getBaseUrl() + "/" + metaUserId + "/adaccounts?fields=name,account_id,currency,account_status", accessToken);
    }

    public Map<String, Object> getPages(String metaUserId, String accessToken) {
        return executeGet(getBaseUrl() + "/" + metaUserId + "/accounts?fields=name,id,access_token", accessToken);
    }

    public Map<String, Object> getInstagramAccounts(String pageId, String accessToken) {
        return executeGet(getBaseUrl() + "/" + pageId + "?fields=instagram_business_account", accessToken);
    }

    public Map<String, Object> getConnectedInstagramAccounts(String adAccountId, String accessToken) {
        return executeGet(getBaseUrl() + "/" + adAccountId + "/connected_instagram_accounts", accessToken);
    }

    public String createCampaign(String adAccountId, String accessToken, String name, String objective, long dailyBudgetPaise) {
        String url = getBaseUrl() + "/" + adAccountId + "/campaigns";
        Map<String, String> body = Map.of(
                "name", name,
                "objective", objective,
                "status", "PAUSED", // Always create as paused initially
                "special_ad_categories", "NONE",
                "access_token", accessToken
        );
        Map<String, Object> response = executePost(url, body);
        return (String) response.get("id");
    }

    public String createAdSet(String adAccountId, String accessToken, String campaignId, String name, 
                              long dailyBudgetPaise, double lat, double lng, int radiusKm, int ageMin, int ageMax, String gender, long endTimeUnix) {
        String url = getBaseUrl() + "/" + adAccountId + "/adsets";

        String targetingJson = "{" +
                "\"geo_locations\": {" +
                "  \"custom_locations\": [{" +
                "    \"latitude\": " + lat + "," +
                "    \"longitude\": " + lng + "," +
                "    \"radius\": " + radiusKm + "," +
                "    \"distance_unit\": \"kilometer\"" +
                "  }]" +
                "}," +
                "\"age_min\": " + ageMin + "," +
                "\"age_max\": " + ageMax + "," +
                "\"publisher_platforms\": [\"instagram\"]"; // Enforce IG as requested
        
        if ("WOMEN".equalsIgnoreCase(gender)) targetingJson += ",\"genders\": [2]";
        else if ("MEN".equalsIgnoreCase(gender)) targetingJson += ",\"genders\": [1]";
        
        targetingJson += "}";

        java.util.Map<String, String> body = new java.util.HashMap<>();
        body.put("name", name);
        body.put("campaign_id", campaignId);
        body.put("daily_budget", String.valueOf(dailyBudgetPaise));
        body.put("billing_event", "IMPRESSIONS");
        body.put("optimization_goal", "LINK_CLICKS");
        body.put("bid_amount", "200");
        body.put("status", "PAUSED");
        body.put("targeting", targetingJson);
        body.put("access_token", accessToken);
        
        if (endTimeUnix > 0) {
            body.put("end_time", String.valueOf(endTimeUnix));
        }

        Map<String, Object> response = executePost(url, body);
        return (String) response.get("id");
    }
    
    public String uploadImage(String adAccountId, String accessToken, String imageUrl) {
        String url = getBaseUrl() + "/" + adAccountId + "/adimages";
        Map<String, String> body = Map.of(
                "url", imageUrl,
                "access_token", accessToken
        );
        Map<String, Object> response = executePost(url, body);
        Map<String, Object> images = (Map<String, Object>) response.get("images");
        for (Object val : images.values()) {
            Map<String, String> imgData = (Map<String, String>) val;
            return imgData.get("hash");
        }
        throw new RuntimeException("Failed to get image hash from Meta API");
    }

    public String createCreative(String adAccountId, String accessToken, String pageId, String instagramUserId, 
                                 String imageHash, String linkUrl, String headline, String primaryText, String cta) {
        String url = getBaseUrl() + "/" + adAccountId + "/adcreatives";
        
        String linkDataJson = "{" +
                "\"image_hash\": \"" + imageHash + "\"," +
                "\"link\": \"" + linkUrl + "\"," +
                "\"name\": \"" + headline.replace("\"", "\\\"") + "\"," +
                "\"message\": \"" + primaryText.replace("\"", "\\\"") + "\"," +
                "\"call_to_action\": {\"type\": \"" + cta + "\"}" +
                "}";
                
        String objectStorySpecJson = "{" +
                "\"page_id\": \"" + pageId + "\"," +
                (instagramUserId != null ? "\"instagram_user_id\": \"" + instagramUserId + "\"," : "") +
                "\"link_data\": " + linkDataJson +
                "}";

        Map<String, String> body = Map.of(
                "name", "Creative for " + headline,
                "page_id", pageId,
                "object_story_spec", objectStorySpecJson,
                "access_token", accessToken
        );
        Map<String, Object> response = executePost(url, body);
        return (String) response.get("id");
    }

    public String createAd(String adAccountId, String accessToken, String adSetId, String creativeId, String name) {
        String url = getBaseUrl() + "/" + adAccountId + "/ads";
        Map<String, String> body = Map.of(
                "name", name,
                "adset_id", adSetId,
                "creative", "{\"creative_id\": \"" + creativeId + "\"}",
                "status", "PAUSED", // PAUSED until explicitly published
                "access_token", accessToken
        );
        Map<String, Object> response = executePost(url, body);
        return (String) response.get("id");
    }
    
    public void updateCampaignStatus(String campaignId, String accessToken, String status) {
        String url = getBaseUrl() + "/" + campaignId;
        Map<String, String> body = Map.of(
                "status", status,
                "access_token", accessToken
        );
        executePost(url, body);
    }
    
    public Map<String, Object> getCampaignStatus(String campaignId, String accessToken) {
        String url = getBaseUrl() + "/" + campaignId + "?fields=status,effective_status,name,objective,daily_budget&access_token=" + accessToken;
        return executeGet(url, null);
    }

    private Map<String, Object> executeGet(String url, String accessToken) {
        try {
            HttpRequest.Builder builder = HttpRequest.newBuilder().uri(URI.create(url)).GET();
            if (accessToken != null) {
                builder.header("Authorization", "Bearer " + accessToken);
            }
            HttpResponse<String> response = httpClient.send(builder.build(), HttpResponse.BodyHandlers.ofString());
            return parseResponse(response);
        } catch (Exception e) {
            throw new RuntimeException("Meta API GET Request Failed", e);
        }
    }

    private Map<String, Object> executePost(String url, Map<String, String> formData) {
        try {
            String encodedBody = formData.entrySet().stream()
                    .map(e -> URLEncoder.encode(e.getKey(), StandardCharsets.UTF_8) + "=" + URLEncoder.encode(e.getValue(), StandardCharsets.UTF_8))
                    .collect(Collectors.joining("&"));

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .header("Content-Type", "application/x-www-form-urlencoded")
                    .POST(HttpRequest.BodyPublishers.ofString(encodedBody))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            return parseResponse(response);
        } catch (Exception e) {
            throw new RuntimeException("Meta API POST Request Failed", e);
        }
    }

    private Map<String, Object> parseResponse(HttpResponse<String> response) throws Exception {
        Map<String, Object> result = objectMapper.readValue(response.body(), new TypeReference<>() {});
        if (response.statusCode() >= 400 || result.containsKey("error")) {
            Map<String, Object> errorObj = (Map<String, Object>) result.get("error");
            String message = errorObj != null ? (String) errorObj.get("message") : "Unknown Error";
            throw new RuntimeException("Meta API Error: " + message);
        }
        return result;
    }
}
