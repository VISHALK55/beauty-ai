package com.beautyai.salon.service;

import com.beautyai.salon.model.AdCampaign;
import com.beautyai.salon.model.Salon;
import com.beautyai.salon.repository.SalonRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
import java.util.UUID;

@Service
public class MetaAdService {

    @Value("${meta.ads.api-version}")
    private String apiVersion;

    private final RestTemplate restTemplate;
    private final SalonRepository salonRepository;

    public MetaAdService(SalonRepository salonRepository) {
        this.restTemplate = new RestTemplate();
        this.salonRepository = salonRepository;
    }

    public String createCampaign(AdCampaign campaign) {
        try {
            // 1. Create master Campaign
            String firstSalonId = campaign.getSalonIds().split(",")[0].trim();
            Salon firstSalon = salonRepository.findById(firstSalonId);
            String firstAccessToken = firstSalon != null && firstSalon.getMetaAccessToken() != null ? firstSalon.getMetaAccessToken() : "dummy_token";
            String firstAdAccountId = firstSalon != null && firstSalon.getMetaAdAccountId() != null ? firstSalon.getMetaAdAccountId() : "dummy_act";
            String masterBaseUrl = "https://graph.facebook.com/" + apiVersion + "/" + firstAdAccountId;
            
            String campaignId = "mock_campaign_id_" + UUID.randomUUID().toString();
            if (!"dummy_token".equals(firstAccessToken)) {
                campaignId = createMetaCampaign(masterBaseUrl, firstAccessToken, "BeautyAI Campaign " + System.currentTimeMillis());
            }
            
            
            // 2. Loop through each salon
            String[] salonIds = campaign.getSalonIds().split(",");
            for (String sId : salonIds) {
                String salonId = sId.trim();
                Salon salon = salonRepository.findById(salonId);
                
                double lat = 24.6960; // Default Bodhgaya
                double lng = 84.9914; // Default Bodhgaya
                if (salon != null && salon.getLatitude() != null && salon.getLongitude() != null) {
                    lat = salon.getLatitude();
                    lng = salon.getLongitude();
                }
                
                String accessToken = salon != null && salon.getMetaAccessToken() != null ? salon.getMetaAccessToken() : "dummy_token";
                String adAccountId = salon != null && salon.getMetaAdAccountId() != null ? salon.getMetaAdAccountId() : "dummy_act";
                String pageId = salon != null && salon.getMetaPageId() != null ? salon.getMetaPageId() : "dummy_page";
                String instagramUserId = salon != null && salon.getInstagramUserId() != null ? salon.getInstagramUserId() : null;
                
                String baseUrl = "https://graph.facebook.com/" + apiVersion + "/" + adAccountId;
                
                // If it's a dummy token, just skip the real API calls and simulate
                if ("dummy_token".equals(accessToken)) {
                    System.out.println("Mock Mode for " + sId + ": Returning dummy campaign ID");
                    return "mock_campaign_id_" + UUID.randomUUID().toString();
                }

                // 3. Create Ad Set for this business
                String adSetId = createMetaAdSet(baseUrl, accessToken, campaignId, campaign.getDailyBudget(), lat, lng, sId);
                
                // 4. Get Image Hash
                String imageHash = "mock_hash_if_missing";
                if (campaign.getImageUrl() != null && !campaign.getImageUrl().isEmpty()) {
                    imageHash = uploadImageToMeta(baseUrl, accessToken, campaign.getImageUrl());
                }

                // 5. Create Creative
                String creativeId = createMetaCreative(baseUrl, accessToken, pageId, instagramUserId, imageHash, "https://beautyai.app/business/" + sId, salon != null ? salon.getName() : sId);

                // 6. Create Ad
                createMetaAd(baseUrl, accessToken, adSetId, creativeId, sId + " Ad");
            }
            
            return campaignId;
            
        } catch (Exception e) {
            System.err.println("Error calling Meta API: " + e.getMessage());
            throw new RuntimeException("Failed to launch campaign to Meta Ad Network", e);
        }
    }

    private String createMetaCampaign(String baseUrl, String accessToken, String campaignName) {
        String url = baseUrl + "/campaigns";
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("name", campaignName);
        body.add("objective", "OUTCOME_TRAFFIC");
        body.add("status", "PAUSED");
        body.add("special_ad_categories", "NONE");
        body.add("access_token", accessToken);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);
        
        ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);
        return (String) response.getBody().get("id");
    }

    private String createMetaAdSet(String baseUrl, String accessToken, String campaignId, int dailyBudget, double lat, double lng, String businessId) {
        String url = baseUrl + "/adsets";
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("name", "AdSet for " + businessId);
        body.add("campaign_id", campaignId);
        body.add("daily_budget", String.valueOf(dailyBudget * 100)); // Meta expects cents/paise
        body.add("billing_event", "IMPRESSIONS");
        body.add("optimization_goal", "LINK_CLICKS");
        body.add("bid_amount", "200");
        body.add("status", "PAUSED");
        
        // Dynamic targeting using coordinates
        String targetingJson = "{" +
                "\"geo_locations\": {" +
                "  \"custom_locations\": [{" +
                "    \"latitude\": " + lat + "," +
                "    \"longitude\": " + lng + "," +
                "    \"radius\": 10," +
                "    \"distance_unit\": \"kilometer\"" +
                "  }]" +
                "}," +
                "\"publisher_platforms\": [\"instagram\"]" +
                "}";
        body.add("targeting", targetingJson);
        body.add("access_token", accessToken);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);
        ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);
        return (String) response.getBody().get("id");
    }

    private String uploadImageToMeta(String baseUrl, String accessToken, String imageUrl) {
        String url = baseUrl + "/adimages";
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("url", imageUrl);
        body.add("access_token", accessToken);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);
        ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);
        
        Map<String, Object> images = (Map<String, Object>) response.getBody().get("images");
        for (Object val : images.values()) {
            Map<String, String> imgData = (Map<String, String>) val;
            return imgData.get("hash");
        }
        return "mock_hash_fallback";
    }

    private String createMetaCreative(String baseUrl, String accessToken, String pageId, String instagramUserId, String imageHash, String linkUrl, String message) {
        String url = baseUrl + "/adcreatives";
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("name", "Creative for " + message);
        body.add("page_id", pageId);
        
        String linkDataJson = "{" +
                "\"image_hash\": \"" + imageHash + "\"," +
                "\"link\": \"" + linkUrl + "\"," +
                "\"message\": \"Book your appointment at " + message + "!\"" +
                "}";
                
        String objectStorySpecJson = "{" +
                "\"page_id\": \"" + pageId + "\"," +
                (instagramUserId != null ? "\"instagram_user_id\": \"" + instagramUserId + "\"," : "") +
                "\"link_data\": " + linkDataJson +
                "}";
                
        body.add("object_story_spec", objectStorySpecJson);
        body.add("access_token", accessToken);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);
        ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);
        return (String) response.getBody().get("id");
    }

    private String createMetaAd(String baseUrl, String accessToken, String adSetId, String creativeId, String adName) {
        String url = baseUrl + "/ads";
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("name", adName);
        body.add("adset_id", adSetId);
        body.add("status", "PAUSED");
        body.add("creative", "{\"creative_id\": \"" + creativeId + "\"}"); 
        body.add("access_token", accessToken);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);
        ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);
        return (String) response.getBody().get("id");
    }
}
