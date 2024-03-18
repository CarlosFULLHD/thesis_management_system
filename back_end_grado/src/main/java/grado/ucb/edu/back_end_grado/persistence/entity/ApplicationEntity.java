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

    // Getters and setters
    // ...
}