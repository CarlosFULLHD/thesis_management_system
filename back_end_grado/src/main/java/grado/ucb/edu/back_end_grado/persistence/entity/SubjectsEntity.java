package grado.ucb.edu.back_end_grado.persistence.entity;

import jakarta.persistence.*;


import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "subjects")
public class SubjectsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_subject", nullable = false)
    private Long idSubject;

    @Column(name = "subject_name", nullable = false, length = 150)
    private String subjectName;

    @Column(name = "status", nullable = false)
    private Integer status;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "subject", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TeacherHasSubjectEntity> teacherHasSubjectEntityList;

    public SubjectsEntity() {
    }


    public SubjectsEntity(Long idSubject, String subjectName, Integer status, LocalDateTime createdAt) {
        this.idSubject = idSubject;
        this.subjectName = subjectName;
        this.status = status;
        this.createdAt = createdAt;
    }
    @PrePersist
    protected void onCreate() {
        subjectName = subjectName.trim();
        status = 1;
        createdAt = LocalDateTime.now();
    }
    public Long getIdSubject() {
        return idSubject;
    }

    public void setIdSubject(Long idSubject) {
        this.idSubject = idSubject;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

}
