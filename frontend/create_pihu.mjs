const API_URL = 'https://0vhta6exz6.execute-api.us-east-1.amazonaws.com/api/v1/salons';

async function createPihu() {
    const pin = '123456'; // Use the known pin from the mock login fallback
    const payload = {
        name: "Pihu Makeover",
        address: "Main Road, Bodhgaya, Bihar 824231",
        city: "Bodhgaya",
        googleMapsLink: "https://maps.google.com/?q=Pihu+Makeover+Bodhgaya",
        accessPin: pin,
        neighborhoods: ["Bodhgaya", "Gaya"],
        workingHours: { "Monday": "09:00 - 20:00", "Tuesday": "09:00 - 20:00", "Wednesday": "09:00 - 20:00", "Thursday": "09:00 - 20:00", "Friday": "09:00 - 20:00", "Saturday": "09:00 - 20:00", "Sunday": "10:00 - 18:00" },
        aiSystemPrompt: "You are an AI assistant for Pihu Makeover in Bodhgaya.",
        rating: "4.9",
        reviews: 42,
        phone: "+919876543210"
    };

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

createPihu();
