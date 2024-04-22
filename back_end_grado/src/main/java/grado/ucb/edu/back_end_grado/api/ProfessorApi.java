package grado.ucb.edu.back_end_grado.api;

import grado.ucb.edu.back_end_grado.bl.ProfessorBl;
import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.CompleteProfessorRegistrationRequest;
import grado.ucb.edu.back_end_grado.util.Globals;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
@RestController
@RequestMapping(Globals.apiVersion + "professor")
public class ProfessorApi {
    private final ProfessorBl professorBl;
    private static final Logger LOG = LoggerFactory.getLogger(ProfessorApi.class);

    public ProfessorApi(ProfessorBl professorBl) {
        this.professorBl = professorBl;
    }

    @PostMapping("/register")
    public ResponseEntity<Object> registerProfessor(@RequestBody CompleteProfessorRegistrationRequest request) {
        LOG.info("API llamada para registrar un nuevo docente con CI: {}", request.getCi());
        Object result = professorBl.registerProfessor(request);
        return generateResponse(result);
    }

    @GetMapping("/tutores")
    public ResponseEntity<Object> getAllActiveProfessors(
            @PageableDefault(size = 10, sort = "name", direction = Sort.Direction.ASC) Pageable pageable,
            @RequestParam(required = false) String subject) {
        try {
            Object response = professorBl.getAllActiveProfessors(subject, pageable);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOG.error("Failed to retrieve professors", e);
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
