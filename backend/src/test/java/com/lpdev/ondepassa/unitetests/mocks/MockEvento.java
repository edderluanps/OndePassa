package com.lpdev.ondepassa.unitetests.mocks;

import com.lpdev.ondepassa.model.Evento;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class MockEvento {

    private final MockLiga mockLiga = new MockLiga();

    public Evento mockEntity() {
        return mockEntity(1L);
    }

    public List<Evento> mockEntityList() {
        List<Evento> eventos = new ArrayList<>();
        for (long i = 0; i < 20; i++) {
            eventos.add(mockEntity(i));
        }
        return eventos;
    }

    public Evento mockEntity(Long id) {
        Evento evento = new Evento();
        evento.setId(id);
        evento.setTimeA("Team A Test");
        evento.setTimeB("Team B Test");
        evento.setLiga(mockLiga.mockEntity(id));
        evento.setTipoEvento("Type Event Test");
        evento.setDataEvento(new Date());
        return evento;
    }

}
