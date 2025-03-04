package com.lpdev.ondepassa.service.validation;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.lpdev.ondepassa.controller.exceptions.FieldMessage;
import com.lpdev.ondepassa.model.Usuario;
import com.lpdev.ondepassa.model.dto.UsuarioDTO;
import com.lpdev.ondepassa.repository.UsuarioRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerMapping;

public class UsuarioUpdateValidator implements ConstraintValidator<UsuarioUpdate, UsuarioDTO> {

    @Autowired
    private HttpServletRequest request;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public void initializable(UsuarioUpdate userUpdate){

    }

    @Override
    public boolean isValid(UsuarioDTO usuarioDTO, ConstraintValidatorContext context){

        Map<String, String> map = (Map<String, String>)request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);

        Integer uriId = Integer.parseInt(map.get("id"));

        List<FieldMessage> list = new ArrayList<>();

        Usuario usuario =usuarioRepository.findByEmail(usuarioDTO.getEmail());

        if(usuario != null && !usuario.getId().equals(uriId)){
            list.add(new FieldMessage("email", "email já existente"));
        }

        for (FieldMessage e : list){

            context.disableDefaultConstraintViolation();

            context.buildConstraintViolationWithTemplate(e.getMessage()).addPropertyNode(e.getFieldName());

        }
        return list.isEmpty();
    }

}