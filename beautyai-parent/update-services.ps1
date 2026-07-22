$services = @("auth-service", "booking-service", "ai-service", "notification-service", "payment-service", "analytics-service")

foreach ($service in $services) {
    Write-Host "Processing $service..."
    
    # Update pom.xml
    $pomPath = "$service\pom.xml"
    if (Test-Path $pomPath) {
        $pomContent = Get-Content $pomPath -Raw
        if ($pomContent -notmatch "maven-shade-plugin") {
            $pomContent = $pomContent -replace "</dependencies>`r`n</project>", "</dependencies>`r`n`r`n    <build>`r`n        <plugins>`r`n            <plugin>`r`n                <groupId>org.apache.maven.plugins</groupId>`r`n                <artifactId>maven-shade-plugin</artifactId>`r`n                <version>3.5.1</version>`r`n                <configuration>`r`n                    <createDependencyReducedPom>false</createDependencyReducedPom>`r`n                </configuration>`r`n                <executions>`r`n                    <execution>`r`n                        <phase>package</phase>`r`n                        <goals>`r`n                            <goal>shade</goal>`r`n                        </goals>`r`n                        <configuration>`r`n                            <artifactSet>`r`n                                <excludes>`r`n                                    <exclude>org.apache.tomcat.embed:*</exclude>`r`n                                </excludes>`r`n                            </artifactSet>`r`n                        </configuration>`r`n                    </execution>`r`n                </executions>`r`n            </plugin>`r`n        </plugins>`r`n    </build>`r`n</project>"
            $pomContent = $pomContent -replace "</dependencies>`n</project>", "</dependencies>`n`n    <build>`n        <plugins>`n            <plugin>`n                <groupId>org.apache.maven.plugins</groupId>`n                <artifactId>maven-shade-plugin</artifactId>`n                <version>3.5.1</version>`n                <configuration>`n                    <createDependencyReducedPom>false</createDependencyReducedPom>`n                </configuration>`n                <executions>`n                    <execution>`n                        <phase>package</phase>`n                        <goals>`n                            <goal>shade</goal>`n                        </goals>`n                        <configuration>`n                            <artifactSet>`n                                <excludes>`n                                    <exclude>org.apache.tomcat.embed:*</exclude>`n                                </excludes>`n                            </artifactSet>`n                        </configuration>`n                    </execution>`n                </executions>`n            </plugin>`n        </plugins>`n    </build>`n</project>"
            Set-Content -Path $pomPath -Value $pomContent
            Write-Host "Updated pom.xml for $service"
        }
    }

    # Find main class
    $mainClassFile = Get-ChildItem -Path "$service\src\main\java" -Recurse -Filter *Application.java | Select-Object -First 1
    if ($mainClassFile) {
        $content = Get-Content $mainClassFile.FullName
        $packageLine = $content | Where-Object { $_ -match "^package " } | Select-Object -First 1
        $packageName = $packageLine.Replace("package ", "").Replace(";", "").Trim()
        $mainClassName = $mainClassFile.BaseName
        $handlerPath = Join-Path $mainClassFile.DirectoryName "StreamLambdaHandler.java"
        
        $handlerCode = @"
package $packageName;

import com.amazonaws.serverless.exceptions.ContainerInitializationException;
import com.amazonaws.serverless.proxy.model.AwsProxyRequest;
import com.amazonaws.serverless.proxy.model.AwsProxyResponse;
import com.amazonaws.serverless.proxy.spring.SpringBootLambdaContainerHandler;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestStreamHandler;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public class StreamLambdaHandler implements RequestStreamHandler {
    private static SpringBootLambdaContainerHandler<AwsProxyRequest, AwsProxyResponse> handler;

    static {
        try {
            handler = SpringBootLambdaContainerHandler.getAwsProxyHandler(${mainClassName}.class);
        } catch (ContainerInitializationException e) {
            e.printStackTrace();
            throw new RuntimeException("Could not initialize Spring Boot application", e);
        }
    }

    @Override
    public void handleRequest(InputStream inputStream, OutputStream outputStream, Context context)
            throws IOException {
        handler.proxyStream(inputStream, outputStream, context);
    }
}
"@
        Set-Content -Path $handlerPath -Value $handlerCode
        Write-Host "Created StreamLambdaHandler for $service"
    }
}
Write-Host "Done!"
