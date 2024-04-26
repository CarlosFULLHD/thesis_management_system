package grado.ucb.edu.back_end_grado.persistence.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Component
@Entity(name = "teacher_has_subject")
@Table(name = "teacher_has_subject")
public class TeacherHasSubjectEntity {
    @NotNull
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_per_sub", nullable = false)
    private Long idPerSub;
    @ManyToOne
    @JoinColumn(name = "role_has_person_id_role_per", referencedColumnName = "id_role_per")
    private RoleHasPersonEntity roleHaspersonIdRolePer;
    @ManyToOne
    @JoinColumn(name = "subjects_id_subject", referencedColumnName = "id_subject")
    private SubjectsEntity subjectsIdSubject;
    private String comments;
    private int status;
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        status = 1;
        createdAt = LocalDateTime.now();
    }
}
