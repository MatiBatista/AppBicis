package com.example.trabajointegrador.repository;

import com.example.trabajointegrador.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Integer> {

    Role findRoleByName(String nombreRol);
}