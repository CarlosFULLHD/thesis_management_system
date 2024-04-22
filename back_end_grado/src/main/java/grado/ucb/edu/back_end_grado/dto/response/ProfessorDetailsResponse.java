package grado.ucb.edu.back_end_grado.dto.response;

import java.time.LocalDateTime;
import java.util.List;

public class ProfessorDetailsResponse {

    private String fullName;
    private String description;
    private String email;
    private String cellPhone;
    private String imageUrl;
    private List<String> subjectNames;
    private List<String> comments;
    private String urlLinkedin;
    private String icon;

    public ProfessorDetailsResponse() {
    }

    public ProfessorDetailsResponse(String fullName, String description, String email, String cellPhone, String imageUrl, List<String> subjectNames, List<String> comments, String urlLinkedin, String icon) {
        this.fullName = fullName;
        this.description = description;
        this.email = email;
        this.cellPhone = cellPhone;
        this.imageUrl = imageUrl;
        this.subjectNames = subjectNames;
        this.comments = comments;
        this.urlLinkedin = urlLinkedin;
        this.icon = icon;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
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

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public List<String> getSubjectNames() {
        return subjectNames;
    }

    public void setSubjectNames(List<String> subjectNames) {
        this.subjectNames = subjectNames;
    }

    public List<String> getComments() {
        return comments;
    }

    public void setComments(List<String> comments) {
        this.comments = comments;
    }

    public String getUrlLinkedin() {
        return urlLinkedin;
    }

    public void setUrlLinkedin(String urlLinkedin) {
        this.urlLinkedin = urlLinkedin;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }
}
