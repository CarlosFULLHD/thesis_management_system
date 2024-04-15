package grado.ucb.edu.back_end_grado.persistence.entity;
import jakarta.persistence.*;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@Entity(name = "task_has_date")
@Table(name = "task_has_date")
public class TaskHasDateEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_task_date", nullable = false)
    private Long idTaskDate;
    @ManyToOne
    @JoinColumn(name = "task_id_task", referencedColumnName = "id_task", nullable = false)
    private TaskEntity taskIdTask;
    @ManyToOne
    @JoinColumn(name = "academic_period_id_acad", referencedColumnName = "id_acad", nullable = false)
    private AcademicPeriodEntity academicPeriodIdAcad;
    @Column(name = "publication_date", nullable = false)
    private LocalDateTime publicationDate;
    @Column(name = "deadline", nullable = false)
    private LocalDateTime deadline;
    @Column(name = "order_is", nullable = false)
    private int orderIs;
    @Column(name = "is_url", nullable = false)
    private int isUrl;
    @Column(name = "is_meeting", nullable = false)
    private int isMeeting;
    @Column(name = "status", nullable = false)
    private int status;
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

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

    public LocalDateTime getPublicationDate() {
        return publicationDate;
    }

    public void setPublicationDate(LocalDateTime publicationDate) {
        this.publicationDate = publicationDate;
    }

    public LocalDateTime getDeadline() {
        return deadline;
    }

    public void setDeadline(LocalDateTime deadline) {
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
