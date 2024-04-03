package grado.ucb.edu.back_end_grado.dto.response;

import grado.ucb.edu.back_end_grado.persistence.entity.DesertionEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class DesertionResponse {
    private Long idDesertion;
    private UserResponse userIdUser;
    private String reason;
    private int status;
    private String date;

    public Long getIdDesertion() {
        return idDesertion;
    }

    public void setIdDesertion(Long idDesertion) {
        this.idDesertion = idDesertion;
    }

    public UserResponse getUserIdUser() {
        return userIdUser;
    }

    public void setUserIdUser(UserResponse userIdUser) {
        this.userIdUser = userIdUser;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public DesertionResponse desertionEntityToResponse(DesertionEntity entity){
        DesertionResponse response = new DesertionResponse();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        response.setIdDesertion(entity.getIdDesertion() != null ? entity.getIdDesertion() : -1);
        response.setUserIdUser(entity.getUserIdUser() != null ? new UserResponse().userResponseEntityToResponse(entity.getUserIdUser()) : null);
        response.setReason(entity.getReason() != null ? entity.getReason() : null);
        response.setStatus(entity.getStatus());
        response.setDate(entity.getDate() != null ? entity.getDate().format(formatter) : LocalDateTime.MIN.toString());
        return response;
    }
}