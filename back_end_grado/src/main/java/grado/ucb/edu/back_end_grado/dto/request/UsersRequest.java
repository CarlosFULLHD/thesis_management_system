package grado.ucb.edu.back_end_grado.dto.request;

import grado.ucb.edu.back_end_grado.persistence.entity.PersonEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.UsersEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class UsersRequest {
    private Long idUsers;
    private PersonEntity personIdPerson;
    private String username;
    private String password;
    private String salt;
    private int status;
    private String createdAt;

    public UsersRequest() {
    }

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

    public UsersEntity usersRequestToEntity(UsersRequest request){
        UsersEntity entity = new UsersEntity();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        entity.setIdUsers(request.getIdUsers() != null ? request.getIdUsers() : -1);
        entity.setPersonIdPerson(request.getPersonIdPerson() != null ? request.getPersonIdPerson() : null);
        entity.setUsername(request.getUsername() != null ? request.getUsername() : null);
        entity.setPassword(request.getPassword() != null ? request.getPassword() : null);
        entity.setSalt(request.getSalt() != null ? request.getSalt() : null);
        entity.setStatus(request.getStatus());
        entity.setCreatedAt(request.getCreatedAt() != null ? LocalDateTime.parse(request.getCreatedAt(), formatter) : LocalDateTime.MIN);
        return entity;
    }
}
