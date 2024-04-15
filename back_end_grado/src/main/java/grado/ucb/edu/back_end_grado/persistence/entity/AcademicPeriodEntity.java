package grado.ucb.edu.back_end_grado.persistence.entity;
import jakarta.persistence.*;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@Entity(name = "academic_period")
@Table(name = "academic_period")
public class AcademicPeriodEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_acad", nullable = false)
    private Long idAcad;
    @Column(name = "semester", length = 35, nullable = false)
    private String semester;
    @Column(name = "init_date", nullable = false)
    private LocalDateTime initDate;
    @Column(name = "end_date", nullable = false)
    private LocalDateTime endDate;
    @Column(name = "status", nullable = false)
    private int status;
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    @OneToMany(mappedBy = "academicPeriodIdAcad", orphanRemoval = true, cascade = CascadeType.ALL)
    List<TaskHasDateEntity> taskHasDateEntityList;

    @PrePersist
    protected void onCreate(){
        int deadline_year = this.endDate.getYear();
        int deadline_mont = this.endDate.getMonthValue();
        String sem = String.format("%s - %s", deadline_mont > 6 ? "II" : "I", deadline_year);
        this.semester = sem;
        status = 1;
        createdAt = LocalDateTime.now();
    }

    public Long getIdAcad() {
        return idAcad;
    }

    public void setIdAcad(Long idAcad) {
        this.idAcad = idAcad;
    }

    public String getSemester() {
        return semester;
    }

    public void setSemester(String semester) {
        this.semester = semester;
    }

    public LocalDateTime getInitDate() {
        return initDate;
    }

    public void setInitDate(LocalDateTime initDate) {
        this.initDate = initDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
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

    public List<TaskHasDateEntity> getTaskHasDateEntityList() {
        return taskHasDateEntityList;
    }

    public void setTaskHasDateEntityList(List<TaskHasDateEntity> taskHasDateEntityList) {
        this.taskHasDateEntityList = taskHasDateEntityList;
    }
}
