package com.lpdev.ondepassa.controller;

import com.lpdev.ondepassa.model.Transmissao;
import com.lpdev.ondepassa.service.TransmissaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transmissao")
public class TransmissaoController {

    @Autowired
    private TransmissaoService transmissaoService;

    @GetMapping("/{id}")
    public ResponseEntity<Transmissao> get(@PathVariable Long id){
        var response = transmissaoService.get(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<Transmissao>> get(){
        var response = transmissaoService.get();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/paginated")
    public ResponseEntity<Page<Transmissao>> getPaginated(@RequestParam(defaultValue = "0") int page,
                                                     @RequestParam(defaultValue = "10") int size) {
        var response = transmissaoService.getPaginated(page, size);
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<Transmissao> post(@Validated @RequestBody Transmissao transmissao) {
        var response = transmissaoService.post(transmissao);
        return ResponseEntity.ok(response);
    }
}
