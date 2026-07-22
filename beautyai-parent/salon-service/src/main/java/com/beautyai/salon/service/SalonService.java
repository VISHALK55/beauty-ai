package com.beautyai.salon.service;

import com.beautyai.salon.dto.CreateSalonRequest;
import com.beautyai.salon.model.Salon;
import com.beautyai.salon.repository.SalonRepository;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
public class SalonService {

    private final SalonRepository salonRepository;

    public SalonService(SalonRepository salonRepository) {
        this.salonRepository = salonRepository;
    }

    public Salon createSalon(CreateSalonRequest request) {
        Salon salon = new Salon();
        String id = UUID.randomUUID().toString();
        
        salon.setPk("SALON#" + id);
        salon.setSk("METADATA");
        salon.setId(id);
        salon.setName(request.getName());
        salon.setAddress(request.getAddress());
        salon.setGstNumber(request.getGstNumber());
        salon.setWorkingHours(request.getWorkingHours());

        salonRepository.save(salon);
        return salon;
    }

    public Salon getSalon(String id) {
        return salonRepository.findById(id);
    }
}
