const fs = require('fs');
const path = require('path');

const prefixes = ["Elegance", "Style", "Beauty", "Glamour", "Radiance", "Blossom", "Aura", "Divine", "Flawless", "Chic", "Grace", "Luminous", "Vogue", "Crown", "Elite", "Angel", "Pearl", "Crystal", "Glow", "Sparkle", "Venus", "Ruby", "Sapphire", "Bella", "Flora"];
const suffixes = ["Parlour", "Studio", "Makeover", "Lounge", "Care", "Salon", "Spa", "Boutique", "Hub", "Clinic"];
const cities = ["Gaya", "Bodhgaya"];
const neighborhoods = {
    "Gaya": ["A P Colony", "Gewal Bigha", "White House Compound", "Swarajpuri Road", "GB Road", "Chowk", "Delha", "Manpur", "Katari Hill", "Bypass"],
    "Bodhgaya": ["Main Road", "Sujata Bypass", "Kalchakra Maidan", "Mastipur", "Temple Street", "Pachatti", "Katorwa", "Tikabigha"]
};

let dbObj = {};
let salonIds = [];

// Keep the original 5
dbObj['surbhi-gaya'] = {
    id: 'surbhi-gaya', name: "Surbhi Beauty Parlour", phone: "+91 99346 66690",
    streetAddress: "A P Colony, Near Kaveri Sweets", city: "Gaya", state: "Bihar", zipCode: "823001",
    latitude: "24.7955", longitude: "84.9994", rating: "4.8", reviews: 124,
    neighborhoods: ["A P Colony", "Gewal Bigha", "Bodhgaya"]
};
dbObj['pihu-makeover'] = {
    id: 'pihu-makeover', name: "Pihu Makeover Saloon", phone: "+91 98765 43210",
    streetAddress: "Main Road, Near Mahabodhi Temple", city: "Bodhgaya", state: "Bihar", zipCode: "824231",
    latitude: "24.6961", longitude: "84.9914", rating: "4.9", reviews: 87,
    neighborhoods: ["Bodhgaya", "Sujata Bypass", "Kalchakra Maidan"]
};
dbObj['glamour-gaya'] = {
    id: 'glamour-gaya', name: "Glamour Studio", phone: "+91 88888 77777",
    streetAddress: "White House Compound", city: "Gaya", state: "Bihar", zipCode: "823001",
    latitude: "24.7890", longitude: "84.9920", rating: "4.7", reviews: 210,
    neighborhoods: ["White House Compound", "Swarajpuri Road"]
};
dbObj['radiance-bodhgaya'] = {
    id: 'radiance-bodhgaya', name: "Radiance Beauty Care", phone: "+91 99999 11111",
    streetAddress: "Temple Street", city: "Bodhgaya", state: "Bihar", zipCode: "824231",
    latitude: "24.6950", longitude: "84.9900", rating: "4.6", reviews: 145,
    neighborhoods: ["Bodhgaya", "Mastipur"]
};
dbObj['blossom-gaya'] = {
    id: 'blossom-gaya', name: "Blossom Makeover", phone: "+91 77777 22222",
    streetAddress: "GB Road", city: "Gaya", state: "Bihar", zipCode: "823001",
    latitude: "24.7910", longitude: "84.9950", rating: "4.9", reviews: 312,
    neighborhoods: ["GB Road", "Chowk"]
};
salonIds.push('surbhi-gaya', 'pihu-makeover', 'glamour-gaya', 'radiance-bodhgaya', 'blossom-gaya');

let count = 5;
for (let p of prefixes) {
    for (let s of suffixes) {
        if (count >= 100) break;
        let city = count % 3 === 0 ? "Bodhgaya" : "Gaya";
        let hood = neighborhoods[city][Math.floor(Math.random() * neighborhoods[city].length)];
        let hood2 = neighborhoods[city][Math.floor(Math.random() * neighborhoods[city].length)];
        let id = `${p.toLowerCase()}-${s.toLowerCase()}-${city.toLowerCase()}`;
        if (!dbObj[id]) {
            let lat = city === "Gaya" ? (24.7800 + Math.random()*0.02).toFixed(4) : (24.6900 + Math.random()*0.01).toFixed(4);
            let lng = (84.9900 + Math.random()*0.01).toFixed(4);
            let rating = (4.0 + Math.random()).toFixed(1);
            let reviews = Math.floor(Math.random() * 450) + 50;
            let phone = "+91 " + Math.floor(10000 + Math.random() * 90000) + " " + Math.floor(10000 + Math.random() * 90000);
            
            dbObj[id] = {
                id: id,
                name: `${p} ${s}`,
                phone: phone,
                streetAddress: `Near ${hood}`,
                city: city,
                state: "Bihar",
                zipCode: city === "Gaya" ? "823001" : "824231",
                latitude: lat,
                longitude: lng,
                rating: rating,
                reviews: reviews,
                neighborhoods: [...new Set([hood, hood2, city])]
            };
            salonIds.push(id);
            count++;
        }
    }
    if (count >= 100) break;
}

const dbString = "const db = " + JSON.stringify(dbObj, null, 4) + ";";

const frontendPath = path.join(__dirname, 'frontend', 'src', 'PublicSalonPage.jsx');
let frontendCode = fs.readFileSync(frontendPath, 'utf8');
frontendCode = frontendCode.replace(/const db = \{[\s\S]*?\};\s*return db\[salonId\]/, dbString + "\n  return db[salonId]");
fs.writeFileSync(frontendPath, frontendCode);
console.log("Updated PublicSalonPage.jsx");

const backendPath = path.join(__dirname, 'beautyai-parent', 'salon-service', 'src', 'main', 'java', 'com', 'beautyai', 'salon', 'controller', 'SitemapController.java');
let backendCode = fs.readFileSync(backendPath, 'utf8');
const listStr = 'List<String> salonIds = Arrays.asList(' + salonIds.map(id => `"${id}"`).join(', ') + ');';
backendCode = backendCode.replace(/List<String> salonIds = Arrays\.asList\([^)]+\);/, listStr);
fs.writeFileSync(backendPath, backendCode);
console.log("Updated SitemapController.java");
