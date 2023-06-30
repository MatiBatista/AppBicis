package com.example.trabajointegrador.controllers;


import com.example.trabajointegrador.entities.SoportBiclycle;
import com.example.trabajointegrador.repository.SoportBiclycleRepository;
import com.example.trabajointegrador.service.ISoportBiclycleService;
import jakarta.persistence.GeneratedValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class SoportBiclycleController {

    @Autowired
    ISoportBiclycleService soportService;

    @Autowired
    SoportBiclycleRepository soportBiclycleRepository;

    @PostMapping("/admin/soport")
    public void addSoport(@RequestBody SoportBiclycle soportBiclycle){
        soportService.addSoport(soportBiclycle);
    }

    @DeleteMapping("/admin/soport")
    public void delete(@RequestBody SoportBiclycle soportBiclycle){
        soportService.delete(soportBiclycle);
    }

    @GetMapping("/user/soport/{nombreSoporte}")
    public ResponseEntity<?> getSoporteHabilitado(@PathVariable String nombreSoporte) {

        SoportBiclycle soportBiclycle= soportBiclycleRepository.findSoportBiclycleByName(nombreSoporte);


        if (soportBiclycle!=null) {
            boolean soporteHabilitado = soportService.getSoporteHabilitado(nombreSoporte);

            return ResponseEntity.ok(soporteHabilitado);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    @PutMapping("/user/soport/{nombreSoporte}")
    public void habilitarSoporte(@PathVariable String nombreSoporte){
        soportService.habilitar(nombreSoporte);
    }
}
