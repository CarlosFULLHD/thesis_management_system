package grado.ucb.edu.back_end_grado.dto.request;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Component
public class CompleteProfessorRegistrationRequest {
    private String ci;
    private String name;
    private String fatherLastName;
    private String motherLastName;
    private String description;
    private String email;
    private String cellPhone;
    // Se omite el status y createdAt ya que serán manejados internamente

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


    public CompleteProfessorRegistrationRequest() {
    }

    public CompleteProfessorRegistrationRequest(String ci, String name, String fatherLastName, String motherLastName, String description, String email, String cellPhone) {
        this.ci = ci;
        this.name = name;
        this.fatherLastName = fatherLastName;
        this.motherLastName = motherLastName;
        this.description = description;
        this.email = email;
        this.cellPhone = cellPhone;

    }


}

