import { DynamoDBClient, UpdateItemCommand } from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({ region: 'us-east-1' });

// ==============================================================================
// TODO: Replace these with your REAL Meta credentials from the Developer Portal
// ==============================================================================
const SALON_ID = 'heena-makeover'; // or 'pihu-makeover'
const REAL_META_ACCESS_TOKEN = 'YOUR_REAL_LONG_LIVED_ACCESS_TOKEN_HERE';
const REAL_META_AD_ACCOUNT_ID = 'act_YOUR_REAL_AD_ACCOUNT_ID'; // Make sure to prefix with 'act_' if Meta requires it
const REAL_META_PAGE_ID = 'YOUR_REAL_FACEBOOK_PAGE_ID';
const REAL_META_INSTAGRAM_ACTOR_ID = 'YOUR_REAL_INSTAGRAM_ACTOR_ID';
// ==============================================================================

async function updateMetaCredentials() {
    console.log(`Updating Meta credentials for salon: ${SALON_ID}...`);
    
    try {
        const command = new UpdateItemCommand({
            TableName: 'BeautyAiTable',
            Key: {
                PK: { S: `SALON#${SALON_ID}` },
                SK: { S: 'METADATA' }
            },
            UpdateExpression: "SET metaAccessToken = :token, metaAdAccountId = :adAccount, metaPageId = :pageId, metaInstagramActorId = :igActorId",
            ExpressionAttributeValues: {
                ":token": { S: REAL_META_ACCESS_TOKEN },
                ":adAccount": { S: REAL_META_AD_ACCOUNT_ID },
                ":pageId": { S: REAL_META_PAGE_ID },
                ":igActorId": { S: REAL_META_INSTAGRAM_ACTOR_ID }
            },
            ReturnValues: "ALL_NEW"
        });

        const response = await client.send(command);
        console.log('Successfully updated the database!');
        console.log('New Record State:', JSON.stringify(response.Attributes, null, 2));
    } catch (err) {
        console.error('Error updating DynamoDB:', err);
    }
}

updateMetaCredentials();
