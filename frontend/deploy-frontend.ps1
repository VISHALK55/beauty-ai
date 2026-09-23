$BucketName = "beautyai.makeup"

Write-Host "Configuring S3 Bucket for Static Website Hosting..."
$WebsiteConfig = @"
{
    "IndexDocument": {
        "Suffix": "index.html"
    },
    "ErrorDocument": {
        "Key": "index.html"
    },
    "RoutingRules": [
        {
            "Condition": {
                "KeyPrefixEquals": "pihu"
            },
            "Redirect": {
                "ReplaceKeyPrefixWith": "s/pihu-makeover",
                "HttpRedirectCode": "301"
            }
        }
    ]
}
"@
Set-Content -Path "website.json" -Value $WebsiteConfig
aws s3api put-bucket-website --bucket $BucketName --website-configuration file://website.json
Remove-Item -Path "website.json"

Write-Host "Disabling Public Access Block..."
aws s3api delete-public-access-block --bucket $BucketName

Write-Host "Applying Public Read Policy..."
$Policy = @"
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::$BucketName/*"
        }
    ]
}
"@
Set-Content -Path "policy.json" -Value $Policy
aws s3api put-bucket-policy --bucket $BucketName --policy file://policy.json
Remove-Item -Path "policy.json"

Write-Host "Building React App..."
npm run build

Write-Host "Uploading to S3..."
aws s3 sync dist s3://$BucketName/ --delete

Write-Host "Deployment Complete!"
$Endpoint = "http://$BucketName.s3-website-us-east-1.amazonaws.com"
Write-Host "Your website is now hosted at: $Endpoint"
