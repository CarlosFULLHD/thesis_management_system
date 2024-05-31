package grado.ucb.edu.back_end_grado.bl;

import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.FormalDefenseRequest;
import grado.ucb.edu.back_end_grado.dto.response.FormalDefenseResponse;
import grado.ucb.edu.back_end_grado.persistence.dao.*;
import grado.ucb.edu.back_end_grado.persistence.entity.*;
import grado.ucb.edu.back_end_grado.util.Globals;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Service
public class FormalDefenseBl {


    public final AcademicPeriodDao academicPeriodDao;
    public final AcademicPeriodHasGradeProfileDao academicPeriodHasGradeProfileDao;
    public final GradeProfileDao gradeProfileDao;
    public final TaskStatesDao taskStatesDao;
    public final FormalDefenseDao formalDefenseDao;
    public FormalDefenseResponse formalDefenseResponse;

    public FormalDefenseBl(AcademicPeriodDao academicPeriodDao, AcademicPeriodHasGradeProfileDao academicPeriodHasGradeProfileDao, GradeProfileDao gradeProfileDao, TaskStatesDao taskStatesDao, FormalDefenseDao formalDefenseDao) {
        this.academicPeriodDao = academicPeriodDao;
        this.academicPeriodHasGradeProfileDao = academicPeriodHasGradeProfileDao;
        this.gradeProfileDao = gradeProfileDao;
        this.taskStatesDao = taskStatesDao;
        this.formalDefenseDao = formalDefenseDao;
    }

