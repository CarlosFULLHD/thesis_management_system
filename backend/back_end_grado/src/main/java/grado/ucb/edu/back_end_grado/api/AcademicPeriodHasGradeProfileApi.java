package grado.ucb.edu.back_end_grado.api;

import grado.ucb.edu.back_end_grado.bl.AcademicPeriodHasGradeProfileBl;
import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.util.Globals;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@RestController
@RequestMapping(Globals.apiVersion+"academic-grade-profile")
public class AcademicPeriodHasGradeProfileApi {
    private final AcademicPeriodHasGradeProfileBl academicPeriodHasGradeProfileBl;
    private static final Logger LOG = LoggerFactory.getLogger(AcademicPeriodHasGradeProfileApi.class);

    public AcademicPeriodHasGradeProfileApi(AcademicPeriodHasGradeProfileBl academicPeriodHasGradeProfileBl) {
        this.academicPeriodHasGradeProfileBl = academicPeriodHasGradeProfileBl;
    }
    // GET => one gradeProfile by its primary key and the current academic period
    @GetMapping("/")
    public ResponseEntity<Object> getAcademicPeriodGradeProfile(@RequestParam("idGradePro") Long idGradePro){
        Object finalResponse = academicPeriodHasGradeProfileBl.getGradeProfileOfTheCurrentAcademicPeriod(idGradePro);
        int responseCode = 0;
        if (finalResponse instanceof SuccessfulResponse){
            LOG.info("LOG: Periodo académico con perfil de grado obtenido");
            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
        } else if (finalResponse instanceof UnsuccessfulResponse){
            LOG.error("LOG: Error al obtener periodo académico con perfil de grado obtenido - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
        }
        return ResponseEntity.status(responseCode).body(finalResponse);
    }
}
