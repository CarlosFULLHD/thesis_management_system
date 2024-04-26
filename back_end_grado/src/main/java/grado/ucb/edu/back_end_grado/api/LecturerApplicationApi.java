package grado.ucb.edu.back_end_grado.api;

import grado.ucb.edu.back_end_grado.bl.LecturerApplicationBl;
import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.GradeProfileRequest;
import grado.ucb.edu.back_end_grado.dto.request.LecturerApplicationRequest;
import grado.ucb.edu.back_end_grado.util.Globals;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.coyote.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@RestController
@RequestMapping(Globals.apiVersion+"lecturer")
@Tag(
        name ="API - Gestión de relatores y tutores",
        description = "Endpoint para el manejo de tutores y relatores"
)
public class LecturerApplicationApi {

    private LecturerApplicationBl lecturerApplicationBl;

    private static final Logger LOG = LoggerFactory.getLogger(LecturerApplicationApi.class);

    public LecturerApplicationApi(LecturerApplicationBl lecturerApplicationBl) {
        this.lecturerApplicationBl = lecturerApplicationBl;
    }

    // Request new lecturer for grade project
    @Operation(
            summary = "Envía solicitud de relator o tutor",
            description = "Enviar solicitud para asignar a un docente como relator o tutor de un proyecto de grado activo"
    )
    @PostMapping("/request-tutor")
    public ResponseEntity<Object> requestLecturerForProject(@RequestBody LecturerApplicationRequest lecturerApplicationRequest){
        Object finalResponse = lecturerApplicationBl.requestNewTutor(lecturerApplicationRequest);
        int responseCode = 0;
        if(finalResponse instanceof SuccessfulResponse){
            LOG.info("LOG: Petición de tutor registrada exitosamente");
            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
        } else if (finalResponse instanceof UnsuccessfulResponse){
            LOG.error("LOG: Error al crear petición para tutor - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
        }
        return ResponseEntity.status(responseCode).body(finalResponse);
    }

    @Operation(
            summary = "Obtener a tutor y relator asignado a un proyecto de grado",
            description = "Obtiene a los docentes que fueron asignados como tutor o relator, para un proyecto de grado según el parámetro formal de llave primaria"
    )
    @GetMapping("/lecturers")
    public ResponseEntity<Object> requestLecturersForProject(@RequestParam("idGradeProfile") final String idGradeProfile) {
        Object finalResponse = lecturerApplicationBl.lecturersAssignment(idGradeProfile);
        if (finalResponse instanceof SuccessfulResponse) {
            LOG.info("Relatores asignados obtenidos correctamente");
        } else if (finalResponse instanceof UnsuccessfulResponse) {
            LOG.error("Error al obtener relatores asignados " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            return new ResponseEntity<>(finalResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(finalResponse, HttpStatus.OK);
    }

    @PutMapping("/assignTutor")
    public ResponseEntity<Object> assignTutorByProject(@RequestParam("idStudent") final Long idStudent, @RequestParam("idTutor") final Long idTutor) {
        LOG.info("Estudiante: " + idStudent + "\nTutor: " + idTutor);
        Object finalResponse = lecturerApplicationBl.assignTutor(idStudent, idTutor);
        int responseCode = 0;
        if (finalResponse instanceof SuccessfulResponse) {
            LOG.info("Tutor asignado correctamente");
            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
        } else if (finalResponse instanceof UnsuccessfulResponse) {
            LOG.error("Error al asignar tutor " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
        }
        return ResponseEntity.status(responseCode).body(finalResponse);
    }

}
