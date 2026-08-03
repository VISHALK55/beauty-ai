$ErrorActionPreference = 'Stop'
$env:AWS_PAGER = ""
# Define bucket names (Must be globally unique)
$customerBucket = "beauty-ai-customer-41482"
$adminBucket = "beauty-ai-admin-46074"

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
