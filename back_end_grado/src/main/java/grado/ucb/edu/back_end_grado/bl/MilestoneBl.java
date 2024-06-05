package grado.ucb.edu.back_end_grado.bl;

import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.MilestoneRequest;
import grado.ucb.edu.back_end_grado.dto.response.GradeProfileResponse;
import grado.ucb.edu.back_end_grado.dto.response.MilestoneResponse;
import grado.ucb.edu.back_end_grado.persistence.dao.AcademicPeriodDao;
import grado.ucb.edu.back_end_grado.persistence.dao.GradeProfileDao;
import grado.ucb.edu.back_end_grado.persistence.dao.MilestoneDao;
import grado.ucb.edu.back_end_grado.persistence.dao.TaskStatesDao;
import grado.ucb.edu.back_end_grado.persistence.entity.*;
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
    private final GradeProfileBl gradeProfileBl;
    private final AcademicPeriodHasGradeProfileBl academicPeriodHasGradeProfileBl;
    private final GradeProfileDao gradeProfileDao;
    private MilestoneEntity milestoneEntity;
    private MilestoneResponse milestoneResponse;

    public MilestoneBl(MilestoneDao milestoneDao, TaskStatesDao taskStatesDao, AcademicPeriodDao academicPeriodDao, GradeProfileBl gradeProfileBl, AcademicPeriodHasGradeProfileBl academicPeriodHasGradeProfileBl, GradeProfileDao gradeProfileDao, MilestoneEntity milestoneEntity, MilestoneResponse milestoneResponse) {
        this.milestoneDao = milestoneDao;
        this.taskStatesDao = taskStatesDao;
        this.academicPeriodDao = academicPeriodDao;
        this.gradeProfileBl = gradeProfileBl;
        this.academicPeriodHasGradeProfileBl = academicPeriodHasGradeProfileBl;
        this.gradeProfileDao = gradeProfileDao;
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
            milestoneEntity.setIsSend(-1);
            milestoneEntity = milestoneDao.save(milestoneEntity);
            // Preparing response
            milestoneResponse = milestoneResponse.milestoneEntityToResponse(milestoneEntity);
        } catch (Exception e){
        return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
    }
        return new SuccessfulResponse(Globals.httpSuccessfulCreatedStatus[0], Globals.httpSuccessfulCreatedStatus[1], milestoneResponse);
    }


    // Get all active milestones for the current academic period
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


    // Get milestone for a user
    public Object getMilestoneByUser(Long idUsers){
        milestoneResponse = new MilestoneResponse();
        try {
            Optional<MilestoneEntity> milestoneStudent = milestoneDao.findByUsersIdUsers_IdUsers(idUsers);
            if (milestoneStudent.isEmpty() || milestoneStudent.get().getStatus() == 0)
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "Usuario sin hito");
            milestoneResponse = milestoneResponse.milestoneEntityToResponse(milestoneStudent.get());

        } catch (Exception e){
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], milestoneResponse);
    }

    // Method for the student to save the form
    @Transactional
    public Object saveMilestone(MilestoneRequest request){
        milestoneResponse = new MilestoneResponse();
        try {
            int x = milestoneDao.studentSaveForm(request.getIdMilestone(), request.getUrl());
            if (x == 0)  return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], "Error al salvar formulario");
            Optional<MilestoneEntity> dk = milestoneDao.findById(request.getIdMilestone());
            if (dk.isEmpty()) return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], "No se puede encontrar el hito recien actualizado");
            milestoneResponse = milestoneResponse.milestoneEntityToResponse(dk.get());
        } catch (Exception e){
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], milestoneResponse);
    }
    // Method for the student to send the form
    @Transactional
    public Object sendMilestone(MilestoneRequest request){
        milestoneResponse = new MilestoneResponse();
        try {
            Optional<TaskStatesEntity> taskStates = taskStatesDao.findByStatusAndDescription(1,"EN ESPERA");
            if (taskStates.isEmpty()) return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], "Error conseguir estado de espera");
            int x = milestoneDao.studentSendForm(request.getIdMilestone(), taskStates.get(),request.getUrl());
            if (x == 0)  return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], "Error al enviar formulario");
            Optional<MilestoneEntity> dk = milestoneDao.findById(request.getIdMilestone());
            if (dk.isEmpty()) return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], "No se puede encontrar el hito recien actualizado");
            milestoneResponse = milestoneResponse.milestoneEntityToResponse(dk.get());
        } catch (Exception e){
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], milestoneResponse);
    }

    // Method to review the form send it by the student
    @Transactional
    public Object reviewMilestoneForm(MilestoneRequest request){
        milestoneResponse = new MilestoneResponse();
        try {
            Optional<TaskStatesEntity> taskStates = taskStatesDao.findById(request.getTaskStatesIdTaskState().getIdTaskState());
            if (taskStates.isEmpty())   return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], "Error conseguir estado");
            int x = milestoneDao.reviewStudentForm(request.getIdMilestone(),taskStates.get(),request.getPlpInvolved(),request.getComments());
            if (x == 0) return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], "Error al enviar formulario");

            Optional<MilestoneEntity> dk = milestoneDao.findById(request.getIdMilestone());
            if (dk.isEmpty()) return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], "No se puede encontrar el hito recien actualizado");
            // Creating new grade profile if the review has been approved
            if (taskStates.get().getIdTaskState() == 4){
                Object gradeProfileResponse =  gradeProfileBl.newGradeProfileForNewStudentAccount(dk.get().getUsersIdUsers().getRoleHasPersonEntity().getIdRolePer());
                if (gradeProfileResponse instanceof UnsuccessfulResponse) throw new RuntimeException("Error al crear perfil de grado para carta aprobada");
                // Getting the recently created grade profile
                Optional<GradeProfileEntity> gradeProfileEntity = gradeProfileDao.findById(((GradeProfileResponse) ((SuccessfulResponse) gradeProfileResponse).getResult()).getIdGradePro());
                if (gradeProfileEntity.isEmpty()) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "No existe el perfil de grado recien creado");
                Object academicHasGradeProfile = academicPeriodHasGradeProfileBl.newAcademicPeriodHasGradeProfile(gradeProfileEntity.get());
            }
            milestoneResponse = milestoneResponse.milestoneEntityToResponse(dk.get());
        } catch (Exception e){
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], milestoneResponse);
    }

}
