package grado.ucb.edu.back_end_grado.bl;

import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.AcademicPeriodRequest;
import grado.ucb.edu.back_end_grado.dto.response.AcademicPeriodResponse;
import grado.ucb.edu.back_end_grado.persistence.dao.AcademicPeriodDao;
import grado.ucb.edu.back_end_grado.persistence.entity.AcademicPeriodEntity;
import grado.ucb.edu.back_end_grado.util.Globals;
import org.springframework.stereotype.Service;
import java.time.format.DateTimeFormatter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Service
public class AcademicPeriodBl {
    private final AcademicPeriodDao academicPeriodDao;
    private AcademicPeriodEntity academicPeriodEntity;
    private AcademicPeriodResponse academicPeriodResponse;

    public AcademicPeriodBl(AcademicPeriodDao academicPeriodDao, AcademicPeriodEntity academicPeriodEntity, AcademicPeriodResponse academicPeriodResponse) {
        this.academicPeriodDao = academicPeriodDao;
        this.academicPeriodEntity = academicPeriodEntity;
        this.academicPeriodResponse = academicPeriodResponse;
    }

    // New academic period
    public Object newAcademicPeriod(AcademicPeriodRequest request) {
        academicPeriodResponse = new AcademicPeriodResponse();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        try {
            LocalDateTime initSemester = LocalDateTime.parse(request.getInitDate(), formatter);
            LocalDateTime endSemester = LocalDateTime.parse(request.getEndDate(), formatter);
            // Checking if the init date is equals or more that end date
            if (initSemester.isAfter(endSemester) || initSemester.isEqual(endSemester))
                return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], "Las fechas de inicio debe ser menor a la final");
            // Checking if both dates (init and end) are in the same semester
            int initMonth = initSemester.getMonthValue();
            int initYear = initSemester.getYear();
            int endMonth = endSemester.getMonthValue();
            int endYear = endSemester.getYear();
            String checkInitMonth = (initMonth > 6 ? "II" : "I");
            String checkEndMonth = (endMonth > 6 ? "II" : "I");
            if (initYear != endYear || !checkEndMonth.equals(checkInitMonth))
                return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], "Las fechas de inicio y final no pertenecen al mismo semestre");
            // Checking if there is an active academic period for that semester
            String sem = String.format("%s - %s", checkEndMonth, initYear);
            Optional<AcademicPeriodEntity> academicPeriod = academicPeriodDao.findBySemesterAndStatus(sem, 1);
            if (!academicPeriod.isEmpty())
                return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], "Ya existe un periodo académico activo para esa fecha");
            // Creating a tuple in DB
            academicPeriodEntity = academicPeriodDao.save(request.academicPeriodRequestToEntity(request));
            // Preparing response
            academicPeriodResponse = academicPeriodResponse.academicPeriodEntityToResponse(academicPeriodEntity);
        } catch (Exception e) {
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpSuccessfulCreatedStatus[0], Globals.httpSuccessfulCreatedStatus[1], academicPeriodResponse);
    }

    // Get current academic period based on current date
    public Object getCurrentActiveAcademicPeriod() {
        academicPeriodResponse = new AcademicPeriodResponse();
        try {
            // Checking if there is an academic period right now
            LocalDateTime currentDate = LocalDateTime.now();
            int currentYear = currentDate.getYear();
            int currentMonth = currentDate.getMonthValue();
            String sem = String.format("%s - %s", currentMonth > 6 ? "II" : "I",currentYear);
            System.out.println(sem);
            Optional<AcademicPeriodEntity> academicPeriod = academicPeriodDao.findBySemesterAndStatus(sem,1);
            if (academicPeriod.isEmpty())
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "No existe un periodo académico para el periodo actual");
            // Preparing response
            academicPeriodResponse = academicPeriodResponse.academicPeriodEntityToResponse(academicPeriod.get());
        } catch (Exception e) {
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpSuccessfulCreatedStatus[0], Globals.httpSuccessfulCreatedStatus[1], academicPeriodResponse);
    }
}
