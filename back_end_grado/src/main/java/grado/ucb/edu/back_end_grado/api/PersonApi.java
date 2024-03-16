package grado.ucb.edu.back_end_grado.api;

import grado.ucb.edu.back_end_grado.bl.PersonBl;
import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.PersonRequest;
import grado.ucb.edu.back_end_grado.util.Globals;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    // New person (Student) from initial form
    @PostMapping("/newStudentForm")
    public Object postPersonFromForm(@RequestBody PersonRequest personRequest){
        Object finalResponse = personBl.newStudentFromInitialForm(personRequest);
        if (finalResponse instanceof SuccessfulResponse){
            LOG.info("LOG: Estudiante desde formulario creado exitosamente");
        } else if (finalResponse instanceof UnsuccessfulResponse){
            LOG.error("LOG: Error al crear estudiane desde formulario - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
        }
        return finalResponse;
    }
    // Obtener una persona específica por ID

    @GetMapping("/{id}")
    public Object getPersonById(@PathVariable Long id) {
        Object finalResponse = personBl.getStudentById(id);
        if (finalResponse instanceof SuccessfulResponse) {
            LOG.info("LOG: Estudiante obtenido exitosamente");
        } else if (finalResponse instanceof UnsuccessfulResponse) {
            LOG.error("LOG: Error al obtener el estudiante");
        }
        return finalResponse;
    }
    //Obtener todas las personas
    @GetMapping("/all")
    public Object getAllPersons() {
        Object finalResponse = personBl.getAllStudents();
        if (finalResponse instanceof SuccessfulResponse) {
            LOG.info("LOG: Todos los estudiantes obtenidos exitosamente");
        } else if (finalResponse instanceof UnsuccessfulResponse) {
            LOG.error("LOG: Error al obtener todos los estudiantes");
        }
        return finalResponse;
    }




}
