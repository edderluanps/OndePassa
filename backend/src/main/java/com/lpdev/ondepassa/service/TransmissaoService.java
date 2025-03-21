package com.lpdev.ondepassa.service;

import com.lpdev.ondepassa.model.Transmissao;
import com.lpdev.ondepassa.repository.TransmissaoRepository;
import com.lpdev.ondepassa.service.exceptions.DataIntegrityException;
import com.lpdev.ondepassa.service.exceptions.ObjectNotFoundException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransmissaoService {

    private final TransmissaoRepository transmissaoRepository;

    public TransmissaoService(TransmissaoRepository transmissaoRepository) {
        this.transmissaoRepository = transmissaoRepository;
    }

    public Transmissao get(Long id){
        return transmissaoRepository.findById(id).orElseThrow(
                ()-> new ObjectNotFoundException("Transmissao não encontrada para o ID: " + id));
    }

    public List<Transmissao> getAll(){
        return transmissaoRepository.findAll();
    }

    public Page<Transmissao> getPaginated(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return transmissaoRepository.findAll(pageable);
    }

    public Transmissao post(Transmissao transmissao) {
        return transmissaoRepository.save(transmissao);
    }

    public Transmissao put(Transmissao transmissao, Long id){
        var transmissaoExistente = get(id);
        if (transmissaoExistente != null) {
            transmissao.setId(id);
            return transmissaoRepository.save(transmissao);
        }else{
            throw new ObjectNotFoundException("Transmissao não encontrada para o ID: " + id);
        }
    }

    public void delete(Long id){
        if (!transmissaoRepository.existsById(id)) {
            throw new ObjectNotFoundException("Transmissao não encontrada para o ID: " + id);
        }
        try {
            transmissaoRepository.deleteById(id);
        } catch (DataIntegrityViolationException ex) {
            throw new DataIntegrityException("Não foi possível deletar a Transmissao com ID " + id + ": Transmissao Ativa.");
        }
    }
}
