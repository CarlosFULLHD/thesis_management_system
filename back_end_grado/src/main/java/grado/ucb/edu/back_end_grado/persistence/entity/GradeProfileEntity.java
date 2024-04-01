package grado.ucb.edu.back_end_grado.persistence.entity;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;
import java.util.List;

@Component
@Entity
@Table(name = "grade_profile")
public class GradeProfileEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_grade_pro", nullable = false)
    private Long idGradePro;

    @ManyToOne
    @JoinColumn(name = "role_has_person_id_role_per", referencedColumnName = "id_role_per", nullable = false)
    private RoleHasPersonEntity roleHasPerson;

    @Column(name = "name", nullable = false, length = 150)
    private String name;

    @Column(name = "url", nullable = true)
    private String url;


    @Column(name = "status_profile")
    private Integer statusProfile;

    @Column(name = "observations", length = 300)
    private String observations;

    @Column(name = "status", nullable = false)
    private Integer status;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    @OneToMany(mappedBy = "gradeProfileIdGradePro", orphanRemoval = true, cascade = CascadeType.ALL)
    List<LecturerApplicationEntity> lecturerApplicationEntityList;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public Long getIdGradePro() {
        return idGradePro;
    }

    public void setIdGradePro(Long idGradePro) {
        this.idGradePro = idGradePro;
    }

    public RoleHasPersonEntity getRoleHasPerson() {
        return roleHasPerson;
    }

    public void setRoleHasPerson(RoleHasPersonEntity roleHasPerson) {
        this.roleHasPerson = roleHasPerson;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Integer getStatusProfile() {
        return statusProfile;
    }

    public void setStatusProfile(Integer statusProfile) {
        this.statusProfile = statusProfile;
    }

    public String getObservations() {
        return observations;
    }

    public void setObservations(String observations) {
        this.observations = observations;
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

    public List<LecturerApplicationEntity> getLecturerApplicationEntityList() {
        return lecturerApplicationEntityList;
    }

    public void setLecturerApplicationEntityList(List<LecturerApplicationEntity> lecturerApplicationEntityList) {
        this.lecturerApplicationEntityList = lecturerApplicationEntityList;
    }

    public GradeProfileEntity() {
    }

    public GradeProfileEntity(Long idGradePro, RoleHasPersonEntity roleHasPerson, String name, String url, Integer statusProfile, String observations, Integer status, LocalDateTime createdAt) {
        this.idGradePro = idGradePro;
        this.roleHasPerson = roleHasPerson;
        this.name = name;
        this.url = url;
        this.statusProfile = statusProfile;
        this.observations = observations;
        this.status = status;
        this.createdAt = createdAt;
    }
}
