package grado.ucb.edu.back_end_grado.dto.response;

import grado.ucb.edu.back_end_grado.dto.request.TemporalCodeRequest;
import grado.ucb.edu.back_end_grado.persistence.entity.TemporalCodeEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class TemporalCodeResponse {
    private Long idTemporal;
    private String temporalCode;
    private String createdAt;
    private String dueDate;
    private int isUsed;

    public TemporalCodeResponse() {
    }

    public Long getIdTemporal() {
        return idTemporal;
    }

    public void setIdTemporal(Long idTemporal) {
        this.idTemporal = idTemporal;
    }

    public String getTemporalCode() {
        return temporalCode;
    }

    public void setTemporalCode(String temporalCode) {
        this.temporalCode = temporalCode;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getDueDate() {
        return dueDate;
    }

    public void setDueDate(String dueDate) {
        this.dueDate = dueDate;
    }

    public int getIsUsed() {
        return isUsed;
    }

    public void setIsUsed(int isUsed) {
        this.isUsed = isUsed;
    }

    public TemporalCodeResponse temporalCodeEntityToResponse(TemporalCodeEntity entity){
        TemporalCodeResponse response = new TemporalCodeResponse();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        response.setIdTemporal(entity.getIdTemporal() != null ? entity.getIdTemporal() : -1);
        response.setTemporalCode(entity.getTemporalCode() != null ? entity.getTemporalCode() : null);
        response.setCreatedAt(entity.getCreatedAt() != null ? entity.getCreatedAt().format(formatter): LocalDateTime.MIN.toString());
        response.setDueDate(entity.getDueDate() != null ? entity.getDueDate().format(formatter): LocalDateTime.MIN.toString());
        response.setIsUsed(entity.getIsUsed());
        return response;
    }

}
