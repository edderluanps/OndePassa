package com.lpdev.ondepassa.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAPIConfig {

    @Bean
    OpenAPI customOpenAPI(){
        return new OpenAPI()
                .info(new Info()
                        .title("OndePassa - Full Stack APP")
                        .version("V1")
                        .description("Uma aplicação full-stack desenvolvida com Java Spring Boot, " +
                                "Angular e Ionic, projetada para fornecer uma solução de indicação " +
                                "de eventos e transmissões esportivas em multiplos serviços de streaming.")
                        .termsOfService("https://github.com/edderluanps/OndePassa")
                        .license(new License()
                                .name("MIT")
                                .url("https://github.com/edderluanps/OndePassa")));
    }
}
