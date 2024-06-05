package grado.ucb.edu.back_end_grado.dto.response;

import java.time.LocalDateTime;
import java.util.List;

public class ProfessorDetailsResponse {

    private String fullName;
    private String email;
    private String imageUrl;
    private List<String> subjectNames;
    private String urlLinkedin;
    private String icon;

    public ProfessorDetailsResponse() {
    }

    public ProfessorDetailsResponse(String fullName, String email, String imageUrl, List<String> subjectNames, String urlLinkedin, String icon) {
        this.fullName = fullName;
        this.email = email;
        this.imageUrl = imageUrl;
        this.subjectNames = subjectNames;
        this.urlLinkedin = urlLinkedin;
        this.icon = icon;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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
