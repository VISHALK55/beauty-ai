package com.beautyai.salon.controller;

import com.beautyai.salon.model.Salon;
import com.beautyai.salon.repository.SalonRepository;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;
import java.util.Arrays;

@RestController
@RequestMapping("/api/v1")
public class SitemapController {

    private final SalonRepository salonRepository;

    public SitemapController(SalonRepository salonRepository) {
        this.salonRepository = salonRepository;
    }

    @GetMapping(value = "/sitemap.xml", produces = MediaType.APPLICATION_XML_VALUE)
    public ResponseEntity<String> generateSitemap(HttpServletRequest request) {
        // Step 1: Detect the dynamic domain (works on Vercel now, works on your future domain later)
        String scheme = request.getScheme(); 
        String serverName = request.getServerName();
        String domain = scheme + "://" + serverName;
        
        // Hardcode Vercel domain for MVP testing if running locally
        if (serverName.contains("localhost")) {
            domain = "https://beauty-ai-tau.vercel.app";
        }

        StringBuilder xmlBuilder = new StringBuilder();
        xmlBuilder.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
        xmlBuilder.append("<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n");

        // Step 2: Fetch all actual salons from the database
        List<Salon> allSalons = salonRepository.findAll();
        
        List<String> services = Arrays.asList("bridal-makeup", "hair-spa", "facial", "skin-care", "pre-bridal");
        List<String> neighborhoods = Arrays.asList("bodhgaya", "gaya-main-market", "ap-colony", "sujata-bypass", "kalchakra-maidan");

        // Step 3: Programmatically generate URLs for the SEO Engine
        for (Salon salon : allSalons) {
            String salonId = salon.getId();
            // Skip Super Admin record from Sitemap
            if ("SUPER_ADMIN".equals(salonId)) {
                continue;
            }
            boolean isFlagship = "pihu-makeover".equals(salonId);
            for (String service : services) {
                // Add the base service page
                String baseUrl = String.format("%s/salon/%s/%s", domain, salonId, service);
                xmlBuilder.append(createUrlTag(baseUrl, isFlagship));

                // Add the Hyper-Local Neighborhood pages
                for (String neighborhood : neighborhoods) {
                    String localUrl = String.format("%s/salon/%s/%s/%s", domain, salonId, service, neighborhood);
                    xmlBuilder.append(createUrlTag(localUrl, isFlagship));
                }
            }
        }

        xmlBuilder.append("</urlset>");
        return ResponseEntity.ok(xmlBuilder.toString());
    }

    private String createUrlTag(String url, boolean isFlagship) {
        String priority = isFlagship ? "1.0" : "0.8";
        String changefreq = isFlagship ? "hourly" : "daily";
        return "  <url>\n" +
               "    <loc>" + url + "</loc>\n" +
               "    <changefreq>" + changefreq + "</changefreq>\n" +
               "    <priority>" + priority + "</priority>\n" +
               "  </url>\n";
    }
}
