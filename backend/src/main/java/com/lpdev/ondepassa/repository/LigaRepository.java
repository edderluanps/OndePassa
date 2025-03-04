package com.lpdev.ondepassa.repository;

import com.lpdev.ondepassa.model.Liga;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LigaRepository extends JpaRepository<Liga, Long> {

    @Query("SELECT DISTINCT l.local FROM Liga l")
    List<String> findDistinctLocais();

}
