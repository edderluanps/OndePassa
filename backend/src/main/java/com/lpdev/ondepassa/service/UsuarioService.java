package com.lpdev.ondepassa.service;

import com.lpdev.ondepassa.model.Usuario;
import com.lpdev.ondepassa.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario get(Long id){
        return usuarioRepository.findById(id).orElseThrow(()-> new ResponseStatusException(HttpStatusCode.valueOf(404), "Não encontrado"));
    }

    public List<Usuario> get(){
        return usuarioRepository.findAll();
    }

    public Usuario post(Usuario usuario){
        return usuarioRepository.save(usuario);
    }

    public void put(Usuario usuario, Long id){
        var userToEdit = get(id);
        if (userToEdit != null){
            usuario.setId(id);
            usuarioRepository.save(usuario);
        }else{
            throw new ResponseStatusException(HttpStatusCode.valueOf(404), "Não encontrado");
        }
    }

    public void delete(Long id){
        var userToDelete = get(id);
        if (userToDelete != null){
            usuarioRepository.deleteById(id);
        }else{
            throw new ResponseStatusException(HttpStatusCode.valueOf(404), "Não encontrado");
        }
    }

}
