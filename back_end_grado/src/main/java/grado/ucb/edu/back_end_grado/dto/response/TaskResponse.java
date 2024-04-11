package grado.ucb.edu.back_end_grado.dto.response;

import grado.ucb.edu.back_end_grado.persistence.entity.TaskEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class TaskResponse {
    private Long idTask;
    private String titleTask;
    private String task;
    private int isGradeoneortwo;
    private String publicationDate;
    private String deadline;
    private int status;
    private String createdAt;

    public TaskResponse() {
    }

    public Long getIdTask() {
        return idTask;
    }

    public void setIdTask(Long idTask) {
        this.idTask = idTask;
    }

    public String getTitleTask() {
        return titleTask;
    }

    public void setTitleTask(String titleTask) {
        this.titleTask = titleTask;
    }

    public String getTask() {
        return task;
    }

    public void setTask(String task) {
        this.task = task;
    }

    public int getIsGradeoneortwo() {
        return isGradeoneortwo;
    }

    public void setIsGradeoneortwo(int isGradeoneortwo) {
        this.isGradeoneortwo = isGradeoneortwo;
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

    public TaskResponse taskEntityToResponse(TaskEntity entity){
        TaskResponse response = new TaskResponse();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        response.setIdTask(entity.getIdTask() != null ? entity.getIdTask() : -1);
        response.setTitleTask(entity.getTitleTask() != null ? entity.getTitleTask() : null);
        response.setTask(entity.getTask() != null ? entity.getTask() : null);
        response.setIsGradeoneortwo(entity.getIsGradeoneortwo());
        response.setPublicationDate(entity.getPublicationDate() != null ? entity.getPublicationDate().format(formatter) : LocalDateTime.MIN.toString());
        response.setDeadline(entity.getDeadline() != null ? entity.getDeadline().format(formatter) : LocalDateTime.MIN.toString());
        response.setStatus(entity.getStatus());
        response.setCreatedAt(entity.getCreatedAt() != null ? entity.getCreatedAt().format(formatter) : LocalDateTime.MIN.toString());
        return response;
    }
}
