package com.beautyai.salon.service.meta;

import com.beautyai.salon.model.meta.IdempotencyRecord;
import com.beautyai.salon.model.meta.MetaAuditLog;
import com.beautyai.salon.model.meta.MetaCampaign;
import com.beautyai.salon.model.meta.MetaConnection;
import com.beautyai.salon.model.meta.OAuthStateRecord;
import com.beautyai.salon.util.EncryptionUtil;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.Key;
import software.amazon.awssdk.enhanced.dynamodb.TableSchema;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;

import java.util.Map;
import java.util.UUID;

@Service
public class MetaAdsService {

    private final MetaApiClient metaApiClient;
    private final EncryptionUtil encryptionUtil;
    
    private final DynamoDbTable<MetaConnection> connectionTable;
    private final DynamoDbTable<MetaCampaign> campaignTable;
    private final DynamoDbTable<MetaAuditLog> auditTable;
    private final DynamoDbTable<IdempotencyRecord> idempotencyTable;
    private final DynamoDbTable<OAuthStateRecord> stateTable;
    private final BudgetConversionService budgetConversionService;

    public MetaAdsService(MetaApiClient metaApiClient, EncryptionUtil encryptionUtil, BudgetConversionService budgetConversionService, DynamoDbClient dynamoDbClient) {
        this.metaApiClient = metaApiClient;
        this.encryptionUtil = encryptionUtil;
        this.budgetConversionService = budgetConversionService;
        DynamoDbEnhancedClient enhancedClient = DynamoDbEnhancedClient.builder().dynamoDbClient(dynamoDbClient).build();
        this.connectionTable = enhancedClient.table("BeautyAiTable", TableSchema.fromBean(MetaConnection.class));
        this.campaignTable = enhancedClient.table("BeautyAiTable", TableSchema.fromBean(MetaCampaign.class));
        this.auditTable = enhancedClient.table("BeautyAiTable", TableSchema.fromBean(MetaAuditLog.class));
        this.idempotencyTable = enhancedClient.table("BeautyAiTable", TableSchema.fromBean(IdempotencyRecord.class));
        this.stateTable = enhancedClient.table("BeautyAiTable", TableSchema.fromBean(OAuthStateRecord.class));
    }

    public String generateOAuthState(String businessId) {
        String state = UUID.randomUUID().toString();
        OAuthStateRecord record = new OAuthStateRecord();
        record.setPk("OAUTH_STATE#" + state);
        record.setSk("METADATA");
        record.setBusinessId(businessId);
        record.setCreatedAt(System.currentTimeMillis());
        record.setExpiresAt((System.currentTimeMillis() / 1000) + (15 * 60)); // 15 min TTL
        stateTable.putItem(record);
        return state;
    }

    public void handleOAuthCallback(String state, String code) {
        OAuthStateRecord record = stateTable.getItem(Key.builder().partitionValue("OAUTH_STATE#" + state).sortValue("METADATA").build());
        if (record == null) {
            throw new RuntimeException("Invalid or expired OAuth state parameter.");
        }
        String businessId = record.getBusinessId();

        try {
            Map<String, Object> shortTokenRes = metaApiClient.exchangeCodeForToken(code);
            String shortToken = (String) shortTokenRes.get("access_token");
            
            Map<String, Object> longTokenRes = metaApiClient.getLongLivedToken(shortToken);
            String longToken = (String) longTokenRes.get("access_token");
            
            Map<String, Object> meRes = metaApiClient.getMe(longToken);
            String metaUserId = (String) meRes.get("id");

            MetaConnection conn = new MetaConnection();
            conn.setPk("SALON#" + businessId);
            conn.setSk("META_CONN");
            conn.setBusinessId(businessId);
            conn.setMetaUserId(metaUserId);
            conn.setEncryptedAccessToken(encryptionUtil.encrypt(longToken));
            conn.setStatus("ACTIVE");
            conn.setCreatedAt(System.currentTimeMillis());
            
            connectionTable.putItem(conn);
            logAudit(businessId, "user", "META_CONNECTED", metaUserId, "SUCCESS", null, null);
        } catch (Exception e) {
            logAudit(businessId, "user", "META_CONNECTED", null, "ERROR", "OAUTH_FAILED", e.getMessage());
            throw new RuntimeException("OAuth failed: " + e.getMessage());
        } finally {
            stateTable.deleteItem(Key.builder().partitionValue("OAUTH_STATE#" + state).sortValue("METADATA").build());
        }
    }
    
