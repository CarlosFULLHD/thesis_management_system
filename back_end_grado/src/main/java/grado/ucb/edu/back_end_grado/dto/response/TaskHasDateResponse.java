package grado.ucb.edu.back_end_grado.dto.response;
import grado.ucb.edu.back_end_grado.persistence.entity.TaskHasDateEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class TaskHasDateResponse {
    private Long idTaskDate;
    private TaskResponse taskIdTask;
    private AcademicPeriodResponse academicPeriodIdAcad;
    private String publicationDate;
    private String deadline;
    private int orderIs;
    private int isUrl;
    private int isMeeting;
    private int status;
    private String createdAt;

    public TaskHasDateResponse() {
    }

    public Long getIdTaskDate() {
        return idTaskDate;
    }

    public void setIdTaskDate(Long idTaskDate) {
        this.idTaskDate = idTaskDate;
    }

    public TaskResponse getTaskIdTask() {
        return taskIdTask;
    }

    public void setTaskIdTask(TaskResponse taskIdTask) {
        this.taskIdTask = taskIdTask;
    }

    public AcademicPeriodResponse getAcademicPeriodIdAcad() {
        return academicPeriodIdAcad;
    }

    public void setAcademicPeriodIdAcad(AcademicPeriodResponse academicPeriodIdAcad) {
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

    public TaskHasDateResponse taskHasDateEntityToResponse(TaskHasDateEntity entity){
        TaskHasDateResponse response = new TaskHasDateResponse();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        response.setIdTaskDate(entity.getIdTaskDate() != null ? entity.getIdTaskDate() : -1);
        response.setTaskIdTask(entity.getTaskIdTask() != null ? new TaskResponse().taskEntityToResponse(entity.getTaskIdTask()) : null);
        response.setAcademicPeriodIdAcad(entity.getAcademicPeriodIdAcad() != null ? new AcademicPeriodResponse().academicPeriodEntityToResponse(entity.getAcademicPeriodIdAcad()) : null);
        response.setPublicationDate(entity.getPublicationDate() != null ? entity.getPublicationDate().format(formatter) : LocalDateTime.MIN.toString() );
        response.setDeadline(entity.getDeadline() != null ? entity.getDeadline().format(formatter) : LocalDateTime.MIN.toString() );
        response.setOrderIs(entity.getOrderIs());
        response.setIsUrl(entity.getIsUrl());
        response.setIsMeeting(entity.getIsMeeting());
        response.setStatus(entity.getStatus());
        response.setCreatedAt(entity.getCreatedAt() != null ? entity.getCreatedAt().format(formatter) : LocalDateTime.MIN.toString() );
        return response;
    }
}
