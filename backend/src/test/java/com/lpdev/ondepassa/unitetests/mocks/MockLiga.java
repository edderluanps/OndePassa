package com.lpdev.ondepassa.unitetests.mocks;

import com.lpdev.ondepassa.model.Liga;

import java.util.ArrayList;
import java.util.List;

public class MockLiga {

    public Liga mockEntity() {
        return mockEntity(1L);
    }

    public List<Liga> mockEntityList() {
        List<Liga> ligas = new ArrayList<>();
        for (long i = 0; i < 20; i++) {
            ligas.add(mockEntity(i));
        }
        return ligas;
    }

    public Liga mockEntity(Long id) {
        Liga liga = new Liga();
        liga.setId(id);
        liga.setNome("League Name Test");
        liga.setLocal("League's Place Name Test");
        return liga;
    }


}
