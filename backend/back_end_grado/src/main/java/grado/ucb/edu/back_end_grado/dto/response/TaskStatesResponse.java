package grado.ucb.edu.back_end_grado.dto.response;

import grado.ucb.edu.back_end_grado.persistence.entity.TaskStatesEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class TaskStatesResponse {
    private Long idTaskState;
    private String description;
    private int status;
    private String createdAt;

    public TaskStatesResponse() {
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

    public TaskStatesResponse taskStatesEntityToResponse(TaskStatesEntity entity){
        TaskStatesResponse response = new TaskStatesResponse();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        response.setIdTaskState(entity.getIdTaskState() != null ? entity.getIdTaskState() : -1);
        response.setDescription(entity.getDescription() != null ? entity.getDescription() : null);
        response.setStatus(entity.getStatus());
        response.setCreatedAt(entity.getCreatedAt() != null ? entity.getCreatedAt().format(formatter) : LocalDateTime.MIN.toString());
        return response;
    }
}
