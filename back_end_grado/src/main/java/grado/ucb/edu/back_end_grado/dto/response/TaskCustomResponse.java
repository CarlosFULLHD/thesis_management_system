package grado.ucb.edu.back_end_grado.dto.response;

public class TaskCustomResponse {
    private Long idTaskState;
    private String taskStateDescription;
    private int taskStateStatus;
    private String ci;
    private String name;
    private String fatherLastName;
    private String motherLastName;
    private String personDescription;
    private String email;
    private String cellPhone;
    private String gradeProfileTitle;
    private int statusGraduationMode;
    private int isGradeoneortwo;
    private String semester;
    private String titleTask;
    private String task;
    private String feedback;
    private int orderIs;
    private boolean isUrl;
    private boolean isMeeting;
    private String publicationDate;
    private String deadline;
    private int taskStatus;

    public Long getIdTaskState() {
        return idTaskState;
    }

    public void setIdTaskState(Long idTaskState) {
        this.idTaskState = idTaskState;
    }

    public String getTaskStateDescription() {
        return taskStateDescription;
    }

    public void setTaskStateDescription(String taskStateDescription) {
        this.taskStateDescription = taskStateDescription;
    }

    public String getCi() {
        return ci;
    }

    public void setCi(String ci) {
        this.ci = ci;
    }

    public int getTaskStateStatus() {
        return taskStateStatus;
    }

    public void setTaskStateStatus(int taskStateStatus) {
        this.taskStateStatus = taskStateStatus;
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

    public String getPersonDescription() {
        return personDescription;
    }

    public void setPersonDescription(String personDescription) {
        this.personDescription = personDescription;
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

    public String getGradeProfileTitle() {
        return gradeProfileTitle;
    }

    public void setGradeProfileTitle(String gradeProfileTitle) {
        this.gradeProfileTitle = gradeProfileTitle;
    }

    public int getStatusGraduationMode() {
        return statusGraduationMode;
    }

    public void setStatusGraduationMode(int statusGraduationMode) {
        this.statusGraduationMode = statusGraduationMode;
    }

    public int getIsGradeoneortwo() {
        return isGradeoneortwo;
    }

    public void setIsGradeoneortwo(int isGradeoneortwo) {
        this.isGradeoneortwo = isGradeoneortwo;
    }

    public String getTitleTask() {
        return titleTask;
    }

    public void setTitleTask(String titleTask) {
        this.titleTask = titleTask;
    }

    public String getSemester() {
        return semester;
    }

    public void setSemester(String semester) {
        this.semester = semester;
    }

    public String getTask() {
        return task;
    }

    public void setTask(String task) {
        this.task = task;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public int getOrderIs() {
        return orderIs;
    }

    public void setOrderIs(int orderIs) {
        this.orderIs = orderIs;
    }

    public boolean isUrl() {
        return isUrl;
    }

    public void setIsUrl(boolean url) {
        isUrl = url;
    }

    public boolean isMeeting() {
        return isMeeting;
    }

    public void setIsMeeting(boolean meeting) {
        isMeeting = meeting;
    }

    public String getPublicationDate() {
        return publicationDate;
    }

    public void setPublicationDate(String publicationDate) {
        this.publicationDate = publicationDate;
    }

    public String getDeadline() {
        return deadline;
    }

    public void setDeadline(String deadline) {
        this.deadline = deadline;
    }

    public int getTaskStatus() {
        return taskStatus;
    }

    public void setTaskStatus(int taskStatus) {
        this.taskStatus = taskStatus;
    }
}
