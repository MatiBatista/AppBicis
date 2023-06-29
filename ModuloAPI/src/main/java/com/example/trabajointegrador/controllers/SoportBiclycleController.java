package com.example.trabajointegrador.controllers;


import com.example.trabajointegrador.entities.SoportBiclycle;
import com.example.trabajointegrador.service.ISoportBiclycleService;
import jakarta.persistence.GeneratedValue;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping("/user/soport/{nombreSoporte}")
    public boolean getSoporteHabilitado(@PathVariable String nombreSoporte){
        return soportService.getSoporteHabilitado(nombreSoporte);
    }
}
