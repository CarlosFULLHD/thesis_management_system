package grado.ucb.edu.back_end_grado.persistence.entity;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@Entity(name = "academic_has_grade_profile")
@Table(name = "academic_has_grade_profile")
public class AcademicPeriodHasGradeProfileEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_acad_grade", nullable = false)
    private Long idAcadGrade;
    @ManyToOne
    @JoinColumn(name = "grade_profile_id_grade_pro", referencedColumnName = "id_grade_pro", nullable = false)
    private GradeProfileEntity gradeProfileIdGradePro;
    @ManyToOne
    @JoinColumn(name = "academic_period_id_acad", referencedColumnName = "id_acad",nullable = false)
    private AcademicPeriodEntity academicPeriodIdAcad;
    @Column(name = "status", nullable = false)
    private int status;
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    @OneToMany(mappedBy = "academicHasGradeProfileIdAcadGrade" , orphanRemoval = true, cascade = CascadeType.ALL)
    List<GradeProfileHasTaskEntity> gradeProfileHasTaskEntityList;

    @PrePersist
    protected void onCreate(){
        status = 1;
        createdAt = LocalDateTime.now();
    }

    public Long getIdAcadGrade() {
        return idAcadGrade;
    }

    public void setIdAcadGrade(Long idAcadGrade) {
        this.idAcadGrade = idAcadGrade;
    }

    public GradeProfileEntity getGradeProfileIdGradePro() {
        return gradeProfileIdGradePro;
    }

    public void setGradeProfileIdGradePro(GradeProfileEntity gradeProfileIdGradePro) {
        this.gradeProfileIdGradePro = gradeProfileIdGradePro;
    }

    public AcademicPeriodEntity getAcademicPeriodIdAcad() {
        return academicPeriodIdAcad;
    }

    public void setAcademicPeriodIdAcad(AcademicPeriodEntity academicPeriodIdAcad) {
        this.academicPeriodIdAcad = academicPeriodIdAcad;
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

    public List<GradeProfileHasTaskEntity> getGradeProfileHasTaskEntityList() {
        return gradeProfileHasTaskEntityList;
    }

    public void setGradeProfileHasTaskEntityList(List<GradeProfileHasTaskEntity> gradeProfileHasTaskEntityList) {
        this.gradeProfileHasTaskEntityList = gradeProfileHasTaskEntityList;
    }
}
