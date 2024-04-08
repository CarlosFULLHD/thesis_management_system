package grado.ucb.edu.back_end_grado.persistence.entity;
import jakarta.persistence.*;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;

@Component
@Entity
@Table(name = "drives")
public class DrivesEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_drives", nullable = false)
    private Long idDrives;
    @ManyToOne
    @JoinColumn(name= "grade_profile_id_grade_pro", referencedColumnName = "id_grade_pro")
    private GradeProfileEntity gradeProfileIdGradePro;

    @Column(name = "linkdrive_letter", nullable = false)
    private String linkdriveLetter;

    @Column(name = "status_profile")
    private Integer statusProfile;

    @Column(name = "uploaded_at", nullable = false)
    private LocalDateTime uploadedAt;

    @Column(name = "checked_at", nullable = false)
    private LocalDateTime checkedAt;

    public Long getIdDrives() {
        return idDrives;
    }

    public void setIdDrives(Long idDrives) {
        this.idDrives = idDrives;
    }

    public GradeProfileEntity getGradeProfileIdGradePro() {
        return gradeProfileIdGradePro;
    }

    public void setGradeProfileIdGradePro(GradeProfileEntity gradeProfileIdGradePro) {
        this.gradeProfileIdGradePro = gradeProfileIdGradePro;
    }

    public String getLinkdriveLetter() {
        return linkdriveLetter;
    }

    public void setLinkdriveLetter(String linkdriveLetter) {
        this.linkdriveLetter = linkdriveLetter;
    }

    public Integer getStatusProfile() {
        return statusProfile;
    }

    public void setStatusProfile(Integer statusProfile) {
        this.statusProfile = statusProfile;
    }

    public LocalDateTime getUploadedAt() {
        return uploadedAt;
    }

    public void setUploadedAt(LocalDateTime uploadedAt) {
        this.uploadedAt = uploadedAt;
    }

    public LocalDateTime getCheckedAt() {
        return checkedAt;
    }

    public void setCheckedAt(LocalDateTime checkedAt) {
        this.checkedAt = checkedAt;
    }

    public DrivesEntity() {
    }

    public DrivesEntity(Long idDrives, GradeProfileEntity gradeProfileIdGradePro, String linkdriveLetter, Integer statusProfile, LocalDateTime uploadedAt, LocalDateTime checkedAt) {
        this.idDrives = idDrives;
        this.gradeProfileIdGradePro = gradeProfileIdGradePro;
        this.linkdriveLetter = linkdriveLetter;
        this.statusProfile = statusProfile;
        this.uploadedAt = uploadedAt;
        this.checkedAt = checkedAt;
    }
}
