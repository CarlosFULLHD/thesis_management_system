package grado.ucb.edu.back_end_grado.persistence.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "teacher_has_subject")
public class TeacherHasSubjectEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_per_sub", nullable = false)
    private Long idPerSub;

    @ManyToOne
    @JoinColumn(name = "subjects_id_subject", referencedColumnName = "id_role_per", nullable = false)
    private SubjectsEntity subjectsEntity;

    @ManyToOne
    @JoinColumn(name = "subjects_id_subject", referencedColumnName = "id_subject", nullable = false)
    private SubjectsEntity subject;

    @Column(name = "comments", length = 300)
    private String comments;

    @Column(name = "status", nullable = false)
    private Integer status;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    public TeacherHasSubjectEntity() {
    }

    public TeacherHasSubjectEntity(Long idPerSub, RoleHasPersonEntity roleHasPersonIdRolePer, SubjectsEntity subject, String comments, Integer status, LocalDateTime createdAt) {
        this.idPerSub = idPerSub;
        this.roleHasPersonIdRolePer = roleHasPersonIdRolePer;
        this.subject = subject;
        this.comments = comments;
        this.status = status;
        this.createdAt = createdAt;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
    public Long getIdPerSub() {
        return idPerSub;
    }

    public void setIdPerSub(Long idPerSub) {
        this.idPerSub = idPerSub;
    }


    public SubjectsEntity getSubject() {
        return subject;
    }

    public void setSubject(SubjectsEntity subject) {
        this.subject = subject;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
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

    public RoleHasPersonEntity getRoleHasPersonIdRolePer() {
        return roleHasPersonIdRolePer;
    }

    public void setRoleHasPersonIdRolePer(RoleHasPersonEntity roleHasPersonIdRolePer) {
        this.roleHasPersonIdRolePer = roleHasPersonIdRolePer;
    }
}
