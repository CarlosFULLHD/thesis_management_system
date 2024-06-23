package grado.ucb.edu.back_end_grado.persistence.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "role_has_permission")
@Table(name = "role_has_permission")
public class RoleHasPermissionEntity {
    @NotNull
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_role_per", nullable = false)
    private Long idRolePer;
    @ManyToOne
    @JoinColumn(name = "permission_id_permission", referencedColumnName = "id_permission")
    private PermissionEntity permissionIdPermission;
    @ManyToOne
    @JoinColumn(name = "roles_id_role", referencedColumnName = "id_role")
    private RolesEntity rolesIdRole;
    @Column(name = "status", nullable = false)
    private int status;
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

}
