package com.lpdev.ondepassa.controller;

import com.lpdev.ondepassa.model.Transmissao;
import com.lpdev.ondepassa.service.TransmissaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transmissao")
public class TransmissaoController {

    @Autowired
    private TransmissaoService transmissaoService;

    @GetMapping("/{id}")
    public Transmissao get(@PathVariable Long id){
        return transmissaoService.get(id);
    }

    @GetMapping
    public List<Transmissao> get(){
        return transmissaoService.get();
    }

    @PostMapping
    public Transmissao post(@Validated @RequestBody Transmissao transmissao) {
        return transmissaoService.post(transmissao);
    }
}
