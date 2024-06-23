package grado.ucb.edu.back_end_grado.dto.response;

import java.util.List;

public class ProfessorDetailResponseById {
    private String fullName;
    private String description;
    private String email;
    private String imageUrl;
    private List<SubjectInfo> subjects;
    private List<SocialNetworkInfo> socialNetworks;

    public ProfessorDetailResponseById(String fullName, String description, String email, String imageUrl, List<SubjectInfo> subjects, List<SocialNetworkInfo> socialNetworks) {
        this.fullName = fullName;
        this.description = description;
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

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public List<SubjectInfo> getSubjects() {
        return subjects;
    }

    public void setSubjects(List<SubjectInfo> subjects) {
        this.subjects = subjects;
    }

    public List<SocialNetworkInfo> getSocialNetworks() {
        return socialNetworks;
    }

    public void setSocialNetworks(List<SocialNetworkInfo> socialNetworks) {
        this.socialNetworks = socialNetworks;
    }

    public static class SubjectInfo {
        private Long idSubject;
        private String subjectName;
        private String comments;

        public SubjectInfo(Long idSubject, String subjectName, String comments) {
            this.idSubject = idSubject;
            this.subjectName = subjectName;
            this.comments = comments;
        }

        public Long getIdSubject() {
            return idSubject;
        }

        public void setIdSubject(Long idSubject) {
            this.idSubject = idSubject;
        }

        public String getSubjectName() {
            return subjectName;
        }

        public void setSubjectName(String subjectName) {
            this.subjectName = subjectName;
        }

        public String getComments() {
            return comments;
        }

        public void setComments(String comments) {
            this.comments = comments;
        }
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
