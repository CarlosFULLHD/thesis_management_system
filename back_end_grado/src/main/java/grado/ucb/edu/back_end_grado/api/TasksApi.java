package grado.ucb.edu.back_end_grado.api;

import grado.ucb.edu.back_end_grado.bl.TasksBl;
import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.TasksRequest;
import grado.ucb.edu.back_end_grado.util.Globals;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@RestController
@RequestMapping(Globals.apiVersion+"task")
public class TasksApi {
    private TasksBl tasksBl;
    private static final Logger LOG = LoggerFactory.getLogger(TasksApi.class);

    public TasksApi(TasksBl tasksBl) {
        this.tasksBl = tasksBl;
    }

    // POST => new task
    @PostMapping("/")
    public ResponseEntity<Object> postTasks(@RequestBody TasksRequest request){
        Object finalResponse = tasksBl.assignTask(request);
        int responseCode = 0;
        if (finalResponse instanceof SuccessfulResponse) {
            LOG.info("LOG: Tarea asignada exitosamente");
            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
        } else if (finalResponse instanceof UnsuccessfulResponse) {
            LOG.error("LOG: Error al asignar tarea - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest requestHttp = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = requestHttp.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
        }
        return ResponseEntity.status(responseCode).body(finalResponse);
    }

    // GET => all tasks by a gradeProfile PK
    @GetMapping()
    public ResponseEntity<Object> getTasksByGradeProfilePk(@RequestParam(value = "idGradePro") Long idGradePro){
        Object finalResponse = tasksBl.getTasksForAGradeProfileForCurrentAcademicPeriod(idGradePro);
        int responseCode = 0;
        if (finalResponse instanceof SuccessfulResponse) {
            LOG.info("LOG: Tareas obtenidas, para perfil de grado y periodo academico actual");
            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
        } else if (finalResponse instanceof UnsuccessfulResponse) {
            LOG.error("LOG: Error al obtener tareas para perfil de grado y periodo academico actual - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest requestHttp = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = requestHttp.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
        }
        return ResponseEntity.status(responseCode).body(finalResponse);
    }
}
