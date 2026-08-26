$ErrorActionPreference = 'Stop'

$bucketName = "beauty-ai-frontend-2026-prod-$(Get-Random -Minimum 1000 -Maximum 9999)"
Write-Host "Bucket: $bucketName"

Write-Host "Building frontend..."
npm run build

Write-Host "Creating S3 bucket..."
aws s3 mb s3://$bucketName --region us-east-1

Write-Host "Enabling static website hosting..."
aws s3 website s3://$bucketName --index-document index.html --error-document index.html

Write-Host "Removing Public Access Block..."
aws s3api put-public-access-block --bucket $bucketName --public-access-block-configuration BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false

Write-Host "Adding bucket policy..."
$policy = @"
{
    `"Version`": `"2012-10-17`",
    `"Statement`": [
        {
            `"Sid`": `"PublicReadGetObject`",
            `"Effect`": `"Allow`",
            `"Principal`": `"*`",
            `"Action`": `"s3:GetObject`",
            `"Resource`": `"arn:aws:s3:::$bucketName/*`"
        }
    ]
}
"@
Set-Content -Path policy.json -Value $policy
aws s3api put-bucket-policy --bucket $bucketName --policy file://policy.json

Write-Host "Syncing files..."
aws s3 sync dist/ s3://$bucketName

Write-Host "Done! URL is: http://$bucketName.s3-website-us-east-1.amazonaws.com"
