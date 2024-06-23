package grado.ucb.edu.back_end_grado.dto.request;

import grado.ucb.edu.back_end_grado.persistence.entity.GradeProfileHasTaskEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.MeetingEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class MeetingRequest {
    private Long idMeeting;
    private GradeProfileHasTaskEntity gradeProfileHasTaskIdTask;
    private String addressLink;
    private int isVirtual;
    private String meetingDate;
    private int status;
    private String createdAt;

    public MeetingRequest() {
    }

    public Long getIdMeeting() {
        return idMeeting;
    }

    public void setIdMeeting(Long idMeeting) {
        this.idMeeting = idMeeting;
    }

    public GradeProfileHasTaskEntity getGradeProfileHasTaskIdTask() {
        return gradeProfileHasTaskIdTask;
    }

    public void setGradeProfileHasTaskIdTask(GradeProfileHasTaskEntity gradeProfileHasTaskIdTask) {
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

    public MeetingEntity meetingRequestToEntity(MeetingRequest request){
        MeetingEntity entity = new MeetingEntity();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        entity.setIdMeeting(request.getIdMeeting());
        entity.setGradeProfileHasTaskIdTask(request.getGradeProfileHasTaskIdTask());
        entity.setAddressLink(request.getAddressLink());
        entity.setIsVirtual(request.getIsVirtual());
        entity.setMeetingDate(request.getMeetingDate() != null ? LocalDateTime.parse(request.getMeetingDate(), formatter) : null);
        entity.setStatus(request.getStatus());
        entity.setCreatedAt(request.getCreatedAt() != null ? LocalDateTime.parse(request.getCreatedAt(), formatter) : LocalDateTime.MIN);
        return entity;
    }
}
