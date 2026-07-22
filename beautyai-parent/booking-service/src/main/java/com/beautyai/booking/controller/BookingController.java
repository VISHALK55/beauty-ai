package com.beautyai.booking.controller;

import com.beautyai.booking.dto.CreateBookingRequest;
import com.beautyai.booking.model.Booking;
import com.beautyai.booking.service.BookingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody CreateBookingRequest request) {
        Booking created = bookingService.createBooking(request);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping("/{salonId}/{date}/{bookingId}")
    public ResponseEntity<Booking> getBooking(@PathVariable String salonId, 
                                              @PathVariable String date, 
                                              @PathVariable String bookingId) {
        Booking booking = bookingService.getBooking(salonId, date, bookingId);
        if (booking == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(booking);
    }
}
