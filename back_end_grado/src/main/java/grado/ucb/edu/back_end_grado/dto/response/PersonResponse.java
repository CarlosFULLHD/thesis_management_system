package grado.ucb.edu.back_end_grado.dto.response;

import grado.ucb.edu.back_end_grado.persistence.entity.PersonEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class PersonResponse {
    private Long idPerson;
    private String ci;
    private String name;
    private String fatherLastName;
    private String motherLastName;
    private String description;
    private String email;
    private String cellPhone;
    private int status;
    private String createdAt;

    public PersonResponse() {
    }

    public Long getIdPerson() {
        return idPerson;
    }

    public void setIdPerson(Long idPerson) {
        this.idPerson = idPerson;
    }

    public String getCi() {
        return ci;
    }

    public void setCi(String ci) {
        this.ci = ci;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFatherLastName() {
        return fatherLastName;
    }

    public void setFatherLastName(String fatherLastName) {
        this.fatherLastName = fatherLastName;
    }

    public String getMotherLastName() {
        return motherLastName;
    }

    public void setMotherLastName(String motherLastName) {
        this.motherLastName = motherLastName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCellPhone() {
        return cellPhone;
    }

    public void setCellPhone(String cellPhone) {
        this.cellPhone = cellPhone;
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

    public PersonResponse personEntityToResponse(PersonEntity entity){
        PersonResponse response = new PersonResponse();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        response.setIdPerson(entity.getIdPerson() != null ? entity.getIdPerson() : -1);
        response.setCi(entity.getCi() != null ? entity.getCi() : null);
        response.setName(entity.getName() != null ? entity.getName() : null);
        response.setFatherLastName(entity.getFatherLastName() != null ? entity.getFatherLastName() : null);
        response.setMotherLastName(entity.getMotherLastName() != null ? entity.getMotherLastName() : null);
        response.setDescription(entity.getDescription() != null ? entity.getDescription() : null);
        response.setEmail(entity.getEmail() != null ? entity.getEmail() : null);
        response.setCellPhone(entity.getCellPhone() != null ? entity.getCellPhone() : null);
        entity.setStatus(entity.getStatus());
        response.setCreatedAt(entity.getCreatedAt() != null ? entity.getCreatedAt().format(formatter) : LocalDateTime.MIN.toString());
        return response;

    }
}
