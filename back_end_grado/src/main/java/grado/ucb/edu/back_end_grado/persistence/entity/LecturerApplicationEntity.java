package grado.ucb.edu.back_end_grado.persistence.entity;
import jakarta.persistence.*;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@Entity(name = "lecturer_application")
@Table(name = "lecturer_application")
public class LecturerApplicationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tutor_application", nullable = false)
    private Long idTutorApplication;
    @ManyToOne
    @JoinColumn(name = "role_has_person_id_role_per", referencedColumnName = "id_role_per", nullable = false)
    private RoleHasPersonEntity roleHasPersonIdRolePer;
    @ManyToOne
    @JoinColumn(name = "grade_profile_id_grade_pro", referencedColumnName = "id_grade_pro")
    private GradeProfileEntity gradeProfileIdGradePro;
    @Column(name = "is_accepted", nullable = false)
    private int isAccepted;
    @Column(name = "tutorlecturer", nullable = false)
    private int tutorLecturer;
    @Column(name = "status", nullable = false)
    private int status;
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate(){
        status = 1;
        createdAt = LocalDateTime.now();
    }

    public Long getIdTutorApplication() {
        return idTutorApplication;
    }

    public void setIdTutorApplication(Long idTutorApplication) {
        this.idTutorApplication = idTutorApplication;
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

    public int getIsAccepted() {
        return isAccepted;
    }

    public void setIsAccepted(int isAccepted) {
        this.isAccepted = isAccepted;
    }

    public int getTutorLecturer() {
        return tutorLecturer;
    }

    public void setTutorLecturer(int tutorLecturer) {
        this.tutorLecturer = tutorLecturer;
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
}
