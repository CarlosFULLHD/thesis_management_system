package grado.ucb.edu.back_end_grado.persistence.entity;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@Entity(name = "desertion")
@Table(name ="desertion")
public class DesertionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_desertion", nullable = false)
    private Long idDesertion;
    @ManyToOne
    @JoinColumn(name="users_id_users", referencedColumnName = "id_users")
    private UsersEntity usersIdUsers;
    @Column(name = "reason", nullable = false, length = 300)
    private String reason;
    @Column(name = "status", nullable = false)
    private int status;
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime created_at;

    public Long getIdDesertion() {
        return idDesertion;
    }

    public void setIdDesertion(Long idDesertion) {
        this.idDesertion = idDesertion;
    }

    public UsersEntity getUsersIdUsers() {
        return usersIdUsers;
    }

    public void setUsersIdUsers(UsersEntity usersIdUsers) {
        this.usersIdUsers = usersIdUsers;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public LocalDateTime getCreated_at() {
        return created_at;
    }

    public void setCreated_at(LocalDateTime created_at) {
        this.created_at = created_at;
    }
}
