package grado.ucb.edu.back_end_grado.dto.response;

import grado.ucb.edu.back_end_grado.persistence.entity.RoleHasPersonEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
@Component
public class RoleHasPersonResponse {
    private Long idRolePer;
    private RolesResponse rolesIdRole;
    private PersonResponse personIdPerson;
    private int status;
    private String createdAt;

    public RoleHasPersonResponse() {
    }

    public Long getIdRolePer() {
        return idRolePer;
    }

    public void setIdRolePer(Long idRolePer) {
        this.idRolePer = idRolePer;
    }

    public RolesResponse getRolesIdRole() {
        return rolesIdRole;
    }

    public void setRolesIdRole(RolesResponse rolesIdRole) {
        this.rolesIdRole = rolesIdRole;
    }

    public PersonResponse getPersonIdPerson() {
        return personIdPerson;
    }

    public void setPersonIdPerson(PersonResponse personIdPerson) {
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

    public RoleHasPersonResponse roleHasPersonEntityToResponse(RoleHasPersonEntity entity){
        RoleHasPersonResponse response = new RoleHasPersonResponse();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        response.setIdRolePer(entity.getIdRolePer() != null ? entity.getIdRolePer() : -1);
        response.setRolesIdRole(entity.getRolesIdRole() != null ? new RolesResponse().rolesResponseEntityToResponse(entity.getRolesIdRole()) : null);
       // response.setPersonIdPerson(entity.getPersonIdPerson() != null ? new PersonResponse().personEntityToResponse(entity.getPersonIdPerson()) : null);
        response.setStatus(entity.getStatus());
        response.setCreatedAt(entity.getCreatedAt() != null ? entity.getCreatedAt().format(formatter) : LocalDateTime.MIN.toString());
        return response;
    }
}
