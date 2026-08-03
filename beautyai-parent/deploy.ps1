$ErrorActionPreference = 'Stop'
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-21.0.11.10-hotspot"

Write-Host "Downloading Apache Maven..."
$mavenUrl = "https://archive.apache.org/dist/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.zip"
$mavenZip = "$env:TEMP\apache-maven.zip"
$mavenDir = "$env:TEMP\maven"

if (-not (Test-Path $mavenDir)) {
    Invoke-WebRequest -Uri $mavenUrl -OutFile $mavenZip
    Write-Host "Extracting Maven..."
    Expand-Archive -Path $mavenZip -DestinationPath $mavenDir -Force
}

$mavenBin = "$mavenDir\apache-maven-3.9.6\bin"
Write-Host "Adding Maven to PATH for this session: $mavenBin"
$env:PATH = "$mavenBin;" + $env:PATH

Write-Host "Verifying Maven..."
mvn --version

$env:JAVA_HOME = 'C:\Program Files\Eclipse Adoptium\jdk-21.0.11.10-hotspot'

Write-Host "Building AWS SAM Project..."
sam build

Write-Host "Deploying AWS SAM Project..."
sam deploy --stack-name beautyai-backend --resolve-s3 --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM --no-fail-on-empty-changeset --region us-east-1

Write-Host "Fetching API Endpoint Output..."
aws cloudformation describe-stacks --stack-name beautyai-backend --query 'Stacks[0].Outputs[?OutputKey==`ApiEndpoint`].OutputValue' --output text

Write-Host "Deployment Script Completed Successfully!"
