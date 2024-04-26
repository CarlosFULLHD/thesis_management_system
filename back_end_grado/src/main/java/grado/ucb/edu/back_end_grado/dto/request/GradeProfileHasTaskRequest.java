package grado.ucb.edu.back_end_grado.dto.request;

import grado.ucb.edu.back_end_grado.persistence.entity.GradeProfileEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.GradeProfileHasTaskEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.TaskEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.TaskHasDateEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.TaskStatesEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class GradeProfileHasTaskRequest {
    private Long idGradeTask;
    private TaskStatesEntity taskStatesIdTaskState;
    private TaskHasDateEntity taskHasDateIdTaskHasDate;
    private GradeProfileEntity gradeProfileIdGradePro;
    private String comments;
    private String publicationDate;
    private String deadline;
    private int status;
    private String createdAt;

    public GradeProfileHasTaskRequest() {
    }

    public Long getIdGradeTask() {
        return idGradeTask;
    }

    public void setIdGradeTask(Long idGradeTask) {
        this.idGradeTask = idGradeTask;
    }

    public TaskStatesEntity getTaskStatesIdTaskState() {
        return taskStatesIdTaskState;
    }

    public void setTaskStatesIdTaskState(TaskStatesEntity taskStatesIdTaskState) {
        this.taskStatesIdTaskState = taskStatesIdTaskState;
    }

    public TaskHasDateEntity getTaskHasDateIdTaskHasDate() {
        return taskHasDateIdTaskHasDate;
    }

    public void setTaskHasDateIdTaskHasDate(TaskHasDateEntity taskHasDateIdTaskHasDate) {
        this.taskHasDateIdTaskHasDate = taskHasDateIdTaskHasDate;
    }

    public GradeProfileEntity getGradeProfileIdGradePro() {
        return gradeProfileIdGradePro;
    }

    public void setGradeProfileIdGradePro(GradeProfileEntity gradeProfileIdGradePro) {
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

    public GradeProfileHasTaskEntity gradeProfileHasTaskRequestToEntity(GradeProfileHasTaskRequest request){
        GradeProfileHasTaskEntity entity = new GradeProfileHasTaskEntity();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        entity.setIdGradeTask(request.getIdGradeTask() != null ? request.getIdGradeTask() : -1);
        entity.setTaskStatesIdTaskState(request.getTaskStatesIdTaskState() != null ? request.getTaskStatesIdTaskState() : null);
        entity.setGradeProfileIdGradePro(request.getGradeProfileIdGradePro() != null ? request.getGradeProfileIdGradePro() : null);
        entity.setComments(request.getComments() != null ? request.getComments() : null);
        entity.setStatus(request.getStatus());
        entity.setCreatedAt(request.getCreatedAt() != null ? LocalDateTime.parse(request.getCreatedAt(), formatter) : LocalDateTime.MIN );
        return entity;

    }
}
