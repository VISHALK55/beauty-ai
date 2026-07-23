/**
 * Internal SEO Algorithm - Geo Rank AI Engine (Hyper-Local Edition)
 * This script dynamically generates advanced Google JSON-LD structured data.
 * It uses GeoCircle proximity grids to dominate local maps.
 */

export const generateLocalBusinessSchema = (salonData) => {
  return {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": salonData.name,
    "image": salonData.image || "https://example.com/salon-hero.jpg",
    "@id": `https://surbhibeauty.com/salon/${salonData.id}`,
    "url": `https://surbhibeauty.com/salon/${salonData.id}`,
    "telephone": salonData.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": salonData.streetAddress,
      "addressLocality": salonData.city,
      "addressRegion": salonData.state,
      "postalCode": salonData.zipCode,
      "addressCountry": "IN"
    },
    // Advanced GeoCircle Grid Targeting
    "areaServed": [
      {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": salonData.latitude,
          "longitude": salonData.longitude
        },
        "geoRadius": "5000" // 5 kilometers radius
      },
      ...salonData.neighborhoods.map(hood => ({
        "@type": "Place",
        "name": hood
      }))
    ],
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": salonData.latitude,
      "longitude": salonData.longitude
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
        ],
        "opens": "09:00",
        "closes": "21:00"
      }
    ],
    "priceRange": "₹₹",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "124"
    }
  };
};

export const generateServiceSchema = (serviceData, salonData, neighborhoodSlug) => {
  const neighborhoodName = neighborhoodSlug ? neighborhoodSlug.replace(/-/g, ' ') : salonData.city;
  
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${serviceData.name} in ${neighborhoodName}`,
    "description": `Premium ${serviceData.name} located exactly in ${neighborhoodName}. ${serviceData.description}`,
    "provider": {
      "@type": "BeautySalon",
      "name": salonData.name,
      "@id": `https://surbhibeauty.com/salon/${salonData.id}`
    },
    "areaServed": {
      "@type": "Place",
      "name": neighborhoodName
    },
    "offers": {
      "@type": "Offer",
      "price": serviceData.price,
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock"
    }
  };
};
