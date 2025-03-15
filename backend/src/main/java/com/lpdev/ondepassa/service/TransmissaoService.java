package com.lpdev.ondepassa.service;

import com.lpdev.ondepassa.model.Transmissao;
import com.lpdev.ondepassa.repository.TransmissaoRepository;
import com.lpdev.ondepassa.service.exceptions.DataIntegrityException;
import com.lpdev.ondepassa.service.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransmissaoService {

    @Autowired
    private TransmissaoRepository transmissaoRepository;

    public Transmissao get(Long id){
        return transmissaoRepository.findById(id).orElseThrow(
                ()-> new ObjectNotFoundException("Não foi encontrado"));
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

    public void put(Transmissao transmissao, Long id){
        var eventoToEdit = get(id);
        if (eventoToEdit != null) {
            transmissao.setId(id);
            transmissaoRepository.save(transmissao);
        }else{
            throw new ObjectNotFoundException("Não foi encontrado");
        }
    }

    public void delete(Long id){
        get(id);
        try{
            transmissaoRepository.deleteById(id);
        }catch(DataIntegrityViolationException ex){
            throw new DataIntegrityException("Não foi possivel deletar: Transmissão Ativa.");
        }
    }
}
