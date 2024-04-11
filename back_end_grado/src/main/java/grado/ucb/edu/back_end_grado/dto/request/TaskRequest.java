package grado.ucb.edu.back_end_grado.dto.request;

import grado.ucb.edu.back_end_grado.persistence.entity.TaskEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.TaskStatesEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class TaskRequest {
    private Long idTask;
    private String titleTask;
    private String task;
    private int isGradeoneortwo;
    private String publicationDate;
    private String deadline;
    private int status;
    private String createdAt;

    public TaskRequest() {
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

    public TaskEntity taskRequestToEntity(TaskRequest request){
        TaskEntity entity = new TaskEntity();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        entity.setIdTask(request.getIdTask() != null ? request.getIdTask() : -1);
        entity.setTitleTask(request.getTitleTask() != null ? request.getTitleTask() : null);
        entity.setTask(request.getTask() != null ? request.getTask() : null);
        entity.setIsGradeoneortwo(request.getIsGradeoneortwo());
        entity.setPublicationDate(request.getPublicationDate() != null ? LocalDateTime.parse(request.getPublicationDate(), formatter) : LocalDateTime.MIN );
        entity.setDeadline(request.getDeadline() != null ? LocalDateTime.parse(request.getDeadline(), formatter) : LocalDateTime.MIN );
        entity.setStatus(request.getStatus());
        entity.setCreatedAt(request.getCreatedAt() != null ? LocalDateTime.parse(request.getCreatedAt(), formatter) : LocalDateTime.MIN );
        return entity;
    }
}
