package grado.ucb.edu.back_end_grado.persistence.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Component
@Entity(name = "permissions")
@Table(name = "permissions")
public class PermissionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_permission", nullable = false)
    private Long idPermission;
    @Column(name = "permission", unique = true, length = 75, nullable = false)
    private String permission;
    @Column(name = "status", nullable = false)
    private int status;
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    @OneToMany(mappedBy = "permissionIdPermission", orphanRemoval = true, cascade = CascadeType.ALL)
    List<RolesEntity> roleHasPermission;

}