    public Map<String, Object> discoverAssets(String businessId) {
        MetaConnection conn = getConnection(businessId);
        String token = encryptionUtil.decrypt(conn.getEncryptedAccessToken());
        
        Map<String, Object> adAccounts = metaApiClient.getAdAccounts(conn.getMetaUserId(), token);
        Map<String, Object> pages = metaApiClient.getPages(conn.getMetaUserId(), token);
        
        Map<String, Object> connectedIgAccounts = null;
        if (conn.getAdAccountId() != null && !conn.getAdAccountId().isEmpty()) {
            try {
                connectedIgAccounts = metaApiClient.getConnectedInstagramAccounts(conn.getAdAccountId(), token);
            } catch (Exception e) {
                System.out.println("Could not fetch connected IG accounts: " + e.getMessage());
            }
        }
        
        return Map.of("adAccounts", adAccounts, "pages", pages, "connectedInstagramAccounts", connectedIgAccounts != null ? connectedIgAccounts : Map.of());
    }

    public String getConnectionStatus(String businessId) {
        MetaConnection conn = getConnection(businessId);
        if (conn == null || !"ACTIVE".equals(conn.getStatus())) return "NOT_CONNECTED";
        
        boolean hasAdAccount = conn.getAdAccountId() != null && !conn.getAdAccountId().isEmpty();
        boolean hasPage = conn.getPageId() != null && !conn.getPageId().isEmpty();
        boolean hasIg = conn.getInstagramUserId() != null && !conn.getInstagramUserId().isEmpty();
        
        if (!hasAdAccount) return "META_CONNECTED";
        if (!hasPage) return "FACEBOOK_PAGE_REQUIRED";
        if (!hasIg) return "INSTAGRAM_REQUIRED";
        
        return "READY_FOR_INSTAGRAM_ADS";
    }
    
    public Map<String, Object> discoverInstagramForPage(String businessId, String pageId) {
        MetaConnection conn = getConnection(businessId);
        String token = encryptionUtil.decrypt(conn.getEncryptedAccessToken());
        return metaApiClient.getInstagramAccounts(pageId, token);
    }

    public void selectAssets(String businessId, String adAccountId, String pageId, String instagramUserId) {
        MetaConnection conn = getConnection(businessId);
        String token = encryptionUtil.decrypt(conn.getEncryptedAccessToken());
        
        if (pageId != null && !pageId.trim().isEmpty() && (instagramUserId == null || instagramUserId.isEmpty() || "[ None Selected ]".equals(instagramUserId))) {
            try {
                Map<String, Object> pageIg = metaApiClient.getInstagramAccounts(pageId, token);
                if (pageIg != null && pageIg.containsKey("instagram_business_account")) {
                    Map<String, Object> igAccount = (Map<String, Object>) pageIg.get("instagram_business_account");
                    if (igAccount != null && igAccount.containsKey("id")) {
                        instagramUserId = (String) igAccount.get("id");
                        System.out.println("Auto-fetched IG Account from Page: " + instagramUserId);
                    }
                }
            } catch (Exception e) {
                System.out.println("Could not auto-fetch IG account for page: " + e.getMessage());
            }
        }
        
        conn.setAdAccountId(adAccountId != null && (adAccountId.trim().isEmpty() || "[ None Selected ]".equals(adAccountId)) ? null : adAccountId);
        conn.setPageId(pageId != null && (pageId.trim().isEmpty() || "[ None Selected ]".equals(pageId)) ? null : pageId);
        conn.setInstagramUserId(instagramUserId != null && (instagramUserId.trim().isEmpty() || "[ None Selected ]".equals(instagramUserId)) ? null : instagramUserId);
        conn.setUpdatedAt(System.currentTimeMillis());
        connectionTable.updateItem(conn);
    }

