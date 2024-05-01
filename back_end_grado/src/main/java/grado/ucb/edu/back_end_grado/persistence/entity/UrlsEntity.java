package grado.ucb.edu.back_end_grado.persistence.entity;
import jakarta.persistence.*;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@Entity(name = "urls")
@Table(name = "urls")
public class UrlsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_urls", nullable = false)
    private Long idUrls;
    @ManyToOne
    @JoinColumn(name = "grade_profile_has_task_id_grade_task", referencedColumnName = "id_grade_task", nullable = false)
    private GradeProfileHasTaskEntity gradeProfileHasTaskIdGradeTask;
    @ManyToOne
    @JoinColumn(name = "task_states_id_task_state", referencedColumnName = "id_task_state",nullable = false)
    private TaskStatesEntity taskStatesIdTaskState;
    @Column(name = "title", length = 100, nullable = false )
    private String title;
    @Column(name = "url", length = 300, nullable = false)
    private String url;
    @Column(name = "description", length = 300, nullable = false)
    private String description;
    @Column(name = "status", nullable = false)
    private int status;
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public Long getIdUrls() {
        return idUrls;
    }

    public void setIdUrls(Long idUrls) {
        this.idUrls = idUrls;
    }

    public GradeProfileHasTaskEntity getGradeProfileHasTaskIdGradeTask() {
        return gradeProfileHasTaskIdGradeTask;
    }

    public void setGradeProfileHasTaskIdGradeTask(GradeProfileHasTaskEntity gradeProfileHasTaskIdGradeTask) {
        this.gradeProfileHasTaskIdGradeTask = gradeProfileHasTaskIdGradeTask;
    }

    public TaskStatesEntity getTaskStatesIdTaskState() {
        return taskStatesIdTaskState;
    }

    public void setTaskStatesIdTaskState(TaskStatesEntity taskStatesIdTaskState) {
        this.taskStatesIdTaskState = taskStatesIdTaskState;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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
