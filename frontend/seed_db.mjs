import { salonsDatabase } from './src/salonsData.js';
const API_URL = 'https://80oueey8cc.execute-api.us-east-1.amazonaws.com/api/v1/salons';

async function seed() {
    const salons = Object.values(salonsDatabase);
    let count = 0;
    for (const salon of salons) {
        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: salon.name,
                    address: salon.streetAddress + ', ' + salon.city,
                    gstNumber: '',
                    workingHours: { "Mon-Sun": "9 AM - 8 PM" },
                    aiSystemPrompt: 'You are an AI assistant for ' + salon.name,
                    googleMapsLink: 'https://maps.google.com/?q=' + salon.latitude + ',' + salon.longitude
                })
            });
            if (res.ok) {
                console.log('Seeded: ' + salon.name);
                count++;
            } else {
                console.error('Failed to seed: ' + salon.name, await res.text());
            }
        } catch (e) {
            console.error('Error seeding ' + salon.name, e.message);
        }
    }
    console.log('Successfully seeded ' + count + ' salons.');
}
seed();
