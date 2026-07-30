package com.beautyai.salon.repository;

import com.beautyai.salon.model.AdCampaign;
import org.springframework.stereotype.Repository;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.TableSchema;

import java.util.List;
import java.util.stream.Collectors;

@Repository
public class AdCampaignRepository {
    private final DynamoDbTable<AdCampaign> adCampaignTable;

    public AdCampaignRepository(DynamoDbEnhancedClient enhancedClient) {
        String tableName = System.getenv("TABLE_NAME");
        if (tableName == null || tableName.isEmpty()) {
            tableName = "BeautyAiTable"; // default for local
        }
        this.adCampaignTable = enhancedClient.table(tableName, TableSchema.fromBean(AdCampaign.class));
    }

    public void save(AdCampaign adCampaign) {
        adCampaignTable.putItem(adCampaign);
    }
}
