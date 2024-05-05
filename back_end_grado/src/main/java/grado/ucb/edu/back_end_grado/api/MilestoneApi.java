package grado.ucb.edu.back_end_grado.api;

import grado.ucb.edu.back_end_grado.bl.MilestoneBl;
import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
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

}
