package grado.ucb.edu.back_end_grado.dto.request;

import grado.ucb.edu.back_end_grado.persistence.entity.PersonEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.PublicInformationEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
@Component
public class PublicInformationRequest {
    private Long idPublicInfo;
    private PersonEntity personIdPerson;
    private String information;
    private int status;
    private String createdAt;

    public PublicInformationRequest() {
    }

    public Long getIdPublicInfo() {
        return idPublicInfo;
    }

    public void setIdPublicInfo(Long idPublicInfo) {
        this.idPublicInfo = idPublicInfo;
    }

    public PersonEntity getPersonIdPerson() {
        return personIdPerson;
    }

    public void setPersonIdPerson(PersonEntity personIdPerson) {
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

    public PublicInformationEntity publicInformationRequestToEntity(PublicInformationRequest request){
        PublicInformationEntity entity = new PublicInformationEntity();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        entity.setIdPublicInfo(request.getIdPublicInfo() != null ? request.getIdPublicInfo() : -1);
        entity.setPersonIdPerson(request.getPersonIdPerson() != null ? request.getPersonIdPerson() : null);
        entity.setInformation(request.getInformation() != null ? request.getInformation() : null);
        entity.setStatus(request.getStatus());
        entity.setCreatedAt(request.getCreatedAt() != null ? LocalDateTime.parse(request.getCreatedAt(), formatter) : LocalDateTime.MIN );
        return entity;
    }
}
