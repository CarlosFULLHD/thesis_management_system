package grado.ucb.edu.back_end_grado.api;

import grado.ucb.edu.back_end_grado.bl.GradeProfileHasTaskBl;
import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.util.Globals;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@RestController
@RequestMapping(Globals.apiVersion+"grade-profile-tasks")
@Tag(
        name ="API - Gestión de tareas para un perfil de grado",
        description = "Asignación, modificación y aprobación de tareas para un perfil de grado activo"
)
public class GradeProfileHasTaskApi {
    private final GradeProfileHasTaskBl gradeProfileHasTaskBl;
    private static final Logger LOG = LoggerFactory.getLogger(GradeProfileHasTaskApi.class);

    public GradeProfileHasTaskApi(GradeProfileHasTaskBl gradeProfileHasTaskBl) {
        this.gradeProfileHasTaskBl = gradeProfileHasTaskBl;
    }

    // Method to retrieve all active tuples of grade profile has task table
    @Operation(
            summary = "Obtener todas las tareas asignadas a todos los perfiles de grado",
            description = "Obtiene todas las tareas asignadas a todos los diferentes perfiles de grado existenes"
    )
    @GetMapping("/")
    public ResponseEntity<Object>  getAllActiveGradeProfileHasTask() {
        Object finalResponse = gradeProfileHasTaskBl.getActiveGradeProfileHasTaskBl();
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

    // Method to retrieve current active task by grade profile
    @Operation(
            summary = "Obtener la tarea actual de todos los perfiles de grado",
            description = "Obtiene todas las tareas actuales de los perfiles de grado activos"
    )
    @GetMapping("/tasks/")
    public ResponseEntity<Object>  getIsCurrentTaskByGradeProfile() {
        Object finalResponse = gradeProfileHasTaskBl.getIsCurrentTaskByGradeProfile();
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
}
