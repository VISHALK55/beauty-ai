package com.beautyai.salon.controller;

import com.beautyai.salon.model.meta.MetaCampaign;
import com.beautyai.salon.service.meta.MetaAdsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/meta/campaigns")
@CrossOrigin(origins = "*")
public class MetaCampaignController {

    private final MetaAdsService metaAdsService;

    public MetaCampaignController(MetaAdsService metaAdsService) {
        this.metaAdsService = metaAdsService;
    }

    @PostMapping
    public ResponseEntity<?> createDraftCampaign(@RequestBody MetaCampaign request, @RequestHeader(value = "Idempotency-Key", required = false) String idempotencyKey) {
        if (idempotencyKey == null || idempotencyKey.isEmpty()) {
            idempotencyKey = UUID.randomUUID().toString();
        }
        
        try {
            String campaignId = metaAdsService.createDraftCampaign(request, idempotencyKey);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "campaignId", campaignId,
                    "status", "READY_TO_PUBLISH"
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", e.getMessage()
            ));
        }
    }

    @PostMapping("/{campaignId}/publish")
    public ResponseEntity<?> publishCampaign(@PathVariable String campaignId, @RequestBody Map<String, String> payload) {
        String salonId = payload.get("salonId");
        try {
            metaAdsService.publishCampaign(salonId, campaignId);
            return ResponseEntity.ok(Map.of("success", true, "message", "Campaign is now Active."));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    @PostMapping("/{campaignId}/pause")
    public ResponseEntity<?> pauseCampaign(@PathVariable String campaignId, @RequestBody Map<String, String> payload) {
        String salonId = payload.get("salonId");
        try {
            metaAdsService.pauseCampaign(salonId, campaignId);
            return ResponseEntity.ok(Map.of("success", true, "message", "Campaign paused."));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    @GetMapping("/{campaignId}/status")
    public ResponseEntity<?> getCampaignStatus(@PathVariable String campaignId, @RequestParam("salonId") String salonId) {
        try {
            MetaCampaign status = metaAdsService.getCampaignStatus(salonId, campaignId);
            return ResponseEntity.ok(status);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", e.getMessage()));
        }
    }
    
    @GetMapping("/health")
    public ResponseEntity<?> getHealth(@RequestParam("salonId") String salonId) {
        try {
            // Check if connection exists and fetch assets as proof of life
            Map<String, Object> assets = metaAdsService.discoverAssets(salonId);
            
            return ResponseEntity.ok(Map.of(
                "connected", true,
                "adAccountAccessible", assets.containsKey("adAccounts"),
                "pageAccessible", assets.containsKey("pages")
            ));
        } catch (Exception e) {
            return ResponseEntity.ok(Map.of(
                "connected", false,
                "error", e.getMessage()
            ));
        }
    }
}
