package com.beautyai.ai.dto;

public class CompetitorAnalysisResponse {
    private String analysisReport;

    public CompetitorAnalysisResponse() {
    }

    public CompetitorAnalysisResponse(String analysisReport) {
        this.analysisReport = analysisReport;
    }

    public String getAnalysisReport() {
        return analysisReport;
    }

    public void setAnalysisReport(String analysisReport) {
        this.analysisReport = analysisReport;
    }
}
