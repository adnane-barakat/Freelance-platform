package com.example.usermanagement.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @NotEmpty(message = "Le nom est obligatoire")
    private String name;

    @Column(nullable = false, unique = true)
    @Email(message = "Email invalide")
    private String email;

    @Column(nullable = false)
    @Size(min = 6, message = "Le mot de passe doit contenir au moins 6 caractères")
    private String password;
    @Column
    private String resetToken; // Ajout du champ pour stocker le token


    // Suppression des champs séparés pour employer/worker
    // Tout utilisateur peut être à la fois employeur et travailleur
}
