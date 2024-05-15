package grado.ucb.edu.back_end_grado.dto.request;
import grado.ucb.edu.back_end_grado.persistence.entity.AcademicPeriodHasGradeProfileEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.GradeProfileHasTaskEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.TaskStatesEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;


@Component
public class GradeProfileHasTaskRequest {
    private Long idTask;
    private TaskStatesEntity taskStatesIdTaskState;
    private AcademicPeriodHasGradeProfileEntity academicHasGradeProfileIdAcadGrade;
    private String titleTask;
    private String task;
    private String feedBack;
    private int orderIs;
    private int isUrl;
    private int isMeeting;
    private String publicationDate;
    private String deadline;
    private int status;
    private String createdAt;

    public GradeProfileHasTaskRequest() {
    }

    public Long getIdTask() {
        return idTask;
    }

    public void setIdTask(Long idTask) {
        this.idTask = idTask;
    }

    public TaskStatesEntity getTaskStatesIdTaskState() {
        return taskStatesIdTaskState;
    }

    public void setTaskStatesIdTaskState(TaskStatesEntity taskStatesIdTaskState) {
        this.taskStatesIdTaskState = taskStatesIdTaskState;
    }

    public AcademicPeriodHasGradeProfileEntity getAcademicHasGradeProfileIdAcadGrade() {
        return academicHasGradeProfileIdAcadGrade;
    }

    public void setAcademicHasGradeProfileIdAcadGrade(AcademicPeriodHasGradeProfileEntity academicHasGradeProfileIdAcadGrade) {
        this.academicHasGradeProfileIdAcadGrade = academicHasGradeProfileIdAcadGrade;
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

    public String getFeedBack() {
        return feedBack;
    }

    public void setFeedBack(String feedBack) {
        this.feedBack = feedBack;
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
        entity.setIdTask(request.getIdTask());
        entity.setTaskStatesIdTaskState(request.getTaskStatesIdTaskState());
        entity.setAcademicHasGradeProfileIdAcadGrade(request.getAcademicHasGradeProfileIdAcadGrade());
        entity.setTitleTask(request.getTitleTask());
        entity.setTask(request.getTask());
        entity.setFeedback(request.getFeedBack());
        entity.setOrderIs(request.getOrderIs());
        entity.setIsUrl(request.getIsUrl());
        entity.setIsMeeting(request.getIsMeeting());
        entity.setPublicationDate(request.getPublicationDate() != null ? LocalDateTime.parse(request.getPublicationDate(), formatter) : null);
        entity.setDeadline(request.getDeadline() != null ? LocalDateTime.parse(request.getDeadline(), formatter) : null);
        entity.setStatus(request.getStatus());
        entity.setCreatedAt(request.getCreatedAt() != null ? LocalDateTime.parse(request.getCreatedAt(), formatter) : LocalDateTime.MIN);
        return entity;
    }
}
