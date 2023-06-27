package com.example.trabajointegrador.service;


import com.example.trabajointegrador.entities.SoportBiclycle;
import com.example.trabajointegrador.repository.SoportBiclycleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SoportBiclycleService implements ISoportBiclycleService {
    @Autowired
    SoportBiclycleRepository soportRepository;

    public void addSoport(SoportBiclycle soportBiclycle) {
        soportRepository.save(soportBiclycle);
    }

    public void delete(SoportBiclycle soportBiclycle) {
        soportRepository.delete(soportBiclycle);
    }
}