package com.lpdev.ondepassa.service;

import com.lpdev.ondepassa.model.Transmissao;
import com.lpdev.ondepassa.repository.TransmissaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class TransmissaoService {

    @Autowired
    private TransmissaoRepository transmissaoRepository;

    public Transmissao get(Long id){
        return transmissaoRepository.findById(id).orElseThrow(()-> new ResponseStatusException(HttpStatusCode.valueOf(404), "Não foi encontrado"));
    }

    public List<Transmissao> get(){
        return transmissaoRepository.findAll();
    }

    public Page<Transmissao> getPaginated(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return transmissaoRepository.findAll(pageable);
    }

    public Transmissao post(Transmissao transmissao) {
        return transmissaoRepository.save(transmissao);
    }
}
