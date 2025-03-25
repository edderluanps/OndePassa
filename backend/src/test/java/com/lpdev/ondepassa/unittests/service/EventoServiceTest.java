package com.lpdev.ondepassa.unittests.service;

import com.lpdev.ondepassa.model.Evento;
import com.lpdev.ondepassa.model.dto.EventoContagemResponseDTO;
import com.lpdev.ondepassa.repository.EventoRepository;
import com.lpdev.ondepassa.service.EventoService;
import com.lpdev.ondepassa.service.exceptions.ObjectNotFoundException;
import com.lpdev.ondepassa.unittests.mocks.MockEvento;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@DisplayName("Testes - Eventos")
@ExtendWith(MockitoExtension.class)
class EventoServiceTest {

    private MockEvento input;

    @InjectMocks
    private EventoService eventoService;

    @Mock
    private EventoRepository eventoRepository;

    @BeforeEach
    void setUp() {
        input = new MockEvento();
    }

    @Test
    @DisplayName("Deve listar todos os Eventos")
    void getAll() {
        List<Evento> eventos = input.mockEntityList();
        when(eventoRepository.findAll()).thenReturn(eventos);

        var result = eventoService.getAll();

        assertNotNull(result);
        assertEquals(20, result.size());
    }

    @Test
    @DisplayName("Deve buscar um Evento por ID")
    void getById() {
        Evento evento = input.mockEntity(1L);
        when(eventoRepository.findById(1L)).thenReturn(Optional.of(evento));

        var result = eventoService.get(1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
    }

    @Test
    @DisplayName("Deve buscar um Evento por ID - Quando um Evento não existir para o ID informado")
    void getById_NotFound() {
        when(eventoRepository.findById(100L)).thenReturn(Optional.empty());

        assertThrows(ObjectNotFoundException.class, () -> eventoService.get(100L));
    }

    @Test
    @DisplayName("Deve buscar um Evento por Local")
    void getByLocal() {
        List<Evento> eventos = input.mockEntityList();
        when(eventoRepository.findByLocal("Test Local"))
                .thenReturn(eventos);

        var result = eventoService.get("Test Local");

        assertNotNull(result);
        assertEquals(20, result.size());
    }

    @Test
    @DisplayName("Deve listar todos os Eventos com paginação")
    void getPaginated() {
        PageRequest pageRequest = PageRequest.of(0, 10);
        List<Evento> eventos = input.mockEntityList();
        Page<Evento> page = new PageImpl<>(eventos, pageRequest, eventos.size());
        when(eventoRepository.findAll(pageRequest)).thenReturn(page);

        var result = eventoService.getPaginated(0, 10);

        assertNotNull(result);
        assertEquals(20, result.getTotalElements());
    }

    @Test
    @DisplayName("Deve salvar um Evento")
    void post() {
        Evento evento = input.mockEntity(1L);
        when(eventoRepository.save(any(Evento.class))).thenReturn(evento);

        var result = eventoService.post(evento);

        assertNotNull(result);
        assertEquals("Team A Test", result.getTimeA());
    }

    @Test
    @DisplayName("Deve retornar os eventos com a contagem correta para o dia de hoje")
    void getEventosForToday() {
        List<Evento> eventos = input.mockEntityList();
        when(eventoRepository.findEventosByData(any(Date.class), any(Date.class))).thenReturn(eventos);

        var result = eventoService.getEventosForToday();

        assertNotNull(result);
        assertEquals(20, result.size());
        verify(eventoRepository, times(1)).findEventosByData(any(Date.class), any(Date.class));
    }

    @Test
    @DisplayName("Deve contar os eventos conforme o dia de hoje")
    void countEventosForToday() {
        when(eventoRepository.countEventosByData(any(Date.class), any(Date.class))).thenReturn(20L);

        long result = eventoService.countEventosForToday();

        assertEquals(20L, result);
        verify(eventoRepository, times(1)).countEventosByData(any(Date.class), any(Date.class));
    }

    @Test
    @DisplayName("Deve retornar a contagem no formato DTO para o dia de hoje")
    void countEventosForToday_DTO() {
        when(eventoRepository.countEventosByData(any(Date.class), any(Date.class))).thenReturn(20L);

        EventoContagemResponseDTO result = new EventoContagemResponseDTO(eventoService.countEventosForToday());

        assertNotNull(result);
        assertEquals(20L, result.getContagem());
    }

    @Test
    @DisplayName("Deve contar todos os Eventos")
    void countAllEventos() {
        when(eventoRepository.countAllEventos()).thenReturn(100L);

        long result = eventoService.countAllEventos();

        assertEquals(100L, result);
        verify(eventoRepository, times(1)).countAllEventos();
    }

    @Test
    @DisplayName("Deve editar um Evento")
    void put() {
        Evento evento = input.mockEntity(1L);
        evento.setId(1L);
        when(eventoRepository.findById(1L)).thenReturn(Optional.of(evento));
        when(eventoRepository.save(any(Evento.class))).thenReturn(evento);

        var result = eventoService.put(evento, 1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
    }

    @Test
    @DisplayName("Deve atualizar um Evento - Quando um Evento não existir para o ID informado")
    void put_NotFound() {
        Evento evento = input.mockEntity(100L);
        when(eventoRepository.findById(100L)).thenReturn(Optional.empty());

        assertThrows(ObjectNotFoundException.class, () -> eventoService.put(evento, 100L));
    }

    @Test
    @DisplayName("Deve deletar um Evento")
    void delete() {
        when(eventoRepository.existsById(1L)).thenReturn(true);
        doNothing().when(eventoRepository).deleteById(1L);

        assertDoesNotThrow(() -> eventoService.delete(1L));
        verify(eventoRepository, times(1)).deleteById(1L);
    }

    @Test
    @DisplayName("Deve deletar um Evento - Quando um Evento não existir para o ID informado")
    void delete_NotFound() {
        when(eventoRepository.existsById(100L)).thenReturn(false);

        assertThrows(ObjectNotFoundException.class, () -> eventoService.delete(100L));
    }
}