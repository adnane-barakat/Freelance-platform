package com.example.usermanagement.controller;

import com.example.usermanagement.service.EmailService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class EmailController {

    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @GetMapping("/send-test-email")
    public String sendTestEmail(@RequestParam String to) {
        emailService.sendEmail(to, "Test Email", "Ceci est un email de test.");
        return "Email envoyé à " + to;
    }
}
