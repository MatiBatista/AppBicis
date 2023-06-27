package com.example.trabajointegrador.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
public class UserDto {

    private long idUser;

    private String username;

    private String name;

    private String lastName;

    private int dni;

    private String email;

    private long numPhone;

    private String role;

}
