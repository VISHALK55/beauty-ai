import { DynamoDBClient, DeleteItemCommand, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';

const client = new DynamoDBClient({ region: 'us-east-1' });

const pihuData = {
    PK: 'SALON#pihu-makeover',
    SK: 'METADATA',
    id: 'pihu-makeover',
    name: 'Pihu Makeover',
    city: 'Bodh Gaya, Bihar 824231',
    address: 'Rajapur, Sujata Rd, near Govt. Middle School, Upadhayay Bigha, Bodh Gaya',
    phone: '+919113715558',
    email: 'contact@pihumakeover.com',
    image: '/gallery/gallery_1.jpg',
    heroImage: '/gallery/gallery_1.jpg',
    instagram: 'https://instagram.com/pihumakeover',
    rating: '5.0',
    reviews: 65,
    workingHours: {
        'Monday': '10:00 AM - 8:00 PM',
        'Tuesday': '10:00 AM - 8:00 PM',
        'Wednesday': '10:00 AM - 8:00 PM',
        'Thursday': '10:00 AM - 8:00 PM',
        'Friday': '10:00 AM - 8:00 PM',
        'Saturday': '10:00 AM - 9:00 PM',
        'Sunday': '10:00 AM - 9:00 PM'
    },
    galleryImages: [
        '/gallery/gallery_2.jpg',
        '/gallery/gallery_3.jpg',
        '/gallery/gallery_4.jpg',
        '/gallery/gallery_5.jpg'
    ],
    neighborhoods: ['Rajapur', 'Sujata Rd', 'Bodh Gaya', 'Upadhayay Bigha']
};

async function fixDb() {
    try {
        // Delete the bad SK: PROFILE entry for heena-makeover that breaks the frontend
        console.log("Deleting bad heena-makeover PROFILE entry...");
        await client.send(new DeleteItemCommand({
            TableName: 'BeautyAiTable',
            Key: marshall({
                PK: 'SALON#heena-makeover',
                SK: 'PROFILE'
            })
        }));
        console.log("Deleted.");

        // Delete the previous wrong pihu makeover
        console.log("Deleting wrong pihu-makeover entry...");
        await client.send(new DeleteItemCommand({
            TableName: 'BeautyAiTable',
            Key: marshall({
                PK: 'SALON#pihu-makeover',
                SK: 'METADATA'
            })
        }));

        // Insert Pihu Makeover Bodhgaya
        console.log("Inserting exact Pihu Makeover Bodhgaya...");
        await client.send(new PutItemCommand({
            TableName: 'BeautyAiTable',
            Item: marshall(pihuData)
        }));
        console.log("Inserted Pihu Makeover.");

    } catch (err) {
        console.error('Error:', err);
    }
}

fixDb();
