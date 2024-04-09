package grado.ucb.edu.back_end_grado.dto.request;

import grado.ucb.edu.back_end_grado.persistence.entity.UsersEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.DesertionEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class DesertionRequest{
    private Long idDesertion;
    private UsersEntity usersIdUsers;
    private String reason;
    private int status;
    private String created_at;

    public Long getIdDesertion() {
        return idDesertion;
    }

    public void setIdDesertion(Long idDesertion) {
        this.idDesertion = idDesertion;
    }

    public UsersEntity getUsersIdUsers() {
        return usersIdUsers;
    }

    public void setUsersIdUsers(UsersEntity usersIdUsers) {
        this.usersIdUsers = usersIdUsers;
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

    public String getCreated_at() {
        return created_at;
    }

    public void setCreated_at(String created_at) {
        this.created_at = created_at;
    }

    public DesertionEntity desertionRequestToEntity(DesertionRequest request){
        DesertionEntity entity = new DesertionEntity();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        entity.setIdDesertion(request.getIdDesertion() != null ? request.getIdDesertion() : -1);
        entity.setUsersIdUsers(request.getUsersIdUsers() != null ? request.getUsersIdUsers(): null);
        entity.setReason(request.getReason() != null ? request.getReason() : null);
        entity.setStatus(request.getStatus());
        entity.setCreated_at(request.getCreated_at() != null ? LocalDateTime.parse(request.getCreated_at(), formatter) : LocalDateTime.MIN );
        return entity;
    }
}