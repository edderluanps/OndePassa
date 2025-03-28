package com.lpdev.ondepassa.repository;

import com.lpdev.ondepassa.model.Evento;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface EventoRepository extends JpaRepository<Evento, Long> {

    @Transactional(readOnly = true)
    @Query("SELECT e FROM Evento e WHERE e.liga.local = :localParam")
    List<Evento> findByLocal(@Param("localParam") String local);

    @Query("SELECT e FROM Evento e WHERE e.dataEvento >= :startOfDay AND e.dataEvento <= :endOfDay")
    List<Evento> findEventosByData(Date startOfDay, Date endOfDay);

    @Query("SELECT COUNT(e) FROM Evento e WHERE e.dataEvento >= :startOfDay AND e.dataEvento <= :endOfDay")
    long countEventosByData(Date startOfDay, Date endOfDay);

    @Query("SELECT COUNT(e) FROM Evento e")
    long countAllEventos();

}
