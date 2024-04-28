package grado.ucb.edu.back_end_grado.bl;

import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.GradeProfileHasTaskRequest;
import grado.ucb.edu.back_end_grado.dto.response.GradeProfileHasTaskResponse;
import grado.ucb.edu.back_end_grado.persistence.dao.GradeProfileDao;
import grado.ucb.edu.back_end_grado.persistence.dao.GradeProfileHasTaskDao;
import grado.ucb.edu.back_end_grado.persistence.dao.TaskDao;
import grado.ucb.edu.back_end_grado.persistence.dao.TaskStatesDao;
import grado.ucb.edu.back_end_grado.persistence.entity.GradeProfileEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.GradeProfileHasTaskEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.TaskEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.TaskStatesEntity;
import grado.ucb.edu.back_end_grado.dto.response.GradeProfileHasTaskResponse;
import grado.ucb.edu.back_end_grado.util.Globals;
import jakarta.transaction.Transactional;
import java.util.stream.Collectors;
import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class GradeProfileHasTaskBl {
    private final GradeProfileHasTaskDao gradeProfileHasTaskDao;
    private final TaskDao taskDao;
    private final GradeProfileDao gradeProfileDao;
    private final TaskStatesDao taskStatesDao;
    private GradeProfileHasTaskResponse gradeProfileHasTaskResponse;
    private GradeProfileHasTaskRequest gradeProfileHasTaskRequest;

    public GradeProfileHasTaskBl(GradeProfileHasTaskDao gradeProfileHasTaskDao, TaskDao taskDao, GradeProfileDao gradeProfileDao, TaskStatesDao taskStatesDao, GradeProfileHasTaskResponse gradeProfileHasTaskResponse, GradeProfileHasTaskRequest gradeProfileHasTaskRequest) {
        this.gradeProfileHasTaskDao = gradeProfileHasTaskDao;
        this.taskDao = taskDao;
        this.gradeProfileDao = gradeProfileDao;
        this.taskStatesDao = taskStatesDao;
        this.gradeProfileHasTaskResponse = gradeProfileHasTaskResponse;
        this.gradeProfileHasTaskRequest = gradeProfileHasTaskRequest;
    }

    @Transactional
    // Add all tasks to a recently created grade profile, with a default status
    public Object addAllDefaultTasksToANewGradeProfile(Long gradeProfileId){
        gradeProfileHasTaskResponse = new GradeProfileHasTaskResponse();
        try {
            // Assuming that the grade_profile tuple was recently created and validated
            // Getting the grade profile by its id
            Optional<GradeProfileEntity> gradeProfile = gradeProfileDao.findByIdGradeProAndStatus(gradeProfileId,1);
            if (gradeProfile.isEmpty()) return new UnsuccessfulResponse(Globals.httpBadRequest[0], Globals.httpBadRequest[1],"El perfil de grado no existe");
            // Getting all tasks to be assigned
            List<TaskEntity> listTasks = taskDao.findAllByStatusOrderByIdTask(1);
            // Obtaining the default state for a task
            Optional<TaskStatesEntity> taskStatesEntityDefaultState = taskStatesDao.findByStatusAndDescription(1,"DEFAULT");
            // Obtaining the "se permiten presentaciones" state for a task
            Optional<TaskStatesEntity> taskStatesEntityWaitState = taskStatesDao.findByStatusAndDescription(1,"SE PERMITEN PRESENTACIONES");
            if (!taskStatesEntityWaitState.isEmpty() && !taskStatesEntityDefaultState.isEmpty()){
                // Assigning tasks to a new grade profile
//                for (int i = 0; i < listTasks.size(); i += 1){
//                    GradeProfileHasTaskEntity gradeProfileHasTaskEntity = new GradeProfileHasTaskEntity();
//                    gradeProfileHasTaskEntity.setTaskStatesIdTaskState(i == 0 ? taskStatesEntityWaitState.get() : taskStatesEntityDefaultState.get());
//                   // gradeProfileHasTaskEntity.setTaskIdTask(listTasks.get(i));
//                    gradeProfileHasTaskEntity.setGradeProfileIdGradePro(gradeProfile.get());
//                    gradeProfileHasTaskEntity.setComments(i == 0 ? "Empieza por esta primera tarea" : "");
//                    gradeProfileHasTaskEntity.setIsTaskDone(0);
//                    gradeProfileHasTaskEntity.setIsTaskCurrent(i == 0 ? 1 : 0);
//                    gradeProfileHasTaskDao.save(gradeProfileHasTaskEntity);
//                }
            }
        } catch (Exception e){
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpSuccessfulCreatedStatus[0], Globals.httpSuccessfulCreatedStatus[1], gradeProfileHasTaskResponse);
    }

    // Get all grade profiles has tasks
    public Object getActiveGradeProfileHasTaskBl(){
        List<GradeProfileHasTaskEntity> gradeProfileHasTaskEntityList = gradeProfileHasTaskDao.findByStatus(1);
        List<GradeProfileHasTaskResponse> response = new ArrayList<>();
        try {
            // Checking if there are retrieved information in the grade profile has task list
            if (gradeProfileHasTaskEntityList.isEmpty()) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1],"No existe perfiles de grado aún");
            // Looping and filling response list with all the retrieved grade profile
            for (GradeProfileHasTaskEntity x : gradeProfileHasTaskEntityList){
                response.add(new GradeProfileHasTaskResponse().gradeProfileHasTaskEntityToResponse(x));
            }
        } catch(Exception e){
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1],response);
    }

    // Get grade profile, name, email and current task by grade profile
    public Object getIsCurrentTaskByGradeProfile(){
        List<GradeProfileHasTaskEntity> gradeProfileHasTaskEntityList = gradeProfileHasTaskDao.findAllByIsTaskCurrentAndStatus(1,1);
        List<Object> response = new ArrayList<>();
        //List<GradeProfileHasTaskResponse> response = new ArrayList<>();
        try {
            // Checking if there are retrieved information in the grade profile has task list
            if (gradeProfileHasTaskEntityList.isEmpty()) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1],"No existe perfiles de grado aún");
            // Looping and filling response list with all the retrieved grade profile
            for (GradeProfileHasTaskEntity x : gradeProfileHasTaskEntityList){
                Map<String,Object> dk = new HashMap<>();
                dk.put("idGradeTask",x.getIdGradeTask());
                dk.put("idTaskState", x.getTaskStatesIdTaskState().getIdTaskState());
               // dk.put("idTask", x.getTaskIdTask().getIdTask());
                dk.put("idGradePro", x.getGradeProfileIdGradePro().getIdGradePro());
                dk.put("name", x.getGradeProfileIdGradePro().getRoleHasPersonIdRolePer().getUsersIdUsers().getPersonIdPerson().getName());
                dk.put("fatherLastName", x.getGradeProfileIdGradePro().getRoleHasPersonIdRolePer().getUsersIdUsers().getPersonIdPerson().getFatherLastName());
                dk.put("motherLastName", x.getGradeProfileIdGradePro().getRoleHasPersonIdRolePer().getUsersIdUsers().getPersonIdPerson().getMotherLastName());
                dk.put("email", x.getGradeProfileIdGradePro().getRoleHasPersonIdRolePer().getUsersIdUsers().getPersonIdPerson().getEmail());
                dk.put("title", x.getGradeProfileIdGradePro().getTitle());
                dk.put("statusGraduationMode", x.getGradeProfileIdGradePro().getStatusGraduationMode());
                //dk.put("titleTask",x.getTaskIdTask().getTitleTask());
                dk.put("stateDescription", x.getTaskStatesIdTaskState().getDescription());
                response.add(dk);
                //response.add(new GradeProfileHasTaskResponse().gradeProfileHasTaskEntityToResponse(x));
            }
        } catch(Exception e){
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1],response);
    }

    // En GradeProfileHasTaskBl
    public Object findTasksByUserId(Long idUsers) {
        List<GradeProfileHasTaskEntity> tasks = gradeProfileHasTaskDao.findTasksByUserId(idUsers);
        if (tasks.isEmpty()) {
            return new UnsuccessfulResponse("404", "No Tasks Found", "No se encontraron tareas para el usuario especificado.");
        }
        List<GradeProfileHasTaskResponse> responses = tasks.stream()
                .map(task -> new GradeProfileHasTaskResponse().gradeProfileHasTaskEntityToResponse(task))
                .collect(Collectors.toList());
        return new SuccessfulResponse("200", "Tasks Found", responses);
    }




}
