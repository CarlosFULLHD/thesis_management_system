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
import java.util.*;

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
            LocalDateTime accountUntil = LocalDateTime.parse(request.getAccountUntil(), formatter);
            if (!checkInitDate(initSemester,endSemester,accountUntil)) return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],"Las fechas de inicio debe ser menor a la final");
            if (!checkSameYearAndSemester(initSemester,endSemester,accountUntil)) return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],"Las fechas de inicio y final no pertenecen al mismo semestre");
            if (!checkAccountUntil(initSemester,endSemester,accountUntil)) return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],"Conflictos entre fecha de creación de cuentas, fecha de inicio y fecha de fin");
            if (!checkIfThereIsATupleWithTheSameSemester(initSemester,endSemester)) return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],"Ya existe un periodo académico activo para esa fecha");
            if (!checkIfNewDateIsBeforeCurrentDate(initSemester,endSemester,accountUntil)) return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],"No puedes añadir un periodo para fechas pasadas");
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
            Optional<AcademicPeriodEntity> academicPeriod = academicPeriodDao.findBySemesterAndStatus(sem,1);
            if (academicPeriod.isEmpty())
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "No existe un periodo académico para el periodo actual");
            // Preparing response
            academicPeriodResponse = academicPeriodResponse.academicPeriodEntityToResponse(academicPeriod.get());
        } catch (Exception e) {
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], academicPeriodResponse);
    }

    // Get academic period by its id
    public Object getAcademicPeriodByItsId(Long idAcad){
        academicPeriodResponse = new AcademicPeriodResponse();
        try{
            Optional<AcademicPeriodEntity> academicPeriod = academicPeriodDao.findById(idAcad);
            if (academicPeriod.isEmpty() || academicPeriod.get().getStatus() == 0)
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "No existe un periodo académico para esa ID");
            // Preparing response
            academicPeriodResponse = academicPeriodResponse.academicPeriodEntityToResponse(academicPeriod.get());
        } catch (Exception e) {
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], academicPeriodResponse);
    }

    // Get all active academic periods ordered by its semester
    public Object getOrderedAcademicPeriods(){
        List<AcademicPeriodResponse> academicPeriodResponseList = new ArrayList<>();
        try {
            List<AcademicPeriodEntity> list = academicPeriodDao.findAllByStatusOrderByInitDateDesc(1);
            if (list.isEmpty()) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "No existe ningún periodo académico");
            for (AcademicPeriodEntity x : list){
                academicPeriodResponseList.add(academicPeriodResponse.academicPeriodEntityToResponse(x));
            }
        } catch (Exception e) {
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], academicPeriodResponseList);
    }

    // Delete academic period by it's ID
    public Object deleteAcademicPeriodById(Long idTask){
        academicPeriodResponse = new AcademicPeriodResponse();
        try {
            // Checking if the academic period exists and is active
            Optional<AcademicPeriodEntity> academicPeriod = academicPeriodDao.findByIdAcadAndStatus(idTask,1);
            if (academicPeriod.isEmpty())
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "Periodo académico inexistente");
            // Deleting academic period
            academicPeriodDao.delete(academicPeriod.get());
            academicPeriodResponse = academicPeriodResponse.academicPeriodEntityToResponse(academicPeriod.get());
        } catch (Exception e) {
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1], e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpSuccessfulCreatedStatus[0], Globals.httpSuccessfulCreatedStatus[1], academicPeriodResponse);
    }

    // Update dates of the current academic period
    public Object updateActiveAcademicPeriodById(AcademicPeriodRequest request){
        academicPeriodResponse = new AcademicPeriodResponse();
        try {
            Optional<AcademicPeriodEntity> academicPeriod = academicPeriodDao.findById(request.getIdAcad());
            // Checking if the academic period information exists
            if (academicPeriod.isEmpty()) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "Periodo académico inexistente");
            // Checking if the academic period tuple is active or not
            if (academicPeriod.get().getStatus() != 1) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "Periodo académico inactivo");
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            LocalDateTime initSemester = LocalDateTime.parse(request.getInitDate(), formatter);
            LocalDateTime endSemester = LocalDateTime.parse(request.getEndDate(), formatter);
            LocalDateTime accountUntil = LocalDateTime.parse(request.getAccountUntil(), formatter);
            if (! checkInitDate(initSemester,endSemester,accountUntil)) return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],"Las fechas de inicio debe ser menor a la final");
            if (!checkSameYearAndSemester(initSemester,endSemester,accountUntil)) return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],"Las fechas de inicio y final no pertenecen al mismo semestre");
            if (!checkAccountUntil(initSemester,endSemester,accountUntil)) return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],"Conflictos entre fecha de creación de cuentas, fecha de inicio y fecha de fin");
            if (!checkIfNewDateIsBeforeCurrentDate(initSemester,endSemester,accountUntil)) return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],"No puedes modificar un periodo activo para que tenga una menor fecha a la actual");
            String sem = getSemesterString(initSemester);
            if (!academicPeriod.get().getSemester().equals(sem)) return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],"No puedes modificar fechas que no pertenezcan al semestre actual");
            int x = academicPeriodDao.patchEntry(sem,initSemester,endSemester,accountUntil, request.getIdAcad());
            if (x == 0) return new UnsuccessfulResponse(Globals.httpMethodNowAllowed[0], Globals.httpMethodNowAllowed[1], "Problemas al modificar periodo académico");
            // Preparing response
            academicPeriodEntity = academicPeriodDao.findById(request.getIdAcad()).get();
            academicPeriodResponse = academicPeriodResponse.academicPeriodEntityToResponse(academicPeriodEntity);
        } catch (Exception e){
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1],academicPeriodResponse);
    }


    // Check if init date is equal or more than end date or accounts until
    public boolean checkInitDate(LocalDateTime initSemester, LocalDateTime endSemester, LocalDateTime accountUntil){
        return initSemester.isAfter(endSemester) || initSemester.isEqual(endSemester) || initSemester.isAfter(accountUntil) ? false : true;
    }
    // Checking if all dates are in the same semester and the same year
    public boolean checkSameYearAndSemester(LocalDateTime initSemester, LocalDateTime endSemester, LocalDateTime accountUntil){
        int initMonth = initSemester.getMonthValue();
        int initYear = initSemester.getYear();
        int endMonth = endSemester.getMonthValue();
        int endYear = endSemester.getYear();
        int accountUntilYear = accountUntil.getYear();
        int accountUntilMonth = accountUntil.getMonthValue();
        String checkInitMonth = (initMonth > 6 ? "II" : "I");
        String checkEndMonth = (endMonth > 6 ? "II" : "I");
        String checkAccountMonth = (accountUntilMonth > 6 ? "II" : "I");
        return (initYear != endYear || initYear != accountUntilYear || !checkEndMonth.equals(checkInitMonth) || !checkEndMonth.equals(checkAccountMonth)) ? false : true;
    }
    // Checking if account until date is greater than the init data and less than end data
    public boolean checkAccountUntil(LocalDateTime initSemester, LocalDateTime endSemester, LocalDateTime accountUntil) {
        return (accountUntil.isBefore(initSemester) || accountUntil.isEqual(initSemester) || accountUntil.isAfter(endSemester) || accountUntil.isEqual(endSemester)) ? false : true;
    }
    // Checking if there is already a tuple with the same semester
    public boolean checkIfThereIsATupleWithTheSameSemester(LocalDateTime initSemester, LocalDateTime endSemester){
        int initYear = initSemester.getYear();
        int endMonth = endSemester.getMonthValue();
        String checkEndMonth = (endMonth > 6 ? "II" : "I");
        String sem = String.format("%s - %s", checkEndMonth, initYear);
        Optional<AcademicPeriodEntity> academicPeriod = academicPeriodDao.findBySemesterAndStatus(sem, 1);
        return (!academicPeriod.isEmpty()) ? false : true;
    }
    // Checking if the new dates are after the current period
    public boolean checkIfNewDateIsBeforeCurrentDate(LocalDateTime initSemester, LocalDateTime endSemester, LocalDateTime accountUntil){
        LocalDateTime localDateTime = LocalDateTime.now();
        int initMonth = initSemester.getMonthValue();
        int initYear = initSemester.getYear();
        int endMonth = endSemester.getMonthValue();
        int endYear = endSemester.getYear();
        int accountUntilYear = accountUntil.getYear();
        int accountUntilMonth = accountUntil.getMonthValue();
        int actualYear = localDateTime.getYear();
        int actualMonth = localDateTime.getMonthValue();
        int checkInitMonth = (initMonth > 6 ? 2 : 1);
        int checkEndMonth = (endMonth > 6 ? 2 : 1);
        int checkAccountMonth = (accountUntilMonth > 6 ? 2 : 1);
        int checkActualMonth = (actualMonth > 6 ? 2 : 1);
        if (initYear < actualYear || endYear < actualYear || accountUntilYear < actualYear) return false;
        if (checkActualMonth == 2 && (checkInitMonth == 1 || checkEndMonth == 1 || checkAccountMonth == 1)) return false;
        return true;
    }

    // Return a string of the current semester, based on its dates
    public String getSemesterString(LocalDateTime initSemester){
        int initMonth = initSemester.getMonthValue();
        int initYear = initSemester.getYear();
        String checkInitMonth = (initMonth > 6 ? "II" : "I");
        return String.format("%s - %s", checkInitMonth, initYear);
    }




}
