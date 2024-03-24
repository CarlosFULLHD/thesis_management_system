package grado.ucb.edu.back_end_grado.persistence.entity;
import jakarta.persistence.*;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;

@Component
@Entity
@Table(name = "application")
public class ApplicationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_application", nullable = false)
    private Long idApplication;

    @ManyToOne
    @JoinColumn(name = "role_has_person_id_role_per", referencedColumnName = "id_role_per")
    private RoleHasPersonEntity roleHasPersonIdRolePer;

    @ManyToOne
    @JoinColumn(name = "grade_profile_id_grade_pro", referencedColumnName = "id_grade_pro")
    private GradeProfileEntity gradeProfileIdGradePro;

    @Column(name = "status_application", nullable = false)
    private int statusApplication;

    @Column(name = "status", nullable = false)
    private int status;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public Long getIdApplication() {
        return idApplication;
    }

    public void setIdApplication(Long idApplication) {
        this.idApplication = idApplication;
    }

    public RoleHasPersonEntity getRoleHasPersonIdRolePer() {
        return roleHasPersonIdRolePer;
    }

    public void setRoleHasPersonIdRolePer(RoleHasPersonEntity roleHasPersonIdRolePer) {
        this.roleHasPersonIdRolePer = roleHasPersonIdRolePer;
    }

    public GradeProfileEntity getGradeProfileIdGradePro() {
        return gradeProfileIdGradePro;
    }

    public void setGradeProfileIdGradePro(GradeProfileEntity gradeProfileIdGradePro) {
        this.gradeProfileIdGradePro = gradeProfileIdGradePro;
    }

    public int getStatusApplication() {
        return statusApplication;
    }

    public void setStatusApplication(int statusApplication) {
        this.statusApplication = statusApplication;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public ApplicationEntity() {
    }

    public ApplicationEntity(Long idApplication, RoleHasPersonEntity roleHasPersonIdRolePer, GradeProfileEntity gradeProfileIdGradePro, int statusApplication, int status, LocalDateTime createdAt) {
        this.idApplication = idApplication;
        this.roleHasPersonIdRolePer = roleHasPersonIdRolePer;
        this.gradeProfileIdGradePro = gradeProfileIdGradePro;
        this.statusApplication = statusApplication;
        this.status = status;
        this.createdAt = createdAt;
    }
}