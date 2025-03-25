package com.lpdev.ondepassa.repository;

import com.lpdev.ondepassa.model.AccessLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;

public interface AccessLogRepository extends JpaRepository<AccessLog, Long> {

    @Query("SELECT COUNT(a) FROM AccessLog a WHERE a.accessTime >= :startOfDay AND a.accessTime <= :endOfDay")
    long countLogsByData(Date startOfDay, Date endOfDay);

    @Query("SELECT COUNT(a) FROM AccessLog a")
    long countAllLogs();

}
