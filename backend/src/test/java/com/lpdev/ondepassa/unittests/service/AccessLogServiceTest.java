package com.lpdev.ondepassa.unittests.service;

import com.lpdev.ondepassa.model.AccessLog;
import com.lpdev.ondepassa.repository.AccessLogRepository;
import com.lpdev.ondepassa.service.AccessLogService;
import com.lpdev.ondepassa.unittests.mocks.MockAccessLog;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@DisplayName("Testes - AccessLogs")
@ExtendWith(MockitoExtension.class)
class AccessLogServiceTest {

    private MockAccessLog input;

    @InjectMocks
    private AccessLogService accessLogService;

    @Mock
    private AccessLogRepository accessLogRepository;

    @BeforeEach
    void setUp() {
        input = new MockAccessLog();
    }

    @Test
    @DisplayName("Deve registrar um Log")
    void logAccess() {

        AccessLog accessLog = input.mockEntity(1L);
        when(accessLogRepository.save(any(AccessLog.class))).thenReturn(accessLog);

        accessLogService.logAccess("/testeRoute");

        verify(accessLogRepository, times(1)).save(any(AccessLog.class));

        ArgumentCaptor<AccessLog> captor = ArgumentCaptor.forClass(AccessLog.class);
        verify(accessLogRepository).save(captor.capture());

        AccessLog savedAccessLog = captor.getValue();
        assertNotNull(savedAccessLog);
        assertEquals("/testeRoute", savedAccessLog.getRoute());
        assertNotNull(savedAccessLog.getAccessTime());
        assertEquals("AnyUser", savedAccessLog.getUsername());
    }

    @Test
    @DisplayName("Deve contar todos os Logs para o dia de hoje")
    void countEventosForToday() {
        when(accessLogRepository.countLogsByData(any(Date.class), any(Date.class))).thenReturn(10L);

        long result = accessLogService.countEventosForToday();

        assertEquals(10L, result);
        verify(accessLogRepository, times(1)).countLogsByData(any(Date.class), any(Date.class));
    }

    @Test
    @DisplayName("Deve contar todos os Logs no sistema")
    void countAllEventos() {

        when(accessLogRepository.countAllLogs()).thenReturn(100L);

        long result = accessLogService.countAllEventos();

        assertEquals(100L, result);
        verify(accessLogRepository, times(1)).countAllLogs();
    }
}