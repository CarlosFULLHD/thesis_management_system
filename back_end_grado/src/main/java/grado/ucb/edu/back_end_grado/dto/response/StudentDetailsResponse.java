package grado.ucb.edu.back_end_grado.dto.response;

import java.time.LocalDateTime;
import java.util.List;

public class StudentDetailsResponse {
    private Long idPerson;
    private String ci;
    private String name;
    private String fatherLastName;
    private String motherLastName;
    private String description;
    private String email;
    private String cellPhone;
    private LocalDateTime createdAt;
    private List<DriveDetails> drives;

    public Long getIdPerson() {
        return idPerson;
    }

    public void setIdPerson(Long idPerson) {
        this.idPerson = idPerson;
    }

    public String getCi() {
        return ci;
    }

    public void setCi(String ci) {
        this.ci = ci;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFatherLastName() {
        return fatherLastName;
    }

    public void setFatherLastName(String fatherLastName) {
        this.fatherLastName = fatherLastName;
    }

    public String getMotherLastName() {
        return motherLastName;
    }

    public void setMotherLastName(String motherLastName) {
        this.motherLastName = motherLastName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCellPhone() {
        return cellPhone;
    }

    public void setCellPhone(String cellPhone) {
        this.cellPhone = cellPhone;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public List<DriveDetails> getDrives() {
        return drives;
    }

    public void setDrives(List<DriveDetails> drives) {
        this.drives = drives;
    }

    public StudentDetailsResponse() {
    }

    public StudentDetailsResponse(Long idPerson, String ci, String name, String fatherLastName, String motherLastName, String description, String email, String cellPhone, LocalDateTime createdAt, List<DriveDetails> drives) {
        this.idPerson = idPerson;
        this.ci = ci;
        this.name = name;
        this.fatherLastName = fatherLastName;
        this.motherLastName = motherLastName;
        this.description = description;
        this.email = email;
        this.cellPhone = cellPhone;
        this.createdAt = createdAt;
        this.drives = drives;
    }

    public static class DriveDetails {
        private String linkdriveLetter;
        private Integer statusProfile;
        private LocalDateTime uploadedAt;

        public String getLinkdriveLetter() {
            return linkdriveLetter;
        }

        public void setLinkdriveLetter(String linkdriveLetter) {
            this.linkdriveLetter = linkdriveLetter;
        }

        public Integer getStatusProfile() {
            return statusProfile;
        }

        public void setStatusProfile(Integer statusProfile) {
            this.statusProfile = statusProfile;
        }

        public LocalDateTime getUploadedAt() {
            return uploadedAt;
        }

        public void setUploadedAt(LocalDateTime uploadedAt) {
            this.uploadedAt = uploadedAt;
        }

        public DriveDetails() {
        }

        public DriveDetails(String linkdriveLetter, Integer statusProfile, LocalDateTime uploadedAt) {
            this.linkdriveLetter = linkdriveLetter;
            this.statusProfile = statusProfile;
            this.uploadedAt = uploadedAt;
        }
    }
}
