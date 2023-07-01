package com.example.trabajointegrador.service;

import com.example.trabajointegrador.dto.SoportDto;
import com.example.trabajointegrador.entities.SoportBiclycle;

import java.util.List;

public interface ISoportBiclycleService {
    void addSoport();

    void delete(SoportBiclycle soportBiclycle);

    boolean getSoporteHabilitado(String nombreSoporte);

    void habilitar(String nombreSoporte);

    List<SoportDto> getSoports();
}
