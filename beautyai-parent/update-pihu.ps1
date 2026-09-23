$TableName = "BeautyAiTable"
$Region = "us-east-1"

$Item = @"
{
    "PK": {"S": "SALON#pihu-makeover"},
    "SK": {"S": "METADATA"},
    "id": {"S": "pihu-makeover"},
    "name": {"S": "Pihu Makeover"},
    "city": {"S": "Bodh Gaya, Bihar 824231"},
    "address": {"S": "Rajapur, Sujata Rd, near Govt. Middle School, Upadhayay Bigha, Bodh Gaya, Gaya, Bihar 824231"},
    "rating": {"S": "4.9"},
    "reviews": {"N": "72"},
    "phone": {"S": "+91 91137 15558"},
    "accessPin": {"S": "123456"},
    "instagram": {"S": "https://www.instagram.com/pihu_makeover22"},
    "email": {"S": "bindupihu@gmail.com"},
    "googleMapsLink": {"S": "https://share.google/6jMFkpyoHx2OLDgYP"},
    "workingHours": {"M": {
        "Monday": {"S": "09:00 AM - 08:00 PM"},
        "Tuesday": {"S": "09:00 AM - 08:00 PM"},
        "Wednesday": {"S": "09:00 AM - 08:00 PM"},
        "Thursday": {"S": "09:00 AM - 08:00 PM"},
        "Friday": {"S": "09:00 AM - 08:00 PM"},
        "Saturday": {"S": "09:00 AM - 08:00 PM"},
        "Sunday": {"S": "10:00 AM - 06:00 PM"}
    }},
    "aiSystemPrompt": {"S": "You are the official AI assistant for Pihu Makeover, a luxury beauty salon and academy in Bodhgaya, Bihar, run by expert Bindu Sharma. Your goal is to help clients book bridal makeup or enroll in our cosmetology courses. We specialize in HD and Airbrush bridal makeup using premium brands like MAC, Huda Beauty, and Kryolan. We also run a professional makeup academy. We are located at Rajapur, Sujata Rd, near Govt. Middle School, Bodhgaya. We are open Mon-Sat 9 AM to 8 PM, and Sun 10 AM to 6 PM. Always be polite, professional, and encourage clients to call +91 91137 15558 or email bindupihu@gmail.com for immediate booking."},
    "geoRankEnabled": {"BOOL": true},
    "image": {"S": "/gallery/owner.jpg"},
    "heroImage": {"S": "/gallery/services_hero.png"},
    "galleryImages": {"L": [
        {"S": "/gallery/gallery_1.jpg"},
        {"S": "/gallery/gallery_2.jpg"}
    ]},
    "neighborhoods": {"L": [
        {"S": "Rajapur"},
        {"S": "Upadhayay Bigha"},
        {"S": "Bodh Gaya"}
    ]}
}
"@

Set-Content -Path "item-real.json" -Value $Item
aws dynamodb put-item --table-name $TableName --region $Region --item file://item-real.json
Remove-Item -Path "item-real.json"

Write-Host "Updated Pihu Makeover with REAL DATA to $TableName in $Region"
