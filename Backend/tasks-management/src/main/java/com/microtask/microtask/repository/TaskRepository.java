package com.microtask.microtask.repository;

import com.microtask.microtask.model.Task;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TaskRepository extends MongoRepository<Task, String> {
}