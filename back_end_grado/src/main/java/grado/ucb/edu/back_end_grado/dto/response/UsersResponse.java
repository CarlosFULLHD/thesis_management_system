package grado.ucb.edu.back_end_grado.dto.response;

import grado.ucb.edu.back_end_grado.persistence.entity.PersonEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.UsersEntity;
import org.apache.catalina.User;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class UsersResponse {
    private Long idUsers;
    private PersonResponse personIdPerson;
    private String username;
    private String password;
    private String salt;
    private int status;
    private String createdAt;

    public UsersResponse() {
    }

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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
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
    
    public UsersResponse usersEntityToResponse(UsersEntity entity){
        UsersResponse response = new UsersResponse();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        response.setIdUsers(entity.getIdUsers() != null ? entity.getIdUsers() : -1);
        response.setPersonIdPerson(entity.getPersonIdPerson() != null ? new PersonResponse().personEntityToResponse(entity.getPersonIdPerson()) : null);
        response.setUsername(entity.getUsername() != null ? entity.getUsername() : null);
        response.setPassword(entity.getPassword() != null ? entity.getPassword() : null);
        response.setSalt(entity.getSalt() != null ? entity.getSalt() : null);
        response.setStatus(entity.getStatus());
        response.setCreatedAt(entity.getCreatedAt() != null ? entity.getCreatedAt().format(formatter) : LocalDateTime.MIN.toString());
        return response;
    }
}
