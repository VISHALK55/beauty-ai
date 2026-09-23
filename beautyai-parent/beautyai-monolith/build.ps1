$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-21.0.11.10-hotspot"
$env:PATH = "$env:TEMP\maven\apache-maven-3.9.6\bin;" + $env:PATH
mvn clean package
