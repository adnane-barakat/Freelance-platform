package com.microtask.microtask.repository;

import com.microtask.microtask.model.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface NotificationRepository extends MongoRepository<Notification, String> {

    // Récupérer toutes les notifications d'un utilisateur spécifique
    List<Notification> findByUserId(String userId);
}