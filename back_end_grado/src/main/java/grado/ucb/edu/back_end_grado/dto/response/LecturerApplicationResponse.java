package grado.ucb.edu.back_end_grado.dto.response;
import grado.ucb.edu.back_end_grado.persistence.entity.LecturerApplicationEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
@Component
public class LecturerApplicationResponse {
    private Long idTutorApplication;
    private RoleHasPersonResponse roleHasPersonIdRolePer;
    private GradeProfileResponse gradeProfileIdGradePro;
    private int isAccepted;
    private int tutorOrLecturer;
    private int status;
    private String createdAt;

    public LecturerApplicationResponse() {
    }

    public Long getIdTutorApplication() {
        return idTutorApplication;
    }

    public void setIdTutorApplication(Long idTutorApplication) {
        this.idTutorApplication = idTutorApplication;
    }

    public RoleHasPersonResponse getRoleHasPersonIdRolePer() {
        return roleHasPersonIdRolePer;
    }

    public void setRoleHasPersonIdRolePer(RoleHasPersonResponse roleHasPersonIdRolePer) {
        this.roleHasPersonIdRolePer = roleHasPersonIdRolePer;
    }

    public GradeProfileResponse getGradeProfileIdGradePro() {
        return gradeProfileIdGradePro;
    }

    public void setGradeProfileIdGradePro(GradeProfileResponse gradeProfileIdGradePro) {
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

    public LecturerApplicationResponse lecturerApplicationEntityToResponse(LecturerApplicationEntity entity){
        LecturerApplicationResponse response = new LecturerApplicationResponse();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        response.setIdTutorApplication(entity.getIdTutorApplication() != null ? entity.getIdTutorApplication() : -1);
        response.setRoleHasPersonIdRolePer(entity.getRoleHasPersonIdRolePer() != null ? new RoleHasPersonResponse().roleHasPersonEntityToResponse(entity.getRoleHasPersonIdRolePer()) : null);
        response.setGradeProfileIdGradePro(entity.getGradeProfileIdGradePro() != null ? new GradeProfileResponse().gradeProfileEntityToResponse(entity.getGradeProfileIdGradePro()) : null);
        response.setIsAccepted(entity.getIsAccepted());
        response.setTutorOrLecturer(entity.getTutorOrLecturer());
        response.setStatus(entity.getStatus());
        response.setCreatedAt(entity.getCreatedAt() != null ? entity.getCreatedAt().format(formatter) : LocalDateTime.MIN.toString());
        return response;
    }
}
