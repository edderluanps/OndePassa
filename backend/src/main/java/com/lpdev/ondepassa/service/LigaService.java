package com.lpdev.ondepassa.service;

import com.lpdev.ondepassa.model.Liga;
import com.lpdev.ondepassa.repository.LigaRepository;
import com.lpdev.ondepassa.service.exceptions.DataIntegrityException;
import com.lpdev.ondepassa.service.exceptions.ObjectNotFoundException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LigaService {

    private final LigaRepository ligaRepository;

    public LigaService(LigaRepository ligaRepository) {
        this.ligaRepository = ligaRepository;
    }

    public Liga get(Long id){
        return ligaRepository.findById(id).orElseThrow(
                ()-> new ObjectNotFoundException("Liga não encontrada para o ID: " + id));
    }

    public List<Liga> getAll(){
        return ligaRepository.findAll();
    }

    public Page<Liga> getPaginated(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ligaRepository.findAll(pageable);
    }

    public List<Liga> findDistinctLocais() {
        return ligaRepository.findDistinctByLocal();
    }

    public Liga post(Liga liga) {
        boolean exists = ligaRepository.existsByNome(liga.getNome());
        if (exists) {
            throw new DataIntegrityException("Já existe uma liga com este nome.");
        }
        return ligaRepository.save(liga);
    }

    public Liga put(Liga liga, Long id) {
        var ligaExistente = get(id);
        if (ligaExistente != null) {
            liga.setId(id);
            return ligaRepository.save(liga);
        }else{
            throw new ObjectNotFoundException("Liga não encontrada para o ID: " + id);
        }
    }

    public void delete(Long id) {
        if (!ligaRepository.existsById(id)) {
            throw new ObjectNotFoundException("Liga não encontrada para o ID: " + id);
        }
        try {
            ligaRepository.deleteById(id);
        } catch (DataIntegrityViolationException ex) {
            throw new DataIntegrityException("Não foi possível deletar a Liga com ID " + id + ": Liga Ativa.");
        }
    }
}
