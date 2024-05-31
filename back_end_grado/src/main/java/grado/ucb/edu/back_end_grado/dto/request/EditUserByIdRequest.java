package grado.ucb.edu.back_end_grado.dto.request;

public class EditUserByIdRequest {

    private Long userId;
    private String ci;
    private String name;
    private String fatherLastName;
    private String motherLastName;
    private String description;
    private String email;
    private String cellPhone;
    private int status;
    private Long idRole;

    public EditUserByIdRequest(Long userId, String ci, String name, String fatherLastName, String motherLastName, String description, String email, String cellPhone, int status, Long idRole) {
        this.userId = userId;
        this.ci = ci;
        this.name = name;
        this.fatherLastName = fatherLastName;
        this.motherLastName = motherLastName;
        this.description = description;
        this.email = email;
        this.cellPhone = cellPhone;
        this.status = status;
        this.idRole = idRole;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
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

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public Long getIdRole() {
        return idRole;
    }

    public void setIdRole(Long idRole) {
        this.idRole = idRole;
    }
}
