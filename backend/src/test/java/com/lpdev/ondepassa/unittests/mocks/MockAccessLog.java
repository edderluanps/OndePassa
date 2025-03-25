package com.lpdev.ondepassa.unittests.mocks;

import com.lpdev.ondepassa.model.AccessLog;

import java.util.Date;

public class MockAccessLog {

    public AccessLog mockEntity() {
        return mockEntity(1L);
    }

    public AccessLog mockEntity(Long id) {

        AccessLog accessLog = new AccessLog();

        accessLog.setId(id);
        accessLog.setRoute("/testeRoute");
        accessLog.setAccessTime(new Date());
        accessLog.setUsername("AnyUser");
        return accessLog;
    }
}
