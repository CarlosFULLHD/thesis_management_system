package grado.ucb.edu.back_end_grado.dto.response;

import java.util.List;

public class ProfessorAsTutorsResponse {
    private Long idPerson;
    private String fullName;
    private String email;
    private String imageUrl;
    private List<String> subjects;
    private List<SocialNetworkInfo> socialNetworks;

    public ProfessorAsTutorsResponse(Long idPerson, String fullName, String email, String imageUrl, List<String> subjects, List<SocialNetworkInfo> socialNetworks) {
        this.idPerson = idPerson;
        this.fullName = fullName;
        this.email = email;
        this.imageUrl = imageUrl;
        this.subjects = subjects;
        this.socialNetworks = socialNetworks;
    }

    public Long getIdPerson() {
        return idPerson;
    }

    public void setIdPerson(Long idPerson) {
        this.idPerson = idPerson;
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
        private Long idSocial;
        private String urlLinkedin;
        private String icon;

        public SocialNetworkInfo(Long idSocial, String urlLinkedin, String icon) {
            this.idSocial = idSocial;
            this.urlLinkedin = urlLinkedin;
            this.icon = icon;
        }

        public Long getIdSocial() {
            return idSocial;
        }

        public void setIdSocial(Long idSocial) {
            this.idSocial = idSocial;
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
