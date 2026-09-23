package com.beautyai.salon;

import com.beautyai.salon.model.meta.MetaCampaign;
import com.beautyai.salon.model.meta.MetaConnection;
import com.beautyai.salon.service.meta.MetaAdsService;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ApplicationContext;
import java.util.Map;
import java.util.UUID;
import com.fasterxml.jackson.databind.ObjectMapper;

public class MetaValidationRunner {
    public static void main(String[] args) {
        ApplicationContext ctx = SpringApplication.run(com.beautyai.MonolithApplication.class, args);
        MetaAdsService metaAdsService = ctx.getBean(MetaAdsService.class);
        String businessId = "test-salon-1";
        
        System.out.println("Starting Meta E2E Validation for business: " + businessId);
        
        try {
            System.out.println("\nSTEP 1: CONNECTION");
            String status = metaAdsService.getConnectionStatus(businessId);
            System.out.println("Connection Status: " + status);
            
            System.out.println("\nSTEP 2: ASSETS");
            Map<String, Object> assets = metaAdsService.discoverAssets(businessId);
            System.out.println(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(assets));
            
            // To proceed, we must manually inject the correct ids into DynamoDB or test-run the creation logic if the credentials have them.
            // But let's first see what's discovered.
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.exit(0);
    }
}