    public String createDraftCampaign(MetaCampaign request, String idempotencyKey) {
        String status = getConnectionStatus(request.getBusinessId());
        if (!"READY_FOR_INSTAGRAM_ADS".equals(status)) {
            throw new RuntimeException("Cannot create campaign: " + status);
        }

        // 1. Idempotency Check
        IdempotencyRecord record = idempotencyTable.getItem(Key.builder().partitionValue("IDEMPOTENCY#" + idempotencyKey).sortValue("METADATA").build());
        if (record != null) {
            return record.getMetaCampaignId(); // Return previously created ID
        }

        String internalCampaignId = UUID.randomUUID().toString();
        request.setPk("SALON#" + request.getBusinessId());
        request.setSk("META_CAMP#" + internalCampaignId);
        request.setId(internalCampaignId);
        request.setStatus("DRAFT");
        request.setCreatedAt(System.currentTimeMillis());

        MetaConnection conn = getConnection(request.getBusinessId());
        String token = encryptionUtil.decrypt(conn.getEncryptedAccessToken());

        try {
            long budgetMinorUnit = budgetConversionService.convertToMetaCurrency(request.getDailyBudget());

            // 2. Create Campaign (PAUSED)
            String metaCampId = metaApiClient.createCampaign(conn.getAdAccountId(), token, request.getName(), request.getObjective(), budgetMinorUnit);
            request.setMetaCampaignId(metaCampId);
            
            // 3. Create Ad Set (PAUSED)
            long endTimeUnix = 0;
            if (request.getDurationDays() != null && request.getDurationDays() > 0) {
                endTimeUnix = (System.currentTimeMillis() / 1000) + (request.getDurationDays() * 24L * 60L * 60L);
            }
            
            String adSetId = metaApiClient.createAdSet(conn.getAdAccountId(), token, metaCampId, request.getName() + " AdSet", 
                    budgetMinorUnit, request.getLatitude(), request.getLongitude(), request.getRadiusKm(), 
                    request.getAgeMin(), request.getAgeMax(), request.getGender(), endTimeUnix);
            request.setMetaAdSetId(adSetId);

            // 4. Create Creative
            String imageHash = metaApiClient.uploadImage(conn.getAdAccountId(), token, request.getCreativeImageUrl());
            String creativeId = metaApiClient.createCreative(conn.getAdAccountId(), token, conn.getPageId(), conn.getInstagramUserId(),
                    imageHash, "https://beautyai.app/salon/" + request.getBusinessId(), request.getHeadline(), request.getPrimaryText(), request.getCallToAction());
            request.setMetaCreativeId(creativeId);

            // 5. Create Ad (PAUSED)
            String adId = metaApiClient.createAd(conn.getAdAccountId(), token, adSetId, creativeId, request.getName() + " Ad");
            request.setMetaAdId(adId);
            
            request.setStatus("READY_TO_PUBLISH");
            campaignTable.putItem(request);
            
            // 6. Save Idempotency
            IdempotencyRecord newRecord = new IdempotencyRecord();
            newRecord.setPk("IDEMPOTENCY#" + idempotencyKey);
            newRecord.setSk("METADATA");
            newRecord.setMetaCampaignId(internalCampaignId);
            newRecord.setCreatedAt(System.currentTimeMillis());
            newRecord.setExpiresAt((System.currentTimeMillis() / 1000) + (24 * 60 * 60)); // TTL 24h
            idempotencyTable.putItem(newRecord);

            logAudit(request.getBusinessId(), "user", "CAMPAIGN_CREATED", metaCampId, "SUCCESS", null, null);
            return internalCampaignId;
            
        } catch (Exception e) {
            request.setStatus("ERROR");
            request.setMetaStatus(e.getMessage());
            campaignTable.putItem(request);
            logAudit(request.getBusinessId(), "user", "CAMPAIGN_ERROR", null, "ERROR", "CREATION_FAILED", e.getMessage());
            throw new RuntimeException("Failed to draft campaign: " + e.getMessage());
        }
    }

    public void publishCampaign(String businessId, String campaignId) {
        MetaCampaign camp = campaignTable.getItem(Key.builder().partitionValue("SALON#" + businessId).sortValue("META_CAMP#" + campaignId).build());
        if (camp == null || !"READY_TO_PUBLISH".equals(camp.getStatus()) && !"PAUSED".equals(camp.getStatus())) {
            throw new RuntimeException("Campaign not found or not in publishable state.");
        }
        
        MetaConnection conn = getConnection(businessId);
        String token = encryptionUtil.decrypt(conn.getEncryptedAccessToken());
        
        try {
            metaApiClient.updateCampaignStatus(camp.getMetaCampaignId(), token, "ACTIVE");
            camp.setStatus("ACTIVE");
            camp.setUpdatedAt(System.currentTimeMillis());
            campaignTable.updateItem(camp);
            
            logAudit(businessId, "user", "CAMPAIGN_PUBLISHED", camp.getMetaCampaignId(), "SUCCESS", null, null);
        } catch (Exception e) {
            logAudit(businessId, "user", "CAMPAIGN_PUBLISH_ERROR", camp.getMetaCampaignId(), "ERROR", "PUBLISH_FAILED", e.getMessage());
            throw new RuntimeException("Publish failed: " + e.getMessage());
        }
    }
    
