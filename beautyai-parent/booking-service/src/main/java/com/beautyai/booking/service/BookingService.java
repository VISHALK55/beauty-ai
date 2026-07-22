package com.beautyai.booking.service;

import com.beautyai.booking.dto.CreateBookingRequest;
import com.beautyai.booking.model.Booking;
import com.beautyai.booking.repository.BookingRepository;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public Booking createBooking(CreateBookingRequest request) {
        Booking booking = new Booking();
        String id = UUID.randomUUID().toString();
        
        booking.setPk("SALON#" + request.getSalonId());
        booking.setSk("APPT#" + request.getDate() + "#" + id);
        booking.setId(id);
        booking.setCustomerId(request.getCustomerId());
        booking.setStaffId(request.getStaffId());
        booking.setServiceId(request.getServiceId());
        booking.setStartTime(request.getStartTime());
        booking.setStatus("PENDING");
        
        booking.setGsi1pk("CUSTOMER#" + request.getCustomerId());
        booking.setGsi1sk("APPT#" + request.getDate());

        bookingRepository.save(booking);
        return booking;
    }

    public Booking getBooking(String salonId, String date, String bookingId) {
        return bookingRepository.findById(salonId, date, bookingId);
    }
}
