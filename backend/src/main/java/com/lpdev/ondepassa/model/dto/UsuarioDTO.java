package com.lpdev.ondepassa.model.dto;

import com.lpdev.ondepassa.model.Usuario;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class UsuarioDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    private String nome;

    private String email;

    private String senha;

    public UsuarioDTO(){
    }

    public UsuarioDTO(Usuario usuario){
        id = usuario.getId();
        nome = usuario.getNome();
        email = usuario.getEmail();
        senha = usuario.getSenha();
    }

}
