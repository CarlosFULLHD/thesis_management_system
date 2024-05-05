package grado.ucb.edu.back_end_grado.bl;

import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.MilestoneRequest;
import grado.ucb.edu.back_end_grado.dto.response.MilestoneResponse;
import grado.ucb.edu.back_end_grado.persistence.dao.AcademicPeriodDao;
import grado.ucb.edu.back_end_grado.persistence.dao.MilestoneDao;
import grado.ucb.edu.back_end_grado.persistence.dao.TaskStatesDao;
import grado.ucb.edu.back_end_grado.persistence.dao.UsersDao;
import grado.ucb.edu.back_end_grado.persistence.entity.AcademicPeriodEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.MilestoneEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.TaskStatesEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.UsersEntity;
import grado.ucb.edu.back_end_grado.util.Globals;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MilestoneBl {
    private final MilestoneDao milestoneDao;
    private final TaskStatesDao taskStatesDao;
    private final AcademicPeriodDao academicPeriodDao;
    private final UsersDao usersDao;
    private MilestoneEntity milestoneEntity;
    private MilestoneResponse milestoneResponse;


    public MilestoneBl(MilestoneDao milestoneDao, TaskStatesDao taskStatesDao, AcademicPeriodDao academicPeriodDao, UsersDao usersDao, MilestoneEntity milestoneEntity, MilestoneResponse milestoneResponse) {
        this.milestoneDao = milestoneDao;
        this.taskStatesDao = taskStatesDao;
        this.academicPeriodDao = academicPeriodDao;
        this.usersDao = usersDao;
        this.milestoneEntity = milestoneEntity;
        this.milestoneResponse = milestoneResponse;
    }

    // Create new milestone for new user with role of student
    public Object newMilestone(UsersEntity usersEntity){
        milestoneResponse = new MilestoneResponse();
        try {
            // Checking if there are not a previous active milestone for that user
            Optional<MilestoneEntity> milestoneCheck = milestoneDao.findByUsersIdUsers(usersEntity);
            if (!milestoneCheck.isEmpty() && milestoneCheck.get().getStatus() == 1) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1],"Usuario ya tiene un hito asignado");
            // Checking if the default open state is available
            Optional<TaskStatesEntity> taskStates = taskStatesDao.findByStatusAndDescription(1,"ABIERTO");
            if (taskStates.isEmpty()) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1],"Error al buscar estado de tareas por defecto");
            // Saving entry into data base
            milestoneEntity = new MilestoneEntity();
            milestoneEntity.setTaskStatesIdTaskState(taskStates.get());
            milestoneEntity.setUsersIdUsers(usersEntity);
            milestoneEntity.setComments("");
            milestoneEntity.setUrl("");
            milestoneEntity.setPlpInvolved("");
            milestoneEntity = milestoneDao.save(milestoneEntity);
            // Preparing response
            milestoneResponse = milestoneResponse.milestoneEntityToResponse(milestoneEntity);
        } catch (Exception e){
        return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
    }
        return new SuccessfulResponse(Globals.httpSuccessfulCreatedStatus[0], Globals.httpSuccessfulCreatedStatus[1], milestoneResponse);
    }

    public Object getAllMilestonesByAcademicPeriod(){
        List<MilestoneResponse> milestoneResponseList = new ArrayList<>();
        try {
            // Checking if there is an academic period right now
            LocalDateTime currentDate = LocalDateTime.now();
            int currentYear = currentDate.getYear();
            int currentMonth = currentDate.getMonthValue();
            String sem = String.format("%s - %s", currentMonth > 6 ? "II" : "I",currentYear);
            Optional<AcademicPeriodEntity> academicPeriod = academicPeriodDao.findBySemesterAndStatus(sem,1);
            if (academicPeriod.isEmpty())
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "No existe un periodo académico para el periodo actual");
            List<MilestoneEntity> milestoneEntityList = milestoneDao.findMilestonesBetweenDates(academicPeriod.get().getInitDate(),academicPeriod.get().getEndDate());
            if (milestoneEntityList.size() > 0){
                for (MilestoneEntity x : milestoneEntityList){
                    milestoneResponseList.add(milestoneResponse.milestoneEntityToResponse(x));
                }
            }
        } catch (Exception e){
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], milestoneResponseList);
    }
}
