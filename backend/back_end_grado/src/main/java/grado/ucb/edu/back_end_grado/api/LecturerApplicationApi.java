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
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
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

    @PutMapping("/assignProfessor")
    public ResponseEntity<Object> assignProfessorByProject(@RequestBody LecturerApplicationRequest lecturerApplicationRequest) {
        LOG.info("Datos: " + lecturerApplicationRequest.getGradeProfileIdGradePro().getIdGradePro());
        Object finalResponse = lecturerApplicationBl.assignProfessor(lecturerApplicationRequest);
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

    @GetMapping("/studentsAndProfessorsByProject")
    public ResponseEntity<?> getStudentsAndProfessorsByProject(
            @PageableDefault(sort = "name", direction = Sort.Direction.ASC) Pageable pageable,
            @RequestParam(value = "filter", required = false) String filter
    ) {
        Object response = lecturerApplicationBl.findAllStudentsAndTutorsByActiveGradeProfile(filter, pageable);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/studentsAndLecturersByProject")
    public ResponseEntity<?> getStudentsAndLecturersByProject(
            @PageableDefault(sort = "name", direction = Sort.Direction.ASC) Pageable pageable,
            @RequestParam(value = "filter", required = false) String filter
    ) {
        Object response = lecturerApplicationBl.findAllStudentsAndLecturersByActiveGradeProfile(filter, pageable);
        return ResponseEntity.ok(response);
    }

    // Assign new tutor to a grede profile
    @PostMapping("/tutor")
    public ResponseEntity<Object> assignTutor(@RequestParam("idGradePro") final Long idGradePro,@RequestParam("idRolePer") final Long idRolePer, @RequestParam(value = "idLecturerApplication", required = false) final Long idLecturerApplication){
        Object finalResponse = lecturerApplicationBl.assignTutorOrLecturer(idGradePro,idRolePer,false, idLecturerApplication);
        int responseCode = 0;
        if(finalResponse instanceof SuccessfulResponse){
            LOG.info("LOG: Tutor asignado exitosamente");
            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
        } else if (finalResponse instanceof UnsuccessfulResponse){
            LOG.error("LOG: Error al asignar tutor - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
        }
        return ResponseEntity.status(responseCode).body(finalResponse);
    }


    // Assign new tutor to a grede profile
    @PostMapping("/lecturer")
    public ResponseEntity<Object> assignLecturer(@RequestParam("idGradePro") final Long idGradePro,@RequestParam("idRolePer") final Long idRolePer, @RequestParam(value = "idLecturerApplication", required = false) final Long idLecturerApplication){
        Object finalResponse = lecturerApplicationBl.assignTutorOrLecturer(idGradePro,idRolePer,true, idLecturerApplication);
        int responseCode = 0;
        if(finalResponse instanceof SuccessfulResponse){
            LOG.info("LOG: Relator asignado exitosamente");
            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
        } else if (finalResponse instanceof UnsuccessfulResponse){
            LOG.error("LOG: Error al asignar relator - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
        }
        return ResponseEntity.status(responseCode).body(finalResponse);
    }

    // Get my students if im a tutor of them
    @GetMapping("/student-tutor")
    public ResponseEntity<Object> getMyStudentsTutor(@RequestParam("idUsers") final Long idUsers){
        Object finalResponse = lecturerApplicationBl.getTeacherTutorGradeProfiles(idUsers, false);
        int responseCode = 0;
        if(finalResponse instanceof SuccessfulResponse){
            LOG.info("LOG: Mis estudiantes de los cuales soy tutor conseguidos");
            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
        } else if (finalResponse instanceof UnsuccessfulResponse){
            LOG.error("LOG: Error al conseguir estudiantes de los cuales soy tutor - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
        }
        return ResponseEntity.status(responseCode).body(finalResponse);
    }

    // Get my students if im a tutor of them
    @GetMapping("/student-lecturer")
    public ResponseEntity<Object> getMyStudentsLecturer(@RequestParam("idUsers") final Long idUsers){
        Object finalResponse = lecturerApplicationBl.getTeacherTutorGradeProfiles(idUsers, true);
        int responseCode = 0;
        if(finalResponse instanceof SuccessfulResponse){
            LOG.info("LOG: Mis estudiantes de los cuales soy relator conseguidos");
            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
        } else if (finalResponse instanceof UnsuccessfulResponse){
            LOG.error("LOG: Error al conseguir estudiantes de los cuales soy relator - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
        }
        return ResponseEntity.status(responseCode).body(finalResponse);
    }







}
