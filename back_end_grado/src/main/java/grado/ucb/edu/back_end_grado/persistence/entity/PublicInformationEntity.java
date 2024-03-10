package grado.ucb.edu.back_end_grado.persistence.entity;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@Entity(name = "public_information")
@Table(name = "public_information")
public class PublicInformationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_public_info", nullable = false)
    private Long idPublicInfo;
    @ManyToOne
    @JoinColumn(name = "person_id_person", referencedColumnName = "id_person", nullable = false)
    private PersonEntity personIdPerson;
    @Column(name = "information", nullable = false, length = 2000)
    private String information;
    @Column(name = "status", nullable = false)
    private int status;
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate(){
        status = 1;
        createdAt = LocalDateTime.now();
    }

    public PublicInformationEntity() {
    }

    public Long getIdPublicInfo() {
        return idPublicInfo;
    }

    public void setIdPublicInfo(Long idPublicInfo) {
        this.idPublicInfo = idPublicInfo;
    }

    public PersonEntity getPersonIdPerson() {
        return personIdPerson;
    }

    public void setPersonIdPerson(PersonEntity personIdPerson) {
        this.personIdPerson = personIdPerson;
    }

    public String getInformation() {
        return information;
    }

    public void setInformation(String information) {
        this.information = information;
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
