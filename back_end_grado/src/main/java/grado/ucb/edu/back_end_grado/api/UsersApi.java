package grado.ucb.edu.back_end_grado.api;

import grado.ucb.edu.back_end_grado.bl.UserDetailServiceImpl;
import grado.ucb.edu.back_end_grado.bl.UsersBl;
import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.AuthLoginrequest;
import grado.ucb.edu.back_end_grado.dto.request.UsersRequest;
import grado.ucb.edu.back_end_grado.dto.response.AuthResponse;
import grado.ucb.edu.back_end_grado.util.Globals;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
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
import org.springframework.security.access.prepost.PreAuthorize;
@RestController
@RequestMapping(Globals.apiVersion+"users")
@Tag(
        name ="API - Usuarios",
        description = "Endpoint la creación de usuarios e ingreso al sistema"
)
public class UsersApi {

    @Autowired
    private UserDetailServiceImpl userDetailService;

    private final UsersBl usersBl;
    private static final Logger LOG = LoggerFactory.getLogger(UsersApi.class);

    public UsersApi(UsersBl usersBl) {
        this.usersBl = usersBl;
    }


    @Operation(summary = "Listar usuarios", description = "Listar TODOS los usuarios con paginación, filtro y ordenamiento")
    //@PreAuthorize("hasAuthority('ROLE_COORDINADOR')")
    @GetMapping
    public ResponseEntity<Object> listUsers(
            @PageableDefault(sort = "username", direction = Sort.Direction.ASC) Pageable pageable,
            @RequestParam(required = false) String filter)
             {
        Object response = usersBl.listUsers(pageable,filter);
        return generateResponse(response);
    }

    @Operation(summary = "Obtener detalles de un usuario por ID", description = "Obtiene los detalles de un usuario por su ID")
    //@PreAuthorize("hasAuthority('ROLE_COORDINADOR')")
    @GetMapping("/{userId}")
    public ResponseEntity<Object> getUserDetailsById(@PathVariable Long userId) {
        Object response = usersBl.getUserDetailsById(userId);
        return generateResponse(response);
    }



    // Create new account for a "ESTUDIANTE"
    // Ya funciona el token para usuarios autenticados
    //@PreAuthorize("hasAuthority('ROLE_COORDINADOR')")
    @Operation(
            summary = "Crear un usuario para - ESTUDIANTE",
            description = "Crear una cuenta para un ESTUDIANTE dentro del sistema"
    )
    @PostMapping("/student")
    public ResponseEntity<Object> postNewStudentAccount(@RequestBody UsersRequest usersRequest){
        Object finalResponse = usersBl.newAccount(usersRequest,"ESTUDIANTE");
        int responseCode = 0;
        if (finalResponse instanceof SuccessfulResponse) {
            LOG.info("LOG: Cuenta de estudiante creada exitosamente");
            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
        } else if (finalResponse instanceof UnsuccessfulResponse){
            LOG.error("LOG: Error al crear nueva cuenta para estudiante - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
        }
        return ResponseEntity.status(responseCode).body(finalResponse);
    }
    // Create new account for a "DOCENTE"
    @Operation(
            summary = "Crear un usuario para - DOCENTE",
            description = "Crear una cuenta para un DOCENTE dentro del sistema"
    )
        @PostMapping("/professor")
    public ResponseEntity<Object> postNewProfessorAccount(@RequestBody UsersRequest usersRequest){
        Object finalResponse = usersBl.newAccount(usersRequest, "DOCENTE");
        int responseCode = 0;
        if (finalResponse instanceof SuccessfulResponse) {
            LOG.info("LOG: Cuenta de docente creada exitosamente");
            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
        } else if (finalResponse instanceof UnsuccessfulResponse){
            LOG.error("LOG: Error al crear nueva cuenta para docente - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
        }
        return ResponseEntity.status(responseCode).body(finalResponse);
    }

    // Create new account for a "COORDINADOR"
    @Operation(
            summary = "Crear un usuario para - COORDINADOR",
            description = "Crear una cuenta para un COORDINADOR dentro del sistema"
    )
    @PostMapping("/coordinator")
    public ResponseEntity<Object> postNewCordinatorAccount(@RequestBody UsersRequest usersRequest){
        Object finalResponse = usersBl.newAccount(usersRequest,"COORDINADOR");
        int responseCode = 0;
        if (finalResponse instanceof SuccessfulResponse) {
            LOG.info("LOG: Cuenta de coordinador creada exitosamente");
            responseCode = Integer.parseInt(((SuccessfulResponse) finalResponse).getStatus());
        } else if (finalResponse instanceof UnsuccessfulResponse){
            LOG.error("LOG: Error al crear nueva cuenta para coordinador - " + ((UnsuccessfulResponse) finalResponse).getPath());
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String requestPath = request.getRequestURI();
            ((UnsuccessfulResponse) finalResponse).setPath(requestPath);
            responseCode = Integer.parseInt(((UnsuccessfulResponse) finalResponse).getStatus());
        }
        return ResponseEntity.status(responseCode).body(finalResponse);
    }
//Login de Cristopher mandando JWT
//    @PostMapping("/log-in")
//    public ResponseEntity<AuthResponse> login(@RequestBody @Valid AuthLoginrequest authLoginrequest) {
//        System.out.println(authLoginrequest.toString());
//        return new ResponseEntity<>(this.userDetailService.loginUser(authLoginrequest), HttpStatus.OK);
//    }

    @Operation(
            summary = "Acceso al sistema de manera autenticada",
            description = "Otorga acceso al sistema acorde al tipo de cuenta del usuario"
    )
    @PostMapping("/log-in")
    public ResponseEntity<AuthResponse> login(@RequestBody @Valid AuthLoginrequest authLoginrequest, HttpServletResponse response) {
        AuthResponse authResponse = userDetailService.loginUser(authLoginrequest, response);

        // Devuelve la respuesta sin el JWT en el cuerpo
        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }
    private ResponseEntity<Object> generateResponse(Object response) {
        if (response instanceof SuccessfulResponse) {
            return ResponseEntity.ok(response);
        } else if (response instanceof UnsuccessfulResponse) {
            return ResponseEntity.status(Integer.parseInt(((UnsuccessfulResponse) response).getStatus()))
                    .body(response);
        } else {
            return ResponseEntity.status(Integer.parseInt(Globals.httpInternalServerErrorStatus[0])).body(response);
        }
    }

}
