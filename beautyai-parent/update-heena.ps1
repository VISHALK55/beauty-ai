$TableName = "BeautyAiTable"
$Region = "us-east-1"

$Item = @"
{
    "PK": {"S": "SALON#heena-makeover"},
    "SK": {"S": "METADATA"},
    "id": {"S": "heena-makeover"},
    "name": {"S": "Heena Makeover"},
    "city": {"S": "Gaya, Bihar 823001"},
    "address": {"S": "Katari Hill Rd, near Rose Palace, Aliganj, Gaya"},
    "rating": {"S": "4.9"},
    "reviews": {"N": "142"},
    "phone": {"S": "+919708081187"},
    "email": {"S": "contact@heenamakeover.com"},
    "instagram": {"S": "https://www.instagram.com/heena_makeover_salon_"},
    "googleMapsLink": {"S": "https://maps.google.com/?q=Heena+Makeover+Gaya"},
    "workingHours": {"M": {
        "Monday": {"S": "09:00 AM - 09:00 PM"},
        "Tuesday": {"S": "09:00 AM - 09:00 PM"},
        "Wednesday": {"S": "09:00 AM - 09:00 PM"},
        "Thursday": {"S": "09:00 AM - 09:00 PM"},
        "Friday": {"S": "09:00 AM - 09:00 PM"},
        "Saturday": {"S": "09:00 AM - 09:00 PM"},
        "Sunday": {"S": "09:00 AM - 09:00 PM"}
    }},
    "geoRankEnabled": {"BOOL": true},
    "aiSystemPrompt": {"S": "You are the official AI assistant for Heena Makeover, a premium beauty salon located at Katari Hill Rd, Aliganj, Gaya. Your goal is to help clients book bridal makeup and beauty services. We are open every day from 9 AM to 9 PM. Always be polite, professional, and encourage clients to call +919708081187 or email contact@heenamakeover.com for immediate booking."},
    "image": {"S": "/gallery/heena makeover/owner.jpg"},
    "heroImage": {"S": "/gallery/heena makeover/owner.jpg"},
    "galleryImages": {"L": [
        {"S": "/gallery/heena makeover/bride-1.jpg"},
        {"S": "/gallery/heena makeover/bride-2.jpg"},
        {"S": "/gallery/heena makeover/bride-3.jpg"},
        {"S": "/gallery/heena makeover/bride-4.jpg"}
    ]},
    "neighborhoods": {"L": [
        {"S": "Katari Hill"},
        {"S": "Aliganj"},
        {"S": "Gaya"},
        {"S": "Bodhgaya"}
    ]}
}
"@

Set-Content -Path "item-heena.json" -Value $Item
aws dynamodb put-item --table-name $TableName --region $Region --item file://item-heena.json
Remove-Item -Path "item-heena.json"

Write-Host "Updated Heena Makeover with GEO RANK SEO DATA"
