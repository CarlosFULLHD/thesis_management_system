package grado.ucb.edu.back_end_grado.api;

import grado.ucb.edu.back_end_grado.bl.MilestoneBl;
import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.AcademicPeriodRequest;
import grado.ucb.edu.back_end_grado.dto.request.MilestoneRequest;
import grado.ucb.edu.back_end_grado.util.Globals;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@RestController
@RequestMapping(Globals.apiVersion+"milestone")
@Tag(
        name ="API - Hito",
        description = "Endpoint de gestión de hito para usuarios nuevos"
)
public class MilestoneApi {

    private MilestoneBl milestoneBl;
    private static final Logger LOG = LoggerFactory.getLogger(MilestoneApi.class);

    public MilestoneApi(MilestoneBl milestoneBl) {
        this.milestoneBl = milestoneBl;
    }


    // Get all milestones of the current academic period
    @GetMapping("/current-ones/")
    public ResponseEntity<Object> getAllMilestonesByAcademicPeriod(){
        Object finalResponse = milestoneBl.getAllMilestonesByAcademicPeriod();
        int responseCode = 0;
        if (finalResponse instanceof SuccessfulResponse) {
            LOG.info("LOG: Todos los hitos por periodo académico encontrados");
            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
        } else if (finalResponse instanceof UnsuccessfulResponse) {
            LOG.error("LOG: Error al encontrar hitos por periodo académico - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
        }
        return ResponseEntity.status(responseCode).body(finalResponse);
    }

    // Get milestone for an user based on it's id_users
    @GetMapping("")
    public ResponseEntity<Object> getActiveMilestoneByUsersId(@RequestParam("idUsers") final Long idUsers){
        Object finalResponse = milestoneBl.getMilestoneByUser(idUsers);
        int responseCode = 0;
        if (finalResponse instanceof SuccessfulResponse) {
            LOG.info("LOG: Hito de estudiante encontrado exitosamente");
            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
        } else if (finalResponse instanceof UnsuccessfulResponse) {
            LOG.error("LOG: Error al encontrar hito del estudiante - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
        }
        return ResponseEntity.status(responseCode).body(finalResponse);
    }

    // (STUDENT) => save form
    @PutMapping("")
    public ResponseEntity<Object> saveStudentMilestone(@RequestBody MilestoneRequest request){
        Object finalResponse = milestoneBl.saveMilestone(request);
        int responseCode = 0;
        if (finalResponse instanceof SuccessfulResponse){
            LOG.info("LOG: Carta de propuesta guardada exitosamente");
            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
        } else if (finalResponse instanceof UnsuccessfulResponse){
            LOG.error("LOG: Error al guardar carta de propuesta - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest requestHttp = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = requestHttp.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
        }
        return ResponseEntity.status(responseCode).body(finalResponse);
    }

    // (STUDENT) => send form
    @PutMapping("/")
    public ResponseEntity<Object> sendStudentMilestone(@RequestBody MilestoneRequest request){
        Object finalResponse = milestoneBl.sendMilestone(request);
        int responseCode = 0;
        if (finalResponse instanceof SuccessfulResponse){
            LOG.info("LOG: Carta de propuesta enviada exitosamente");
            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
        } else if (finalResponse instanceof UnsuccessfulResponse){
            LOG.error("LOG: Error al enviar carta de propuesta - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest requestHttp = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = requestHttp.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
        }
        return ResponseEntity.status(responseCode).body(finalResponse);
    }

    // (COORDINATOR) => review form
    @PutMapping("/review")
    public ResponseEntity<Object> reviewMilestoneForm(@RequestBody MilestoneRequest request){
        Object finalResponse = milestoneBl.reviewMilestoneForm(request);
        int responseCode = 0;
        if (finalResponse instanceof SuccessfulResponse){
            LOG.info("LOG: Carta de propuesta revisada exitosamente");
            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
        } else if (finalResponse instanceof UnsuccessfulResponse){
            LOG.error("LOG: Error al enviar revisión de carta de propuesta - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest requestHttp = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = requestHttp.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
        }
        return ResponseEntity.status(responseCode).body(finalResponse);
    }
}
