package grado.ucb.edu.back_end_grado.bl;

import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.GradeProfileHasTaskRequest;
import grado.ucb.edu.back_end_grado.dto.response.GradeProfileHasTaskResponse;
import grado.ucb.edu.back_end_grado.persistence.dao.GradeProfileHasTaskDao;
import grado.ucb.edu.back_end_grado.persistence.dao.TaskDao;
import grado.ucb.edu.back_end_grado.persistence.entity.TaskEntity;
import grado.ucb.edu.back_end_grado.util.Globals;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GradeProfileHasTaskBl {
    private final GradeProfileHasTaskDao gradeProfileHasTaskDao;
    private final TaskDao taskDao;
    private GradeProfileHasTaskResponse gradeProfileHasTaskResponse;
    private GradeProfileHasTaskRequest gradeProfileHasTaskRequest;

    public GradeProfileHasTaskBl(GradeProfileHasTaskDao gradeProfileHasTaskDao, TaskDao taskDao, GradeProfileHasTaskResponse gradeProfileHasTaskResponse, GradeProfileHasTaskRequest gradeProfileHasTaskRequest) {
        this.gradeProfileHasTaskDao = gradeProfileHasTaskDao;
        this.taskDao = taskDao;
        this.gradeProfileHasTaskResponse = gradeProfileHasTaskResponse;
        this.gradeProfileHasTaskRequest = gradeProfileHasTaskRequest;
    }

    // Add all tasks to a recently created grade profile, with a default status
    public Object addAllDefaultTasksToANewGradeProfile(Long idGradeTask){
        gradeProfileHasTaskResponse = new GradeProfileHasTaskResponse();
        try {
            // Assuming that the grade_profile tuple was recently created and validated
            // Getting all tasks to be assigned
            List<TaskEntity> listOfTasks = taskDao.findAll();


        } catch (Exception e){
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpSuccessfulCreatedStatus[0], Globals.httpSuccessfulCreatedStatus[1], gradeProfileHasTaskResponse);

    }


}
