package com.lpdev.ondepassa.service;

import java.util.Random;

import com.lpdev.ondepassa.model.Usuario;
import com.lpdev.ondepassa.repository.UsuarioRepository;
import com.lpdev.ondepassa.service.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    private Random random = new Random();

    public void sendNewPassword(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email);
        if (usuario == null) {
            throw new ObjectNotFoundException("Email não encontrado");
        }

        String newPassword = newPassword();
        usuario.setSenha(bCryptPasswordEncoder.encode(newPassword));

        usuarioRepository.save(usuario);
        //emailService.sendNewPasswordEmail(cliente, newPassword);
    }

    private String newPassword() {
        char[] vector = new char[10];
        for (int i = 0; i < 10; i++) {
            vector[i] = randomChar();
        }
        return new String(vector);
    }

    private char randomChar() {
        int options = random.nextInt(3);
        if (options == 0) {
            return (char) (random.nextInt(10) + 48);
        } else if (options == 0) {
            return (char) (random.nextInt(26) + 65);
        } else {
            return (char) (random.nextInt(26) + 97);
        }
    }

}