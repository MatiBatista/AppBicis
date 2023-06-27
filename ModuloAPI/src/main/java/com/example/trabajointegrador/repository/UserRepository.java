package com.example.trabajointegrador.repository;

import com.example.trabajointegrador.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface UserRepository extends JpaRepository<User,Long> {

    User findUserByIdUser(long IdUser);
    User findUserByUsername(String username);



}
