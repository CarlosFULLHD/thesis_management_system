package grado.ucb.edu.back_end_grado.dto.response;

import grado.ucb.edu.back_end_grado.persistence.entity.AcademicPeriodEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.TaskEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class AcademicPeriodResponse {
    private Long idAcad;
    private String semester;
    private String initDate;
    private String endDate;
    private String accountUntil;
    private int status;
    private String createdAt;

    public AcademicPeriodResponse() {
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

    public String getAccountUntil() {
        return accountUntil;
    }

    public void setAccountUntil(String accountUntil) {
        this.accountUntil = accountUntil;
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

    public AcademicPeriodResponse academicPeriodEntityToResponse(AcademicPeriodEntity entity){
        AcademicPeriodResponse response = new AcademicPeriodResponse();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        response.setIdAcad(entity.getIdAcad() != null ? entity.getIdAcad() : -1);
        response.setSemester(entity.getSemester() != null ? entity.getSemester() : null);
        response.setInitDate(entity.getInitDate() != null ? entity.getInitDate().format(formatter) : LocalDateTime.MIN.toString() );
        response.setEndDate(entity.getEndDate() != null ? entity.getEndDate().format(formatter) : LocalDateTime.MIN.toString() );
        response.setAccountUntil(entity.getAccountUntil() != null ? entity.getAccountUntil().format(formatter) : LocalDateTime.MIN.toString());
        response.setStatus(entity.getStatus());
        response.setCreatedAt(entity.getCreatedAt() != null ? entity.getCreatedAt().format(formatter) : LocalDateTime.MIN.toString());
        return response;
    }
}
