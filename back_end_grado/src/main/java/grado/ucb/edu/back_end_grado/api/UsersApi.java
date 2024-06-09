package grado.ucb.edu.back_end_grado.api;

import grado.ucb.edu.back_end_grado.bl.UserDetailServiceImpl;
import grado.ucb.edu.back_end_grado.bl.UsersBl;
import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.AuthLoginrequest;
import grado.ucb.edu.back_end_grado.dto.request.EditUserByIdRequest;
import grado.ucb.edu.back_end_grado.dto.request.UpdateUserRequest;
import grado.ucb.edu.back_end_grado.dto.request.UsersRequest;
import grado.ucb.edu.back_end_grado.dto.response.AuthResponse;
import grado.ucb.edu.back_end_grado.dto.response.UserInformationResponse;
import grado.ucb.edu.back_end_grado.util.Globals;
import io.micrometer.common.lang.NonNull;
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
            @PageableDefault(sort = "createdAt", direction = Sort.Direction.ASC) Pageable pageable,
            @RequestParam(value = "filter", required = false) String filter
    ) {
        LOG.info("Listando todos los usuarios con filtro: {}", filter);
        Object response = usersBl.listUsers(pageable, filter);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Obtener detalles de un usuario por ID", description = "Obtiene los detalles de un usuario por su ID")
    //@PreAuthorize("hasAuthority('ROLE_COORDINADOR')")
    @GetMapping("/{userId}")
    public ResponseEntity<Object> getUserDetailsById(@PathVariable Long userId) {
        Object response = usersBl.getUserDetailsById(userId);
        return generateResponse(response);
    }

    @Operation(summary = "Actualizar un usuario por ID", description = "Actualiza un usuario por su ID")
    //@PreAuthorize("hasAuthority('ROLE_COORDINADOR')")
    @PutMapping("/{id}")
    public ResponseEntity<?> editUserById(@PathVariable Long id, @RequestBody EditUserByIdRequest request) {
        Object response = usersBl.editUserById(id, request);
        return ResponseEntity.status(response instanceof SuccessfulResponse ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    @Operation(summary = "Eliminar un usuario por ID", description = "Elimina un usuario por su ID")
    //@PreAuthorize("hasAuthority('ROLE_COORDINADOR')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUserById(@PathVariable Long id) {
        Object response = usersBl.deleteUserById(id);
        return ResponseEntity.status(response instanceof SuccessfulResponse ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR).body(response);
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
            description = "Otorga acceso al sistema acorde al tipo de cuenta del usuario")
    @PostMapping("/log-in")
    public ResponseEntity<AuthResponse> login(@RequestBody @Valid AuthLoginrequest authLoginrequest, HttpServletResponse response) {
        AuthResponse authResponse = userDetailService.loginUser(authLoginrequest, response);

        // Devuelve la respuesta sin el JWT en el cuerpo
        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

    @Operation(
            summary = "Obtener información de usuario y persona por ID",
            description = "Obtiene la información de usuario y persona por el ID del usuario")
    @GetMapping("/users-information/{userId}")
    public ResponseEntity<Object> getUserInformation(@PathVariable Long userId) {
        UserInformationResponse response = usersBl.getUserInformation(userId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Operation(
            summary = "Update user details",
            description = "Updates the specified details for a user by their user ID")
    @PutMapping("/update/{userId}")
    public ResponseEntity<Object> updateUserDetails(@PathVariable Long userId, @RequestBody UpdateUserRequest request) {
        LOG.info("API called to update user details for user ID: {}", userId);
        try {
            Object response = usersBl.updateUserDetails(userId, request);
            return generateResponse(response);
        } catch (Exception e) {
            LOG.error("Failed to update user details", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new UnsuccessfulResponse("500", "Internal Server Error", e.getMessage()));
        }
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
