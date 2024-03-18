package grado.ucb.edu.back_end_grado.api;

import grado.ucb.edu.back_end_grado.bl.PersonBl;
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
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.context.request.RequestContextHolder;

import java.util.List;
import java.util.stream.Collectors;

public class StudentApi {

    private PersonBl personBl;
    private static final Logger LOG = LoggerFactory.getLogger(PersonApi.class);

    public StudentApi(PersonBl personBl) {
        this.personBl = personBl;
    }
    public List<PersonResponse> listStudents() {
        // Suponiendo que existe un método en tu PersonDao que te permita buscar por rol
        //List<PersonEntity> studentEntities = personDao.findByRole("ESTUDIANTE");
        //return studentEntities.stream()
         //       .map(personEntity -> new PersonResponse())
        //        .collect(Collectors.toList());
        return null;
    }
    @PutMapping("/students/{id}")
    public ResponseEntity<?> updateStudent(@PathVariable Long id, @RequestBody PersonRequest personRequest) {
        Object response = personBl.updateStudent(id, personRequest);
        // Envía la respuesta adecuada dependiendo de si es exitosa o no
    }
    @DeleteMapping("/students/{id}")
    public ResponseEntity<?> deleteStudent(@PathVariable Long id) {
        Object response = personBl.deleteStudent(id);
        // Envía la respuesta adecuada dependiendo de si es exitosa o no
    }



}
