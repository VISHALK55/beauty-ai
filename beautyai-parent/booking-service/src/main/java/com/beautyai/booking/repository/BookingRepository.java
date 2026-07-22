package com.beautyai.booking.repository;

import com.beautyai.booking.model.Booking;
import org.springframework.stereotype.Repository;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.Key;
import software.amazon.awssdk.enhanced.dynamodb.TableSchema;

@Repository
public class BookingRepository {

    private final DynamoDbTable<Booking> bookingTable;

    public BookingRepository(DynamoDbEnhancedClient enhancedClient) {
        this.bookingTable = enhancedClient.table("BeautyAI_BookingService", TableSchema.fromBean(Booking.class));
    }

    public void save(Booking booking) {
        bookingTable.putItem(booking);
    }

    public Booking findById(String salonId, String date, String bookingId) {
        Key key = Key.builder()
                .partitionValue("SALON#" + salonId)
                .sortValue("APPT#" + date + "#" + bookingId)
                .build();
        return bookingTable.getItem(key);
    }
}
