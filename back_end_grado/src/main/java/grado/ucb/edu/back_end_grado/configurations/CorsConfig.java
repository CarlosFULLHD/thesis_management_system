package grado.ucb.edu.back_end_grado.configurations;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**") // Replace with your API endpoint
                        //.allowedOrigins("http://localhost:3000")
                        .allowedOrigins("https://frontendgrado.netlify.app")
                        .allowedMethods("GET", "POST", "PATCH", "DELETE","PUT", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true) // Permitir cookies
                        .exposedHeaders("Authorization");
            }
        };
    }
}

