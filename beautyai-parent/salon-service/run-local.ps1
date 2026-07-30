$ErrorActionPreference = 'Stop'
$extractPath = "$env:TEMP\jdk21"

if (-not (Test-Path $extractPath)) {
    Write-Error "JDK 21 is not found. Please wait for the build script to finish downloading it first."
}

$jdkFolder = Get-ChildItem -Path $extractPath -Directory | Select-Object -First 1
$env:JAVA_HOME = $jdkFolder.FullName
$env:PATH = "$env:JAVA_HOME\bin;$env:PATH"

Write-Host "Starting Spring Boot locally on port 8081 with local profile..."
java -jar target/salon-service-1.0.0-SNAPSHOT.jar --spring.profiles.active=local
