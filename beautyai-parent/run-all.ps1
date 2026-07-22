# Run all microservices

$env:JAVA_HOME='C:\Program Files\Eclipse Adoptium\jdk-21.0.11.10-hotspot'
$mvn = ".\salon-service\apache-maven-3.9.8\bin\mvn.cmd"

$services = @("api-gateway", "auth-service", "salon-service", "booking-service", "ai-service", "notification-service", "payment-service", "analytics-service")

foreach ($service in $services) {
    Write-Host "Starting $service..."
    Start-Process -FilePath "powershell.exe" -ArgumentList "-NoExit -Command cd $service ; $mvn spring-boot:run" -WindowStyle Normal
    Start-Sleep -Seconds 5
}

Write-Host "All services started in separate windows!"
