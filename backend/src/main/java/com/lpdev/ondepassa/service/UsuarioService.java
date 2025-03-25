package com.lpdev.ondepassa.service;

import com.lpdev.ondepassa.model.Usuario;
import com.lpdev.ondepassa.model.dto.UsuarioDTO;
import com.lpdev.ondepassa.model.dto.UsuarioNewDTO;
import com.lpdev.ondepassa.model.enums.TipoPerfil;
import com.lpdev.ondepassa.repository.UsuarioRepository;
import com.lpdev.ondepassa.security.UserSS;
import com.lpdev.ondepassa.service.exceptions.AuthorizationException;
import com.lpdev.ondepassa.service.exceptions.DataIntegrityException;
import com.lpdev.ondepassa.service.exceptions.ObjectNotFoundException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final BCryptPasswordEncoder bpe;

    public UsuarioService(UsuarioRepository usuarioRepository, BCryptPasswordEncoder bpe) {
        this.usuarioRepository = usuarioRepository;
        this.bpe = bpe;
    }

    public Usuario get(Long id){
        UserSS user = UserService.authenticated();
        if (user == null || !user.hasRole(TipoPerfil.ADMIN) && !id.equals(user.getId())) {
            throw new AuthorizationException("Acesso negado");
        }
        return usuarioRepository.findById(id).orElseThrow(()-> new ObjectNotFoundException("Usuário não encontrado para o ID: " + id));
    }

    public List<Usuario> getAll(){
        return usuarioRepository.findAll();
    }

    public Usuario getByEmail(String email) {
        UserSS user = UserService.authenticated();
        if (user == null || !user.hasRole(TipoPerfil.ADMIN) && !email.equals(user.getUsername())) {
            throw new AuthorizationException("Acesso negado");
        }

        Usuario usuario = usuarioRepository.findByEmail(email);
        if (usuario == null) {
            throw new ObjectNotFoundException("Usuario não encontrado para o email: " + email);
        }
        return usuario;
    }

    public Page<Usuario> getPaginated(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return usuarioRepository.findAll(pageable);
    }

    public Usuario post(Usuario usuario){
        usuario.setSenha(bpe.encode(usuario.getSenha()));
        return usuarioRepository.save(usuario);
    }

    public Usuario put(Usuario usuario, Long id){
        var usuarioExistente = get(id);
        if (usuarioExistente != null) {
            usuario.setId(id);
            return usuarioRepository.save(usuario);
        }else{
            throw new ObjectNotFoundException("Usuario não encontrado para o ID: " + id);
        }
    }

    public void delete(Long id){
        if (!usuarioRepository.existsById(id)) {
            throw new ObjectNotFoundException("Usuario não encontrado para o ID: " + id);
        }
        try {
            usuarioRepository.deleteById(id);
        } catch (DataIntegrityViolationException ex) {
            throw new DataIntegrityException("Não foi possível deletar o Usuario com ID " + id + ": Usuario Ativo.");
        }
    }

    public Usuario fromDTO(UsuarioDTO usuarioDTO) {
        return new Usuario(usuarioDTO.getId(), usuarioDTO.getNome(), usuarioDTO.getEmail(), null, usuarioDTO.getPreferencia(), null);
    }

    public Usuario fromDTO(UsuarioNewDTO usuarioNewDTO){
        Usuario usuario = new Usuario(null, usuarioNewDTO.getNome(), usuarioNewDTO.getEmail(), usuarioNewDTO.getSenha(), usuarioNewDTO.getPreferencia(), null);
        return usuario;
    }

    private void putDTO(Usuario novoUsuario, Usuario usuario) {
        novoUsuario.setNome(usuario.getNome());
        novoUsuario.setEmail(usuario.getEmail());
    }
}