package com.example.trabajointegrador.controllers;


import com.example.trabajointegrador.entities.SoportBiclycle;
import com.example.trabajointegrador.service.ISoportBiclycleService;
import jakarta.persistence.GeneratedValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class SoportBiclycleController {

    @Autowired
    ISoportBiclycleService soportService;

    @PostMapping("/admin/soport")
    public void addSoport(@RequestBody SoportBiclycle soportBiclycle){
        soportService.addSoport(soportBiclycle);
    }

    @DeleteMapping("/admin/soport")
    public void delete(@RequestBody SoportBiclycle soportBiclycle){
        soportService.delete(soportBiclycle);
    }

    @GetMapping("/public/soport/{nombreSoporte}")
    public ResponseEntity<?> getSoporteHabilitado(@PathVariable String nombreSoporte) {
        boolean soporteHabilitado = soportService.getSoporteHabilitado(nombreSoporte);

        if (soporteHabilitado) {
            Boolean recurso = true;

            return ResponseEntity.ok(recurso);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    @PutMapping("/user/suport/{nombreSoporte}")
    public void habilitarSoporte(@PathVariable String nombreSoporte){
        soportService.habilitar(nombreSoporte);
    }
}
