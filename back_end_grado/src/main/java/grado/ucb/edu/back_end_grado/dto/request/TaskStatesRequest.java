package grado.ucb.edu.back_end_grado.dto.request;

import grado.ucb.edu.back_end_grado.persistence.entity.TaskStatesEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class TaskStatesRequest {
    private Long idTaskState;
    private int states;
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

    public int getStates() {
        return states;
    }

    public void setStates(int states) {
        this.states = states;
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
        entity.setIdTaskState(request.getIdTaskState());
        entity.setStates(request.getStates());
        entity.setDescription(request.getDescription());
        entity.setStatus(request.getStatus());
        entity.setCreatedAt(request.getCreatedAt() != null
                ? LocalDateTime.parse(request.getCreatedAt(), formatter)
                : null);  // Assuming the created_at should not be LocalDateTime.MIN for this case

        return entity;
    }

}
