package com.microtask.microtask.model;

public class Application {

    private String userId; // ID de l'utilisateur postulant
    private String message; // Message de candidature
    private ApplicationStatus status; // Statut de la candidature (PENDING, ACCEPTED, REJECTED)

    // Getters et Setters
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public ApplicationStatus getStatus() {
        return status;
    }

    public void setStatus(ApplicationStatus status) {
        this.status = status;
    }
}