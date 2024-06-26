package grado.ucb.edu.back_end_grado.dto.request;

import grado.ucb.edu.back_end_grado.persistence.entity.TaskStatesEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class TaskStatesRequest {
    private Long idTaskState;
    private String description;
    private int status;
    private String createdAt;

    public TaskStatesRequest() {
    }

    public Long getIdTaskState() {
        return idTaskState;
    }

    public void setIdTaskState(Long idTaskState) {
        this.idTaskState = idTaskState;
    }
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public TaskStatesEntity taskStatesRequestToEntity(TaskStatesRequest request) {
        TaskStatesEntity entity = new TaskStatesEntity();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        entity.setIdTaskState(request.getIdTaskState() != null ? request.getIdTaskState() : null);
        entity.setDescription(request.getDescription() != null ? request.getDescription() : null);
        entity.setStatus(request.getStatus());
        entity.setCreatedAt(request.getCreatedAt() != null ? LocalDateTime.parse(request.getCreatedAt(), formatter) : LocalDateTime.MIN );
        return entity;
    }

}
