package com.lpdev.ondepassa.integrationtests.swagger;

import com.lpdev.ondepassa.configs.TestConfigs;
import com.lpdev.ondepassa.integrationtests.testcontainers.AbstractIntegrationTest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static io.restassured.RestAssured.given;
import static junit.framework.TestCase.assertTrue;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
class SwaggerIntegrationTest extends AbstractIntegrationTest {

    @Test
    @DisplayName("Deve exibir a pagina do Swagger UI")
    void shouldDisplaySwaggerUIPage() {
        var content = given()
                .basePath("/swagger-ui/index.html")
                .port(TestConfigs.SERVER_PORT)
                .when()
                .get()
                .then()
                .statusCode(200)
                .extract()
                .body()
                .asString();
        assertTrue(content.contains("Swagger UI"));
    }

}