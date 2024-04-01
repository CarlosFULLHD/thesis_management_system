package grado.ucb.edu.back_end_grado.dto.request;

import grado.ucb.edu.back_end_grado.persistence.entity.GradeProfileEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.LecturerApplicationEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.RoleHasPersonEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.RolesEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class LecturerApplicationRequest {
    private Long idTutorApplication;
    private RoleHasPersonEntity roleHasPersonIdRolePer;
    private GradeProfileEntity gradeProfileIdGradePro;
    private int isAccepted;
    private int tutorOrLecturer;
    private int status;
    private String createdAt;

    public LecturerApplicationRequest() {
    }
    public Long getIdTutorApplication() {
        return idTutorApplication;
    }

    public void setIdTutorApplication(Long idTutorApplication) {
        this.idTutorApplication = idTutorApplication;
    }

    public RoleHasPersonEntity getRoleHasPersonIdRolePer() {
        return roleHasPersonIdRolePer;
    }

    public void setRoleHasPersonIdRolePer(RoleHasPersonEntity roleHasPersonIdRolePer) {
        this.roleHasPersonIdRolePer = roleHasPersonIdRolePer;
    }

    public GradeProfileEntity getGradeProfileIdGradePro() {
        return gradeProfileIdGradePro;
    }

    public void setGradeProfileIdGradePro(GradeProfileEntity gradeProfileIdGradePro) {
        this.gradeProfileIdGradePro = gradeProfileIdGradePro;
    }

    public int getIsAccepted() {
        return isAccepted;
    }

    public void setIsAccepted(int isAccepted) {
        this.isAccepted = isAccepted;
    }

    public int getTutorOrLecturer() {
        return tutorOrLecturer;
    }

    public void setTutorOrLecturer(int tutorOrLecturer) {
        this.tutorOrLecturer = tutorOrLecturer;
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

    public LecturerApplicationEntity lecturerApplicationRequestToEntity(LecturerApplicationRequest request){
        LecturerApplicationEntity entity = new LecturerApplicationEntity();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        entity.setIdTutorApplication(request.getIdTutorApplication() != null ? request.getIdTutorApplication() : -1);
        entity.setRoleHasPersonIdRolePer(request.getRoleHasPersonIdRolePer() != null ? request.getRoleHasPersonIdRolePer() : null);
        entity.setGradeProfileIdGradePro(request.getGradeProfileIdGradePro() != null ? request.getGradeProfileIdGradePro() : null );
        entity.setIsAccepted(request.getIsAccepted());
        entity.setTutorOrLecturer(request.getTutorOrLecturer());
        entity.setStatus(request.getStatus());
        entity.setCreatedAt(request.getCreatedAt() != null ? LocalDateTime.parse(request.getCreatedAt(), formatter) : LocalDateTime.MIN );
        return entity;
    }
}