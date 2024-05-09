package grado.ucb.edu.back_end_grado.api;

import grado.ucb.edu.back_end_grado.bl.GradeProfileBl;
import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.util.Globals;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.coyote.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springdoc.core.converters.models.PageableAsQueryParam;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@RestController
@RequestMapping(Globals.apiVersion+"grade-profile")
@Tag(
        name ="API - Manejo de perfiles de grado",
        description = "Endpoint para el manejo perfiles de grado"
)
public class GradeProfileApi {
    private final GradeProfileBl gradeProfileBl;
    private static final Logger LOG = LoggerFactory.getLogger(GradeProfileApi.class);

    public GradeProfileApi(GradeProfileBl gradeProfileBl) {
        this.gradeProfileBl = gradeProfileBl;
    }

    // Method to retrieve all active tuples of grade profile table
    @GetMapping("/")
    @Operation(
            summary = "Obtener todos los perfiles de grado activos",
            description = "Obtiene todos los perfiles de grado activos dentro del sistema"
    )
    public ResponseEntity<Object> getAllActiveGradeProfiles(@PageableDefault(sort = "title", direction = Sort.Direction.ASC) Pageable pageable,
                                                            @RequestParam(value = "title", required = false) String title){
        Object finalResponse = gradeProfileBl.getActiveGradeProfiles(pageable, title);
        int responseCode = 0;
        if (finalResponse instanceof SuccessfulResponse){
            LOG.info("LOG: Todos los registros de perfiles de grado encontrados");
            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
        } else if (finalResponse instanceof UnsuccessfulResponse){
            LOG.error("LOG: Error al buscar registros de perfiles de grado - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
        }
        return ResponseEntity.status(responseCode).body(finalResponse);
    }

    // Method to retrieve grade profiles based on its workshop
//    @GetMapping("/workshop/")
//    public ResponseEntity<Object> getProfilesByItsWorkshop( Pageable pageable, @RequestParam(value ="isGradeoneortwo") int isGradeoneortwo){
//        Object finalResponse = gradeProfileBl.getProfilesByItsWorkshop(pageable, isGradeoneortwo);
//        int responseCode = 0;
//        if (finalResponse instanceof SuccessfulResponse){
//            LOG.info("LOG: Perfiles de grado por taller encontrados");
//            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
//        } else if (finalResponse instanceof UnsuccessfulResponse){
//            LOG.error("LOG: Error al buscar registros de perfiles de grado por taller - " + ((UnsuccessfulResponse) finalResponse).getPath());
//            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
//            String requestPath = request.getRequestURI();
//            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
//            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
//        }
//        return ResponseEntity.status(responseCode).body(finalResponse);
//    }

    // Method to get a grade profile with its tutor and lecturer based on a user id
    @GetMapping("/lecturer")
    public ResponseEntity<Object> getGradeProfileWithLecturersByUserId(@RequestParam(value = "idUsers") Long idUsers){
        Object finalResponse = gradeProfileBl.getGradeProfileWithLecturersByUserId(idUsers);
        int responseCode = 0;
        if (finalResponse instanceof SuccessfulResponse){
            LOG.info("LOG: Perfil de grado con tutor y relator encontrado");
            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
        } else if (finalResponse instanceof UnsuccessfulResponse){
            LOG.error("LOG: Problemas al conseguir perfil de grado con tutor y relator - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
        }
        return ResponseEntity.status(responseCode).body(finalResponse);
    }

}
