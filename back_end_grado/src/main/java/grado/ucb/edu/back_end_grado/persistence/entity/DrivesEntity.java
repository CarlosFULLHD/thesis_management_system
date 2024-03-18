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

    @Lob
    @Column(name = "linkdrive_letter")
    private byte[] linkdriveLetter;

    @Column(name = "status_profile")
    private Integer statusProfile;

    @Column(name = "uploaded_at", nullable = false)
    private LocalDateTime uploadedAt;

    @Column(name = "checked_at", nullable = false)
    private LocalDateTime checkedAt;

    @Column(name = "grade_profile_id_grade_pro", nullable = false)
    private Long gradeProfileIdGradePro;

    // Getters and Setters
}
