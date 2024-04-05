package grado.ucb.edu.back_end_grado.api;
import grado.ucb.edu.back_end_grado.bl.StudentBl;
import grado.ucb.edu.back_end_grado.dto.request.CompleteStudentRegistrationRequest;
import grado.ucb.edu.back_end_grado.dto.request.PersonUpdateRequest;
import grado.ucb.edu.back_end_grado.dto.request.StudentApprovalRequest;
import grado.ucb.edu.back_end_grado.dto.response.PersonResponse;
import grado.ucb.edu.back_end_grado.persistence.entity.PersonEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.PersonRequest;
import grado.ucb.edu.back_end_grado.util.Globals;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.List;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
@RestController
@RequestMapping(Globals.apiVersion+"student")
public class StudentApi {
//    private PersonBl personBl;
    private StudentBl studentBl;
    private static final Logger LOG = LoggerFactory.getLogger(StudentApi.class);

    public StudentApi(StudentBl studentBl) {
        this.studentBl = studentBl;
    }
    @PostMapping("/register")
    public ResponseEntity<Object> registerStudent(@RequestBody CompleteStudentRegistrationRequest request) {
        LOG.info("API llamada para registrar un nuevo estudiante con CI: {}", request.getCi());
        Object result = studentBl.registerStudent(request);
        return generateResponse(result);
    }

    //Listar todos los estudiantes que mandaron formulario

//    @GetMapping("/waiting-for-approval")
//    public ResponseEntity<Object> getAllStudentsWaitingForApproval() {
//        LOG.info("Recuperando todos los estudiantes en espera de aprobación.");
//        Object response = studentBl.getAllStudentsWaitingForApproval();
//        return generateResponse(response);
//    }

    // Método auxiliar para generar respuestas HTTP y registrar los logs adecuados
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


//    @PutMapping("/students/{id}")
//    public ResponseEntity<?> updateStudent(@PathVariable Long id, @RequestBody PersonRequest personRequest) {
//        Object response = personBl.updateStudent(id, personRequest);
//        // Envía la respuesta adecuada dependiendo de si es exitosa o no
//    }
//    @DeleteMapping("/students/{id}")
//    public ResponseEntity<?> deleteStudent(@PathVariable Long id) {
//        Object response = personBl.deleteStudent(id);
//        // Envía la respuesta adecuada dependiendo de si es exitosa o no
//        return null;
//    }



}
