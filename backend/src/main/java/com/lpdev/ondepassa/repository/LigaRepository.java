package com.lpdev.ondepassa.repository;

import com.lpdev.ondepassa.model.Liga;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LigaRepository extends JpaRepository<Liga, Long> {

    boolean existsByNome(String nome);

    @Query("SELECT l FROM Liga l WHERE l.id IN (SELECT MIN(l2.id) FROM Liga l2 GROUP BY l2.local)")
    List<Liga> findDistinctByLocal();

}
