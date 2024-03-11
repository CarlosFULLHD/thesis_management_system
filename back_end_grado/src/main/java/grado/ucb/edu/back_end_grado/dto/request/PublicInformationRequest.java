package grado.ucb.edu.back_end_grado.dto.request;

import grado.ucb.edu.back_end_grado.persistence.entity.PersonEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.PublicInformationEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.RoleHasPersonEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
@Component
public class PublicInformationRequest {
    private Long idPublicInfo;
    private RoleHasPersonEntity roleHasPersonIdRolePer;
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

    public RoleHasPersonEntity getRoleHasPersonIdRolePer() {
        return roleHasPersonIdRolePer;
    }

    public void setRoleHasPersonIdRolePer(RoleHasPersonEntity roleHasPersonIdRolePer) {
        this.roleHasPersonIdRolePer = roleHasPersonIdRolePer;
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
        entity.setRoleHasPersonIdRolePer(request.getRoleHasPersonIdRolePer() != null ? request.getRoleHasPersonIdRolePer() : null);
        entity.setInformation(request.getInformation() != null ? request.getInformation() : null);
        entity.setStatus(request.getStatus());
        entity.setCreatedAt(request.getCreatedAt() != null ? LocalDateTime.parse(request.getCreatedAt(), formatter) : LocalDateTime.MIN );
        return entity;
    }
}
