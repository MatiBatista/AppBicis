package com.example.trabajointegrador.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter @Setter
@Table(name = "role")
public class Role {

    @Id
    @Column(name = "idRole",nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idRole;

    @Column(name = "name",nullable = false)
    private String name;

    @OneToMany(mappedBy = "role",cascade = CascadeType.ALL)
    private List<User> users;
}
