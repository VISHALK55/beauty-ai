package com.beautyai;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.client.RestClient;

@SpringBootApplication
@ComponentScan(basePackages = "com.beautyai")
public class MonolithApplication {

    @Bean
    public RestClient.Builder restClientBuilder() {
        return RestClient.builder();
    }

    public static void main(String[] args) {
        SpringApplication.run(MonolithApplication.class, args);
    }
}
