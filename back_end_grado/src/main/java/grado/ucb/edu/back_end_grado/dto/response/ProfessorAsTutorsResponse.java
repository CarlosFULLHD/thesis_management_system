package grado.ucb.edu.back_end_grado.dto.response;

import java.util.List;

public class ProfessorAsTutorsResponse {
    private String fullName;
    private String email;
    private String imageUrl;
    private List<String> subjects;
    private List<SocialNetworkInfo> socialNetworks;

    public ProfessorAsTutorsResponse(String fullName, String email, String imageUrl, List<String> subjects, List<SocialNetworkInfo> socialNetworks) {
        this.fullName = fullName;
        this.email = email;
        this.imageUrl = imageUrl;
        this.subjects = subjects;
        this.socialNetworks = socialNetworks;
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

    public List<String> getSubjects() {
        return subjects;
    }

    public void setSubjects(List<String> subjects) {
        this.subjects = subjects;
    }

    public List<SocialNetworkInfo> getSocialNetworks() {
        return socialNetworks;
    }

    public void setSocialNetworks(List<SocialNetworkInfo> socialNetworks) {
        this.socialNetworks = socialNetworks;
    }

    public static class SocialNetworkInfo {
        private String urlLinkedin;
        private String icon;

        public SocialNetworkInfo(String urlLinkedin, String icon) {
            this.urlLinkedin = urlLinkedin;
            this.icon = icon;
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
}
