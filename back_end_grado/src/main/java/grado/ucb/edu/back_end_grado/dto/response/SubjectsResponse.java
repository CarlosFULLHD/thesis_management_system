package grado.ucb.edu.back_end_grado.dto.response;

public class SubjectsResponse {
    private Long idSubject;
    private String subjectName;

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

    public SubjectsResponse(Long idSubject, String subjectName) {
        this.idSubject = idSubject;
        this.subjectName = subjectName;
    }
}
