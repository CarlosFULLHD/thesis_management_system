package grado.ucb.edu.back_end_grado.api;

import grado.ucb.edu.back_end_grado.bl.PersonBl;
import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.PersonRequest;
import grado.ucb.edu.back_end_grado.util.Globals;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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


}
