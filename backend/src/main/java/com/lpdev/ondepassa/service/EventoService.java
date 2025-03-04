package com.lpdev.ondepassa.service;

import com.lpdev.ondepassa.model.Evento;
import com.lpdev.ondepassa.repository.EventoRepository;
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
public class EventoService {

    @Autowired
    private EventoRepository eventoRepository;

    public List<Evento> get() {
        return eventoRepository.findAll();
    }

    public List<Evento> get(String local) {
        return eventoRepository.findByLocal(local);
    }


    public Evento get(Long id) {
        return eventoRepository.findById(id).orElseThrow(
                () -> new ObjectNotFoundException("Não foi encontrado"));
    }

    public Page<Evento> getPaginated(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return eventoRepository.findAll(pageable);
    }

    public Evento post(Evento evento) {
        return eventoRepository.save(evento);
    }

    public void put(Evento evento, Long id){
        var eventoToEdit = get(id);
        if (eventoToEdit != null) {
            evento.setId(id);
            eventoRepository.save(evento);
        }else{
            throw new ObjectNotFoundException("Não foi encontrado");
        }
    }

    public void delete(Long id){
        get(id);
        try{
            eventoRepository.deleteById(id);
        }catch(DataIntegrityViolationException ex){
            throw new DataIntegrityException("Não foi possivel deletar: Evento Ativo.");
        }
    }

}
