package grado.ucb.edu.back_end_grado.dto.response;

import grado.ucb.edu.back_end_grado.persistence.entity.GradeProfileHasTaskEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class GradeProfileHasTaskResponse {
    private Long idGradeTask;
    private TaskStatesResponse taskStatesIdTaskState;
    private TaskHasDateResponse taskHasDateIdTaskHasDate;
    private GradeProfileResponse gradeProfileIdGradePro;
    private String comments;
    private String publicationDate;
    private String deadline;
    private int status;
    private String createdAt;

    public GradeProfileHasTaskResponse() {
    }

    public Long getIdGradeTask() {
        return idGradeTask;
    }

    public void setIdGradeTask(Long idGradeTask) {
        this.idGradeTask = idGradeTask;
    }

    public TaskStatesResponse getTaskStatesIdTaskState() {
        return taskStatesIdTaskState;
    }

    public void setTaskStatesIdTaskState(TaskStatesResponse taskStatesIdTaskState) {
        this.taskStatesIdTaskState = taskStatesIdTaskState;
    }

    public TaskHasDateResponse getTaskHasDateIdTaskHasDate() {
        return taskHasDateIdTaskHasDate;
    }

    public void setTaskHasDateIdTaskHasDate(TaskHasDateResponse taskHasDateIdTaskHasDate) {
        this.taskHasDateIdTaskHasDate = taskHasDateIdTaskHasDate;
    }

    public GradeProfileResponse getGradeProfileIdGradePro() {
        return gradeProfileIdGradePro;
    }

    public void setGradeProfileIdGradePro(GradeProfileResponse gradeProfileIdGradePro) {
        this.gradeProfileIdGradePro = gradeProfileIdGradePro;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
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

    public GradeProfileHasTaskResponse gradeProfileHasTaskEntityToResponse(GradeProfileHasTaskEntity entity){
        GradeProfileHasTaskResponse response = new GradeProfileHasTaskResponse();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        response.setIdGradeTask(entity.getIdGradeTask() != null ? entity.getIdGradeTask() : -1);
        response.setTaskStatesIdTaskState(entity.getTaskStatesIdTaskState() != null ? new TaskStatesResponse().taskStatesEntityToResponse(entity.getTaskStatesIdTaskState()) : null);
        response.setTaskHasDateIdTaskHasDate(entity.getTaskHasDateIdTaskHasDate() != null ? new TaskHasDateResponse().taskHasDateEntityToResponse(entity.getTaskHasDateIdTaskHasDate()) : null);
        response.setGradeProfileIdGradePro(entity.getGradeProfileIdGradePro() != null ? new GradeProfileResponse().gradeProfileEntityToResponse(entity.getGradeProfileIdGradePro()) : null);
        response.setComments(entity.getComments() != null ? entity.getComments() : null);
        response.setStatus(entity.getStatus());
        response.setCreatedAt(entity.getCreatedAt() != null ? entity.getCreatedAt().format(formatter) : LocalDateTime.MIN.toString());
        return response;

    }
}
