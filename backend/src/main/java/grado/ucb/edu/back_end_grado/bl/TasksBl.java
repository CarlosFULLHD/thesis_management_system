package grado.ucb.edu.back_end_grado.bl;

import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.TasksRequest;
import grado.ucb.edu.back_end_grado.dto.response.*;
import grado.ucb.edu.back_end_grado.persistence.dao.*;
import grado.ucb.edu.back_end_grado.persistence.entity.*;
import grado.ucb.edu.back_end_grado.util.Globals;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class TasksBl {

    private TasksRequest tasksRequest;
    private final TaskStatesDao taskStatesDao;
    private final AcademicPeriodDao academicPeriodDao;
    private final GradeProfileDao gradeProfileDao;
    private final AcademicPeriodHasGradeProfileDao academicPeriodHasGradeProfileDao;
    private final GradeProfileHasTaskDao gradeProfileHasTaskDao;
    private final UrlsDao urlsDao;
    private final MeetingDao meetingDao;
    private TasksResponse tasksResponse;

    public TasksBl(TasksRequest tasksRequest, TaskStatesDao taskStatesDao, AcademicPeriodDao academicPeriodDao, GradeProfileDao gradeProfileDao, AcademicPeriodHasGradeProfileDao academicPeriodHasGradeProfileDao, GradeProfileHasTaskDao gradeProfileHasTaskDao, UrlsDao urlsDao, MeetingDao meetingDao) {
        this.tasksRequest = tasksRequest;
        this.taskStatesDao = taskStatesDao;
        this.academicPeriodDao = academicPeriodDao;
        this.gradeProfileDao = gradeProfileDao;
        this.academicPeriodHasGradeProfileDao = academicPeriodHasGradeProfileDao;
        this.gradeProfileHasTaskDao = gradeProfileHasTaskDao;
        this.urlsDao = urlsDao;
        this.meetingDao = meetingDao;
    }
    // POST => Task with meeting and url or none
    @Transactional
    public Object assignTask(TasksRequest request){
        tasksResponse = new TasksResponse();
        try {
            // FETCHING => initial state
            Optional<TaskStatesEntity> taskStates = taskStatesDao.findByStatusAndDescription(1,"ABIERTO");
            if (taskStates.isEmpty() || taskStates.get().getStatus() == 0) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1],"Error al buscar estado de tareas por defecto");
            // FETCHING => current academic period
            Optional<AcademicPeriodEntity> academicPeriod = fetchCurrentAcademicPeriod();
            if (academicPeriod.isEmpty() || academicPeriod.get().getStatus() == 0)
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "No existe un periodo académico para el periodo actual");
            // FETCHING => grade_profile
            Optional<GradeProfileEntity> gradeProfile = gradeProfileDao.findById(request.getTask().getAcademicHasGradeProfileIdAcadGrade().getGradeProfileIdGradePro().getIdGradePro());
            if (gradeProfile.isEmpty() || gradeProfile.get().getStatus() == 0)
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "No existe el perfil de grado mandado");
            // FETCHING => academic_has_grade_profile for grade_profile
            Optional<AcademicPeriodHasGradeProfileEntity> academicPeriodHasGradeProfile = academicPeriodHasGradeProfileDao.findByAcademicPeriodIdAcadAndGradeProfileIdGradeProAndStatus(academicPeriod.get(),gradeProfile.get(),1);
            if (academicPeriodHasGradeProfile.isEmpty() || academicPeriodHasGradeProfile.get().getStatus() == 0)
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "Perfil de grado no tiene periodo académico asignado");
            // GETTING => MAX order_is for a gradeProfile
            Integer orderIs = gradeProfileHasTaskDao.findMaxOrderIs(gradeProfile.get().getIdGradePro());
            int realOrderIs = orderIs == null ? 0 : orderIs;
            // PREPARING => isStudentorTutor turn
