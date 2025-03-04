package com.lpdev.ondepassa.controller;

import com.lpdev.ondepassa.model.Evento;
import com.lpdev.ondepassa.service.EventoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/evento")
@CrossOrigin("*")
public class EventoController {

    @Autowired
    private EventoService eventoService;

    @GetMapping("/{id}")
    public ResponseEntity<Evento> get(@PathVariable Long id){
        var response = eventoService.get(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<Evento>> get(){
        var response = eventoService.get();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/bylocal")
    public ResponseEntity<List<Evento>> get(@RequestParam String local){
        var response = eventoService.get(local);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/paginated")
    public ResponseEntity<Page<Evento>> getPaginated(@RequestParam(defaultValue = "0") int page,
                                                     @RequestParam(defaultValue = "10") int size) {
        var response = eventoService.getPaginated(page, size);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Evento> post(@Validated @RequestBody Evento evento){
        var response = eventoService.post(evento);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> put(@PathVariable Long id, @RequestBody Evento evento){
        eventoService.put(evento, id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        eventoService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
