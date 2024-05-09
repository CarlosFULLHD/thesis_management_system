package grado.ucb.edu.back_end_grado.bl;

import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.GradeProfileRequest;
import grado.ucb.edu.back_end_grado.dto.response.GradeProfileLectureresResponse;
import grado.ucb.edu.back_end_grado.dto.response.GradeProfileResponse;
import grado.ucb.edu.back_end_grado.dto.response.LecturerApplicationResponse;
import grado.ucb.edu.back_end_grado.persistence.dao.GradeProfileDao;
import grado.ucb.edu.back_end_grado.persistence.dao.LecturerApplicationDao;
import grado.ucb.edu.back_end_grado.persistence.dao.RoleHasPersonDao;
import grado.ucb.edu.back_end_grado.persistence.entity.GradeProfileEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.LecturerApplicationEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.RoleHasPersonEntity;
import grado.ucb.edu.back_end_grado.util.Globals;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class GradeProfileBl {
    private final GradeProfileDao gradeProfileDao;
    private final RoleHasPersonDao roleHasPersonDao;

    private GradeProfileResponse gradeProfileResponse;
    private LecturerApplicationDao lecturerApplicationDao;
    private GradeProfileRequest gradeProfileRequest;
    private GradeProfileEntity gradeProfileEntity;


    public GradeProfileBl(GradeProfileDao gradeProfileDao, RoleHasPersonDao roleHasPersonDao, GradeProfileResponse gradeProfileResponse, LecturerApplicationDao lecturerApplicationDao, GradeProfileRequest gradeProfileRequest, GradeProfileEntity gradeProfileEntity) {
        this.gradeProfileDao = gradeProfileDao;
        this.roleHasPersonDao = roleHasPersonDao;
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

//    // Get grade profiles by its workshop (one, two or both)
//    public Object getProfilesByItsWorkshop(Pageable pageable,int isGradeoneortwo){
//        System.out.println(pageable);
//        List<GradeProfileActiveTaskResponse> response = new ArrayList<>();
//        try{
//            Page<GradeProfileEntity> gradeProfileEntityPage = new PageImpl<>(new ArrayList<>());
//            if (isGradeoneortwo != 3){
//                gradeProfileEntityPage = gradeProfileDao.findByIsGradeoneortwoAndStatus(isGradeoneortwo,1,pageable);
//            } else {
//                gradeProfileEntityPage = gradeProfileDao.findAllByStatus(1,pageable);
//            }
//            if (gradeProfileEntityPage.isEmpty()) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1],  String.format("No existe perfiles de grado %", isGradeoneortwo == 3 ? "para ambos" : isGradeoneortwo) );
//
//            int totalPages = gradeProfileEntityPage.getTotalPages();
//
//            System.out.println(totalPages);
//            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
//            for (GradeProfileEntity x : gradeProfileEntityPage){
//                GradeProfileActiveTaskResponse xd = new GradeProfileActiveTaskResponse();
//                xd.setIdGradePro(x.getIdGradePro());
//                xd.setTitle(x.getTitle());
//                xd.setStatusGraduationMode(x.getStatusGraduationMode());
//                xd.setIsGradeoneortwo(x.getIsGradeoneortwo());
//                xd.setStatus(x.getStatus());
//                xd.setCreatedAt(x.getCreatedAt().format(formatter));
//                Optional<GradeProfileHasTaskEntity> dk = gradeProfileHasTaskDao.findByGradeProfileIdGradeProAndIsTaskCurrent(x,1);
//                if (!dk.isEmpty()){
//                    xd.setCurrentTask( new GradeProfileHasTaskResponse().gradeProfileHasTaskEntityToResponse(dk.get()));
//                }
//                System.out.println(dk.get().getTaskHasDateIdTaskHasDate().getTaskIdTask().getTitleTask());
//
//                response.add(xd);
//            }
//        } catch(Exception e){
//            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
//        }
//        return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1], response);
//    }

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
//    public Object getGradeProfilesWithLecturersOfTheCurrentGradeProfile()

}
