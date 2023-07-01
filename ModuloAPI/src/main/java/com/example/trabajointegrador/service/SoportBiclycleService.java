package com.example.trabajointegrador.service;


import com.example.trabajointegrador.dto.SoportDto;
import com.example.trabajointegrador.entities.SoportBiclycle;
import com.example.trabajointegrador.repository.SoportBiclycleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SoportBiclycleService implements ISoportBiclycleService {
    @Autowired
    SoportBiclycleRepository soportRepository;

    public void addSoport() {
        List<SoportBiclycle> soportBiclycles  = soportRepository.findAll();
        SoportBiclycle soportBiclycle = new SoportBiclycle();

        int num = soportBiclycles.size()+1;

        soportBiclycle.setName("SOPORTE"+num);
        soportBiclycle.setHabilitado(true);
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

    public List<SoportDto> getSoports() {
        List<SoportBiclycle> soportBiclycles = soportRepository.findAll();

        List<SoportDto> soportDtos = new ArrayList<>();

        for (SoportBiclycle s:soportBiclycles) {
            SoportDto soportDto = new SoportDto();

            soportDto.setNombre(s.getName());
            soportDto.setHabilitado(s.isHabilitado());

            soportDtos.add(soportDto);
        }
        return soportDtos;
    }
}
