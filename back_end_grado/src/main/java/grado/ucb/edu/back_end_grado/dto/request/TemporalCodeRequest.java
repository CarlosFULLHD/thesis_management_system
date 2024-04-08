package grado.ucb.edu.back_end_grado.dto.request;

import grado.ucb.edu.back_end_grado.persistence.entity.TemporalCodeEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class TemporalCodeRequest {
    private Long idTemporal;
    private String temporalCode;
    private String createdAt;
    private String dueDate;
    private int isUsed;

    public TemporalCodeRequest() {
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

    public TemporalCodeEntity temporalCodeRequestToEntity(TemporalCodeRequest request){
        TemporalCodeEntity entity = new TemporalCodeEntity();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        entity.setIdTemporal(request.getIdTemporal() != null ? request.idTemporal : null);
        entity.setTemporalCode(request.getTemporalCode() != null ? request.getTemporalCode() : null);
        entity.setCreatedAt(request.getCreatedAt() != null ? LocalDateTime.parse(request.getCreatedAt(),formatter) : LocalDateTime.MIN);
        entity.setDueDate(request.getDueDate() != null ? LocalDateTime.parse(request.getDueDate(),formatter) : LocalDateTime.MIN);
        entity.setIs_used(request.getIsUsed());
        return entity;
    }
}
