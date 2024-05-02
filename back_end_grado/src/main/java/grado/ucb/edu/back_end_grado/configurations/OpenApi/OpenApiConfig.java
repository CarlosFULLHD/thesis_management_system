package grado.ucb.edu.back_end_grado.configurations.OpenApi;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;

@OpenAPIDefinition(
        info = @Info(
                contact = @Contact(
                        name = "Taller de grado",
                        email = "tallergradoucb@gmail.com",
                        url = "https://ucb.edu.bo"

                ),
                title="Taller de grado API - Documentación",
                description ="OpenAPI documentation para RESTful API",
                version = "1.0",
                termsOfService = "Uso restringido a pruebas del proyecto de gestión de taller de grado"
        ),
        servers = {
                @Server(
                        description = "Local ENV",
                        url = "http://127.0.0.1:8080"
                )
        }
)
public class OpenApiConfig {
}
