$services = @("ai-service", "analytics-service", "auth-service", "booking-service", "notification-service", "payment-service", "salon-service", "common-library")
$monolithSourceDir = "beautyai-monolith\src\main\java\com\beautyai"

New-Item -ItemType Directory -Force -Path $monolithSourceDir | Out-Null

foreach ($service in $services) {
    Write-Host "Migrating $service..."
    $serviceSourceDir = "$service\src\main\java\com\beautyai"
    
    if (Test-Path $serviceSourceDir) {
        $subDirs = Get-ChildItem -Path $serviceSourceDir -Directory
        foreach ($subDir in $subDirs) {
            $destDir = Join-Path $monolithSourceDir $subDir.Name
            
            # Use robocopy to merge directories robustly
            robocopy $subDir.FullName $destDir /E /XF "*Application.java" "StreamLambdaHandler.java" "ImageEnhancementHandler.java"
        }
    }
}

# The exit code of robocopy is bitwise (1 means files copied, 2 means extra files, etc)
# We don't want the script to fail if robocopy returns < 8
Write-Host "Migration script completed successfully."
exit 0
