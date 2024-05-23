package grado.ucb.edu.back_end_grado.bl;

import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.TasksRequest;
import grado.ucb.edu.back_end_grado.dto.response.GradeProfileHasTaskResponse;
import grado.ucb.edu.back_end_grado.dto.response.MeetingResponse;
import grado.ucb.edu.back_end_grado.dto.response.TasksResponse;
import grado.ucb.edu.back_end_grado.dto.response.UrlsResponse;
import grado.ucb.edu.back_end_grado.persistence.dao.*;
import grado.ucb.edu.back_end_grado.persistence.entity.*;
import grado.ucb.edu.back_end_grado.util.Globals;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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






    // METHOD => fetch current academic period
    public Optional<AcademicPeriodEntity> fetchCurrentAcademicPeriod(){
        LocalDateTime currentDate = LocalDateTime.now();
        int currentYear = currentDate.getYear();
        int currentMonth = currentDate.getMonthValue();
        String sem = String.format("%s - %s", currentMonth > 6 ? "II" : "I",currentYear);
        return academicPeriodDao.findBySemesterAndStatus(sem,1);
    }

}