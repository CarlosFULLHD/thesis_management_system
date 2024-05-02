package grado.ucb.edu.back_end_grado;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class BackEndGradoApplication extends SpringBootServletInitializer {

	// Sobrescribe el método configure
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(BackEndGradoApplication.class);
	}

	public static void main(String[] args) {
		SpringApplication.run(BackEndGradoApplication.class, args);
	}
}
