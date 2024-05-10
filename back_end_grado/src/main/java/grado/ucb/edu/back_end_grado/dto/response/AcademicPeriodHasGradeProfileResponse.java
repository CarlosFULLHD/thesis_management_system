package grado.ucb.edu.back_end_grado.dto.response;

import grado.ucb.edu.back_end_grado.persistence.entity.AcademicPeriodHasGradeProfileEntity;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class AcademicPeriodHasGradeProfileResponse {
    private Long idAcadGrade;
    private GradeProfileResponse gradeProfileIdGradePro;
    private AcademicPeriodResponse academicPeriodIdAcad;
    private int status;
    private String createdAt;

    public AcademicPeriodHasGradeProfileResponse() {
    }

    public Long getIdAcadGrade() {
        return idAcadGrade;
    }

    public void setIdAcadGrade(Long idAcadGrade) {
        this.idAcadGrade = idAcadGrade;
    }

    public GradeProfileResponse getGradeProfileIdGradePro() {
        return gradeProfileIdGradePro;
    }

    public void setGradeProfileIdGradePro(GradeProfileResponse gradeProfileIdGradePro) {
        this.gradeProfileIdGradePro = gradeProfileIdGradePro;
    }

    public AcademicPeriodResponse getAcademicPeriodIdAcad() {
        return academicPeriodIdAcad;
    }

    public void setAcademicPeriodIdAcad(AcademicPeriodResponse academicPeriodIdAcad) {
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

    public AcademicPeriodHasGradeProfileResponse academicPeriodHasGradeProfileEntityToResponse(AcademicPeriodHasGradeProfileEntity entity){
        AcademicPeriodHasGradeProfileResponse response = new AcademicPeriodHasGradeProfileResponse();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        response.setStatus(entity.getStatus());
        response.setGradeProfileIdGradePro(entity.getGradeProfileIdGradePro() != null ? new GradeProfileResponse().gradeProfileEntityToResponse(entity.getGradeProfileIdGradePro()) : null);
        response.setAcademicPeriodIdAcad(entity.getAcademicPeriodIdAcad() != null ? new AcademicPeriodResponse().academicPeriodEntityToResponse(entity.getAcademicPeriodIdAcad()) : null);
        response.setCreatedAt(entity.getCreatedAt() != null ? entity.getCreatedAt().format(formatter) : LocalDateTime.MIN.toString());
        return response;
    }
}
