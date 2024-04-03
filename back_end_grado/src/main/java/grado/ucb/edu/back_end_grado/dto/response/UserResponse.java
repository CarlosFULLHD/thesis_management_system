package grado.ucb.edu.back_end_grado.dto.response;

import grado.ucb.edu.back_end_grado.persistence.entity.UserEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class UserResponse {
    private Long idUser;
    private PersonResponse personIdPerson;
    private int status;

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
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

    public UserResponse userResponseEntityToResponse(UserEntity entity) {
        UserResponse response = new UserResponse();
        response.setIdUser(entity.getIdUser() != null ? entity.getIdUser() : -1);
        response.setPersonIdPerson(entity.getPersonIdPerson() != null ? new PersonResponse().personEntityToResponse(entity.getPersonIdPerson()) : null);
        response.setStatus(entity.getStatus());
        return response;
    }
}