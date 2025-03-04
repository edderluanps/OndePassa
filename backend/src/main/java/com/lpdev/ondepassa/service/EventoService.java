package com.lpdev.ondepassa.service;

import com.lpdev.ondepassa.model.Evento;
import com.lpdev.ondepassa.repository.EventoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
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
        return eventoRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatusCode.valueOf(404), "Não foi encontrado"));
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
            throw new ResponseStatusException(HttpStatusCode.valueOf(404), "Não foi encontrado");
        }
    }

    public void delete(Long id){
        var eventoToEdit = get(id);
        if (!(eventoToEdit == null)){
            eventoRepository.deleteById(id);
        }else{
            throw new ResponseStatusException(HttpStatusCode.valueOf(404), "Não foi encontrado");
        }
    }

}
