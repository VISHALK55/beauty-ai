$TableName = "BeautyAiTable"
$Region = "us-east-1"

$Item = @"
{
    "PK": {"S": "SALON#pihu-makeover"},
    "SK": {"S": "METADATA"},
    "id": {"S": "pihu-makeover"},
    "name": {"S": "Pihu Makeover"},
    "city": {"S": "Bodhgaya"},
    "address": {"S": "Near Mahabodhi Temple, Bodhgaya"},
    "rating": {"S": "4.8"},
    "reviews": {"N": "145"},
    "phone": {"S": "+91 98765 43210"},
    "accessPin": {"S": "123456"},
    "geoRankEnabled": {"BOOL": true},
    "neighborhoods": {"L": [
        {"S": "Mahabodhi Temple Area"},
        {"S": "Sujata Bypass"},
        {"S": "Karmapa Temple Road"}
    ]}
}
"@

Set-Content -Path "item.json" -Value $Item
aws dynamodb put-item --table-name $TableName --region $Region --item file://item.json
Remove-Item -Path "item.json"

Write-Host "Seeded Pihu Makeover to $TableName in $Region"