//            int isStudentOrTutor = 0;
//            if (request.getTask().getIsUrl() == 1 && request.getTask().getIsMeeting() == 1) isStudentOrTutor = 3; // Both of them can edit the task
//            else if (request.getTask().getIsUrl() == 1 && request.getTask().getIsMeeting() == 0) isStudentOrTutor = 1; // Need to be edited by the student first
//            else if (request.getTask().getIsUrl() == 0 && request.getTask().getIsMeeting() == 1) isStudentOrTutor = 2; // Only the tutor can edit the task
            // CREATING => grade_profile_has_task tuple
            GradeProfileHasTaskEntity gradeProfileHasTaskEntity = request.getTask();
            gradeProfileHasTaskEntity.setTaskStatesIdTaskState(taskStates.get());
            gradeProfileHasTaskEntity.setAcademicHasGradeProfileIdAcadGrade(academicPeriodHasGradeProfile.get());
            gradeProfileHasTaskEntity.setOrderIs(realOrderIs + 1);
            gradeProfileHasTaskEntity.setIsStudentOrTutor(1);
            gradeProfileHasTaskEntity.setFeedback("");
            gradeProfileHasTaskEntity.setStatus(-1);
            gradeProfileHasTaskEntity = gradeProfileHasTaskDao.save(gradeProfileHasTaskEntity);
            // CREATING => urls tuple
            UrlsEntity urlsEntity = new UrlsEntity();
            if (gradeProfileHasTaskEntity.getIsUrl() == 1){
                urlsEntity.setGradeProfileHasTaskIdTask(gradeProfileHasTaskEntity);
                urlsEntity.setUrl("");
                urlsEntity.setDescription("");
                urlsEntity.setStatus(1);
                urlsEntity = urlsDao.save(urlsEntity);
            }
            // CREATING => meeting tuple
            MeetingEntity meetingEntity = new MeetingEntity();
            if (gradeProfileHasTaskEntity.getIsMeeting() == 1){
                meetingEntity = request.getMeeting();
                meetingEntity.setGradeProfileHasTaskIdTask(gradeProfileHasTaskEntity);
                meetingEntity.setStatus(1);
                meetingEntity = meetingDao.save(meetingEntity);
            }
            // PREPARING => response
            tasksResponse.setTask(new GradeProfileHasTaskResponse().gradeProfileHasTaskEntityToResponse(gradeProfileHasTaskEntity));
            tasksResponse.setUrls(urlsEntity.getIdUrls() == null ? null : new UrlsResponse().urlsEntityToResponse(urlsEntity));
            tasksResponse.setMeeting(meetingEntity.getIdMeeting() == null ? null : new MeetingResponse().meetingEntityToResponse(meetingEntity));
        } catch (Exception e) {
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpSuccessfulCreatedStatus[0], Globals.httpSuccessfulCreatedStatus[1], tasksResponse);
    }

    // GET => All tasks for the current academic period based on the gradeProfile PK
    public Object getTasksForAGradeProfileForCurrentAcademicPeriod(Long idGradePro){
        List<TasksResponse> tasksResponseList = new ArrayList<>();
        try {
            // FETCHING => current academic period
            Optional<AcademicPeriodEntity> academicPeriod = fetchCurrentAcademicPeriod();
            if (academicPeriod.isEmpty() || academicPeriod.get().getStatus() == 0)
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "No existe un periodo académico para el periodo actual");
            // FETCHING => grade_profile
            Optional<GradeProfileEntity> gradeProfile = gradeProfileDao.findById(idGradePro);
            if (gradeProfile.isEmpty() || gradeProfile.get().getStatus() == 0)
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "No existe el perfil de grado mandado");
            // FETCHING => academic_has_grade_profile for grade_profile
            Optional<AcademicPeriodHasGradeProfileEntity> academicPeriodHasGradeProfile = academicPeriodHasGradeProfileDao.findByAcademicPeriodIdAcadAndGradeProfileIdGradeProAndStatus(academicPeriod.get(),gradeProfile.get(),1);
            if (academicPeriodHasGradeProfile.isEmpty() || academicPeriodHasGradeProfile.get().getStatus() == 0)
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "Perfil de grado no tiene periodo académico asignado");
            // FETCHING => all tasks
            List<GradeProfileHasTaskEntity> gradeProfileHasTaskEntityList = gradeProfileHasTaskDao.findAllByAcademicHasGradeProfileIdAcadGradeAndStatusOrderByOrderIsAsc(academicPeriodHasGradeProfile.get(),1);
            if (gradeProfileHasTaskEntityList.isEmpty())
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "No se tienen tareas para el perfil de grado asignadas aún");
            // PREPARING => final response
            for (GradeProfileHasTaskEntity x : gradeProfileHasTaskEntityList ){
                Optional<UrlsEntity> urls = urlsDao.findByGradeProfileHasTaskIdTaskAndStatus(x,1);
                Optional<MeetingEntity> meeting = meetingDao.findByGradeProfileHasTaskIdTaskAndStatus(x,1);
                tasksResponse = new TasksResponse();
                tasksResponse.setTask(new GradeProfileHasTaskResponse().gradeProfileHasTaskEntityToResponse(x));
                tasksResponse.setUrls(urls.map(entity -> new UrlsResponse().urlsEntityToResponse(entity)).orElse(null));
                tasksResponse.setMeeting(meeting.map(entity -> new MeetingResponse().meetingEntityToResponse(entity)).orElse(null));
                tasksResponseList.add(tasksResponse);
            }
        } catch (Exception e) {
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], tasksResponseList);
    }

    // GET => Task by idTask PK
    public Object getTaskByItsPk(Long idTask){
        tasksResponse = new TasksResponse();
        try {
            // SETTING => Initial response
            tasksResponse.setUrls(null);
            tasksResponse.setMeeting(null);
            // FETCHING => task
            Optional<GradeProfileHasTaskEntity> task = gradeProfileHasTaskDao.findById(idTask);
            if (task.isEmpty() || task.get().getStatus() == 0)
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "No existe esa tarea");
            // FETCHING => url of the task, if it has one
            if (task.get().getIsUrl() == 1){
                Optional<UrlsEntity> urls  = urlsDao.findByGradeProfileHasTaskIdTaskAndStatus(task.get(),1);
                if (!urls.isEmpty()) tasksResponse.setUrls(new UrlsResponse().urlsEntityToResponse(urls.get()));
            }
            if (task.get().getIsMeeting() == 1){
                Optional<MeetingEntity> meeting = meetingDao.findByGradeProfileHasTaskIdTaskAndStatus(task.get(),1);
                if (!meeting.isEmpty()) tasksResponse.setMeeting(new MeetingResponse().meetingEntityToResponse(meeting.get()));
            }
            // PREPARING => final response
            tasksResponse.setTask(new GradeProfileHasTaskResponse().gradeProfileHasTaskEntityToResponse(task.get()));
        } catch (Exception e) {
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], tasksResponse);
    }

    // PATCH => review task (tutor)
    public Object reviewTask(Long idTask, Long idTaskState, String feedBack){
        tasksResponse = new TasksResponse();
        try {
            // FETCHING => gradeProfileHasTask entity
            Optional<GradeProfileHasTaskEntity> task = gradeProfileHasTaskDao.findById(idTask);
            if (task.isEmpty() || task.get().getStatus() == 0)
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "No existe esa tarea ");
            // FETCHING => state for the task
            Optional<TaskStatesEntity> states = taskStatesDao.findById(idTaskState);
            if(states.isEmpty() || states.get().getStatus() == 0)
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "Error al conseguir estado nuevo");
            // UPDATING => tuple in the database
            task.get().setTaskStatesIdTaskState(states.get());
            task.get().setFeedback(feedBack);
            GradeProfileHasTaskEntity newTask = gradeProfileHasTaskDao.save(task.get());
            // PREPARING => Final response
            tasksResponse.setTask(new GradeProfileHasTaskResponse().gradeProfileHasTaskEntityToResponse(newTask));
        }  catch (Exception e) {
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], tasksResponse);
    }

    // PATCH => Send task to be reviewed (student)
    @Transactional
    public Object sendTaskToBeReviewed(TasksRequest tasks){
        tasksResponse = new TasksResponse();
        Optional<UrlsEntity> urls = Optional.empty();
        Optional<GradeProfileHasTaskEntity> task = Optional.empty();
        Optional<MeetingEntity> meeting = Optional.empty();
        Optional<TaskStatesEntity> taskStates = Optional.empty();
        UrlsEntity newUrls = null;
        MeetingEntity newMeeting = null;
        GradeProfileHasTaskEntity newTask = new GradeProfileHasTaskEntity();
        try {
            // FETCHING => gradeProfileHasTask entity
            task = gradeProfileHasTaskDao.findById(tasks.getTask().getIdTask());
            if (task.isEmpty() || task.get().getStatus() == 0)
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "No existe esa tarea ");
            // FETCHING => url entity
            urls = task.get().getIsUrl() == 1 ? urlsDao.findByGradeProfileHasTaskIdTaskAndStatus(task.get(),1) : Optional.empty();
            // FETCHING => meeting entity
            meeting = task.get().getIsMeeting() == 1 ? meetingDao.findByGradeProfileHasTaskIdTaskAndStatus(task.get(),1) : Optional.empty();
            // FETCHING => espera state
            taskStates = taskStatesDao.findById(1L);
            // UPDATING => urls entity in dataBase
            if (urls.isPresent()) {
                urls.get().setUrl(tasks.getUrls().getUrl());
                urls.get().setDescription(tasks.getUrls().getDescription());
                newUrls = urlsDao.save(urls.get());
            }
            // UPDATING => gradeProfileHasTask entity in database
            task.get().setTaskStatesIdTaskState(taskStates.get());
            task.get().setFeedback(tasks.getTask().getFeedback());
            task.get().setIsStudentOrTutor(2);
            newTask = gradeProfileHasTaskDao.save(task.get());
            // PREPARING => final response
            tasksResponse.setTask(new GradeProfileHasTaskResponse().gradeProfileHasTaskEntityToResponse(newTask));
            tasksResponse.setUrls(new UrlsResponse().urlsEntityToResponse(newUrls));
            tasksResponse.setMeeting(new MeetingResponse().meetingEntityToResponse(newMeeting));
        }  catch (Exception e) {
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], tasksResponse);
    }

    // PATCH => delete task
    public Object deleteTaskByItsId(Long idTask){
        boolean flag = false;
        try {
            // FETCHING => Task by its id
            // FETCHING => gradeProfileHasTask entity
            Optional<GradeProfileHasTaskEntity> task = gradeProfileHasTaskDao.findById(idTask);
            if (task.isEmpty() || task.get().getStatus() == 0)
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "No existe esa tarea ");
            gradeProfileHasTaskDao.delete(task.get());
            flag = true;
        }  catch (Exception e) {
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], flag);
    }

    // METHOD => fetch current academic period
    public Optional<AcademicPeriodEntity> fetchCurrentAcademicPeriod(){
        LocalDateTime currentDate = LocalDateTime.now();
        int currentYear = currentDate.getYear();
        int currentMonth = currentDate.getMonthValue();
        String sem = String.format("%s - %s", currentMonth > 6 ? "II" : "I",currentYear);
        return academicPeriodDao.findBySemesterAndStatus(sem,1);
    }


    public Object getTasksByGradeProfileId(Long idGradePro, Pageable pageable) {
        List<TaskCustomResponse> tasks = new ArrayList<>();
        try {
            Page<GradeProfileHasTaskEntity> taskEntities = gradeProfileHasTaskDao.findTasksByGradeProfileId(idGradePro, pageable);

            for (GradeProfileHasTaskEntity entity : taskEntities) {
                tasks.add(convertToCustomTaskResponse(entity));
            }

            Map<String, Object> response = new HashMap<>();
            response.put("data", tasks);
            response.put("totalItems", taskEntities.getTotalElements());
            response.put("totalPages", taskEntities.getTotalPages());

            return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], response);
        } catch (Exception e) {
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], e.getMessage());
        }
    }

    public Object getCountByTaskStateForGraph(Long idGradePro) {

        List<Object[]> countByTaskStateEntities = gradeProfileHasTaskDao.countByTaskStateForGraph(idGradePro);
        try {
            List<CountByTaskStateForGraph> countByTaskState = new ArrayList<>();

            for (Object[] entity : countByTaskStateEntities) {
                CountByTaskStateForGraph countByTaskStateEntity = new CountByTaskStateForGraph(
                        (String) entity[0],
                        (Long) entity[1]
                );

                countByTaskState.add(countByTaskStateEntity);
            }

            return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], countByTaskState);
        } catch (Exception e) {
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], e.getMessage());
        }
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
        //response.setPersonDescription(entity.getAcademicHasGradeProfileIdAcadGrade().getGradeProfileIdGradePro().getRoleHasPersonIdRolePer().getUsersIdUsers().getPersonIdPerson().getDescription());
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