package com.lpdev.ondepassa.controller;

import com.lpdev.ondepassa.model.Usuario;
import com.lpdev.ondepassa.model.dto.UsuarioDTO;
import com.lpdev.ondepassa.model.dto.UsuarioNewDTO;
import com.lpdev.ondepassa.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

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
    public ResponseEntity<List<UsuarioDTO>> get() {
        List<Usuario> usuarios = usuarioService.get();
        List<UsuarioDTO> usuariosDto = usuarios.stream()
                .map(UsuarioDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(usuariosDto);
    }

    @GetMapping("/paginated")
    public ResponseEntity<Page<Usuario>> getPaginated(@RequestParam(defaultValue = "0") int page,
                                                     @RequestParam(defaultValue = "10") int size) {
        var response = usuarioService.getPaginated(page, size);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Usuario> post(@Valid @RequestBody UsuarioNewDTO usuarioNewDTO) {
        Usuario usuario = usuarioService.fromDTO(usuarioNewDTO);
        usuario = usuarioService.post(usuario);
        return ResponseEntity.ok().body(usuario);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> put(@RequestBody Usuario usuario, @PathVariable Long id){
        usuarioService.put(usuario, id);
        return ResponseEntity.noContent().build();
    }

}
