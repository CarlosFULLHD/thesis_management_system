package grado.ucb.edu.back_end_grado.persistence.entity;

import jakarta.persistence.*;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@Entity(name = "users")
@Table(name = "users")
public class UsersEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_users", nullable = false)
    private Long idUsers;
    @OneToOne
    @JoinColumn(name = "person_id_person", referencedColumnName = "id_person")
    private PersonEntity personIdPerson;
    @Column(name = "status", nullable = false)

    private int status;

    public Long getIdUsers() {
        return idUsers;
    }

    public void setIdUsers(Long idUsers) {
        this.idUsers = idUsers;
    }

    public PersonEntity getPersonIdPerson() {
        return personIdPerson;
    }

    public void setPersonIdPerson(PersonEntity personIdPerson) {
        this.personIdPerson = personIdPerson;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}