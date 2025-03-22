package com.lpdev.ondepassa.unittests.mocks;

import com.lpdev.ondepassa.model.Usuario;
import com.lpdev.ondepassa.model.dto.UsuarioDTO;
import com.lpdev.ondepassa.model.enums.TipoPerfil;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.LongStream;

public class MockUsuario {

    private static final String BASE_EMAIL = "user@test.com";
    private static final String BASE_PASSWORD = "passwordTest";
    private static final String BASE_NAME = "User Name Test";
    private static final String BASE_PREFERENCE = "User Preference Test";

    public Usuario mockEntity() {
        return mockEntity(1L);
    }

    public List<Usuario> mockEntityList() {
        return LongStream.range(0, 20)
                .mapToObj(this::mockEntity)
                .collect(Collectors.toList());
    }

    public Usuario mockEntity(Long id) {
        Usuario usuario = new Usuario();
        usuario.setId(id);
        usuario.setNome(BASE_NAME);
        usuario.setEmail(generateEmail(id));
        usuario.setSenha(generatePassword(id));
        usuario.setPreferencia(BASE_PREFERENCE);
        usuario.setPerfis(Set.of(TipoPerfil.CLIENTE.getCod()));

        return usuario;
    }

    public UsuarioDTO mockDTO(Long id) {
        UsuarioDTO usuarioDTO = new UsuarioDTO();
        usuarioDTO.setId(id);
        usuarioDTO.setNome(BASE_NAME);
        usuarioDTO.setEmail(generateEmail(id));
        usuarioDTO.setPreferencia(BASE_PREFERENCE);

        return usuarioDTO;
    }

    private String generateEmail(Long id) {
        return "user" + id + "@test.com";
    }

    private String generatePassword(Long id) {
        return BASE_PASSWORD + id;
    }
}
