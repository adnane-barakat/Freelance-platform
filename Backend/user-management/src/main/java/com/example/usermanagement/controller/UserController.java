package com.example.usermanagement.controller;

import com.example.usermanagement.model.User;
import com.example.usermanagement.service.UserService;
import com.example.usermanagement.service.EmailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final EmailService emailService;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserController(UserService userService, EmailService emailService, BCryptPasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        userService.registerUser(user);
        return ResponseEntity.ok("Utilisateur enregistré avec succès !");
    }

    @GetMapping("/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        return userService.findByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody String email) {
        userService.forgotPassword(email);
        return ResponseEntity.ok("Un email de réinitialisation de mot de passe a été envoyé à votre adresse.");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestParam String token, @RequestBody String newPassword) {
        userService.resetPassword(token, newPassword);
        return ResponseEntity.ok("Votre mot de passe a été réinitialisé avec succès.");
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User user) {
        Optional<User> existingUser = userService.findByEmail(user.getEmail());
        if (existingUser.isPresent() &&
                passwordEncoder.matches(user.getPassword(), existingUser.get().getPassword())) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }

    @PostMapping("/test-notification")
    public ResponseEntity<String> testNotification(@RequestParam String email) {
        String subject = "Test de notification";
        String message = "Ceci est un test de notification envoyé depuis l'application.";
        emailService.sendEmail(email, subject, message);
        return ResponseEntity.ok("Email envoyé avec succès à " + email);
    }

    // Nouveau endpoint pour les statistiques du tableau de bord
    @GetMapping("/dashboard-stats")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        // Exemple de données fictives pour les statistiques
        Map<String, Object> stats = new HashMap<>();
        stats.put("tasksPosted", 12); // Exemple : nombre de tâches postées
        stats.put("tasksApplied", 5); // Exemple : nombre de tâches appliquées
        stats.put("tasksCompleted", 8); // Exemple : nombre de tâches complétées
        stats.put("totalEarnings", 1200); // Exemple : gains totaux en dollars

        // Retourner les statistiques au format JSON
        return ResponseEntity.ok(stats);
    }
}