    // GET => Formal defense entity of the current academic period by idGradePro PK
    public Object getGradeProfileForCurrentAcademicPeriod(Long idGradePro){
        formalDefenseResponse = new FormalDefenseResponse();
        try {
            // FETCHING => current academic period
            Optional<AcademicPeriodEntity> academicPeriod = fetchCurrentAcademicPeriod();
            if (academicPeriod.isEmpty() || academicPeriod.get().getStatus() == 0)
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "No existe un periodo académico para el periodo actual");
            // FETCHING => gradeProfile entity
            Optional<GradeProfileEntity> gradeProfile = gradeProfileDao.findById(idGradePro);
            if (gradeProfile.isEmpty() || gradeProfile.get().getStatus() == 0)
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "No existe perfil de grado");
            // FETCHING => academic_has_grade_profile entity
            Optional<AcademicPeriodHasGradeProfileEntity> academicPeriodHasGradeProfile = academicPeriodHasGradeProfileDao.findByAcademicPeriodIdAcadAndGradeProfileIdGradeProAndStatus(academicPeriod.get(),gradeProfile.get(),1);
            if (academicPeriodHasGradeProfile.isEmpty() || academicPeriodHasGradeProfile.get().getStatus() == 0)
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "El periodo academico no tiene perfiles de grado asignados");
            // FETCHING => formal_defense entity
            Optional<FormalDefenseEntity> formalDefense = formalDefenseDao.findByAcademicHasGradeProfileIdAcadGrade(academicPeriodHasGradeProfile.get());
            if (formalDefense.isEmpty() || formalDefense.get().getStatus() == 0)
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "No existe defensa formal para este perfil de grado");
            formalDefenseResponse = formalDefenseResponse.formalDefenseEntityToResponse(formalDefense.get());
        } catch (Exception e) {
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], formalDefenseResponse);
    }

    // POST => Start new Formal defense for a gradeProfile based on the gradeProfile pk and recent academic period
    public Object startNewFormalDefense(FormalDefenseRequest request){
        formalDefenseResponse = new FormalDefenseResponse();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        try {
            // FETCHING => current academic period
            Optional<AcademicPeriodEntity> academicPeriod = fetchCurrentAcademicPeriod();
            if (academicPeriod.isEmpty() || academicPeriod.get().getStatus() == 0)
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "No existe un periodo académico para el periodo actual");
            // FETCHING => gradeProfile entity
            Optional<GradeProfileEntity> gradeProfile = gradeProfileDao.findById(request.getAcademicHasGradeProfileIdAcadGrade().getGradeProfileIdGradePro().getIdGradePro());
            if (gradeProfile.isEmpty() || gradeProfile.get().getStatus() == 0)
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "No existe perfil de grado");
            // FETCHING => academic_has_grade_profile entity
            Optional<AcademicPeriodHasGradeProfileEntity> academicPeriodHasGradeProfile = academicPeriodHasGradeProfileDao.findByAcademicPeriodIdAcadAndGradeProfileIdGradeProAndStatus(academicPeriod.get(),gradeProfile.get(),1);
            if (academicPeriodHasGradeProfile.isEmpty() || academicPeriodHasGradeProfile.get().getStatus() == 0)
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "El periodo academico no tiene perfiles de grado asignados");
            // FETCHING => default task_states_id_task_state
            Optional<TaskStatesEntity> taskStates = taskStatesDao.findByStatusAndDescription(1,"ABIERTO");
            if (taskStates.isEmpty() || taskStates.get().getStatus() == 0)
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "Estado por defecto no valido");
            // CREATING => entry in the database
            FormalDefenseEntity formalDefenseEntity = new FormalDefenseEntity();
            formalDefenseEntity.setTaskStatesIdTaskState(taskStates.get());
            formalDefenseEntity.setAcademicHasGradeProfileIdAcadGrade(academicPeriodHasGradeProfile.get());
            formalDefenseEntity.setFeedback("Debes subir la url de tu documento final lo antes posible");
            formalDefenseEntity.setUrl("");
            formalDefenseEntity.setPlpInvolved(request.getPlpInvolved());
            formalDefenseEntity.setDefenseDate( LocalDateTime.parse(request.getDefenseDate(), formatter));
            formalDefenseEntity.setPlace(request.getPlace());
            formalDefenseEntity.setGrade(BigDecimal.valueOf(0.0));
            formalDefenseEntity.setIsStudentOrLecturer(1);
            formalDefenseEntity.setIsGradeoneortwo(gradeProfile.get().getIsGradeoneortwo());
            formalDefenseEntity = formalDefenseDao.save(formalDefenseEntity);
            // PREPARING => final response
            formalDefenseResponse = formalDefenseResponse.formalDefenseEntityToResponse(formalDefenseEntity);
        } catch (Exception e) {
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpSuccessfulCreatedStatus[0], Globals.httpSuccessfulCreatedStatus[1], formalDefenseResponse);
    }

    // UPDATE => student sends its document to be reviewed
    public Object studentSendDocument(FormalDefenseRequest request){
       formalDefenseResponse = new FormalDefenseResponse();
        try {
            // FETCHING => formal defense item
            Optional<FormalDefenseEntity> formalDefense = formalDefenseDao.findById(request.getIdFormal());
            if (formalDefense.isEmpty() || formalDefense.get().getStatus() == 0){
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "No tienes asignada una defense formal aún");
            }
            // FETCHING => new state for the formal defense
            Optional<TaskStatesEntity> formalState = taskStatesDao.findByStatusAndDescription(1,"EN ESPERA");
            if (formalState.isEmpty() || formalState.get().getStatus() == 0){
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "Error al conseguir estado de espera");
            }
            // PREPARING => formal defense entity to be updated
            FormalDefenseEntity newFormalDefense = formalDefense.get();
            newFormalDefense.setUrl(request.getUrl());
            newFormalDefense.setTaskStatesIdTaskState(formalState.get());
            newFormalDefense.setFeedback(request.getFeedback());
            // UPDATING => entity into the database
            newFormalDefense = formalDefenseDao.save(newFormalDefense);
            // PREPARING => final response;
            formalDefenseResponse = formalDefenseResponse.formalDefenseEntityToResponse(newFormalDefense);

        } catch (Exception e) {
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpSuccessfulCreatedStatus[0], Globals.httpSuccessfulCreatedStatus[1], formalDefenseResponse);
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
