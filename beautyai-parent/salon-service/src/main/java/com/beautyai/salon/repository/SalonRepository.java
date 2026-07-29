package com.beautyai.salon.repository;

import com.beautyai.salon.model.Salon;
import org.springframework.stereotype.Repository;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.Key;
import software.amazon.awssdk.enhanced.dynamodb.TableSchema;
import java.util.List;

@Repository
public class SalonRepository {

    private final DynamoDbTable<Salon> salonTable;

    public SalonRepository(DynamoDbEnhancedClient enhancedClient) {
        String tableName = System.getenv("TABLE_NAME") != null ? System.getenv("TABLE_NAME") : "BeautyAiTable";
        this.salonTable = enhancedClient.table(tableName, TableSchema.fromBean(Salon.class));
    }

    public void save(Salon salon) {
        salonTable.putItem(salon);
    }

    public Salon findById(String id) {
        Key key = Key.builder()
                .partitionValue("SALON#" + id)
                .sortValue("METADATA")
                .build();
        return salonTable.getItem(key);
    }

    public List<Salon> findAll() {
        return salonTable.scan().items().stream().toList();
    }
}
