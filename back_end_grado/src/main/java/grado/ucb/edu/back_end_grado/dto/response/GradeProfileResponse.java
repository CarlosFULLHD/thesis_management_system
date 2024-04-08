package grado.ucb.edu.back_end_grado.dto.response;

import grado.ucb.edu.back_end_grado.persistence.entity.GradeProfileEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.RoleHasPersonEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class GradeProfileResponse {
    private Long idGradePro;
    private RoleHasPersonResponse roleHasPerson;
    private String name;
    private String url;
    private int statusProfile;
    private String observations;
    private int status;
    private String createdAt;

    public GradeProfileResponse() {
    }

    public Long getIdGradePro() {
        return idGradePro;
    }

    public void setIdGradePro(Long idGradePro) {
        this.idGradePro = idGradePro;
    }

    public RoleHasPersonResponse getRoleHasPerson() {
        return roleHasPerson;
    }

    public void setRoleHasPerson(RoleHasPersonResponse roleHasPerson) {
        this.roleHasPerson = roleHasPerson;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public int getStatusProfile() {
        return statusProfile;
    }

    public void setStatusProfile(int statusProfile) {
        this.statusProfile = statusProfile;
    }

    public String getObservations() {
        return observations;
    }

    public void setObservations(String observations) {
        this.observations = observations;
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
    public GradeProfileResponse gradeProfileEntityToResponse(GradeProfileEntity entity){
        GradeProfileResponse response = new GradeProfileResponse();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        response.setIdGradePro(entity.getIdGradePro() != null ? entity.getIdGradePro() : -1);
        response.setRoleHasPerson(entity.getRoleHasPersonIdRolePer() != null ? new RoleHasPersonResponse().roleHasPersonEntityToResponse(entity.getRoleHasPersonIdRolePer()) : null);
        response.setName(entity.getName() != null ? entity.getName() : null);
        response.setUrl(entity.getUrl() != null ? entity.getUrl() : null);
        response.setStatusProfile(entity.getStatusProfile());
        response.setObservations(entity.getObservations());
        response.setStatus(entity.getStatus());
        response.setCreatedAt(entity.getCreatedAt() != null ? entity.getCreatedAt().format(formatter) : LocalDateTime.MIN.toString());
        return response;
    }
}
