package grado.ucb.edu.back_end_grado.persistence.entity;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;
import java.util.Random;
import java.time.LocalDateTime;

@Component
@Entity(name="temporal_code")
@Table(name ="temporal_code")
public class TemporalCodeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_temporal", nullable = false)
    private Long idTemporal;
    @Column(name = "temporal_code", length = 35, nullable = false)
    private String temporalCode;
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    @Column(name = "due_date", nullable = false, updatable = false)
    private LocalDateTime dueDate;
    @Column(name = "is_used", nullable = false)
    private int is_used;
    @PrePersist
    protected void onCreate(){
        createdAt = LocalDateTime.now();
        dueDate = createdAt.plusDays(1);
        is_used = 0;
        temporalCode = randomNumericString();
    }
    // Method to generate the random 6-digit code
    public String randomNumericString() {
        int leftLimit = 48; // numeral '0'
        int rightLimit = 57; // numeral '9'
        int targetStringLength = 6;
        Random random = new Random();

        return random.ints(leftLimit, rightLimit + 1)
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
    }

    public Long getIdTemporal() {
        return idTemporal;
    }

    public void setIdTemporal(Long idTemporal) {
        this.idTemporal = idTemporal;
    }

    public String getTemporalCode() {
        return temporalCode;
    }

    public void setTemporalCode(String temporalCode) {
        this.temporalCode = temporalCode;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDateTime dueDate) {
        this.dueDate = dueDate;
    }

    public int getIs_used() {
        return is_used;
    }

    public void setIs_used(int is_used) {
        this.is_used = is_used;
    }
}
