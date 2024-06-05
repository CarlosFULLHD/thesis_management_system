package grado.ucb.edu.back_end_grado.dto.response;

import grado.ucb.edu.back_end_grado.persistence.entity.AcademicPeriodHasGradeProfileEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.FormalDefenseEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.TaskStatesEntity;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class FormalDefenseResponse {
    private Long idFormal;
    private TaskStatesResponse taskStatesIdTaskState;
    private AcademicPeriodHasGradeProfileResponse academicHasGradeProfileIdAcadGrade;
    private String feedback;
    private String url;
    private String formalAct;
    private String plpInvolved;
    private String defenseDate;
    private String place;
    private BigDecimal grade;
    private int isStudentOrLecturer;
    private int isGradeoneortwo;
    private int status;
    private String createdAt;

    public FormalDefenseResponse() {
    }

    public Long getIdFormal() {
        return idFormal;
    }

    public void setIdFormal(Long idFormal) {
        this.idFormal = idFormal;
    }

    public TaskStatesResponse getTaskStatesIdTaskState() {
        return taskStatesIdTaskState;
    }

    public void setTaskStatesIdTaskState(TaskStatesResponse taskStatesIdTaskState) {
        this.taskStatesIdTaskState = taskStatesIdTaskState;
    }

    public AcademicPeriodHasGradeProfileResponse getAcademicHasGradeProfileIdAcadGrade() {
        return academicHasGradeProfileIdAcadGrade;
    }

    public void setAcademicHasGradeProfileIdAcadGrade(AcademicPeriodHasGradeProfileResponse academicHasGradeProfileIdAcadGrade) {
        this.academicHasGradeProfileIdAcadGrade = academicHasGradeProfileIdAcadGrade;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getFormalAct() {
        return formalAct;
    }

    public void setFormalAct(String formalAct) {
        this.formalAct = formalAct;
    }

    public String getPlpInvolved() {
        return plpInvolved;
    }

    public void setPlpInvolved(String plpInvolved) {
        this.plpInvolved = plpInvolved;
    }

    public String getDefenseDate() {
        return defenseDate;
    }

    public void setDefenseDate(String defenseDate) {
        this.defenseDate = defenseDate;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public BigDecimal getGrade() {
        return grade;
    }

    public void setGrade(BigDecimal grade) {
        this.grade = grade;
    }

    public int getIsStudentOrLecturer() {
        return isStudentOrLecturer;
    }

    public void setIsStudentOrLecturer(int isStudentOrLecturer) {
        this.isStudentOrLecturer = isStudentOrLecturer;
    }

    public int getIsGradeoneortwo() {
        return isGradeoneortwo;
    }

    public void setIsGradeoneortwo(int isGradeoneortwo) {
        this.isGradeoneortwo = isGradeoneortwo;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public FormalDefenseResponse formalDefenseEntityToResponse(FormalDefenseEntity entity){
        FormalDefenseResponse response = new FormalDefenseResponse();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        response.setIdFormal(entity.getIdFormal());
        response.setTaskStatesIdTaskState(entity.getTaskStatesIdTaskState() != null ? new TaskStatesResponse().taskStatesEntityToResponse(entity.getTaskStatesIdTaskState()) : null);
        response.setAcademicHasGradeProfileIdAcadGrade(entity.getAcademicHasGradeProfileIdAcadGrade() != null ? new AcademicPeriodHasGradeProfileResponse().academicPeriodHasGradeProfileEntityToResponse(entity.getAcademicHasGradeProfileIdAcadGrade()) : null);
        response.setFeedback(entity.getFeedback());
        response.setUrl(entity.getUrl());
        response.setFormalAct(entity.getFormalAct());
        response.setPlpInvolved(entity.getPlpInvolved());
        response.setDefenseDate(entity.getDefenseDate() != null ? entity.getDefenseDate().format(formatter) : LocalDateTime.MIN.toString());
        response.setPlace(entity.getPlace());
        response.setGrade(entity.getGrade());
        response.setIsStudentOrLecturer(entity.getIsStudentOrLecturer());
        response.setIsGradeoneortwo(entity.getIsGradeoneortwo());
        response.setStatus(entity.getStatus());
        response.setCreatedAt(entity.getCreatedAt() != null ? entity.getCreatedAt().format(formatter) : LocalDateTime.MIN.toString());
        return response;
    }
}
