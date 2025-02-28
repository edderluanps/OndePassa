package com.lpdev.ondepassa.service;

import com.lpdev.ondepassa.model.Liga;
import com.lpdev.ondepassa.repository.LigaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class LigaService {

    @Autowired
    private LigaRepository ligaRepository;

    public Liga get(Long id){
        return ligaRepository.findById(id).orElseThrow(()-> new ResponseStatusException(HttpStatusCode.valueOf(404), "Não foi encontrado"));
    }

    public List<Liga> get(){
        return ligaRepository.findAll();
    }

    public Liga post(Liga liga) {
        return ligaRepository.save(liga);
    }
}
