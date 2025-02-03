package com.example.springboot_backend.repository;

import com.example.springboot_backend.model.user;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository <user, Long> {

    Optional<user> findByUsernameAndPassword(String username, String password);

}
