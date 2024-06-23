package grado.ucb.edu.back_end_grado.dto.response;

public class UserSubjectsResponse {
    private Long idSubject;
    private String subjectName;
    private String comments;


    public UserSubjectsResponse() {
    }

    public UserSubjectsResponse(Long idSubject, String subjectName, String comments) {
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
