package grado.ucb.edu.back_end_grado.dto.response;

import grado.ucb.edu.back_end_grado.persistence.entity.MeetingEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class MeetingResponse {
    private Long idMeeting;
    private GradeProfileHasTaskResponse gradeProfileHasTaskIdTask;
    private String addressLink;
    private int isVirtual;
    private String meetingDate;
    private int status;
    private String createdAt;

    public MeetingResponse() {
    }

    public Long getIdMeeting() {
        return idMeeting;
    }

    public void setIdMeeting(Long idMeeting) {
        this.idMeeting = idMeeting;
    }

    public GradeProfileHasTaskResponse getGradeProfileHasTaskIdTask() {
        return gradeProfileHasTaskIdTask;
    }

    public void setGradeProfileHasTaskIdTask(GradeProfileHasTaskResponse gradeProfileHasTaskIdTask) {
        this.gradeProfileHasTaskIdTask = gradeProfileHasTaskIdTask;
    }

    public String getAddressLink() {
        return addressLink;
    }

    public void setAddressLink(String addressLink) {
        this.addressLink = addressLink;
    }

    public int getIsVirtual() {
        return isVirtual;
    }

    public void setIsVirtual(int isVirtual) {
        this.isVirtual = isVirtual;
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
    
    public MeetingResponse meetingEntityToResponse(MeetingEntity entity){
        MeetingResponse response = new MeetingResponse();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        response.setIdMeeting(entity.getIdMeeting());
        response.setGradeProfileHasTaskIdTask(entity.getGradeProfileHasTaskIdTask() == null ? new GradeProfileHasTaskResponse().gradeProfileHasTaskEntityToResponse(entity.getGradeProfileHasTaskIdTask()) : null);
        response.setAddressLink(entity.getAddressLink());
        response.setIsVirtual(entity.getIsVirtual());
        response.setMeetingDate((entity.getMeetingDate() != null ? entity.getMeetingDate().format(formatter) : LocalDateTime.MIN.toString()));
        response.setStatus(entity.getStatus());
        response.setCreatedAt(entity.getCreatedAt() != null ? entity.getCreatedAt().format(formatter) : LocalDateTime.MIN.toString());
        return response;
    }
}
