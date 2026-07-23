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

        // Mock Database Query: In production, this would be salonRepository.findAll()
        // For MVP, we simulate the two salons we know exist in the system.
        List<String> salonIds = Arrays.asList("surbhi-gaya", "pihu-makeover", "glamour-gaya", "radiance-bodhgaya", "blossom-gaya");
        List<String> services = Arrays.asList("bridal-makeup", "hair-spa");
        List<String> neighborhoods = Arrays.asList("bodhgaya", "ap-colony", "sujata-bypass");

        // Step 2: Programmatically generate URLs for the SEO Engine
        for (String salonId : salonIds) {
            for (String service : services) {
                // Add the base service page
                String baseUrl = String.format("%s/salon/%s/%s", domain, salonId, service);
                xmlBuilder.append(createUrlTag(baseUrl));

                // Add the Hyper-Local Neighborhood pages
                for (String neighborhood : neighborhoods) {
                    String localUrl = String.format("%s/salon/%s/%s/%s", domain, salonId, service, neighborhood);
                    xmlBuilder.append(createUrlTag(localUrl));
                }
            }
        }

        xmlBuilder.append("</urlset>");
        return ResponseEntity.ok(xmlBuilder.toString());
    }

    private String createUrlTag(String url) {
        return "  <url>\n" +
               "    <loc>" + url + "</loc>\n" +
               "    <changefreq>daily</changefreq>\n" +
               "    <priority>0.9</priority>\n" +
               "  </url>\n";
    }
}
