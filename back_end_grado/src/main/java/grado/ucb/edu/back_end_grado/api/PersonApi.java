package grado.ucb.edu.back_end_grado.api;

import grado.ucb.edu.back_end_grado.bl.PersonBl;
import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.PersonRequest;
import grado.ucb.edu.back_end_grado.dto.request.PersonUpdateRequest;
import grado.ucb.edu.back_end_grado.persistence.entity.PersonEntity;
import grado.ucb.edu.back_end_grado.util.Globals;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@RestController
@RequestMapping(Globals.apiVersion+"person")
public class PersonApi {
    private PersonBl personBl;
    private static final Logger LOG = LoggerFactory.getLogger(PersonApi.class);

    public PersonApi(PersonBl personBl) {
        this.personBl = personBl;
    }


// Aceptar o rechazar a un estudiante que haya enviado su formulario, de esta manera cambiamos status
// de person, role_has_person y grade_profile para tener status 0
//Parametro a mandar el id de person
//    @PutMapping("/{id}")
//    public ResponseEntity<?> updatePerson(@PathVariable Long id, @RequestBody PersonUpdateRequest request) {
//        Object response = personBl.updatePersonDescriptionAndStatus(id, request);
//        return generateResponse(response);
//    }

    @PutMapping("/{userId}/personal-info")
    public ResponseEntity<Object> updatePersonalInfo(@PathVariable Long userId, @RequestBody PersonUpdateRequest request) {
        LOG.info("API called to update personal info for professor with ID: {}", userId);
        try {
            Object response = personBl.updatePersonalInfo(userId, request);
            return generateResponse(response);
        } catch (Exception e) {
            LOG.error("Failed to update personal info", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new UnsuccessfulResponse("500", "Internal Server Error", e.getMessage()));
        }
    }


    @PostMapping("/newStudentForm")
    public ResponseEntity<?> postPersonFromForm(@RequestBody PersonRequest personRequest) {
        Object response = personBl.newStudentFromInitialForm(personRequest);
        return generateResponse(response);
    }
    // Obtener una persona específica por ID

    @GetMapping("/{id}")
    public ResponseEntity<?> getPersonById(@PathVariable Long id) {
        Object response = personBl.getPersonById(id);
        return generateResponse(response);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllPersons() {
        Object response = personBl.getAllPersonsBl();
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
