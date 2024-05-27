package grado.ucb.edu.back_end_grado.dto.request;

import grado.ucb.edu.back_end_grado.persistence.entity.AcademicPeriodHasGradeProfileEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.FormalDefenseEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.LecturerApplicationEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.TaskStatesEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class FormalDefenseRequest {
    private Long idFormal;
    private TaskStatesEntity taskStatesIdTaskState;
    private AcademicPeriodHasGradeProfileEntity academicHasGradeProfileIdAcadGrade;
    private String feedback;
    private String url;
    private String plpInvolved;
    private String defenseDate;
    private String place;
    private int isStudentOrLecturer;
    private int isGradeoneortwo;
    private int status;
    private String createdAt;

    public FormalDefenseRequest() {
    }

    public Long getIdFormal() {
        return idFormal;
    }

    public void setIdFormal(Long idFormal) {
        this.idFormal = idFormal;
    }

    public TaskStatesEntity getTaskStatesIdTaskState() {
        return taskStatesIdTaskState;
    }

    public void setTaskStatesIdTaskState(TaskStatesEntity taskStatesIdTaskState) {
        this.taskStatesIdTaskState = taskStatesIdTaskState;
    }

    public AcademicPeriodHasGradeProfileEntity getAcademicHasGradeProfileIdAcadGrade() {
        return academicHasGradeProfileIdAcadGrade;
    }

    public void setAcademicHasGradeProfileIdAcadGrade(AcademicPeriodHasGradeProfileEntity academicHasGradeProfileIdAcadGrade) {
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

    public FormalDefenseEntity formalDefenseRequestToEntity(FormalDefenseRequest request){
        FormalDefenseEntity entity = new FormalDefenseEntity();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        entity.setIdFormal(entity.getIdFormal());
        entity.setTaskStatesIdTaskState(request.getTaskStatesIdTaskState());
        entity.setAcademicHasGradeProfileIdAcadGrade(request.getAcademicHasGradeProfileIdAcadGrade());
        entity.setFeedback(request.getFeedback());
        entity.setUrl(request.getUrl());
        entity.setPlpInvolved(request.getPlpInvolved());
        entity.setDefenseDate(request.getDefenseDate() != null ? LocalDateTime.parse(request.getDefenseDate(), formatter) : LocalDateTime.MIN );
        entity.setPlace(request.getPlace());
        entity.setIsStudentOrLecturer(request.getIsStudentOrLecturer());
        entity.setIsGradeoneortwo(request.getIsGradeoneortwo());
        entity.setStatus(request.getStatus());
        entity.setCreatedAt(request.getCreatedAt() != null ? LocalDateTime.parse(request.getCreatedAt(), formatter) : LocalDateTime.MIN );
        return entity;
    }
}
