package grado.ucb.edu.back_end_grado.persistence.entity;
import jakarta.persistence.*;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@Entity(name = "task_states")
@Table(name = "task_states")
public class TaskStatesEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_task_state", nullable = false)
    private Long idTaskState;
    @Column(name = "description", length = 35, nullable = false)
    private String description;
    @Column(name = "status", nullable = false)
    private int status;
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    @OneToMany(mappedBy = "taskStatesIdTaskState", orphanRemoval = true, cascade = CascadeType.ALL)
    List<GradeProfileHasTaskEntity> gradeProfileHasTaskEntityList;
    @OneToMany(mappedBy = "taskStatesIdTaskState", orphanRemoval = true, cascade = CascadeType.ALL)
    List<UrlsEntity> urlsEntityList;
    @OneToMany(mappedBy = "taskStatesIdTaskState", orphanRemoval = true, cascade = CascadeType.ALL)
    List<MilestoneEntity> milestoneEntityList;
    @PrePersist
    protected void onCreate(){
        description = description.trim();
        description = description.toUpperCase();
        status = 1;
        createdAt = LocalDateTime.now();
    }

    public Long getIdTaskState() {
        return idTaskState;
    }

    public void setIdTaskState(Long idTaskState) {
        this.idTaskState = idTaskState;
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

    public List<GradeProfileHasTaskEntity> getGradeProfileHasTaskEntityList() {
        return gradeProfileHasTaskEntityList;
    }

    public void setGradeProfileHasTaskEntityList(List<GradeProfileHasTaskEntity> gradeProfileHasTaskEntityList) {
        this.gradeProfileHasTaskEntityList = gradeProfileHasTaskEntityList;
    }

    public List<UrlsEntity> getUrlsEntityList() {
        return urlsEntityList;
    }

    public void setUrlsEntityList(List<UrlsEntity> urlsEntityList) {
        this.urlsEntityList = urlsEntityList;
    }

    public List<MilestoneEntity> getMilestoneEntityList() {
        return milestoneEntityList;
    }

    public void setMilestoneEntityList(List<MilestoneEntity> milestoneEntityList) {
        this.milestoneEntityList = milestoneEntityList;
    }
}
