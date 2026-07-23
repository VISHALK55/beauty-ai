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
        List<String> salonIds = Arrays.asList("surbhi-gaya", "pihu-makeover", "glamour-gaya", "radiance-bodhgaya", "blossom-gaya", "elegance-parlour-gaya", "elegance-studio-bodhgaya", "elegance-makeover-gaya", "elegance-lounge-gaya", "elegance-care-bodhgaya", "elegance-salon-gaya", "elegance-spa-gaya", "elegance-boutique-bodhgaya", "elegance-hub-gaya", "elegance-clinic-gaya", "style-parlour-bodhgaya", "style-studio-gaya", "style-makeover-gaya", "style-lounge-bodhgaya", "style-care-gaya", "style-salon-gaya", "style-spa-bodhgaya", "style-boutique-gaya", "style-hub-gaya", "style-clinic-bodhgaya", "beauty-parlour-gaya", "beauty-studio-gaya", "beauty-makeover-bodhgaya", "beauty-lounge-gaya", "beauty-care-gaya", "beauty-salon-bodhgaya", "beauty-spa-gaya", "beauty-boutique-gaya", "beauty-hub-bodhgaya", "beauty-clinic-gaya", "glamour-parlour-gaya", "glamour-studio-bodhgaya", "glamour-makeover-gaya", "glamour-lounge-gaya", "glamour-care-bodhgaya", "glamour-salon-gaya", "glamour-spa-gaya", "glamour-boutique-bodhgaya", "glamour-hub-gaya", "glamour-clinic-gaya", "radiance-parlour-bodhgaya", "radiance-studio-gaya", "radiance-makeover-gaya", "radiance-lounge-bodhgaya", "radiance-care-gaya", "radiance-salon-gaya", "radiance-spa-bodhgaya", "radiance-boutique-gaya", "radiance-hub-gaya", "radiance-clinic-bodhgaya", "blossom-parlour-gaya", "blossom-studio-gaya", "blossom-makeover-bodhgaya", "blossom-lounge-gaya", "blossom-care-gaya", "blossom-salon-bodhgaya", "blossom-spa-gaya", "blossom-boutique-gaya", "blossom-hub-bodhgaya", "blossom-clinic-gaya", "aura-parlour-gaya", "aura-studio-bodhgaya", "aura-makeover-gaya", "aura-lounge-gaya", "aura-care-bodhgaya", "aura-salon-gaya", "aura-spa-gaya", "aura-boutique-bodhgaya", "aura-hub-gaya", "aura-clinic-gaya", "divine-parlour-bodhgaya", "divine-studio-gaya", "divine-makeover-gaya", "divine-lounge-bodhgaya", "divine-care-gaya", "divine-salon-gaya", "divine-spa-bodhgaya", "divine-boutique-gaya", "divine-hub-gaya", "divine-clinic-bodhgaya", "flawless-parlour-gaya", "flawless-studio-gaya", "flawless-makeover-bodhgaya", "flawless-lounge-gaya", "flawless-care-gaya", "flawless-salon-bodhgaya", "flawless-spa-gaya", "flawless-boutique-gaya", "flawless-hub-bodhgaya", "flawless-clinic-gaya", "chic-parlour-gaya", "chic-studio-bodhgaya", "chic-makeover-gaya", "chic-lounge-gaya", "chic-care-bodhgaya");
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
