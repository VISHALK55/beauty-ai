$ErrorActionPreference = 'Stop'
$env:AWS_PAGER = ""
# Define bucket names (Must be globally unique)
$customerBucket = "beauty-ai-customer-$(Get-Random -Minimum 10000 -Maximum 99999)"
$adminBucket = "beauty-ai-admin-$(Get-Random -Minimum 10000 -Maximum 99999)"

Write-Host "Creating S3 Buckets..."
aws s3 mb s3://$customerBucket --region us-east-1
aws s3 mb s3://$adminBucket --region us-east-1

Write-Host "Removing Block Public Access..."
aws s3api put-public-access-block --bucket $customerBucket --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"
aws s3api put-public-access-block --bucket $adminBucket --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

Write-Host "Configuring Bucket Policies..."
$policyCustomer = "{`"Version`":`"2012-10-17`",`"Statement`":[{`"Sid`":`"PublicReadGetObject`",`"Effect`":`"Allow`",`"Principal`":`"*`",`"Action`":`"s3:GetObject`",`"Resource`":`"arn:aws:s3:::$customerBucket/*`"}]}"
$policyAdmin = "{`"Version`":`"2012-10-17`",`"Statement`":[{`"Sid`":`"PublicReadGetObject`",`"Effect`":`"Allow`",`"Principal`":`"*`",`"Action`":`"s3:GetObject`",`"Resource`":`"arn:aws:s3:::$adminBucket/*`"}]}"

aws s3api put-bucket-policy --bucket $customerBucket --policy $policyCustomer
aws s3api put-bucket-policy --bucket $adminBucket --policy $policyAdmin

Write-Host "Configuring Website Hosting..."
aws s3 website s3://$customerBucket/ --index-document index.html --error-document index.html
aws s3 website s3://$adminBucket/ --index-document index.html --error-document index.html

Write-Host "Building Customer Frontend..."
cd c:\Users\welcome\.gemini\antigravity-ide\scratch\beauty-ai\customer-frontend
npm run build
aws s3 sync dist/ s3://$customerBucket/ --delete

Write-Host "Building Admin Frontend..."
cd c:\Users\welcome\.gemini\antigravity-ide\scratch\beauty-ai\frontend
npm run build
aws s3 sync dist/ s3://$adminBucket/ --delete

Write-Host "========================================="
Write-Host "DEPLOYMENT SUCCESSFUL!"
Write-Host "Customer URL: http://$customerBucket.s3-website-us-east-1.amazonaws.com"
Write-Host "Admin URL: http://$adminBucket.s3-website-us-east-1.amazonaws.com"
Write-Host "========================================="
