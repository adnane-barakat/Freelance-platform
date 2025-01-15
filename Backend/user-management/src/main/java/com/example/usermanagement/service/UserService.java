package com.example.usermanagement.service;

import com.example.usermanagement.model.User;
import com.example.usermanagement.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder, EmailService emailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    // Méthode d'inscription
    public User registerUser(User user) {
        // Hachage du mot de passe
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Enregistrement de l'utilisateur
        User savedUser = userRepository.save(user);

        // Envoi de l'email de confirmation
        String subject = "Confirmation d'inscription";
        String message = "Bonjour " + user.getName() + ",\n\n" +
                "Merci de vous être inscrit sur notre plateforme.\n" +
                "Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter avec votre e-mail : " +
                user.getEmail() + ".\n\n" +
                "Cordialement,\n" +
                "L'équipe de gestion des utilisateurs";
        emailService.sendEmail(user.getEmail(), subject, message);

        return savedUser;
    }

    // Mot de passe oublié
    public void forgotPassword(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            throw new RuntimeException("Utilisateur introuvable avec cet email : " + email);
        }

        User user = userOptional.get();

        // Génération d'un token temporaire
        String resetToken = UUID.randomUUID().toString();

        // Stockage du token dans l'utilisateur
        user.setResetToken(resetToken);
        userRepository.save(user);

        // Construction du lien de réinitialisation
        String resetLink = "http://localhost:9090/api/users/reset-password?token=" + resetToken;

        // Envoi de l'email
        String subject = "Réinitialisation de votre mot de passe";
        String text = "Bonjour " + user.getName() + ",\n\n" +
                "Cliquez sur le lien suivant pour réinitialiser votre mot de passe :\n" + resetLink + "\n\n" +
                "Si vous n'avez pas demandé de réinitialisation, ignorez cet email.";

        emailService.sendEmail(user.getEmail(), subject, text);
    }

    // Réinitialisation de mot de passe
    public void resetPassword(String token, String newPassword) {
        Optional<User> userOptional = userRepository.findByResetToken(token);

        if (userOptional.isEmpty()) {
            throw new RuntimeException("Token de réinitialisation invalide ou expiré.");
        }

        User user = userOptional.get();

        // Mise à jour du mot de passe avec hachage
        user.setPassword(passwordEncoder.encode(newPassword));
        user.setResetToken(null); // Suppression du token après utilisation
        userRepository.save(user);
    }

    // Recherche d'un utilisateur par email
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
