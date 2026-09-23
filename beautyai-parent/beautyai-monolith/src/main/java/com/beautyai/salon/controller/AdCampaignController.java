package com.beautyai.salon.controller;

import com.beautyai.salon.model.AdCampaign;
import com.beautyai.salon.repository.AdCampaignRepository;
import com.beautyai.salon.service.MetaAdService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;
import java.util.List;
import java.util.Arrays;
import java.util.stream.Collectors;

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

    @GetMapping("/analytics")
    public ResponseEntity<?> getAnalytics(@RequestParam("salonIds") String salonIdsStr) {
        List<String> targetSalons = Arrays.asList(salonIdsStr.split(","));
        
        List<AdCampaign> allCampaigns = adCampaignRepository.findAll();
        
        // Filter campaigns for these salons that are LIVE
        List<AdCampaign> activeCampaigns = allCampaigns.stream()
            .filter(ad -> "LIVE".equals(ad.getStatus()))
            .filter(ad -> ad.getSalonIds() != null)
            .filter(ad -> Arrays.stream(ad.getSalonIds().split(","))
                                .anyMatch(targetSalons::contains))
            .collect(Collectors.toList());
            
        if (activeCampaigns.isEmpty()) {
            return ResponseEntity.ok(Map.of(
                "impressions", 0,
                "clicks", 0,
                "bookings", 0,
                "spend", 0
            ));
        }
        
        long totalImpressions = 0;
        long totalClicks = 0;
        long totalBookings = 0;
        long totalSpend = 0;
        
        long now = System.currentTimeMillis();
        
        for (AdCampaign ad : activeCampaigns) {
            long elapsedMillis = now - (ad.getCreatedAt() > 0 ? ad.getCreatedAt() : now);
            double elapsedHours = Math.max(0.1, elapsedMillis / (1000.0 * 60.0 * 60.0));
            
            double dailyBudget = ad.getDailyBudget() > 0 ? ad.getDailyBudget() : 250.0;
            
            // SIMULATION ALGORITHM
            // 1 impression costs ~ ₹0.04 (e.g. 250 rupees = ~6250 impressions/day)
            // 6250 impressions / 24 hours = ~260 impressions per hour
            double impressionsPerHour = (dailyBudget / 0.04) / 24.0;
            
            long impressions = (long) (impressionsPerHour * elapsedHours);
            long clicks = (long) (impressions * 0.05); // 5% CTR
            long bookings = (long) (clicks * 0.10); // 10% Conversion
            long spend = (long) ((dailyBudget / 24.0) * elapsedHours);
            
            totalImpressions += impressions;
            totalClicks += clicks;
            totalBookings += bookings;
            totalSpend += spend;
        }

        return ResponseEntity.ok(Map.of(
            "impressions", totalImpressions,
            "clicks", totalClicks,
            "bookings", totalBookings,
            "spend", totalSpend
        ));
    }
}
