package com.lpdev.ondepassa.service;

import com.lpdev.ondepassa.model.Usuario;
import com.lpdev.ondepassa.model.enums.TipoPerfil;
import com.lpdev.ondepassa.repository.UsuarioRepository;
import com.lpdev.ondepassa.security.UserSS;
import com.lpdev.ondepassa.unitetests.mocks.MockUsuario;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@DisplayName("Testes - Usuários")
@ExtendWith(MockitoExtension.class)
class UsuarioServiceTest {

    private MockUsuario input;

    @InjectMocks
    private UsuarioService usuarioService;

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private BCryptPasswordEncoder bpe;

    @BeforeEach
    void setUp() {
        input = new MockUsuario();
    }

    @Test
    @DisplayName("Deve buscar um Usuário por ID")
    void get() {
        try (MockedStatic<UserService> mockedUserService = mockStatic(UserService.class)) {
            UserSS user = new UserSS(1L, "user1@test.com", "password", Set.of(TipoPerfil.ADMIN));
            mockedUserService.when(UserService::authenticated).thenReturn(user);

            Usuario usuario = input.mockEntity(1L);
            when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuario));

            var result = usuarioService.get(1L);

            assertNotNull(result);
            assertEquals(1L, result.getId());
        }
    }

    @Test
    @DisplayName("Deve listar todos os Usuários")
    void getAll() {
        when(usuarioRepository.findAll()).thenReturn(input.mockEntityList());

        var result = usuarioService.getAll();

        assertNotNull(result);
        assertEquals(20, result.size());
    }

    @Test
    @DisplayName("Deve buscar um Usuário por e-mail")
    void getByEmail() {
        try (MockedStatic<UserService> mockedUserService = mockStatic(UserService.class)) {
            UserSS user = new UserSS(1L, "user1@test.com", "password", Set.of(TipoPerfil.ADMIN));
            mockedUserService.when(UserService::authenticated).thenReturn(user);

            Usuario usuario = input.mockEntity(1L);
            when(usuarioRepository.findByEmail("user1@test.com")).thenReturn(usuario);

            var result = usuarioService.getByEmail("user1@test.com");

            assertNotNull(result);
            assertEquals("user1@test.com", result.getEmail());
        }
    }

    @Test
    @DisplayName("Deve listar todos os Usuários com paginação")
    void getPaginated() {
        PageRequest pageRequest = PageRequest.of(0, 10);
        var usuarios = input.mockEntityList();
        Page<Usuario> page = new PageImpl<>(usuarios.subList(0, 10), pageRequest, usuarios.size());
        when(usuarioRepository.findAll(pageRequest)).thenReturn(page);

        var result = usuarioService.getPaginated(0, 10);

        assertNotNull(result);
        assertEquals(20, result.getTotalElements());
        assertEquals(2, result.getTotalPages());
        assertEquals(10, result.getContent().size());
    }

    @Test
    @DisplayName("Deve salvar um Usuário")
    void post() {
        Usuario usuario = input.mockEntity(1L);
        usuario.setSenha("plainPassword");

        when(bpe.encode("plainPassword")).thenReturn("encryptedPassword");
        when(usuarioRepository.save(any(Usuario.class))).thenAnswer(invocation -> invocation.getArgument(0));

        var result = usuarioService.post(usuario);

        assertNotNull(result);
        assertEquals("encryptedPassword", result.getSenha());
        assertNotEquals("plainPassword", result.getSenha());
        verify(bpe, times(1)).encode("plainPassword");
        verify(usuarioRepository, times(1)).save(any(Usuario.class));
    }

    @Test
    @DisplayName("Deve editar um Usuário")
    void put() {
        try (MockedStatic<UserService> mockedUserService = mockStatic(UserService.class)) {
            UserSS user = new UserSS(1L, "user@test.com", "password", Set.of(TipoPerfil.ADMIN));
            mockedUserService.when(UserService::authenticated).thenReturn(user);

            Usuario usuario = input.mockEntity(1L);
            usuario.setNome("Updated Name");
            usuario.setPreferencia("Updated Preference");

            when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuario));
            when(usuarioRepository.save(any(Usuario.class))).thenReturn(usuario);

            var result = usuarioService.put(usuario, 1L);

            assertNotNull(result);
            assertEquals(1L, result.getId());
            assertEquals("Updated Name", result.getNome());
            assertEquals("Updated Preference", result.getPreferencia());
        }
    }

    @Test
    @DisplayName("Deve deletar um Usuário")
    void delete_WhenUserExists_ShouldDeleteSuccessfully() {
        when(usuarioRepository.existsById(1L)).thenReturn(true);
        doNothing().when(usuarioRepository).deleteById(1L);

        assertDoesNotThrow(() -> usuarioService.delete(1L));
        verify(usuarioRepository, times(1)).deleteById(1L);
    }

    @DisplayName("Deve deletar um Usuário - Quando um usuário não existir para o ID informado")
    @Test
    void delete_WhenUserDoesNotExist_ShouldThrowException() {
        when(usuarioRepository.existsById(1L)).thenReturn(false);

        Exception exception = assertThrows(RuntimeException.class, () -> usuarioService.delete(1L));
        assertEquals("Usuario não encontrado para o ID: 1", exception.getMessage());

        verify(usuarioRepository, never()).deleteById(anyLong());
    }

}
