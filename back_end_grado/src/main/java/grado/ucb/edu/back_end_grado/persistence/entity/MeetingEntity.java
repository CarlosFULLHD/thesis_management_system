package grado.ucb.edu.back_end_grado.persistence.entity;
import jakarta.persistence.*;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@Entity(name = "meeting")
@Table(name = "meeting")
public class MeetingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_meeting", nullable = false)
    private Long idMeeting;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "grade_profile_has_task_id_task", referencedColumnName = "id_task")
    private GradeProfileHasTaskEntity gradeProfileHasTaskIdTask;
    @Column(name = "address_link", length = 300, nullable = false)
    private String addressLink;
    @Column(name = "is_virtual", nullable = false)
    private int isVirtual;
    @Column(name = "meeting_date", nullable = false)
    private LocalDateTime meetingDate;
    @Column(name = "status", nullable = false)
    private int status;
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    @PrePersist
    protected void onCreate(){
        meetingDate = LocalDateTime.now();
        createdAt = LocalDateTime.now();
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

    public LocalDateTime getMeetingDate() {
        return meetingDate;
    }

    public void setMeetingDate(LocalDateTime meetingDate) {
        this.meetingDate = meetingDate;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
