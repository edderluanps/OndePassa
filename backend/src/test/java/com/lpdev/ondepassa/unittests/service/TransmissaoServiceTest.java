package com.lpdev.ondepassa.unittests.service;

import com.lpdev.ondepassa.model.Transmissao;
import com.lpdev.ondepassa.repository.TransmissaoRepository;
import com.lpdev.ondepassa.service.TransmissaoService;
import com.lpdev.ondepassa.unittests.mocks.MockTransmissao;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@DisplayName("Testes - Pacotes")
@ExtendWith(MockitoExtension.class)
class TransmissaoServiceTest {

    private MockTransmissao input;

    @InjectMocks
    private TransmissaoService transmissaoService;

    @Mock
    private TransmissaoRepository transmissaoRepository;

    @BeforeEach
    void setUp() {
        input = new MockTransmissao();
    }

    @Test
    @DisplayName("Deve buscar uma Transmissão por ID")
    void get() {
        Transmissao transmissao = input.mockEntity(1L);
        when(transmissaoRepository.findById(1L)).thenReturn(Optional.of(transmissao));

        var result = transmissaoService.get(1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
    }

    @Test
    @DisplayName("Deve listar todas as Transmissões")
    void getAll() {
        List<Transmissao> transmissoes = input.mockEntityList();
        when(transmissaoRepository.findAll()).thenReturn(transmissoes);

        var result = transmissaoService.getAll();

        assertNotNull(result);
        assertEquals(20, result.size());
    }

    @Test
    @DisplayName("Deve listar todas as Transmissões com paginação")
    void getPaginated() {
        PageRequest pageRequest = PageRequest.of(0, 10);
        List<Transmissao> transmissoes = input.mockEntityList();
        Page<Transmissao> page = new PageImpl<>(transmissoes, pageRequest, transmissoes.size());
        when(transmissaoRepository.findAll(pageRequest)).thenReturn(page);

        var result = transmissaoService.getPaginated(0, 10);

        assertNotNull(result);
        assertEquals(20, result.getTotalElements());
    }

    @Test
    @DisplayName("Deve salvar uma Transmissão")
    void post() {
        Transmissao transmissao = input.mockEntity(1L);
        when(transmissaoRepository.save(any(Transmissao.class))).thenReturn(transmissao);

        var result = transmissaoService.post(transmissao);

        assertNotNull(result);
        assertEquals("Channel Test 1", result.getCanal());
    }

    @Test
    @DisplayName("Deve editar uma Transmissão")
    void put() {
        Transmissao transmissao = input.mockEntity(1L);
        transmissao.setId(1L);
        when(transmissaoRepository.findById(1L)).thenReturn(Optional.of(transmissao));
        when(transmissaoRepository.save(any(Transmissao.class))).thenReturn(transmissao);

        var result = transmissaoService.put(transmissao, 1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
    }

    @Test
    @DisplayName("Deve deletar uma Transmissão")
    void delete() {
        when(transmissaoRepository.existsById(1L)).thenReturn(true);
        doNothing().when(transmissaoRepository).deleteById(1L);

        assertDoesNotThrow(() -> transmissaoService.delete(1L));
        verify(transmissaoRepository, times(1)).deleteById(1L);
    }

}