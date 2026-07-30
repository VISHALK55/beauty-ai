package com.beautyai.salon.repository;

import com.beautyai.salon.model.Salon;
import org.springframework.stereotype.Repository;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.Key;
import software.amazon.awssdk.enhanced.dynamodb.TableSchema;
import java.util.List;

import com.beautyai.salon.model.SalonServiceItem;
import com.beautyai.salon.model.Appointment;
import software.amazon.awssdk.enhanced.dynamodb.model.QueryConditional;

@Repository
public class SalonRepository {

    private final DynamoDbTable<Salon> salonTable;
    private final DynamoDbTable<SalonServiceItem> serviceTable;
    private final DynamoDbTable<Appointment> appointmentTable;

    public SalonRepository(DynamoDbEnhancedClient enhancedClient) {
        String tableName = System.getenv("TABLE_NAME") != null ? System.getenv("TABLE_NAME") : "BeautyAiTable";
        this.salonTable = enhancedClient.table(tableName, TableSchema.fromBean(Salon.class));
        this.serviceTable = enhancedClient.table(tableName, TableSchema.fromBean(SalonServiceItem.class));
        this.appointmentTable = enhancedClient.table(tableName, TableSchema.fromBean(Appointment.class));
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

    public void saveService(SalonServiceItem service) {
        serviceTable.putItem(service);
    }

    public List<SalonServiceItem> findServicesBySalonId(String salonId) {
        Key key = Key.builder().partitionValue("SALON#" + salonId).sortValue("SERVICE#").build();
        QueryConditional queryConditional = QueryConditional.sortBeginsWith(key);
        return serviceTable.query(r -> r.queryConditional(queryConditional)).items().stream().toList();
    }

    public void saveAppointment(Appointment appointment) {
        appointmentTable.putItem(appointment);
    }

    public List<Appointment> findAppointmentsBySalonId(String salonId) {
        Key key = Key.builder().partitionValue("SALON#" + salonId).sortValue("APPOINTMENT#").build();
        QueryConditional queryConditional = QueryConditional.sortBeginsWith(key);
        return appointmentTable.query(r -> r.queryConditional(queryConditional)).items().stream().toList();
    }
}
