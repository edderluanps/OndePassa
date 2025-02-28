package com.lpdev.ondepassa.controller;

import com.lpdev.ondepassa.model.Liga;
import com.lpdev.ondepassa.service.LigaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/liga")
public class LigaController {

    @Autowired
    private LigaService ligaService;

    @GetMapping("/{id}")
    public Liga get(@PathVariable Long id){
        return ligaService.get(id);
    }

    @GetMapping
    public List<Liga> get(){
        return ligaService.get();
    }

    @PostMapping
    public Liga post(@Validated @RequestBody Liga liga) {
        return ligaService.post(liga);
    }
}
