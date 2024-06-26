package grado.ucb.edu.back_end_grado.persistence.entity;
import jakarta.persistence.*;
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
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "person_id_person", referencedColumnName = "id_person")
    private PersonEntity personIdPerson;
    @Column(name = "username", nullable = false, length = 4000)
    private String username;
    @Column(name = "password", nullable = false, length = 4000)
    private String password;
    @Column(name = "salt", nullable = false, length = 4000)
    private String salt;
    @Column(name = "status", nullable = false)
    private int status;
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    @OneToOne(mappedBy = "usersIdUsers")
    private RoleHasPersonEntity roleHasPersonEntity;
    @OneToMany(mappedBy = "usersIdUsers", orphanRemoval = true, cascade = CascadeType.ALL)
    List<PublicInformationEntity> publicInformationEntityList;
    @OneToMany(mappedBy = "usersIdUsers", orphanRemoval = true, cascade = CascadeType.ALL)
    List<DesertionEntity> desertionEntityList;
    @OneToMany(mappedBy = "usersIdUsers", orphanRemoval = true, cascade = CascadeType.ALL)
    List<MilestoneEntity> milestoneEntityList;

    @PrePersist
    protected void onCreate() {
        //status = 1;
        createdAt = LocalDateTime.now();
    }

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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
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

    public RoleHasPersonEntity getRoleHasPersonEntity() {
        return roleHasPersonEntity;
    }

    public void setRoleHasPersonEntity(RoleHasPersonEntity roleHasPersonEntity) {
        this.roleHasPersonEntity = roleHasPersonEntity;
    }

    public List<PublicInformationEntity> getPublicInformationEntityList() {
        return publicInformationEntityList;
    }

    public void setPublicInformationEntityList(List<PublicInformationEntity> publicInformationEntityList) {
        this.publicInformationEntityList = publicInformationEntityList;
    }

    public List<DesertionEntity> getDesertionEntityList() {
        return desertionEntityList;
    }

    public void setDesertionEntityList(List<DesertionEntity> desertionEntityList) {
        this.desertionEntityList = desertionEntityList;
    }


    public List<MilestoneEntity> getMilestoneEntityList() {
        return milestoneEntityList;
    }

    public void setMilestoneEntityList(List<MilestoneEntity> milestoneEntityList) {
        this.milestoneEntityList = milestoneEntityList;
    }

}
