import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';

const client = new DynamoDBClient({ region: 'us-east-1' });

const heenaData = {
    PK: 'SALON#heena-makeover',
    SK: 'METADATA',
    id: 'heena-makeover',
    name: 'Heena Makeover',
    city: 'Gaya, Bihar 823001',
    address: 'Katari Hill Rd, near Rose Palace, Aliganj, Gaya',
    phone: '+919708081187',
    email: 'contact@heenamakeover.com',
    image: '/gallery/heena makeover/owner.jpg',
    heroImage: '/gallery/heena makeover/owner.jpg',
    instagram: 'https://www.instagram.com/heena_makeover_salon_?igsh=c2R3aXVyeTF4ZXUz',
    rating: '4.9',
    reviews: 142,
    workingHours: {
        'Monday': '9:00 AM - 9:00 PM',
        'Tuesday': '9:00 AM - 9:00 PM',
        'Wednesday': '9:00 AM - 9:00 PM',
        'Thursday': '9:00 AM - 9:00 PM',
        'Friday': '9:00 AM - 9:00 PM',
        'Saturday': '9:00 AM - 9:00 PM',
        'Sunday': '9:00 AM - 9:00 PM'
    },
    galleryImages: [
        '/gallery/heena makeover/bride-1.jpg',
        '/gallery/heena makeover/bride-2.jpg',
        '/gallery/heena makeover/bride-3.jpg',
        '/gallery/heena makeover/bride-4.jpg'
    ],
    neighborhoods: ['Katari Hill', 'Aliganj', 'Gaya', 'Bodhgaya']
};

async function putData() {
    try {
        const command = new PutItemCommand({
            TableName: 'BeautyAiTable',
            Item: marshall(heenaData)
        });
        const response = await client.send(command);
        console.log('Successfully inserted Heena Makeover data:', response);
    } catch (err) {
        console.error('Error inserting data:', err);
    }
}

putData();
