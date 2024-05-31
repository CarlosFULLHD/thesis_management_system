package grado.ucb.edu.back_end_grado.dto.response;

import grado.ucb.edu.back_end_grado.persistence.entity.MilestoneEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class MilestoneResponse {
    private Long idMilestone;
    private TaskStatesResponse taskStatesIdTaskState;
    private UsersResponse usersIdUsers;
    private String comments;
    private String url;
    private String plpInvolved;
    private int isStudentOrCoordinator;
    private int isSend;
    private String meetingDate;
    private int status;
    private String createdAt;

    public MilestoneResponse() {
    }

    public Long getIdMilestone() {
        return idMilestone;
    }

    public void setIdMilestone(Long idMilestone) {
        this.idMilestone = idMilestone;
    }

    public TaskStatesResponse getTaskStatesIdTaskState() {
        return taskStatesIdTaskState;
    }

    public void setTaskStatesIdTaskState(TaskStatesResponse taskStatesIdTaskState) {
        this.taskStatesIdTaskState = taskStatesIdTaskState;
    }

    public UsersResponse getUsersIdUsers() {
        return usersIdUsers;
    }

    public void setUsersIdUsers(UsersResponse usersIdUsers) {
        this.usersIdUsers = usersIdUsers;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getPlpInvolved() {
        return plpInvolved;
    }

    public void setPlpInvolved(String plpInvolved) {
        this.plpInvolved = plpInvolved;
    }

    public int getIsStudentOrCoordinator() {
        return isStudentOrCoordinator;
    }

    public void setIsStudentOrCoordinator(int isStudentOrCoordinator) {
        this.isStudentOrCoordinator = isStudentOrCoordinator;
    }

    public int getIsSend() {
        return isSend;
    }

    public void setIsSend(int isSend) {
        this.isSend = isSend;
    }

    public String getMeetingDate() {
        return meetingDate;
    }

    public void setMeetingDate(String meetingDate) {
        this.meetingDate = meetingDate;
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

    public MilestoneResponse milestoneEntityToResponse(MilestoneEntity entity){
        MilestoneResponse response = new MilestoneResponse();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        response.setIdMilestone(entity.getIdMilestone());
        response.setTaskStatesIdTaskState(new TaskStatesResponse().taskStatesEntityToResponse(entity.getTaskStatesIdTaskState()));
        response.setUsersIdUsers(new UsersResponse().usersEntityToResponse(entity.getUsersIdUsers()));
        response.setComments(entity.getComments());
        response.setUrl(entity.getUrl());
        response.setPlpInvolved(entity.getPlpInvolved());
        response.setIsStudentOrCoordinator(entity.getIsStudentOrCoordinator());
        response.setIsSend(entity.getIsSend());
        response.setMeetingDate(entity.getMeetingDate() != null ? entity.getMeetingDate().format(formatter) : LocalDateTime.MIN.toString());
        response.setStatus(entity.getStatus());
        response.setCreatedAt(entity.getCreatedAt() != null ? entity.getCreatedAt().format(formatter) : LocalDateTime.MIN.toString());
        return response;
    }
}
