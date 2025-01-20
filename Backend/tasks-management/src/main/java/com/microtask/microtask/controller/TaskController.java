package com.microtask.microtask.controller;

import com.microtask.microtask.model.ApplicationStatus;
import com.microtask.microtask.model.Task;
import com.microtask.microtask.model.TaskStatus;
import com.microtask.microtask.service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable String id) {
        return taskService.getTaskById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskService.createTask(task);
    }

    @PostMapping("/{id}/apply")  //{id} est celui de la tache en question
    public ResponseEntity<Task> applyToTask(
            @PathVariable String id,
            @RequestParam String userId,
            @RequestParam String message
    ) {
        try {
            Task updatedTask = taskService.applyToTask(id, userId, message);
            return ResponseEntity.ok(updatedTask);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PatchMapping("/{id}/applications/{userId}/status")
    public ResponseEntity<Task> updateApplicationStatus(
            @PathVariable String id,
            @PathVariable String userId,
            @RequestParam ApplicationStatus status,
            @RequestParam String ownerId
    ) {
        try {
            Task updatedTask = taskService.updateApplicationStatus(id, userId, status, ownerId);
            return ResponseEntity.ok(updatedTask);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable String id) {
        try {
            taskService.deleteTask(id);
            return ResponseEntity.ok("Task deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Task not found");
        }
    }

    @PatchMapping("/{id}/archive")
    public ResponseEntity<Task> archiveTask(@PathVariable String id) {
        try {
            Task archivedTask = taskService.archiveTask(id);
            return ResponseEntity.ok(archivedTask);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/archived")
    public ResponseEntity<List<Task>> getArchivedTasks() {
        List<Task> archivedTasks = taskService.getArchivedTasks();
        return ResponseEntity.ok(archivedTasks);
    }

    @PatchMapping("/{id}/complete")
    public ResponseEntity<Task> completeTask(@PathVariable String id, @RequestParam String ownerId) {
        try {
            Task completedTask = taskService.completeTask(id, ownerId);
            return ResponseEntity.ok(completedTask);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PatchMapping("/{id}/cancel")
    public ResponseEntity<Task> cancelTask(@PathVariable String id, @RequestParam String ownerId) {
        try {
            Task cancelledTask = taskService.cancelTask(id, ownerId);
            return ResponseEntity.ok(cancelledTask);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @GetMapping("/user/{userId}/applied")
    public ResponseEntity<List<Task>> getAppliedTasks(@PathVariable String userId) {
        List<Task> appliedTasks = taskService.getTasksWithApplicationsByUser(userId);
        return ResponseEntity.ok(appliedTasks);
    }

    @DeleteMapping("/{id}/applications/{userId}")
    public ResponseEntity<Task> deleteApplication(
            @PathVariable String id,
            @PathVariable String userId,
            @RequestParam String ownerId
    ) {
        try {
            Task updatedTask = taskService.deleteApplication(id, userId, ownerId);
            return ResponseEntity.ok(updatedTask);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
}