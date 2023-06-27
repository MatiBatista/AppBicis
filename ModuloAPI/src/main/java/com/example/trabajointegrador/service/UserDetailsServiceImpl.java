package com.example.trabajointegrador.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    IUserService userService;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var usuario = getById(username);

        if (usuario == null) {
            throw new UsernameNotFoundException(username);
        }
        return User
                .withUsername(username)
                .password(usuario.getPassword())
                .roles(usuario.getRole().getName())
                .build();
    }

    public com.example.trabajointegrador.entities.User getById(String username) {

        com.example.trabajointegrador.entities.User user = userService.findUserByUsername(username);

        if(user==null) return null;

        return user;
    }
}
