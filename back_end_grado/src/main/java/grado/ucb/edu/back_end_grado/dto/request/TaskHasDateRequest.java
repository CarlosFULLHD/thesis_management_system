package grado.ucb.edu.back_end_grado.dto.request;

import grado.ucb.edu.back_end_grado.persistence.entity.AcademicPeriodEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.TaskEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.TaskHasDateEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Component
public class TaskHasDateRequest {
    private Long idTaskDate;
    private TaskEntity taskIdTask;
    private AcademicPeriodEntity academicPeriodIdAcad;
    private String publicationDate;
    private String deadline;
    private int orderIs;
    private int isUrl;
    private int isMeeting;
    private int status;
    private String createdAt;

    public TaskHasDateRequest() {
    }

    public Long getIdTaskDate() {
        return idTaskDate;
    }

    public void setIdTaskDate(Long idTaskDate) {
        this.idTaskDate = idTaskDate;
    }

    public TaskEntity getTaskIdTask() {
        return taskIdTask;
    }

    public void setTaskIdTask(TaskEntity taskIdTask) {
        this.taskIdTask = taskIdTask;
    }

    public AcademicPeriodEntity getAcademicPeriodIdAcad() {
        return academicPeriodIdAcad;
    }

    public void setAcademicPeriodIdAcad(AcademicPeriodEntity academicPeriodIdAcad) {
        this.academicPeriodIdAcad = academicPeriodIdAcad;
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

    public int getOrderIs() {
        return orderIs;
    }

    public void setOrderIs(int orderIs) {
        this.orderIs = orderIs;
    }

    public int getIsUrl() {
        return isUrl;
    }

    public void setIsUrl(int isUrl) {
        this.isUrl = isUrl;
    }

    public int getIsMeeting() {
        return isMeeting;
    }

    public void setIsMeeting(int isMeeting) {
        this.isMeeting = isMeeting;
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
    public TaskHasDateEntity taskHasDateRequestToEntity(TaskHasDateRequest request){
        TaskHasDateEntity entity = new TaskHasDateEntity();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        entity.setIdTaskDate(request.getIdTaskDate() != null ? request.getIdTaskDate() : -1);
        entity.setTaskIdTask(request.getTaskIdTask() != null ? request.getTaskIdTask() : null);
        entity.setAcademicPeriodIdAcad(request.getAcademicPeriodIdAcad() != null ? request.getAcademicPeriodIdAcad() : null);
        entity.setPublicationDate(request.getPublicationDate() != null ? LocalDateTime.parse(request.getPublicationDate(), formatter) : LocalDateTime.MIN );
        entity.setDeadline(request.getDeadline() != null ? LocalDateTime.parse(request.getDeadline(), formatter) : LocalDateTime.MIN );
        entity.setOrderIs(request.getOrderIs());
        entity.setIsUrl(request.getIsUrl());
        entity.setIsMeeting(request.getIsMeeting());
        entity.setStatus(request.getStatus());
        entity.setCreatedAt(request.getCreatedAt() != null ? LocalDateTime.parse(request.getCreatedAt(), formatter) : LocalDateTime.MIN );
        return entity;
    }
}


