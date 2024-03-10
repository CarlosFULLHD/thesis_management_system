package grado.ucb.edu.back_end_grado.dto.response;

import grado.ucb.edu.back_end_grado.persistence.entity.PersonEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.PublicInformationEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class PublicInformationResponse {
    private Long idPublicInfo;
    private PersonResponse personIdPerson;
    private String information;
    private int status;
    private String createdAt;

    public PublicInformationResponse() {
    }

    public Long getIdPublicInfo() {
        return idPublicInfo;
    }

    public void setIdPublicInfo(Long idPublicInfo) {
        this.idPublicInfo = idPublicInfo;
    }

    public PersonResponse getPersonIdPerson() {
        return personIdPerson;
    }

    public void setPersonIdPerson(PersonResponse personIdPerson) {
        this.personIdPerson = personIdPerson;
    }

    public String getInformation() {
        return information;
    }

    public void setInformation(String information) {
        this.information = information;
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

    public PublicInformationResponse publicInformationEntityToResponse(PublicInformationEntity entity){
        PublicInformationResponse response = new PublicInformationResponse();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        response.setIdPublicInfo(entity.getIdPublicInfo() != null ? entity.getIdPublicInfo() : -1);
        response.setPersonIdPerson(entity.getPersonIdPerson() != null ? new PersonResponse().personEntityToResponse(entity.getPersonIdPerson()) : null);
        response.setInformation(entity.getInformation() != null ? entity.getInformation() : null);
        entity.setStatus(entity.getStatus());
        response.setCreatedAt(entity.getCreatedAt() != null ? entity.getCreatedAt().format(formatter) : LocalDateTime.MIN.toString());
        return response;
    }
}
