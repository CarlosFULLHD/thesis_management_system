package grado.ucb.edu.back_end_grado.api;

import grado.ucb.edu.back_end_grado.bl.TaskStatesBl;
import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.TaskStatesRequest;
import grado.ucb.edu.back_end_grado.util.Globals;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@RestController
@RequestMapping(Globals.apiVersion+"task-states")
@Tag(
        name ="API - Manejo de estados para las tareas",
        description = "Endpoint para manejar los posibles estados de una tarea asignada a un periodo académico y a ún perfil de grado"
)
public class TaskStatesApi {
    private final TaskStatesBl taskStatesBl;
    private static final Logger LOG = LoggerFactory.getLogger(TaskStatesApi.class);

    public TaskStatesApi(TaskStatesBl taskStatesBl) {
        this.taskStatesBl = taskStatesBl;
    }

    // Create new task state
    @Operation(
            summary = "Crear un nuevo estado para una tarea",
            description = "Crea un nuevo estado para una tarea, vinculada a un periodo académico y a un perfil de grado"
    )
    @PostMapping("/")
    public ResponseEntity<Object> postNewTaskState(@RequestBody TaskStatesRequest requestTaskStates){
        Object finalResponse = taskStatesBl.newTaskState(requestTaskStates);
        int responseCode = 0;
        if (finalResponse instanceof SuccessfulResponse) {
            LOG.info("LOG: Estado de tarea creada exitosamente");
            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
        } else if (finalResponse instanceof UnsuccessfulResponse){
            LOG.error("LOG: Error al crear nuevo estado para tarea - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
        }
        return ResponseEntity.status(responseCode).body(finalResponse);
    }
}
