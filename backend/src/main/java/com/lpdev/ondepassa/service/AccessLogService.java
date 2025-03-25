package com.lpdev.ondepassa.service;

import com.lpdev.ondepassa.model.AccessLog;
import com.lpdev.ondepassa.repository.AccessLogRepository;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;

@Service
public class AccessLogService {

    private final AccessLogRepository accessLogRepository;

    public AccessLogService(AccessLogRepository accessLogRepository) {
        this.accessLogRepository = accessLogRepository;
    }

    public void logAccess(String route) {
        AccessLog accessLog = new AccessLog("AnyUser", route, new Date());
        accessLogRepository.save(accessLog);
    }

    public long countEventosForToday() {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());

        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        Date startOfDay = calendar.getTime();

        calendar.set(Calendar.HOUR_OF_DAY, 23);
        calendar.set(Calendar.MINUTE, 59);
        calendar.set(Calendar.SECOND, 59);
        Date endOfDay = calendar.getTime();

        return accessLogRepository.countLogsByData(startOfDay, endOfDay);
    }

    public long countAllEventos() {
        return accessLogRepository.countAllLogs();
    }
}