package grado.ucb.edu.back_end_grado.api;

import grado.ucb.edu.back_end_grado.bl.ProfessorBl;
import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.CompleteProfessorRegistrationRequest;
import grado.ucb.edu.back_end_grado.util.Globals;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(Globals.apiVersion + "professor")
@Tag(
        name ="API - Gestión de DOCENTES",
        description = "Endpoint para el manejo de DOCENTES dentro del sistema"
)
public class ProfessorApi {
    private final ProfessorBl professorBl;
    private static final Logger LOG = LoggerFactory.getLogger(ProfessorApi.class);

    public ProfessorApi(ProfessorBl professorBl) {
        this.professorBl = professorBl;
    }
    @Operation(
            summary = "Crear un nuevo usuario como DOCENTE",
            description = "Registra un nuevo usuario con el rol de DOCENTE dentro del sistema"
    )
    @PostMapping("/register")
    public ResponseEntity<Object> registerProfessor(@RequestBody CompleteProfessorRegistrationRequest request) {
        LOG.info("API llamada para registrar un nuevo docente con CI: {}", request.getCi());
        Object result = professorBl.registerProfessor(request);
        return generateResponse(result);
    }
    @Operation(
            summary = "Obtener a todos los usuarios con rol de DOCENTE que estan activos",
            description = "Obtiene a todos los usuarios activos que tienen un rol DOCENTE"
    )
    @GetMapping("/all")
    public ResponseEntity<Object> getAllActiveProfessors() {
        try {
            Object response = professorBl.getAllActiveProfessors();
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new UnsuccessfulResponse("500", "Internal Server Error", e.getMessage()));
        }
    }
    private ResponseEntity<Object> generateResponse(Object response) {
        if (response instanceof SuccessfulResponse) {
            LOG.info("Operación realizada con éxito.");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else if (response instanceof UnsuccessfulResponse) {
            LOG.error("Operación fallida.");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            LOG.error("Respuesta desconocida.");
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
