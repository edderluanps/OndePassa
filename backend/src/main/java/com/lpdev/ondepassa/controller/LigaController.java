package com.lpdev.ondepassa.controller;

import com.lpdev.ondepassa.model.Liga;
import com.lpdev.ondepassa.service.LigaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/liga")
public class LigaController {

    @Autowired
    private LigaService ligaService;

    @GetMapping("/{id}")
    public ResponseEntity<Liga> get(@PathVariable Long id){
        var response = ligaService.get(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<Liga>> get(){
        var response = ligaService.get();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/paginated")
    public ResponseEntity<Page<Liga>> getPaginated(@RequestParam(defaultValue = "0") int page,
                                                     @RequestParam(defaultValue = "10") int size) {
        var response = ligaService.getPaginated(page, size);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/distinct-locais")
    public List<Liga> getDistinctLocais() {
        return ligaService.findDistinctLocais();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<Liga> post(@Validated @RequestBody Liga liga) {
        var response = ligaService.post(liga);
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Void> put(@PathVariable Long id, @RequestBody Liga liga){
        ligaService.put(liga, id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        ligaService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
