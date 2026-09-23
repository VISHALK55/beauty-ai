package com.beautyai.ai.controller;

import com.beautyai.ai.dto.CompetitorAnalysisRequest;
import com.beautyai.ai.dto.CompetitorAnalysisResponse;
import com.beautyai.ai.model.CompetitorReport;
import com.beautyai.ai.service.CompetitorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/ai")
public class CompetitorController {

    private final CompetitorService competitorService;

    public CompetitorController(CompetitorService competitorService) {
        this.competitorService = competitorService;
    }

    @PostMapping("/analyze-competitor")
    public ResponseEntity<CompetitorAnalysisResponse> analyzeCompetitor(@RequestBody CompetitorAnalysisRequest request) {
        // Hardcode salonId for now since Pihu Makeover is the primary tenant
        String salonId = "PIHU_MAKEOVER";
        CompetitorAnalysisResponse response = competitorService.analyzeCompetitor(request, salonId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/competitors")
    public ResponseEntity<List<CompetitorReport>> getCompetitors() {
        String salonId = "PIHU_MAKEOVER";
        return ResponseEntity.ok(competitorService.getSavedReports(salonId));
    }

    @PostMapping("/generate-attack-ads")
    public ResponseEntity<Map<String, String>> generateAttackAds(@RequestBody Map<String, String> request) {
        String salonId = "PIHU_MAKEOVER";
        String sk = request.get("sk");
        String ads = competitorService.generateAttackAds(salonId, sk);
        return ResponseEntity.ok(Map.of("ads", ads));
    }
}
