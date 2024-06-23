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
    private String title;
    private int statusGraduationMode;
    private int isGradeoneortwo;
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

    public int getIsGradeoneortwo() {
        return isGradeoneortwo;
    }

    public void setIsGradeoneortwo(int isGradeoneortwo) {
        this.isGradeoneortwo = isGradeoneortwo;
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
        response.setTitle(entity.getTitle() != null ? entity.getTitle() : null);
        response.setStatusGraduationMode(entity.getStatusGraduationMode());
        response.setIsGradeoneortwo(entity.getIsGradeoneortwo());
        response.setStatus(entity.getStatus());
        response.setCreatedAt(entity.getCreatedAt() != null ? entity.getCreatedAt().format(formatter) : LocalDateTime.MIN.toString());
        return response;
    }
}
