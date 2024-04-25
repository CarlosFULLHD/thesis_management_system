package grado.ucb.edu.back_end_grado.api;

import grado.ucb.edu.back_end_grado.bl.TaskBl;
import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.TaskRequest;
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

@RestController
@RequestMapping(Globals.apiVersion+"task")
@Tag(
        name ="API - Tareas",
        description = "Endpoint para la creación de tareas a ser asignadas a los talleres de grado"
)
public class TaskApi {
    private final TaskBl taskBl;
    private static final Logger LOG = LoggerFactory.getLogger(TaskApi.class);

    public TaskApi(TaskBl taskBl) {
        this.taskBl = taskBl;
    }
    // Create new task
    @Operation(
            summary = "Crear nueva tarea",
            description = "Crea una nueva tarea, para taller de grado 1 o taller de grado 2"
    )
    @PostMapping("/")
    public ResponseEntity<Object> postNewTaskState(@RequestBody TaskRequest requestTask){
        Object finalResponse = taskBl.newTask(requestTask);
        int responseCode = 0;
        if (finalResponse instanceof SuccessfulResponse) {
            LOG.info("LOG: Tarea creada exitosamente");
            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
        } else if (finalResponse instanceof UnsuccessfulResponse){
            LOG.error("LOG: Error al crear nueva tarea - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
        }
        return ResponseEntity.status(responseCode).body(finalResponse);
    }

    // Get all active tasks by it's workshop
    @Operation(
            summary = "Obtener todos las tareas por taller de grado",
            description = "Obtener tareas acorde al taller de grado, según un parámetro real"
    )
    @GetMapping("/work-shop")
    public Object getTaskByWorkShop(@RequestParam("isGradeoneortwo") final int isGradeoneortwo){
        Object finalResponse = taskBl.getTaskByWorkShop(isGradeoneortwo);
        if (finalResponse instanceof SuccessfulResponse){
            LOG.info("LOG: Todos los registros de tareas recuperados con éxito");
        } else if (finalResponse instanceof UnsuccessfulResponse){
            LOG.error("LOG: Error al buscar registros de tareas - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
        }
        return finalResponse;
    }

    // Get all active task ordered by its id
    @Operation(
            summary = "Obtener todas las tareas activas, ordenadas por su llave primaria",
            description = "Se obtienen todas las tareas activas ordenadas de manera descendente por su llave primaria"
    )
    @GetMapping("/")
    public Object getAllOrderedActiveTask(){
        Object finalResponse = taskBl.getOrderedActiveTasks();
        if (finalResponse instanceof SuccessfulResponse){
            LOG.info("LOG: Todos los registros de tareas recuperados con éxito");
        } else if (finalResponse instanceof UnsuccessfulResponse){
            LOG.error("LOG: Error al buscar registros de tareas - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
        }
        return finalResponse;
    }

    // Logically deleting an active task by its id
    @Operation(
            summary = "Borrar una tarea, basada en su llave primaria",
            description = "Borrar lógicamente una tarea, por el un parámetro real"
    )
    @DeleteMapping("")
    public ResponseEntity<Object> deleteActiveTaskById(@RequestParam("idTask") final String idTask){
        Object finalResponse = taskBl.deleteActiveTaskById(idTask);
        int responseCode = 0;
        if (finalResponse instanceof SuccessfulResponse){
            LOG.info("LOG: Registro de tarea eliminado");
            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
        } else if (finalResponse instanceof UnsuccessfulResponse){
            LOG.error("LOG: Error al eliminar registro de tarea - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
        }
        return ResponseEntity.status(responseCode).body(finalResponse);
    }

    // Update a task by it's ID
    @Operation(
            summary = "Modificar una tarea",
            description = "Modifica una tarea activa"
    )
    @PutMapping("/")
    public ResponseEntity<Object> patchActivePublicInformationById(@RequestBody TaskRequest taskRequest){
        Object finalResponse = taskBl.updateActiveTaskById(taskRequest);
        int responseCode = 0;
        if (finalResponse instanceof SuccessfulResponse){
            LOG.info("LOG: Tarea modifiada exitosamente");
            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
        } else if (finalResponse instanceof UnsuccessfulResponse){
            LOG.error("LOG: Error al modificar registro de tarea - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
        }
        return ResponseEntity.status(responseCode).body(finalResponse);
    }
}
