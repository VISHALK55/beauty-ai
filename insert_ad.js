const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const client = new DynamoDBClient({ region: "us-east-1" });

async function insertAd() {
    const now = Date.now().toString();
    const params = {
        TableName: "BeautyAiTable",
        Item: {
            "PK": { S: "AD#pihu-campaign-1" },
            "SK": { S: "PROFILE" },
            "campaignId": { S: "pihu-campaign-1" },
            "salonIds": { S: "pihu-makeover" },
            "status": { S: "LIVE" },
            "dailyBudget": { N: "500" },
            "durationDays": { N: "1" },
            "createdAt": { N: now },
            "customPrompt": { S: "Admission in parlour showing 50% discount" }
        }
    };
    try {
        await client.send(new PutItemCommand(params));
        console.log("Successfully launched ad for Pihu Makeover Bodhgaya!");
    } catch (e) {
        console.error("Error:", e);
    }
}
insertAd();
