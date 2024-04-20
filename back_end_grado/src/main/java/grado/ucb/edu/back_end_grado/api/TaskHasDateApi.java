package grado.ucb.edu.back_end_grado.api;

import grado.ucb.edu.back_end_grado.bl.TaskHasDateBl;
import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.TaskHasDateRequest;
import grado.ucb.edu.back_end_grado.dto.request.TaskRequest;
import grado.ucb.edu.back_end_grado.util.Globals;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@RestController
@RequestMapping(Globals.apiVersion+"task-date")
public class TaskHasDateApi {
    private final TaskHasDateBl taskHasDateBl;
    private static final Logger LOG = LoggerFactory.getLogger(TaskHasDateApi.class);

    public TaskHasDateApi(TaskHasDateBl taskHasDateBl) {
        this.taskHasDateBl = taskHasDateBl;
    }

    @PostMapping("/")
    public ResponseEntity<Object> postTaskHadDate(@RequestBody TaskHasDateRequest requestTask){
        Object finalResponse = taskHasDateBl.newTaskHasDate(requestTask);

        int responseCode = 0;
        if (finalResponse instanceof SuccessfulResponse) {
            LOG.info("LOG: Tarea asignada a periodo académico exitosamente");
            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
        } else if (finalResponse instanceof UnsuccessfulResponse){
            LOG.error("LOG: Error al asignar tarea a periodo académico - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
        }
        return ResponseEntity.status(responseCode).body(finalResponse);
    }

    @GetMapping("")
    public ResponseEntity<Object> getActiveTaskForAcademicPeriodOrderedByItsOrder(@RequestParam("idAcad") final Long idAcad){
        Object finalResponse = taskHasDateBl.getTasksByAcademicPeriod(idAcad);
        int responseCode = 0;
        if (finalResponse instanceof SuccessfulResponse) {
            LOG.info("LOG: Tareas de periodo académico, conseguidas con exito");
            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
        } else if (finalResponse instanceof UnsuccessfulResponse){
            LOG.error("LOG: Error al conseguir tareas de periodo académico - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
        }
        return ResponseEntity.status(responseCode).body(finalResponse);
    }
}
