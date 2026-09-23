package com.beautyai.ai.service;

import com.beautyai.ai.dto.CompetitorAnalysisRequest;
import com.beautyai.ai.dto.CompetitorAnalysisResponse;
import com.beautyai.ai.model.CompetitorReport;
import com.beautyai.ai.repository.CompetitorReportRepository;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompetitorService {

    private final ChatClient chatClient;
    private final CompetitorReportRepository repository;

    public CompetitorService(ChatClient.Builder chatClientBuilder, CompetitorReportRepository repository) {
        this.repository = repository;
        this.chatClient = chatClientBuilder
                .defaultSystem("You are an elite, cut-throat local SEO and business strategist for BeautyAI. " +
                        "Your job is to analyze data from local competitors and provide actionable tactical advice for our salon, 'Pihu Makeover'. " +
                        "You will be given raw customer reviews and a list of services offered by the competitor. " +
                        "Analyze this data to find their critical weaknesses (e.g., poor hygiene, late appointments, generic products) " +
                        "and their strengths. Then, output a structured tactical report on exactly how Pihu Makeover can exploit these weaknesses in marketing. " +
                        "Format the report beautifully in Markdown with sections for: Strengths, Weaknesses, and Actionable Attack Plan.")
                .build();
    }

    public CompetitorAnalysisResponse analyzeCompetitor(CompetitorAnalysisRequest request, String salonId) {
        String promptText = String.format("Competitor Name: %s\n\nServices Offered:\n%s\n\nRaw Reviews:\n%s",
                request.getCompetitorName(),
                request.getServicesOffered(),
                request.getRawReviews());

        String analysisReport = chatClient.prompt()
                .user(promptText)
                .call()
                .content();

        // Save to DynamoDB
        CompetitorReport report = new CompetitorReport();
        report.setPk("SALON#" + salonId);
        long timestamp = System.currentTimeMillis();
        report.setSk("COMPETITOR_REPORT#" + request.getCompetitorName().replaceAll("\\s+", "_").toUpperCase() + "#" + timestamp);
        report.setCompetitorName(request.getCompetitorName());
        report.setServicesOffered(request.getServicesOffered());
        report.setRawReviews(request.getRawReviews());
        report.setGeneratedReport(analysisReport);
        report.setCreatedAt(timestamp);
        
        repository.save(report);

        return new CompetitorAnalysisResponse(analysisReport);
    }

    public List<CompetitorReport> getSavedReports(String salonId) {
        return repository.findBySalonId(salonId);
    }

    public String generateAttackAds(String salonId, String sk) {
        CompetitorReport report = repository.getReport(salonId, sk);
        if (report == null) {
            throw new RuntimeException("Report not found");
        }

        String promptText = String.format("Based on the following competitor analysis report for '%s', generate 3 aggressive but professional Google Search Ad copies and 3 Meta (Facebook/Instagram) Ad copies for 'Pihu Makeover' that directly target the weaknesses identified in the report. Make the ads highly clickable.\n\nReport:\n%s",
                report.getCompetitorName(),
                report.getGeneratedReport());

        return chatClient.prompt()
                .user(promptText)
                .call()
                .content();
    }
}
