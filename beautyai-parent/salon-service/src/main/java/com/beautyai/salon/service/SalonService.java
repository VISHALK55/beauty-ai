package com.beautyai.salon.service;

import com.beautyai.salon.dto.CreateSalonRequest;
import com.beautyai.salon.model.Salon;
import com.beautyai.salon.repository.SalonRepository;
import com.beautyai.salon.util.S3Service;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class SalonService {

    private final SalonRepository salonRepository;
    private final S3Service s3Service;

    public SalonService(SalonRepository salonRepository, S3Service s3Service) {
        this.salonRepository = salonRepository;
        this.s3Service = s3Service;
    }

    public Salon createSalon(CreateSalonRequest request) {
        Salon salon = new Salon();
        String id = request.getName().toLowerCase().replace(" ", "-"); // Use predictable ID for seed script
        
        salon.setPk("SALON#" + id);
        salon.setSk("METADATA");
        salon.setId(id);
        salon.setName(request.getName());
        salon.setAddress(request.getAddress());
        salon.setGstNumber(request.getGstNumber());
        salon.setWorkingHours(request.getWorkingHours());
        salon.setAiSystemPrompt(request.getAiSystemPrompt());
        salon.setGoogleMapsLink(request.getGoogleMapsLink());
        salon.setCity(request.getCity());
        salon.setPhone(request.getPhone());
        salon.setInstagram(request.getInstagram());
        salon.setRating(request.getRating());
        salon.setReviews(request.getReviews());
        salon.setNeighborhoods(request.getNeighborhoods());
        salon.setAccessPin(request.getAccessPin());
        salon.setGeoRankEnabled(true); // Enabled by default as per zero-touch onboarding
        
        // Zero-Touch Onboarding: Auto-Discover Google Maps Link
        if (request.getGoogleMapsLink() == null || request.getGoogleMapsLink().trim().isEmpty()) {
            // Mocking a Google Places API call
            String autoDiscoveredLink = "https://maps.google.com/?q=" + 
                request.getName().replace(" ", "+") + "+" + request.getCity().replace(" ", "+");
            salon.setGoogleMapsLink(autoDiscoveredLink);
            System.out.println("Auto-discovered Google Maps Link for " + request.getName() + ": " + autoDiscoveredLink);
        } else {
            salon.setGoogleMapsLink(request.getGoogleMapsLink());
        }

        // Handle Image Uploads via S3
        String heroUrl = s3Service.uploadBase64Image(request.getHeroImage(), "salons/" + id + "/hero");
        salon.setHeroImage(heroUrl);
        // Fallback for older fields
        salon.setImage(heroUrl != null ? heroUrl : request.getImage());

        List<String> galleryUrls = new ArrayList<>();
        if (request.getGalleryImages() != null) {
            for (String base64Img : request.getGalleryImages()) {
                String s3Url = s3Service.uploadBase64Image(base64Img, "salons/" + id + "/gallery");
                if (s3Url != null) {
                    galleryUrls.add(s3Url);
                }
            }
        }
        salon.setGalleryImages(galleryUrls);

        salonRepository.save(salon);
        return salon;
    }

    public Salon updateGeoRankSettings(String id, com.beautyai.salon.dto.GeoRankUpdateDto dto) {
        Salon salon = getSalon(id);
        if (salon == null) {
            throw new RuntimeException("Salon not found");
        }
        if (dto.getGeoRankEnabled() != null) {
            salon.setGeoRankEnabled(dto.getGeoRankEnabled());
        }
        if (dto.getGoogleMapsLink() != null) {
            salon.setGoogleMapsLink(dto.getGoogleMapsLink());
        }
        salonRepository.save(salon);
        return salon;
    }

    public Salon getSalon(String id) {
        return salonRepository.findById(id);
    }

    public List<Salon> getAllSalons() {
        return salonRepository.findAll();
    }

    public com.beautyai.salon.model.SalonServiceItem createService(String salonId, com.beautyai.salon.dto.CreateServiceRequest request) {
        com.beautyai.salon.model.SalonServiceItem service = new com.beautyai.salon.model.SalonServiceItem();
        String serviceId = java.util.UUID.randomUUID().toString();
        
        service.setPk("SALON#" + salonId);
        service.setSk("SERVICE#" + serviceId);
        service.setId(serviceId);
        service.setSalonId(salonId);
        service.setName(request.getName());
        service.setDescription(request.getDescription());
        service.setPriceINR(request.getPriceINR());
        service.setDuration(request.getDuration());
        service.setIcon(request.getIcon());

        salonRepository.saveService(service);
        return service;
    }

    public List<com.beautyai.salon.model.SalonServiceItem> getServices(String salonId) {
        return salonRepository.findServicesBySalonId(salonId);
    }

    public com.beautyai.salon.model.Appointment createAppointment(String salonId, com.beautyai.salon.dto.CreateAppointmentRequest request) {
        com.beautyai.salon.model.Appointment appointment = new com.beautyai.salon.model.Appointment();
        String appointmentId = "BK-" + java.util.UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        
        appointment.setPk("SALON#" + salonId);
        appointment.setSk("APPOINTMENT#" + appointmentId);
        appointment.setId(appointmentId);
        appointment.setSalonId(salonId);
        appointment.setCustomerName(request.getCustomerName());
        appointment.setSalonName(request.getSalonName());
        appointment.setServiceName(request.getServiceName());
        appointment.setPrice(request.getPrice());
        appointment.setDate(request.getDate());
        appointment.setTime(request.getTime());
        appointment.setStatus(request.getStatus() != null ? request.getStatus() : "Confirmed");
        appointment.setPhone(request.getPhone());
        appointment.setSource(request.getSource() != null ? request.getSource() : "Manual Booking");

        salonRepository.saveAppointment(appointment);
        return appointment;
    }

    public List<com.beautyai.salon.model.Appointment> getAppointments(String salonId) {
        return salonRepository.findAppointmentsBySalonId(salonId);
    }
}
