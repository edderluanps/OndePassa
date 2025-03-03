package com.lpdev.ondepassa.repository;

import com.lpdev.ondepassa.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}
