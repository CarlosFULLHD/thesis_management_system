package grado.ucb.edu.back_end_grado.api;

import grado.ucb.edu.back_end_grado.bl.GradeProfileBl;
import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.AcademicPeriodHasGradeProfileRequest;
import grado.ucb.edu.back_end_grado.dto.request.AcademicPeriodRequest;
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
import org.springframework.web.bind.annotation.*;
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
    // GET => a grade_profile by its primary key
    @GetMapping("/one")
    public ResponseEntity<Object> getGradeProfileByItsId(@RequestParam(value = "idGradePro") Long idGradePro){
        Object finalResponse = gradeProfileBl.getGradeProfileByIdGradePro(idGradePro);
        int responseCode = 0;
        if (finalResponse instanceof SuccessfulResponse){
            LOG.info("LOG: Perfil de grado encontrado");
            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
        } else if (finalResponse instanceof UnsuccessfulResponse){
            LOG.error("LOG: Problemas al conseguir perfil de grado - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
        }
        return ResponseEntity.status(responseCode).body(finalResponse);
    }

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

    // Get all grade profiles with its active tutors or lecturers of the current academic period
    @GetMapping("/lecturer/all")
    public ResponseEntity<Object> getGradeProfilesWithLecturersOfTheCurrentGradeProfile(
            @RequestParam(value = "filter", required = false) String filter,
            @PageableDefault(sort = "aphgp.gradeProfileIdGradePro.roleHasPersonIdRolePer.usersIdUsers.username", direction = Sort.Direction.ASC) Pageable pageable
    ){
        Object finalResponse = gradeProfileBl.getGradeProfilesWithLecturersOfTheCurrentGradeProfile(filter, pageable);
        int responseCode = 0;
        if (finalResponse instanceof SuccessfulResponse){
            LOG.info("LOG: Perfiles de grado con tutor y relator encontrado");
            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
        } else if (finalResponse instanceof UnsuccessfulResponse){
            LOG.error("LOG: Problemas al conseguir perfiles de grado con tutor y relator - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
        }
        return ResponseEntity.status(responseCode).body(finalResponse);
    }
    // Method to assign new title
    @PutMapping("/title")
    public ResponseEntity<Object> assignTitleToAnActiveGradeProfile(@RequestParam(value = "idGradePro") Long idGradePro,@RequestParam(value = "title") String title){
        Object finalResponse = gradeProfileBl.updateTitleForActiveGradeProfile(idGradePro, title);
        int responseCode = 0;
        if (finalResponse instanceof SuccessfulResponse){
            LOG.info("LOG: Título asignado correctamente");
            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
        } else if (finalResponse instanceof UnsuccessfulResponse){
            LOG.error("LOG: Error al asignar nuevo título - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
        }
        return ResponseEntity.status(responseCode).body(finalResponse);
    }

    // Method to assign new graduation mode
    @PutMapping("/graduation-mode")
    public ResponseEntity<Object> assignGraduationModeToAnActiveGradeProfile(@RequestParam(value = "idGradePro") Long idGradePro,@RequestParam(value = "newGraduationMode") int newGraduationMode){
        Object finalResponse = gradeProfileBl.updateGraduationMOdeForActiveGradeProfile(idGradePro, newGraduationMode);
        int responseCode = 0;
        if (finalResponse instanceof SuccessfulResponse){
            LOG.info("LOG: Modalidad de graduación asignada correctamente");
            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
        } else if (finalResponse instanceof UnsuccessfulResponse){
            LOG.error("LOG: Error al asignar nueva modalidad de graduación - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
        }
        return ResponseEntity.status(responseCode).body(finalResponse);
    }

    // Method to assign new graduation mode
    @PutMapping("/workshop")
    public ResponseEntity<Object> assignWorkShopToAnActiveGradeProfile(@RequestParam(value = "idGradePro") Long idGradePro,@RequestParam(value = "newWorkShop") int newWorkShop){
        Object finalResponse = gradeProfileBl.updateWorkShopForActiveGradeProfile(idGradePro, newWorkShop);
        int responseCode = 0;
        if (finalResponse instanceof SuccessfulResponse){
            LOG.info("LOG: Taller de grado asignado correctamente");
            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
        } else if (finalResponse instanceof UnsuccessfulResponse){
            LOG.error("LOG: Error al asignar nuevo taller de grado - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
        }
        return ResponseEntity.status(responseCode).body(finalResponse);
    }

}
