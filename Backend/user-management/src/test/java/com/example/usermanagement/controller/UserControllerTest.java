package com.example.usermanagement.controller;

import com.example.usermanagement.model.User;
import com.example.usermanagement.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.doNothing;


class UserControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void registerUser_ShouldReturnSuccessMessage() {
        User user = new User();
        user.setEmail("test@example.com");
        user.setPassword("password");

        doNothing().when(userService).registerUser(user);

        ResponseEntity<String> response = userController.registerUser(user);

        assertNotNull(response);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Utilisateur enregistré avec succès !", response.getBody());
    }
}
