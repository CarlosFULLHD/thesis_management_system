package grado.ucb.edu.back_end_grado.dto.request;

import grado.ucb.edu.back_end_grado.persistence.entity.UserEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class DesertionRequest{
    private Long idDesertion;
    private UserEntity userIdUser;
    private String reason;
    private int status;
    private String date;

    public Long getIdDesertion() {
        return idDesertion;
    }

    public void setIdDesertion(Long idDesertion) {
        this.idDesertion = idDesertion;
    }

    public UserEntity getUserIdUser() {
        return userIdUser;
    }

    public void setUserIdUser(UserEntity userIdUser) {
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
}