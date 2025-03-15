package com.lpdev.ondepassa.service;

import com.lpdev.ondepassa.model.Liga;
import com.lpdev.ondepassa.repository.LigaRepository;
import com.lpdev.ondepassa.service.exceptions.DataIntegrityException;
import com.lpdev.ondepassa.service.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LigaService {

    @Autowired
    private LigaRepository ligaRepository;

    public Liga get(Long id){
        return ligaRepository.findById(id).orElseThrow(
                ()-> new ObjectNotFoundException("Não foi encontrado"));
    }

    public List<Liga> get(){
        return ligaRepository.findAll();
    }

    public Page<Liga> getPaginated(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ligaRepository.findAll(pageable);
    }

    public List<Liga> findDistinctLocais() {
        List<String> distinctLocais = ligaRepository.findDistinctLocais();
        List<Liga> ligaList = new ArrayList<>();

        for (String local : distinctLocais) {
            Liga liga = ligaRepository.findAll().stream()
                    .filter(l -> l.getLocal().equals(local))
                    .findFirst()
                    .orElse(null);
            if (liga != null) {
                ligaList.add(liga);
            }
        }

        return ligaList;
    }

    public Liga post(Liga liga) {
        return ligaRepository.save(liga);
    }

    public void put(Liga liga, Long id){
        var eventoToEdit = get(id);
        if (eventoToEdit != null) {
            liga.setId(id);
            ligaRepository.save(liga);
        }else{
            throw new ObjectNotFoundException("Não foi encontrado");
        }
    }

    public void delete(Long id){
        get(id);
        try{
            ligaRepository.deleteById(id);
        }catch(DataIntegrityViolationException ex){
            throw new DataIntegrityException("Não foi possivel deletar: Liga Ativa.");
        }
    }
}
