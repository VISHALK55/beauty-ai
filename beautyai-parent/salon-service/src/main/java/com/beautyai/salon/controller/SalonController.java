package com.beautyai.salon.controller;

import com.beautyai.salon.dto.CreateSalonRequest;
import com.beautyai.salon.model.Salon;
import com.beautyai.salon.service.SalonService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/salons")
@CrossOrigin(origins = "*")
public class SalonController {

    private final SalonService salonService;

    public SalonController(SalonService salonService) {
        this.salonService = salonService;
    }

    @PostMapping
    public ResponseEntity<Salon> createSalon(@RequestBody CreateSalonRequest request) {
        Salon created = salonService.createSalon(request);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Salon> getSalon(@PathVariable String id) {
        Salon salon = salonService.getSalon(id);
        if (salon == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(salon);
    }

    @GetMapping
    public ResponseEntity<List<Salon>> getAllSalons() {
        return ResponseEntity.ok(salonService.getAllSalons());
    }

    @PostMapping("/{id}/services")
    public ResponseEntity<com.beautyai.salon.model.SalonServiceItem> createService(
            @PathVariable String id, 
            @RequestBody com.beautyai.salon.dto.CreateServiceRequest request) {
        return new ResponseEntity<>(salonService.createService(id, request), HttpStatus.CREATED);
    }

    @GetMapping("/{id}/services")
    public ResponseEntity<List<com.beautyai.salon.model.SalonServiceItem>> getServices(@PathVariable String id) {
        return ResponseEntity.ok(salonService.getServices(id));
    }

    @PostMapping("/{id}/appointments")
    public ResponseEntity<com.beautyai.salon.model.Appointment> createAppointment(
            @PathVariable String id, 
            @RequestBody com.beautyai.salon.dto.CreateAppointmentRequest request) {
        return new ResponseEntity<>(salonService.createAppointment(id, request), HttpStatus.CREATED);
    }

    @GetMapping("/{id}/appointments")
    public ResponseEntity<List<com.beautyai.salon.model.Appointment>> getAppointments(@PathVariable String id) {
        return ResponseEntity.ok(salonService.getAppointments(id));
    }

    @PutMapping("/{id}/geo-rank")
    public ResponseEntity<Salon> updateGeoRankSettings(
            @PathVariable String id, 
            @RequestBody com.beautyai.salon.dto.GeoRankUpdateDto request) {
        try {
            Salon updated = salonService.updateGeoRankSettings(id, request);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
