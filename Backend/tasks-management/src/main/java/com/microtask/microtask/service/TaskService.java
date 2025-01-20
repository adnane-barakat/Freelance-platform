package com.microtask.microtask.service;

import com.microtask.microtask.model.Application;
import com.microtask.microtask.model.ApplicationStatus;
import com.microtask.microtask.model.Task;
import com.microtask.microtask.model.TaskStatus;
import com.microtask.microtask.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final NotificationService notificationService;

    public TaskService(TaskRepository taskRepository, NotificationService notificationService) {
        this.taskRepository = taskRepository;
        this.notificationService = notificationService;
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Optional<Task> getTaskById(String id) {
        return taskRepository.findById(id);
    }

    public Task createTask(Task task) {
        task.setCreatedAt(java.time.LocalDate.now());
        task.setStatus(TaskStatus.OPEN);
        return taskRepository.save(task);
    }

    public void deleteTask(String id) {
        taskRepository.deleteById(id);
    }

    public Task applyToTask(String taskId, String userId, String message) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (task.getStatus() != TaskStatus.OPEN) {
            throw new RuntimeException("Task is not open for applications");
        }

        boolean alreadyApplied = task.getApplications().stream()
                .anyMatch(application -> application.getUserId().equals(userId));

        if (alreadyApplied) {
            throw new RuntimeException("User has already applied to this task");
        }

        Application application = new Application();
        application.setUserId(userId);
        application.setMessage(message);
        application.setStatus(ApplicationStatus.PENDING);

        task.getApplications().add(application);

        // Notification automatique à l'owner de la tâche
        notificationService.createNotification(
                task.getCreatedBy(), // userId
                "badreddineachraf03@hotmail.com", // email fictif pour le propriétaire
                "Une nouvelle candidature a été reçue pour '" + task.getTitle() + "'.",
                "NEW_APPLICATION" // Type de la notification
        );

        return taskRepository.save(task);
    }

    public Task updateApplicationStatus(String taskId, String userId, ApplicationStatus status, String ownerId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getCreatedBy().equals(ownerId)) {
            throw new RuntimeException("Only the owner can update application statuses");
        }

        task.getApplications().stream()
                .filter(application -> application.getUserId().equals(userId))
                .findFirst()
                .ifPresent(application -> {
                    application.setStatus(status);

                    if (status == ApplicationStatus.ACCEPTED) {
                        task.setStatus(TaskStatus.TAKEN);

                        // Notification au travailleur
                        notificationService.createNotification(
                                application.getUserId(),
                                "chrifo500@gmail.com", // Email fictif du travailleur
                                "Votre candidature pour '" + task.getTitle() + "' a été acceptée.",
                                "CANDIDATURE_ACCEPTED"
                        );
                    } else if (status == ApplicationStatus.REJECTED) {
                        boolean hasAcceptedApplication = task.getApplications().stream()
                                .anyMatch(app -> app.getStatus() == ApplicationStatus.ACCEPTED);

                        if (!hasAcceptedApplication) {
                            task.setStatus(TaskStatus.OPEN);
                        }

                        // Notification au travailleur
                        notificationService.createNotification(
                                application.getUserId(),
                                "chrifo500@gmail.com", // Email fictif du travailleur
                                "Votre candidature pour '" + task.getTitle() + "' a été rejetée.",
                                "CANDIDATURE_REJECTED"
                        );
                    }
                });

        return taskRepository.save(task);
    }

    public List<Task> getTasksWithApplicationsByUser(String userId) {
        return taskRepository.findAll().stream()
                .filter(task -> task.getApplications().stream()
                        .anyMatch(application -> application.getUserId().equals(userId)))
                .collect(Collectors.toList());
    }

    public Task archiveTask(String id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setStatus(TaskStatus.ARCHIVED);
        return taskRepository.save(task);
    }

    public List<Task> getArchivedTasks() {
        return taskRepository.findAll().stream()
                .filter(task -> task.getStatus() == TaskStatus.ARCHIVED)
                .collect(Collectors.toList());
    }

    public Task completeTask(String id, String ownerId) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getCreatedBy().equals(ownerId)) {
            throw new RuntimeException("Only the owner can complete this task");
        }

        if (task.getStatus() != TaskStatus.TAKEN) {
            throw new RuntimeException("Task must be in TAKEN status to be completed");
        }

        task.setStatus(TaskStatus.COMPLETED);

        // Notification automatique au travailleur
        task.getApplications().stream()
                .filter(app -> app.getStatus() == ApplicationStatus.ACCEPTED)
                .findFirst()
                .ifPresent(application -> notificationService.createNotification(
                        application.getUserId(),
                        "chrifo500@gmail.com", // Email fictif
                        "La tâche '" + task.getTitle() + "' a été marquée comme terminée.",
                        "TASK_COMPLETED"
                ));

        return taskRepository.save(task);
    }

    public Task cancelTask(String id, String ownerId) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getCreatedBy().equals(ownerId)) {
            throw new RuntimeException("Only the owner can cancel this task");
        }

        task.setStatus(TaskStatus.CANCELLED);

        // Rejeter toutes les candidatures et notifier les utilisateurs
        task.getApplications().forEach(application -> {
            application.setStatus(ApplicationStatus.REJECTED);
            notificationService.createNotification(
                    application.getUserId(),
                    "chrifo500@gmail.com", // Email fictif
                    "La tâche '" + task.getTitle() + "' a été annulée.",
                    "TASK_CANCELLED"
            );
        });

        return taskRepository.save(task);
    }

    public Task deleteApplication(String taskId, String userId, String ownerId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getCreatedBy().equals(ownerId)) {
            throw new RuntimeException("Only the owner can delete an application");
        }

        task.getApplications().removeIf(application -> application.getUserId().equals(userId));

        boolean hasAcceptedApplication = task.getApplications().stream()
                .anyMatch(application -> application.getStatus() == ApplicationStatus.ACCEPTED);

        if (!hasAcceptedApplication) {
            task.setStatus(TaskStatus.OPEN);
        }

        return taskRepository.save(task);
    }
}