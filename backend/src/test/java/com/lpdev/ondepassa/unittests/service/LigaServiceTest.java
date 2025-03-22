package com.lpdev.ondepassa.unittests.service;

import com.lpdev.ondepassa.model.Liga;
import com.lpdev.ondepassa.repository.LigaRepository;
import com.lpdev.ondepassa.service.LigaService;
import com.lpdev.ondepassa.unittests.mocks.MockLiga;
import static org.mockito.Mockito.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.junit.jupiter.api.Assertions.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.util.List;
import java.util.Optional;

@DisplayName("Testes - Ligas")
@ExtendWith(MockitoExtension.class)
class LigaServiceTest {

    private MockLiga input;

    @InjectMocks
    private LigaService ligaService;

    @Mock
    private LigaRepository ligaRepository;

    @BeforeEach
    void setUp() {
        input = new MockLiga();
    }

    @Test
    @DisplayName("Deve buscar uma Liga por ID")
    void get() {
        Liga liga = input.mockEntity(1L);
        liga.setId(1L);
        when(ligaRepository.findById(1L)).thenReturn(Optional.of(liga));

        var result = ligaService.get(1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
    }

    @Test
    @DisplayName("Deve listar todas as Ligas")
    void getAll() {
        List<Liga> ligas = input.mockEntityList();
        when(ligaRepository.findAll()).thenReturn(ligas);

        var result = ligaService.getAll();

        assertNotNull(result);
        assertEquals(20, result.size());
    }

    @Test
    @DisplayName("Deve listar todas as Ligas com paginação")
    void getPaginated() {
        PageRequest pageRequest = PageRequest.of(0, 10);
        List<Liga> ligas = input.mockEntityList();
        Page<Liga> page = new PageImpl<>(ligas, pageRequest, ligas.size());
        when(ligaRepository.findAll(pageRequest)).thenReturn(page);

        var result = ligaService.getPaginated(0, 10);

        assertNotNull(result);
        assertEquals(20, result.getTotalElements());
    }

    @Test
    @DisplayName("Deve listar apenas uma Liga por Local de")
    void findDistinctLocais() {
        List<Liga> ligas = input.mockEntityList();
        when(ligaRepository.findDistinctByLocal()).thenReturn(ligas);

        var result = ligaService.findDistinctLocais();

        assertNotNull(result);
        assertEquals(20, result.size());
    }

    @Test
    @DisplayName("Deve salvar uma Liga")
    void post() {
        Liga liga = input.mockEntity(1L);
        when(ligaRepository.existsByNome(liga.getNome())).thenReturn(false);
        when(ligaRepository.save(any(Liga.class))).thenReturn(liga);

        var result = ligaService.post(liga);

        assertNotNull(result);
        assertEquals("League Name Test", result.getNome());
    }

    @Test
    @DisplayName("Deve editar uma Liga")
    void put() {
        Liga liga = input.mockEntity(1L);
        liga.setId(1L);
        when(ligaRepository.findById(1L)).thenReturn(Optional.of(liga));
        when(ligaRepository.save(any(Liga.class))).thenReturn(liga);

        var result = ligaService.put(liga, 1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
    }

    @Test
    @DisplayName("Deve deletar uma Liga")
    void delete() {
        when(ligaRepository.existsById(1L)).thenReturn(true);
        doNothing().when(ligaRepository).deleteById(1L);

        assertDoesNotThrow(() -> ligaService.delete(1L));
        verify(ligaRepository, times(1)).deleteById(1L);
    }
}
