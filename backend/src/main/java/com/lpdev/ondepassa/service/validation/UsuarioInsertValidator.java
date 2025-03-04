package com.lpdev.ondepassa.service.validation;

import java.util.ArrayList;
import java.util.List;

import com.lpdev.ondepassa.controller.exceptions.FieldMessage;
import com.lpdev.ondepassa.model.Usuario;
import com.lpdev.ondepassa.model.dto.UsuarioNewDTO;
import com.lpdev.ondepassa.repository.UsuarioRepository;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

public class UsuarioInsertValidator implements ConstraintValidator<UsuarioInsert, UsuarioNewDTO> {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public void initialize(UsuarioInsert userInsert) {
    }

    @Override
    public boolean isValid(UsuarioNewDTO usuarioNewDTO, ConstraintValidatorContext context) {

        List<FieldMessage> list = new ArrayList<>();

        Usuario usuario = usuarioRepository.findByEmail(usuarioNewDTO.getEmail());
        if (usuario != null) {
            list.add(new FieldMessage("email", "Email já existente"));
        }

        for (FieldMessage e : list) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(e.getMessage()).addPropertyNode(e.getFieldName())
                    .addConstraintViolation();
        }
        return list.isEmpty();
    }
}