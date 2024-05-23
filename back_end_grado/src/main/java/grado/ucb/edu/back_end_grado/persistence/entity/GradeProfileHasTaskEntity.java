package grado.ucb.edu.back_end_grado.persistence.entity;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@Entity(name = "grade_profile_has_task")
@Table(name = "grade_profile_has_task")
public class GradeProfileHasTaskEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_task",nullable = false)
    private Long idTask;
    @ManyToOne
    @JoinColumn(name = "task_states_id_task_state", referencedColumnName = "id_task_state", nullable = false)
    private TaskStatesEntity taskStatesIdTaskState;
    @ManyToOne
    @JoinColumn(name ="academic_has_grade_profile_id_acad_grade", referencedColumnName = "id_acad_grade", nullable = false)
    private AcademicPeriodHasGradeProfileEntity academicHasGradeProfileIdAcadGrade;
    @Column(name = "title_task", nullable = false, length = 100)
    private String titleTask;
    @Column(name = "task", nullable = false, length = 500)
    private String task;
    @Column(name = "feedback", nullable = false, length = 500)
    private String feedback;
    @Column(name = "order_is", nullable = false)
    private int orderIs;
    @Column(name = "is_url", nullable = false)
    private int isUrl;
    @Column(name = "is_meeting", nullable = false)
    private int isMeeting;
    @Column(name = "is_student_or_tutor", nullable = false)
    private int isStudentOrTutor;
    @Column(name = "publication_date", nullable = false, updatable = false)
    private LocalDateTime publicationDate;
    @Column(name = "deadline", nullable = false, updatable = false)
    private LocalDateTime deadline;
    @Column(name = "status", nullable = false)
    private int status;
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    @OneToOne(mappedBy = "gradeProfileHasTaskIdTask")
    private UrlsEntity urlsEntity;
    @OneToOne(mappedBy = "gradeProfileHasTaskIdTask")
    private MeetingEntity meetingEntity;

    @PrePersist
    protected void onCreate() {
        status = 1;
        createdAt = LocalDateTime.now();
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

    public int getIsStudentOrTutor() {
        return isStudentOrTutor;
    }

    public void setIsStudentOrTutor(int isStudentOrTutor) {
        this.isStudentOrTutor = isStudentOrTutor;
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

    public UrlsEntity getUrlsEntity() {
        return urlsEntity;
    }

    public void setUrlsEntity(UrlsEntity urlsEntity) {
        this.urlsEntity = urlsEntity;
    }

    public MeetingEntity getMeetingEntity() {
        return meetingEntity;
    }

    public void setMeetingEntity(MeetingEntity meetingEntity) {
        this.meetingEntity = meetingEntity;
    }
}
