import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { generateLocalBusinessSchema, generateServiceSchema } from './SeoAlgorithm';
import { MapPin, Phone, Star, Sparkles, CheckCircle2 } from 'lucide-react';

// Mock DB Fetch based on URL parameters (Programmatic SEO)
const fetchSalonData = (salonId) => {
  const db = {
    "surbhi-gaya": {
        "id": "surbhi-gaya",
        "name": "Surbhi Beauty Parlour",
        "phone": "+91 99346 66690",
        "streetAddress": "A P Colony, Near Kaveri Sweets",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7955",
        "longitude": "84.9994",
        "rating": "4.8",
        "reviews": 124,
        "neighborhoods": [
            "A P Colony",
            "Gewal Bigha",
            "Bodhgaya"
        ]
    },
    "pihu-makeover": {
        "id": "pihu-makeover",
        "name": "Pihu Makeover Saloon",
        "phone": "+91 98765 43210",
        "streetAddress": "Main Road, Near Mahabodhi Temple",
        "city": "Bodhgaya",
        "state": "Bihar",
        "zipCode": "824231",
        "latitude": "24.6961",
        "longitude": "84.9914",
        "rating": "4.9",
        "reviews": 87,
        "neighborhoods": [
            "Bodhgaya",
            "Sujata Bypass",
            "Kalchakra Maidan"
        ]
    },
    "glamour-gaya": {
        "id": "glamour-gaya",
        "name": "Glamour Studio",
        "phone": "+91 88888 77777",
        "streetAddress": "White House Compound",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7890",
        "longitude": "84.9920",
        "rating": "4.7",
        "reviews": 210,
        "neighborhoods": [
            "White House Compound",
            "Swarajpuri Road"
        ]
    },
    "radiance-bodhgaya": {
        "id": "radiance-bodhgaya",
        "name": "Radiance Beauty Care",
        "phone": "+91 99999 11111",
        "streetAddress": "Temple Street",
        "city": "Bodhgaya",
        "state": "Bihar",
        "zipCode": "824231",
        "latitude": "24.6950",
        "longitude": "84.9900",
        "rating": "4.6",
        "reviews": 145,
        "neighborhoods": [
            "Bodhgaya",
            "Mastipur"
        ]
    },
    "blossom-gaya": {
        "id": "blossom-gaya",
        "name": "Blossom Makeover",
        "phone": "+91 77777 22222",
        "streetAddress": "GB Road",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7910",
        "longitude": "84.9950",
        "rating": "4.9",
        "reviews": 312,
        "neighborhoods": [
            "GB Road",
            "Chowk"
        ]
    },
    "elegance-parlour-gaya": {
        "id": "elegance-parlour-gaya",
        "name": "Elegance Parlour",
        "phone": "+91 48070 74566",
        "streetAddress": "Near Manpur",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7803",
        "longitude": "84.9951",
        "rating": "4.0",
        "reviews": 56,
        "neighborhoods": [
            "Manpur",
            "Gewal Bigha",
            "Gaya"
        ]
    },
    "elegance-studio-bodhgaya": {
        "id": "elegance-studio-bodhgaya",
        "name": "Elegance Studio",
        "phone": "+91 59679 60141",
        "streetAddress": "Near Sujata Bypass",
        "city": "Bodhgaya",
        "state": "Bihar",
        "zipCode": "824231",
        "latitude": "24.6916",
        "longitude": "84.9997",
        "rating": "4.4",
        "reviews": 125,
        "neighborhoods": [
            "Sujata Bypass",
            "Temple Street",
            "Bodhgaya"
        ]
    },
    "elegance-makeover-gaya": {
        "id": "elegance-makeover-gaya",
        "name": "Elegance Makeover",
        "phone": "+91 73758 60731",
        "streetAddress": "Near Katari Hill",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7974",
        "longitude": "84.9903",
        "rating": "4.5",
        "reviews": 400,
        "neighborhoods": [
            "Katari Hill",
            "GB Road",
            "Gaya"
        ]
    },
    "elegance-lounge-gaya": {
        "id": "elegance-lounge-gaya",
        "name": "Elegance Lounge",
        "phone": "+91 94818 53218",
        "streetAddress": "Near Chowk",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7921",
        "longitude": "84.9933",
        "rating": "4.6",
        "reviews": 391,
        "neighborhoods": [
            "Chowk",
            "Gaya"
        ]
    },
    "elegance-care-bodhgaya": {
        "id": "elegance-care-bodhgaya",
        "name": "Elegance Care",
        "phone": "+91 67597 86279",
        "streetAddress": "Near Main Road",
        "city": "Bodhgaya",
        "state": "Bihar",
        "zipCode": "824231",
        "latitude": "24.6924",
        "longitude": "84.9983",
        "rating": "4.6",
        "reviews": 396,
        "neighborhoods": [
            "Main Road",
            "Katorwa",
            "Bodhgaya"
        ]
    },
    "elegance-salon-gaya": {
        "id": "elegance-salon-gaya",
        "name": "Elegance Salon",
        "phone": "+91 14589 36738",
        "streetAddress": "Near Bypass",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7908",
        "longitude": "84.9958",
        "rating": "4.2",
        "reviews": 388,
        "neighborhoods": [
            "Bypass",
            "Gewal Bigha",
            "Gaya"
        ]
    },
    "elegance-spa-gaya": {
        "id": "elegance-spa-gaya",
        "name": "Elegance Spa",
        "phone": "+91 31383 79838",
        "streetAddress": "Near White House Compound",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7961",
        "longitude": "84.9935",
        "rating": "4.4",
        "reviews": 114,
        "neighborhoods": [
            "White House Compound",
            "Chowk",
            "Gaya"
        ]
    },
    "elegance-boutique-bodhgaya": {
        "id": "elegance-boutique-bodhgaya",
        "name": "Elegance Boutique",
        "phone": "+91 50287 12723",
        "streetAddress": "Near Katorwa",
        "city": "Bodhgaya",
        "state": "Bihar",
        "zipCode": "824231",
        "latitude": "24.6990",
        "longitude": "84.9963",
        "rating": "4.5",
        "reviews": 199,
        "neighborhoods": [
            "Katorwa",
            "Sujata Bypass",
            "Bodhgaya"
        ]
    },
    "elegance-hub-gaya": {
        "id": "elegance-hub-gaya",
        "name": "Elegance Hub",
        "phone": "+91 74528 24147",
        "streetAddress": "Near Swarajpuri Road",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7954",
        "longitude": "84.9907",
        "rating": "4.8",
        "reviews": 411,
        "neighborhoods": [
            "Swarajpuri Road",
            "Gewal Bigha",
            "Gaya"
        ]
    },
    "elegance-clinic-gaya": {
        "id": "elegance-clinic-gaya",
        "name": "Elegance Clinic",
        "phone": "+91 78945 89645",
        "streetAddress": "Near A P Colony",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7991",
        "longitude": "84.9966",
        "rating": "4.0",
        "reviews": 146,
        "neighborhoods": [
            "A P Colony",
            "Delha",
            "Gaya"
        ]
    },
    "style-parlour-bodhgaya": {
        "id": "style-parlour-bodhgaya",
        "name": "Style Parlour",
        "phone": "+91 10578 32657",
        "streetAddress": "Near Pachatti",
        "city": "Bodhgaya",
        "state": "Bihar",
        "zipCode": "824231",
        "latitude": "24.6994",
        "longitude": "84.9923",
        "rating": "4.2",
        "reviews": 91,
        "neighborhoods": [
            "Pachatti",
            "Sujata Bypass",
            "Bodhgaya"
        ]
    },
    "style-studio-gaya": {
        "id": "style-studio-gaya",
        "name": "Style Studio",
        "phone": "+91 55086 44934",
        "streetAddress": "Near White House Compound",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7838",
        "longitude": "84.9906",
        "rating": "4.8",
        "reviews": 177,
        "neighborhoods": [
            "White House Compound",
            "GB Road",
            "Gaya"
        ]
    },
    "style-makeover-gaya": {
        "id": "style-makeover-gaya",
        "name": "Style Makeover",
        "phone": "+91 15064 93034",
        "streetAddress": "Near A P Colony",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7842",
        "longitude": "84.9934",
        "rating": "4.6",
        "reviews": 159,
        "neighborhoods": [
            "A P Colony",
            "GB Road",
            "Gaya"
        ]
    },
    "style-lounge-bodhgaya": {
        "id": "style-lounge-bodhgaya",
        "name": "Style Lounge",
        "phone": "+91 57646 93966",
        "streetAddress": "Near Sujata Bypass",
        "city": "Bodhgaya",
        "state": "Bihar",
        "zipCode": "824231",
        "latitude": "24.6910",
        "longitude": "84.9913",
        "rating": "4.3",
        "reviews": 208,
        "neighborhoods": [
            "Sujata Bypass",
            "Katorwa",
            "Bodhgaya"
        ]
    },
    "style-care-gaya": {
        "id": "style-care-gaya",
        "name": "Style Care",
        "phone": "+91 38258 59764",
        "streetAddress": "Near White House Compound",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7959",
        "longitude": "84.9902",
        "rating": "4.4",
        "reviews": 270,
        "neighborhoods": [
            "White House Compound",
            "Delha",
            "Gaya"
        ]
    },
    "style-salon-gaya": {
        "id": "style-salon-gaya",
        "name": "Style Salon",
        "phone": "+91 81023 47648",
        "streetAddress": "Near Gewal Bigha",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7806",
        "longitude": "84.9984",
        "rating": "4.6",
        "reviews": 494,
        "neighborhoods": [
            "Gewal Bigha",
            "A P Colony",
            "Gaya"
        ]
    },
    "style-spa-bodhgaya": {
        "id": "style-spa-bodhgaya",
        "name": "Style Spa",
        "phone": "+91 57646 12832",
        "streetAddress": "Near Pachatti",
        "city": "Bodhgaya",
        "state": "Bihar",
        "zipCode": "824231",
        "latitude": "24.6993",
        "longitude": "84.9912",
        "rating": "4.9",
        "reviews": 280,
        "neighborhoods": [
            "Pachatti",
            "Kalchakra Maidan",
            "Bodhgaya"
        ]
    },
    "style-boutique-gaya": {
        "id": "style-boutique-gaya",
        "name": "Style Boutique",
        "phone": "+91 76789 45188",
        "streetAddress": "Near A P Colony",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7849",
        "longitude": "84.9910",
        "rating": "4.9",
        "reviews": 50,
        "neighborhoods": [
            "A P Colony",
            "Swarajpuri Road",
            "Gaya"
        ]
    },
    "style-hub-gaya": {
        "id": "style-hub-gaya",
        "name": "Style Hub",
        "phone": "+91 91344 17507",
        "streetAddress": "Near Chowk",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7868",
        "longitude": "84.9916",
        "rating": "4.7",
        "reviews": 498,
        "neighborhoods": [
            "Chowk",
            "Swarajpuri Road",
            "Gaya"
        ]
    },
    "style-clinic-bodhgaya": {
        "id": "style-clinic-bodhgaya",
        "name": "Style Clinic",
        "phone": "+91 81389 93806",
        "streetAddress": "Near Tikabigha",
        "city": "Bodhgaya",
        "state": "Bihar",
        "zipCode": "824231",
        "latitude": "24.6995",
        "longitude": "84.9976",
        "rating": "4.0",
        "reviews": 456,
        "neighborhoods": [
            "Tikabigha",
            "Kalchakra Maidan",
            "Bodhgaya"
        ]
    },
    "beauty-parlour-gaya": {
        "id": "beauty-parlour-gaya",
        "name": "Beauty Parlour",
        "phone": "+91 80352 57978",
        "streetAddress": "Near Chowk",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7821",
        "longitude": "84.9934",
        "rating": "4.4",
        "reviews": 79,
        "neighborhoods": [
            "Chowk",
            "Swarajpuri Road",
            "Gaya"
        ]
    },
    "beauty-studio-gaya": {
        "id": "beauty-studio-gaya",
        "name": "Beauty Studio",
        "phone": "+91 51184 22186",
        "streetAddress": "Near Chowk",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7841",
        "longitude": "84.9913",
        "rating": "5.0",
        "reviews": 245,
        "neighborhoods": [
            "Chowk",
            "Gaya"
        ]
    },
    "beauty-makeover-bodhgaya": {
        "id": "beauty-makeover-bodhgaya",
        "name": "Beauty Makeover",
        "phone": "+91 82964 76743",
        "streetAddress": "Near Sujata Bypass",
        "city": "Bodhgaya",
        "state": "Bihar",
        "zipCode": "824231",
        "latitude": "24.6953",
        "longitude": "84.9912",
        "rating": "4.7",
        "reviews": 323,
        "neighborhoods": [
            "Sujata Bypass",
            "Bodhgaya"
        ]
    },
    "beauty-lounge-gaya": {
        "id": "beauty-lounge-gaya",
        "name": "Beauty Lounge",
        "phone": "+91 41024 41311",
        "streetAddress": "Near Manpur",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7965",
        "longitude": "84.9940",
        "rating": "4.1",
        "reviews": 94,
        "neighborhoods": [
            "Manpur",
            "Swarajpuri Road",
            "Gaya"
        ]
    },
    "beauty-care-gaya": {
        "id": "beauty-care-gaya",
        "name": "Beauty Care",
        "phone": "+91 12407 31852",
        "streetAddress": "Near A P Colony",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7875",
        "longitude": "84.9967",
        "rating": "4.9",
        "reviews": 212,
        "neighborhoods": [
            "A P Colony",
            "Bypass",
            "Gaya"
        ]
    },
    "beauty-salon-bodhgaya": {
        "id": "beauty-salon-bodhgaya",
        "name": "Beauty Salon",
        "phone": "+91 74446 88628",
        "streetAddress": "Near Tikabigha",
        "city": "Bodhgaya",
        "state": "Bihar",
        "zipCode": "824231",
        "latitude": "24.6964",
        "longitude": "84.9965",
        "rating": "4.5",
        "reviews": 140,
        "neighborhoods": [
            "Tikabigha",
            "Katorwa",
            "Bodhgaya"
        ]
    },
    "beauty-spa-gaya": {
        "id": "beauty-spa-gaya",
        "name": "Beauty Spa",
        "phone": "+91 97342 58625",
        "streetAddress": "Near A P Colony",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7879",
        "longitude": "84.9940",
        "rating": "4.2",
        "reviews": 99,
        "neighborhoods": [
            "A P Colony",
            "Chowk",
            "Gaya"
        ]
    },
    "beauty-boutique-gaya": {
        "id": "beauty-boutique-gaya",
        "name": "Beauty Boutique",
        "phone": "+91 69815 73078",
        "streetAddress": "Near Chowk",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7854",
        "longitude": "84.9913",
        "rating": "4.1",
        "reviews": 440,
        "neighborhoods": [
            "Chowk",
            "GB Road",
            "Gaya"
        ]
    },
    "beauty-hub-bodhgaya": {
        "id": "beauty-hub-bodhgaya",
        "name": "Beauty Hub",
        "phone": "+91 97610 78753",
        "streetAddress": "Near Katorwa",
        "city": "Bodhgaya",
        "state": "Bihar",
        "zipCode": "824231",
        "latitude": "24.6969",
        "longitude": "84.9963",
        "rating": "5.0",
        "reviews": 192,
        "neighborhoods": [
            "Katorwa",
            "Main Road",
            "Bodhgaya"
        ]
    },
    "beauty-clinic-gaya": {
        "id": "beauty-clinic-gaya",
        "name": "Beauty Clinic",
        "phone": "+91 67787 84930",
        "streetAddress": "Near White House Compound",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7808",
        "longitude": "84.9976",
        "rating": "4.9",
        "reviews": 499,
        "neighborhoods": [
            "White House Compound",
            "Manpur",
            "Gaya"
        ]
    },
    "glamour-parlour-gaya": {
        "id": "glamour-parlour-gaya",
        "name": "Glamour Parlour",
        "phone": "+91 86265 19465",
        "streetAddress": "Near Chowk",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7953",
        "longitude": "84.9922",
        "rating": "4.3",
        "reviews": 246,
        "neighborhoods": [
            "Chowk",
            "Delha",
            "Gaya"
        ]
    },
    "glamour-studio-bodhgaya": {
        "id": "glamour-studio-bodhgaya",
        "name": "Glamour Studio",
        "phone": "+91 45311 67058",
        "streetAddress": "Near Sujata Bypass",
        "city": "Bodhgaya",
        "state": "Bihar",
        "zipCode": "824231",
        "latitude": "24.6972",
        "longitude": "84.9912",
        "rating": "4.6",
        "reviews": 202,
        "neighborhoods": [
            "Sujata Bypass",
            "Temple Street",
            "Bodhgaya"
        ]
    },
    "glamour-makeover-gaya": {
        "id": "glamour-makeover-gaya",
        "name": "Glamour Makeover",
        "phone": "+91 22205 44522",
        "streetAddress": "Near Manpur",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7913",
        "longitude": "84.9958",
        "rating": "4.3",
        "reviews": 246,
        "neighborhoods": [
            "Manpur",
            "Katari Hill",
            "Gaya"
        ]
    },
    "glamour-lounge-gaya": {
        "id": "glamour-lounge-gaya",
        "name": "Glamour Lounge",
        "phone": "+91 57129 88304",
        "streetAddress": "Near Gewal Bigha",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7972",
        "longitude": "84.9929",
        "rating": "4.9",
        "reviews": 452,
        "neighborhoods": [
            "Gewal Bigha",
            "Manpur",
            "Gaya"
        ]
    },
    "glamour-care-bodhgaya": {
        "id": "glamour-care-bodhgaya",
        "name": "Glamour Care",
        "phone": "+91 55826 20589",
        "streetAddress": "Near Sujata Bypass",
        "city": "Bodhgaya",
        "state": "Bihar",
        "zipCode": "824231",
        "latitude": "24.6922",
        "longitude": "84.9942",
        "rating": "4.4",
        "reviews": 286,
        "neighborhoods": [
            "Sujata Bypass",
            "Mastipur",
            "Bodhgaya"
        ]
    },
    "glamour-salon-gaya": {
        "id": "glamour-salon-gaya",
        "name": "Glamour Salon",
        "phone": "+91 45533 68969",
        "streetAddress": "Near A P Colony",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7944",
        "longitude": "84.9980",
        "rating": "4.4",
        "reviews": 64,
        "neighborhoods": [
            "A P Colony",
            "White House Compound",
            "Gaya"
        ]
    },
    "glamour-spa-gaya": {
        "id": "glamour-spa-gaya",
        "name": "Glamour Spa",
        "phone": "+91 75125 29879",
        "streetAddress": "Near Katari Hill",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7886",
        "longitude": "84.9960",
        "rating": "5.0",
        "reviews": 105,
        "neighborhoods": [
            "Katari Hill",
            "Swarajpuri Road",
            "Gaya"
        ]
    },
    "glamour-boutique-bodhgaya": {
        "id": "glamour-boutique-bodhgaya",
        "name": "Glamour Boutique",
        "phone": "+91 22847 16483",
        "streetAddress": "Near Kalchakra Maidan",
        "city": "Bodhgaya",
        "state": "Bihar",
        "zipCode": "824231",
        "latitude": "24.6910",
        "longitude": "84.9934",
        "rating": "4.7",
        "reviews": 309,
        "neighborhoods": [
            "Kalchakra Maidan",
            "Mastipur",
            "Bodhgaya"
        ]
    },
    "glamour-hub-gaya": {
        "id": "glamour-hub-gaya",
        "name": "Glamour Hub",
        "phone": "+91 81212 73290",
        "streetAddress": "Near Bypass",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7842",
        "longitude": "84.9963",
        "rating": "4.6",
        "reviews": 347,
        "neighborhoods": [
            "Bypass",
            "Delha",
            "Gaya"
        ]
    },
    "glamour-clinic-gaya": {
        "id": "glamour-clinic-gaya",
        "name": "Glamour Clinic",
        "phone": "+91 72613 58365",
        "streetAddress": "Near Bypass",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7923",
        "longitude": "84.9904",
        "rating": "4.9",
        "reviews": 297,
        "neighborhoods": [
            "Bypass",
            "White House Compound",
            "Gaya"
        ]
    },
    "radiance-parlour-bodhgaya": {
        "id": "radiance-parlour-bodhgaya",
        "name": "Radiance Parlour",
        "phone": "+91 61963 78020",
        "streetAddress": "Near Katorwa",
        "city": "Bodhgaya",
        "state": "Bihar",
        "zipCode": "824231",
        "latitude": "24.6998",
        "longitude": "84.9933",
        "rating": "4.5",
        "reviews": 453,
        "neighborhoods": [
            "Katorwa",
            "Pachatti",
            "Bodhgaya"
        ]
    },
    "radiance-studio-gaya": {
        "id": "radiance-studio-gaya",
        "name": "Radiance Studio",
        "phone": "+91 24028 53023",
        "streetAddress": "Near Manpur",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7849",
        "longitude": "84.9982",
        "rating": "4.5",
        "reviews": 139,
        "neighborhoods": [
            "Manpur",
            "White House Compound",
            "Gaya"
        ]
    },
    "radiance-makeover-gaya": {
        "id": "radiance-makeover-gaya",
        "name": "Radiance Makeover",
        "phone": "+91 66901 11396",
        "streetAddress": "Near Swarajpuri Road",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7945",
        "longitude": "84.9984",
        "rating": "4.5",
        "reviews": 143,
        "neighborhoods": [
            "Swarajpuri Road",
            "Chowk",
            "Gaya"
        ]
    },
    "radiance-lounge-bodhgaya": {
        "id": "radiance-lounge-bodhgaya",
        "name": "Radiance Lounge",
        "phone": "+91 90211 80582",
        "streetAddress": "Near Temple Street",
        "city": "Bodhgaya",
        "state": "Bihar",
        "zipCode": "824231",
        "latitude": "24.6930",
        "longitude": "84.9908",
        "rating": "4.3",
        "reviews": 200,
        "neighborhoods": [
            "Temple Street",
            "Bodhgaya"
        ]
    },
    "radiance-care-gaya": {
        "id": "radiance-care-gaya",
        "name": "Radiance Care",
        "phone": "+91 72971 80868",
        "streetAddress": "Near Swarajpuri Road",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7851",
        "longitude": "84.9901",
        "rating": "4.1",
        "reviews": 465,
        "neighborhoods": [
            "Swarajpuri Road",
            "White House Compound",
            "Gaya"
        ]
    },
    "radiance-salon-gaya": {
        "id": "radiance-salon-gaya",
        "name": "Radiance Salon",
        "phone": "+91 22785 52995",
        "streetAddress": "Near Gewal Bigha",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7865",
        "longitude": "84.9926",
        "rating": "4.3",
        "reviews": 489,
        "neighborhoods": [
            "Gewal Bigha",
            "White House Compound",
            "Gaya"
        ]
    },
    "radiance-spa-bodhgaya": {
        "id": "radiance-spa-bodhgaya",
        "name": "Radiance Spa",
        "phone": "+91 90850 62127",
        "streetAddress": "Near Temple Street",
        "city": "Bodhgaya",
        "state": "Bihar",
        "zipCode": "824231",
        "latitude": "24.6928",
        "longitude": "84.9997",
        "rating": "5.0",
        "reviews": 178,
        "neighborhoods": [
            "Temple Street",
            "Katorwa",
            "Bodhgaya"
        ]
    },
    "radiance-boutique-gaya": {
        "id": "radiance-boutique-gaya",
        "name": "Radiance Boutique",
        "phone": "+91 95509 94116",
        "streetAddress": "Near Swarajpuri Road",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7952",
        "longitude": "84.9945",
        "rating": "4.7",
        "reviews": 84,
        "neighborhoods": [
            "Swarajpuri Road",
            "White House Compound",
            "Gaya"
        ]
    },
    "radiance-hub-gaya": {
        "id": "radiance-hub-gaya",
        "name": "Radiance Hub",
        "phone": "+91 44449 92756",
        "streetAddress": "Near A P Colony",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7937",
        "longitude": "84.9912",
        "rating": "4.8",
        "reviews": 114,
        "neighborhoods": [
            "A P Colony",
            "Manpur",
            "Gaya"
        ]
    },
    "radiance-clinic-bodhgaya": {
        "id": "radiance-clinic-bodhgaya",
        "name": "Radiance Clinic",
        "phone": "+91 46063 75310",
        "streetAddress": "Near Tikabigha",
        "city": "Bodhgaya",
        "state": "Bihar",
        "zipCode": "824231",
        "latitude": "24.6910",
        "longitude": "84.9942",
        "rating": "4.2",
        "reviews": 317,
        "neighborhoods": [
            "Tikabigha",
            "Main Road",
            "Bodhgaya"
        ]
    },
    "blossom-parlour-gaya": {
        "id": "blossom-parlour-gaya",
        "name": "Blossom Parlour",
        "phone": "+91 36972 93387",
        "streetAddress": "Near White House Compound",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7909",
        "longitude": "84.9980",
        "rating": "4.3",
        "reviews": 242,
        "neighborhoods": [
            "White House Compound",
            "A P Colony",
            "Gaya"
        ]
    },
    "blossom-studio-gaya": {
        "id": "blossom-studio-gaya",
        "name": "Blossom Studio",
        "phone": "+91 86329 78360",
        "streetAddress": "Near Bypass",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7886",
        "longitude": "84.9982",
        "rating": "4.2",
        "reviews": 354,
        "neighborhoods": [
            "Bypass",
            "Delha",
            "Gaya"
        ]
    },
    "blossom-makeover-bodhgaya": {
        "id": "blossom-makeover-bodhgaya",
        "name": "Blossom Makeover",
        "phone": "+91 69765 50966",
        "streetAddress": "Near Katorwa",
        "city": "Bodhgaya",
        "state": "Bihar",
        "zipCode": "824231",
        "latitude": "24.6992",
        "longitude": "84.9903",
        "rating": "5.0",
        "reviews": 343,
        "neighborhoods": [
            "Katorwa",
            "Temple Street",
            "Bodhgaya"
        ]
    },
    "blossom-lounge-gaya": {
        "id": "blossom-lounge-gaya",
        "name": "Blossom Lounge",
        "phone": "+91 73076 80726",
        "streetAddress": "Near A P Colony",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7871",
        "longitude": "84.9949",
        "rating": "4.3",
        "reviews": 223,
        "neighborhoods": [
            "A P Colony",
            "Manpur",
            "Gaya"
        ]
    },
    "blossom-care-gaya": {
        "id": "blossom-care-gaya",
        "name": "Blossom Care",
        "phone": "+91 50065 45593",
        "streetAddress": "Near Bypass",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7955",
        "longitude": "84.9974",
        "rating": "4.9",
        "reviews": 169,
        "neighborhoods": [
            "Bypass",
            "Delha",
            "Gaya"
        ]
    },
    "blossom-salon-bodhgaya": {
        "id": "blossom-salon-bodhgaya",
        "name": "Blossom Salon",
        "phone": "+91 60707 90764",
        "streetAddress": "Near Temple Street",
        "city": "Bodhgaya",
        "state": "Bihar",
        "zipCode": "824231",
        "latitude": "24.6962",
        "longitude": "84.9994",
        "rating": "4.3",
        "reviews": 318,
        "neighborhoods": [
            "Temple Street",
            "Main Road",
            "Bodhgaya"
        ]
    },
    "blossom-spa-gaya": {
        "id": "blossom-spa-gaya",
        "name": "Blossom Spa",
        "phone": "+91 95397 70891",
        "streetAddress": "Near White House Compound",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7824",
        "longitude": "84.9931",
        "rating": "4.6",
        "reviews": 140,
        "neighborhoods": [
            "White House Compound",
            "Chowk",
            "Gaya"
        ]
    },
    "blossom-boutique-gaya": {
        "id": "blossom-boutique-gaya",
        "name": "Blossom Boutique",
        "phone": "+91 95396 12378",
        "streetAddress": "Near Manpur",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7827",
        "longitude": "84.9973",
        "rating": "4.6",
        "reviews": 70,
        "neighborhoods": [
            "Manpur",
            "GB Road",
            "Gaya"
        ]
    },
    "blossom-hub-bodhgaya": {
        "id": "blossom-hub-bodhgaya",
        "name": "Blossom Hub",
        "phone": "+91 80003 26031",
        "streetAddress": "Near Temple Street",
        "city": "Bodhgaya",
        "state": "Bihar",
        "zipCode": "824231",
        "latitude": "24.6913",
        "longitude": "84.9914",
        "rating": "4.6",
        "reviews": 463,
        "neighborhoods": [
            "Temple Street",
            "Mastipur",
            "Bodhgaya"
        ]
    },
    "blossom-clinic-gaya": {
        "id": "blossom-clinic-gaya",
        "name": "Blossom Clinic",
        "phone": "+91 65399 68883",
        "streetAddress": "Near A P Colony",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7800",
        "longitude": "84.9940",
        "rating": "4.2",
        "reviews": 171,
        "neighborhoods": [
            "A P Colony",
            "Swarajpuri Road",
            "Gaya"
        ]
    },
    "aura-parlour-gaya": {
        "id": "aura-parlour-gaya",
        "name": "Aura Parlour",
        "phone": "+91 34658 95631",
        "streetAddress": "Near Gewal Bigha",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7893",
        "longitude": "84.9902",
        "rating": "4.0",
        "reviews": 63,
        "neighborhoods": [
            "Gewal Bigha",
            "Gaya"
        ]
    },
    "aura-studio-bodhgaya": {
        "id": "aura-studio-bodhgaya",
        "name": "Aura Studio",
        "phone": "+91 91093 28270",
        "streetAddress": "Near Main Road",
        "city": "Bodhgaya",
        "state": "Bihar",
        "zipCode": "824231",
        "latitude": "24.6947",
        "longitude": "84.9993",
        "rating": "4.3",
        "reviews": 452,
        "neighborhoods": [
            "Main Road",
            "Katorwa",
            "Bodhgaya"
        ]
    },
    "aura-makeover-gaya": {
        "id": "aura-makeover-gaya",
        "name": "Aura Makeover",
        "phone": "+91 72037 79814",
        "streetAddress": "Near Bypass",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7857",
        "longitude": "84.9934",
        "rating": "4.8",
        "reviews": 405,
        "neighborhoods": [
            "Bypass",
            "Katari Hill",
            "Gaya"
        ]
    },
    "aura-lounge-gaya": {
        "id": "aura-lounge-gaya",
        "name": "Aura Lounge",
        "phone": "+91 30565 57344",
        "streetAddress": "Near Swarajpuri Road",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7962",
        "longitude": "84.9900",
        "rating": "4.0",
        "reviews": 268,
        "neighborhoods": [
            "Swarajpuri Road",
            "Gaya"
        ]
    },
    "aura-care-bodhgaya": {
        "id": "aura-care-bodhgaya",
        "name": "Aura Care",
        "phone": "+91 63489 50386",
        "streetAddress": "Near Temple Street",
        "city": "Bodhgaya",
        "state": "Bihar",
        "zipCode": "824231",
        "latitude": "24.6904",
        "longitude": "84.9998",
        "rating": "4.0",
        "reviews": 111,
        "neighborhoods": [
            "Temple Street",
            "Sujata Bypass",
            "Bodhgaya"
        ]
    },
    "aura-salon-gaya": {
        "id": "aura-salon-gaya",
        "name": "Aura Salon",
        "phone": "+91 22901 28722",
        "streetAddress": "Near A P Colony",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7830",
        "longitude": "84.9981",
        "rating": "5.0",
        "reviews": 193,
        "neighborhoods": [
            "A P Colony",
            "Delha",
            "Gaya"
        ]
    },
    "aura-spa-gaya": {
        "id": "aura-spa-gaya",
        "name": "Aura Spa",
        "phone": "+91 40874 84996",
        "streetAddress": "Near White House Compound",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7901",
        "longitude": "84.9999",
        "rating": "4.1",
        "reviews": 437,
        "neighborhoods": [
            "White House Compound",
            "Bypass",
            "Gaya"
        ]
    },
    "aura-boutique-bodhgaya": {
        "id": "aura-boutique-bodhgaya",
        "name": "Aura Boutique",
        "phone": "+91 80721 37322",
        "streetAddress": "Near Temple Street",
        "city": "Bodhgaya",
        "state": "Bihar",
        "zipCode": "824231",
        "latitude": "24.6912",
        "longitude": "84.9983",
        "rating": "4.6",
        "reviews": 76,
        "neighborhoods": [
            "Temple Street",
            "Pachatti",
            "Bodhgaya"
        ]
    },
    "aura-hub-gaya": {
        "id": "aura-hub-gaya",
        "name": "Aura Hub",
        "phone": "+91 84775 90228",
        "streetAddress": "Near GB Road",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7979",
        "longitude": "84.9922",
        "rating": "4.7",
        "reviews": 72,
        "neighborhoods": [
            "GB Road",
            "Katari Hill",
            "Gaya"
        ]
    },
    "aura-clinic-gaya": {
        "id": "aura-clinic-gaya",
        "name": "Aura Clinic",
        "phone": "+91 42011 26873",
        "streetAddress": "Near A P Colony",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7931",
        "longitude": "84.9962",
        "rating": "4.1",
        "reviews": 423,
        "neighborhoods": [
            "A P Colony",
            "Chowk",
            "Gaya"
        ]
    },
    "divine-parlour-bodhgaya": {
        "id": "divine-parlour-bodhgaya",
        "name": "Divine Parlour",
        "phone": "+91 19987 78656",
        "streetAddress": "Near Sujata Bypass",
        "city": "Bodhgaya",
        "state": "Bihar",
        "zipCode": "824231",
        "latitude": "24.6927",
        "longitude": "84.9961",
        "rating": "4.7",
        "reviews": 341,
        "neighborhoods": [
            "Sujata Bypass",
            "Tikabigha",
            "Bodhgaya"
        ]
    },
    "divine-studio-gaya": {
        "id": "divine-studio-gaya",
        "name": "Divine Studio",
        "phone": "+91 44852 62209",
        "streetAddress": "Near Chowk",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7934",
        "longitude": "84.9958",
        "rating": "4.5",
        "reviews": 76,
        "neighborhoods": [
            "Chowk",
            "Gaya"
        ]
    },
    "divine-makeover-gaya": {
        "id": "divine-makeover-gaya",
        "name": "Divine Makeover",
        "phone": "+91 99746 40593",
        "streetAddress": "Near Chowk",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7925",
        "longitude": "84.9997",
        "rating": "4.4",
        "reviews": 106,
        "neighborhoods": [
            "Chowk",
            "GB Road",
            "Gaya"
        ]
    },
    "divine-lounge-bodhgaya": {
        "id": "divine-lounge-bodhgaya",
        "name": "Divine Lounge",
        "phone": "+91 97693 38958",
        "streetAddress": "Near Temple Street",
        "city": "Bodhgaya",
        "state": "Bihar",
        "zipCode": "824231",
        "latitude": "24.6980",
        "longitude": "84.9970",
        "rating": "4.5",
        "reviews": 137,
        "neighborhoods": [
            "Temple Street",
            "Pachatti",
            "Bodhgaya"
        ]
    },
    "divine-care-gaya": {
        "id": "divine-care-gaya",
        "name": "Divine Care",
        "phone": "+91 17503 81692",
        "streetAddress": "Near Katari Hill",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7813",
        "longitude": "84.9920",
        "rating": "4.1",
        "reviews": 346,
        "neighborhoods": [
            "Katari Hill",
            "GB Road",
            "Gaya"
        ]
    },
    "divine-salon-gaya": {
        "id": "divine-salon-gaya",
        "name": "Divine Salon",
        "phone": "+91 77531 36485",
        "streetAddress": "Near Gewal Bigha",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7949",
        "longitude": "84.9997",
        "rating": "4.7",
        "reviews": 204,
        "neighborhoods": [
            "Gewal Bigha",
            "Manpur",
            "Gaya"
        ]
    },
    "divine-spa-bodhgaya": {
        "id": "divine-spa-bodhgaya",
        "name": "Divine Spa",
        "phone": "+91 47893 79759",
        "streetAddress": "Near Kalchakra Maidan",
        "city": "Bodhgaya",
        "state": "Bihar",
        "zipCode": "824231",
        "latitude": "24.6972",
        "longitude": "84.9914",
        "rating": "4.4",
        "reviews": 68,
        "neighborhoods": [
            "Kalchakra Maidan",
            "Sujata Bypass",
            "Bodhgaya"
        ]
    },
    "divine-boutique-gaya": {
        "id": "divine-boutique-gaya",
        "name": "Divine Boutique",
        "phone": "+91 25291 35342",
        "streetAddress": "Near Manpur",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7983",
        "longitude": "84.9921",
        "rating": "4.3",
        "reviews": 181,
        "neighborhoods": [
            "Manpur",
            "GB Road",
            "Gaya"
        ]
    },
    "divine-hub-gaya": {
        "id": "divine-hub-gaya",
        "name": "Divine Hub",
        "phone": "+91 80777 75349",
        "streetAddress": "Near Delha",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7840",
        "longitude": "84.9927",
        "rating": "4.7",
        "reviews": 238,
        "neighborhoods": [
            "Delha",
            "Manpur",
            "Gaya"
        ]
    },
    "divine-clinic-bodhgaya": {
        "id": "divine-clinic-bodhgaya",
        "name": "Divine Clinic",
        "phone": "+91 68596 50439",
        "streetAddress": "Near Temple Street",
        "city": "Bodhgaya",
        "state": "Bihar",
        "zipCode": "824231",
        "latitude": "24.6974",
        "longitude": "84.9907",
        "rating": "4.7",
        "reviews": 453,
        "neighborhoods": [
            "Temple Street",
            "Sujata Bypass",
            "Bodhgaya"
        ]
    },
    "flawless-parlour-gaya": {
        "id": "flawless-parlour-gaya",
        "name": "Flawless Parlour",
        "phone": "+91 94061 54872",
        "streetAddress": "Near Chowk",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7867",
        "longitude": "84.9939",
        "rating": "4.0",
        "reviews": 496,
        "neighborhoods": [
            "Chowk",
            "Swarajpuri Road",
            "Gaya"
        ]
    },
    "flawless-studio-gaya": {
        "id": "flawless-studio-gaya",
        "name": "Flawless Studio",
        "phone": "+91 25684 16239",
        "streetAddress": "Near Katari Hill",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7997",
        "longitude": "84.9960",
        "rating": "5.0",
        "reviews": 305,
        "neighborhoods": [
            "Katari Hill",
            "Manpur",
            "Gaya"
        ]
    },
    "flawless-makeover-bodhgaya": {
        "id": "flawless-makeover-bodhgaya",
        "name": "Flawless Makeover",
        "phone": "+91 47628 33810",
        "streetAddress": "Near Temple Street",
        "city": "Bodhgaya",
        "state": "Bihar",
        "zipCode": "824231",
        "latitude": "24.6901",
        "longitude": "84.9907",
        "rating": "4.2",
        "reviews": 428,
        "neighborhoods": [
            "Temple Street",
            "Katorwa",
            "Bodhgaya"
        ]
    },
    "flawless-lounge-gaya": {
        "id": "flawless-lounge-gaya",
        "name": "Flawless Lounge",
        "phone": "+91 50719 33609",
        "streetAddress": "Near Chowk",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7906",
        "longitude": "84.9902",
        "rating": "4.3",
        "reviews": 213,
        "neighborhoods": [
            "Chowk",
            "Manpur",
            "Gaya"
        ]
    },
    "flawless-care-gaya": {
        "id": "flawless-care-gaya",
        "name": "Flawless Care",
        "phone": "+91 14649 68439",
        "streetAddress": "Near A P Colony",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7954",
        "longitude": "84.9973",
        "rating": "4.3",
        "reviews": 282,
        "neighborhoods": [
            "A P Colony",
            "Katari Hill",
            "Gaya"
        ]
    },
    "flawless-salon-bodhgaya": {
        "id": "flawless-salon-bodhgaya",
        "name": "Flawless Salon",
        "phone": "+91 18425 78949",
        "streetAddress": "Near Mastipur",
        "city": "Bodhgaya",
        "state": "Bihar",
        "zipCode": "824231",
        "latitude": "24.6924",
        "longitude": "84.9924",
        "rating": "5.0",
        "reviews": 321,
        "neighborhoods": [
            "Mastipur",
            "Tikabigha",
            "Bodhgaya"
        ]
    },
    "flawless-spa-gaya": {
        "id": "flawless-spa-gaya",
        "name": "Flawless Spa",
        "phone": "+91 95395 80273",
        "streetAddress": "Near Katari Hill",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7870",
        "longitude": "84.9963",
        "rating": "4.6",
        "reviews": 334,
        "neighborhoods": [
            "Katari Hill",
            "Chowk",
            "Gaya"
        ]
    },
    "flawless-boutique-gaya": {
        "id": "flawless-boutique-gaya",
        "name": "Flawless Boutique",
        "phone": "+91 76599 20742",
        "streetAddress": "Near Gewal Bigha",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7985",
        "longitude": "84.9979",
        "rating": "4.4",
        "reviews": 397,
        "neighborhoods": [
            "Gewal Bigha",
            "Gaya"
        ]
    },
    "flawless-hub-bodhgaya": {
        "id": "flawless-hub-bodhgaya",
        "name": "Flawless Hub",
        "phone": "+91 21010 15554",
        "streetAddress": "Near Pachatti",
        "city": "Bodhgaya",
        "state": "Bihar",
        "zipCode": "824231",
        "latitude": "24.6994",
        "longitude": "84.9928",
        "rating": "4.4",
        "reviews": 338,
        "neighborhoods": [
            "Pachatti",
            "Main Road",
            "Bodhgaya"
        ]
    },
    "flawless-clinic-gaya": {
        "id": "flawless-clinic-gaya",
        "name": "Flawless Clinic",
        "phone": "+91 73196 97516",
        "streetAddress": "Near Chowk",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7918",
        "longitude": "84.9906",
        "rating": "4.9",
        "reviews": 457,
        "neighborhoods": [
            "Chowk",
            "Gewal Bigha",
            "Gaya"
        ]
    },
    "chic-parlour-gaya": {
        "id": "chic-parlour-gaya",
        "name": "Chic Parlour",
        "phone": "+91 76327 23961",
        "streetAddress": "Near Delha",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7877",
        "longitude": "84.9982",
        "rating": "4.8",
        "reviews": 90,
        "neighborhoods": [
            "Delha",
            "Gaya"
        ]
    },
    "chic-studio-bodhgaya": {
        "id": "chic-studio-bodhgaya",
        "name": "Chic Studio",
        "phone": "+91 44641 52325",
        "streetAddress": "Near Mastipur",
        "city": "Bodhgaya",
        "state": "Bihar",
        "zipCode": "824231",
        "latitude": "24.6966",
        "longitude": "84.9915",
        "rating": "4.3",
        "reviews": 65,
        "neighborhoods": [
            "Mastipur",
            "Bodhgaya"
        ]
    },
    "chic-makeover-gaya": {
        "id": "chic-makeover-gaya",
        "name": "Chic Makeover",
        "phone": "+91 76924 82066",
        "streetAddress": "Near Chowk",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7918",
        "longitude": "84.9981",
        "rating": "4.4",
        "reviews": 314,
        "neighborhoods": [
            "Chowk",
            "White House Compound",
            "Gaya"
        ]
    },
    "chic-lounge-gaya": {
        "id": "chic-lounge-gaya",
        "name": "Chic Lounge",
        "phone": "+91 56409 83870",
        "streetAddress": "Near Manpur",
        "city": "Gaya",
        "state": "Bihar",
        "zipCode": "823001",
        "latitude": "24.7858",
        "longitude": "84.9929",
        "rating": "4.7",
        "reviews": 325,
        "neighborhoods": [
            "Manpur",
            "Katari Hill",
            "Gaya"
        ]
    },
    "chic-care-bodhgaya": {
        "id": "chic-care-bodhgaya",
        "name": "Chic Care",
        "phone": "+91 99333 27670",
        "streetAddress": "Near Mastipur",
        "city": "Bodhgaya",
        "state": "Bihar",
        "zipCode": "824231",
        "latitude": "24.6974",
        "longitude": "84.9909",
        "rating": "5.0",
        "reviews": 52,
        "neighborhoods": [
            "Mastipur",
            "Main Road",
            "Bodhgaya"
        ]
    }
};
  return db[salonId] || db['surbhi-gaya']; // fallback
};

