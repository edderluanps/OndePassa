package com.lpdev.ondepassa.unitetests.mocks;

import com.lpdev.ondepassa.model.Transmissao;

import java.util.ArrayList;
import java.util.List;

public class MockTransmissao {

    private final MockEvento mockEvento = new MockEvento();

    public Transmissao mockEntity() {
        return mockEntity(1L);
    }

    public List<Transmissao> mockEntityList() {
        List<Transmissao> transmissoes = new ArrayList<>();
        for (long i = 0; i < 20; i++) {
            transmissoes.add(mockEntity(i));
        }
        return transmissoes;
    }

    public Transmissao mockEntity(Long id) {
        Transmissao transmissao = new Transmissao();
        transmissao.setId(id);
        transmissao.setTransmissao(true);
        transmissao.setCanal("Channel Test " + id);
        transmissao.setCanalImg("http://image.test.com/channel" + id + ".png");
        transmissao.setLocalidadeTransmissao("Location Test " + id);
        transmissao.setLinkTransmissao("http://stream.test.com/event" + id);
        transmissao.setEvento(mockEvento.mockEntity(id));
        return transmissao;
    }
}
