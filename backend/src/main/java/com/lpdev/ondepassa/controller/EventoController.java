package com.lpdev.ondepassa.controller;

import com.lpdev.ondepassa.model.Evento;
import com.lpdev.ondepassa.service.EventoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class EventoController {

    @Autowired
    private EventoService eventoService;

    @GetMapping("/{id}")
    public Evento get(@PathVariable Long id){
        return eventoService.get(id);
    }

    @GetMapping
    public List<Evento> get(){
        return eventoService.get();
    }

    @PostMapping
    public Evento post(@Validated @RequestBody Evento evento){
        return eventoService.post(evento);
    }

    @PutMapping
    public void put(@PathVariable Long id, @RequestBody Evento evento){
        eventoService.put(evento, id);
    }

    @DeleteMapping
    public void delete(@PathVariable Long id){
        eventoService.delete(id);
    }

}
