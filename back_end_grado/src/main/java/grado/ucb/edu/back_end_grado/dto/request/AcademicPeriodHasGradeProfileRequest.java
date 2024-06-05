package grado.ucb.edu.back_end_grado.dto.request;

import grado.ucb.edu.back_end_grado.persistence.entity.AcademicPeriodEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.AcademicPeriodHasGradeProfileEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.GradeProfileEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class AcademicPeriodHasGradeProfileRequest {
    private Long idAcadGrade;
    private GradeProfileEntity gradeProfileIdGradePro;
    private AcademicPeriodEntity academicPeriodIdAcad;
    private int status;
    private String createdAt;

    public AcademicPeriodHasGradeProfileRequest() {
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

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
    public AcademicPeriodHasGradeProfileEntity academicPeriodHasGradeProfileRequestToEntity(AcademicPeriodHasGradeProfileRequest request){
        AcademicPeriodHasGradeProfileEntity entity = new AcademicPeriodHasGradeProfileEntity();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        entity.setIdAcadGrade(request.getIdAcadGrade());
        entity.setGradeProfileIdGradePro(request.getGradeProfileIdGradePro());
        entity.setAcademicPeriodIdAcad(request.getAcademicPeriodIdAcad());
        entity.setStatus(request.getStatus());
        entity.setCreatedAt(request.getCreatedAt() != null ? LocalDateTime.parse(request.getCreatedAt(), formatter) : LocalDateTime.MIN );
        return entity;
    }
}
