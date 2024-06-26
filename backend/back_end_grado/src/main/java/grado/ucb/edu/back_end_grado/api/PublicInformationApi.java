package grado.ucb.edu.back_end_grado.api;

import grado.ucb.edu.back_end_grado.bl.PublicInformationBl;
import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.PublicInformationRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import grado.ucb.edu.back_end_grado.util.Globals;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@RestController
@RequestMapping(Globals.apiVersion+"publicInformation")
@Tag(
        name ="API - Gestión información pública",
        description = "Endpoint para la publicación y manejo de información pública"
)
public class PublicInformationApi {
    private final PublicInformationBl publicInformationBl;
    private static final Logger LOG = LoggerFactory.getLogger(PublicInformationApi.class);

    public PublicInformationApi(PublicInformationBl publicInformationBl) {
        this.publicInformationBl = publicInformationBl;
    }

    // New public information
    @Operation(
            summary = "Crear y programar la publicación de información pública",
            description = "Permite la creación de una nueva entrada de información pública"
    )
    //@PreAuthorize("hasAuthority('ROLE_COORDINADOR')")
    @PostMapping("/new")
    public ResponseEntity<Object> postPublicInformation(@RequestBody PublicInformationRequest publicInformationRequest){
        Object finalResponse = publicInformationBl.newPublicInformation(publicInformationRequest);
        int responseCode = 0;
        if (finalResponse instanceof SuccessfulResponse){
            LOG.info("LOG: Información pública registrada exitosamente");
            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
        } else if (finalResponse instanceof UnsuccessfulResponse){
            LOG.error("LOG: Error al crear nueva informacion pública - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
        }
        return ResponseEntity.status(responseCode).body(finalResponse);
    }

    // Get all active public information (open to all public)
    @Operation(
            summary = "Obtener toda la información pública con fechas de publicación activas",
            description = "Obtiene todas las entradas de información pública, a ser mostradas para todo público"
    )

    @GetMapping("/")
    public Object getAllActivePublicInformation(@PageableDefault(sort = "publicationDate", direction = Sort.Direction.ASC) Pageable pageable){
        Object finalResponse = publicInformationBl.getAllActiveWithPublishDatePublicInformation(pageable);
        if (finalResponse instanceof SuccessfulResponse){
            LOG.info("LOG: Todos los registros de información pública encontrados");
        } else if (finalResponse instanceof UnsuccessfulResponse){
            LOG.error("LOG: Error al buscar registros de información pública - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
        }
        return finalResponse;
    }

    // Get all active public information (open only for coordinator)
    @Operation(
            summary = "Obtener toda la información pública, con fechas de publicación activas y desactivas",
            description = "Obtiene todas las entradas de información pública "
    )
    //@PreAuthorize("hasAuthority('ROLE_COORDINADOR')")
    @GetMapping("/c")
    public Object getAllActivePublicInformationCoordinator(@PageableDefault(sort = "createdAt", direction = Sort.Direction.ASC) Pageable pageable){
        Object finalResponse = publicInformationBl.getAllActivePublicInformation(pageable);
        if (finalResponse instanceof SuccessfulResponse){
            LOG.info("LOG: Todos los registros de información pública encontrados");
        } else if (finalResponse instanceof UnsuccessfulResponse){
            LOG.error("LOG: Error al buscar registros de información pública - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
        }
        return finalResponse;
    }

    // Get one public information entry by its id and only if its active
    @Operation(
            summary = "Obtener información pública por su llave primaria",
            description = "Obtiene un registro de información pública basado en el parámetro real de su llave pública "
    )
    //@PreAuthorize("hasAuthority('ROLE_COORDINADOR')")
    @GetMapping("")
    public Object getActivePublicInformationById(@RequestParam("idPublicInfo") final String idPublicInfo){
        Object finalResponse = publicInformationBl.getActivePublicInformationById(idPublicInfo);
        if (finalResponse instanceof SuccessfulResponse){
            LOG.info("LOG: Registro de información pública encontrado");
        } else if (finalResponse instanceof UnsuccessfulResponse){
            LOG.error("LOG: Error al buscar registro de información pública - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
        }
        return finalResponse;
    }

    // Logically delete active public information by its id
    @Operation(
            summary = "Eliminar un registro de información pública ",
            description = "Elimina un registro de información pública en base al parámetro real de su llave primaria "
    )
    //@PreAuthorize("hasAuthority('ROLE_COORDINADOR')")
    @DeleteMapping("")
    public ResponseEntity<Object> deleteActivePublicInformationById(@RequestParam("idPublicInfo") final String idPublicInfo){
        Object finalResponse = publicInformationBl.deleteActivePublicInformationById(idPublicInfo);
        int responseCode = 0;
        if (finalResponse instanceof SuccessfulResponse){
            LOG.info("LOG: Registro de información pública eliminado");
            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
        } else if (finalResponse instanceof UnsuccessfulResponse){
            LOG.error("LOG: Error al eliminar registro de información pública - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
        }
        return ResponseEntity.status(responseCode).body(finalResponse);
    }

    @Operation(
            summary = "Modificar un registro activo de información pública",
            description = "Modifica todos los campos de un registro de información pública"
    )
    //@PreAuthorize("hasAuthority('ROLE_COORDINADOR')")
    @PatchMapping("/")
    public ResponseEntity<Object> patchActivePublicInformationById(@RequestBody PublicInformationRequest publicInformationRequest){
        Object finalResponse = publicInformationBl.patchActivePublicInformationById(publicInformationRequest);
        int responseCode = 0;
        if (finalResponse instanceof SuccessfulResponse){
            LOG.info("LOG: Información pública modifiada exitosamente");
            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
        } else if (finalResponse instanceof UnsuccessfulResponse){
            LOG.error("LOG: Error al modificar registro de información pública - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
        }
        return ResponseEntity.status(responseCode).body(finalResponse);
    }

}
