package grado.ucb.edu.back_end_grado.api;

import grado.ucb.edu.back_end_grado.bl.RolesBl;
import grado.ucb.edu.back_end_grado.dto.response.RoleResponse;
import grado.ucb.edu.back_end_grado.util.Globals;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(Globals.apiVersion + "roles")
@Tag(name = "API - Gestión de Roles", description = "Endpoint para obtener roles disponibles")
public class RolesApi {

    private final RolesBl rolesBl;
    private static final Logger LOG = LoggerFactory.getLogger(RolesApi.class);

    public RolesApi(RolesBl rolesBl) {
        this.rolesBl = rolesBl;
    }

    @Operation(summary = "Obtener todos los roles disponibles", description = "Obtiene todos los roles disponibles dentro del sistema")
    @GetMapping("/all")
    public ResponseEntity<?> getAllRoles() {
        List<RoleResponse> roles = rolesBl.getAllRoles();
        return ResponseEntity.ok(roles);
    }
}
