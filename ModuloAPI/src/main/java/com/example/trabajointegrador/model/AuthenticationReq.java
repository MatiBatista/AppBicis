package com.example.trabajointegrador.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

@Data
@AllArgsConstructor
public class AuthenticationReq implements Serializable {

    private static final long serialVersionUID = 1L;

    private String usuario;

    private String clave;

}
