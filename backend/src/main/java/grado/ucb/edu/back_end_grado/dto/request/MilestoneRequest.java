package grado.ucb.edu.back_end_grado.dto.request;

import grado.ucb.edu.back_end_grado.persistence.entity.MilestoneEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.TaskStatesEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.UsersEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class MilestoneRequest {
    private Long idMilestone;
    private TaskStatesEntity taskStatesIdTaskState;
    private UsersEntity usersIdUsers;
    private String comments;
    private String url;
    private String plpInvolved;
    private int isStudentOrCoordinator;
    private int isSend;
    private String meetingDate;
    private int status;
    private String createdAt;

    public MilestoneRequest() {
    }

    public Long getIdMilestone() {
        return idMilestone;
    }

    public void setIdMilestone(Long idMilestone) {
        this.idMilestone = idMilestone;
    }

    public TaskStatesEntity getTaskStatesIdTaskState() {
        return taskStatesIdTaskState;
    }

    public void setTaskStatesIdTaskState(TaskStatesEntity taskStatesIdTaskState) {
        this.taskStatesIdTaskState = taskStatesIdTaskState;
    }

    public UsersEntity getUsersIdUsers() {
        return usersIdUsers;
    }

    public void setUsersIdUsers(UsersEntity usersIdUsers) {
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

    public MilestoneEntity milestoneRequestToEntity(MilestoneRequest request){
        MilestoneEntity entity = new MilestoneEntity();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        entity.setIdMilestone(request.idMilestone);
        entity.setTaskStatesIdTaskState(request.getTaskStatesIdTaskState());
        entity.setUsersIdUsers(request.getUsersIdUsers());
        entity.setComments(request.getComments());
        entity.setUrl(request.getUrl());
        entity.setPlpInvolved(request.getPlpInvolved());
        entity.setIsStudentOrCoordinator(request.getIsStudentOrCoordinator());
        entity.setIsSend(request.getIsSend());
        entity.setMeetingDate(request.getMeetingDate() != null ? LocalDateTime.parse(request.getMeetingDate(), formatter) : LocalDateTime.MIN);
        entity.setStatus(request.getStatus());
        entity.setCreatedAt(request.getCreatedAt() != null ? LocalDateTime.parse(request.getCreatedAt(), formatter) : LocalDateTime.MIN);
        return entity;
    }
}
