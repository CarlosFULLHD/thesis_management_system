package grado.ucb.edu.back_end_grado.bl;

import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.GradeProfileRequest;
import grado.ucb.edu.back_end_grado.dto.response.GradeProfileLectureresResponse;
import grado.ucb.edu.back_end_grado.dto.response.GradeProfileResponse;
import grado.ucb.edu.back_end_grado.dto.response.LecturerApplicationResponse;
import grado.ucb.edu.back_end_grado.persistence.dao.*;
import grado.ucb.edu.back_end_grado.persistence.entity.*;
import grado.ucb.edu.back_end_grado.util.Globals;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class GradeProfileBl {
    private final GradeProfileDao gradeProfileDao;
    private final RoleHasPersonDao roleHasPersonDao;
    private final AcademicPeriodHasGradeProfileDao academicPeriodHasGradeProfileDao;
    private final AcademicPeriodDao academicPeriodDao;
    private GradeProfileResponse gradeProfileResponse;
    private LecturerApplicationDao lecturerApplicationDao;
    private GradeProfileRequest gradeProfileRequest;
    private GradeProfileEntity gradeProfileEntity;

    public GradeProfileBl(GradeProfileDao gradeProfileDao, RoleHasPersonDao roleHasPersonDao, AcademicPeriodHasGradeProfileDao academicPeriodHasGradeProfileDao, AcademicPeriodDao academicPeriodDao, GradeProfileResponse gradeProfileResponse, LecturerApplicationDao lecturerApplicationDao, GradeProfileRequest gradeProfileRequest, GradeProfileEntity gradeProfileEntity) {
        this.gradeProfileDao = gradeProfileDao;
        this.roleHasPersonDao = roleHasPersonDao;
        this.academicPeriodHasGradeProfileDao = academicPeriodHasGradeProfileDao;
        this.academicPeriodDao = academicPeriodDao;
        this.gradeProfileResponse = gradeProfileResponse;
        this.lecturerApplicationDao = lecturerApplicationDao;
        this.gradeProfileRequest = gradeProfileRequest;
        this.gradeProfileEntity = gradeProfileEntity;
    }

    // Create new grade profile for a new account
    public Object newGradeProfileForNewStudentAccount(Long roleHasPersonIdRoleHasPer){
        gradeProfileResponse = new GradeProfileResponse();
        gradeProfileEntity = new GradeProfileEntity();
        try {
            // Assuming that the new account checks if the person, role tuple is active and creates a new active role_has_person tuple
            // Checking if the recent role_has_person tuple has been created
            Optional<RoleHasPersonEntity> roleHasPerson = roleHasPersonDao.findByIdRolePerAndStatus(roleHasPersonIdRoleHasPer, 1);
            if (roleHasPerson.isEmpty()) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1],"Rol asignado a cuenta estudiante no funciono");
            // Setting role_has_person to the new gradeProfile tuple
            gradeProfileEntity.setRoleHasPersonIdRolePer(roleHasPerson.get());
            gradeProfileEntity.setTitle("");
            gradeProfileEntity.setStatusGraduationMode(-1); // -1 => undefined state
            // Creating tuple in DB's
            gradeProfileEntity = gradeProfileDao.save(gradeProfileEntity);
            // Preparing response
            gradeProfileResponse = gradeProfileResponse.gradeProfileEntityToResponse(gradeProfileEntity);
        } catch (Exception e){
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
        }
            return new SuccessfulResponse(Globals.httpSuccessfulCreatedStatus[0], Globals.httpSuccessfulCreatedStatus[1], gradeProfileResponse);
    }

    // Get all grade profiles with status of -1 && 1 (pending to be accepted && accepted)
    public Object getActiveGradeProfiles(Pageable pageable, String title){
        try {
            List<GradeProfileEntity> gradeProfileEntityList;
        if (title == null || title.trim().isEmpty()){
            gradeProfileEntityList = gradeProfileDao.findByStatus(1, pageable);

        } else {
            gradeProfileEntityList = gradeProfileDao.findByTitleContainingAndStatus(title, 1, pageable);
        }
            // Checking if there are retrieved information in the grade profile list
            if (gradeProfileEntityList.isEmpty()) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1],"No existe perfiles de grado aún");
            // Looping and filling response list with all the retrieved grade profile
            List<GradeProfileResponse> response = new ArrayList<>();
            for (GradeProfileEntity gradeProfileEntity : gradeProfileEntityList){
                response.add(new GradeProfileResponse().gradeProfileEntityToResponse(gradeProfileEntity));
            }
            return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1],response);
        } catch(Exception e){
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
        }
    }
    // Get grade profile, tutor and lecturer by userId
    public Object getGradeProfileWithLecturersByUserId( Long idUsers){
        GradeProfileLectureresResponse gradeProfileLectureresResponse = new GradeProfileLectureresResponse();
        try {
            Optional<GradeProfileEntity> gradeProfile = gradeProfileDao.findByRoleHasPersonIdRolePer_UsersIdUsers_IdUsersAndStatus(idUsers,1);
            if (gradeProfile.isEmpty()) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "No existe perfil de grado para ese estudiante");
            Optional<LecturerApplicationEntity> tutor = lecturerApplicationDao.findByGradeProfileIdGradeProAndTutorLecturerAndStatus(gradeProfile.get(),0,1);
            Optional<LecturerApplicationEntity> lecturer = lecturerApplicationDao.findByGradeProfileIdGradeProAndTutorLecturerAndStatus(gradeProfile.get(),1,1);
            // Preparing response
            gradeProfileLectureresResponse.setGradeProfile(new GradeProfileResponse().gradeProfileEntityToResponse(gradeProfile.get()));
            gradeProfileLectureresResponse.setTutor(tutor.isEmpty() ? null : new LecturerApplicationResponse().lecturerApplicationEntityToResponse(tutor.get()));
            gradeProfileLectureresResponse.setLecturer(lecturer.isEmpty() ? null : new LecturerApplicationResponse().lecturerApplicationEntityToResponse(lecturer.get()));

        } catch(Exception e){
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], gradeProfileLectureresResponse);
    }

    // Get all active grade profiles with its tutors and lecturers of the current academic period
    public Object getGradeProfilesWithLecturersOfTheCurrentGradeProfile(){
        List<GradeProfileLectureresResponse> gradeProfileLectureresResponses = new ArrayList<>();
        try {
            // Checking if there is an academic period right now
            LocalDateTime currentDate = LocalDateTime.now();
            int currentYear = currentDate.getYear();
            int currentMonth = currentDate.getMonthValue();
            String sem = String.format("%s - %s", currentMonth > 6 ? "II" : "I",currentYear);
            Optional<AcademicPeriodEntity> academicPeriod = academicPeriodDao.findBySemesterAndStatus(sem,1);
            if (academicPeriod.isEmpty())
                return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "No existe un periodo académico para el periodo actual");
            // Finding the grade profiles that are in that academic period
            List<AcademicPeriodHasGradeProfileEntity> academicPeriodHasGradeProfileEntityList = academicPeriodHasGradeProfileDao.findAllByAcademicPeriodIdAcadAndStatus(academicPeriod.get(),1);
            if (academicPeriodHasGradeProfileEntityList.isEmpty()) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "No existen perfiles de grado, para el periodo académico actual");
            // Getting all tutors of the grade profiles
            List<LecturerApplicationEntity> tutors = new ArrayList<>();
            for (AcademicPeriodHasGradeProfileEntity x : academicPeriodHasGradeProfileEntityList) {
                // Getting active tutor and lecturer for the grade profile
                Optional<LecturerApplicationEntity> tutor = lecturerApplicationDao.findByGradeProfileIdGradeProAndTutorLecturerAndStatus(x.getGradeProfileIdGradePro(), 0, 1);
                Optional<LecturerApplicationEntity> lecturer = lecturerApplicationDao.findByGradeProfileIdGradeProAndTutorLecturerAndStatus(x.getGradeProfileIdGradePro(), 1, 1);
                GradeProfileLectureresResponse dk = new GradeProfileLectureresResponse();
                // Preparing response to add in the list
                dk.setGradeProfile(new GradeProfileResponse().gradeProfileEntityToResponse(x.getGradeProfileIdGradePro()));
                dk.setTutor(tutor.isEmpty() ? null : new LecturerApplicationResponse().lecturerApplicationEntityToResponse(tutor.get()));
                dk.setLecturer(lecturer.isEmpty() ? null : new LecturerApplicationResponse().lecturerApplicationEntityToResponse(lecturer.get()));
                gradeProfileLectureresResponses.add(dk);
            }
        } catch(Exception e){
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], gradeProfileLectureresResponses);
    }

    // Update title of a grade profile by its Id
    public Object updateTitleForActiveGradeProfile(Long idGradePro, String newTitle){
        gradeProfileResponse = new GradeProfileResponse();
        try{
            // Finding the grade profile by its id
            Optional<GradeProfileEntity> gradeProfile = gradeProfileDao.findById(idGradePro);
            if (gradeProfile.isEmpty() || gradeProfile.get().getStatus() == 0) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "Perfil de grado inactivo o no existente");
            gradeProfile.get().setTitle(newTitle);
            // Updating title
            int x = gradeProfileDao.updateTitle(newTitle,idGradePro);
            if (x == 0) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "No se pudo asignar nuevo título");
            gradeProfile = gradeProfileDao.findById(idGradePro);
            // Preparing response
            gradeProfileResponse = gradeProfileResponse.gradeProfileEntityToResponse(gradeProfile.get());
        } catch(Exception e){
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], gradeProfileResponse);
    }

    // Update graduation mode of a grade profile by its Id
    public Object updateGraduationMOdeForActiveGradeProfile(Long idGradePro, int newGraduationMode){
        gradeProfileResponse = new GradeProfileResponse();
        try{
            // Finding the grade profile by its id
            Optional<GradeProfileEntity> gradeProfile = gradeProfileDao.findById(idGradePro);
            if (gradeProfile.isEmpty() || gradeProfile.get().getStatus() == 0) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "Perfil de grado inactivo o no existente");
            gradeProfile.get().setStatusGraduationMode(newGraduationMode);
            // Updating graduation mode
            int x = gradeProfileDao.updateStatusGraduationMode(newGraduationMode,idGradePro);
            if (x == 0) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "No se pudo asignar nueva modalidad de graduación");
            gradeProfile = gradeProfileDao.findById(idGradePro);
            // Preparing response
            gradeProfileResponse = gradeProfileResponse.gradeProfileEntityToResponse(gradeProfile.get());
        } catch(Exception e){
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], gradeProfileResponse);
    }

    // Update graduation mode of a grade profile by its Id
    public Object updateWorkShopForActiveGradeProfile(Long idGradePro, int newWorkShop){
        gradeProfileResponse = new GradeProfileResponse();
        try{
            // Finding the grade profile by its id
            Optional<GradeProfileEntity> gradeProfile = gradeProfileDao.findById(idGradePro);
            if (gradeProfile.isEmpty() || gradeProfile.get().getStatus() == 0) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "Perfil de grado inactivo o no existente");
            gradeProfile.get().setIsGradeoneortwo(newWorkShop);
            // Updating graduation mode
            int x = gradeProfileDao.updateWorkShop(newWorkShop,idGradePro);
            if (x == 0) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1], "No se pudo asignar nuevo taller de grado");
            gradeProfile = gradeProfileDao.findById(idGradePro);
            // Preparing response
            gradeProfileResponse = gradeProfileResponse.gradeProfileEntityToResponse(gradeProfile.get());
        } catch(Exception e){
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], gradeProfileResponse);
    }



}
