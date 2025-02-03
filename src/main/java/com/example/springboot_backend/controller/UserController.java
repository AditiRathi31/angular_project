package com.example.springboot_backend.controller;

import com.example.springboot_backend.model.user;
import com.example.springboot_backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<user> loginUser(@RequestBody user users){
        String username = users.getUsername();
        String pass = users.getPassword();
        user u= userService.loginUser(username, pass);

        return ResponseEntity.ok(u);
    }

    @GetMapping("/users")
    public List<user> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/users")
    public user createUser(@RequestBody user users) {
        return userService.createUser(users);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<user> updateUser(@PathVariable Long id, @RequestBody user userDetails) {
        user updatedUser = userService.updateUser(id, userDetails);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
