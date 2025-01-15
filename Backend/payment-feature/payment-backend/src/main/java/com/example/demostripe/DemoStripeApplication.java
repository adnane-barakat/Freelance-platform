package com.example.demostripe;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoStripeApplication implements CommandLineRunner {

    @Value("${stripe.api-key}")
    private String apiKey;

    public static void main(String[] args) {
        SpringApplication.run(DemoStripeApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("Stripe API Key: " + apiKey);
    }
}

