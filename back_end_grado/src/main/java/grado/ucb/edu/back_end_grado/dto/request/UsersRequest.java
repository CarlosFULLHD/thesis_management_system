package grado.ucb.edu.back_end_grado.dto.request;

import grado.ucb.edu.back_end_grado.persistence.entity.PersonEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class UsersRequest {
    private Long idUsers;
    private PersonEntity personIdPerson;
    private int status;

    public Long getIdUsers() {
        return idUsers;
    }

    public void setIdUsers(Long idUsers) {
        this.idUsers = idUsers;
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
}