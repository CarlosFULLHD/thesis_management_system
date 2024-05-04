package grado.ucb.edu.back_end_grado.bl;

import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.TaskHasDateListRequest;
import grado.ucb.edu.back_end_grado.dto.request.TaskHasDateRequest;
import grado.ucb.edu.back_end_grado.dto.response.PublicInformationResponse;
import grado.ucb.edu.back_end_grado.dto.response.TaskHasDateResponse;
import grado.ucb.edu.back_end_grado.persistence.dao.AcademicPeriodDao;
import grado.ucb.edu.back_end_grado.persistence.dao.TaskHasDateDao;
import grado.ucb.edu.back_end_grado.persistence.entity.AcademicPeriodEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.PublicInformationEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.TaskHasDateEntity;
import grado.ucb.edu.back_end_grado.util.Globals;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TaskHasDateBl {
    private final TaskHasDateDao taskHasDateDao;
    private TaskHasDateEntity taskHasDateEntity;
    private AcademicPeriodDao academicPeriodDao;

    private TaskHasDateResponse taskHasDateResponse;

    public TaskHasDateBl(TaskHasDateDao taskHasDateDao, TaskHasDateEntity taskHasDateEntity, AcademicPeriodDao academicPeriodDao, TaskHasDateResponse taskHasDateResponse) {
        this.taskHasDateDao = taskHasDateDao;
        this.taskHasDateEntity = taskHasDateEntity;
        this.academicPeriodDao = academicPeriodDao;
        this.taskHasDateResponse = taskHasDateResponse;
    }


    @Transactional
    public Object newTasksToAcademicPeriod(TaskHasDateListRequest requests){
        List<TaskHasDateResponse> response = new ArrayList<>();
        try {
            List<TaskHasDateRequest> requestTasks = requests.getTasks();
            if (requestTasks.isEmpty()) return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],"Lista de tareas vacias");
            List<TaskHasDateEntity> entities = new ArrayList<>();
            for (TaskHasDateRequest x: requestTasks){
                entities.add(x.taskHasDateRequestToEntity(x));
            }
            entities = taskHasDateDao.saveAll(entities);
            // Preparing response
            for (TaskHasDateEntity x : entities){
                response.add(taskHasDateResponse.taskHasDateEntityToResponse(x));
            }

        } catch (Exception e){
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpSuccessfulCreatedStatus[0], Globals.httpSuccessfulCreatedStatus[1], response);
    }

    // New task has date
    public Object newTaskHasDate(TaskHasDateRequest request){
        taskHasDateResponse = new TaskHasDateResponse();
        try {
            Optional<AcademicPeriodEntity> academicPeriod = academicPeriodDao.findByIdAcadAndStatus(request.getAcademicPeriodIdAcad().getIdAcad(), 1);
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            // Checking formats
            LocalDateTime taskPublicationDate = LocalDateTime.parse(request.getPublicationDate(), formatter);
            LocalDateTime taskEndDate = LocalDateTime.parse(request.getDeadline(), formatter);
            if (taskPublicationDate.isBefore(academicPeriod.get().getInitDate())
                    || taskPublicationDate.isAfter(academicPeriod.get().getEndDate())
                    || taskEndDate.isBefore(academicPeriod.get().getInitDate())
                    || taskEndDate.isAfter(academicPeriod.get().getEndDate()
            ))  return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],"Problemas con fechas de periodo académico");
            // Checking if a task has not been repeated in the same academic period
            Optional<TaskHasDateEntity> taskHasDate = taskHasDateDao.findByTaskIdTask_IdTaskAndAcademicPeriodIdAcad_IdAcad(request.getTaskIdTask().getIdTask(),request.getAcademicPeriodIdAcad().getIdAcad());

            if (taskHasDate.isPresent())
                 return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],"Esta tarea ya fue asignada al periodo académico");
            // Creating tuple in DB
            taskHasDateEntity = request.taskHasDateRequestToEntity(request);
            taskHasDateEntity = taskHasDateDao.save(taskHasDateEntity);
            // Preparing response
            taskHasDateResponse = taskHasDateResponse.taskHasDateEntityToResponse(taskHasDateEntity);
        } catch (Exception e){
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpSuccessfulCreatedStatus[0], Globals.httpSuccessfulCreatedStatus[1], taskHasDateResponse);
    }

    // Get all assigned tasks by academic period
    public Object getTasksByAcademicPeriodAndIsGradeOneOrTwo(Long idAcad, int isGradeoneortwo){
        List<TaskHasDateEntity> taskHasDateResponseList = new ArrayList<>();
        List<TaskHasDateResponse> response = new ArrayList<>();
        try {
            taskHasDateResponseList = taskHasDateDao.findAllByAcademicPeriodIdAcad_IdAcadAndStatusAndTaskIdTask_IsGradeoneortwoOrderByOrderIs(idAcad,1, isGradeoneortwo);
            if (taskHasDateResponseList.isEmpty())
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1],"No existen tareas asignadas al periodo académico");
            // Looping and filling response list with all the retrieved info
            for (TaskHasDateEntity x :taskHasDateResponseList){
                response.add(new TaskHasDateResponse().taskHasDateEntityToResponse(x));
            }
        } catch (Exception e){
        return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
    }
        return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], response);
    }
}
