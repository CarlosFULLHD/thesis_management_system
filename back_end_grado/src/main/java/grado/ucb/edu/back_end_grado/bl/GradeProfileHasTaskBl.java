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
import grado.ucb.edu.back_end_grado.util.Globals;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
                for (int i = 0; i < listTasks.size(); i += 1){
                    GradeProfileHasTaskEntity gradeProfileHasTaskEntity = new GradeProfileHasTaskEntity();
                    gradeProfileHasTaskEntity.setTaskStatesIdTaskState(i == 0 ? taskStatesEntityWaitState.get() : taskStatesEntityDefaultState.get());
                    gradeProfileHasTaskEntity.setTaskIdTask(listTasks.get(i));
                    gradeProfileHasTaskEntity.setGradeProfileIdGradePro(gradeProfile.get());
                    gradeProfileHasTaskEntity.setComments(i == 0 ? "Empieza por esta primera tarea" : "");
                    gradeProfileHasTaskEntity.setIsTaskDone(0);
                    gradeProfileHasTaskEntity.setIsTaskCurrent(i == 0 ? 1 : 0);
                    gradeProfileHasTaskDao.save(gradeProfileHasTaskEntity);
                }
            }
        } catch (Exception e){
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpSuccessfulCreatedStatus[0], Globals.httpSuccessfulCreatedStatus[1], gradeProfileHasTaskResponse);

    }


}
