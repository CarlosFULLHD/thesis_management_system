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
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "grade_profile_has_task_id_task", referencedColumnName = "id_task")
    private GradeProfileHasTaskEntity gradeProfileHasTaskIdTask;
    @Column(name = "url", length = 300, nullable = false)
    private String url;
    @Column(name = "description", length = 300, nullable = false)
    private String description;
    @Column(name = "status", nullable = false)
    private int status;
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    @PrePersist
    protected void onCreate(){
        description = description.trim();
        status = 1;
        createdAt = LocalDateTime.now();
    }

    public Long getIdUrls() {
        return idUrls;
    }

    public void setIdUrls(Long idUrls) {
        this.idUrls = idUrls;
    }

    public GradeProfileHasTaskEntity getGradeProfileHasTaskIdTask() {
        return gradeProfileHasTaskIdTask;
    }

    public void setGradeProfileHasTaskIdTask(GradeProfileHasTaskEntity gradeProfileHasTaskIdTask) {
        this.gradeProfileHasTaskIdTask = gradeProfileHasTaskIdTask;
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
