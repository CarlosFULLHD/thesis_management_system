package grado.ucb.edu.back_end_grado.persistence.entity;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@Entity(name = "academic_period")
@Table(name = "academic_period")
@Schema(
        description = "Entidad de periodo académico, alberga las fechas a las cuales se relacionan con el " +
                "inicio y fin de un semestre"
)
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
    @Column(name = "account_until", nullable = false)
    private LocalDateTime accountUntil;
    @Column(name = "status", nullable = false)
    private int status;
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    @OneToMany(mappedBy = "academicPeriodIdAcad", orphanRemoval = true, cascade = CascadeType.ALL)
    List<AcademicPeriodHasGradeProfileEntity> academicPeriodHasGradeProfileEntityList;

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

    public LocalDateTime getAccountUntil() {
        return accountUntil;
    }

    public void setAccountUntil(LocalDateTime accountUntil) {
        this.accountUntil = accountUntil;
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

    public List<AcademicPeriodHasGradeProfileEntity> getAcademicPeriodHasGradeProfileEntityList() {
        return academicPeriodHasGradeProfileEntityList;
    }

    public void setAcademicPeriodHasGradeProfileEntityList(List<AcademicPeriodHasGradeProfileEntity> academicPeriodHasGradeProfileEntityList) {
        this.academicPeriodHasGradeProfileEntityList = academicPeriodHasGradeProfileEntityList;
    }
}
