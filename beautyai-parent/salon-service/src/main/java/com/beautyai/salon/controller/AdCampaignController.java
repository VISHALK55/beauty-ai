package com.beautyai.salon.controller;

import com.beautyai.salon.model.AdCampaign;
import com.beautyai.salon.repository.AdCampaignRepository;
import com.beautyai.salon.service.MetaAdService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/salons/ads")
@CrossOrigin(origins = "*")
public class AdCampaignController {

    private final AdCampaignRepository adCampaignRepository;
    private final MetaAdService metaAdService;

    public AdCampaignController(AdCampaignRepository adCampaignRepository, MetaAdService metaAdService) {
        this.adCampaignRepository = adCampaignRepository;
        this.metaAdService = metaAdService;
    }

    @PostMapping("/launch")
    public ResponseEntity<?> launchAdCampaign(@RequestBody AdCampaign request) {
        String campaignId = UUID.randomUUID().toString();
        
        request.setPk("AD#" + campaignId);
        request.setSk("PROFILE");
        request.setCampaignId(campaignId);
        request.setCreatedAt(System.currentTimeMillis());
        
        try {
            // Launch real campaign via Meta Ad Service
            String metaCampaignId = metaAdService.createCampaign(request);
            request.setExternalCampaignId(metaCampaignId);
            request.setStatus("LIVE");
            
            adCampaignRepository.save(request);

            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Campaign successfully launched to Meta Ad Network.",
                "campaignId", campaignId,
                "metaCampaignId", metaCampaignId,
                "status", "LIVE"
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Failed to launch campaign to Meta API: " + e.getMessage()
            ));
        }
    }
}
