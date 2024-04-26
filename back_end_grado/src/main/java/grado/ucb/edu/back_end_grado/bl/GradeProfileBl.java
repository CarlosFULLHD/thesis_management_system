package grado.ucb.edu.back_end_grado.bl;

import grado.ucb.edu.back_end_grado.dto.SuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.UnsuccessfulResponse;
import grado.ucb.edu.back_end_grado.dto.request.GradeProfileRequest;
import grado.ucb.edu.back_end_grado.dto.response.GradeProfileResponse;
import grado.ucb.edu.back_end_grado.dto.response.PublicInformationResponse;
import grado.ucb.edu.back_end_grado.persistence.dao.GradeProfileDao;
import grado.ucb.edu.back_end_grado.persistence.dao.RoleHasPersonDao;
import grado.ucb.edu.back_end_grado.persistence.entity.GradeProfileEntity;
import grado.ucb.edu.back_end_grado.persistence.entity.PublicInformationEntity;
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
    private GradeProfileRequest gradeProfileRequest;
    private GradeProfileEntity gradeProfileEntity;

    public GradeProfileBl(GradeProfileDao gradeProfileDao, RoleHasPersonDao roleHasPersonDao, GradeProfileResponse gradeProfileResponse, GradeProfileRequest gradeProfileRequest, GradeProfileEntity gradeProfileEntity) {
        this.gradeProfileDao = gradeProfileDao;
        this.roleHasPersonDao = roleHasPersonDao;
        this.gradeProfileResponse = gradeProfileResponse;
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
    public Object getActiveGradeProfiles(Pageable pageable){
        List<GradeProfileEntity> gradeProfileEntityList = gradeProfileDao.findByStatus(1, pageable);
        List<GradeProfileResponse> response = new ArrayList<>();
        try {
            // Checking if there are retrieved information in the grade profile list
            if (gradeProfileEntityList.isEmpty()) return new UnsuccessfulResponse(Globals.httpNotFoundStatus[0], Globals.httpNotFoundStatus[1],"No existe perfiles de grado aún");
            // Looping and filling response list with all the retrieved grade profile
            for (GradeProfileEntity x : gradeProfileEntityList){
                response.add(new GradeProfileResponse().gradeProfileEntityToResponse(x));
            }
        } catch(Exception e){
            return new UnsuccessfulResponse(Globals.httpInternalServerErrorStatus[0], Globals.httpInternalServerErrorStatus[1],e.getMessage());
        }
        return new SuccessfulResponse(Globals.httpOkStatus[0], Globals.httpOkStatus[1],response);
    }
}
