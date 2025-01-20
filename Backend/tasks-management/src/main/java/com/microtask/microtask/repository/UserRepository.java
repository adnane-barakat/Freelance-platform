package com.microtask.microtask.repository;

import com.microtask.microtask.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
}