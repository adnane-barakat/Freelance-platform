package com.microtask.microtask.controller;

import com.microtask.microtask.model.Notification;
import com.microtask.microtask.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    // Récupérer les notifications d'un utilisateur
    @GetMapping
    public ResponseEntity<List<Notification>> getNotifications(@RequestParam String userId) {
        return ResponseEntity.ok(notificationService.getNotificationsByUserId(userId));
    }

    // Marquer une notification comme lue
    /*@PatchMapping("/{id}/read")
    public ResponseEntity<Notification> markNotificationAsRead(@PathVariable String id) {
        return ResponseEntity.ok(notificationService.markAsRead(id));
    }*/
}