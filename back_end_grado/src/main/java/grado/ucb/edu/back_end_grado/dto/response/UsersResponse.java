package grado.ucb.edu.back_end_grado.dto.response;

import grado.ucb.edu.back_end_grado.persistence.entity.UsersEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class UsersResponse {
    private Long idUsers;
    private PersonResponse personIdPerson;
    private int status;

    public Long getIdUsers() {
        return idUsers;
    }

    public void setIdUsers(Long idUsers) {
        this.idUsers = idUsers;
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

    public UsersResponse usersResponseEntityToResponse(UsersEntity entity) {
        UsersResponse response = new UsersResponse();
        response.setIdUsers(entity.getIdUsers() != null ? entity.getIdUsers() : -1);
        response.setPersonIdPerson(entity.getPersonIdPerson() != null ? new PersonResponse().personEntityToResponse(entity.getPersonIdPerson()) : null);
        response.setStatus(entity.getStatus());
        return response;
    }
}