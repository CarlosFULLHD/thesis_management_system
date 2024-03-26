package grado.ucb.edu.back_end_grado.persistence.entity;

import jakarta.persistence.*;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@Entity(name = "role_has_person")
@Table(name = "role_has_person")
public class RoleHasPersonEntity {
    @NotNull
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_role_per", nullable = false)
    private Long idRolePer;
    @ManyToOne
    @JoinColumn(name = "roles_id_role", referencedColumnName = "id_role")
    private RolesEntity rolesIdRole;
    @ManyToOne
    @JoinColumn(name = "person_id_person", referencedColumnName = "id_person")
    private PersonEntity personIdPerson;
    @Column(name = "status", nullable = false)
    private int status;
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "roleHasPersonIdRolePer",orphanRemoval = true, cascade = CascadeType.ALL)
    List<PublicInformationEntity> publicInformationEntityList;

    @PrePersist
    protected void onCreate(){
        status = 1;
        createdAt = LocalDateTime.now();
    }

    public Long getIdRolePer() {
        return idRolePer;
    }

    public void setIdRolePer(Long idRolePer) {
        this.idRolePer = idRolePer;
    }

    public RolesEntity getRolesIdRole() {
        return rolesIdRole;
    }

    public void setRolesIdRole(RolesEntity rolesIdRole) {
        this.rolesIdRole = rolesIdRole;
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public List<PublicInformationEntity> getPublicInformationEntityList() {
        return publicInformationEntityList;
    }

    public void setPublicInformationEntityList(List<PublicInformationEntity> publicInformationEntityList) {
        this.publicInformationEntityList = publicInformationEntityList;
    }
}
