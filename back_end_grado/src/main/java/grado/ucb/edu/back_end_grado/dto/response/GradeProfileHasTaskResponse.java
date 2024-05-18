package grado.ucb.edu.back_end_grado.dto.response;

import grado.ucb.edu.back_end_grado.persistence.entity.GradeProfileHasTaskEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class GradeProfileHasTaskResponse {
    private Long idTask;
    private String taskState;
    private String titleTask;
    private String task;
    private String feedback;
    private int orderIs;
    private boolean isUrl;
    private boolean isMeeting;
    private String publicationDate;
    private String deadline;
    private int status;

    public Long getIdTask() {
        return idTask;
    }

    public void setIdTask(Long idTask) {
        this.idTask = idTask;
    }

    public String getTaskState() {
        return taskState;
    }

    public void setTaskState(String taskState) {
        this.taskState = taskState;
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

    public boolean isUrl() {
        return isUrl;
    }

    public void setIsUrl(boolean url) {
        isUrl = url;
    }

    public boolean isMeeting() {
        return isMeeting;
    }

    public void setMeeting(boolean meeting) {
        isMeeting = meeting;
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
        response.setTaskState(entity.getTaskStatesIdTaskState() != null ? entity.getTaskStatesIdTaskState().getDescription() : null);
        response.setTitleTask(entity.getTitleTask());
        response.setTask(entity.getTask());
        response.setFeedback(entity.getFeedback());
        response.setOrderIs(entity.getOrderIs());
        response.setPublicationDate(entity.getPublicationDate() != null ? entity.getPublicationDate().format(formatter) : LocalDateTime.MIN.toString());
        response.setDeadline(entity.getDeadline() != null ? entity.getDeadline().format(formatter) : LocalDateTime.MIN.toString());
        response.setStatus(entity.getStatus());
        return response;
    }
}
