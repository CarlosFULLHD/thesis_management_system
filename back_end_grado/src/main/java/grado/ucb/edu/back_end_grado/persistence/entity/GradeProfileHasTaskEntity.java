package grado.ucb.edu.back_end_grado.persistence.entity;
import jakarta.persistence.*;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@Entity(name = "grade_profile_has_task")
@Table(name = "grade_profile_has_task")
public class GradeProfileHasTaskEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_grade_task", nullable = false)
    private Long idGradeTask;
    @ManyToOne
    @JoinColumn(name = "task_states_id_taks_state", referencedColumnName = "id_task_state", nullable = false)
    private TaskStatesEntity taskStatesIdTaskState;
    @ManyToOne
    @JoinColumn(name = "task_id_task", referencedColumnName = "id_task", nullable = false)
    private TaskEntity taskIdTask;
    @ManyToOne
    @JoinColumn(name = "grade_profile_id_grade_pro", referencedColumnName = "id_grade_pro", nullable = false)
    private GradeProfileEntity gradeProfileIdGradePro;
    @Column(name = "comments", length = 4000, nullable = false)
    private String comments;
    @Column(name = "publication_date", nullable = false)
    private LocalDateTime publicationDate;
    @Column(name = "deadline", nullable = false)
    private LocalDateTime deadline;
    @Column(name = "status", nullable = false)
    private int status;
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    @OneToMany(mappedBy = "gradeProfileHasTaskIdGradeTask", orphanRemoval = true, cascade = CascadeType.ALL)
    List<UrlsEntity> urlsEntityList;
    @OneToMany(mappedBy = "gradeProfileHasTaskIdGradeTask", orphanRemoval = true, cascade = CascadeType.ALL)
    List<MeetingEntity> meetingEntityList;

    public Long getIdGradeTask() {
        return idGradeTask;
    }

    public void setIdGradeTask(Long idGradeTask) {
        this.idGradeTask = idGradeTask;
    }

    public TaskStatesEntity getTaskStatesIdTaskState() {
        return taskStatesIdTaskState;
    }

    public void setTaskStatesIdTaskState(TaskStatesEntity taskStatesIdTaskState) {
        this.taskStatesIdTaskState = taskStatesIdTaskState;
    }

    public TaskEntity getTaskIdTask() {
        return taskIdTask;
    }

    public void setTaskIdTask(TaskEntity taskIdTask) {
        this.taskIdTask = taskIdTask;
    }

    public GradeProfileEntity getGradeProfileIdGradePro() {
        return gradeProfileIdGradePro;
    }

    public void setGradeProfileIdGradePro(GradeProfileEntity gradeProfileIdGradePro) {
        this.gradeProfileIdGradePro = gradeProfileIdGradePro;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
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

    public List<UrlsEntity> getUrlsEntityList() {
        return urlsEntityList;
    }

    public void setUrlsEntityList(List<UrlsEntity> urlsEntityList) {
        this.urlsEntityList = urlsEntityList;
    }

    public List<MeetingEntity> getMeetingEntityList() {
        return meetingEntityList;
    }

    public void setMeetingEntityList(List<MeetingEntity> meetingEntityList) {
        this.meetingEntityList = meetingEntityList;
    }
}
