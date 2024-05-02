package grado.ucb.edu.back_end_grado.api;

import grado.ucb.edu.back_end_grado.bl.TaskHasDateBl;
import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;

import grado.ucb.edu.back_end_grado.dto.request.TaskHasDateListRequest;
import grado.ucb.edu.back_end_grado.dto.request.TaskHasDateRequest;
import grado.ucb.edu.back_end_grado.util.Globals;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.List;

@RestController
@RequestMapping(Globals.apiVersion+"task-date")
@Tag(
        name ="API - Programación de tareas para un periodo académico",
        description = "Endpoint que permite la programación de tareas durante un periodo académico"
)
public class TaskHasDateApi {
    private final TaskHasDateBl taskHasDateBl;
    private static final Logger LOG = LoggerFactory.getLogger(TaskHasDateApi.class);

    public TaskHasDateApi(TaskHasDateBl taskHasDateBl) {
        this.taskHasDateBl = taskHasDateBl;
    }

    @Operation(
            summary = "Asignar un horario a una tarea, para un periodo académico",
            description = "Asigna una tarea a un periodo académico, con una fecha de inicio y final"
    )
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
    @Operation(
            summary = "Obtener todas las tareas con fecha activas, por periodo académico",
            description = "Obtiene todas las tareas activas designadas para un periodo académico"
    )
    @GetMapping("")
    public ResponseEntity<Object> getActiveTaskForAcademicPeriodOrderedByItsOrder(@RequestParam("idAcad") final Long idAcad, @RequestParam("isGradeoneortwo") final int isGradeoneortwo){
        Object finalResponse = taskHasDateBl.getTasksByAcademicPeriodAndIsGradeOneOrTwo(idAcad, isGradeoneortwo);
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

    @PostMapping("/list")
    public ResponseEntity<Object> postTasksToAcademicPeriod(@RequestBody TaskHasDateListRequest tasks){
        Object finalResponse = taskHasDateBl.newTasksToAcademicPeriod(tasks);
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
