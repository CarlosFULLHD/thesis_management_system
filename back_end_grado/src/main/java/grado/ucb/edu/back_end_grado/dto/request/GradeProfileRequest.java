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
    private String title;
    private int statusGraduationMode;
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getStatusGraduationMode() {
        return statusGraduationMode;
    }

    public void setStatusGraduationMode(int statusGraduationMode) {
        this.statusGraduationMode = statusGraduationMode;
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
        entity.setRoleHasPersonIdRolePer(request.getRoleHasPerson() != null ? request.getRoleHasPerson() : null);
        entity.setTitle(request.getTitle() != null ? request.getTitle() : null);
        entity.setStatusGraduationMode(request.getStatusGraduationMode());
        entity.setStatus(request.getStatus());
        entity.setCreatedAt(request.getCreatedAt() != null ? LocalDateTime.parse(request.getCreatedAt(), formatter) : LocalDateTime.MIN );
        return entity;
    }

}
