package com.example.trabajointegrador.controllers;

import com.example.trabajointegrador.model.AuthenticationReq;
import com.example.trabajointegrador.model.TokenInfo;
import com.example.trabajointegrador.service.JwtUtilService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import org.slf4j.Logger;

@RestController
public class AuthController {
    @Autowired
    UserDetailsService usuarioDetailsService;
    @Autowired
    JwtUtilService jwtUtilService;
    @Autowired
    AuthenticationProvider authenticationProvider;

    @PostMapping("/public/authenticate")
    public ResponseEntity<TokenInfo> authenticate(@RequestBody AuthenticationReq authenticationReq) {

        authenticationProvider.authenticate(
                new UsernamePasswordAuthenticationToken(authenticationReq.getUsuario(),
                        authenticationReq.getClave()));

        final UserDetails userDetails = usuarioDetailsService.loadUserByUsername(
                authenticationReq.getUsuario());

        final String jwt = jwtUtilService.generateToken(userDetails);
        return ResponseEntity.ok(new TokenInfo(jwt));
    }
}
