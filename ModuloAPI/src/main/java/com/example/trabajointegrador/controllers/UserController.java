package com.example.trabajointegrador.controllers;

import com.example.trabajointegrador.dto.UserDto;
import com.example.trabajointegrador.entities.Role;
import com.example.trabajointegrador.entities.User;
import com.example.trabajointegrador.repository.RoleRepository;
import com.example.trabajointegrador.repository.UserRepository;
import com.example.trabajointegrador.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RestController
public class UserController {
    @Autowired
    IUserService userService;
    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    RoleRepository roleRepository;

    @PostMapping("/public/user")
    public void addUser(@RequestBody User user){

        String hash = passwordEncoder.encode(user.getPassword());

        user.setPassword(hash);

        Role role = roleRepository.findRoleByName("user");
        user.setRole(role);

        userService.addUser(user);
    }

    @GetMapping("/user/{username}")
    public UserDto getUserName(@PathVariable String username){
        User u = userService.findUserByUsername(username);
        return new UserDto(u.getIdUser(),u.getUsername(),u.getName(),u.getLastName(),u.getDni(),u.getEmail(),u.getNumPhone(),u.getRole().getName());
    }

    @GetMapping("/admin/user")
    public List<UserDto> getUsers(){

        List<User> users = userService.findAllUsers();
        List<UserDto> userDtos = new ArrayList<>();

        for (User u: users) {
            UserDto userDto = new UserDto(u.getIdUser(),u.getUsername(),u.getName(),u.getLastName(),u.getDni(),u.getEmail(),u.getNumPhone(),u.getRole().getName());
            userDtos.add(userDto);
        }
        return userDtos;
    }

    @DeleteMapping("/admin/user")
    public void deleteUser(@RequestBody User user){
        userService.delete(user);
    }

    @PutMapping("/admin/user/rol/{nombreUsuario}")
    public void rolAdmin(@PathVariable String nombreUSuario){
        userService.darRolAdmin(nombreUSuario);
    }

}
