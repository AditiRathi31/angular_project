package com.example.springboot_backend.repository;

import com.example.springboot_backend.model.user;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository <user, Long> {


}
