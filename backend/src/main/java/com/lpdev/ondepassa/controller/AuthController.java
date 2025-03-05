package com.lpdev.ondepassa.controller;

import com.lpdev.ondepassa.security.JWTUtil;
import com.lpdev.ondepassa.security.UserSS;
import com.lpdev.ondepassa.service.AuthService;
import com.lpdev.ondepassa.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/auth")
public class AuthController {

    @Autowired
    private JWTUtil jwtUtil;

    @Autowired
    private AuthService authService;

    @GetMapping(value = "/refresh_token")
    public void refreshToken(jakarta.servlet.http.HttpServletResponse httpServletResponse) {
        UserSS user = UserService.authenticated();
        String token = jwtUtil.generateToken(user.getUsername());
        httpServletResponse.addHeader("Authorization", "Bearer " + token);
        httpServletResponse.addHeader("access-control-expose-headers", "Authorization");

    }

}