    public void pauseCampaign(String businessId, String campaignId) {
        MetaCampaign camp = campaignTable.getItem(Key.builder().partitionValue("SALON#" + businessId).sortValue("META_CAMP#" + campaignId).build());
        if (camp == null) throw new RuntimeException("Campaign not found for this salon");

        MetaConnection conn = getConnection(businessId);
        String token = encryptionUtil.decrypt(conn.getEncryptedAccessToken());
        
        metaApiClient.updateCampaignStatus(camp.getMetaCampaignId(), token, "PAUSED");
        camp.setStatus("PAUSED");
        campaignTable.updateItem(camp);
        logAudit(businessId, "user", "CAMPAIGN_PAUSED", camp.getMetaCampaignId(), "SUCCESS", null, null);
    }
    
    public void resumeCampaign(String businessId, String campaignId) {
        MetaCampaign camp = campaignTable.getItem(Key.builder().partitionValue("SALON#" + businessId).sortValue("META_CAMP#" + campaignId).build());
        if (camp == null) throw new RuntimeException("Campaign not found for this salon");

        MetaConnection conn = getConnection(businessId);
        String token = encryptionUtil.decrypt(conn.getEncryptedAccessToken());
        
        metaApiClient.updateCampaignStatus(camp.getMetaCampaignId(), token, "ACTIVE");
        camp.setStatus("ACTIVE");
        campaignTable.updateItem(camp);
        logAudit(businessId, "user", "CAMPAIGN_RESUMED", camp.getMetaCampaignId(), "SUCCESS", null, null);
    }
    
    public MetaCampaign getCampaignStatus(String businessId, String campaignId) {
        MetaCampaign camp = campaignTable.getItem(Key.builder().partitionValue("SALON#" + businessId).sortValue("META_CAMP#" + campaignId).build());
        if (camp != null && camp.getMetaCampaignId() != null) {
            MetaConnection conn = getConnection(businessId);
            String token = encryptionUtil.decrypt(conn.getEncryptedAccessToken());
            Map<String, Object> statusMap = metaApiClient.getCampaignStatus(camp.getMetaCampaignId(), token);
            String effectiveStatus = (String) statusMap.get("effective_status");
            camp.setMetaStatus(effectiveStatus);
            
            // Map to internal status
            if ("ACTIVE".equals(effectiveStatus)) camp.setStatus("ACTIVE");
            else if ("PAUSED".equals(effectiveStatus)) camp.setStatus("PAUSED");
            else if ("PENDING_REVIEW".equals(effectiveStatus) || "IN_PROCESS".equals(effectiveStatus)) camp.setStatus("PENDING_REVIEW");
            else if ("DISAPPROVED".equals(effectiveStatus) || "WITH_ISSUES".equals(effectiveStatus)) camp.setStatus("ERROR");
            
            campaignTable.updateItem(camp);
        }
        return camp;
    }

    private MetaConnection getConnection(String businessId) {
        MetaConnection conn = connectionTable.getItem(Key.builder().partitionValue("SALON#" + businessId).sortValue("META_CONN").build());
        if (conn == null || !"ACTIVE".equals(conn.getStatus())) {
            throw new RuntimeException("No active Meta connection found for this salon.");
        }
        return conn;
    }

    private void logAudit(String businessId, String userId, String action, String metaObjId, String status, String errorCode, String msg) {
        MetaAuditLog log = new MetaAuditLog();
        log.setPk("SALON#" + businessId);
        log.setSk("AUDIT#" + System.currentTimeMillis() + "#" + UUID.randomUUID().toString());
        log.setBusinessId(businessId);
        log.setUserId(userId);
        log.setAction(action);
        log.setMetaObjectId(metaObjId);
        log.setStatus(status);
        log.setErrorCode(errorCode);
        log.setErrorMessage(msg);
        log.setCreatedAt(System.currentTimeMillis());
        auditTable.putItem(log);
    }
}
