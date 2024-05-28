package grado.ucb.edu.back_end_grado.api;

import grado.ucb.edu.back_end_grado.bl.FormalDefenseBl;
import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.FormalDefenseRequest;
import grado.ucb.edu.back_end_grado.dto.request.LecturerApplicationRequest;
import grado.ucb.edu.back_end_grado.util.Globals;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@RestController
@RequestMapping(Globals.apiVersion+"formal-defense")
public class FormalDefenseApi {
    private FormalDefenseBl formalDefenseBl;
    private static final Logger LOG = LoggerFactory.getLogger(FormalDefenseApi.class);

    public FormalDefenseApi(FormalDefenseBl formalDefenseBl) {
        this.formalDefenseBl = formalDefenseBl;
    }

    // POST => new formal defense for a grade profile
    @PostMapping("")
    public ResponseEntity<Object> startNewFormalDefense(@RequestBody FormalDefenseRequest request){
        Object finalResponse = formalDefenseBl.startNewFormalDefense(request);
        int responseCode = 0;
        if(finalResponse instanceof SuccessfulResponse){
            LOG.info("LOG: Proceso de defensa formal iniciado exitosamente");
            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
        } else if (finalResponse instanceof UnsuccessfulResponse){
            LOG.error("LOG: Error al crear proceso de defensa formal - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest requesthttp = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = requesthttp.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
        }
        return ResponseEntity.status(responseCode).body(finalResponse);
    }

    // GET => Formal defense entity of the current academic period by idGradePro PK
    @GetMapping("")
    public ResponseEntity<Object> getGradeProfileForCurrentAcademicPeriod(@RequestParam("idGradePro") final Long idGradePro){
        Object finalResponse = formalDefenseBl.getGradeProfileForCurrentAcademicPeriod(idGradePro);
        int responseCode = 0;
        if(finalResponse instanceof SuccessfulResponse){
            LOG.info("LOG: Defensa formal para perfil de grado, obtenida exitosamente");
            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
        } else if (finalResponse instanceof UnsuccessfulResponse){
            LOG.error("LOG: Error al obtener defensa formal para perfil de grado - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest requesthttp = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = requesthttp.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
        }
        return ResponseEntity.status(responseCode).body(finalResponse);
    }
}
