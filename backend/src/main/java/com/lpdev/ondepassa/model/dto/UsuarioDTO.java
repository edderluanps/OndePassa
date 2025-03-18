package com.lpdev.ondepassa.model.dto;

import com.lpdev.ondepassa.model.Usuario;
import com.lpdev.ondepassa.service.validation.UsuarioUpdate;
import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@UsuarioUpdate
public class UsuarioDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    private String nome;

    @NotEmpty(message = "Campo obrigatório")
    @Email(message = "Email inválido")
    @Column(unique=true)
    private String email;

    private String preferencia;

    public UsuarioDTO(){
    }

    public UsuarioDTO(Usuario usuario){
        id = usuario.getId();
        nome = usuario.getNome();
        email = usuario.getEmail();
        preferencia = usuario.getPreferencia();
    }

}
