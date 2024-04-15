package grado.ucb.edu.back_end_grado.dto.request;

import grado.ucb.edu.back_end_grado.persistence.entity.AcademicPeriodEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.TaskEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class AcademicPeriodRequest {
    private Long idAcad;
    private String semester;
    private String initDate;
    private String endDate;
    private int status;
    private String createdAt;

    public AcademicPeriodRequest() {
    }

    public Long getIdAcad() {
        return idAcad;
    }

    public void setIdAcad(Long idAcad) {
        this.idAcad = idAcad;
    }

    public String getSemester() {
        return semester;
    }

    public void setSemester(String semester) {
        this.semester = semester;
    }

    public String getInitDate() {
        return initDate;
    }

    public void setInitDate(String initDate) {
        this.initDate = initDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
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

    public AcademicPeriodEntity academicPeriodRequestToEntity(AcademicPeriodRequest request){
        AcademicPeriodEntity entity = new AcademicPeriodEntity();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        entity.setIdAcad(request.getIdAcad() != null ? request.getIdAcad() : -1);
        entity.setSemester(request.getSemester() != null ? request.getSemester() : null);
        entity.setInitDate(request.getInitDate() != null ? LocalDateTime.parse(request.getInitDate(), formatter) : LocalDateTime.MIN );
        entity.setEndDate(request.getEndDate() != null ? LocalDateTime.parse(request.getEndDate(), formatter) : LocalDateTime.MIN );
        entity.setStatus(request.getStatus());
        entity.setCreatedAt(request.getCreatedAt() != null ? LocalDateTime.parse(request.getCreatedAt(), formatter) : LocalDateTime.MIN );
        return entity;
    }
}
