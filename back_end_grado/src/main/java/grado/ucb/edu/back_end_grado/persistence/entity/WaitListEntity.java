package grado.ucb.edu.back_end_grado.persistence.entity;


import jakarta.persistence.*;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Component
@Entity(name ="wait_list")
@Table(name ="wait_list")
public class WaitListEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_wait", nullable = false)
    private Long idWait;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name ="formal_defense_id_formal")
    private FormalDefenseEntity formalDefenseIdFormal;

    @Column(name ="id_grado", nullable = false)
    private Long idGrado;
    @Column(name ="id_users", nullable = false)
    private Long idUsers;
    @Column(name="waitlist_for_what")
    private int waitListForWhat;
    @Column(name="feedback", length =600,nullable = false)
    private String feedback;
    @Column(name = "grade", precision = 15, scale = 5, nullable = false)
    private BigDecimal grade;
    @Column(name = "status", nullable = false)
    private int status;
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    @PrePersist
    protected void onCreate(){
        createdAt = LocalDateTime.now();
        status = 1;
    }

    public Long getIdWait() {
        return idWait;
    }

    public void setIdWait(Long idWait) {
        this.idWait = idWait;
    }

    public FormalDefenseEntity getFormalDefenseIdFormal() {
        return formalDefenseIdFormal;
    }

    public void setFormalDefenseIdFormal(FormalDefenseEntity formalDefenseIdFormal) {
        this.formalDefenseIdFormal = formalDefenseIdFormal;
    }

    public Long getIdGrado() {
        return idGrado;
    }

    public void setIdGrado(Long idGrado) {
        this.idGrado = idGrado;
    }

    public Long getIdUsers() {
        return idUsers;
    }

    public void setIdUsers(Long idUsers) {
        this.idUsers = idUsers;
    }

    public int getWaitListForWhat() {
        return waitListForWhat;
    }

    public void setWaitListForWhat(int waitListForWhat) {
        this.waitListForWhat = waitListForWhat;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public BigDecimal getGrade() {
        return grade;
    }

    public void setGrade(BigDecimal grade) {
        this.grade = grade;
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
}
