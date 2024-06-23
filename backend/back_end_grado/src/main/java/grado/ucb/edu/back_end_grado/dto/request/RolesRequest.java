package grado.ucb.edu.back_end_grado.dto.request;

import grado.ucb.edu.back_end_grado.persistence.entity.RolesEntity;
import org.springframework.stereotype.Component;

import javax.management.relation.Role;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class RolesRequest {
    private Long idRole;
    private String userRole;
    private int status;
    private String createdAt;

    public RolesRequest() {
    }

    public Long getIdRole() {
        return idRole;
    }

    public void setIdRole(Long idRole) {
        this.idRole = idRole;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
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

    public RolesEntity rolesRequestToEntity(RolesRequest request){
        RolesEntity entity = new RolesEntity();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        entity.setIdRole(request.idRole != null ? request.idRole : null);
        entity.setUserRole(request.userRole != null ? request.getUserRole() : null);
        entity.setStatus(request.getStatus());
        entity.setCreatedAt(request.getCreatedAt() != null ? LocalDateTime.parse(request.getCreatedAt(), formatter) : LocalDateTime.MIN );
        return entity;
    }
}
