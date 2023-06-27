package com.example.trabajointegrador.service;

import com.example.trabajointegrador.entities.User;
import com.example.trabajointegrador.repository.UserRepository;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements IUserService{
    @Autowired
    UserRepository userRepository;

    public void addUser(User user) {
        userRepository.save(user);
    }

    public User findUserByUsername(String username){
        return userRepository.findUserByUsername(username);
    }

    public List<User> findAllUsers(){
        return userRepository.findAll();
    }

    public User findUserById(long idUser) {
        return userRepository.findUserByIdUser(idUser);
    }

    public void delete(User user) {
        userRepository.delete(user);
    }

}
