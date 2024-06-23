package grado.ucb.edu.back_end_grado.api;

import grado.ucb.edu.back_end_grado.bl.AcademicPeriodBl;
import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.AcademicPeriodRequest;
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
@RequestMapping(Globals.apiVersion+"academic-period")
@Tag(
        name ="API - Periodo académico",
        description = "Endpoint que permite la vinculación de un semestre a un periodo académico dando inicio y fin a un semestre"
)
public class AcademicPeriodApi {

    private AcademicPeriodBl academicPeriodBl;
    private static final Logger LOG = LoggerFactory.getLogger(AcademicPeriodApi.class);

    public AcademicPeriodApi(AcademicPeriodBl academicPeriodBl) {
        this.academicPeriodBl = academicPeriodBl;
    }

    // Create new academic period
    @Operation(
            summary = "Crear un nuevo periodo académico",
            description = "Añade un periodo académico, si el usuario tiene el rol de 'COORDINADOR'"
    )
    @PostMapping("/")
    public ResponseEntity<Object> postAcademicPeriod(@RequestBody AcademicPeriodRequest requestAcademic) {
        Object finalResponse = academicPeriodBl.newAcademicPeriod(requestAcademic);
        int responseCode = 0;
        if (finalResponse instanceof SuccessfulResponse) {
            LOG.info("LOG: Periodo academico registrado");
            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
        } else if (finalResponse instanceof UnsuccessfulResponse) {
            LOG.error("LOG: Error al registrar periodo academico - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
        }
        return ResponseEntity.status(responseCode).body(finalResponse);
    }
    // Get an academic period based on current date and time
    @Operation(
            summary = "Obtener el periodo académico actual",
            description = "Obtener el periodo académico actual basado en la fecha actual"
    )
    @GetMapping("/current-one/")
    public ResponseEntity<Object> getCurrentActiveAcademicPeriod(){
        Object finalResponse = academicPeriodBl.getCurrentActiveAcademicPeriod();
        int responseCode = 0;
        if (finalResponse instanceof SuccessfulResponse) {
            LOG.info("LOG: Se logro encontrar un periodo académico actual");
            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
        } else if (finalResponse instanceof UnsuccessfulResponse) {
            LOG.error("LOG: No existen periodos académicos para esta fecha - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
        }
        return ResponseEntity.status(responseCode).body(finalResponse);
    }
    @Operation(
            summary = "Obtener el periodo activo, por su llave primaria",
            description = "Obtener el periodo académico si se encuentra activo, según el parámetro real de llave primaria"
    )
    // Get active academic period by its id
    @GetMapping("")
    public ResponseEntity<Object> getActiveAcademicPeriodByItsId(@RequestParam("idAcad") final Long idAcad){
        Object finalResponse = academicPeriodBl.getAcademicPeriodByItsId(idAcad);
        int responseCode = 0;
        if (finalResponse instanceof SuccessfulResponse) {
            LOG.info("LOG: Periodo académico actual obtenido exitosamente");
            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
        } else if (finalResponse instanceof UnsuccessfulResponse) {
            LOG.error("LOG: Error al eliminar periodo académico - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
        }
        return ResponseEntity.status(responseCode).body(finalResponse);
    }
    // Get active academic period ordered by its date
    @Operation(
            summary = "Obtener periodos académicos activos ordenados por fecha",
            description = "Obtiene los periodos académicos activos y los ordena por fecha"
    )
    @GetMapping("/")
    public ResponseEntity<Object> getAllAcademicPeriodOrderedByDate(){
        Object finalResponse = academicPeriodBl.getOrderedAcademicPeriods();
        int responseCode = 0;
        if (finalResponse instanceof SuccessfulResponse) {
            LOG.info("LOG: Periodos académicos encontrados");
            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
        } else if (finalResponse instanceof UnsuccessfulResponse) {
            LOG.error("LOG: No existen periodos académicos - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
        }
        return ResponseEntity.status(responseCode).body(finalResponse);
    }
    @Operation(
            summary = "Eliminar periodo académico por su llave primaria",
            description = "Elimina un periodo académico lógicamente, por su llave primaria"
    )
    // Delete academic period by it's ID
    @DeleteMapping("")
    public ResponseEntity<Object> deleteActiveAcademicPeriod(@RequestParam("idAcad") final Long idAcad){
        Object finalResponse = academicPeriodBl.deleteAcademicPeriodById(idAcad);
        int responseCode = 0;
        if (finalResponse instanceof SuccessfulResponse) {
            LOG.info("LOG: Periodo académico eliminado exitosamente");
            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
        } else if (finalResponse instanceof UnsuccessfulResponse) {
            LOG.error("LOG: Error al eliminar periodo académico - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
        }
        return ResponseEntity.status(responseCode).body(finalResponse);
    }
    @Operation(
            summary = "Modificar un periodo académico",
            description = "Modifica un periodo académico activo"
    )
    // Update and academic period by it's ID
    @PutMapping("/")
    public ResponseEntity<Object> patchActivePublicInformationById(@RequestBody AcademicPeriodRequest academicPeriodRequest){
        Object finalResponse = academicPeriodBl.updateActiveAcademicPeriodById(academicPeriodRequest);
        int responseCode = 0;
        if (finalResponse instanceof SuccessfulResponse){
            LOG.info("LOG: Periodo académico modificado exitosamente");
            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
        } else if (finalResponse instanceof UnsuccessfulResponse){
            LOG.error("LOG: Error al modificar periodo académico - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
        }
        return ResponseEntity.status(responseCode).body(finalResponse);
    }
}
