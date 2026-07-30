$ErrorActionPreference = 'Stop'

Write-Host "Downloading Amazon Corretto JDK 21..."
$jdkUrl = "https://corretto.aws/downloads/latest/amazon-corretto-21-x64-windows-jdk.zip"
$zipPath = "$env:TEMP\jdk21.zip"
$extractPath = "$env:TEMP\jdk21"

if (-not (Test-Path $extractPath)) {
    Invoke-WebRequest -Uri $jdkUrl -OutFile $zipPath
    Write-Host "Extracting JDK..."
    Expand-Archive -Path $zipPath -DestinationPath $extractPath -Force
}

$jdkFolder = Get-ChildItem -Path $extractPath -Directory | Select-Object -First 1
$env:JAVA_HOME = $jdkFolder.FullName
$env:PATH = "$env:JAVA_HOME\bin;$env:PATH"

Write-Host "JAVA_HOME set to: $env:JAVA_HOME"
Write-Host "Running Maven build..."

.\apache-maven-3.9.8\bin\mvn.cmd clean package

Write-Host "Build Complete!"
