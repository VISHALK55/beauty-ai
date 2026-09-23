package com.beautyai.ai.repository;

import com.beautyai.ai.model.CompetitorReport;
import org.springframework.stereotype.Repository;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.Key;
import software.amazon.awssdk.enhanced.dynamodb.TableSchema;
import software.amazon.awssdk.enhanced.dynamodb.model.QueryConditional;

import java.util.List;
import java.util.stream.Collectors;

@Repository
public class CompetitorReportRepository {

    private final DynamoDbTable<CompetitorReport> table;

    public CompetitorReportRepository(DynamoDbEnhancedClient enhancedClient) {
        String tableName = System.getenv("TABLE_NAME");
        if (tableName == null || tableName.isEmpty()) {
            tableName = "BeautyAiTable";
        }
        this.table = enhancedClient.table(tableName, TableSchema.fromBean(CompetitorReport.class));
    }

    public void save(CompetitorReport report) {
        table.putItem(report);
    }

    public List<CompetitorReport> findBySalonId(String salonId) {
        QueryConditional queryConditional = QueryConditional
                .sortBeginsWith(Key.builder().partitionValue("SALON#" + salonId).sortValue("COMPETITOR_REPORT#").build());

        return table.query(r -> r.queryConditional(queryConditional))
                .items()
                .stream()
                .collect(Collectors.toList());
    }

    public CompetitorReport getReport(String salonId, String sk) {
        return table.getItem(Key.builder().partitionValue("SALON#" + salonId).sortValue(sk).build());
    }
}
