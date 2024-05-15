package grado.ucb.edu.back_end_grado.dto.request;

import grado.ucb.edu.back_end_grado.persistence.entity.GradeProfileHasTaskEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.UrlsEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class UrlsRequest {
    private Long idUrls;
    private GradeProfileHasTaskEntity gradeProfileHasTaskIdTask;
    private String url;
    private String description;
    private int status;
    private String createdAt;

    public UrlsRequest() {
    }

    public Long getIdUrls() {
        return idUrls;
    }

    public void setIdUrls(Long idUrls) {
        this.idUrls = idUrls;
    }

    public GradeProfileHasTaskEntity getGradeProfileHasTaskIdTask() {
        return gradeProfileHasTaskIdTask;
    }

    public void setGradeProfileHasTaskIdTask(GradeProfileHasTaskEntity gradeProfileHasTaskIdTask) {
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
    public UrlsEntity urlsRequestToEntity(UrlsRequest request){
        UrlsEntity entity = new UrlsEntity();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        entity.setIdUrls(request.getIdUrls());
        entity.setGradeProfileHasTaskIdTask(request.getGradeProfileHasTaskIdTask());
        entity.setUrl(request.getUrl());
        entity.setDescription(request.getDescription());
        entity.setStatus(request.getStatus());
        entity.setCreatedAt(request.getCreatedAt() != null ? LocalDateTime.parse(request.getCreatedAt(), formatter) : LocalDateTime.MIN);
        return entity;
    }

}
