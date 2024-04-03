package grado.ucb.edu.back_end_grado.dto.request;

import grado.ucb.edu.back_end_grado.persistence.entity.PersonEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.RoleHasPersonEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.RolesEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class RoleHasPersonRequest {
    private Long idRolePer;
    private RolesEntity rolesIdRole;
    private PersonEntity personIdPerson;
    private int status;
    private String createdAt;

    public RoleHasPersonRequest() {
    }

    public Long getIdRolePer() {
        return idRolePer;
    }

    public void setIdRolePer(Long idRolePer) {
        this.idRolePer = idRolePer;
    }

    public RolesEntity getRolesIdRole() {
        return rolesIdRole;
    }

    public void setRolesIdRole(RolesEntity rolesIdRole) {
        this.rolesIdRole = rolesIdRole;
    }

    public PersonEntity getPersonIdPerson() {
        return personIdPerson;
    }

    public void setPersonIdPerson(PersonEntity personIdPerson) {
        this.personIdPerson = personIdPerson;
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

    public RoleHasPersonEntity rolesHasPersonRequestToEntity(RoleHasPersonRequest request){
        RoleHasPersonEntity entity = new RoleHasPersonEntity();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        entity.setIdRolePer(request.getIdRolePer() != null ? request.getIdRolePer() : -1);
        entity.setRolesIdRole(request.getRolesIdRole() != null ? request.getRolesIdRole() : null);
      //  entity.setPersonIdPerson(request.getPersonIdPerson() != null ? request.getPersonIdPerson() : null);
        entity.setStatus(request.getStatus());
        entity.setCreatedAt(request.getCreatedAt() != null ? LocalDateTime.parse(request.getCreatedAt(), formatter) : LocalDateTime.MIN );
        return entity;
    }
}
