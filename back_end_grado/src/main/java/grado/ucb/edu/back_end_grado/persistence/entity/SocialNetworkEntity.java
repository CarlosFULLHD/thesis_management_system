package grado.ucb.edu.back_end_grado.persistence.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "social_network")
public class SocialNetworkEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_social", nullable = false)
    private Long idSocial;

    @ManyToOne
    @JoinColumn(name = "person_id_person", referencedColumnName = "id_person",nullable = false)
    private PersonEntity person;

    @Column(name = "url", nullable = false, length = 300)
    private String url;

    @Column(name = "icon", length = 75)
    private String icon;

    @Column(name = "status", nullable = false)
    private Integer status;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    public SocialNetworkEntity() {
    }

    public SocialNetworkEntity(Long idSocial, PersonEntity person, String url, String icon, Integer status, LocalDateTime createdAt) {
        this.idSocial = idSocial;
        this.person = person;
        this.url = url;
        this.icon = icon;
        this.status = status;
        this.createdAt = createdAt;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
    public Long getIdSocial() {
        return idSocial;
    }

    public void setIdSocial(Long idSocial) {
        this.idSocial = idSocial;
    }

    public PersonEntity getPerson() {
        return person;
    }

    public void setPerson(PersonEntity person) {
        this.person = person;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
