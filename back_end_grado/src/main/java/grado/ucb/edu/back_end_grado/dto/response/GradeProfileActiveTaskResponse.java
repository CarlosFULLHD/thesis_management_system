package grado.ucb.edu.back_end_grado.dto.response;

import org.springframework.stereotype.Component;

@Component
public class GradeProfileActiveTaskResponse {
    private Long idGradePro;
    private String title;
    private int statusGraduationMode;
    private int isGradeoneortwo;
    private int status;
    private String createdAt;
    private GradeProfileHasTaskResponse currentTask;

    public GradeProfileActiveTaskResponse() {
    }

    public Long getIdGradePro() {
        return idGradePro;
    }

    public void setIdGradePro(Long idGradePro) {
        this.idGradePro = idGradePro;
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

    public GradeProfileHasTaskResponse getCurrentTask() {
        return currentTask;
    }

    public void setCurrentTask(GradeProfileHasTaskResponse currentTask) {
        this.currentTask = currentTask;
    }
}
