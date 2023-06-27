package com.example.trabajointegrador.config;

import com.example.trabajointegrador.entities.Role;
import com.example.trabajointegrador.entities.User;
import com.example.trabajointegrador.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

    @Autowired
    IUserService userService;
    @Autowired
    PasswordEncoder passwordEncoder;

    public Authentication authenticate(Authentication authentication) throws AuthenticationException {

        User user = userService.findUserByUsername(authentication.getName());


        if (user!=null) {
            if (passwordEncoder.matches(authentication.getCredentials().toString(), user.getPassword())) {

                List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
                grantedAuthorities.add(new SimpleGrantedAuthority(user.getRole().getName()));

                return new UsernamePasswordAuthenticationToken(authentication.getPrincipal(),null, grantedAuthorities);
            } else {
                throw new BadCredentialsException("Wrong Password");
            }
        } else {
            throw new BadCredentialsException("Wrong UserName");
        }
    }

    public boolean supports(Class<?> authentication) {
        return false;
    }

}