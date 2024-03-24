package grado.ucb.edu.back_end_grado.api;

import grado.ucb.edu.back_end_grado.bl.PersonBl;
import grado.ucb.edu.back_end_grado.bl.StudentBl;
import grado.ucb.edu.back_end_grado.dto.request.CompleteStudentRegistrationRequest;
import grado.ucb.edu.back_end_grado.dto.request.StudentApprovalRequest;
import grado.ucb.edu.back_end_grado.dto.response.PersonResponse;
import grado.ucb.edu.back_end_grado.persistence.entity.PersonEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import grado.ucb.edu.back_end_grado.bl.PersonBl;
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
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
@RestController
@RequestMapping(Globals.apiVersion+"student")
public class StudentApi {

    private StudentBl studentBl;
    private static final Logger LOG = LoggerFactory.getLogger(PersonApi.class);

    public StudentApi(StudentBl studentBl) {
        this.studentBl = studentBl;
    }
    private static final Logger log = LoggerFactory.getLogger(PersonApi.class);

    @PostMapping("/register")
    public ResponseEntity<Object> registerStudent(@RequestBody CompleteStudentRegistrationRequest request) {
        LOG.info("API llamada para registrar un nuevo estudiante con CI: {}", request.getCi());
        Object result = studentBl.registerStudentAndDocuments(request);
        return generateResponse(result);
    }

    @GetMapping("/waiting-for-approval")
    public ResponseEntity<Object> getAllStudentsWaitingForApproval() {
        LOG.info("Recuperando todos los estudiantes en espera de aprobación.");
        Object response = studentBl.getAllStudentsWaitingForApproval();
        return generateResponse(response);
    }

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



//    public List<PersonResponse> listStudents() {
//        // Suponiendo que existe un método en tu PersonDao que te permita buscar por rol
//        //List<PersonEntity> studentEntities = personDao.findByRole("ESTUDIANTE");
//        //return studentEntities.stream()
//         //       .map(personEntity -> new PersonResponse())
//        //        .collect(Collectors.toList());
//        return null;
//    }
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
