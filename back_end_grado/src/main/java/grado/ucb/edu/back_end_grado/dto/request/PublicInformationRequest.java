package grado.ucb.edu.back_end_grado.dto.request;

import grado.ucb.edu.back_end_grado.persistence.entity.PublicInformationEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.RoleHasPersonEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.UsersEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
@Component
public class PublicInformationRequest {
    private Long idPublicInfo;
    private UsersEntity usersIdUsers;
    private String title;
    private String information;
    private String publicationDate;
    private String deadline;
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

    public UsersEntity getUsersIdUsers() {
        return usersIdUsers;
    }

    public void setUsersIdUsers(UsersEntity usersIdUsers) {
        this.usersIdUsers = usersIdUsers;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getInformation() {
        return information;
    }

    public void setInformation(String information) {
        this.information = information;
    }

    public String getPublicationDate() {
        return publicationDate;
    }

    public void setPublicationDate(String publicationDate) {
        this.publicationDate = publicationDate;
    }

    public String getDeadline() {
        return deadline;
    }

    public void setDeadline(String deadline) {
        this.deadline = deadline;
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
        entity.setUsersIdUsers(request.getUsersIdUsers() != null ? request.getUsersIdUsers() : null);
        entity.setTitle(request.getTitle() != null ? request.getTitle() : null);
        entity.setInformation(request.getInformation() != null ? request.getInformation() : null);
        entity.setPublicationDate(request.getPublicationDate() != null ? LocalDateTime.parse(request.getPublicationDate(),formatter) : null);
        entity.setDeadline(request.getDeadline() != null ? LocalDateTime.parse(request.getDeadline(), formatter) : null);
        entity.setStatus(request.getStatus());
        entity.setCreatedAt(request.getCreatedAt() != null ? LocalDateTime.parse(request.getCreatedAt(), formatter) : LocalDateTime.MIN);
        return entity;
    }
}
