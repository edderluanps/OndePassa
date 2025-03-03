package com.lpdev.ondepassa.controller;

import com.lpdev.ondepassa.model.Usuario;
import com.lpdev.ondepassa.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/{id}")
    public ResponseEntity<Usuario>get(@PathVariable Long id){
        var response = usuarioService.get(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<Usuario>>get(){
        var response = usuarioService.get();
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Usuario> post(@RequestBody Usuario usuario){
        var response = usuarioService.post(usuario);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> put(@RequestBody Usuario usuario, @PathVariable Long id){
        usuarioService.put(usuario, id);
        return ResponseEntity.noContent().build();
    }

}
