package com.lpdev.ondepassa.repository;

import com.lpdev.ondepassa.model.Evento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventoRepository extends JpaRepository<Evento, Long> {
}
