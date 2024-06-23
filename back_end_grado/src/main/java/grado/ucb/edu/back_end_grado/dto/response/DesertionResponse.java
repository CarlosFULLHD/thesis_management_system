package grado.ucb.edu.back_end_grado.dto.response;

import grado.ucb.edu.back_end_grado.persistence.entity.DesertionEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class DesertionResponse {
    private Long idDesertion;
    private UsersResponse usersIdUsers;
    private String reason;
    private int status;
    private String created_at;

    public Long getIdDesertion() {
        return idDesertion;
    }

    public void setIdDesertion(Long idDesertion) {
        this.idDesertion = idDesertion;
    }

    public UsersResponse getUsersIdUsers() {
        return usersIdUsers;
    }

    public void setUsersIdUsers(UsersResponse usersIdUsers) {
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

    public DesertionResponse desertionEntityToResponse(DesertionEntity entity){
        DesertionResponse response = new DesertionResponse();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        response.setIdDesertion(entity.getIdDesertion() != null ? entity.getIdDesertion() : -1);
        response.setUsersIdUsers(entity.getUsersIdUsers() != null ? new UsersResponse().usersEntityToResponse(entity.getUsersIdUsers()) : null);
        response.setReason(entity.getReason() != null ? entity.getReason() : null);
        response.setStatus(entity.getStatus());
        response.setCreated_at(entity.getCreated_at() != null ? entity.getCreated_at().format(formatter) : LocalDateTime.MIN.toString());
        return response;
    }
}