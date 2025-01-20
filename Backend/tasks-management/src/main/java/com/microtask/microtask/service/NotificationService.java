package com.microtask.microtask.service;

import com.microtask.microtask.model.Notification;
import com.microtask.microtask.repository.NotificationRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final EmailService emailService;

    public NotificationService(NotificationRepository notificationRepository, EmailService emailService) {
        this.notificationRepository = notificationRepository;
        this.emailService = emailService;
    }

    public Notification createNotification(String userId, String email, String message, String type) {
        Notification notification = new Notification();
        notification.setUserId(userId);
        notification.setEmail(email); // Renseigne l'adresse email
        notification.setMessage(message);
        notification.setType(type);
        notification.setTimestamp(LocalDateTime.now());
        notification.setRead(false);

        // Enregistre la notification dans la base de données
        notificationRepository.save(notification);

        // Envoie un email
        emailService.sendEmail(
                email,
                "Notification : " + type,
                message
        );

        return notification;
    }

    public List<Notification> getNotificationsByUserId(String userId) {
        return notificationRepository.findByUserId(userId);
    }
}