package grado.ucb.edu.back_end_grado.dto.request;

import grado.ucb.edu.back_end_grado.persistence.entity.GradeProfileEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.RoleHasPersonEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class GradeProfileRequest {
    private Long idGradePro;
    private RoleHasPersonEntity roleHasPerson;
    private String name;
    private String url;
    private int statusProfile;
    private String observations;
    private int status;
    private String createdAt;

    public GradeProfileRequest() {
    }

    public Long getIdGradePro() {
        return idGradePro;
    }

    public void setIdGradePro(Long idGradePro) {
        this.idGradePro = idGradePro;
    }

    public RoleHasPersonEntity getRoleHasPerson() {
        return roleHasPerson;
    }

    public void setRoleHasPerson(RoleHasPersonEntity roleHasPerson) {
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

    public GradeProfileEntity gradeProfileRequestToEntity(GradeProfileRequest request){
        GradeProfileEntity entity = new GradeProfileEntity();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        entity.setIdGradePro(request.getIdGradePro() != null ? request.getIdGradePro() : -1);
        entity.setRoleHasPerson(request.getRoleHasPerson() != null ? request.getRoleHasPerson() : null);
        entity.setName(request.getName() != null ? request.getName() : null);
        entity.setUrl(request.getUrl() != null ? request.getUrl(): null);
        entity.setStatusProfile(request.getStatusProfile());
        entity.setObservations(request.getObservations() != null ? request.getObservations() : null);
        entity.setStatus(request.getStatus());
        entity.setCreatedAt(request.getCreatedAt() != null ? LocalDateTime.parse(request.getCreatedAt(), formatter) : LocalDateTime.MIN );
        return entity;
    }

}
