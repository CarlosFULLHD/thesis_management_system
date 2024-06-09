package grado.ucb.edu.back_end_grado.persistence.entity;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Component
@Entity(name = "formal_defense")
@Table(name = "formal_defense")
public class FormalDefenseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="id_formal", nullable = false)
    private Long idFormal;
    @ManyToOne
    @JoinColumn(name = "task_states_id_task_state", referencedColumnName = "id_task_state", nullable = false)
    private TaskStatesEntity taskStatesIdTaskState;
    @ManyToOne
    @JoinColumn(name ="academic_has_grade_profile_id_acad_grade", referencedColumnName = "id_acad_grade", nullable = false)
    private AcademicPeriodHasGradeProfileEntity academicHasGradeProfileIdAcadGrade;
    @Column(name="feedback", length =600,nullable = false)
    private String feedback;
    @Column(name = "url", length = 300, nullable = false)
    private String url;
    @Column(name = "formal_act", length = 300, nullable = false)
    private String formalAct;
    @Column(name = "plp_involved", length = 600, nullable = false)
    private String plpInvolved;
    @Column(name = "defense_date", nullable = false, updatable = false)
    private LocalDateTime defenseDate;
    @Column(name = "place", nullable = false, length = 300)
    private String place;
    @Column(name = "grade", precision = 15, scale = 5, nullable = false)
    private BigDecimal grade;
    @Column(name = "is_student_or_lecturer", nullable = false)
    private int isStudentOrLecturer;
    @Column(name = "is_gradeoneortwo", nullable = false)
    private int isGradeoneortwo;
    @Column(name = "status", nullable = false)
    private int status;
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    @OneToOne(mappedBy = "formalDefenseIdFormal")
    private WaitListEntity waitListEntity;

    @PrePersist
    protected void onCreate(){
        status = 1;
        createdAt = LocalDateTime.now();
    }

    public Long getIdFormal() {
        return idFormal;
    }

    public void setIdFormal(Long idFormal) {
        this.idFormal = idFormal;
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

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getFormalAct() {
        return formalAct;
    }

    public void setFormalAct(String formalAct) {
        this.formalAct = formalAct;
    }

    public String getPlpInvolved() {
        return plpInvolved;
    }

    public void setPlpInvolved(String plpInvolved) {
        this.plpInvolved = plpInvolved;
    }

    public LocalDateTime getDefenseDate() {
        return defenseDate;
    }

    public void setDefenseDate(LocalDateTime defenseDate) {
        this.defenseDate = defenseDate;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public BigDecimal getGrade() {
        return grade;
    }

    public void setGrade(BigDecimal grade) {
        this.grade = grade;
    }

    public int getIsStudentOrLecturer() {
        return isStudentOrLecturer;
    }

    public void setIsStudentOrLecturer(int isStudentOrLecturer) {
        this.isStudentOrLecturer = isStudentOrLecturer;
    }

    public int getIsGradeoneortwo() {
        return isGradeoneortwo;
    }

    public void setIsGradeoneortwo(int isGradeoneortwo) {
        this.isGradeoneortwo = isGradeoneortwo;
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

    public WaitListEntity getWaitListEntity() {
        return waitListEntity;
    }

    public void setWaitListEntity(WaitListEntity waitListEntity) {
        this.waitListEntity = waitListEntity;
    }
}
