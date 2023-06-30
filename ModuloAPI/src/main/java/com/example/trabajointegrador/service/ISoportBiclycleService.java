package com.example.trabajointegrador.service;

import com.example.trabajointegrador.entities.SoportBiclycle;

public interface ISoportBiclycleService {
    void addSoport(SoportBiclycle soportBiclycle);

    void delete(SoportBiclycle soportBiclycle);

    boolean getSoporteHabilitado(String nombreSoporte);

    void habilitar(String nombreSoporte);
}
