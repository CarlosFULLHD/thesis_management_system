package grado.ucb.edu.back_end_grado.bl;

import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.TaskStatesRequest;
import grado.ucb.edu.back_end_grado.dto.response.TaskStatesResponse;
import grado.ucb.edu.back_end_grado.persistence.dao.TaskStatesDao;
import grado.ucb.edu.back_end_grado.persistence.entity.TaskStatesEntity;
import grado.ucb.edu.back_end_grado.util.Globals;
import org.springframework.stereotype.Service;

@Service
public class TaskStatesBl {
    private final TaskStatesDao taskStatesDao;
    private TaskStatesEntity taskStatesEntity;
    private TaskStatesResponse taskStatesResponse;

    public TaskStatesBl(TaskStatesDao taskStatesDao, TaskStatesEntity taskStatesEntity, TaskStatesResponse taskStatesResponse) {
        this.taskStatesDao = taskStatesDao;
        this.taskStatesEntity = taskStatesEntity;
        this.taskStatesResponse = taskStatesResponse;
    }

    // New Task state
    public Object newTaskState(TaskStatesRequest request){
        taskStatesResponse = new TaskStatesResponse();
        try {
            // Creating tuple in DB
            taskStatesEntity = taskStatesDao.save(request.taskStatesRequestToEntity(request));
            // Preparing response
            taskStatesResponse = taskStatesResponse.taskStatesEntityToResponse(taskStatesEntity);
        } catch (Exception e){
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpSuccessfulCreatedStatus[0], Globals.httpSuccessfulCreatedStatus[1], taskStatesResponse);
    }
}
