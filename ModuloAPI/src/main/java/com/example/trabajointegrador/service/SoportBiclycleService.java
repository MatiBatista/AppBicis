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

    public boolean getSoporteHabilitado(String nombreSoporte) {
        return soportRepository.findSoportBiclycleByName(nombreSoporte).isHabilitado();
    }

    public void habilitar(String nombreSoporte) {
        SoportBiclycle soportBiclycle = soportRepository.findSoportBiclycleByName(nombreSoporte);
        if (soportBiclycle.isHabilitado() == true) {
            soportBiclycle.setHabilitado(false);
        }else if (soportBiclycle.isHabilitado() == false){
            soportBiclycle.setHabilitado(true);
        }
        soportRepository.save(soportBiclycle);
    }
}
