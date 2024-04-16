package grado.ucb.edu.back_end_grado.api;

import grado.ucb.edu.back_end_grado.bl.AcademicPeriodBl;
import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.AcademicPeriodRequest;
import grado.ucb.edu.back_end_grado.dto.request.TaskRequest;
import grado.ucb.edu.back_end_grado.util.Globals;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.coyote.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@RestController
@RequestMapping(Globals.apiVersion+"academic-period")
public class AcademicPeriodApi {
    private final AcademicPeriodBl academicPeriodBl;
    private static final Logger LOG = LoggerFactory.getLogger(AcademicPeriodApi.class);

    public AcademicPeriodApi(AcademicPeriodBl academicPeriodBl) {
        this.academicPeriodBl = academicPeriodBl;
    }

    // Create new academic period
    @PostMapping("/")
    public ResponseEntity<Object> postAcademicPeriod(@RequestBody AcademicPeriodRequest requestAcademic) {
        Object finalResponse = academicPeriodBl.newAcademicPeriod(requestAcademic);
        int responseCode = 0;
        if (finalResponse instanceof SuccessfulResponse) {
            LOG.info("LOG: Periodo academico registrado");
            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
        } else if (finalResponse instanceof UnsuccessfulResponse) {
            LOG.error("LOG: Error al registrar periodo academico - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
        }
        return ResponseEntity.status(responseCode).body(finalResponse);
    }

    // Get an academic period based on current date and time
    @GetMapping("/current-one/")
    public ResponseEntity<Object> getCurrentActiveAcademicPeriod(){
        Object finalResponse = academicPeriodBl.getCurrentActiveAcademicPeriod();
        int responseCode = 0;
        if (finalResponse instanceof SuccessfulResponse) {
            LOG.info("LOG: Se logro encontrar un periodo académico actual");
            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
        } else if (finalResponse instanceof UnsuccessfulResponse) {
            LOG.error("LOG: No existen periodos académicos para esta fecha - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
        }
        return ResponseEntity.status(responseCode).body(finalResponse);
    }
    // Get active academic period ordered by its date
    @GetMapping("/")
    public ResponseEntity<Object> getAllAcademicPeriodOrderedByDate(){
        Object finalResponse = academicPeriodBl.getOrderedAcademicPeriods();
        int responseCode = 0;
        if (finalResponse instanceof SuccessfulResponse) {
            LOG.info("LOG: Periodos académicos encontrados");
            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
        } else if (finalResponse instanceof UnsuccessfulResponse) {
            LOG.error("LOG: No existen periodos académicos - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
        }
        return ResponseEntity.status(responseCode).body(finalResponse);
    }

    // Delete academic period by it's ID
    @DeleteMapping("")
    public ResponseEntity<Object> deleteActiveAcademicPeriod(@RequestParam("idAcad") final Long idAcad){
        Object finalResponse = academicPeriodBl.deleteAcademicPeriodById(idAcad);
        int responseCode = 0;
        if (finalResponse instanceof SuccessfulResponse) {
            LOG.info("LOG: Periodo académico eliminado exitosamente");
            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
        } else if (finalResponse instanceof UnsuccessfulResponse) {
            LOG.error("LOG: Error al eliminar periodo académico - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
        }
        return ResponseEntity.status(responseCode).body(finalResponse);
    }
    // Update and academic period by it's ID
    @PutMapping("/")
    public ResponseEntity<Object> patchActivePublicInformationById(@RequestBody AcademicPeriodRequest academicPeriodRequest){
        Object finalResponse = academicPeriodBl.updateActiveAcademicPeriodById(academicPeriodRequest);
        int responseCode = 0;
        if (finalResponse instanceof SuccessfulResponse){
            LOG.info("LOG: Periodo académico modificado exitosamente");
            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
        } else if (finalResponse instanceof UnsuccessfulResponse){
            LOG.error("LOG: Error al modificar periodo académico - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
        }
        return ResponseEntity.status(responseCode).body(finalResponse);
    }
}
