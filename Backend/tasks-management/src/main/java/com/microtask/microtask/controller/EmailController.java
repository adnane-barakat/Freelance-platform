package com.microtask.microtask.controller;

import com.microtask.microtask.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmailController {

    private final EmailService emailService;

    @Autowired
    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @GetMapping("/test-email")
    public String sendTestEmail(
            @RequestParam String toEmail,
            @RequestParam String subject,
            @RequestParam String body
    ) {
        try {
            emailService.sendEmail(toEmail, subject, body);
            return "Email sent successfully to " + toEmail;
        } catch (Exception e) {
            return "Error sending email: " + e.getMessage();
        }
    }
}