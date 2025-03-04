package com.lpdev.ondepassa.service;

import com.lpdev.ondepassa.model.Usuario;
import com.lpdev.ondepassa.repository.UsuarioRepository;
import com.lpdev.ondepassa.service.exceptions.DataIntegrityException;
import com.lpdev.ondepassa.service.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario get(Long id){
        return usuarioRepository.findById(id).orElseThrow(()-> new ObjectNotFoundException("Não encontrado"));
    }

    public List<Usuario> get(){
        return usuarioRepository.findAll();
    }

    public Page<Usuario> getPaginated(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return usuarioRepository.findAll(pageable);
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
            throw new ObjectNotFoundException( "Não encontrado");
        }
    }

    public void delete(Long id){
        get(id);
        try{
            usuarioRepository.deleteById(id);
        }catch(DataIntegrityViolationException ex){
            throw new DataIntegrityException("Não foi possivel deletar: Usuário Ativo.");
        }
    }

}
