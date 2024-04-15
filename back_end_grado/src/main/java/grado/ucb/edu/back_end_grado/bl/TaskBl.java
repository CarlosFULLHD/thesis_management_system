package grado.ucb.edu.back_end_grado.bl;

import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.TaskRequest;
import grado.ucb.edu.back_end_grado.dto.response.PublicInformationResponse;
import grado.ucb.edu.back_end_grado.dto.response.TaskResponse;
import grado.ucb.edu.back_end_grado.persistence.dao.TaskDao;
import grado.ucb.edu.back_end_grado.persistence.entity.PublicInformationEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.TaskEntity;
import grado.ucb.edu.back_end_grado.util.Globals;
import org.springframework.scheduling.config.Task;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TaskBl {
    private final TaskDao taskDao;
    private TaskEntity taskEntity;
    private TaskResponse taskResponse;

    public TaskBl(TaskDao taskDao, TaskEntity taskEntity, TaskResponse taskResponse) {
        this.taskDao = taskDao;
        this.taskEntity = taskEntity;
        this.taskResponse = taskResponse;
    }

    // New task
    public Object newTask(TaskRequest request){
        taskResponse = new TaskResponse();
        try {
            // Creating tuple in DB
            taskEntity = taskDao.save(request.taskRequestToEntity(request));
            // Preparing response
            taskResponse = taskResponse.taskEntityToResponse(taskEntity);
        } catch (Exception e){
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpSuccessfulCreatedStatus[0], Globals.httpSuccessfulCreatedStatus[1], taskEntity);
    }

    // Get tasks according to its workshop (one or two)
    public Object getTaskByWorkShop(int isGradeoneortwo){
        List<TaskResponse> response = new ArrayList<>();
        try{
            // Fetching task from DB
            List<TaskEntity> taskEntityList = taskDao.findAllByIsGradeoneortwoOrderByIdTask(isGradeoneortwo);
            if (taskEntityList.isEmpty()) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1],"No existe ningúna tarea activa para taller de grado " + isGradeoneortwo);
            // Preparing response
            for (TaskEntity x : taskEntityList){
                response.add(new TaskResponse().taskEntityToResponse(x));
            }
        } catch (Exception e){
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], response);
    }

    // Get all active tasks ordered by its id
    public Object getOrderedActiveTasks(){
        List<TaskResponse> response = new ArrayList<>();
        try {
            // Fetching tasks from DB
            List<TaskEntity> taskEntityList = taskDao.findAllByStatusOrderByIdTask(1);
            if (taskEntityList.isEmpty()) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1],"No existe ningúna tarea activa");
            // Preparing response
            for (TaskEntity x : taskEntityList){
                response.add(new TaskResponse().taskEntityToResponse(x));
            }

        } catch (Exception e){
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], response);
    }

    // Logic delete a task entry
    public Object deleteActiveTaskById(String idTask){
        taskResponse = new TaskResponse();
        try {
            // Checking if the task exists
            Optional<TaskEntity> task = taskDao.findById(Long.parseLong(idTask));
            if (task.isEmpty()) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "Tarea no existe");
            // Checking if the task has been already deleted or not
            if (task.get().getStatus() == 0) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "Tarea ya esta inactiva");
            // Locally deleting entry
            int x = taskDao.logicDelete(Long.parseLong(idTask));
            // If there was an error deleting the task
            if (x == 0) return new UnsuccessfulResponse(Globals.httpMethodNowAllowed[0], Globals.httpMethodNowAllowed[1], "Error al borrar tarea");
            // Preparing response
            taskEntity = task.get();
            taskEntity.setStatus(0);
            taskResponse = taskResponse.taskEntityToResponse(taskEntity);
        } catch (Exception e){
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1],taskResponse);
    }

    // Update an active task entry
    public Object updateActiveTaskById(TaskRequest request){
        taskResponse = new TaskResponse();
        try {
            // Checking if the task exists
            Optional<TaskEntity> task = taskDao.findById(request.getIdTask());
            if (task.isEmpty()) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "Tarea no existe");
            // Checking if the retrieved task has already been deleated
            if(task.get().getStatus() == 0) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "Tarea ya esta inactiva");
            // Patching entry
            int x = taskDao.patchEntry(request.getTitleTask(), request.getTask(), request.getIdTask());
            if (x == 0) return new UnsuccessfulResponse(Globals.httpMethodNowAllowed[0], Globals.httpMethodNowAllowed[1], "Problemas al modificar tarea");
            // Preparing response
            task = taskDao.findById(request.getIdTask());
            taskResponse = taskResponse.taskEntityToResponse(task.get());
        } catch (Exception e){
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1],taskResponse);
    }
}
