package grado.ucb.edu.back_end_grado.dto.response;

import grado.ucb.edu.back_end_grado.persistence.entity.GradeProfileHasTaskEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.UrlsEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class UrlsResponse {
    private Long idUrls;
    private GradeProfileHasTaskResponse gradeProfileHasTaskIdTask;
    private String url;
    private String description;
    private int status;
    private String createdAt;

    public UrlsResponse() {
    }

    public Long getIdUrls() {
        return idUrls;
    }

    public void setIdUrls(Long idUrls) {
        this.idUrls = idUrls;
    }

    public GradeProfileHasTaskResponse getGradeProfileHasTaskIdTask() {
        return gradeProfileHasTaskIdTask;
    }

    public void setGradeProfileHasTaskIdTask(GradeProfileHasTaskResponse gradeProfileHasTaskIdTask) {
        this.gradeProfileHasTaskIdTask = gradeProfileHasTaskIdTask;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
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
    
    public UrlsResponse urlsEntityToResponse(UrlsEntity entity){
        UrlsResponse response = new UrlsResponse();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        response.setIdUrls(entity.getIdUrls());
        response.setGradeProfileHasTaskIdTask(entity.getGradeProfileHasTaskIdTask() == null ? new GradeProfileHasTaskResponse().gradeProfileHasTaskEntityToResponse(entity.getGradeProfileHasTaskIdTask()) : null);
        response.setUrl(entity.getUrl());
        response.setDescription(entity.getDescription());
        response.setStatus(entity.getStatus());
        response.setCreatedAt(entity.getCreatedAt() != null ? entity.getCreatedAt().format(formatter) : LocalDateTime.MIN.toString());
        return response;
    }
    
}
