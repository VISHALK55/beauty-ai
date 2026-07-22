package com.beautyai.salon.controller;

import com.beautyai.salon.dto.CreateSalonRequest;
import com.beautyai.salon.model.Salon;
import com.beautyai.salon.service.SalonService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/salons")
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
}
