package com.example.trabajointegrador.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "soportBiclycle")
@Getter @Setter
public class SoportBiclycle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idSoportBiclycle",nullable = false)
    private long idSoportBiclycle;

    @Column(name = "name")
    private String name;

    @Column(name = "habilitado")
    private boolean habilitado;
}