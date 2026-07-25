# Run all microservices

$env:JAVA_HOME='C:\Program Files\Eclipse Adoptium\jdk-21.0.11.10-hotspot'
$mvn = "..\salon-service\apache-maven-3.9.8\bin\mvn.cmd"

$services = @("auth-service", "salon-service", "booking-service", "ai-service", "notification-service", "payment-service", "analytics-service")

foreach ($service in $services) {
    if (Test-Path $service) {
        Write-Host "Starting $service..."
        Start-Process -FilePath "powershell.exe" -ArgumentList "-NoExit -Command `$env:JAVA_HOME='C:\Program Files\Eclipse Adoptium\jdk-21.0.11.10-hotspot'; Set-Location $service; $mvn spring-boot:run" -WindowStyle Normal
        Start-Sleep -Seconds 3
    }
}

Write-Host "All microservices started successfully!"
