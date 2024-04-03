package grado.ucb.edu.back_end_grado.api;

import grado.ucb.edu.back_end_grado.bl.LecturerApplicationBl;
import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.LecturerApplicationRequest;
import grado.ucb.edu.back_end_grado.util.Globals;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.coyote.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@RestController
@RequestMapping(Globals.apiVersion+"lecturer")
public class LecturerApplicationApi {
    private LecturerApplicationBl lecturerApplicationBl;

    private static final Logger LOG = LoggerFactory.getLogger(LecturerApplicationApi.class);

    public LecturerApplicationApi(LecturerApplicationBl lecturerApplicationBl) {
        this.lecturerApplicationBl = lecturerApplicationBl;
    }

    // Request new lecturer for grade project
    @PostMapping("/request-tutor")
    public ResponseEntity<Object> requestLecturerForProject(@RequestBody LecturerApplicationRequest lecturerApplicationRequest){
        Object finalResponse = lecturerApplicationBl.requestNewTutor(lecturerApplicationRequest);
        int responseCode = 0;
        if(finalResponse instanceof SuccessfulResponse){
            LOG.info("LOG: Petición de tutor registrada exitosamente");
            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
        } else if (finalResponse instanceof UnsuccessfulResponse){
            LOG.error("LOG: Error al crear petición para tutor - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
        }
        return ResponseEntity.status(responseCode).body(finalResponse);
    }


}
