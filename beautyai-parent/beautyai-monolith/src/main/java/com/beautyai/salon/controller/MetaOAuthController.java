package com.beautyai.salon.controller;

import com.beautyai.salon.service.meta.MetaAdsService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;
import org.springframework.http.HttpStatus;
import java.net.URI;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/meta")
@CrossOrigin(origins = "*")
public class MetaOAuthController {

    private final MetaAdsService metaAdsService;
    private final String appId;
    private final String redirectUri;
    private final String configId;

    public MetaOAuthController(MetaAdsService metaAdsService, 
                               @Value("${meta.ads.app-id}") String appId,
                               @Value("${meta.ads.redirect-uri}") String redirectUri,
                               @Value("${meta.ads.config-id:#{null}}") String configId) {
        this.metaAdsService = metaAdsService;
        this.appId = appId;
        this.redirectUri = redirectUri;
        this.configId = configId;
    }

    @GetMapping("/connect")
    public ResponseEntity<Map<String, String>> getConnectUrl(@RequestParam("businessId") String businessId) {
        String state = metaAdsService.generateOAuthState(businessId);
        String encodedRedirectUri = URLEncoder.encode(redirectUri, StandardCharsets.UTF_8);
        
        StringBuilder urlBuilder = new StringBuilder("https://www.facebook.com/v22.0/dialog/oauth")
                .append("?client_id=").append(appId)
                .append("&redirect_uri=").append(encodedRedirectUri)
                .append("&state=").append(state);
                
        if (configId != null && !configId.isEmpty()) {
            urlBuilder.append("&config_id=").append(configId).append("&response_type=code").append("&override_default_response_type=true");
        } else {
            urlBuilder.append("&scope=ads_management,ads_read,pages_manage_ads,pages_read_engagement,pages_show_list");
        }
                
        return ResponseEntity.ok(Map.of("url", urlBuilder.toString()));
    }

    @GetMapping("/callback")
    public ResponseEntity<Void> handleCallback(@RequestParam("code") String code, @RequestParam("state") String state) {
        try {
            metaAdsService.handleOAuthCallback(state, code);
            return ResponseEntity.status(HttpStatus.FOUND)
                    .location(URI.create("https://frontend-amber-pi-96.vercel.app/dashboard/ad-campaigns?meta_connect=success"))
                    .build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.FOUND)
                    .location(URI.create("https://frontend-amber-pi-96.vercel.app/dashboard/ad-campaigns?meta_connect=error"))
                    .build();
        }
    }
    
    @GetMapping("/assets")
    public ResponseEntity<Map<String, Object>> discoverAssets(@RequestParam("businessId") String businessId) {
        try {
            return ResponseEntity.ok(metaAdsService.discoverAssets(businessId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/assets/instagram")
    public ResponseEntity<Map<String, Object>> discoverInstagram(@RequestParam("businessId") String businessId, @RequestParam("pageId") String pageId) {
        try {
            return ResponseEntity.ok(metaAdsService.discoverInstagramForPage(businessId, pageId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/status")
    public ResponseEntity<Map<String, String>> getStatus(@RequestParam("businessId") String businessId) {
        try {
            String status = metaAdsService.getConnectionStatus(businessId);
            return ResponseEntity.ok(Map.of("status", status));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/select-assets")
    public ResponseEntity<Map<String, Object>> selectAssets(@RequestBody Map<String, String> payload) {
        String businessId = payload.get("businessId");
        String adAccountId = payload.get("adAccountId");
        String pageId = payload.get("pageId");
        String instagramUserId = payload.get("instagramUserId");
        
        metaAdsService.selectAssets(businessId, adAccountId, pageId, instagramUserId);
        
        return ResponseEntity.ok(Map.of("success", true, "message", "Assets selected successfully"));
    }
}
