package grado.ucb.edu.back_end_grado.bl;

import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.GradeProfileHasTaskRequest;
import grado.ucb.edu.back_end_grado.dto.response.*;
import grado.ucb.edu.back_end_grado.persistence.dao.*;
import grado.ucb.edu.back_end_grado.persistence.entity.*;
import grado.ucb.edu.back_end_grado.util.Globals;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GradeProfileHasTaskBl {
    private final GradeProfileHasTaskDao gradeProfileHasTaskDao;
    private final UrlsDao urlsDao;
    private final AcademicPeriodHasGradeProfileDao academicPeriodHasGradeProfileDao;
    private final MeetingDao meetingDao;
    private final TaskStatesDao taskStatesDao;
    private final AcademicPeriodDao academicPeriodDao;
    private GradeProfileHasTaskRequest gradeProfileHasTaskRequest;
    private GradeProfileDao gradeProfileDao;

    public GradeProfileHasTaskBl(GradeProfileHasTaskDao gradeProfileHasTaskDao, UrlsDao urlsDao, AcademicPeriodHasGradeProfileDao academicPeriodHasGradeProfileDao, MeetingDao meetingDao, TaskStatesDao taskStatesDao, AcademicPeriodDao academicPeriodDao, GradeProfileHasTaskRequest gradeProfileHasTaskRequest, GradeProfileDao gradeProfileDao) {
        this.gradeProfileHasTaskDao = gradeProfileHasTaskDao;
        this.urlsDao = urlsDao;
        this.academicPeriodHasGradeProfileDao = academicPeriodHasGradeProfileDao;
        this.meetingDao = meetingDao;
        this.taskStatesDao = taskStatesDao;
        this.academicPeriodDao = academicPeriodDao;
        this.gradeProfileHasTaskRequest = gradeProfileHasTaskRequest;
        this.gradeProfileDao = gradeProfileDao;
    }

    // POST => new grade_profile_has_task
    public Object postGradeProfileHasTask(GradeProfileHasTaskRequest request){
        TaskResponse response = new TaskResponse();
    try {
        // FETCHING => initial state
        Optional<TaskStatesEntity> taskStates = taskStatesDao.findByStatusAndDescription(1,"ABIERTO");
        if (taskStates.isEmpty() || taskStates.get().getStatus() == 0) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1],"Error al buscar estado de tareas por defecto");
        // FETCHING => current academic period
        LocalDateTime currentDate = LocalDateTime.now();
        int currentYear = currentDate.getYear();
        int currentMonth = currentDate.getMonthValue();
        String sem = String.format("%s - %s", currentMonth > 6 ? "II" : "I",currentYear);
        Optional<AcademicPeriodEntity> academicPeriod = academicPeriodDao.findBySemesterAndStatus(sem,1);
        if (academicPeriod.isEmpty() || academicPeriod.get().getStatus() == 0)
            return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "No existe un periodo académico para el periodo actual");
        // FETCHING => grade profile
        Optional<GradeProfileEntity> gradeProfile = gradeProfileDao.findById(request.getAcademicHasGradeProfileIdAcadGrade().getGradeProfileIdGradePro().getIdGradePro());
        if (gradeProfile.isEmpty() || gradeProfile.get().getStatus() == 0)
            return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "No existe el perfil de grado mandado");
        // FETCHING => academic_has_grade_profile
        Optional<AcademicPeriodHasGradeProfileEntity> academicPeriodHasGradeProfile = academicPeriodHasGradeProfileDao.findByAcademicPeriodIdAcadAndGradeProfileIdGradeProAndStatus(academicPeriod.get(),gradeProfile.get(),1);
        if (academicPeriodHasGradeProfile.isEmpty() || academicPeriodHasGradeProfile.get().getStatus() == 0)
            return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "Perfil de grado no tiene periodo académico asignado");
        // GETTING => MAX order_is for a gradeProfile
        Integer orderIs = gradeProfileHasTaskDao.findMaxOrderIs(gradeProfile.get().getIdGradePro());
        int realOrderIs = orderIs == null ? 1 : orderIs;
        // CREATING => grade_profile_has_task tuple
        GradeProfileHasTaskEntity gradeProfileHasTaskEntity = request.gradeProfileHasTaskRequestToEntity(request);
        gradeProfileHasTaskEntity.setOrderIs(realOrderIs);
        gradeProfileHasTaskEntity = gradeProfileHasTaskDao.save(gradeProfileHasTaskEntity);
        // CREATING => urls tuple
        UrlsEntity urlsEntity = new UrlsEntity();
        if (gradeProfileHasTaskEntity.getIsUrl() == 1){
            urlsEntity.setGradeProfileHasTaskIdTask(gradeProfileHasTaskEntity);
            urlsEntity.setUrl("");
            urlsEntity.setDescription("");
            urlsEntity.setStatus(-1);
            urlsEntity = urlsDao.save(urlsEntity);
        }
        // CREATING => meeting tuple
        MeetingEntity meetingEntity = new MeetingEntity();
        if (gradeProfileHasTaskEntity.getIsMeeting() == 1){
            meetingEntity.setGradeProfileHasTaskIdTask(gradeProfileHasTaskEntity);
            meetingEntity.setAddressLink("");
            meetingEntity.setIsVirtual(-1);
            meetingEntity.setStatus(-1);
            meetingEntity = meetingDao.save(meetingEntity);
        }
        // PREPARING => response
        response.setTask(new GradeProfileHasTaskResponse().gradeProfileHasTaskEntityToResponse(gradeProfileHasTaskEntity));
        response.setUrls(urlsEntity.getIdUrls() == null ? null : new UrlsResponse().urlsEntityToResponse(urlsEntity));
        response.setMeeting(meetingEntity.getIdMeeting() == null ? null : new MeetingResponse().meetingEntityToResponse(meetingEntity));
    } catch (Exception e) {
        return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
    }
        return new SuccessfulResponse(Globals.httpSuccessfulCreatedStatus[0], Globals.httpSuccessfulCreatedStatus[1], response);
    }

    public List<TaskCustomResponse> getTasksByUserId(Long userId) {
        List<GradeProfileHasTaskEntity> taskEntities = gradeProfileHasTaskDao.findTasksByUserId(userId);
        return taskEntities.stream()
                .map(this::convertToCustomTaskResponse)
                .collect(Collectors.toList());
    }

    private TaskCustomResponse convertToCustomTaskResponse(GradeProfileHasTaskEntity entity) {
        TaskCustomResponse response = new TaskCustomResponse();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        // Setting Task State Information
        response.setIdTaskState(entity.getTaskStatesIdTaskState().getIdTaskState());
        response.setTaskStateDescription(entity.getTaskStatesIdTaskState().getDescription());
        response.setTaskStateStatus(entity.getTaskStatesIdTaskState().getStatus());

        // Setting Person Information
        response.setCi(entity.getAcademicHasGradeProfileIdAcadGrade().getGradeProfileIdGradePro().getRoleHasPersonIdRolePer().getUsersIdUsers().getPersonIdPerson().getCi());
        response.setName(entity.getAcademicHasGradeProfileIdAcadGrade().getGradeProfileIdGradePro().getRoleHasPersonIdRolePer().getUsersIdUsers().getPersonIdPerson().getName());
        response.setFatherLastName(entity.getAcademicHasGradeProfileIdAcadGrade().getGradeProfileIdGradePro().getRoleHasPersonIdRolePer().getUsersIdUsers().getPersonIdPerson().getFatherLastName());
        response.setMotherLastName(entity.getAcademicHasGradeProfileIdAcadGrade().getGradeProfileIdGradePro().getRoleHasPersonIdRolePer().getUsersIdUsers().getPersonIdPerson().getMotherLastName());
        response.setPersonDescription(entity.getAcademicHasGradeProfileIdAcadGrade().getGradeProfileIdGradePro().getRoleHasPersonIdRolePer().getUsersIdUsers().getPersonIdPerson().getDescription());
        response.setEmail(entity.getAcademicHasGradeProfileIdAcadGrade().getGradeProfileIdGradePro().getRoleHasPersonIdRolePer().getUsersIdUsers().getPersonIdPerson().getEmail());
        response.setCellPhone(entity.getAcademicHasGradeProfileIdAcadGrade().getGradeProfileIdGradePro().getRoleHasPersonIdRolePer().getUsersIdUsers().getPersonIdPerson().getCellPhone());

        // Setting Grade Profile Information
        response.setGradeProfileTitle(entity.getAcademicHasGradeProfileIdAcadGrade().getGradeProfileIdGradePro().getTitle());
        response.setStatusGraduationMode(entity.getAcademicHasGradeProfileIdAcadGrade().getGradeProfileIdGradePro().getStatusGraduationMode());
        response.setIsGradeoneortwo(entity.getAcademicHasGradeProfileIdAcadGrade().getGradeProfileIdGradePro().getIsGradeoneortwo());

        // Setting Academic Period Information
        response.setSemester(entity.getAcademicHasGradeProfileIdAcadGrade().getAcademicPeriodIdAcad().getSemester());

        // Setting Task Information
        response.setTitleTask(entity.getTitleTask());
        response.setTask(entity.getTask());
        response.setFeedback(entity.getFeedback());
        response.setOrderIs(entity.getOrderIs());
        response.setIsUrl(entity.getIsUrl() == 1);
        response.setIsMeeting(entity.getIsMeeting() == 1);
        response.setPublicationDate(entity.getPublicationDate().format(formatter));
        response.setDeadline(entity.getDeadline().format(formatter));
        response.setTaskStatus(entity.getStatus());

        return response;
    }
}
