package grado.ucb.edu.back_end_grado.persistence.entity;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;
import java.util.List;

@Component
@Entity(name = "grade_profile")
@Table(name = "grade_profile")
public class GradeProfileEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_grade_pro", nullable = false)
    private Long idGradePro;
    @ManyToOne
    @JoinColumn(name = "role_has_person_id_role_per", referencedColumnName = "id_role_per", nullable = false)
    private RoleHasPersonEntity roleHasPersonIdRolePer;
    @Column(name = "title", nullable = false, length = 150)
    private String title;
    @Column(name = "status_graduation_mode")
    private int statusGraduationMode;
    @Column(name = "is_gradeoneortwo", nullable = false)
    private int isGradeoneortwo;
    @Column(name = "status", nullable = false)
    private int status;
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    @OneToMany(mappedBy = "gradeProfileIdGradePro", orphanRemoval = true, cascade = CascadeType.ALL)
    List<LecturerApplicationEntity> lecturerApplicationEntityList;

    @OneToMany(mappedBy = "gradeProfileIdGradePro", orphanRemoval = true, cascade = CascadeType.ALL)
    List<AcademicPeriodHasGradeProfileEntity> academicPeriodHasGradeProfileEntityList;

    @PrePersist
    protected void onCreate() {
        status = 1;
        createdAt = LocalDateTime.now();
        isGradeoneortwo = 1;
    }

    public Long getIdGradePro() {
        return idGradePro;
    }

    public void setIdGradePro(Long idGradePro) {
        this.idGradePro = idGradePro;
    }

    public RoleHasPersonEntity getRoleHasPersonIdRolePer() {
        return roleHasPersonIdRolePer;
    }

    public void setRoleHasPersonIdRolePer(RoleHasPersonEntity roleHasPersonIdRolePer) {
        this.roleHasPersonIdRolePer = roleHasPersonIdRolePer;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getStatusGraduationMode() {
        return statusGraduationMode;
    }

    public void setStatusGraduationMode(int statusGraduationMode) {
        this.statusGraduationMode = statusGraduationMode;
    }

    public int getIsGradeoneortwo() {
        return isGradeoneortwo;
    }

    public void setIsGradeoneortwo(int isGradeoneortwo) {
        this.isGradeoneortwo = isGradeoneortwo;
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

    public List<LecturerApplicationEntity> getLecturerApplicationEntityList() {
        return lecturerApplicationEntityList;
    }

    public void setLecturerApplicationEntityList(List<LecturerApplicationEntity> lecturerApplicationEntityList) {
        this.lecturerApplicationEntityList = lecturerApplicationEntityList;
    }

    public List<AcademicPeriodHasGradeProfileEntity> getAcademicPeriodHasGradeProfileEntityList() {
        return academicPeriodHasGradeProfileEntityList;
    }

    public void setAcademicPeriodHasGradeProfileEntityList(List<AcademicPeriodHasGradeProfileEntity> academicPeriodHasGradeProfileEntityList) {
        this.academicPeriodHasGradeProfileEntityList = academicPeriodHasGradeProfileEntityList;
    }
}
