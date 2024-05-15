package grado.ucb.edu.back_end_grado.bl;

import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.response.AcademicPeriodHasGradeProfileResponse;
import grado.ucb.edu.back_end_grado.persistence.dao.AcademicPeriodDao;
import grado.ucb.edu.back_end_grado.persistence.dao.AcademicPeriodHasGradeProfileDao;
import grado.ucb.edu.back_end_grado.persistence.dao.GradeProfileDao;
import grado.ucb.edu.back_end_grado.persistence.entity.AcademicPeriodEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.AcademicPeriodHasGradeProfileEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.GradeProfileEntity;
import grado.ucb.edu.back_end_grado.util.Globals;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AcademicPeriodHasGradeProfileBl {
    private final AcademicPeriodDao academicPeriodDao;
    private final GradeProfileDao gradeProfileDao;
    private final AcademicPeriodHasGradeProfileDao academicPeriodHasGradeProfileDao;
    private AcademicPeriodHasGradeProfileResponse academicPeriodHasGradeProfileResponse;

    public AcademicPeriodHasGradeProfileBl(AcademicPeriodDao academicPeriodDao, GradeProfileDao gradeProfileDao, AcademicPeriodHasGradeProfileDao academicPeriodHasGradeProfileDao, AcademicPeriodHasGradeProfileResponse academicPeriodHasGradeProfileResponse) {
        this.academicPeriodDao = academicPeriodDao;
        this.gradeProfileDao = gradeProfileDao;
        this.academicPeriodHasGradeProfileDao = academicPeriodHasGradeProfileDao;
        this.academicPeriodHasGradeProfileResponse = academicPeriodHasGradeProfileResponse;
    }

    // Create new academic period has grade profile tuple
    public Object newAcademicPeriodHasGradeProfile(GradeProfileEntity gradeProfile) {
        academicPeriodHasGradeProfileResponse = new AcademicPeriodHasGradeProfileResponse();
        try {
            // Checking if there is an academic period right now
            LocalDateTime currentDate = LocalDateTime.now();
            int currentYear = currentDate.getYear();
            int currentMonth = currentDate.getMonthValue();
            String sem = String.format("%s - %s", currentMonth > 6 ? "II" : "I", currentYear);
            Optional<AcademicPeriodEntity> academicPeriod = academicPeriodDao.findBySemesterAndStatus(sem, 1);
            if (academicPeriod.isEmpty())
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "No existe un periodo académico para el periodo actual");
            // Saving tuple into database
            AcademicPeriodHasGradeProfileEntity academicPeriodHasGradeProfileEntity = new AcademicPeriodHasGradeProfileEntity();
            academicPeriodHasGradeProfileEntity.setGradeProfileIdGradePro(gradeProfile);
            academicPeriodHasGradeProfileEntity.setAcademicPeriodIdAcad(academicPeriod.get());
            academicPeriodHasGradeProfileEntity = academicPeriodHasGradeProfileDao.save(academicPeriodHasGradeProfileEntity);
            academicPeriodHasGradeProfileResponse = academicPeriodHasGradeProfileResponse.academicPeriodHasGradeProfileEntityToResponse(academicPeriodHasGradeProfileEntity);
        } catch (Exception e) {
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpSuccessfulCreatedStatus[0], Globals.httpSuccessfulCreatedStatus[1], academicPeriodHasGradeProfileResponse);
    }

    // GET => gradeProfile of the current academic period by gradeProfile primary key
    public Object getGradeProfileOfTheCurrentAcademicPeriod(Long idGradePro) {
        academicPeriodHasGradeProfileResponse = new AcademicPeriodHasGradeProfileResponse();
        try{
            // FETCHING => current academic period
            LocalDateTime currentDate = LocalDateTime.now();
            int currentYear = currentDate.getYear();
            int currentMonth = currentDate.getMonthValue();
            String sem = String.format("%s - %s", currentMonth > 6 ? "II" : "I", currentYear);
            Optional<AcademicPeriodEntity> academicPeriod = academicPeriodDao.findBySemesterAndStatus(sem, 1);
            if (academicPeriod.isEmpty())
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "No existe un periodo académico para el periodo actual");
            // FETCHING => grade profile
            Optional<GradeProfileEntity> gradeProfile = gradeProfileDao.findById(idGradePro);
            if (gradeProfile.isEmpty() || gradeProfile.get().getStatus() == 0)
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "No existe el perfil de grado mandado");
            // FETCHING => academic_has_grade_profile
            Optional<AcademicPeriodHasGradeProfileEntity> academicPeriodHasGradeProfile = academicPeriodHasGradeProfileDao.findByAcademicPeriodIdAcadAndGradeProfileIdGradeProAndStatus(academicPeriod.get(),gradeProfile.get(),1);
            if (academicPeriodHasGradeProfile.isEmpty() || academicPeriodHasGradeProfile.get().getStatus() == 0)
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "Perfil de grado no tiene periodo académico asignado");
            academicPeriodHasGradeProfileResponse = academicPeriodHasGradeProfileResponse.academicPeriodHasGradeProfileEntityToResponse(academicPeriodHasGradeProfile.get());
        } catch (Exception e) {
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpSuccessfulCreatedStatus[0], Globals.httpSuccessfulCreatedStatus[1], academicPeriodHasGradeProfileResponse);
    }
}
