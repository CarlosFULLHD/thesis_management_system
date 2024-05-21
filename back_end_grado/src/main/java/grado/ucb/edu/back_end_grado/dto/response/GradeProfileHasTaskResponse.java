package grado.ucb.edu.back_end_grado.dto.response;

import grado.ucb.edu.back_end_grado.persistence.entity.GradeProfileHasTaskEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class GradeProfileHasTaskResponse {
    private Long idTask;
    private TaskStatesResponse taskStatesIdTaskState;
    private AcademicPeriodHasGradeProfileResponse academicHasGradeProfileIdAcadGrade;
    private String titleTask;
    private String task;
    private String feedback;
    private int orderIs;
    private int isUrl;
    private int isMeeting;
    private String publicationDate;
    private String deadline;
    private int status;

    public GradeProfileHasTaskResponse() {
    }

    public Long getIdTask() {
        return idTask;
    }

    public void setIdTask(Long idTask) {
        this.idTask = idTask;
    }

    public TaskStatesResponse getTaskStatesIdTaskState() {
        return taskStatesIdTaskState;
    }

    public void setTaskStatesIdTaskState(TaskStatesResponse taskStatesIdTaskState) {
        this.taskStatesIdTaskState = taskStatesIdTaskState;
    }

    public AcademicPeriodHasGradeProfileResponse getAcademicHasGradeProfileIdAcadGrade() {
        return academicHasGradeProfileIdAcadGrade;
    }

    public void setAcademicHasGradeProfileIdAcadGrade(AcademicPeriodHasGradeProfileResponse academicHasGradeProfileIdAcadGrade) {
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

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
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

    public GradeProfileHasTaskResponse gradeProfileHasTaskEntityToResponse(GradeProfileHasTaskEntity entity) {
        GradeProfileHasTaskResponse response = new GradeProfileHasTaskResponse();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        response.setIdTask(entity.getIdTask());
        response.setTaskStatesIdTaskState(entity.getTaskStatesIdTaskState() != null ? new TaskStatesResponse().taskStatesEntityToResponse(entity.getTaskStatesIdTaskState()) : null);
        response.setAcademicHasGradeProfileIdAcadGrade(entity.getAcademicHasGradeProfileIdAcadGrade() != null ? new AcademicPeriodHasGradeProfileResponse().academicPeriodHasGradeProfileEntityToResponse(entity.getAcademicHasGradeProfileIdAcadGrade()) : null);
        response.setTitleTask(entity.getTitleTask());
        response.setTask(entity.getTask());
        response.setFeedback(entity.getFeedback());
        response.setOrderIs(entity.getOrderIs());
        response.setIsMeeting(entity.getIsMeeting());
        response.setIsUrl(entity.getIsUrl());
        response.setPublicationDate(entity.getPublicationDate() != null ? entity.getPublicationDate().format(formatter) : LocalDateTime.MIN.toString());
        response.setDeadline(entity.getDeadline() != null ? entity.getDeadline().format(formatter) : LocalDateTime.MIN.toString());
        response.setStatus(entity.getStatus());
        return response;
    }
}
