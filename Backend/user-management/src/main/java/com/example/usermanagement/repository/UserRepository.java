package com.example.usermanagement.repository;

import com.example.usermanagement.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email); // Récupérer un utilisateur via email
    Optional<User> findByResetToken(String resetToken); // Trouver un utilisateur par le token
}
