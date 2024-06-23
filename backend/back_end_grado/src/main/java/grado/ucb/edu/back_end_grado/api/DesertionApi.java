package grado.ucb.edu.back_end_grado.api;

import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.DesertionRequest;
import grado.ucb.edu.back_end_grado.persistence.entity.DesertionEntity;
import grado.ucb.edu.back_end_grado.bl.DesertionBl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import grado.ucb.edu.back_end_grado.util.Globals;

import java.util.List;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@RestController
@RequestMapping(Globals.apiVersion+"desertion")
@Tag(
        name ="API - Manejo de proceso de abandono",
        description = "Endpoint para el manejo de peticiones de abandono de los estudiantes"
)
public class DesertionApi {

    private final DesertionBl desertionBl;
    private static final Logger LOG = LoggerFactory.getLogger(DesertionApi.class);

    @Autowired
    public DesertionApi(DesertionBl desertionBl) {
        this.desertionBl = desertionBl;
    }

    @Operation(
            summary = "Obtener todas las peticiones de abandono",
            description = "Obtiene todas las peticiones de abandono registradas"
    )
    @GetMapping("/all")
    public ResponseEntity<?> getAllDesertions(@PageableDefault(sort = "createdAt", direction = Sort.Direction.ASC) Pageable pageable) {
        Object response = desertionBl.getAllDesertionsBl(pageable);
        return generateResponse(response);
    }
    @Operation(
            summary = "Obtener todas las peticiones de abandono pendientes",
            description = "Obtiene todas las peticiones de abandono pendientes"
    )
    @GetMapping("/status/{status}")
    public ResponseEntity<?> getDesertionsByStatus(
            @RequestParam(value = "filter", required = false) String filter,
            @PathVariable int status,
            @PageableDefault(sort = "d.usersIdUsers.personIdPerson.createdAt", direction = Sort.Direction.ASC) Pageable pageable
    ) {
        Object response = desertionBl.getDesertionsByStatus(filter, status, pageable);
        return generateResponse(response);
    }
    @Operation(
            summary = "Aceptar petición de abandono",
            description = "Acepta la petición de abandono de un estudiante"
    )
    @PostMapping("/accept/{idDesertion}")
    public ResponseEntity<?> acceptDesertion(@PathVariable Long idDesertion) {
        Object response = desertionBl.updateDesertionAcceptStatus(idDesertion, Integer.valueOf(1)); // 1 para aceptado
        return generateResponse(response);
    }
    @Operation(
            summary = "Rechazar petición de abandono",
            description = "Rechaza una petición de abandono de un estudiante"
    )
    @PostMapping("/reject/{idDesertion}")
    public ResponseEntity<?> rejectDesertion(@PathVariable Long idDesertion,@RequestBody String reason) {
        Object response = desertionBl.updateDesertionStatus(idDesertion, Integer.valueOf(2), reason); // 2 para rechazado
        return generateResponse(response);
    }
    @Operation(
            summary = "Realizar petición de abandono",
            description = "Generar una petición de abandono para el estudiante"
    )
    @PostMapping("/application")
    public ResponseEntity<?> createDesertion(@RequestBody DesertionRequest request) {
        Object response = desertionBl.createDesertion(request);
        return generateResponse(response);
    }
    @Operation(
            summary = "Obtener perfiles de grado por usuario",
            description = "Obtiene los perfiles de grado por parámetro formal de llave primaria de usuario"
    )
    @GetMapping("/grade-profiles/{idUsers}")
    public ResponseEntity<?> getGradeProfilesByUserId(@PathVariable Long idUsers) {
        Object response = desertionBl.getGradeProfilesByUserId(idUsers);
        return generateResponse(response);
    }
    private ResponseEntity<Object> generateResponse(Object response) {
        if (response instanceof SuccessfulResponse) {
            LOG.info("Operación realizada con éxito.");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else if (response instanceof UnsuccessfulResponse) {
            LOG.error("Operación fallida.");
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) response).setPath(requestPath);
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            LOG.error("Respuesta desconocida.");
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}