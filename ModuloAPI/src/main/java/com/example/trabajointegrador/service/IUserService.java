package com.example.trabajointegrador.service;

import com.example.trabajointegrador.entities.User;

import java.util.List;

public interface IUserService {

    void addUser(User user);

    User findUserByUsername(String username);

    List<User> findAllUsers();

    void delete(User user);

    void darRolAdmin(String nombreUSuario);
}
