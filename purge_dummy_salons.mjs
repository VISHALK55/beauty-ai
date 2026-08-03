import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "us-east-1" });
const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = "BeautyAiTable";

const keepSalons = new Set([
    "SALON#surbhi-gaya", 
    "SALON#pihu-makeover", 
    "SALON#glamour-gaya", 
    "SALON#radiance-bodhgaya", 
    "SALON#blossom-gaya",
    "SALON#SUPER_ADMIN"
]);

async function purgeDummySalons() {
    console.log(`Scanning table ${TABLE_NAME} for dummy salons...`);
    let lastEvaluatedKey = undefined;
    let deletedCount = 0;

    do {
        const scanResponse = await docClient.send(new ScanCommand({
            TableName: TABLE_NAME,
            ExclusiveStartKey: lastEvaluatedKey
        }));

        const items = scanResponse.Items || [];
        for (const item of items) {
            const pk = item.PK;
            const sk = item.SK;

            if (pk && pk.startsWith("SALON#") && !keepSalons.has(pk)) {
                // This is a record belonging to a dummy salon
                console.log(`Deleting record: PK=${pk}, SK=${sk}`);
                await docClient.send(new DeleteCommand({
                    TableName: TABLE_NAME,
                    Key: {
                        PK: pk,
                        SK: sk
                    }
                }));
                deletedCount++;
            }
        }
        
        lastEvaluatedKey = scanResponse.LastEvaluatedKey;
    } while (lastEvaluatedKey);

    console.log(`Finished purging. Deleted ${deletedCount} dummy records.`);
}

purgeDummySalons().catch(console.error);
