package com.lpdev.ondepassa.model;

import com.lpdev.ondepassa.model.enums.TipoPerfil;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Table(name = "tbl_usuario")
@Data
@Getter
@Setter
public class Usuario implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @Column(unique=true)
    private String email;

    private String senha;

    private String preferencia;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "perfis")
    private Set<Integer> perfis = new HashSet<>();

    public Usuario() {
        addPerfis(TipoPerfil.CLIENTE);
    }

    public Usuario(Long id, String nome, String email, String senha, String preferencia, Set<Integer> perfis) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.preferencia = preferencia;
        addPerfis(TipoPerfil.CLIENTE);
    }

    public Set<TipoPerfil> getPerfis() {
        return perfis.stream().map(obj -> TipoPerfil.toEnum(obj)).collect(Collectors.toSet());
    }

    public void addPerfis(TipoPerfil perfil) {
        perfis.add(perfil.getCod());
    }
}
