package grado.ucb.edu.back_end_grado.dto.request;

import grado.ucb.edu.back_end_grado.persistence.entity.PersonEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class PersonRequest {
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

    public PersonRequest() {
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
    
    public PersonEntity personRequestToEntity(PersonRequest request){
        PersonEntity entity = new PersonEntity();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        entity.setIdPerson(request.getIdPerson() != null ? request.getIdPerson() : -1);
        entity.setCi(request.getCi() != null ? request.getCi() : null);
        entity.setName(request.getName() != null ? request.getName() : null);
        entity.setFatherLastName(request.getFatherLastName() != null ? request.getFatherLastName() : null);
        entity.setMotherLastName(request.getMotherLastName() != null ? request.getMotherLastName() : null);
        entity.setDescription(request.getDescription() != null ? request.getDescription() : null);
        entity.setEmail(request.getEmail() != null ? request.getEmail() : null);
        entity.setCellPhone(request.getCellPhone() != null ? request.getCellPhone() : null);
        entity.setStatus(request.getStatus());
        entity.setCreatedAt(request.getCreatedAt() != null ? LocalDateTime.parse(request.getCreatedAt(), formatter) : LocalDateTime.MIN );
        return entity;
    }
    
    
}
