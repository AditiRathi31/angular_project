package com.example.springboot_backend.service;

import com.example.springboot_backend.model.user;
import com.example.springboot_backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<user> getAllUsers() {
        return userRepository.findAll();
    }

    public user createUser(user users) {
        return userRepository.save(users);
    }



    public user updateUser(Long id, user userDetails) {
        if (id == null || id == 0) {
            return userRepository.save(userDetails);
        }

        Optional<user> existingUser = userRepository.findById(id);

        if (existingUser.isEmpty()) {
            throw new RuntimeException("User doesn't exist!");
        }

        user u = existingUser.get();
        u.setUsername(userDetails.getUsername());
        u.setPassword(userDetails.getPassword());
        u.setRole(userDetails.getRole());

        return userRepository.save(u);

    }

    public void deleteUser(Long id) {
        user u = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found!"));
        userRepository.delete(u);
    }
}