const fetchServiceData = (serviceSlug) => {
  const db = {
    'bridal-makeup': { name: "Bridal HD Makeup", price: 6450, description: "Premium HD bridal makeup for your special day." },
    'hair-spa': { name: "Luxury Hair Spa", price: 900, description: "Rejuvenating hair spa and scalp treatment." }
  };
  return db[serviceSlug] || { name: serviceSlug.replace('-', ' '), price: 500, description: "Professional salon service." };
};

export default function PublicSalonPage() {
  const { salonId, serviceSlug, neighborhoodSlug } = useParams();
  const [salon, setSalon] = useState(null);
  const [service, setService] = useState(null);
  const [schemas, setSchemas] = useState({ localBusiness: null, service: null });

  useEffect(() => {
    // 1. Fetch data from DB based on programmatic URL
    const sData = fetchSalonData(salonId);
    const srvData = fetchServiceData(serviceSlug);
    setSalon(sData);
    setService(srvData);

    // 2. SEO ALGORITHM EXECUTION (Hyper-Local Grid)
    // Generate native Google Machine Code (JSON-LD)
    const localSchema = generateLocalBusinessSchema(sData);
    const srvSchema = generateServiceSchema(srvData, sData, neighborhoodSlug);
    
    setSchemas({ localBusiness: localSchema, service: srvSchema });
    
    // Log it so the developer can see the internal engine working
    console.log("🔥 [SEO HYPER-LOCAL ENGINE] Injected Schema:", { localSchema, srvSchema });
  }, [salonId, serviceSlug, neighborhoodSlug]);

  if (!salon || !service) return <div className="p-10 text-white">Loading Programmatic SEO Page...</div>;

  const displayLocation = neighborhoodSlug ? neighborhoodSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : salon.city;

  return (
    <div className="min-h-screen bg-dark-950 text-white font-sans selection:bg-gold-500/30">
      {/* 
        ========================================================================
        🔥 THE SEO PAYLOAD (HIDDEN FROM HUMANS, VISIBLE TO GOOGLE)
        ========================================================================
      */}
      <Helmet>
        <title>{service.name} in {displayLocation} | {salon.name}</title>
        <meta name="description" content={`Book ${service.name} at ${salon.name} in ${displayLocation}. ${service.description}`} />
        <link rel="canonical" href={`https://surbhibeauty.com/salon/${salonId}/${serviceSlug}${neighborhoodSlug ? '/' + neighborhoodSlug : ''}`} />
        
        {/* Schema Injection */}
        {schemas.localBusiness && (
          <script type="application/ld+json">
            {JSON.stringify(schemas.localBusiness)}
          </script>
        )}
        {schemas.service && (
          <script type="application/ld+json">
            {JSON.stringify(schemas.service)}
          </script>
        )}
      </Helmet>

      {/* 
        ========================================================================
        BEAUTIFUL PUBLIC LANDING PAGE (VISIBLE TO HUMANS)
        ========================================================================
      */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-8 mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif text-gold-500 mb-2">{salon.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm">
              <span className="flex items-center gap-1"><MapPin size={16}/> {salon.streetAddress}, {salon.city}</span>
              <span className="flex items-center gap-1"><Phone size={16}/> {salon.phone}</span>
              <span className="flex items-center gap-1 text-gold-400 font-medium">
                <Star size={16} className="fill-gold-400"/> {salon.rating} ({salon.reviews} reviews)
              </span>
            </div>
          </div>
        </header>

        {/* Dynamic Content Based on Programmatic URL */}
        <div className="glass-panel p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl -z-10"></div>
          
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/20 text-gold-400 border border-gold-500/30 rounded-full text-xs font-bold uppercase tracking-wider mb-6 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            <Sparkles size={14} /> Available Now in {displayLocation}
          </div>

          <h2 className="text-4xl md:text-6xl font-serif mb-4 leading-tight">
            Book <span className="bg-gradient-to-r from-gold-300 to-gold-600 bg-clip-text text-transparent">{service.name}</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl">
            {service.description} Skip the line and book instantly using our AI system.
          </p>

          <div className="flex items-center gap-4 mb-10">
            <div className="text-3xl font-light">₹{service.price}</div>
            <div className="text-gray-500 line-through text-lg">₹{service.price + 500}</div>
            <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-bold uppercase">Save ₹500 today</div>
          </div>

          <button className="btn-primary text-lg px-8 py-4 w-full md:w-auto shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] flex justify-center items-center gap-2">
            Book Appointment Now <CheckCircle2 size={20} />
          </button>
        </div>
        
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>This page was dynamically generated by the Hyper-Local Geo Rank AI Engine.</p>
          <Link to="/" className="text-gold-500 hover:underline mt-2 inline-block">Return to Admin Dashboard</Link>
        </div>
      </div>
    </div>
  );
}
