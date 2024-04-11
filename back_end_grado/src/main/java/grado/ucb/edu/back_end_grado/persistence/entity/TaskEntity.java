package grado.ucb.edu.back_end_grado.persistence.entity;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@Entity(name = "task")
@Table(name = "task")
public class TaskEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_task", nullable = false)
    private Long idTask;
    @Column(name = "title_task", length = 100, nullable = false)
    private String titleTask;
    @Column(name = "task", length = 500, nullable = false)
    private String task;
    @Column(name = "is_gradeoneortwo", nullable = false)
    private int isGradeoneortwo;
    @Column(name = "publication_date", nullable = false)
    private LocalDateTime publicationDate;
    @Column(name = "deadline", nullable = false)
    private LocalDateTime deadline;
    @Column(name = "status", nullable = false)
    private int status;
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    @OneToMany(mappedBy = "taskIdTask", orphanRemoval = true, cascade = CascadeType.ALL)
    List<GradeProfileHasTaskEntity> gradeProfileHasTaskEntityList;
    @PrePersist
    protected void onCreate(){
        titleTask = titleTask.trim();
        task = task.trim();
        status = 1;
        createdAt = LocalDateTime.now();
    }

    public Long getIdTask() {
        return idTask;
    }

    public void setIdTask(Long idTask) {
        this.idTask = idTask;
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

    public int getIsGradeoneortwo() {
        return isGradeoneortwo;
    }

    public void setIsGradeoneortwo(int isGradeoneortwo) {
        this.isGradeoneortwo = isGradeoneortwo;
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

    public List<GradeProfileHasTaskEntity> getGradeProfileHasTaskEntityList() {
        return gradeProfileHasTaskEntityList;
    }

    public void setGradeProfileHasTaskEntityList(List<GradeProfileHasTaskEntity> gradeProfileHasTaskEntityList) {
        this.gradeProfileHasTaskEntityList = gradeProfileHasTaskEntityList;
    }
}
