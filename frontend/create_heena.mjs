const API_URL = 'https://0vhta6exz6.execute-api.us-east-1.amazonaws.com/api/v1/salons';

async function createHeena() {
    const pin = Math.floor(100000 + Math.random() * 900000).toString();
    const payload = {
        name: "Heena Makeover",
        address: "Katari Hill Rd, near Rose Palace, Aliganj, Gaya, Bihar 823001",
        city: "Gaya",
        googleMapsLink: "https://share.google/cmQ1LEvRSU4C9LSCe",
        accessPin: pin,
        neighborhoods: ["Aliganj", "Gaya"],
        workingHours: { "Monday": "09:00 - 20:00", "Tuesday": "09:00 - 20:00" },
        aiSystemPrompt: "You are an AI assistant for Heena Makeover in Gaya.",
        rating: "4.7",
        reviews: 25
    };
is call 
    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer mock-jwt-token-super-admin'
            },
            body: JSON.stringify(payload)
        });
        
        if (res.ok) {
            const data = await res.json();
            console.log("SUCCESS");
            console.log("ID:", data.id);
            console.log("PIN:", pin);
        } else {
            console.error("FAILED", await res.text());
        }
    } catch (e) {
        console.error("ERROR", e);
    }
}

createHeena();
